<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<%@ taglib uri="/sysuser" prefix="sysuser"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath1}component/jbpm/dialog/lhgdialog.min.js?skin=iblue"></script>
  <sysuser:search var="curUser" />
    <title>新增本人任务委托</title>
  </head>
  <body>
  <div id="formPageSwap">
	<form id="addConsign" name="addConsign" isCheck="true">
     <table  id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
		<input type="hidden" name="type" value="0" />		
  		<tr>
            <th >委托人： </th>
            <td > 
            <input id="dtootherParamsDis" type="text" name ="dtootherParamsDis" value="${consign.fromUserId }" notNull="false"  />
            <input id="dtootherParams" type="hidden" name ="fromUserId" size="40" value="${consign.fromUserId }" >
            
            <input id="id" type="hidden" name ="id" size="40" value="${consign.id}">
            <input id="valiDateState" type="hidden" name ="valiDateState" size="40" value="1">
            <input id="createdStr" type="hidden" name ="createdStr" size="40" value="${consign.createdStr }"> 
            <input id="createdBy" type="hidden" name ="createdBy" size="40" value="${consign.createdBy }"> 
            <input id="lastUpdStr" type="hidden" name ="lastUpdStr" size="40" value="${consign.lastUpdStr }"> 
            <input id="lastUpdBy" type="hidden" name ="lastUpdBy" size="40" value="${consgin.lastUpdBy }"> 
            <th >办理人： </th>
            <td > <input notNull="false" id="toUserNameId" type="text" name="toUserName" size="40" value="${consign.toUserId }" onclick="selectUser('setCallFunToUser')"> 
            <input id="toUserId" type="hidden" name="toUserId" size="40" value="${consign.toUserId }" />
            </td>
        </tr>       
        <tr>
            <th > 委托开始时间： </th>
            <td > <input id="startTimeStr" type="text" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" name ="startTimeStr" size="40" value="${consign.startTimeStr }" notNull="false" >  
            <th > 委托结束时间： </th>
            <td > <input id="endTimeStr" type="text" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" name ="endTimeStr" size="40" value="${consign.endTimeStr }">  
        </tr>
	   <tr><th > 事由： </th>
            <td colspan="3">
            <textarea id="reason" type="text" name ="reason" rows="5" cols="55" >${consign.reason }</textarea>
            </td>
        </tr> 
        <tr>
            <th> 备注： </th>
            <td colspan="3">
            <textarea id="remark" type="text" name ="remark" rows="5" cols="55" >${consign.remark }</textarea>
            </td>
        </tr> 
        <!-- <tr><th > </th><td align="center" colspan="3"><input onclick="saveData()" type="button" id="savaBtn" value="保存" /></td> -->
        </tr>  
    </table>
    </form>
    
    </div>
  </body>
</html>
<script type="text/javascript">
$(document).ready(function(){
	$("#dtootherParamsDis").val("${curUser.userName}");
	$("#dtootherParams").val("${curUser.userId}");
	checkedInit();
});

function changeConsignType(obj){
	if(obj.value=="0"){
		$("#dtootherParamsDis").val("${curUser.userName}");
		$("#dtootherParams").val("${curUser.userId}");
		$("#dtootherParamsDis").removeAttr("onclick");
	}else{
		$("#dtootherParamsDis").val("");
		$("#dtootherParams").val("");
		$("#dtootherParamsDis").attr("onclick","selectUser('setCallFunFromUser')");
	}
}
/*
 * consignList.jsp 调用
 */
function saveMyData(){
	var params = $("#addConsign").serialize();
	return params;
}
/*
 * consignList.jsp 调用
 */
function checkMyDataForm(){
	return checkForm();
}

/*
 * 设置委托时 的规则校验
 */
function checkForm(){
	var startTime = $("#startTimeStr").val();
	var endTime = $("#endTimeStr").val();
	var toUserId = $("#toUserNameId").val();
	var fromUserId = $("#dtootherParams").val();
	var id = $("#id").val();
	if(fromUserId==""){
		alert("委托人不能为空！");
		return false;
	}
	if(fromUserId.indexOf(",") > 0){
		alert("委托人只能是一个人！");
		return false;
	}
	if(toUserId==""){
		alert("办理人不能为空！");
		return false;
	}
	if(toUserId.indexOf(",") > 0){
		alert("办理人只能是一个人！");
		return false;
	}
	if(startTime!=""&&endTime!=""){
  		if(startTime>endTime){
  			alert("委托开始时间不能大于委托结束时间！");
  			return false;
  		}
	}
		
	if(consignToOther(toUserId,id,startTime,endTime)>0){
		alert("委托失败，该办理人在此时间段内已委托给其他人！");
 		return false;
	}
	if(repeatConsign(fromUserId,id,startTime,endTime)>0){
		alert("委托失败，委托人在此时间段内已委托给其他人！");
  		return false;
	}
	
	return true;
}
/*
 *人员间 是否可以委托验证
 */
function consignToOther(toUserId,id,startTime,endTime){
	var params = {toUserId:toUserId,id:id,startTime:startTime,endTime:endTime};
	var url="${basePath}consign/consignToOther";
  	var jsonObj = tools.requestJsonRs(url, params);
	return jsonObj.data;
}
/*
 *重复委托 验证
 */
function repeatConsign(fromUserId,id,startTime,endTime){
	var params = {fromUserId:fromUserId,id:id,startTime:startTime,endTime:endTime};
	var url="${basePath}consign/repeatConsign";
  	var jsonObj = tools.requestJsonRs(url, params);
	return jsonObj.data;
}

/*
 * 选择人员
 */
function selectUser(setCallFunUser){
	var _titleObj = window.parent.parent.tabs.getActiveObj();
	var _title = _titleObj.title;
	//var v_url = contextRootPath+'/component/dialoguser/selectSysUser.jsp?a=a&check=false&showLowerUser=false&orgId=${curUser.orgId}';
	//v_url = v_url+'&callFun='+setCallFunUser+'&tabTitle='+encodeURI(_title);
	var v_url = contextRootPath+'/component/dialoguser/selectVmTreeUser.jsp?a=a&check=true&showLowerUser=false&orgId=${curUser.orgId}&orgType=LOAN';
	v_url = v_url+'&callFun='+setCallFunUser+'&tabTitle='+encodeURI(_title);
	$.dialog({
		id:	'selectUserDialogId',
	    //lock: true,
	    width:420,
	    height:680,
	    title:'选择办理人',
	    content: 'url:'+ v_url
		}); 
}
/*
 * 提供 被sysUserSelect.jsp 回调的js 函数
 */
function setCallFunToUser(v_ids,v_names){
	debugger;
	$("#toUserNameId").val(v_names);
	$("#toUserId").val(v_ids);
}
/*
 * 提供 被sysUserSelect.jsp 回调的js 函数
 */
function setCallFunFromUser(v_ids,v_names){
	$("#dtootherParamsDis").val(v_names);
	$("#dtootherParams").val(v_ids);
}

/*
 * 本页面的保存操作
 */
function saveData(){
	var diaAddObj = parent.dialogAddObj;
	/* alert(diaAddObj);
	return; */
	var params = $("#addConsign").serialize();
	var url="${basePath}consign/addOrUpdateConsign";
	jyAjax(
		url
		,params
		,function(result){
			alert(result.msg);
			var v_status = result.status;
        	if(v_status.indexOf('ok') >-1){
        		diaAddObj.close();//先关闭弹出层
    			parent.queryData();
        	}
		});
}
</script>