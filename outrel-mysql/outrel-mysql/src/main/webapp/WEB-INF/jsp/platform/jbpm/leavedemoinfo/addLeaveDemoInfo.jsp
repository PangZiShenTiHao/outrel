<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增申请请假表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 申请人姓名 ：</th>
  <td > 
  <input type="text" class="text" id="dtoappName" name="appName" notNull="false" maxLength="25" value="cg"  onclick="showSelectPerson();"/>
  </td>
  <th> 申请请假天数 ：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtoappDay" name="appDay" notNull="false" maxLength="10" value="5" />
  </td>
  
</tr>
<tr>
  <th> 请假原因 ：</th>
  <td colspan="5"> 
  <textarea rows="5" cols="90" id="dtoappReason" name="appReason" notNull="false" maxLength="100" >请假原因.....。 </textarea>
  </td>
</tr>
<tr>
  <th> 备注 ：</th>
  <td colspan="5"> 
  <textarea rows="5" cols="90" id="dtoremark" name="remark" notNull="false" maxLength="100" >备注描述 </textarea>
  </td>
</tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面的js进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
$(document).ready(function(){
  	checkedInit();
});
//关闭弹出的当前 dialog
function closeWindow(){
 	var api = frameElement.api, W = api.opener;
 	 //获取父页面的值
 	 api.close();
 	 //调用父页面查询 关闭时刷新父页面
 	 W.queryData();
}
//弹出选人 的dialog 页面
function showSelectPerson(){
	//获取全局的lgdialog参数信息
	var api = frameElement.api, W = api.opener;
	//打开选择菜单 子页面
	W.$.dialog({
		id:	'showSelectPersonDialogId',
	    lock: true, 
	    width:300,
	    height:500,
	    title:'选人',
	    content: 'url:'+contextRootPath+'/dojbpm/leaveDemoInfo/prepareExecute/toSelectPersonInfo',
	    parent:api,
	    close:function() { 
		//弹出两层时 iframe 丢失焦点处理	
        api.opener.$.dialog({ id:'addDialogId' });
        return true; 
    	}
	});
}
//变更 姓名
function updateInfo(v_name){
	$("#dtoappName").val(v_name);
	$("#dtoappName").attr("value",v_name);
}
</script>
  
</html>
