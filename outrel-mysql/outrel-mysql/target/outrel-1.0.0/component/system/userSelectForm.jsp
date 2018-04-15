<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/sysorg" prefix="org"%>
<%@ taglib uri="/sysuser" prefix="user"%>
<%@ taglib uri="/syscode" prefix="code"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<code:dictionary type="json" codeType="dataType" ></code:dictionary>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询系统用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

  
<!-- 相关js方法 -->
<script type="text/javascript">


var dialogUserSelect = {};

var receiveUserData = function(datas){//此方法为 弹出框树形控件选择后的数据接收方法，固定必须
	//datas 当弹出的页面中发生确定数据选择时，返回此数据,此处可自定义数据的处理
	//datas 数据的格式为json对象数组 [{id:’’,userName:’’,...},{id:’’,userName:’’,...},......]
	jyDialog({"type":"info"}).alert(datas);
}

function selectUser(){
	//取到元素id
	var dialogStruct={
			'display':contextRootPath+'/component/system/sysUserSelect.jsp?showLowerUser=false',
			'width':1200,
			'height':800,
			'title':'选择用户',
			'isIframe':'false',
			'buttons':[]
		};
	dialogUserSelect =jyDialog(dialogStruct);
	dialogUserSelect.open();
}



var dialogOrgSelect = {}//此变量必须：弹出框的对象，关闭弹出框时需要调用



function selectOrg(){//弹出树形选择界面的方法 不做限制，只要能弹出选择框就行
	var dialogStruct={
			'display':contextRootPath+'/component/system/treeSysOrgSelect.jsp?isVirtual=1',
			'width':800,
			'height':500,
			'title':'选择机构',
			'isIframe':'false',
			'buttons':[]
		};
		dialogOrgSelect =jyDialog(dialogStruct);
		dialogOrgSelect.open();
}

</script>

</head>
<body style="background-color:#FFFFFF">

<input name="userName" id="userName" onclick="selectUser();">


<input name="userName" id="userName" onclick="selectOrg();">

<org:search orgId="1"/>

<user:search userId="1" />

${user.orgName}
</body>
</html>
