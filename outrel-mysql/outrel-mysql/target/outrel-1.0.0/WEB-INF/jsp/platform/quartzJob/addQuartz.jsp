<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
	<jsp:include page="/common/StaticJavascript2.jsp" />
	
	<script type="text/javascript">
	$(document).ready(function(){
		if("${type}"=="edit"){
			$("#triggerNameId").attr("readonly",true);
			$("#jobClaz").attr("readonly",true);
			$("#triggerNameId").val("${result.triggerName}");
			$("#triggerGroup").val("${result.triggerGroup}");
			$("#cronExpression").val("${result.cron}");
			$("#jobClaz").val("${result.jobClaz}");
			$("#jobName").val("${result.jobName}");
		}
	});
	
	function radioClick() {
		var radioValue = $("input[type=radio][name=status]:checked").val();
		if (radioValue == 2) {
			$("#tempValidate").show();
		} else {
			$("#tempValidate").hide();
			$("#tempValidStartDate").val("");
			$("#tempValidEndDate").val("");
		}
	}
	
	function checkSystemNameIsExist(){
		var systemName = $("#systemName").val();
		debugger;
		$.ajax({
            type:"POST",
            url:"<%=basePath%>staff/checkSystemNameIsExist?systemName="+systemName,
            error: function(msg){jyDialog({"type":"error"}).alert('error');},
            success:function(msg){
            	if(msg&&msg.status=="failed"){
            		$("#systemNameDiv").html("<label style='color:red'>"+ msg.msg +"</label>");
            	}
            }
        });
	}
	
	</script>
  </head>
  <body>
	<form id="addQuartz" name="addQuartz">
     <table>
  		<tr>
            <th align="right" nowrap class="needRequired"> Trigger 名称： </th>
            <td align="left"> <input id="triggerNameId" type="text" name ="triggerNameId" size="40" > 
            <input id="jobName" type="hidden" name ="jobName" size="40" > 
            <input id="triggerGroup" type="hidden" name ="triggerGroup" size="40" > 
            <br><em>Trigger名称</em></td>
        </tr>
        <tr>
            <th align="right" nowrap class="needRequired"> Cron表达式： </th>
            <td align="left"> <input id="cronExpression" type="text" name ="cronExpression" size="40">  
            <br><em>（Cron表达式(如"0/10 * * ? * * *"，每10秒中执行调试一次)</em></td>
        </tr>
	   <tr><th align="right" nowrap class="needRequired"> 处理类名称： </th>
            <td align="left" colspan="3" ><input id="jobClaz" type="text" name ="jobClaz" size="40"  >
            <br><em>任务处理类如：com.portal.demo.dao.quartzJob.TestJobTask</em></td>
        </tr> 
    </table>
    </form>
  </body>
</html>
