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
        mottos_digest: skmottos_digest,
        mottos: skmottos
    },

    change(evt) {
        this.setData({
            month: evt.detail.value
        });
    }

})