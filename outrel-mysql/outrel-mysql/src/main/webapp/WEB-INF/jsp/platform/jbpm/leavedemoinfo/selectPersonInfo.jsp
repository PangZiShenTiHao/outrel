<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询人员信息</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>

</head>
<body style="background-color:#FFFFFF">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 姓名 ：</th>
  <td > 
  <input type="text" class="text" id="perondtoappName" name="appName" notNull="false" maxLength="25" value="姓名" />
  </td>
<tr>
  <td colspan="2" align="center">
  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
  <input type="button" title="将本页面的姓名回填至父页面" value="确定" onclick="mySure()"/> 
  &nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="自定义关闭" onclick="closeWindow()"/>
  </td>
</tr>
  </table>
<script type="text/javascript">
//调用 addLeaveDemoInfo.jsp 内的相关js 方法
function mySure(){
	//获取全局的lgdialog参数信息
	var api = frameElement.api, W = api.opener, cDG;
	var v_selectPersonName = $("#perondtoappName").val();
	api.get("addDialogId").updateInfo(v_selectPersonName); 
	api.close();
}
//关闭 选人 页面
function closeWindow(){
	var api = frameElement.api, W = api.opener, cDG;
		api.close();		 
	}
</script>
</body>
</html>
