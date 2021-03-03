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
    whom_index:0,
    what_index:0,
    showDPP: false,  
    dateDPP: "",//MMDD in lunar
    chinaM_array:chinaM_array,
    chinaD_array:chinaD_array,
    chinaM_index:0,
    chinaD_index:0,
    //avs=anniversary
    avs_list: [
      {//whom=index of whomfor_array,so on..
        whom:0,
        what:2,
        lunarM:0,
        lunarD:0
      },     
    ],
    showEditSection: false
  },

  bindWhomChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      whom_index: e.detail.value
    })
  },

  bindWhatChange: function(e){
    console.log('whatchange=',e.detail);
    this.setData({
      what_index:e.detail.value
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
    this.fn_closeDPP()
    this.setData({
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
      dateDPP:chinaM_array[mIndex]+chinaD_array[dIndex],
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
        dateDPP: mCn+dCn,
      }
    )
  }
})