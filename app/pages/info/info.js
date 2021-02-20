// pages/info/info.js
Page({
  data: {
    contentType: "intro"
  },

  onLoad(options) {
    console.log(options)
    this.setData({
      contentType: options.contentType
    })
  }
})