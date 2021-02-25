// pages/info/health.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    activeTab:0,
    tableCaptions: [
      {tc1:'脏腑名称',tc2:'功能/定向心理病因'},
      {tc1:'脏腑名称',tc2:'功能/定向心理病因'},
      {tc1:'脏腑名称',tc2:'功能/定向心理病因'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tabs=[
      {
        title:'脏腑心理病因\n基本取象规律',
        content:[
          {
            viscera:'肝',
            desc1:'将军之官,管分辨、肝肾同源',
            desc2:'有窝囊、委屈、冤枉、遗憾等【肝病与怒气紧密相关】'
          },
          {
            viscera:'胆',
            desc1:'中正之官,奇恒之腑,清净之府',
            desc2:'为对与错较劲，总认为自己对；不清净、严格、不争气等'
          },
          {
            viscera:'心',
            desc1:'君主之官,心主识神,情感思维',
            desc2:'以好为主的盼望、希望、惦记、高兴、兴奋、紧张、激动、担心、害怕、达不到、力量不足等【心脏病与恨气密切相关】'
          },
          {
            viscera:'脾',
            desc1:'主运化,统血,后天之本,分辨功能',
            desc2:'对事物思虑过度、思虑凝结等【脾病与怨气密切相关】'
          }, 
          {
            viscera:'胃',
            desc1:'受盛之官',
            desc2:'对事物的接受不接受、容纳不容纳等'
          },                    
          {
            viscera:'肺',
            desc1:'相府之官,吐故纳新,交换',
            desc2:'对未来前途的担忧、悲伤，正常的事被干扰，需要又接受不了等【肺病与嫉妒等对抗密切相关】'
          }, 
          {
            viscera:'大肠',
            desc1:'传导之官,管变化',
            desc2:'事物的变化、进出的钱'
          },                    
          {
            viscera:'肾',
            desc1:'作强之官,先天之本,肾主选择',
            desc2:'选择，对以前的人、事、物的担心、后怕、后悔、惊恐、保护、保卫以及对以前错过的机会、制定的政策产生的不平心理【肾病与烦气密切相关】'
          }          
        ]
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