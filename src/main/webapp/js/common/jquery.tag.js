$.fn.modal.defaults = {
    backdrop: 'static',
    keyboard: false
};

$.extend($.validator.defaults, {
    errorElement: 'div',
    errorClass: 'help-block',
    highlight: function (e) {
        $(e).closest('.form-group').removeClass('has-success').addClass('has-error');
    },

    success: function (e) {
        $(e).closest('.form-group').removeClass('has-error');// .addClass('has-success');
        $(e).remove();
    },

    errorPlacement: function (error, element) {
        if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
            var controls = element.closest('div[class*="col-"]');
            if (controls.find(':checkbox,:radio').length > 1)
                controls.append(error);
            else
                error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
        } else if (element.is('.select2')) {
            error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
        } else if (element.is('.chosen-select')) {
            error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
        } else
            error.insertAfter(element.parent());
    }
});

$.extend($.validator.messages, {
    required: "必选字段",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),
    minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),
    rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
    range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
    max: $.validator.format("请输入一个最大为 {0} 的值"),
    min: $.validator.format("请输入一个最小为 {0} 的值")
});

bootbox.setDefaults({
    locale: 'zh_CN',
    animate: false
});

$.alert = function (message, callback) {
    return bootbox.alert({
        title: '操作提示',
        message: message,
        callback: callback
    });
};

$.confirm = function (message, callback) {
    return bootbox.confirm({
        title: '操作提示',
        message: message,
        callback: callback
    });
};

$.prompt = bootbox.prompt;

/**
 * info
 */
$.info = function (msg, delay) {
    $.gritter.add({
        text: msg,
        time: delay || 2000,
        class_name: 'gritter-info'
    });
};

/**
 * success
 */
$.success = function (msg, delay) {
    $.gritter.add({
        text: msg,
        time: delay || 2000,
        class_name: 'gritter-success'
    });
};

/**
 * warn
 */
$.warn = function (msg, delay) {
    $.gritter.add({
        text: msg,
        time: delay || 3000,
        class_name: 'gritter-warning'
    });
};

/**
 * error
 */
$.error = function (msg, delay) {
    $.gritter.add({
        text: msg || new String(msg),
        time: delay || 3000,
        class_name: 'gritter-error'
    });
};

/**
 * Table
 */
$.fn.table = function (num) {
    var table = $(this);

    table.addClass('table-striped table-bordered table-hover');

    num = Number(num || 8);
    var gap = num - table.find("tbody tr").length;
    if (gap > 0) {
        var tr = [];
        tr.push('<tr class="blank">');
        table.find("thead tr th").each(function () {
            tr.push('<td>&nbsp;</td>');
        });
        tr.push('</tr>');
        var row = $(tr.join(''));
        for (var i = 0; i < gap; i++) {
            table.find('tbody').append(row.clone());
        }
    }
}

/**
 * 分页
 */
$.fn.paging = function (func, btn) {
    var paging = $(this);

    var query = function (pageNo) {
        pageNo = pageNo || 1;
        paging.find('.page-no').val(pageNo);
        // func();
        eval(func + '()');
    };

    btn = btn || '.btn.btn-query';

    if ($(btn).length == 1) {
        $(btn).off('click.paging').on('click.paging', function (e) {
            query(1);
        });
    }

    paging.find('.pagination li a').prop('href', 'javascript:void(0);');

    paging.find('.pagination li:not(.disabled, .active)').on('click', function () {
        query($(this).data('page-no'));
    });
}

jQuery(function ($) {

    // 控件初始化
    // $.initControl();

    // 置空隐藏域
    $('input.hidden-name').on('change', function () {
        if (!$(this).val()) {
            $('#' + $(this).attr('hiddenid')).val('');
        }
    });

    // 键盘确定，提交表单
    $('form').keydown(function (e) {
        if (e.keyCode == 13) {
            var submit = $(this).find('.submit:first');
            if (submit.length) {
                submit.trigger('click');
            } else {
                $(this).find('.btn.cancel:first').trigger('click');
            }
            return false;
        }
    });
});

/**
 * 控件初始化
 */
