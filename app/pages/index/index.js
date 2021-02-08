// pages/index/index.js
import skmottos_digest from '../../resources/skmottos_digest.js'
import skmottos from '../../resources/skmottos.js'

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
        mottos: skmottos
    },

    change(evt) {
        this.setData({
            year: evt.detail.value.split('-')[0],
            month: evt.detail.value.split('-')[1],
            day: evt.detail.value.split('-')[2] 
        });
        console.log('change at page/index',this.data)
    }

})