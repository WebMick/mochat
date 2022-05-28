<template>
</template>

<script>
  export default{
    data(){
       return {
           wsIsOpen: false
       }
    },
    methods: {
      initWebSocket(){
        this.webSocket = new WebSocket('ws://129.211.168.130:10205/ws/conn');
        this.webSocket.onmessage = this.webSocketOnMessage;
        this.webSocket.onopen = this.webSocketOpen;
        this.webSocket.onerror = this.webSocketError;
        this.webSocket.onclose = this.webSocketClose;
        this.deviceId = this.userInfo.userId + "20220524"
      },
      webSocketOnMessage(e){
        let { data } = e;
        if(!data) return;
        data = JSON.parse(data);
        let { event } = data;
        // 关闭心跳包的监听
        if(!event || event == "HEARTBEAT") return;
        this.wsGetMsg(data);
      },
      webSocketOpen(){
        this.wsIsOpen = true;
        this.webSocketSendMessage(
          {
            "event": "DEVICE_LOGIN",
            "deviceType":"H5",
            "deviceId": this.deviceId
          }
          // 
        );
        this.wsHeartBeat();

      },
      subscribe(phone){
          this.webSocketSendMessage({
                "event":"H5_SUBSCRIBE",
                "deviceType":"H5",
                "deviceId": this.deviceId,
                "data":{
                    "cropId":"1970325017517397",
                    "userId":[
                    ],
                    "phone": phone
                }
        })
      },
      webSocketSendMessage(msgObj){
        if(this.wsIsOpen){
          this.webSocket.send(JSON.stringify(msgObj));
        }
      },
      webSocketError(){
        //this.initWebSocket();
      },
      webSocketClose(){
        this.wsIsOpen = false;
        clearInterval(this.wsHeartBeatTimer);
      },
      wsHeartBeat(){
        if(this.wsIsOpen){
          this.wsHeartBeatTimer = setInterval(() => {
            this.webSocketSendMessage({"event":"HEARTBEAT", "deviceType": "h5", "deviceId": this.deviceId})
          }, 3 * 1000);
        }
      }
    }
  }
</script>

<style>
</style>
