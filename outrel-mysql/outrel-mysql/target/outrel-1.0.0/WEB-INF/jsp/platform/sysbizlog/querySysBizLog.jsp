<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询业务日志表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/sysbizlog/querySysBizLog.js"></script>
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
			 {display : ' 客户端IP ', code : 'clientIp', width : 200,  type:'text'}
	        ,{display : ' 操作人姓 名', code : 'userName', width : 200,  type:'text'}
	        ,{display : ' 日志内容 ', code : 'logContent', width : 200,  type:'text'}
	        ,{display : ' 插入时间 ', code : 'logTime', width : 200,  type:'date'}
	        ,{display : ' 日志类型 ', code : 'logType', width : 200,  type:'select',value:[{'value':'','text':'所有'},{'value':'interfacelog','text':'interfacelog'},{'value':'businesslog','text':'businesslog'},{'value':'performancelog','text':'performancelog'}]}
	        ,{display : ' 所属模块 ', code : 'logModule', width : 200,  type:'text'}
	        ,{display : ' 操作类型 ', code : 'logOperate', width : 200,  type:'select',value:[{'value':'','text':'所有'},{'value':'login','text':'登陆'},{'value':'insert','text':'插入'},{'value':'update','text':'更新'},{'value':'delete','text':'删除'},{'value':'view','text':'查看'}]}
	        ,{display : ' 是否归档 ', code : 'isArchive', width : 200,  type:'select', value:[{'value':'','text':'所有'},{'value':'0','text':'未归档'},{'value':'1','text':'已归档'}]}
	        //login , insert , update, delete, view ;
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
			 {display : ' 客户端IP ', code : 'clientIp', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.clientIp+"</a>";
				    }	 
			 }
			,{display : ' 操作人ID ', code : 'userId', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 操作人姓名 ', code : 'userName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 日志内容 ', code : 'logContent', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 插入时间 ', code : 'logTime', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 日志类型 ', code : 'logType', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 所属模块 ', code : 'logModule', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 操作类型 ', code : 'logOperateCN', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 是否归档 ', code : 'isArchiveCN', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}sysBizLog/queryListSysBizLog",
			toolbar:[],
			pageSize : 10,
			selectType : 'generic',
			isCheck : true,
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
