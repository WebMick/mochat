<template>
  <div class="list" @scroll="hanldscroll" :key="key">
    <div class="item"
      v-for="(item, index) in list" 
      :key="index"
      :class="{active: activeId == item.userId + '_' + item.senderId}"
      @click="change(item)"
      >
     
        <div class="headImg">
            <!-- <img class="img" :src="item.avatar" alt=""> -->
        </div>
        <div class="info">
          <a-badge status="error" v-if="item.status">
            <div class="name">{{item.name}}</div>
          </a-badge>
          <div v-else class="name">{{item.name}}</div>
          <div class="employeeName">@<span>{{item.userId}}</span></div>
         <!-- <div class="msg">{{item.remarks}}</div> -->
        </div> 
    </div>
    <div class="total">总计:{{list.length}}个会话</div>
    </div>
</template>

<script>
  export default{
    props: {
      list: {
        type: Array,
        default: () => []
      },
      activeId: {
        type: String | Number,
        default: 1
      }
    },
    data(){
      return{
        childsId: '',
        key: 0
      }
    },
    watch:{
      list: function(){
          this.key++
      }
    },

    methods: {
      change(item){
        item.status = false
        this.$emit('change', item);
      },
      hanldscroll(e){
        let { scrollTop, clientHeight, scrollHeight } = e.target;

        if(scrollTop + clientHeight >= scrollHeight ){
           this.$emit('scrollToBottom', true)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .list{
    position: relative;
    .total{
      text-align: center;
      color: #fff;
      font-size: 12px;
      padding: 10px 0;
    }
    .item{
      padding: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
      border-bottom: #292c33 1px solid;
      &.active{
        background: #3a3f45;
      }
      /deep/ .headImg{
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border: #8694aa solid 1px;
        border-radius: 3px;
        overflow: hidden;
        .img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        max-width: calc(100% - 100px);
        color: #fff;
        .name{
          font-size: 15px;
        }
        .employeeName{
            font-size: 12px;
            span{
              color: red;
            }
          }
        .msg{
          font-size: 12px;
          color: #999;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
