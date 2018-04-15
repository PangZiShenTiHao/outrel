<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/app" prefix="app"%>
<%
	String path = request.getContextPath();
	String basePath = path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<html>
<head>
<title>定时任务列表</title>
<jsp:include page="/common/StaticJavascript.jsp" />
</head>
<body> 

<script>
  	var dialog;
	var iframe;
  	var tree;
  	
  	function addFrom(){
  		var params=$("#addQuartz").serialize();
  		var url="<%=basePath%>quartz/addQuartzJob";
  		jyAjax(url,params,function(result){
  			$("").newMsg({}).show(result.msg);
  			//alert(result.msg);
  			queryData();
  		})
  	}
	
  	var addPojo=function(){
  		var dialogStruct={
  			"display":"<%=basePath%>quartz/toAddQuartz",
  			"isIframe":"false",
  			"width":"500"
  			,"height":"300"
  			,"title":"新增"
  			,"buttons":[{"text":"保存","action":addFrom,"isClose":true},{"text":"关闭","isClose":true}]};
		dialog=jyDialog(dialogStruct).open();
	};
	
	function updateData(obj){
		
		var tigName = obj["TRIGGER_NAME"];
		var tigGroup = obj["TRIGGER_GROUP"];
		if(obj["TRIGGER_STATE"]!='PAUSED'){
			alert("任务正在运行，不允许修改");
			return;
		}
		tigName = encodeURIComponent(encodeURIComponent(tigName));
		tigGroup = encodeURIComponent(encodeURIComponent(tigGroup));
		//alert(tigName);
		var dialogStruct={
			"display":"<%=basePath%>quartz/toUpdateQuartz?triggerName="+tigName+"&triggerGroup="+tigGroup,
			"width":"500",
			"isIframe":"false",
			"height":"300",
			"title":"修改",
			"buttons":[{"text":"保存","action":editFrom,"isClose":true},{"text":"关闭","isClose":true}]};
		dialog=jyDialog(dialogStruct).open();
	}
	
	function editFrom(){
		//var params=$(dialog.iframe.contentDocument.getElementById("addQuartz")).serialize()
  		var params=$("#addQuartz").serialize();
  		var url="<%=basePath%>quartz/updateQuartzJob";
  		jyAjax(url,params,function(result){
  			//iframe.iframeObj["table"].modifyPojo(result.data);
  			$("").newMsg({}).show(result.msg);
  			queryData();
  		})
  	}
	
	function deleteStaff(obj){
		jyDialog({"type":"question"}).confirm("是否确认删除？",function(){
		     $.ajax({
                type:"POST",
                url:"<%=basePath%>staff/deleteStaff?id="+obj["ID"],
                success:function(msg){
                	if(msg&&msg.status=="ok"){
                		iframe.iframeObj["table"].removeById(obj["ID"]);
                	}
                }
            });
		   },"确认提示");
        <%-- confirm_ = confirm('是否确认删除?');
        if(confirm_){
        	debugger;
            $.ajax({
                type:"POST",
                url:"<%=basePath%>staff/deleteStaff?id="+obj["ID"],
                success:function(msg){
                	if(msg&&msg.status=="ok"){
                		iframe.iframeObj["table"].removeById(obj["ID"]);
                	}
                }
            });
        } --%>
    }
    
	var roleId='';
	function toDistributionStaffRole(obj) {
		roleId=obj["id"];
		systemId=obj["systemId"];
		var dialogStruct={"display":"<%=basePath%>staff/toDistributionStaffRole?staffId="+obj["ID"],"buttons":[{"text":"保存","action":saveStaffRole,"isClose":true},{"text":"关闭","isClose":false}]};
		dialog=jyDialog(dialogStruct).open();
	}
	
	function saveStaffRole(obj){
    	var params=$("#staffRole").serialize();
  		var url="<%=basePath%>staff/saveStaffRole";
  		jyAjax(url,params,function(result){
  			iframe.iframeObj["table"].addPojo(result.data);
  		})
	}

    function queryData(){
    	iframe.iframeObj["table"].query();
    }
  window.onload=function(){
	  
	var formStructure={
		columns : [
			{display : 'TRIG名称', code : 'triggerName', width : 200,  type:'text',value:''},
			{display : 'TRIG分组', code : 'triggerGroup', width : 200,  type:'text',value:''},
			{display : 'JOB名称', code : 'jobName', width : 200,  type:'text',value:''},
			{display : 'JOB分组', code : 'jobGroup', width : 200,  type:'text',value:''},
			{display : '状态', code : 'triggerState', width : 100,   type:'select',value:[{"value":"","text":"请选择"},{"value":"PAUSED","text":"暂停"},{"value":"WAITING","text":"等待执行"}]},
			/*
			{display : '下次执行时间 ', code : 'nextFireTime', width : 200,  type:'text'},
			{display : '上次执行时间', code : 'prevFireTime', width : 200,  type:'text'},
			{display : '任务描述', code : 'description', width : 200,  type:'text'},
			*/
		],
		buttons:[
			{"text":"查询","fun":function(){queryData();},icon:"ui-icon-search"},
			{"text":"重置","fun":function(){iframe.iframeObj["form"].reset();},icon:"ui-icon-extlink"}
		]
	}
	var toolbar={
		title:"查询列表"
		/* buttons:[
			{"text":"新增","fun":function(){addPojo();}}
		]	 */
	}
  	
	function openUrl(obj){
		var dialogStruct={"display":"<%=basePath%>staff/toDataPermisson/"+obj["ID"],height:500,width:800,"buttons":[{"text":"关闭","isClose":false}]};
		dialog=jyDialog(dialogStruct).open();
	}
	var tableStructure = {
			columns : [
				{display : 'Trigger 名称', code : 'TRIGGER_NAME', width : 150, align : 'left', type:'text'},
				/* {display : 'Trigger 分组', code : 'TRIGGER_GROUP', width : 80, align : 'left', type:'text'}, */
				{display : 'JOB名称', code : 'JOB_NAME', width : 150, align : 'left'},
				{display : 'CRON', code : 'CRON_EXPRESSION', width : 100, align : 'center'},
				/* {display : 'JOB分组', code : 'JOB_GROUP', width : 80, align : 'left', type:'text'}, */
				/* {display : '描述', code : 'DESCRIPTION', width : 100, align : 'center',type:'text'}, */
				{display : '下次执行时间', code : 'NEXT_FIRE_TIME', width : 150, align : 'center',type:'text'},
				{display : '上次执行时间', code : 'PREV_FIRE_TIME', width : 150, align : 'center',type:'text'},
				{display : '优先级', code : 'PRIORITY', width : 50, align : 'center',type:'text'},
				{display : '状态', code : 'TRIGGER_STATE', width : 80, align : 'center',type:'text'},
				{display : '类型', code : 'TRIGGER_TYPE', width : 80, align : 'center',type:'text' },
				{display : 'START_TIME', code : 'START_TIME', width : 150, align : 'center',type:'text' },
				{display : 'END_TIME', code : 'END_TIME', width : 150, align : 'center',type:'text' },
				{display : '操作', code : 'modifier', width : 150, align : 'left', type:'link',value:[
				                                                                                                    {"text":"修改","action":updateData},
				                                                                                                    {"text":"暂停","action":pauseData},
				                                                                                                    {"text":"恢复","action":resumeData},
				                                                                                                    {"text":"删除","action":deleteData}
				                                                                                                    ]},
		   ],
			url : "../quartz/findAllQuartz",
			pageSize : 10,
			toolbar:"tableToolbar",
			selectType : 'radio',
			checkbox : false,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			primaryKey:"TRIGGER_NAME",
			trHeight : 30,
			form:"form"
		};
		
	var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
	iframe=$("#content").newSearchIframe(searchIframe);
	iframe.show();	
}
  
