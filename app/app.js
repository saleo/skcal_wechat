//app.js
App({
  global_avsEventsInStorageOnLaunch:[],
  global_avsEventsInSettingsPage:[],
  firstRun: false,
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    if (!wx.cloud){
      console.error('use basic lib 2.3.3+ to enable cloud-capability')
    }
    else{
      wx.cloud.init({
        env: 'skcal-cloud-7gxqf5oo268b510c',
        traceUser: true
      })
    }

    wx.getStorage({
      key: 'anniversary_events',
      success(res) {
        getApp().global_avsEventsInStorageOnLaunch=res.data
      },
      fail() {
        console.error
      }
    })

    this.firstRun =true
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    var nowEvents=[],nowAutoBackup=false;
    wx.getStorage({
      key: 'anniversary_events',
      success (res) {
        console.log('onhide..',res)
        nowEvents = res.data
      },
      fail (){
        console.error
      }
    }) 
    wx.getStorage({
      key: 'autoBackup_chked',
      success (res) {
        nowAutoBackup=res.data 
      },
      fail (){
        console.error
      }
    })
    let bEventsChanged= !(this.global_avsEventsInStorageOnLaunch.length == nowEvents.length) && (this.global_avsEventsInStorageOnLaunch.every((value,index) => value ==nowEvents[index]))
    if (bEventsChanged  && nowAutoBackup){
      wx.cloud.callFunction({
        name:'backupAVSEvents',
        data:{
          avsEvents: getApp().global_avsEventsInSettingsPage
        },
        success: function(res) {
          console.log('app onhide backup res=',res)
        },
        fail: console.error
      })
    }

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
