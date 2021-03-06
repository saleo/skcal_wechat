//  pages/settings/settings.js 
import calendar from '../calendar/lunar-calendar'
const chinaMonthArray= ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
const chinaDayArray = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    whomforArray: ['祖先','父母','师长','配偶','自己'],
    whatforArray: ['生日','忌日','纪念日'],
    whomforIdx:0,
    whatforIdx:0,
    showDPP: false,  
    shownChinaMD: "",//MMDD in lunar
    chinaMonthArray:chinaMonthArray,
    chinaDayArray:chinaDayArray,
    chinaMonthIdx:0,
    chinaDayIdx:0,
    //avs=anniversary
    avsList: [
      // {
      //   uid:0,//unique id, YYMMDDMMSS
      //   whomforIdx:0,// //whomforIdx=index of whomforArray,so do latter items
      //   whatforIdx:2,
      //   chinaMonthIdx:0,
      //   chinaDayIdx:0,
      //   chked:false
      // },     
    ],
    showEditSection: false,
    showDuplicateWarning: false,
    duplicateDlgButtons: [{text:'确认'}],
    onlyOneDlgButtons: [{text:'确认'}],
    operate:'', //a for add, u for update
    UIDs:[], // uid list,for update/delete
    allChked:false,
    showOnlyOneWarning:false
  },

  onShow: function() {
    var avsEventsInFun=[]
    wx.getStorage({
      key: 'anniversary_events',
      success(res) {
        let avsEventsByDay=res.data //res.data={dayIdx1:[event1...n],dayIdx2:[event1..n]...}
        for (const dayIdx in avsEventsByDay) {
          if (avsEventsByDay.hasOwnProperty(dayIdx)) {       
            const avsEvents = avsEventsByDay[dayIdx];       
              avsEvents.forEach( avsEvent => {
                avsEventsInFun.push({
                  whomforIdx:avsEvent.whomforIdx,
                  whatforIdx:avsEvent.whatforIdx,
                  chinaMonthIdx:avsEvent.chinaMonthIdx,
                  chinaDayIdx:avsEvent.chinaDayIdx,
                  uid:avsEvent.uid,
                  chked:false
                })
              })
          }
        }

        let nowPages=getCurrentPages(),iLen=nowPages.length
        let thisPage=nowPages[iLen-1]
        thisPage.setData({
          avsList:avsEventsInFun
        })
      },
      fail() {
        console.log('page onLoad failed getStorage')
      }
    })
  },

  tapAllChkbox: function() {
    if (this.data.avsList.length==0) return;
    
    let avsListInFun = this.data.avsList;
    let uidsInFun=[];
    let allChked=avsListInFun.every(avs => avs.chked ==true);
    if (!allChked){
      avsListInFun.forEach(avs => {
        avs.chked=true
        uidsInFun.push(avs.uid)
      })
    }
    else{
      avsListInFun.forEach(avs => avs.chked=false)
    }
    this.setData({
      avsList:avsListInFun,
      UIDs:uidsInFun
    })
  },

  tapChkbox: function(e) {
    let avsListInFun=this.data.avsList,uidsInFun=this.data.UIDs;
    let uidSelected=e.currentTarget.dataset.uid;
    let uidIdx=uidsInFun.findIndex(uid => uid == uidSelected);
    let avsIdx=avsListInFun.findIndex(avs => avs.uid==uidSelected)

    if (uidIdx!=-1){// current item selected
      avsListInFun[avsIdx].chked=false
      uidsInFun.splice(uidIdx,1)
    }
    else{
      avsListInFun[avsIdx].chked=true
      uidsInFun.push(uidSelected)
    }
    this.setData({
      avsList:avsListInFun,
      UIDs:uidsInFun,
      allChked:avsListInFun.every(avs => avs.chked ==true)
    })
  },

  tapAdd: function() {
    let date=new Date(),y=date.getFullYear();
    var d=date.getDate();
    var m=date.getMonth()+1;
    m=m<10?'0'+m:m;
    d=d<10?'0'+d:d;
    let s2l=calendar.solar2lunar(y,m,d),mCn=s2l.IMonthCn,dCn=s2l.IDayCn;

    this.setData({
      whomforIdx:0,
      whatforIdx:0,
      shownChinaMD: mCn+dCn,
      chinaMonthIdx:s2l.lMonth-1,
      chinaDayIdx:s2l.lDay-1,
      operate:'a',
    })
    this.fn_showEditSection()
  },

  tapRemove: function() {
    let uidsInFun=this.data.UIDs,  avsListInFun=this.data.avsList,avsIdx=0;
    uidsInFun.forEach( uid => {
      avsIdx=avsListInFun.findIndex(avs => avs.uid == uid)
      avsListInFun.splice(avsIdx,1)
    })
    uidsInFun=[]
    this.setData({
      UIDs:uidsInFun,
      avsList:avsListInFun,
      allChked:false
    })

    this.saveStorage()
  },

  tapUpdate: function() {
    let uids=this.data.UIDs
    
    if (uids.length==0) return;
    if (uids.length>1) {
      this.setData({
        showOnlyOneWarning:true
      })
      return
    }

    let avsList=this.data.avsList;
    let idx=avsList.findIndex(avs => avs.uid==uids[0]);
    let whomforIdxInFun=avsList[idx].whomforIdx, whatforIdxInFun=avsList[idx].whatforIdx;
    let chinaMonthIdxInFun=avsList[idx].chinaMonthIdx,chinaDayIdxInFun=avsList[idx].chinaDayIdx;

    this.setData({
      whomforIdx:whomforIdxInFun,
      whatforIdx:whatforIdxInFun,
      chinaMonthIdx:chinaMonthIdxInFun,
      chinaDayIdx:chinaDayIdxInFun,
      shownChinaMD:chinaMonthArray[chinaMonthIdxInFun]+chinaDayArray[chinaDayIdxInFun],
      operate:'u'
    })
    this.fn_showEditSection()
  },

  bindWhomChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      whomforIdx: e.detail.value
    })
  },

  bindWhatChange: function(e){
    console.log('whatchange=',e.detail);
    this.setData({
      whatforIdx:e.detail.value
    })
  },

  fn_showEditSection: function() {
    this.setData({
      showEditSection:true
    })
  },

  fn_closeEditSection: function() {
    this.fn_closeDPP()
    this.setData({
      showEditSection:false
    })
  },
  fn_save: function() {
    var b1=false,b2=false;
    let avsListInFun=this.data.avsList,  UIDsInFun=this.data.UIDs,opInFun=this.data.operate;
    for (const avs of avsListInFun) {
      b1=avs['whomforIdx']==this.data.whomforIdx && avs['whatforIdx']==this.data.whatforIdx;
      b2=avs['chinaMonthIdx']==this.data.chinaMonthIdx && avs['chinaDayIdx']==this.data.chinaDayIdx;
      if ((b1 && b2) || (b1 && opInFun == 'a')) {
        this.setData({
          showDuplicateWarning:true
        });
        return;
      }
    }

    if (opInFun=='a'){
      let uidNext=new Date().getTime()
      avsListInFun.push({uid:uidNext, 
        whomforIdx:this.data.whomforIdx,
        whatforIdx:this.data.whatforIdx,
        chinaMonthIdx:this.data.chinaMonthIdx,
        chinaDayIdx:this.data.chinaDayIdx,
        chked:false});
    }
    else if (opInFun == 'u'){
      let index1=avsListInFun.findIndex(avs => avs.uid == UIDsInFun[0])
      avsListInFun.splice(index1,1,{uid:UIDsInFun[0], 
        whomforIdx:this.data.whomforIdx,
        whatforIdx:this.data.whatforIdx,
        chinaMonthIdx:this.data.chinaMonthIdx,
        chinaDayIdx:this.data.chinaDayIdx,
        chked:true})
    }

    this.setData({
      avsList:avsListInFun,
    })

    this.saveStorage()

    this.fn_closeEditSection()
  },

  fn_showDPP: function()  {
    this.setData({
      showDPP:true
    })
  },
  fn_closeDPP: function(){
    this.setData({
      showDPP:false
    })
  },

  submitDPP: function(evt){
    let mIndex=evt.detail.chinaMD_index[0],dIndex=evt.detail.chinaMD_index[1];
    this.setData({
      chinaMonthIdx:mIndex,
      chinaDayIdx:dIndex,
      shownChinaMD:chinaMonthArray[mIndex]+chinaDayArray[dIndex],
    })
  },

  fn_tapDuplicateWarningOK: function() {
    this.setData({
      showDuplicateWarning:false
    })
  },

  fn_tapOnlyOneWarningOK: function() {
    this.setData({
      showOnlyOneWarning:false
    })
  },

  saveStorage: function(){
    let avsEventsByDay={},dayIdx='',nowDate=new Date(),nowYear=nowDate.getFullYear(),l2s=0,y=0,m=0,d=0
    let avsListInFun = this.data.avsList
    avsListInFun.forEach(avs => {
      l2s=calendar.lunar2solar(nowYear,avs.chinaMonthIdx+1,avs.chinaDayIdx+1)
      y=l2s.cYear,m=l2s.cMonth,d=l2s.cDay
      m=m<10?'0'+m:m
      d=d<10?'0'+d:d
      dayIdx='d'+y+m+d
      if (avsEventsByDay[dayIdx]==undefined)
        avsEventsByDay[dayIdx]=[]
      avsEventsByDay[dayIdx].push({
        whomforIdx: avs.whomforIdx,
        whatforIdx: avs.whatforIdx,
        chinaMonthIdx:avs.chinaMonthIdx,
        chinaDayIdx: avs.chinaDayIdx,
        uid: avs.uid
      })
    })

    wx.setStorage({
      data: avsEventsByDay,
      key: 'anniversary_events',
    })    
  }
})

