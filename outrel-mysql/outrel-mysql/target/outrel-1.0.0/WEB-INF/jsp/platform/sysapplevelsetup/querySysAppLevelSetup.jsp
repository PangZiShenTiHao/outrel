<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询错误级别设定表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/sysapplevelsetup/querySysAppLevelSetup.js"></script>
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
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		  	<a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
	  </div>
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
			 {display : ' 级别类型 ', code : 'logLevel', width : 200,  type:'select',value:<syscode:dictionary codeType="LOG_LEVEL" type="json"/>}
	        ,{display : ' 关键字 ', code : 'keyWord', width : 200,  type:'text'}
	        ,<%--{display : ' 邮件提醒 ', code : 'emailFlag', width : 200,  type:'select',value:<syscode:dictionary codeType="YESNO" type="json"/>}
	        ,{display : ' 展示详细信息 ', code : 'showDetailFlag', width : 200,  type:'select',value:<syscode:dictionary codeType="YESNO" type="json"/>}
	        ,{display : ' 短信提醒 ', code : 'smsFlag', width : 200,  type:'select',value:<syscode:dictionary codeType="YESNO" type="json"/>}  --%>
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
			{display : ' 关键字 ', code : 'keyWord', width : 300, align : 'left', type:'fun', isOrder : false,
				value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.keyWord+"</a>";
				    }}
			,{display : ' 级别类型 ', code : 'logLevel', width : 100, align : 'center', type:'select', isOrder : false,value:<syscode:dictionary codeType="LOG_LEVEL" type="json"/>}
			,{display : ' 邮件提醒标识 ', code : 'emailFlag', width : 100, align : 'center', isOrder : false, type:'select',value:<syscode:dictionary codeType="YESNO" type="json"/>}
			,{display : ' 展示详细信息标识 ', code : 'showDetailFlag', width : 100, align : 'center', isOrder : false, type:'select',value:<syscode:dictionary codeType="YESNO" type="json"/>}
			,{display : ' 短信提醒标识 ', code : 'smsFlag', width : 100, align : 'center', isOrder : false, type:'select',value:<syscode:dictionary codeType="YESNO" type="json"/>}
			,{display : ' 提醒频率 ', code : 'rate', width : 100, align : 'center', type:'text', isOrder : false}
			,{display : ' 频率单位 ', code : 'rateUnit', width : 100, align : 'center', isOrder : false, type:'select',value:<syscode:dictionary codeType="LOG_RATE_UNIT" type="json"/>}
		   ],
			url : "${basePath}sysAppLevelSetup/queryListSysAppLevelSetup",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'checkbox',
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
