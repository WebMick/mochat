<template>
  <div class="inputBox">
    <div class="action">
      <div class="item">
        <img src="../../../assets/file.png" class="icon" >
      </div>
    </div>
    <div class="ipt">
      <textarea class="textarea" v-model="content"></textarea>
    </div>
    <div class="sendBox">
      <div class="btnSend" @click="sendMsg" @keyup.enter="sendMsg">发送(Enter)</div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        content: ''
      }
    },
    methods: {
      sendMsg(){
        let { content } = this;
        this.$emit('sendMsg', { content })
        this.content = '';
      }
    }
  }
</script>

<style lang="less" scoped>
  .inputBox{
    display: flex;
    flex-direction: column;
    .action{
      height: 25px;
      display: flex;
      padding: 0 15px;
      .item{
        width: 25px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon{
          width: 20px;
          height: 20px;
        }
      }
    }
    .ipt{
      flex: 1;
      outline: none;
      position: relative;
      .textarea{
        position: absolute;
        top: 0;
        left: 20px;
        right: 20px;
        height: 100%;
        background: none;
        outline: none;
        resize: none;
        border: none;
      }
    }
    .sendBox{
      height: 40px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btnSend{
        cursor: pointer;
      }
    }
  }
</style>
