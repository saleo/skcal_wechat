// pages/index/index.js
import skmottos_digest from '../../resources/skmottos_digest.js'
import skmottos from '../../resources/skmottos.js'
const common = require('../../commons/common')

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
        htmlSnip: '',
        avsEventsByDayInPage:{},
        avsEvents_desc:""
    },

    avsEventsCurrentDayWithLineBreak:[],

    onLoad(){

        wx.getStorage({
          key: 'anniversary_events',
          success(res) {
            let avsEventsByDay=res.data //res.data={dayIdx1:[event1...n],dayIdx2:[event1..n]...}
 
    
            let nowPages=getCurrentPages(),iLen=nowPages.length
            let thisPage=nowPages[iLen-1]
            thisPage.setData({
              avsEventsByDayInPage:avsEventsByDay
            })
          },
          fail() {
            console.log('IndexPage onShow failed getStorage')
          }
        })
    },

    change(evt) {
        this.setData({
            year: evt.detail.value.split("/")[0],
            month: evt.detail.value.split("/")[1],
            day: evt.detail.value.split("/")[2] 
        });
    },

    fbi_prompt(evt) {
        let fbi=evt.detail.value.fbi,avsEventsByDayInPage=this.data.avsEventsByDayInPage
        let avsEventsCurrentDay=avsEventsByDayInPage[evt.detail.value.dayIdx]
        let lunar=evt.detail.value.lunar;
        let iLen=Object.entries(fbi).length;
        let skEvents="";
        for (let i=0;i<iLen;i++){
            skEvents=skEvents+fbi['d'+i][0]+'\n\n'
        }
        let avsEventsCurrentDayWithLineBreak="",whomfor="",whatfor=""
        if (avsEventsCurrentDay!=undefined) {
            iLen=avsEventsCurrentDay.length
            for (let i=0;i<iLen;i++){
                whomfor=common.whomforArray[avsEventsCurrentDay[i]['whomforIdx']]
                whatfor=common.whatforArray[avsEventsCurrentDay[i]['whatforIdx']]
                avsEventsCurrentDayWithLineBreak=avsEventsCurrentDayWithLineBreak+whomfor+whatfor+'\n\n'
            }
        }
        this.setData({
            fbi_show: true,
            skEvents: skEvents,
            lunarDateMD: lunar['IMonthCn']+lunar['IDayCn'],
            avsEvents_desc: avsEventsCurrentDayWithLineBreak
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
    tapNavigate(e){
        let page=e.currentTarget.dataset.page
        if (page!="/pages/index/index"){
            wx.navigateTo({
                url: page,
              })
        }
        else{
            let m=getToday()[1]
            if (m!=this.data.month)
                wx.navigateTo({
                  url: page
                })
        }
    }
})