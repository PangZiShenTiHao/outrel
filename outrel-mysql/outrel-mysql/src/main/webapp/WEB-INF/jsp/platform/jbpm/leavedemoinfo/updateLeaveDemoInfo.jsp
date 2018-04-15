<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="bpm" uri="/bpmLable" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改申请请假表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- 引入弹出层第三方js -->
  <script type="text/javascript" src="${basePath}js/threeJs/lgdialog/lhgdialog.js?skin=iblue"></script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap" align="center">
  <br/>
<form id="bizFormData" name="bizFormData" isCheck="true" action="">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
		<tr>
		  <th> 申请人姓名 ：</th>
		  <td > 
		  <input type="text" class="text" id="dtoappName" name="appName" notNull="false" maxLength="25" value="${dto.appName}" />
		  </td>
		  <th> 申请请假天数 ：</th>
		  <td > 
		  <input type="text" class="text" id="dtoappDay" name="appDay" notNull="false" maxLength="10" value="${dto.appDay}" />
		  </td>
		  
		  <th> 是否是部门经理 ：</th>
		  <td > 
		  <input type="text" class="text" id="isManager" name="isManager" notNull="false" maxLength="10" value="Y" />
		  </td>
		</tr>
		<tr>
		  <th> 请假原因 ：</th>
		  <td colspan="5"> 
		  <textarea rows="5" cols="90" id="dtoappReason" name="appReason" notNull="false" maxLength="100" >${dto.appReason}</textarea>
		  </td>
		</tr>
		<tr>
		  <th> 备注 ：</th>
		  <td colspan="5"> 
		  <textarea rows="5" cols="90" id="dtoremark" name="remark" notNull="false" maxLength="100" >${dto.remark}</textarea>
		  </td>
		</tr>
  </table>
  <%--  该注释内容被<bpm:nodeInfo标签所替换  by xyz
  <table id="bizInfoTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" style="display: none"> 
				<!-- 工作流相关参数信息start -->
			<tr><th > 指定参与者 ：</th>
			  	<td align="left" >
			  	<!-- 如果 paramUserId 值是-1 或0  则完成待办任务时 系统会按配置的业务规则  自动指定一个参与者  -->
			  	<input type="hidden" maxlength="10" id="nameInfo" name="nameInfo" value="-1"  />
			  	<!-- 如果 paramUserId 值是-1 或0  则完成待办任务时 系统会按配置的业务规则  自动指定一个参与者  -->
			  	<input type="hidden"  maxlength="50" id="dtoparamUserId" name="paramUserId" value="" />
			   	<input type="hidden"  maxlength="50" id="foreachJoinId" name="foreachJoin" value="N" />
			  	</td>
			  	<th> 任务ID ：</th>
			  	<td><input type="hidden"  readonly="readonly"  id="disTaskId" name="disTaskId" value="<c:out value="${taskId }"/>" />
			 	<!-- 必须参数 不可变动start -->
			  	<input type="hidden"  id="dtotaskId" name="taskId" value="<c:out value="${taskId }"/>" />
			   	<input type="hidden"  id="processInsId" name="processInsId" value="<c:out value="${processInsId}" />" />
			   	<input type="hidden"  id="acitityName" name="acitityName" value="<c:out value="${acitityName}" />" />
			   	<input type="hidden"  id="bizTabId" name="bizTabId" value="<c:out value="${bizTabId}" />" />
			   	<input type="hidden"  id="bizTabName" name="bizTabName" value="<c:out value="${bizTabName}" />" />
			   	<input type="hidden"  id="bizInfId" name="bizInfId" value="<c:out value="${bizInfId}" />" />
			   	
			   	<input type="hidden"  id="intoCustRefId" name="intoCustRefId"  />
			   	<!-- 必须参数 不可变动end -->
			  	</td>
			  	<th> 流程流转方向 ：</th>
			  	<td><select id="dtoturnDirection" name="turnDirection"  style="width:150px;"><option value="">--默认--</option></select></td>
			</tr>
			<tr><th>流程参数信息 ：</th>
			  	<td colspan="5">
				<textarea class="validate[maxSize[500]] input_hui"  id="dtootherParamJavaCode" name="otherParamJavaCode" rows="5" cols="120" title='' ></textarea> 
			   	</td>
			</tr>
			<!-- 工作流相关参数信息end -->
			</table>
			--%>
			<bpm:nodeInfo processInsId="${processInsId}" taskId="${taskId }" bizInfId="${bizInfId}" bizTabId="${bizTabId}" acitityName="${acitityName}" bizTabName="${bizTabName}"/>
