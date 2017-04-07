<title>用户管理 &lsaquo; </title>

<div class="row">
    <div class="col-xs-12">
        <div class="col-sm-5 col-md-4">
            <div class="space-4"></div>
            <div class="widget-box widget-color-blue2">
                <div class="widget-header">
                    <h4 class="widget-title lighter smaller">部门管理</h4>
                </div>

                <div class="widget-body">
                    <div class="widget-main padding-8">
                        <div id="scroll-content" data-size="330" style="height: 360px; overflow: auto;">
                            <ul id="dept-tree" class="tree"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-7 col-md-8">
            <div class="space-4"></div>

            <form id="query-form" class="form-horizontal">
                <div class="form-group">
                    <input type="hidden" name="id" id="dept-parent-id"/>

                    <label class="col-sm-2 control-label" for="username">部门</label>

                    <div class="col-sm-4">
                        <input type="text" class="col-xs-11" id="dept-name" readonly/>
                    </div>

                    <button type="button" class="btn btn-primary btn-white"
                            onclick="sysDept.showInput('edit')">修 改
                    </button>

                    <button type="button" class="btn btn-success btn-white"
                            onclick="sysDept.showInput('add')">新 增
                    </button>
            </form>

            <div class="space-4"></div>

            <div id="dept-list">
                <#include "deptList.ftl"/>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $('.page-content-area').ace_ajax('loadScripts', ['${ctx}/js/sys/SysDept.js'], function () {
        $(function () {
            sysDept.initTree();
        });
    });
</script>