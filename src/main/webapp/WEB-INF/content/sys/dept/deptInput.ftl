<ui:window>
    <ui:config add="新建部门" edit="修改部门" view="查看部门">
        <script type="text/javascript" src="${ctx}/js/sys/SysDept.js"></script>
        <js:validate form="dept-form" success="sysDept.saveDept" />
    </ui:config>
    <ui:content>
        <form id="dept-form">
            <input type="hidden" name="dept.id" id="dept-id" value="${dept.id}" />

            <ui:input label="上级部门：" size="x99">
                <input type="hidden" name="dept.parent.id"
                    value="${dept.parent.id ne null ? dept.parent.id  : param.parentid}" />
                <input type="text" class="ui-input" disabled="disabled"
                    value="<data:translate gcode="SYS_DEPT" mcode="2"  
                    value="${dept.parent.id ne null ? dept.parent.id  : param.parentid}" />" />
            </ui:input>

            <ui:input label="部门名称：" target="dept-name" size="x99">
                <input type="text" class="ui-input required" name="dept.name" id="dept-name" value="${dept.name}"
                    ${disabled} />
            </ui:input>

            <ui:input label="所在城市：" target="dept-city" size="x99">
                <input type="hidden" name="dept.cityid" id="dept-cityid"  value="${dept.cityid}" />
                <input type="text" class="ui-input" id="dept-city" disabled
                    value="<data:translate gcode="RES_CITY" mcode="2" value="${dept.cityid}" />" />
            </ui:input>

            <ui:input label="所在区域：" target="dept-areaid" size="x99">
                <input type="hidden" name="dept.areaid" id="dept-areaid"  value="${dept.areaid}" />
                <input type="text" class="ui-input" id="dept-areaname" readonly ${disabled}
                    value="<data:translate gcode="RES_AREA" mcode="2" value="${dept.areaid}" />"
                    onfocus="sysDept.selectArea()" />
            </ui:input>

            <div class="ui-btn-bar align-center">
                <input type="button" class="btn" value="保 存" onclick="$.validateDeptForm()" ${disabled} />
                <input type="button" class="btn" value="取 消" onclick="$.cancelPanel()" />
            </div>
        </form>
    </ui:content>
</ui:window>


<script type="text/javascript">
    $(function () {
        $('#oper-form').validate({
            submitHandler: sysOper.saveOper
        });
    });
</script>