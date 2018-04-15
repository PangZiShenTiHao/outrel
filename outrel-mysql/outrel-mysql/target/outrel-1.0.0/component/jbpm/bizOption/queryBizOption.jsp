<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
	<%@ include file="/common/StaticJavascript.jsp" %>
	
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

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
			 
			],
			//定义form 表单 按钮信息
			buttons:[
			
			]
		}
		//定义工具条	
		var toolbar={
			title:"意见轨迹列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 环节(节点名称)', code : 'activeName', width : 100, align : 'left', type:'text'}
			/* ,{display : ' 系统在该环节的描述 ', code : 'systemActiveInfo', width : 200, align : 'left', type:'text'} */
			,{display : ' 意见信息 ', code : 'optionRemark', width : 200, align : 'left', type:'text'}
			,{display : ' 新增人 ', code : 'baseExt2', width : 100, align : 'left', type:'text'}
			,{display : ' 审批时间 ', code : 'createTime', width : 100, align : 'left', type:'date',format: 'yyyy-MM-dd HH:mm:ss'}
		   ],
			url : "${basePath}dojbpm/jbpmBizOption/jbpmBizOptionList?bizTabId=<%=request.getParameter("bizTabId")%>&bizInfId=<%=request.getParameter("bizInfId")%>&bizType=<%=request.getParameter("bizType")%>",
			toolbar:"tableToolbar",
			pageSize : 10,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
	
	//页面加载完后 
	$(document).ready(function(){
		initFn();
		//设置意见轨迹列表 展示 
		setTimeout(function(){
			var main = $(window.parent.document).find("#bizOptionIframeId");
			var thisheight = $(document).height()+35;
			main.height(thisheight);
		}, 1000);
		
	});
</script> 

