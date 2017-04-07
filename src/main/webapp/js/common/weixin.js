var signUrl = ctx + "/weixin/api/signature";
var signData = {
    // location.href.split('#')[0]g
    url: location.origin + location.pathname + location.search
};

wx.error(function (res) {
    alert(res.errMsg);
});

$.postJSON(signUrl, signData, function (json) {
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: json.appId, // 必填，公众号的唯一标识
        timestamp: json.timestamp, // 必填，生成签名的时间戳
        nonceStr: json.nonceStr, // 必填，生成签名的随机串
        signature: json.signature,// 必填，签名，见附录1
        jsApiList: [    // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ]
    });
});

wx.ready(function () {
    /**
     * 判断当前客户端版本是否支持指定JS接口
     */
    wx.checkJsApi({
        jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
    });

});