(function ($) {

    $.initControl = function () {
        $.initDate();
    };

    $.initDate = function () {
        var dateOptions = {
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            showOtherMonths: false,
            selectOtherMonths: false,
            firstDay: 0,
            showAnim: ''
        };

        var datetimeOptions = $.extend({}, dateOptions, {
            showOtherMonths: true,
            selectOtherMonths: false,
            currentText: '今天',
            closeText: '关闭',
            timeText: '时间：',
            hourText: '时',
            minuteText: '分',
            secondText: '秒',
            timeFormat: 'HH:mm:ss',
            controlType: 'spinner',
            showTime: false,
            showHour: true,
            showMinute: true,
            showSecond: true
        });

        $('.date').each(function () {
            var self = $(this);
            var options = $.extend({}, dateOptions);

            if (self.attr('default')) {
                options.defaultDate = self.attr('default');
            }

            self.datepicker(options);

        });

        $('.datetime').each(function () {
            var self = $(this);
            var options = $.extend({}, datetimeOptions);

            if (self.attr('default')) {
                options.defaultDate = self.attr('default');
            }

            var timetype = self.attr('timetype') || 1;
            options.timetype = timetype;

            // 当前时间
            if (timetype == 1) {
                var now = new Date();
                options.hour = now.getHours();
                options.minute = now.getMinutes();
                options.second = now.getSeconds();
            }

            // 0时0分0秒
            else if (timetype == 2) {
                options.hour = 0;
                options.minute = 0;
                options.second = 0;
            }

            // 23时59分59秒
            else if (timetype == 3) {
                options.hour = 23;
                options.minute = 59;
                options.second = 59;
            }

            self.datetimepicker(options);
        });
    };

    /**
     * 最少显示行数
     */
    $.initTableBlankRows = function (id, num) {

    };

    $.initTableEvent = function (id) {
        var table = $('#table-' + id);

        if (table.find('.ui-row-choice').length > 0) {
            table.find('.ui-check-all').show();
        }

        // 全选
        table.on('click', '.ui-check-all', function () {
            var checked = $(this).prop('checked');
            table.find('tbody .ui-row-checkbox').prop('checked', checked);
        });

        // 选中行时，选择选择框
        table.on('click', '.ui-check-row', function (e) {
            if ($(e.target).is('.ui-row-choice')) {
                return;
            }

            $(this).find('.ui-row-choice').each(function () {
                $(this).prop('checked', !$(this).prop('checked'));
            });
        });

        // 同步全选/全不选
        table.on('click', function () {
            var all = $(this).find('.ui-row-choice').length;
            var checked = $(this).find('.ui-row-choice:checked').length;
            var checkedall = all > 0 && (all == checked);
            $(this).find('.ui-check-all').prop('checked', checkedall);
        });
    };

    /**
     * 分页
     */
    $.initPaging = function (id) {
        var paging = $('#paging-' + id);
        var btn = $('#' + paging.attr('btn'));
        if (!btn.length) {
            btn = $('.query:first');
        }

        if (!btn.length) {
            $.error('翻页标签需要一个查询按钮');
            return;
        }

        btn.data('_paging', paging);
        btn.data('_table', $('#table-' + id));

        var onclick = btn.data('_onclick') || btn.prop('onclick');

        var query = function (pageNo) {
            pageNo = pageNo || 1;
            btn.data('_paging').find('.page-no').val(pageNo);
            onclick && onclick.call();
        };

        if (!btn.hasClass('paged')) {
            btn.removeProp('onclick').data('_onclick', onclick);
            btn.on('click', function (e) {
                query(1);
            }).addClass('paged');
        }

        paging.find('.btn.pagination').on('click', function () {
            query($(this).attr('pageno'));
        });

        paging.find('.goto-page-no').on('focusout', function () {
            var pageNo = $(this).val();
            var totalPage = Number(paging.find('.total-page').text());
            if (!pageNo || isNaN(pageNo) || pageNo > totalPage) {
                $(this).val(paging.find('.pagination.current').attr('pageno'));
            }
        });

        paging.find('.btn.goto-btn').on('click', function () {
            paging.find('.goto-page-no').focusout();
            query(paging.find('.goto-page-no').val());
        });
    };
})(jQuery);