<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>选择工作流角色</title>
  </head>
  <body style="background-color:#FFFFFF">
	<div id="content" style="position: absolute;top:30px;left:0px;right:0px;bottom:40px;"></div>
  </body>
</html>
<script type="text/javascript">
var iframe;
//初始化 查询页面元素
function initFn(){
	//定义工具条	
	var toolbar={
		title:"工作流角色列表"
	}
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns : [
		 /* {display : ' 角色编号 ', code : 'roleCode', width : 300, align : 'left', type:'text'}
		,{display : ' 角色名称 ', code : 'roleName', width : 400, align : 'left', type:'text'} */
		 {display : ' 角色组编号 ', code : 'roleGroupCode', width : 300, align : 'left', type:'text'}
		,{display : ' 角色组名称 ', code : 'roleGroupName', width : 400, align : 'left', type:'text'}
	   ],
		url : "${basePath}dojbpm/jbpmJYPartner/selectJbpmJYRole?formInfoId=${param.formInfoId}",
		toolbar:"tableToolbar",
		pageSize : 10,
		selectType : 'radio',
		isCheck : true,
		rownumbers : true,
		pages : [ 30 ],
		trHeight : 30,
		checkedFun:function(obj){
			if(typeof(window.parent.receiveData) !=  'undefined'){
				var data = [];
				var obj = {};
				obj.ID= obj.roleGroupName;
				obj.NAME= obj.roleGroupCode;
				obj.NO= '';
		    	data.push(obj);
		    	window.parent.receiveData(data);
			} else {
				//将选中的 角色code 回写至 父页面
				$(window.parent.document).find("#dtootherParamsDis").val(obj.roleGroupName);
				$(window.parent.document).find("#dtootherParams").val(obj.roleGroupCode);
			}
		},
		primaryKey:"roleId"
	};
	//组装 searchIframe 的相关参数		
	var searchIframe={"toolbar":toolbar,"form":"","table":tableStructure};	
	//初始化 form 表单 table 列表 及工具条 
	iframe=$("#content").newSearchIframe(searchIframe);
	iframe.show();
}

//页面加载完后 
$(document).ready(function(){
	initFn();
	/* setTimeout(function(){
		var main = $(window.parent.document).find("#partnerRolesId");
		var thisheight = $(document).height()+35;
		main.height(thisheight);
	}, 100); */
});
</script>
