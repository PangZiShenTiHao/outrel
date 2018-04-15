<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询资源管理表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/sysauth/sysResource/querySysResource.js"></script>
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
			 {display : ' 名称 ', code : 'resoureName', width : 200,  type:'text'}
	        ,{display : ' 类型，m ', code : 'resoureType', width : 200,  type:'text'}
	        ,{display : ' URL地 ', code : 'resoureUrl', width : 200,  type:'text'}
	        ,{display : ' 权限标识 ', code : 'permission', width : 200,  type:'text'}
	        ,{display : ' 父ID ', code : 'parentId', width : 200,  type:'text'}
	        ,{display : ' 父ID串 ', code : 'parentIds', width : 200,  type:'text'}
	        ,{display : ' 应用ID ', code : 'appId', width : 200,  type:'text'}
	        ,{display : ' 乐观锁 ', code : 'version', width : 200,  type:'text'}
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义工具条	
		var toolbar={
			title:"资源查询列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 名称 ', code : 'resoureName', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.resoureName+"</a>";
				    }	 
			 }
			,{display : ' 类型，menu ', code : 'resoureType', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' URL地址 ', code : 'resoureUrl', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 权限标识 ', code : 'permission', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 父ID ', code : 'parentId', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 父ID串，以/ ', code : 'parentIds', width : 100, align : 'left', type:'text', isOrder : false}
			/* ,{display : ' 应用ID，备用 ', code : 'appId', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 乐观锁 ', code : 'version', width : 100, align : 'left', type:'text', isOrder : false} */
		   ],
			url : "${basePath}sysResource/queryListSysResource",
			toolbar:[{"text":"新增","action":toAddData}
					,{"text":"修改","action":toUpdateData}
					,{"text":"删除","action":deleteData}
					],
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
