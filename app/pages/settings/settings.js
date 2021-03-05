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
    showDialog: false,
    dialog_buttons: [{text:'确认'}],
    operate:'', //a for add, u for update
    UIDs:[] // uid list,for update/delete
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
      UIDs:uidsInFun
    })
  },

  tapAdd: function() {
    this.setData({
      operate:'a',
      showEditSection:true
    })
  },

  tapRemove: function() {
    // let currentUI
  },

  tapUpdate: function() {
    this.setData({
      operate:'u',
      showEditSection:true
    })
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
          showDialog:true
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
      let index1=avsList.findIndex(e => e.uid == UIDsInFun[0])
      avsListInFun.splice(index1,0,{uid:UIDsInFun[0], 
        whomforIdx:this.data.whomforIdx,
        whatforIdx:this.data.whatforIdx,
        chinaMonthIdx:this.data.chinaMonthIdx,
        chinaDayIdx:this.data.chinaDayIdx,
        chked:false})
    }

    this.fn_closeDPP()
    this.setData({
      avsList:avsListInFun,
      showEditSection:false
    })
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
      showDPP:false
    })
  },

  onLoad: function(options) {
    let date=new Date(),y=date.getFullYear();
    var d=date.getDate();
    var m=date.getMonth()+1;
    m=m<10?'0'+m:m;
    d=d<10?'0'+d:d;
    let s2l=calendar.solar2lunar(y,m,d),mCn=s2l.IMonthCn,dCn=s2l.IDayCn;

    this.setData({
        shownChinaMD: mCn+dCn,
        chinaMonthIdx:s2l.lMonth-1,
        chinaDayIdx:s2l.lDay-1
      }
    )
  },

  fn_tapDialogOK: function() {
    this.setData({
      showDialog:false
    })
  }
})