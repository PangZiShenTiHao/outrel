<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询异步接口任务表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 start -->
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">暂停/删除</a>
		  	<a href="javascript:void(0)" onclick="toUpdateData()" index="1">恢复</a>
	  </div>
<!-- 列表按钮操作 end -->
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>
</body>
<!-- 相关js方法 -->
<script type="text/javascript" src="${basePath}js/platform/sysasynjob/querySysAsynJob.js?d=<%=myDate%>"></script>
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>	
<script>
	var iframe;
	//定义form表单 查询 方法
	function queryData(){
		setStartEndDate();
		iframe.iframeObj["table"].query();
	}
	//定义 form表单 重置方法
	function resetData(){
		iframe.iframeObj["form"].reset();
	}
	//初始化 查询页面元素
	function initFn(){
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 业务实体 ', code : 'beanId', width : 200,  type:'text'}
	        ,{display : ' 业务主键ID ', code : 'bizKeyId', width : 200,  type:'text'}
	        ,{display : ' 异常描述 ', code : 'errorRemark', width : 200,  type:'text'}
	        ,{display : ' 任务状态 ', code : 'jobState', width : 200,  type:'select',value:[{value:'',text:'--请选择--'},{value:'1',text:'待调用'},{value:'0',text:'已完成'}]}
	        ,{display : ' 是否有效 ', code : 'valid', width : 200,  type:'select',value:<syscode:dictionary codeType="YESNO" type="json"/>}
	        ,{display : ' 执行中', code : 'jobRun', width : 200,  type:'select',value:<syscode:dictionary codeType="YESNO" type="json"/>}
	        ,{display : '创建时间', code : 'createTime', width : 100, align : 'left',type: 'dbDate',isCompare:true}
			,{display : '到达时间开始', code : 'startTimeTS', width : 100, align : 'left',type:'hidden'}
			,{display : '到达时间结束', code : 'endTimeTS', width : 100, align : 'left',type:'hidden'}
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义工具条	
		var toolbar={
			title:"查询列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 业务实体 ', code : 'beanId', width : 300, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.beanId+"</a>";
				    }	 
			 }
			,{display : ' 业务主键ID ', code : 'bizKeyId', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 任务状态', code : 'jobState', width : 60, align : 'left', type:'select',value:[{value:'',text:'--请选择--'},{value:'1',text:'待调用'},{value:'0',text:'已完成'}]}
			,{display : ' 执行开始时间 ', code : 'startTime', width : 120, align : 'left', type:'date',format:'yyyy-MM-dd HH:mm:ss',isOrder : false}
			,{display : ' 执行结束时间', code : 'endTime', width : 120, align : 'left', type:'date',format:'yyyy-MM-dd HH:mm:ss', isOrder : false}
			,{display : ' 执行中', code : 'jobRun', width : 60, align : 'left', type:'select',value:<syscode:dictionary codeType="YESNO" type="json"/>}
			,{display : ' 重复执行次数 ', code : 'runCun', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 创建时间 ', code : 'createTime', width : 120, align : 'left', type:'date',format:'yyyy-MM-dd HH:mm:ss', isOrder : false}
			,{display : ' 是否有效 ', code : 'valid', width : 60, align : 'left', type:'select',value:<syscode:dictionary codeType="YESNO" type="json"/>}
			,{display : ' 异常描述 ', code : 'errorRemark', width : 180, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}sysAsynJob/queryListSysAsynJob",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'radio',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure,"isNotQuery":true};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
	
function setStartEndDate(){
	var _staTime = $("[name='createTime_start']").val();
	$("[name='startTimeTS']").val(_staTime);
	var _endTime = $("[name='createTime_end']").val();
	$("[name='endTimeTS']").val(_endTime);
}
</script> 
</html>
