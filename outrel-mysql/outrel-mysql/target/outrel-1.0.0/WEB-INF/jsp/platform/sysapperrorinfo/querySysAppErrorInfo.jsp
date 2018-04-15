<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询业务系统节点错误日志</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/sysapperrorinfo/querySysAppErrorInfo.js"></script>
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>

</head>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 start -->
<!-- 列表按钮操作 end -->

	<div id="resizable" class="resizable ui-widget-content ui-corner-all">
	  <div id="toolbar"> </div>
	  <div class="ui-wid  get-content ui-corner-all" style="padding:10px;" id="formDiv"></div>
	  <div id="table" class="tableSpan"></div>
	</div>
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

</body>
<!-- 相关js方法 -->	
<script>
	var iframe;
	
	//定义form表单 查询 方法
	function queryData(){
		var appFlag = $("select[name='appFlag']").val();
		if(appFlag==null || appFlag==""){
			$("").newMsg({}).show("业务系统标示为必选项！");
			return;
		}
		
		var createTime_start = $("input[name='createTime_start']").val();
		var createTime_end = $("input[name='createTime_end']").val();
		if( createTime_start=="" || createTime_end=="" ){
			$("").newMsg({}).show("时间范围条件不能为空！");
			return;
		}
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
			 {display : ' 节点名称 ', code : 'nodeName', width : 200,  type:'text'}
	        ,{display : ' 业务系统 ', code : 'appFlag', width : 200,  type:'select', value:<syscode:dictionary codeType="SYSTEMFLAG" type="json" used="${appIds}" hasBlank="false"/>}
	        ,{display : ' 日志级别 ', code : 'logLevel', width : 200,  type:'select',value:<syscode:dictionary codeType="LOG_LEVEL" type="json"/>}
	        ,{display : ' 时间范围', code : 'createTime', width : 100, align : 'left',type: 'dbDate',isCompare:true,extendProperty:{"notNull":"true"}}
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			/* ,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"} */
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
			 {display : ' 节点名称(IP) ', code : 'nodeName', width : 150, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.nodeName+"</a>";
				    }	 
			 }
			,{display : ' 业务系统标识 ', code : 'appFlag', width : 200, align : 'left', isOrder : false, type:'select',value:<syscode:dictionary codeType="SYSTEMFLAG" type="json"/>}
			,{display : ' 日志级别 ', code : 'logLevel', width : 200, align : 'left', isOrder : false, type:'select',value:<syscode:dictionary codeType="LOG_LEVEL" type="json"/>}
			/* ,{display : ' 日志文件名 ', code : 'fileName', width : 150, align : 'left', type:'text', isOrder : false} */
			,{display : ' 日志生成时间 ', code : 'createTime', width : 150, align : 'left', type:'text', isOrder : false}
			,{display : ' 内容 ', code : 'concent', width : 400, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}sysAppErrorInfo/queryListSysAppErrorInfo",
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
	//setInterval(queryData, 10000);
</script> 
</html>
