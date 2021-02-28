//  pages/settings/settings.js 
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
    dateDPP: Date(),
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

  tapShowDPP: function()  {
    this.setData({
      showDPP:true
    })
  },
  submitDPP: function(){
    this.setData({
      dateDPP:"datenow"
    })
  },

  onLoad: function(options) {
    let date=new Date(),y=date.getFullYear();
    var d=date.getDate();
    var m=date.getMonth()+1;
    m=m<10?'0'+m:m;
    d=d<10?'0'+d:d;
    this.setData({
        dateDPP: y+'-'+m+'-'+d
      }
    )
  }
})