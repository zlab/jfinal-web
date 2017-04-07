$.fn.autoLoad = function (func) {
    var more = $('<div id="load_more">正在加载下一页</div>');
    more.css({
        'background-color': '#EBEBEB',
        'padding': '10px 15px',
        'text-align': 'center'
    });

    more.data('page', 1);

    more.insertAfter(this);

    $.fn.autoLoad.hasMore = true;

    var callback = function (data) {
        $.fn.autoLoad.isLoading = false;

        if (!data.pageData) {
            $.fn.autoLoad.hasMore = false;
        }

        if (data.maxPage == undefined) {
            more.html('数据加载失败');
        }

        if (data.maxPage == 0) {
            more.html('没有数据');
        }

        if (data.maxPage == data.currPage) {
            more.html('已没有更多');
            $.fn.autoLoad.hasMore = false;
        } else {
            more.data('page', more.data('page') + 1);
        }

        more.show();

        $('#content').trigger('scroll');
    };

    $('#content').scroll(function () {

        if (more.offset().top < $(this).height()
            && $.fn.autoLoad.isLoading === false
            && $.fn.autoLoad.hasMore === true) {

            $.fn.autoLoad.isLoading = true;
            //
            func(more.data('page'), callback);
        }
    });

    // 第一次加载
    func(1, callback);
};