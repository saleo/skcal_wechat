// pages/info/health.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    activeTab:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tabs=[
      {
        title:'脏腑心理病因\n基本取象规律',
        content:'\
        '
      },
      {
        title:'身体部位\n取象规律',
        content:'\
        '
      },
      {
        title:'部分感觉\n心情对应',
        content:'\
        '
      }
    ]
    this.setData({tabs})
  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  }
})