
const friendsListData = (length = 10) => {
  let list = [];
  for(let i = 0; i < length; i++){
    let id = i + 1;
    let item = {
      name: '测试微信昵称',
      headImg: 'https://img0.baidu.com/it/u=178892670,2966992691&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
      id,
      remarks: '这是备注信息' + id,
      chatId: id,
      unreadCount: 2, // 未读数据
    };
    list.push(item);
  }
  return list;
};

// 根据id生成测是消息 并+入本地缓存

const createdMsgById = (id, length) => {
  let list = [];
  for(let i = 0; i < length; i++){
    let id = i + 1;
    let type = Math.floor(Math.random() * 2 + 1);
    let item = { msgId: '', msg: '测试消息啊啊啊啊啊' + i, type, isRead: true }
    list.push(item);
  }
  return list;
}


const msgListData = {
  1: {
    msg: [
      { msgId: '', msg: '男女平等，为什么我不能进入你的房间？', type: 1, isRead: true },
      { msgId: '', msg: '我真的很羡慕你。你这么年轻就认识我。', type: 1, isRead: true },
      { msgId: '', msg: '没有钱，没有权利，无论你有多好，你都可以跟随我吗？', type: 2, isRead: true },
      { msgId: '', msg: '天哪，您夏天和冬天都住在一起吗？生出这种幽灵般的天气！', type: 1, isRead: true },
      { msgId: '', msg: '如果不是下雨天，那不是一眼，您怎么能看到我的下雨心。', type: 2, isRead: true },
      { msgId: '', msg: '如果你喜欢我，请亲我。如果你不喜欢我，我会吻你，好吗？', type: 1, isRead: true },
      { msgId: '', msg: '做我女朋友吧，行还是不行？只许回答一个字！', type: 1, isRead: true },
      { msgId: '', msg: '滚', type: 2, isRead: true },
      { msgId: '', msg: '一只公鹿,它走着走着,越走越快,最后它变成了高速公路(鹿)！', type: 1, isRead: true },
      { msgId: '', msg: '一只乌龟从一堆大便上走过，却只在上面留下3个脚印。为什么？？ 因为它一只手捏着鼻子！！！', type: 2, isRead: true },
      { msgId: '', msg: '昨天梦见上帝说可满足我一个愿望我拿出地球仪说要世界和平，他说太难换一个吧，我拿出你的照片说要这人变漂亮，他沉思了一下说拿地球仪我再看看。', type: 2, isRead: true },
      { msgId: '', msg: '一女奇丑，嫁不出去，希望被拐卖。终于梦想成真，却半月卖不出去。绑匪将其送回，她坚决不下车，绑匪咬牙一跺脚：走，车不要了', type: 1, isRead: true },
      { msgId: '', msg: '有一次我向人借钱，本来想说的是“等我取了钱就还你”说成“等我有了钱就取你” ', type: 2, isRead: true },
    ], // 消息
    userInfo: {
      name: '我的微信-1',
      headImg: 'https://img0.baidu.com/it/u=178892670,2966992691&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
      id: 1
    },
    firendInfo: {
      name: '测试微信昵称',
      headImg: 'https://img0.baidu.com/it/u=325674188,3280397254&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
      id: 2
    }
  }
}

export {
  friendsListData,
  msgListData
}
