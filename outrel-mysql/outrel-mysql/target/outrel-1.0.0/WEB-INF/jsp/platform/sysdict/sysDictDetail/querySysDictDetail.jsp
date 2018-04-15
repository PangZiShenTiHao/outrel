<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/common/StaticJavascript.jsp"%>
<title>查询数据字典明细表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript"
	src="${basePath}js/platform/sysdict/sysDictDetail/querySysDictDetail.js"></script>
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function() {
		initFn();
	});
</script>

</head>
<body style="background-color:#FFFFFF">
	<div id="resizable" class="resizable ui-widget-content ui-corner-all">
		<h3 class="ui-widget-header ui-corner-all">
			<div class="titleSpan">数据字典详细列表</div>
		</h3>
			<!-- 页面初始化 需要的 div -->
			<div id="content"></div>
	</div>
</body>
<!-- 相关js方法 -->
<script>
	var table;
	var dictId = '${dictId}';
	var type = '${type}';
	//定义form表单 查询 方法
	function queryData() {
		table.query();
	}
	//定义 form表单 重置方法
	function resetData() {
		//table.reset();
	}
	//初始化 查询页面元素
	function initFn() {

		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [ {
				display : ' 数据名称 ',
				code : 'dictDetailName',
				width : 100,
				align : 'left',
				type : 'text',
				isOrder : false
			}, {
				display : ' 数据值 ',
				code : 'dictDetailValue',
				width : 100,
				align : 'left',
				type : 'text',
				isOrder : false
			}, {
				display : ' 排序 ',
				code : 'orderBy',
				width : 100,
				align : 'left',
				type : 'text',
				isOrder : false
			}
			//,{display : ' 乐观锁 ', code : 'version', width : 100, align : 'left', type:'text', isOrder : false}
			],
			url : "${basePath}sysDictDetail/queryListSysDictDetail?dictId=${dictId}",
			toolbar : [ {
				"text" : "新增",
				"action" : toAddData
			}, {
				"text" : "修改",
				"action" : toUpdateData
			}, {
				"text" : "删除",
				"action" : deleteData
			} ],
			pageSize : 10,
			pages : [ 10, 20, 30 ],
			selectType : 'checkbox',
			isCheck : true,
			rownumbers : true,
			form : "form",
			trHeight : 30,
			headName : "字典详细列表",
			primaryKey : "id"
		};
		//组装 searchIframe 的相关参数		
		//var searchIframe={"toolbar":toolbar,"form":null,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		table = $("#content").newTable(tableStructure);
		table.showAndQuery();
	}
</script>
</html>
