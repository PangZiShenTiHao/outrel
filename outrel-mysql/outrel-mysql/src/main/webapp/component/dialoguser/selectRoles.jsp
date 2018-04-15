<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html> 
<head>
 <title>查询角色表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@ include file="/common/StaticJavascript.jsp" %>
<script type="text/javascript" src="${basePath}js/platform/sysauth/sysRole/querySysRole.js"></script>

  <%--使用 参考 贷前业务规则配置 页面addBizRuleConfDetail.jsp --%>
  
<style type="text/css">
.fonterJumpInput{width:24px;height:18px;}
</style>

</head>
<body style="background-color:#FFFFFF">
	<input type="hidden" id="roleIds">
<!--  是否可以多选 -->
<input type="hidden" id="check" name="check" value="${param.check}"/>
	
<input type="hidden" id="selectedRoleCodes" name="selectedRoleCodes" value=""/>
<input type="hidden" id="selectedRoleCodesRealName" name="selectedRoleCodesRealName" value=""/>
	
	
	<!-- 列表按钮操作 start -->
	<div id="userTableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="doSure()" index="0">确认</a>
		  	<a href="javascript:void(0)" onclick="doRestSure()" index="0">清空</a>
		  	<a href="javascript:void(0)" onclick="doCloseWindow()" index="0">关闭</a>
	 </div>
<!-- 列表按钮操作 end -->


	<!-- 页面初始化 需要的 div -->
	<div id="contenta"></div>

</body>

<script>
var SysRoleIframe;

//定义form表单 查询 方法
function queryData() {
	SysRoleIframe.iframeObj["table"].query();
}
//定义 form表单 重置方法
function resetData() {
	SysRoleIframe.iframeObj["form"].reset();
}
//初始化 查询页面元素
function initFn() {
	//定义 form表单查询 信息
	var formstructure = {
		// 定义form表单 字段信息
		columns : [ 
            {display : ' 角色名称 ',code : 'roleName',width : 200,type : 'text'},
            {display : ' 角色编码 ',code : 'roleCode',width : 200,type : 'text'},
			{display : ' 角色类型 ',code : 'roleType',width : 200,type:'select'
            	,value:<syscode:dictionary codeType="PT_ROLETYPE" type="json"/>
            }
            ], 
		//定义form 表单 按钮信息
		buttons : [ 
		      {"text" : "查询","fun" : queryData,icon : "ui-icon-search"}
			 ,{"text" : "重置","fun" : resetData,icon : "ui-icon-extlink"}
			 ]
	};
	//定义工具条	
	var toolbar = {
		title : "角色查询列表"
	};
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns : [
				 /* {display : ' 角色ID ',code : 'id',width : 50,align : 'left',type : 'text'} */
				 {display : ' 编码 ',code : 'roleCode',width : 130,align : 'left',type : 'text'}
				,{display : ' 名称 ',code : 'roleName',width : 130,align : 'left',type : 'text'}
				,{display : ' 类型',code : 'roleType',width : 100,align : 'left',type : 'select',
					value:<syscode:dictionary codeType="PT_ROLETYPE" type="json"/>
				}
		],
		url : "${basePath}sysRole/queryListSysRole",
		toolbar:"userTableToolbar",
		pageSize : 10,
		selectType : ( $("#check").val()=='true'?'checkbox':'radio')  ,
		isCheck : true,
		rownumbers : true,
		pages : [ 10, 20, 30 ],
		trHeight : 30,
		primaryKey : "id"
	};
	//组装 searchIframe 的相关参数		
	var searchIframe = {"toolbar" : toolbar,"form" : formstructure,"table" : tableStructure};
	//初始化 form 表单 table 列表 及工具条 
	SysRoleIframe = $("#contenta").newSearchIframe(searchIframe);
	SysRoleIframe.show();
}

</script>

<script type="text/javascript">
//页面加载完后 
$(document).ready(function() {
	initFn();
});

/**
 * 确认操作
 */
function doSure(){
	var v_oldIds = "";
	var v_oldNames = "";
	var  objs = SysRoleIframe.iframeObj["table"].getSelectedObjs();
	for(var i =0;i < objs.length;i++){
		if(v_oldIds){
			v_oldIds +=",";
			v_oldNames +=",";
		}
		v_oldIds +=objs[i].roleCode;
		v_oldNames +=objs[i].roleName;
	}
	
	$("#selectedRoleCodes").val(v_oldIds);
	$("#selectedRoleCodesRealName").val(v_oldNames);
	callBackDataInf();
	doCloseWindow();
}
/**
 * 清空操作
 */
function doRestSure(){
	select_sys_user = new JBPM.common.Map();
	$("#selectedRoleCodes").val("");
	$("#selectedRoleCodesRealName").val("");
	callBackDataInf();
}

function callBackDataInf(){
	var v_tabTitle = "${param.tabTitle}";
	if(v_tabTitle !=""){
		 //回调 tab 页面中的  js function
		var iframeWid = parent.tabs.getTabWinByTitle("${param.tabTitle}");
		iframeWid.${param.callFun}($("#selectedRoleCodes").val(),$("#selectedRoleCodesRealName").val());
	}else{
		//调用传递过来的 回调 函数
		parent.${param.callFun}($("#selectedRoleCodes").val(),$("#selectedRoleCodesRealName").val());
	}
}
/**
 * 关闭操作
 */
function doCloseWindow(){
	var api = frameElement.api, W = api.opener;
	 //获取父页面的值
	 api.close();
}
</script>

</html>
  <%--使用 参考 贷前业务规则配置 页面addBizRuleConfDetail.jsp --%>