<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/sysorg" prefix="org"%>
<%@ taglib uri="/sysuser" prefix="user"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询系统用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- 引入 工作流 第三方 dialog js -->
<script type="text/javascript" src="<%=basePath%>component/jbpm/dialog/lhgdialog.min.js?skin=iblue"></script>
  
<!-- 相关js方法 -->
<script type="text/javascript">
	
var dialogUserSelect = {};

var receiveUserData = function(datas){//此方法为 弹出框树形控件选择后的数据接收方法，固定必须
	//datas 当弹出的页面中发生确定数据选择时，返回此数据,此处可自定义数据的处理
	//datas 数据的格式为json对象数组 [{id:’’,userName:’’,...},{id:’’,userName:’’,...},......]
	jyDialog({"type":"info"}).alert(datas);
}

function selectUser(){
	$.dialog({
		id:	'selectUserDialogId',
	    lock: true,
	    width:850,
	    height:600,
	    title:'选择用户',
	    content: 'url:'+contextRootPath+'/component/dialogsys/sysUserSelect.jsp?dispalyNameId=userName&hiddenInputId=userId&callFun=setUserInf&tabTitle='
		}); 
}

function selectOrg(){//弹出树形选择界面的方法 不做限制，只要能弹出选择框就行
	$.dialog({
		id:	'selectOrgDialogId',
	    lock: true,
	    width:850,
	    height:800,
	    title:'选择机构',
	    content: 'url:'+contextRootPath+'/component/dialogsys/treeSysOrgSelect.jsp'
		}); 
}
/*
 * 回调函数名称
 */
function setUserInf(objs){
	jyDialog({"type":"info"}).alert("回调函数 good:"+objs);
}
</script>

</head>
<body style="background-color:#FFFFFF">
选择用户：
<input name="userName" id="userName" onclick="selectUser();">
<input name="userId" id="userId" >
<br/>
选择机构：
<input name="userOrg" id="userOrg" onclick="selectOrg();">

<org:search orgId="1"/>

<user:search userId="1"/>
</body>
</html>
