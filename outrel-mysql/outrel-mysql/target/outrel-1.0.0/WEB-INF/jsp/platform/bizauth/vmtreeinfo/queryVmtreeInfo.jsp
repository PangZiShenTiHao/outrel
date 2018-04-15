<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询虚拟树表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/bizauth/vmtreeinfo/queryVmtreeInfo.js"></script>
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
		 <%--  <shiro:hasPermission name="platform/bizauth/vmtreeinfo/queryVmtreeInfo:add"> 
		  	<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		 </shiro:hasPermission>
	  	 <shiro:hasPermission name="platform/bizauth/vmtreeinfo/queryVmtreeInfo:modify"> --%>
		  	<a href="javascript:void(0)" onclick="toUpdateTreeData()" index="1">管理</a>
		<%--   </shiro:hasPermission>
		  <shiro:hasPermission name="platform/bizauth/vmtreeinfo/queryVmtreeInfo:delete">
		  	<a href="javascript:void(0)" onclick="deleteTreeData()" index="2">删除</a>
		  </shiro:hasPermission> --%>
		  <a href="javascript:void(0)" onclick="changePostion()" index="1">业务虚拟树快速调岗</a>
	  </div>
<!-- 列表按钮操作 end -->

	
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
			 {display : ' 虚拟树名称 ', code : 'orgName', width : 200,  type:'text'}
	        ,{display : ' 虚拟树代码 ', code : 'orgType', width : 200,  type:'text'}
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
			 {display : ' 虚拟树名称 ', code : 'orgName', width : 200, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewTreeData("+obj.orgId+",\""+obj.orgType+"\")'>"+obj.orgName+"</a>";
				    }	 
			 }
			,{display : ' 虚拟树代码', code : 'orgType', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 创建时间 ', code : 'createTime', width : 150, align : 'left', type:'date',format:'yyyy-MM-dd hh:mm:ss', isOrder : false
				}
		   ],
			url : "${basePath}vmtreeInfo/queryListVmtreeInfo",
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
