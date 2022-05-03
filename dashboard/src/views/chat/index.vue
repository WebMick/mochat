<template>
  <div class="chat">
    <div class="side">
      <FirendsList 
        class="firendsList"
        :list="friendsListData" 
        :activeId="firendsListActiveId"
        @change="changeFirendsList"
        />
    </div>
    <div class="main">
      <!-- 顶部信息 -->
      <div class="head">
        <div class="title" v-if="modalListData && modalListData.firendInfo">
          {{modalListData.firendInfo.name}}
        </div>
      </div>
      <!-- 聊天内容 -->
      <div class="modalBox">
        <ModalList 
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
  import { friendsListData, msgListData } from './data.js';
  import FirendsList from './components/FirendsList.vue';
  import ModalList from './components/ModalList.vue';
  import InputBox from './components/InputBox.vue';
  import wxMinxis from '../../utils/wsMinxis.vue';
  export default{
    components: { FirendsList, ModalList, InputBox },
    mixins: [ wxMinxis ],
    data(){
      return {
        friendsListData: [], // 好友列表
        msgListData: [], // 聊天内容数据
        firendsListActiveId: '',
        modalListData: {},
      }
    },
    created() {
      this.init()
    },
    methods: {
      init(){
        if(!this.wsIsOpen){
          this.initWebSocket();
        }
        this.friendsListData = friendsListData(1);
        let storeMsgListData = localStorage.getItem('msgListData');
        // 历史消息
        if(storeMsgListData){
          storeMsgListData = JSON.parse(storeMsgListData)
          this.msgListData = storeMsgListData;
        }else{
          this.msgListData = msgListData;
        }
        
        this.firendsListActiveId = this.friendsListData[0].chatId;
        this.modalListData = this.msgListData[this.firendsListActiveId];
        this.scrollToBottom();
      },
      // 接收到到ews数据
      wsGetMsg(data){
        console.log({data});
        let { data: { msgData } } = data;
        msgData = JSON.parse(msgData);
        let { content } = msgData.data
        // 本地存的数据格式
        let msg = {
          msgId: '',
          msg: content,
          type: 1, 
          isRead: true
        };
        // 更新本地数据
        this.updateMsg(msg)
      },
      changeFirendsList(item){
        let { chatId } = item;
        this.firendsListActiveId = chatId;
        this.modalListData = this.msgListData[chatId];
      },
      sendMsg({content}){
        let { firendsListActiveId, modalListData } = this;
        // 本地存的
        let msg = {
          msgId: '', 
          msg: content,
          type: 2, 
          isRead: true
        };
        // 发到ws的数据
        let wsMsg = { 
          "event": "message_pull",
          "data": {
            "clientId": 1,
            "type":"msg",
            "msgData": content
          }
        };
        this.webSocketSendMessage(wsMsg);
        this.updateMsg(msg);
      },
      // 更新本地数据
      updateMsg(msg){
        let { firendsListActiveId } = this;
        this.msgListData[firendsListActiveId].msg.push(msg);
        localStorage.setItem('msgListData', JSON.stringify(this.msgListData))
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
