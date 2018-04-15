<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改任务分组定义表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">

function stopTask(id,obj,index){
	var isEnd = $('#td'+index).html().trim();
	 if(isEnd=='是'){
		isEnd=0;
	 }else if(isEnd=='否'){
		isEnd = 1
	}
		$.ajax({
         type:"POST",
         url:contextRootPath+"/quartzTaskGroupDef/stopTaskById?taskId="+id+"&isEnd="+isEnd,
         success:function(msg){
        	 if(isEnd==0){
        		 obj.innerHTML='暂停';
        		 $('#td'+index).html('否');
        	 }if(isEnd==1){
        		 obj.innerHTML='启动';
        		 $('#td'+index).html('是');
        	 }
         }
     }); 
}

</script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.quartzJob.quartzTaskGroupDef.controller.QuartzTaskGroupDefController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.groupId}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 分组编号 ：</th>
  <td >${dtoList[0].groupId}</td>
  <th> 分组名称 ：</th>
  <td >${dtoList[0].groupName}</td>
  <th> 分组任务是否发 ：</th>
  <td ><c:if test='${dtoList[0].groupState==0}'>否</c:if>
	   <c:if test='${dtoList[0].groupState==1}'>是</c:if>
  </td>
</tr>
<tr>
  <th> 是否自动执行：</th>
  <td ><c:if test='${dtoList[0].autoExec==0}'>否</c:if>
	   <c:if test='${dtoList[0].autoExec==1}'>是</c:if></td>
  <th> 执行时机：</th>
  <td ><c:if test='${dtoList[0].dealChance=="day"}'>日任务</c:if>
  	   <c:if test='${dtoList[0].dealChance!="day"}'>年任务</c:if>
  </td>
  <th> 执行时间 ：</th>
  <td colspan="5">${dtoList[0].runTime}</td>
</tr>
</table>
<br/>
<%-- <table id="tab" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
		<tr align='center'>
			<td width=5%>执行顺序</td>
			<td width=15%>任务名称</td>
			<td width=15%>任务类名</td>
			<td width=10%>依赖任务</td>
			<td width=10%>依赖状态</td>
			<td>是否暂停</td>
			<td width=10%>操作</td>
		</tr>
		<c:forEach items="${dtoList}" var="attr" varStatus="status">
			<tr id="${status.index+1}">
				<td>${attr.dealStep}</td>
				<td>${attr.taskName}</td>
				<td>${attr.beanId}</td>
				<td>${attr.preStep}</td>
				<td><c:if test='${attr.preStepState==0}'>失败</c:if>
					<c:if test='${attr.preStepState==1}'>成功</c:if>
				</td>
				<td id='td${status.index+1}'><c:if test='${attr.isEnd==0}'>否</c:if>
					<c:if test='${attr.isEnd==1}'>是</c:if></td>
				<td><a href='#' onclick="stopTask('${attr.taskId}',this,'${status.index+1}');" id='event${status.index+1}'>
				
				<c:if test="${attr.isEnd==0}">暂停</c:if>
				<c:if test="${attr.isEnd==1}">启动</c:if></a>
				
				</td>
			</tr>
		</c:forEach>
	</table> --%>
	
	<table id="tab" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
		<tr align='center'>
			<td width=5%>执行顺序</td>
			<td width=15%>任务名称</td>
			<td width=15%>任务类名</td>
			<td width=10%>依赖任务</td>
			<td width=10%>依赖状态</td>
			<td>是否暂停</td>
			<td width=10%>操作</td>
		</tr>
		<c:forEach items="${dtoList}" var="attr" varStatus="status">
			<tr id="${attr.taskName}">
				<td>${attr.dealStep}</td>
				<td>${attr.taskName}</td>
				<td>${attr.beanId}</td>
				<td>${attr.preStep}</td>
				<td><c:if test='${attr.preStepState==0}'>失败</c:if>
					<c:if test='${attr.preStepState==1}'>成功</c:if>
				</td>
				<td id='td${attr.taskName}'><c:if test='${attr.isEnd==0}'>否</c:if>
					<c:if test='${attr.isEnd==1}'>是</c:if></td>
				<td><a href='#' onclick="statusTask('${attr.taskName}');" id='event${attr.taskName}'>
				
				<c:if test="${attr.isEnd==0}">暂停</c:if>
				<c:if test="${attr.isEnd==1}">启动</c:if></a>
				
				</td>
			</tr>
		</c:forEach>
	</table>

