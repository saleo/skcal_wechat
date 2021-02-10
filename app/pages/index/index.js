// pages/index/index.js
import skmottos_digest from '../../resources/skmottos_digest.js'
import skmottos from '../../resources/skmottos.js'

const htmlSnip ="<div align='center'><a hrer='https://www.shoukang.org'>https://www.shoukang.org</a></div>"

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
        htmlSnip,
        fbi_show: false,
        mottos_show: false,
        //forbidden information
        fbiDesc:"",
        lunarDateMD:"",
    },

    change(evt) {
        console.log('change triggered')
        this.setData({
            year: evt.detail.value.split('-')[0],
            month: evt.detail.value.split('-')[1],
            day: evt.detail.value.split('-')[2] 
        });
    },

    fbi_prompt(evt) {
        // console.log('prompt=',evt.detail)
        let fbi=evt.detail.value.fbi;
        let lunar=evt.detail.value.lunar;
        const iLen=Object.entries(fbi).length;
        let desc="";
        for (let i=0;i<iLen;i++){
            desc=desc+fbi['d'+i][0]+'\n'
        }
        console.log('lunar=',lunar)
        this.setData({
            fbi_show: true,
            fbiDesc: desc,
            lunarDateMD: lunar['IMonthCn']+lunar['IDayCn']
        });
    },

    mottosDigestTap(e) {
        console.log('mottes taped',this.data.year)
        let y='y'+this.data.year,m=this.data.month,
        mottos1 = this.data.mottos[y][m].join('\n\n');
        console.log(mottos1)
        this.setData({
            mottos_show: true,
            mottos4Month: mottos1
        })
    },

})