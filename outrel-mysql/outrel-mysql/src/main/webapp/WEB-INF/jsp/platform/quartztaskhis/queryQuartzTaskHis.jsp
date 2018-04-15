<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询定时任务执行轨迹表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/quartztaskhis/queryQuartzTaskHis.js"></script>
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>

</head>
<body style="background-color:#FFFFFF">

	
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

</body>
<!-- 相关js方法 -->	
<script>
	var iframe;
	
	//定义form表单 查询 方法
	function queryData(){
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
			 {display : ' 批次号码 ', code : 'batchNo', width : 200,  type:'text'}
	        ,{display : ' 分组编码 ', code : 'groupId', width : 200,  type:'text'}
	        ,{display : ' 任务编号 ', code : 'taskId', width : 200,  type:'text'}
	        ,{display : ' 任务类名 ', code : 'beanId', width : 200,  type:'text'}
	        ,{display : ' 任务执行日期 ', code : 'taskStartTime', width : 200, type: 'date'}
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
			 {display : ' 批次号码 ', code : 'batchNo', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.batchNo+"</a>";
				    }	 
			 }
			,{display : ' 分组编码 ', code : 'groupId', width : 200, align : 'left', type:'text', isOrder : false}
			,{display : ' 执行任务的主线 ', code : 'threadId', width : 150, align : 'left', type:'text', isOrder : false}
			,{display : ' 任务编号 ', code : 'taskId', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 任务类名（实体类） ', code : 'beanId', width : 200, align : 'left', type:'text', isOrder : false}
			,{display : ' 任务执行返回结果 ', code : 'taskState', width : 100, align : 'left', type:'select', isOrder : false,value:[
			                                                                                            {"value": "0", "text": "失败"},
			                                                                                            {"value": "1", "text": "成功"},
			                                                                                        ]}
			,{display : ' 任务执行中信息描述 ', code : 'taskInfo', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 错误描述 ', code : 'errorInfo', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}quartzTaskHis/queryListQuartzTaskHis",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'checkbox',
			isCheck : false,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
</script> 
</html>
