//  pages/settings/settings.js 
import calendar from '../calendar/lunar-calendar'
const chinaM_array= ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
const chinaD_array = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    whomfor_array: ['祖先','父母','师长','配偶','自己'],
    whatfor_array: ['生日','忌日','纪念日'],
    whomfor_index:0,
    whatfor_index:0,
    showDPP: false,  
    shownChinaMD: "",//MMDD in lunar
    chinaM_array:chinaM_array,
    chinaD_array:chinaD_array,
    chinaM_index:0,
    chinaD_index:0,
    //avs=anniversary
    avsList: [
      // {
      //   uid:0,//unique id, YYMMDDMMSS
      //   whom:0,// //whom=index of whomfor_array,so do latter items
      //   what:2,
      //   lunarM:0,
      //   lunarD:0,
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
    let uid=e.currentTarget.dataset.uid;
    let idx=avsListInFun.findIndex(item => item.uid=uid),chked=avsListInFun[idx].chked;
    if (chked){
      let currentIdx=uidsInFun.findIndex(uidCurrent => uidCurrent==uid)
      uidsInFun.splice(currentIdx,1)
    }
    else{
      uidsInFun.push(uid)
    }
    avsListInFun[idx].chked=!chked
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
    let currentUI
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
      whomfor_index: e.detail.value
    })
  },

  bindWhatChange: function(e){
    console.log('whatchange=',e.detail);
    this.setData({
      whatfor_index:e.detail.value
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
      b1=avs['whom']==this.data.whomfor_index && avs['what']==this.data.whatfor_index;
      b2=avs['lunarM']==this.data.chinaM_index && avs['lunarD']==this.data.chinaD_index;
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
        whom:this.data.whomfor_index,
        what:this.data.whatfor_index,
        lunarM:this.data.chinaM_index,
        lunarD:this.data.chinaD_index,
        chked:false});
    }
    else if (opInFun == 'u'){
      let index1=avsList.findIndex(e => e.uid == UIDsInFun[0])
      avsListInFun.splice(index1,0,{uid:UIDsInFun[0], 
        whom:this.data.whomfor_index,
        what:this.data.whatfor_index,
        lunarM:this.data.chinaM_index,
        lunarD:this.data.chinaD_index,
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
      chinaM_index:mIndex,
      chinaD_index:dIndex,
      shownChinaMD:chinaM_array[mIndex]+chinaD_array[dIndex],
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
        chinaM_index:s2l.lMonth-1,
        chinaD_index:s2l.lDay-1
      }
    )
  },

  fn_tapDialogOK: function() {
    this.setData({
      showDialog:false
    })
  }
})