// pages/index/index.js
import skmottos_digest from '../../resources/skmottos_digest.js'
import skmottos from '../../resources/skmottos.js'

const htmlSnip ="<div align='center'><a hrer='https://www.shoukang.org'>https://www.shoukang.org</a></div>"
const hr="<hr color='red' />"

function getToday() {
    let date = new Date();
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}

Page({

    data: {
        year: getToday()[0],
        month: getToday()[1],
        day: getToday()[2],
        mottos_digest: skmottos_digest,
        mottos: skmottos,
        mottos4Month: "",
        fbi_show: false,
        mottos_show: false,
        //forbidden information
        fbiDesc:"",
        lunarDateMD:"",
        htmlSnip: htmlSnip
    },

    onLoad(){
        console.log('onload...ymd=',this.data.year,this.data.month,this.data.day)
    },

    onShow() {
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
            console.log('IndexPage onShow failed getStorage')
          }
        })
    },

    change(evt) {
        this.setData({
            year: evt.detail.value.split('-')[0],
            month: evt.detail.value.split('-')[1],
            day: evt.detail.value.split('-')[2] 
        });
    },

    fbi_prompt(evt) {
        let fbi=evt.detail.value.fbi;
        let lunar=evt.detail.value.lunar;
        const iLen=Object.entries(fbi).length;
        let desc="";
        for (let i=0;i<iLen;i++){
            desc=desc+fbi['d'+i][0]+'\n'
        }
        this.setData({
            fbi_show: true,
            fbiDesc: desc,
            lunarDateMD: lunar['IMonthCn']+lunar['IDayCn']
        });
    },

    mottosDigestTap(e) {
        let y='y'+this.data.year,m=this.data.month,
        mottos1 = this.data.mottos[y][m].join('\n\n');
        this.setData({
            mottos_show: true,
            mottos4Month: mottos1
        })
    },

})