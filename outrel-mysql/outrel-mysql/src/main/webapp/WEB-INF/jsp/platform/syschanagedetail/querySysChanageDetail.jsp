<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询变更信息明细表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 start -->
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		  <shiro:hasPermission name="platform/syschanagedetail/querySysChanageDetail:add">
		  	<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		  </shiro:hasPermission>
	  	 <shiro:hasPermission name="platform/syschanagedetail/querySysChanageDetail:modify">
		  	<a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
		  </shiro:hasPermission>
		  <shiro:hasPermission name="platform/syschanagedetail/querySysChanageDetail:delete">
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
		  </shiro:hasPermission>
	  </div>
<!-- 列表按钮操作 end -->
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>
</body>
<!-- 相关js方法 -->
<script type="text/javascript" src="${basePath}js/platform/syschanagedetail/querySysChanageDetail.js?d=<%=myDate%>"></script>
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
			 {display : ' 信息变更表名称 ', code : 'bizTableName', width : 200,  type:'text'}
	        ,{display : ' 表字段名称 ', code : 'bizTableColum', width : 200,  type:'text'}
	        ,{display : ' 变更信息描述 ', code : 'changeItemName', width : 200,  type:'text'}
	        ,{display : ' 原值 ', code : 'oldValue', width : 200,  type:'text'}
	        ,{display : ' 新值 ', code : 'newValue', width : 200,  type:'text'}
	        ,{display : ' 原值描述 ', code : 'oldShowvalue', width : 200,  type:'text'}
	        ,{display : ' 新值描述 ', code : 'newShowvalue', width : 200,  type:'text'}
	        ,{display : ' 表主键ID ', code : 'fkBizId', width : 200,  type:'text'}
	        ,{display : ' 批次号/流程实例ID ', code : 'batNo', width : 200,  type:'text'}
	        ,{display : ' 变更是否生效（1：生效,0 ', code : 'state', width : 200,  type:'text'}
	        ,{display : ' 创建人 ', code : 'createBy', width : 200,  type:'text'}
	        ,{display : ' 创建时间 ', code : 'createTime', width : 200,  type:'text'}
	        ,{display : ' 数据有效性 ', code : 'valid', width : 200,  type:'text'}
	        ,{display : ' 备注 ', code : 'remark', width : 200,  type:'text'}
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
			 {display : ' 信息变更表名称 ', code : 'bizTableName', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.bizTableName+"</a>";
				    }	 
			 }
			,{display : ' 表字段名称 ', code : 'bizTableColum', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 变更信息描述 ', code : 'changeItemName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 原值 ', code : 'oldValue', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 新值 ', code : 'newValue', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 原值描述 ', code : 'oldShowvalue', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 新值描述 ', code : 'newShowvalue', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 表主键ID ', code : 'fkBizId', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 批次号/流程实例ID ', code : 'batNo', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 变更是否生效（1：生效,0 ', code : 'state', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 创建人 ', code : 'createBy', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 创建时间 ', code : 'createTime', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 数据有效性 ', code : 'valid', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 备注 ', code : 'remark', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}sysChanageDetail/queryListSysChanageDetail",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'radio',
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
