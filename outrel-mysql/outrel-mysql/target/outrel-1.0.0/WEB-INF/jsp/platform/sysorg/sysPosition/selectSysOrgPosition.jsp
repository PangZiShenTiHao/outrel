<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<%@ include file="/common/StaticJspTaglib.jsp" %>
  <title>查询岗位定义表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<style type="text/css">
	<!--
	a:link {text-decoration: none;}
	a:visited {text-decoration: none;}
	a:hover { text-decoration: none;}
	a:active { text-decoration: none;}
	-->
	</style>
</head>
<body style="background-color:#FFFFFF">
	<input type="hidden" name="fillElementId" id="fillElementId" value="${param.fillElementId}">
	<!-- 页面初始化 需要的 div -->
	<div id="selectSysOrgPosition"></div>
</body>
<!-- 相关js方法 -->	
<script>
	var positionSelect = {};

	positionSelect.positioniframe = {};
	
	//选中一个岗位
	positionSelect.selectPositionData = function (id , positionName){
		var fillElementId = $("#fillElementId").val();
		$("#"+fillElementId).val(positionName);//岗位名称赋值
		$("#"+fillElementId).prev().val(id);//岗位id赋值
		dialogPositionSelect.close();
	}
	
	//定义form表单 查询 方法
	positionSelect.queryData = function(){
		positionSelect.positioniframe.iframeObj["table"].query();
	}
	//定义 form表单 重置方法
	positionSelect.resetData = function(){
		positionSelect.positioniframe.iframeObj["form"].reset();
	}
	//初始化 查询页面元素
	positionSelect.initFn = function (){
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 岗位名称 ', code : 'positionName', width : 200,  type:'text'}/*
			,{display : ' 岗位编码 ', code : 'positionCode', width : 200,  type:'text'}*/
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":positionSelect.queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":positionSelect.resetData,icon:"ui-icon-extlink"}
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
			{display : ' 操作 ', code : 'positionName', width : 30, align : 'left', type:'fun', isOrder : false,
				value:function (obj){
					return "<a href='javascript:void(0)' onclick='positionSelect.selectPositionData(\""+obj.id+"\",\""+obj.positionName+"\")'>选中</a>";
			    }		
			}
			,{display : ' 岗位名称 ', code : 'positionName', width : 120, align : 'left', type:'text', isOrder : false}
			,{display : ' 岗位编码 ', code : 'positionCode', width : 120, align : 'left', type:'text', isOrder : false}
			,{display : ' 机构名称 ', code : 'orgName', width : 120, align : 'left', type:'text', isOrder : false}
			,{display : ' 机构编码 ', code : 'orgCode', width : 120, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}sysPosition/queryListSysOrgPosition",/*?orgCode="+${param.orgCode},*/
			/*toolbar:[{"text":"确定","action":selectPositionData}selectType : 'generic',],*/
			pageSize : 10,
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		positionSelect.positioniframe=$("#selectSysOrgPosition").newSearchIframe(searchIframe);
		positionSelect.positioniframe.show();
	}
	
	//页面加载完后 
	$(document).ready(function(){
		positionSelect.initFn();
	});
</script> 
</html>