function pauseData(obj){
	var tigName = obj["TRIGGER_NAME"];
	var tigGroup = obj["TRIGGER_GROUP"];
	var params={triggerName:tigName,triggerGroup:tigGroup};
	var url="<%=basePath%>quartz/pauseQuartzJob";
	jyAjax(url,params,function(result){
		$("").newMsg({}).show(result.msg);
		queryData();
			
	})
}
function resumeData(obj){
	var tigName = obj["TRIGGER_NAME"];
	var tigGroup = obj["TRIGGER_GROUP"];
	var params={triggerName:tigName,triggerGroup:tigGroup};
	var url="<%=basePath%>quartz/resumeQuartzJob";
	jyAjax(url,params,function(result){
		$("").newMsg({}).show(result.msg);
		queryData();
			
	})
}
function deleteData(obj){
	var tigName = obj["TRIGGER_NAME"];
	var tigGroup = obj["TRIGGER_GROUP"];
	if(obj["TRIGGER_STATE"]!='PAUSED'){
			jyDialog({"type":"info"}).alert("任务正在运行，不允许删除");
			return;
		}
	var params={triggerName:tigName,triggerGroup:tigGroup};
	var url="<%=basePath%>quartz/removeQuartzJob";
	jyDialog({"type":"question"}).confirm("您确定要任务吗？",function(){
     jyAjax(url,params,function(result){
			$("").newMsg({}).show(result.msg);
			queryData();
				
		});
   },"确认提示");
	/* if(confirm("您确定要任务吗？")){
		jyAjax(url,params,function(result){
			$("").newMsg({}).show(result.msg);
			queryData();
				
		});
	} */
}
</script>
<div id="content"></div>
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		<!--  
		  <shiro:hasPermission name="platform/sysversion/querySysVersion:add">
		  	<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		  </shiro:hasPermission>
	  	 <shiro:hasPermission name="platform/sysversion/querySysVersion:modify">
		  	<a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
		  </shiro:hasPermission>
		  <shiro:hasPermission name="platform/sysversion/querySysVersion:delete">
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
		  </shiro:hasPermission>
		  -->
		  <a href="javascript:void(0)" onclick="addPojo()" index="0">新增</a>
	  </div>
</body>
</html>