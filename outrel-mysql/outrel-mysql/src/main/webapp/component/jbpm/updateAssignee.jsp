<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sysuser" prefix="sysuser"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="/app" prefix="app"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@taglib prefix="syscode" uri="/syscode" %>
<%@ taglib uri="/WEB-INF/tlds/ababoon.tld" prefix="ababoon"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>转移待办任务</title>
    <sysuser:search var="curUser" />
<script type="text/javascript" src="${basePath}component/jbpm/scripts/jquery-1.7.2.min.js"></script>
<link type="text/css" rel="stylesheet" href="${basePath}component/jbpm/css/validationEngine.jquery.css"   />
<script type="text/javascript" src="${basePath}component/jbpm/scripts/jquery.validationEngine.min.js"></script>

<script type="text/javascript" src="${basePath}component/jbpm/dialog/lhgdialog.js?skin=iblue"></script>
<script type='text/javascript' src='jbpmjs.js'></script>
</head>

  <body style="background-color:#FFFFFF">
  <br/>
    
    <fieldset class="search_fieldset">
<legend>转移待办任务</legend>
<br/>
<form action="" name="newsForm" id="newsForm">
<div style="display: none">
	<input type="text" class="validate[required] input_hui" title="指定接受待办任务的参与者" readonly="readonly"  maxlength="10" id="dtootherParamsDis" name="dtootherParamsDis" value=""  />
   <input type="hidden"  id="dtootherParams" name="dtootherParams"  value="" />
   <input type="button" value="转移" name="updateBtnId" onclick="subFun()"/>	
</div>
<table width="96%" border="0" align="center" >

<!-- 展示显示的字段信息 -->

<tr id="trPartnerRolesIdLeg" style=" display: 'none'">
  <td align="left" colspan="6" >
   <iframe  id="partnerUserIds" src="${basePath1}/component/jbpm/org/sysUserSelect.jsp?orgId=${curUser.orgId}&check=false&autoIframeId=partnerUserIds&callBackFun=subFun" width="100%" height="680px" frameborder="no"></iframe>
  </td>
</tr>

<tr><td align="center" colspan="6" > &nbsp;</td></tr>

<tr><td align="center" colspan="6" class="my_buttons"><div id="divSubBtnId"></div></td></tr>

</table>
</form>

</fieldset>



<br/>
<script type="text/javascript">
$(document).ready(function(){
//注册校验事件
	//$("#newsForm").validationEngine({scroll:false,focusFirstField:false,promptPosition:'topLeft'});
	//changeHideOrShow();
});


//提交
function subFun(){
	//接受转移任务的人员
	var v_toUserId  = "1";
	v_toUserId = $("#dtootherParams").val();
	if(v_toUserId=='' || v_toUserId.indexOf(",") > 0){
		alert("请选择一个参与者！");
		return ;
	}
	var v_boolean = true;//$("#newsForm").validationEngine("validate");
	//判断是否全部校验通过了
	if(v_boolean){
		if(confirm("您确定要转移待办任务吗？")){
			$.ajax({
				type:"POST",
				async:false, 
				url:'${basePath }workFlowTask/execute.do',
				//dataType:'text',
				data:{operateData:'batchUpdateAssignee',tasks:'${param.tasks}',toUserId:v_toUserId},
				error: function(){alert('ajax error');},
				success: function(data){
						alert(data);
						closeWindow();
					}
			});
		}
	}
}

function closeWindow(){
	var api = frameElement.api, W = api.opener;
	 //获取父页面的值
	 api.close();
	 //调用父页面查询 关闭时刷新父页面
	 W.queryData();
}

//
function changeHideOrShow(){
	var v_hml = $("#partnerRolesIdLeg").html();
 	if(v_hml.indexOf("显示") != -1){
 		$("#partnerRolesIdLeg").html("∧隐藏选择参与者设置")
 		$("#partnerUserIds").show();
 		
 	}else{
 		$("#partnerRolesIdLeg").html("∨显示选择参与者设置")
 		$("#partnerUserIds").hide();
 	}
}
</script>


  </body>
</html>
