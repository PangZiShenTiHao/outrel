<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询业务模型属性配置</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/drools/sysrulemodelattrconfig/querySysRuleModelAttrConfig.js"></script>
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
		  <shiro:hasPermission name="platform/drools/sysrulemodelattrconfig/querySysRuleModelAttrConfig:add">
		  	<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		  </shiro:hasPermission>
	  	 <shiro:hasPermission name="platform/drools/sysrulemodelattrconfig/querySysRuleModelAttrConfig:modify">
		  	<a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
		  </shiro:hasPermission>
		  <shiro:hasPermission name="platform/drools/sysrulemodelattrconfig/querySysRuleModelAttrConfig:delete">
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
		  </shiro:hasPermission>
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
			 {display : ' 实体类属 ', code : 'sysId', width : 200,  type:'text'}
	        ,{display : ' 序号 ', code : 'sequence', width : 200,  type:'text'}
	        ,{display : ' 前括号 ', code : 'preBrackets', width : 200,  type:'text'}
	        ,{display : ' 条件属性 ', code : 'conditionAttrEn', width : 200,  type:'text'}
	        ,{display : ' 条件属性 ', code : 'conditionAttrCh', width : 200,  type:'text'}
	        ,{display : ' 运算符： ', code : 'operator', width : 200,  type:'text'}
	        ,{display : ' 后括号 ', code : 'afterBrackets', width : 200,  type:'text'}
	        ,{display : ' 手工设置 ', code : 'manualConfig', width : 200,  type:'text'}
	        ,{display : ' 编译结果 ', code : 'compilationResult', width : 200,  type:'text'}
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
			 {display : ' 实体类属性_主 ', code : 'sysId', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.sysId+"</a>";
				    }	 
			 }
			,{display : ' 序号 ', code : 'sequence', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 前括号 ', code : 'preBrackets', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 条件属性 ', code : 'conditionAttrEn', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 条件属性中文 ', code : 'conditionAttrCh', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 运算符：加 减 ', code : 'operator', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 后括号 ', code : 'afterBrackets', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 手工设置 ', code : 'manualConfig', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 编译结果 ', code : 'compilationResult', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}sysRuleModelAttrConfig/queryListSysRuleModelAttrConfig",
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
