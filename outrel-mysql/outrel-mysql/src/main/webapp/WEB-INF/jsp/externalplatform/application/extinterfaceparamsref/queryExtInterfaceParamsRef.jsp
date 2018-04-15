<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询接口参数映射表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 start -->
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		  <a href="javascript:void(0)" onclick="toAddData('${interfaceNo}','ROOT')" index="0">新增</a>
		  <a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
	  </div>
<!-- 列表按钮操作 end -->
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

</body>
<!-- 相关js方法 -->
<script type="text/javascript" src="${basePath}/js/externalplatform/application/extinterfaceparamsref/queryExtInterfaceParamsRef.js?d=<%=myDate%>"></script>
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>	
<script>
	var iframe;
	var interfaceNo='${interfaceNo}';
	//定义form表单 查询 方法
	function queryData(){
		iframe.query();
	}
	//定义 form表单 重置方法
	function resetData(){
		//iframe.iframeObj["form"].reset();
	}
	//初始化 查询页面元素
	function initFn(){
		//定义工具条	
		var toolbar={
			title:"查询列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 参数名称 ', code : 'paramsName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 参数编码 ', code : 'paramsCode', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 父参数编码 ', code : 'parentParams', width : 100, align : 'left', type:'hidden', isOrder : false}
			,{display : ' 是否有效 ', code : 'validateState', width : 100, align : 'center', type:'select', value:<syscode:dictionary codeType="DQ_IS_STATE" type="json"></syscode:dictionary>, isOrder : false}
			/* ,{display : ' 操作 ', width : 100, align : 'center', type:'fun', isOrder : false,
				  value:function (obj){
						return "<a href='javascript:void(0)' onclick='toAddData(interfaceNo,"+obj.paramsCode+")'>添加子参数</a>"
				    }	 
			 } */
			],
			url : "${basePath}extInterfaceParamsRef/queryListExtInterfaceParamsRef?interfaceNo=${interfaceNo}",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'checkbox',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//初始化 form 表单 table 列表 及工具条 
		iframe = $("#content").newTable(tableStructure);
		iframe.showAndQuery();
	}
</script> 
</html>
