<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询接口配置表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 start -->
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		  	<a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
	  </div>
<!-- 列表按钮操作 end -->
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

</body>
<!-- 相关js方法 -->
<script type="text/javascript" src="${basePath}/js/externalplatform/application/extinterfaceinfo/queryExtInterfaceInfo.js?d=<%=myDate%>"></script>
<script type="text/javascript" src="${basePath}js/threeJs/jquery/jquery.form.js"></script>
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
			 {display : ' 接口名称 ', code : 'interfaceName', width : 200,  type:'text'}
	        ,{display : ' 接口编码 ', code : 'interfaceNo', width : 200,  type:'text'}
	        ,{display : ' 是否有效 ', code : 'validateState', width : 200,  type:'select', value:<syscode:dictionary codeType="DQ_IS_STATE" type="json"></syscode:dictionary>}
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
			 {display : ' 接口名称 ', code : 'interfaceName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 接口编码 ', code : 'interfaceNo', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 接口URL ', code : 'interfaceUrl', width : 300, align : 'left', type:'text', isOrder : false}
			,{display : ' 接口描述 ', code : 'interfaceDes', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 交易编码 ', code : 'interfaceCode', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 业务编码 ', code : 'businessCode', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 接口调用方式  ', code : 'interfaceSendType', width : 100, align : 'left', type:'select', value:<syscode:dictionary codeType="EXT_INTER_SEND_TYPE" type="json"></syscode:dictionary>, isOrder : false}
			,{display : ' 接口参数类型  ', code : 'interfaceParamsType', width : 100, align : 'left', type:'select', value:<syscode:dictionary codeType="EXT_INTER_PARAMS_TYPE" type="json"></syscode:dictionary>, isOrder : false}
			,{display : ' 接口调用类名全称  ', code : 'className', width : 200, align : 'left', type:'text', isOrder : false}
			,{display : ' 是否有效 ', code : 'validateState', width : 100, align : 'center', type:'select', value:<syscode:dictionary codeType="DQ_IS_STATE" type="json"></syscode:dictionary>, isOrder : false}
			,{display : ' 操作 ', code : '', width : 100, align : 'center', type:'fun', isOrder : false,
				  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewContent("+obj.id+")'>查看模板</a>";
				    }	 
			 }
			],
			url : "${basePath}extInterfaceInfo/queryListExtInterfaceInfo",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'radio',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id",
			clickFun:viewData,
			checkedFun:viewData
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
</script> 
</html>
