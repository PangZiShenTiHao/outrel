<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询机构部门表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/sysorg/sysOrg/querySysOrg.js"></script>
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
			 {display : ' 机构编码 ', code : 'orgCode', width : 200,  type:'text'}
	        ,{display : ' 机构名称 ', code : 'orgName', width : 200,  type:'text'}
	        ,{display : ' 机构类型 ', code : 'orgType', width : 200,  type:'text'}
	        ,{display : ' 父机构I ', code : 'parentId', width : 200,  type:'text'}
	        ,{display : ' 父机构I ', code : 'parentIds', width : 200,  type:'text'}
	        ,{display : ' 排序 ', code : 'orderBy', width : 200,  type:'text'}
	        ,{display : ' 是否是虚 ', code : 'isVirtual', width : 200,  type:'text'}
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
			title:"查询列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 机构编码 ', code : 'orgCode', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.orgCode+"</a>";
				    }	 
			 }
			,{display : ' 机构名称 ', code : 'orgName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 机构类型：or ', code : 'orgType', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 父机构ID ', code : 'parentId', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 父机构ID串， ', code : 'parentIds', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 排序 ', code : 'orderBy', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 是否是虚拟组织 ', code : 'isVirtual', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 乐观锁 ', code : 'version', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}sysOrg/queryListSysOrg",
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