</form>
<bpm:initButton/>
<%--  该注释内容被bpm:initButton标签所替换  by xyz
<!-- 下一节点 task 选人规则的配置start -->
<input type="hidden" value="" id="partnerRuleJsonId"/>
<!-- 下一节点 task 选人规则的配置 end-->
<!-- 工作流按钮start -->
<br/>
<div id="divSubBtnId"></div>
<!-- 工作流按钮end -->
</div>
--%>
</body>
<script type="text/javascript">
var btns=[];
$(document).ready(function(){
	//初始化 流程流转方向 下来框
	JBPM.common.initProInsToDoTurnDirection();
	$("#divSubBtnId").find("input").each(function() {
		var btn=$(this);
		btn.button();
		btns.push(btn);
	});
});

/*
 *准备提交\执行 我的待办任务
 *进行 业务规则，
 *选人规则的校验
 */
function prepareSubTask(v_myTurn){
	var v_boolean = true;
	//判断是否全部校验通过了
	if(v_boolean){
		$("#dtoturnDirection").val(v_myTurn);//选中 option
		makeupPartnerInfo();//组装选人参数信息
		//选人规则判断
		var nextF = JBPM.common.decidedSelectPartnerRule(v_myTurn);
		//需要人工 选择参与者的 则弹出页面 
		if(!nextF)	return;
		//真实执行待办任务的 方法
		subTask(v_myTurn);
	}
}
/*
 * 提交 执行 待办任务
 */
function subTask(v_myTurn){
	jyDialog({"type":"question"}).confirm("您确定要执行待办任务吗？",function(){
    
		//组装选中的参与者信息
		makeupPartnerInfo();
		$("[name^='myProButn']").attr("disabled",true);
		//如果需要 保存业务操作 数据 则异步先保存
		//todo save biz data
		
		//异步保存成功后 再 执行工作流（执行待办任务）
		$.ajax({
			type:"POST",
			async:false, 
			url:contextRootPath+'/dojbpm/leaveDemoInfo/executeTastLeaveDemoInfo.do',
			dataType:'JSON',
			data:$("#bizFormData").serialize(),
			error: function(){jyDialog({"type":"error"}).alert('ajax error');},
			success: function(data){
				 $("").newMsg({}).show(data.msg);
					//alert(data.msg);
					var v_status = data.status;
					if(v_status.indexOf('ok') >-1){
						closeWindow();
		        	}
				}
		});
   },"确认提示");

	/* if(confirm("您确定要执行待办任务吗？")){
		//组装选中的参与者信息
		makeupPartnerInfo();
		$("[name^='myProButn']").attr("disabled",true);
		//如果需要 保存业务操作 数据 则异步先保存
		//todo save biz data
		
		//异步保存成功后 再 执行工作流（执行待办任务）
		$.ajax({
			type:"POST",
			async:false, 
			url:contextRootPath+'/dojbpm/leaveDemoInfo/executeTastLeaveDemoInfo.do',
			dataType:'JSON',
			data:$("#bizFormData").serialize(),
			error: function(){jyDialog({"type":"error"}).alert('ajax error');},
			success: function(data){
				 $("").newMsg({}).show(data.msg);
					//alert(data.msg);
					var v_status = data.status;
					if(v_status.indexOf('ok') >-1){
						closeWindow();
		        	}
				}
		});
	} */
		
}



//关闭任务窗口
function closeWindow(){
	try{
		var api = frameElement.api, W = api.opener;
		 //获取父页面的值
		 api.close();
		 //调用父页面查询 关闭时刷新父页面
		 W.queryData();
	}catch(e){
		window.close();
	}
}
/*
 * 组装选中的参与者信息
 * 及流程业务变量信息
 */
function makeupPartnerInfo(){
	//var v_userName = $("#nameInfo").val();
	//$("#dtoparamUserId").attr("value",v_userName);
	var v_m = new JBPM.common.Map();//new Map
    //m.remove("key2");//删除某个key 
    v_m.put("result", "to");
    v_m.put("proTaskId", "${taskId}");
	v_m.put("proProcessInsId", "${processInsId}");
	v_m.put("proAcitityName", "${acitityName}");
	v_m.put("proBizTabId", "${bizTabId}");
	v_m.put("proBizTabName", "${bizTabName}");
	v_m.put("proBizInfId", "${bizInfId}");
	v_m.put("proCurrentUserId", "<shiro:principal property="id"/>");
	v_m.put("bizIntoCustRefId", $("#intoCustRefId").val());
	v_m.put("isManager",$("#isManager").val());
	var v_userId = $("#dtoparamUserId").attr("value");//指定参与者id
	v_m.put("owner",v_userId);
	var v_otherMap = v_m.toMapString();
	
	$("#dtootherParamJavaCode").val(v_otherMap);
	//alert($("#dtootherParamJavaCode").val());
}
</script> 
</html>
