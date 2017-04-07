function SysDept() {

    var self = this;

    /**
     * 初始化菜单树
     */
    this.initTree = function (id) {
        var url = ctx + '/sys/dept/queryDeptNodeList/';
        $.postJSON(url, {}, function (json) {

            var dept;

            $('#scroll-content').append($('#menu-tree').tree('destroy'));

            $('#dept-tree').ace_tree({
                'open-icon': 'ace-icon fa fa-folder-open',
                'close-icon': 'ace-icon fa fa-folder',
                'selectable': true,
                'selected-icon': null,
                'unselected-icon': null,
                dataSource: function (parentData, callback) {
                    var data = {};
                    // root
                    if (!parentData.name) {
                        $.each(json.list, function (i, v) {
                            if (!v.parentid) {
                                v.type = 'folder';
                                data['m-' + v.id] = v;
                            }

                            dept = dept || v;

                            if (dept.parentid == v.id || dept.id == v.id) {
                                v.additionalParameters = v.additionalParameters || {};
                                v.additionalParameters['item-selected'] = true;
                            }
                        });
                    } else {
                        // child
                        $.each(json.list, function (i, v) {
                            if (v.parentid == parentData.id) {
                                v.type = v.isparent ? 'folder' : 'item';
                                data['m-' + v.id] = v;
                            }

                            if (dept && dept.id == v.id) {
                                v.additionalParameters = v.additionalParameters || {};
                                v.additionalParameters['item-selected'] = true;
                            }
                        });
                    }

                    callback({
                        data: data
                    });
                }
            });

            $('#dept-tree').on('selected.fu.tree', function (e, data) {
                dept = data.target;

                $('#dept-name').val(dept.name);
            });
        });
    };

    /**
     * 部门列表
     */
    this.querySubDeptList = function () {
        var url = ctx + '/sys/dept/querySubDeptList/';
        var data = $('#dept-list, #dept-parent-id').collectData();
        $('#dept-list').load(url, data);
    };

    /**
     * 保存部门
     */
    this.saveDept = function () {
        var url = ctx + '/sys/dept/saveDept/';
        var data = $('#dept-form').collectData();
        $.postJSON(url, data, function (json) {
            $.success('保存成功');
        });
    };

    /**
     * 删除部门
     *
     * @param id
     * @param name
     */
    this.deleteDept = function (id, name) {
        $.confirm('删除部门【' + name + '】，是否继续？', function (result) {
            if (result) {
                var url = ctx + '/sys/dept/deleteDept/?id=' + id;
                $.postJSON(url, {}, function (json) {
                    $.success('删除成功');

                    self.querySubDeptList();
                });

            }
        });
    };

    this.showInput = function (flag, id) {
        var parentid = $('#dept-parent-id').val();
        if (!parentid) {
            $.warn('请选择一个上级部门');
            return;
        }

        var url = ctx + '/sys/dept/input/?flag=' + flag;
        url += '&parentid=' + parentid;

        if (flag != 'add') {
            id = id || parentid;
            url += '&id=' + id;
        }
    };

    /**
     * 选择区域后，填充城市
     */
    this.selectArea = function () {
        var callback = function (ret) {
            var param = paramInfo.queryParam('RES_REGION', '3', ret.ids[0]);
            if (param) {
                $('#dept-city').val(param.mname);
                $('#dept-cityid').val(param.mcode);
            }
        };

        treeInfo.showRightTree('#dept-areaname', '#dept-areaid', 'gcode=AREA_BY_NORIGHT', 'multi=false&required=true',
            callback);
    };
};

var sysDept = new SysDept();