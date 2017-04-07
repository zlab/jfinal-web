<#assign title = " &rsaquo; 登陆">
<#include "/common/window.ftl">
<@window "login-layout blur-login">

<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="${ctx}/js/common/weixin.js"></script>

<script type="text/javascript">

    // 图片上传注册
    wx.ready(function () {
        $(function () {
            $('#choose_image').click(function () {
                wx.chooseImage({
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        if (localIds && localIds.length) {


                            // 上传图片
                            wx.uploadImage({
                                localId: localIds[0],
                                isShowProgressTips: 0, // 默认为1，显示进度提示
                                success: function (res) {
                                    hideLoading();
                                    var serverId = res.serverId; // 返回图片的服务器端ID
                                    $('#media_id').val(serverId);
                                },
                                fail: function (res) {
                                    hideLoading();
                                    // alert(JSON.stringify(res));
                                    alert('图片上传失败');
                                }
                            });
                        }
                    }
                });
            });
        })

    });
</script>

<div class="main-container">
    <button class="btn" id="choose_image">上传图片</button>
</div>


</@window>