<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询任务分组定义表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
	    //使用异步统计总数
	    $("[name='bizTotalFlag']").val("N");
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
			  {display : ' 用户名 ', code : 'userId', width : 200,  type:'text'}
			 ,{display : '业务查询与异步统计', code :'bizTotalFlag', width : 200,  type:'select',value:[{"value": "", "text": "系统默认"},{"value": "N", "text": "业务查询"},{"value": "Y", "text": "异步统计"}]}
			 ,{display : ' 模块名称 ', code : 'moduleName', width : 200,  type:'text'}
			 ,{display : ' 类名称 ', code : 'className', width : 200,  type:'text'}
			 ,{display : ' 方法名称 ', code : 'methodName', width : 200,  type:'text'}
			 ,{display : ' 日志类型 ', code : 'type', width : 200,  type:'select',value:[{"value": "", "text": "全部"},{"value": "0", "text": "系统操作"},{"value": "1", "text": "用户访问"}]}
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 日志id ', code : 'id', width : 100, align : 'left',isLock: true, type:'fun',
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick=viewData('"+obj.id+"')>"+obj.id+"</a>";
				    }	 
			 }
			,{display : '发生时间 ', code : 'created', width : 150, align : 'left', type:'text',isLock: true }
			,{display : ' 用户名 ', code : 'userId', width : 100, align : 'left', type:'text'}
			,{display : ' 模块名称 ', code : 'moduleName', width : 100, align : 'left', type:'text'}
			,{display : ' 类名称', code : 'className', width : 500, align : 'left', type:'text'}
			,{display : ' 方法名称', code : 'methodName', width : 150, align : 'left', type:'text'}
			,{display : ' 日志类型', code : 'type', width : 150, align : 'left', type:'select',value:[
			                                                                                            {"value": "0", "text": "系统操作"},
			                                                                                            {"value": "1", "text": "用户访问"},
			                                                                                        ]}
			
		   ],
			url : "${basePath}sysLog/queryListSysLog",
			pageSize : 10,
			selectType : 'radio',
			isCheck : false,
			rownumbers : true,
			pages : [ 10, 30, 40 ],
			trHeight : 25,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"form":formStructure,"table":tableStructure,"isNotQuery":'true'};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
	function viewData(vId) {
		var dialogStruct = {
			'display' : contextRootPath
					+ '/sysLog/prepareExecute/toView?id=' + vId,
			'width' : 900,
			'height' : 400,
			'title' : '查看明细',
			'isIframe' : 'false',
			'buttons' : [ {
				'text' : '关闭',
				'isClose' : true
			} ]
		};

		var dialogView = jyDialog(dialogStruct).open();
	}
</script> 
</html>
