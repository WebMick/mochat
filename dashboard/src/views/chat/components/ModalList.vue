<template>
  <div class="modalList">
    <div class="item"
      v-for="(item, index) in msgData.msg"
      :key="index"
      >
      <div class="msgBox left" v-if="item.type == 1">
        <div class="infoBox">
          <img class="headImg" :src="msgData.firendInfo.headImg" >
        </div>
        <div class="msg">
          <div class="arrow"></div>
          {{item.msg}}
        </div>
      </div>
      <div class="msgBox right" v-if="item.type == 2">
        <div class="msg">
          <div class="arrow"></div>
          {{item.msg}}
        </div>
        <div class="infoBox">
          <img class="headImg" :src="msgData.userInfo.headImg" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      msgData: {
        type: Object,
        default: function(){
          return {}
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .modalList{
    .item{
      margin-top: 15px;
      &:last-child{
        margin-bottom: 15px;
      }
      .msgBox{
        display: flex;
        align-items: center;
        &.left{
          
        }
        &.right{
          justify-content: flex-end;
          .msg{
            background: #02db85;
            .arrow{
              right: -10px;
              left: initial;
              border-left-color: #02db85;
              border-right-color: transparent;
              border-top-color: transparent;
              border-bottom-color: transparent;
            }
          }
        }
        .msg{
          margin: 0 10px;
          background: #eaeaea;
          padding: 5px;
          line-height: 20px;
          font-size: 14px;
          border-radius: 5px;
          position: relative;
          .arrow{
            position: absolute;
            left: -10px;
            top: 5px;
            width: 0;
            height: 0;
            border: solid 6px;
            border-right-color: #eaeaea;
            border-left-color: transparent;
            border-top-color: transparent;
            border-bottom-color: transparent;
          }
        }
        .headImg{
          width: 30px;
          height: 30px;
          border-radius: 5px;
        }
      }
    }
  }
</style>
