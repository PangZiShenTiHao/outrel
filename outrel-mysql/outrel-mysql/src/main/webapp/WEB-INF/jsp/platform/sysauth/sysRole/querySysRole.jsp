<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/app" prefix="app"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ taglib uri="/syscode" prefix="syscode"%>
<html xmlns="http://www.w3.org/1999/xhtml">
 <%@ include file="/common/StaticJavascript.jsp" %>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>查询角色表</title>
<script type="text/javascript"
	src="${basePath}js/platform/sysauth/sysRole/querySysRole.js"></script>
<!-- 相关js方法 -->
<style type="text/css">
/* .fonterJumpInput{width:24px;height:18px;} */
</style>
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
			columns : [ {display : '角色名称',code : 'roleName',width : 200,type : 'text'},
			            {display : '角色编码',code : 'roleCode',width : 200,type : 'text'},
						{display : '角色类型',code : 'roleType',width : 200,type:'select',value:<syscode:dictionary codeType="PT_ROLETYPE" type="json"/>}], 
			/* {display : ' 系统ID ',code : 'appId',width : 200,type : 'text'},
				{display : ' 乐观锁 ',code : 'version',width : 200,type : 'text'} ], */
			//定义form 表单 按钮信息
			buttons : [ {
				"text" : "查询",
				"fun" : queryData,
				icon : "ui-icon-search"
			}, {
				"text" : "重置",
				"fun" : resetData,
				icon : "ui-icon-extlink"
			} ]
		};
		//定义工具条	
		var toolbar = {
			title : "角色查询列表"
		};
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
					{
						display : ' 角色Id ',
						code : 'id',
						width : 50,
						align : 'left',
						type : 'text',
						isOrder : false
					},{
						display : ' 角色名称 ',
						code : 'roleName',
						width : 130,
						align : 'left',
						type : 'text',
						isOrder : false
					}, {
						display : ' 角色编码 ',
						code : 'roleCode',
						width : 130,
						align : 'left',
						type : 'text',
						isOrder : false
					}, {
						display : ' 角色类型',
						code : 'roleType',
						width : 100,
						align : 'left',
						type : 'select',
						isOrder : false,
						value:<syscode:dictionary  codeType="PT_ROLETYPE" type="json"/>
					}
			/* ,{display : ' 系统ID，备用 ', code : 'appId', width : 100, align : 'left', type:'text', isOrder : false} */
			/* ,{display : ' 乐观锁 ', code : 'version', width : 100, align : 'left', type:'text', isOrder : false} */
			],
			url : "${basePath}sysRole/queryListSysRole",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'radio',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey : "id",
			//checkedFun:queryDataByRoleId
			clickFun:queryDataByRoleId
		};
		//组装 searchIframe 的相关参数		
		var searchIframe = {
			"toolbar" : toolbar,
			"form" : formstructure,
			"table" : tableStructure
		};
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
</script>

</head>
<body style="background-color:#FFFFFF">
	<input type="hidden" id="roleIds">

	<!-- 页面初始化 需要的 div -->
	<div id="contenta"></div>
<div id="tableToolbar" class="tableToolbar" style="display:none;">
<shiro:hasPermission name="platform/sysauth/sysRole/querySysRole:add">
		  	<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		  	<a href="javascript:void(0)" onclick="toUpdateSysRoleData()" index="1">修改</a>
		  	<a href="javascript:void(0)" onclick="deleteSysRoleData()" index="2">删除</a>
		  	<a href="javascript:void(0)" onclick="cleanSysRoleUserData()" index="2">离职人员权限清理</a>
		  	</shiro:hasPermission>
	  </div>
</body>
<!-- 相关js方法 -->

</html>
