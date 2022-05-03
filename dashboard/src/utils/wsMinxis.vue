<template>
</template>

<script>
  export default{
    methods: {
      initWebSocket(){
        this.webSocket = new WebSocket('ws://129.211.168.130:10205/ws/conn');
        this.webSocket.onmessage = this.webSocketOnMessage;
        this.webSocket.onopen = this.webSocketOpen;
        this.webSocket.onerror = this.webSocketError;
        this.webSocket.onclose = this.webSocketClose;
      },
      webSocketOnMessage(e){
        let { data } = e;
        if(!data) return;
        data = JSON.parse(data);
        let { event = '' } = data;
        // 关闭心跳包的监听
        // if(!event || event == "heartbeat") return;
        if(!event) return;
        this.wsGetMsg(data);
      },
      webSocketOpen(){
        this.wsIsOpen = true;
        this.webSocketSendMessage(
          {
            "event": "client_type",
            "clientType":"pull",
            "data":
              {
                "clientId":"1","clientType":"pull",
              }
            }
        );
        this.wsHeartBeat();
      },
      webSocketSendMessage(msgObj){
        if(this.wsIsOpen){
          this.webSocket.send(JSON.stringify(msgObj));
        }
      },
      webSocketError(){
        this.initWebSocket();
      },
      webSocketClose(){
        this.wsIsOpen = false;
        clearInterval(this.wsHeartBeatTimer);
      },
      wsHeartBeat(){
        if(this.wsIsOpen){
          this.wsHeartBeatTimer = setInterval(() => {
            this.webSocketSendMessage({"event":"heartbeat"})
          }, 10 * 1000);
        }
      }
    }
  }
</script>

<style>
</style>