<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
   		
	});
   
   function statusTask(trName){
	   var sta=$('#'+trName).children()[3].innerHTML.trim();
	   var isEnd=$('#'+trName).children()[5].innerHTML.trim();
	   var dbEnd=0;
	   if(isEnd=='是'){
		   dbEnd=0;
		 }else if(isEnd=='否'){
			dbEnd = 1;
		}
	   if(sta!=''){
		   if(isEnd=='是'){
			   var preList=trName;
			   preList=getPreList(preList,sta);
			   var arrayTask=preList.split(";");
			   var arrayT=new Array();
			   for(var i=0;i<arrayTask.length;i++){
					if(arrayT.indexOf(arrayTask[i])==-1){
						arrayT.push(arrayTask[i]);
					}   
			   }
			   for(var i=0;i<arrayT.length;i++){
				   dbStatusTask(arrayT[i],dbEnd,arrayT[i]);
			   }
			 }else if(isEnd=='否'){
				var nextList=trName;
				nextList=getNextList(nextList,trName);
				 var arrayTask=nextList.split(";");
				   var arrayT=new Array();
				   for(var i=0;i<arrayTask.length;i++){
						if(arrayT.indexOf(arrayTask[i])==-1){
							arrayT.push(arrayTask[i]);
						}   
				   }
				   for(var i=0;i<arrayT.length;i++){
					   dbStatusTask(arrayT[i],dbEnd,arrayT[i]);
				   }
			}
	   }else{
		   if(isEnd=='是'){
			   dbStatusTask(trName,dbEnd,trName);
		   }else{
			   var nextList=trName;
			   nextList= getNextList(nextList,trName);
			   var arrayTask=nextList.split(";");
			   var arrayT=new Array();
			   for(var i=0;i<arrayTask.length;i++){
					if(arrayT.indexOf(arrayTask[i])==-1){
						arrayT.push(arrayTask[i]);
					}   
			   }
			   for(var i=0;i<arrayT.length;i++){
				   dbStatusTask(arrayT[i],dbEnd,arrayT[i]);
			   }
		   }
	   }
			
   }
   //通过依赖的上一节点来处理要执行那些任务操作的名字
   function getPreList(preList,preTask){
	   <c:forEach items="${dtoList}" var="attr" varStatus="status">
	  	if('${attr.taskName}'==preTask){
	  		preList=preList+";"+'${attr.taskName}';
	  		preList=preList+";"+getPreList(preList,'${attr.preStep}');
	  	}
	   </c:forEach>
	   return preList;
   }
   //通过依赖的下一节点来处理要执行的任务操作名字
   function getNextList(nextList,taskName){
	   <c:forEach items="${dtoList}" var="attr" varStatus="status">
	  	if('${attr.preStep}'==taskName){
	  		nextList=nextList+";"+'${attr.taskName}';
	  		nextList=nextList+";"+getNextList(nextList,'${attr.taskName}');
	  	}
	   </c:forEach>
	   return nextList;
   }
   //实现与数据库中状态的更新
   function dbStatusTask(taskName,dbEnd,index){
	   $.ajax({
	         type:"POST",
	         url:contextRootPath+"/quartzTaskGroupDef/stopTaskById?taskName="+taskName+"&isEnd="+dbEnd,
	         success:function(msg){
	        	 if(dbEnd==0){
	        		 $('#td'+taskName).html('否');
	        		 $('#event'+taskName).html('暂停');
	        	 }if(dbEnd==1){
	        		 $('#td'+taskName).html('是');
	        		 $('#event'+taskName).html('启动');
	        	 }
	         }
	     }); 
   }
</script>
  
</html>
