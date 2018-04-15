<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sysuser" prefix="sysuser"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="/app" prefix="app"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib uri="/WEB-INF/tlds/ababoon.tld" prefix="ababoon"%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<%@taglib prefix="syscode" uri="/syscode" %>
    <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
    <%@ include file="/common/StaticJavascript.jsp" %>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>转移待办任务</title>
	<sysuser:search var="curUser" />
	<link type="text/css" rel="stylesheet" href="${basePath}component/jbpm/css/validationEngine.jquery.css"   />
	<script type="text/javascript" src="${basePath}component/jbpm/scripts/jquery.validationEngine.min.js"></script>
	<script type="text/javascript" src="${basePath}component/jbpm/dialog/lhgdialog.js?skin=iblue"></script>
	<script type='text/javascript' src='${basePath}component/jbpm/jbpmjs.js'></script>
</head>

<body style="background-color:#FFFFFF">
	<form action="" name="newsForm" id="newsForm">
	<div style="display: none">
		   <input type="text" class="validate[required] input_hui" title="指定接受待办任务的参与者" readonly="readonly"  maxlength="10" id="dtootherParamsDis" name="dtootherParamsDis" value=""  />
		   <input type="hidden"  id="dtootherParams" name="dtootherParams"  value="" />
		   <input type="button" value="转移" name="updateBtnId" onclick="subFun()"/>	
	</div>
	<table width="96%" border="0" align="center" >
		<tr id="trPartnerRolesIdLeg" style=" display: 'none'">
		  <td align="left" colspan="6" >
		   <iframe  id="partnerUserIds" src="${basePath1}/component/jbpm/befloan/sysUserSelect.jsp?orgId=${curUser.orgParentId}&check=false&autoIframeId=partnerUserIds&callBackFun=subFun" width="100%" height="680px" frameborder="no"></iframe>
		  </td>
		</tr>
	 </table>
	</form>
</body>
<script type="text/javascript">
//提交
function subFun(){
	//接受转移任务的人员
	var v_toUserId  = "1";
	v_toUserId = $("#dtootherParams").val();
	if(v_toUserId=='' || v_toUserId.indexOf(",") > 0){
		alert("请选择一个参与者！");
		return ;
	}
	var v_boolean = true;
	//判断是否全部校验通过了
	if(v_boolean){
		if(confirm("您确定要转移待办任务吗？")){
			$.ajax({
				type:"POST",
				async:false, 
				url:'${basePath}workFlowTask/execute.do',
				data:{operateData:'batchUpdateAssignee',tasks:'${param.tasks}',toUserId:v_toUserId},
				error: function(){alert('ajax error');},
				success: function(data){
					    saveLog(v_toUserId);  
						alert(data);
						closeParentWin();
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


/**
 * 保存转办备注
 */
function saveLog(v_toUserId) {
	var params="toUserId="+v_toUserId+"&remark="+encodeURI('${param.remark}')+"&acitityName="+encodeURI('${param.acitityName}')+"&bizInfId="+'${param.bizInfId}'+"&proProcessInsId="+'${param.processInsId}';
	var url='${basePath}jbpm4TransferOperateLog/insertJbpmTransferOperateLog';
	//通过ajax保存
	jyAjax(url,params,function(msg){
		var msg = msg.msg;
  	});
} 

function closeParentWin() {
	top.close();
} 
</script>
</html>
