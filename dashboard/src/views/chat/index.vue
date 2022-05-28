<template>
  <div class="chat">
    <div class="side">
      <FirendsList
        :key="key"
        class="firendsList"
        :list="chatlist" 
        :activeId="activeId"
        @change="changeFirendsList"
        @scrollToBottom="scrollToBottom"
        />
    </div>
    <div class="main">
      <!-- 顶部信息 -->
      <div class="head">
        <div class="title" v-if="FirendsListName">
          正在与{{FirendsListName}}聊天
        </div>
      </div>
      <!-- 聊天内容 -->
      <div class="modalBox">
        <ModalList 
          :key="key"
          class="modalList" 
          :msgData="modalListData"
          />
      </div>
      <!-- 输入框 -->
      <InputBox 
        class="iptWrap"
        @sendMsg="sendMsg"
        />
    </div>
  </div>
</template>

<script>
  import FirendsList from './components/FirendsList.vue';
  import ModalList from './components/ModalList.vue';
  import InputBox from './components/InputBox.vue';
  import wxMinxis from '../../utils/wsMinxis.vue';
  import store from '@/store';
  export default{
    components: { FirendsList, ModalList, InputBox },
    mixins: [ wxMinxis ],
    data(){
      return {
        msgListData: [], // 聊天内容数据
        activeId: '',
        chatlist:[],
        modalListData: [],
        FirendsListName: '',
        pagination:{
           current:1,
           pageSize:3000
        },
        key: 0
      }
    },
    async created() {
      
      // 创建一个容器用来，存储好友列表，无序但唯一
      this.nodelist = {}

      setTimeout(() => {
          this.userInfo = store.getters.userInfo
          this.init()
          this.nodelist = this.getconverse2db()
          this.msgListData = this.getmsg2db()

          this.sort()

      }, 1000);
  
    },
    watch:{
      wsIsOpen: function( newval, oldval){
          if( newval ){
            this.subscribe(["9313050560","9313050553","9313083544","9313083506","9313050572"])
            //this.subscribe(["13707770311"])
          }
      }
    },
    methods: {

      sort(){
          let sendTimeStamp = 0
          for (const key in this.nodelist) {
              let node = this.nodelist[key]
              if( node.sendTimeStamp >= sendTimeStamp ){
                    sendTimeStamp = node.sendTimeStamp
                    // 表示最新消息
                    this.chatlist.unshift(node)
              }else{
                    this.chatlist.push(node)
              }
          }
      },
      
      converse2db(){
          localStorage.setItem("nodelist", JSON.stringify(this.nodelist))
      },

      msg2db(){
         localStorage.setItem("msgListData", JSON.stringify(this.msgListData))
      },

      getmsg2db(){

        let msgListData =  localStorage.getItem('msgListData')

        if(msgListData){
            try {
              return JSON.parse(msgListData);
            } catch (error) {
              return {}
            }
        }else{
          return {}
        }
    
      },

      getconverse2db(){
        let nodelist =  localStorage.getItem('nodelist')

        if(nodelist){
            try {
              return JSON.parse(nodelist);
            } catch (error) {
              return {}
            }
        }else{
          return {}
        }
      },

      init(){
        if(!this.wsIsOpen){
          this.initWebSocket();
        }
      },

      getuserinfo(){

      },

      // 接收到到ews数据
      wsGetMsg(data){
        let { event, msgStatus, userId } = data
        if( event === "H5_SUBSCRIBE_STATUS"){
          // 订阅成功，更用户的userid, 并且更新绑定的企业微信在线状态
        }else if(event === "MESSAGE_SERVER_TO_H5"){
          let { content, senderNickName, senderId, conversationId, contentType, sendTimeStamp } = data.data 
          let key = userId + "_" + senderId
          if(!this.nodelist[key]){
             this.nodelist[key] = {
                conversationId: conversationId,
                name: senderNickName,
                senderId: senderId,
                userId: userId,
                status: true,
                sendTimeStamp: sendTimeStamp
              }
          }else{
              this.nodelist[key].status = true
              this.nodelist[key].sendTimeStamp = sendTimeStamp
          }

          if(!this.msgListData[key]){
              this.msgListData[key] = []
          }
          this.msgListData[key].push({
              msg: content,
              type: 1
          })

          //this.friendsListData = newfriendslistdata
          this.chatlist = []
          this.sort()

          this.converse2db()

          this.msg2db()

          this.key++
        }
        return false;
      },
      changeFirendsList(item){
        let { senderId,name,conversationId, userId } = item;
        this.senderId = senderId
        this.FirendsListName = name
        this.conversationId = conversationId
        this.userId = userId
        this.activeId = userId+"_"+senderId
        this.key++
        this.modalListData = this.msgListData[this.activeId];
        this.scrollToBottom()
      },
      sendMsg({content}){
        // 本地存的
        let msgId =  this.userInfo.userId + new Date().getTime()
        let msg = {
          msgId: msgId, 
          msg: content,
          type: 2, 
          headImg: 'http://img.duoziwang.com/2019/03/05271113067248.jpg',
          isRead: true
        };
        // 发到ws的数据
        let wsMsg = { 
          "event": "MESSAGE_H5_TO_SERVER",  
              "userId": this.userId,
              "deviceId": this.deviceId,
              "deviceType":"H5",
              "msgId": msgId,
              "msgStatus":0,
              "data":{
                  "conversation_id": this.conversationId,
                  "content": content
              },
              "type":10401
        };
        console.log('conversationId', this.conversationId)
        this.webSocketSendMessage(wsMsg);
        this.updateMsg(msg);
      },
      // 更新本地数据
      updateMsg(msg){
        let { senderId,userId } = this;
        let key = userId+"_"+senderId
        this.msgListData[key].push(msg);
        this.modalListData = this.msgListData[key];
        this.msg2db()
        this.key++
        this.scrollToBottom();
      },
      // 滚动到最底部
      scrollToBottom(){
        this.$nextTick(() => {
          var container = this.$el.querySelector(".modalList");
          container.scrollTop = container.scrollHeight;
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
