<#include "/common/pagination.ftl">

<table class="table">
    <thead>
    <tr>
        <th>部门名称</th>
        <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <#list (page.list)! as dept>
    <tr>
        <td>${dept.name}</td>
        <td>
            <button type="button" class="btn btn-success btn-xs btn-white"
                    onclick="sysDept.showInput('view', ${dept.id})">查看
            </button>
            <button type="button" class="btn btn-primary btn-xs btn-white"
                    onclick="sysDept.showInput('edit', ${dept.id})">修改
            </button>
            <button type="button" class="btn btn-xs btn-white btn-danger"
                    onclick="sysDept.deleteDept(${dept.id},'${dept.name}')">删除
            </button>
        </td>
    </tr>
    </#list>
    </tbody>
</table>

<!-- pagination -->
<@pagination page! />

<script type="text/javascript">$(function () {
    $('#dept-list .table').table();
    $('#dept-list .paging').paging('sysDept.querySubDeptList');
});
</script>