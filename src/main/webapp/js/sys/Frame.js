function Frame() {

    var self = this;

    /**
     * 登录验证
     */
    this.login = function () {
        var url = ctx + '/sys/frame/login/';
        var data = $('#login-form').collectData();
        $.postJSON(url, data, function (json) {
           location.href = ctx;
        });
    };

    /**
     * 选择部门
     */
    this.chgDept = function (deptid) {
        var url = ctx + '/sys/frame/chgDept/?deptId=' + deptid;
        $.postJSON(url, {}, function (json) {
            location.href = ctx;
        });
    };

    /**
     * 修改密码
     */
    this.chgPwd = function () {
        var url = ctx + '/sys/frame/chgPwd/';
        var data = $('#chg-pwd-form').collectData();
        $.postJSON(url, data, function (json) {
            $.alert('密码修改成功，请重新登录！', self.toLogin);
        });
    };
};

var frame = new Frame();
