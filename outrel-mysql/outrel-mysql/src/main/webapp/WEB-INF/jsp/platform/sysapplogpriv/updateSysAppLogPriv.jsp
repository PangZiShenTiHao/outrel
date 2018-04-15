<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改日志访问权限表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script type="text/javascript" src="<%=basePath%>component/jbpm/dialog/lhgdialog.js?skin=iblue"></script> 
   <sysuser:search var="curUser" scope="request"/>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.logmonitor.sysapplogpriv.controller.SysAppLogPrivController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 系统标示 ：</th>
  <td > 
  <syscode:dictionary id="dtoappId" name="appId" codeType="SYSTEMFLAG" type="select" defaultValue="${dto.appId}"/>
  </td>
  <th> 用户 ：</th>
  <td colspan="3"> 
  <input type="hidden" id="dtouserId" name="userId" value="${dto.userId}" />
  <input type="text" class="text" id="dtousername" name="userName" notNull="false" maxLength="11" value="${dto.userName}"  onclick="selectUser('setCallFunUserUpdate')" />
  </td>
</tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
   	checkedInit();
	});
   
   /*
    * 选择用户
    */
   function selectUser(_callFun){
       var _titleObj = window.parent.parent.tabs.getActiveObj();
   	   var _title = _titleObj.title;
   	   var v_url = contextRootPath+'/component/dialoguser/selectSysUser.jsp?a=a&check=false&showLowerUser=false&orgId=${curUser.orgId}';
   	       v_url = v_url+'&callFun='+_callFun+'&tabTitle='+_title;
   	   $.dialog({
   	       id:	'selectUserDialogId',
   	       lock: true,
   	       width:420,
   	       height:680,
   	       title:'选择用户',
   	       content: 'url:'+ v_url
   	   }); 
   }
</script>
  
</html>
