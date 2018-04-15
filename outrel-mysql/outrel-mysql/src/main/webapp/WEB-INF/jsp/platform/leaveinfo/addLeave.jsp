<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<%@ taglib uri="/sysuser" prefix="sysuser"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath1}component/jbpm/dialog/lhgdialog.min.js?skin=iblue"></script>
    <title>新增个人请假</title>
  </head>
  <body>
  <div id="formPageSwap">
	<form id="addLeave" name="addLeave" isCheck="true">
     <table  id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
		<input type="hidden" name="leaveType" value="2" />		
        <tr>
            <th > 请假开始时间： </th>
            <td > <input id="startTimeStr" type="text" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" name ="startTimeStr" size="40" value="" notNull="false" >  
            <th > 请假结束时间： </th>
            <td > <input id="endTimeStr" type="text" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" name ="endTimeStr" size="40" value="" notNull="false">  
        </tr>
	   <tr><th > 事由： </th>
            <td colspan="3">
            <textarea id="reason" type="text" name ="reason" rows="5" cols="55" ></textarea>
            </td>
        </tr> 
        <tr>
            <th> 备注： </th>
            <td colspan="3">
            <textarea id="remark" type="text" name ="remark" rows="5" cols="55" ></textarea>
            </td>
        </tr>       
    </table>
    </form>
    
    </div>
  </body>
</html>
<script type="text/javascript">
$(document).ready(function(){
	checkedInit();
});

/*
 * consignList.jsp 调用
 */
function checkMyDataForm(){
	return checkForm();
}

function saveMyData(){
	var params = $("#addLeave").serialize();
	return params;
}

/*
 * 设置委托时 的规则校验
 */
function checkForm(){
	var startTime = $("#startTimeStr").val();
	var endTime = $("#endTimeStr").val();
	//校验必填
	if(startTime.length ==0){
		$("").newMsg({}).show("请填写请假开始时间");
		return false;
	}
	
	if(endTime.length ==0){
		$("").newMsg({}).show("请填写请假结束时间！");
		return false;
	}
	
	if(startTime!=""&&endTime!=""){
  		if(startTime>endTime){
  			$("").newMsg({}).show("请假开始时间不能大于请假结束时间！");
  			return false;
  		}
	}
	return true;
}

</script>