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
        htmlSnip,
        show: false,
        buttons:[{
            type: 'default',
            className: '',
            text: 'ok',
            value: 0
        }],
        //forbidden information
        fbiDesc:""
    },

    change(evt) {
        console.log('change triggered')
        this.setData({
            year: evt.detail.value.split('-')[0],
            month: evt.detail.value.split('-')[1],
            day: evt.detail.value.split('-')[2] 
        });
    },

    prompt(evt) {
        console.log('prompt=',evt.detail)
        let fbi=evt.detail.value;
        const iLen=Object.entries(fbi).length;
        let desc="";
        for (let i=0;i<iLen;i++){
            desc=desc+fbi['d'+i][0]+','
        }
        console.log('desc',desc)
        this.setData({
            show: true,
            fbiDesc: desc
        });
    },

    halfScreenBtnTap(e) {
        this.setData({
            show: false,
        })
    }
})