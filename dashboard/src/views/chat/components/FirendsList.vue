<template>
  <div class="list">
    <div class="item"
      v-for="(item, index) in list" 
      :key="index"
      :class="{active: activeId == item.chatId}"
      @click="change(item)"
      >
      <div class="headImg">
        <img class="img" :src="item.headImg" alt="">
      </div>
      <div class="info">
        <div class="name">{{item.name}}</div>
        <div class="msg">{{item.remarks}}</div>
      </div>
    </div>
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
        childsId: ''
      }
    },
    methods: {
      change(item){
        this.$emit('change', item);
      }
    }
  }
</script>

<style lang="less" scoped>
  .list{
    position: relative;
    .item{
      padding: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &.active{
        background: #eaeaea;
      }
      .headImg{
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
        max-width: calc(100% - 70px);
        .name{
          font-size: 15px;
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
