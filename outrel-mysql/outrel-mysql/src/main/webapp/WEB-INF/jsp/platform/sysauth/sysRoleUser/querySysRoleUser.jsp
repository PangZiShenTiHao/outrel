<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/app" prefix="app"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib uri="/syscode" prefix="syscode"%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
 <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询角色用户表</title>
  <style>
 .field .fieldName
 {
 	width:auto;
 }
  </style>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/sysauth/sysRoleUser/querySysRoleUser.js"></script>
<!-- 相关js方法 -->
<script>
	var SysRoleUserIframe;
	
	//定义form表单 查询 方法
	function querySysRoleUserData(){
		SysRoleUserIframe.iframeObj["table"].query();
	}
	//定义 form表单 重置方法
	function resetData(){
		SysRoleUserIframe.iframeObj["form"].reset();
		$("input[name='roleId']").val($("input[id='tempSaveRoleId']").val());
	}
	//初始化 查询页面元素
	function initFn(){
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			  {display : ' 角色ID ', code : 'roleId', width : 200,  type:'hidden', value:'${roleId}'}
			/*,{display : ' 用户ID ', code : 'targetId', width : 200,  type:'text'}
	        ,{display : ' 系统ID ', code : 'appId', width : 200,  type:'text'} */
	        ,{display : ' 用户类型', code : 'targetType', width : 200,   type:'select',value:<syscode:dictionary codeType="PT_USERTYPE" type="json"/>}
	        ,{display : ' 用户名称/机构名称', code : 'targetName',width : 350,  type:'text'}
	        /* ,{display : ' 乐观锁 ', code : 'version', width : 200,  type:'text'} */
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":querySysRoleUserData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义工具条	
		var toolbar={
			title:"用户授权列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			/*  {display : ' 角色ID ', code : 'roleId', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.roleId+"</a>";
				    }	 
			 }, */
			{display : ' 用户Id/机构Id ', code : 'targetId', width : 130, align : 'left', type:'text', isOrder : false}
			,{display : ' 用户名/机构名称 ', code : 'targetName', width : 130, align : 'left', type:'text', isOrder : false}
			,{display : ' 用户类型', code : 'targetType', width : 100, align : 'left', type:'select', isOrder : false,
				value:<syscode:dictionary codeType="PT_USERTYPE" type="json"/>}
		   ],
			url : "${basePath}sysRoleUser/queryListSysRoleUser",
			toolbar:'tableToolbar',
			pageSize : 10,
			selectType : 'checkbox',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		SysRoleUserIframe=$("#content").newSearchIframe(searchIframe);
		SysRoleUserIframe.show();
	}
</script> 
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>

</head>
<body style="background-color:#FFFFFF">
	<input type="hidden" id="roleId" value="${roleId}">
	<input type="hidden" id="tempSaveRoleId" value="${roleId}">
	
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>
	<div id="tableToolbar" class="tableToolbar" style="display:none;">

		  	<a href="javascript:void(0)" onclick="toAddSysRoleUserData()" index="0">添加用户</a>
		  	<shiro:hasPermission name="platform/sysauth/sysRole/querySysRole:add">
		  	<a href="javascript:void(0)" onclick="toAddSysOrgData()" index="1">添加机构</a>
		  	</shiro:hasPermission>
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
		  	
	  </div>

</body>
<!-- 相关js方法 -->	

</html>
