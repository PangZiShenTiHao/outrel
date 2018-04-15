<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/app" prefix="app"%>
<%
	String path = request.getContextPath();
	String basePath = path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>用户列表</title>
<jsp:include page="/common/StaticJavascript.jsp" />
<script>
  window.onload=function(){
	function query(){
		iframe.iframeObj["table"].query();
	}
	function reset(){
		iframe.iframeObj["form"].reset();
	}
	
	var URL =contextRootPath+"/sysDict/queryTreeJSON?codeType=SYS_DAI_MA_CODE";
	
	
	var formStructure={
		columns : [
			 {display : '表名称', code : 'tableName', width : 200,  type:'text',title:'不区分大小写'}
			,{display : 'java代码包前缀', code : 'packageNamePrefix', width : 300, value:"com.jy.modules"}
			,{display : 'jsp目录前缀', code : 'jspPrefix', width : 300, value:"platform/"}
			,{display : '生成类别', code : 'acceptStore', width : 200, type:'tree',value:URL,treeWidth:'200',treeHeight:'200',treeType:'checkbox',disabledLink: "true"}
		],																	
		buttons:[
		 		{"text":"查询","fun":query,icon:"ui-icon-search"},
				{"text":"重置","fun":reset,icon:"ui-icon-extlink"},
				{"text":"生成代码","fun":function(){productCode()},icon:"ui-icon-extlink"},
		]
	}
	var toolbar={
		title:"代码生成列表"
	}
  	
	var tableStructure = {
			columns : [
				{display : '表名称', code : 'TABLE_NAME', width : 200, align : 'left', type:'text', isOrder : false},
				{display : '字段英文名称', code : 'COLUMN_NAME', width : 200, align : 'left', isOrder: false},
				{display : '字段中文名称（简称）', code : 'COLUMN_COMMENTS', width : 200, align : 'left', type:'text', isOrder : false},
				{display : '字段类型', code : 'DATA_TYPE', width : 200, align : 'center',type:'text',isOrder : false },
				{display : '类型长度', code : 'DATA_LENGTH', width : 200, align : 'left', type:'text', isOrder : false},
				{display : '不必填', code : 'NULLABLE', width : 200, align : 'center',type:'text',isOrder : false },
				{display : '表中文名称', code : 'TABLE_COMMENTS', width : 200, align : 'left', type:'text', isOrder : false},
		   ],
				url :  contextRootPath+"/generate/queryColumnsOfTable",
				pageSize : 10,
				selectType : 'radio',
				checkbox : false,
				rownumbers : true,
				pages : [ 10, 20, 30 ],
				primaryKey:"ID",
				trHeight : 30,
				form:"form"
		};
	
	var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
	iframe=$("#content").newSearchIframe(searchIframe);
	iframe.show();	
}
  
  //复制数据到 div
function copyDataToDiv(i,columName){
	var v_commentsId = "comments_"+columName;
	var v_typeId = "type_"+columName;
	var v_LengthId = "length_"+columName;
	var oldDivId = "div_param";
	if(i >0) oldDivId = oldDivId +"_"+(i-1);
	$("#"+oldDivId).find("[name=columnName]").attr("value",columName);
	$("#"+oldDivId).find("[name=columnComments]").attr("value",$("#"+v_commentsId).val());
	$("#"+oldDivId).find("[name=dataType]").attr("value",$("#"+v_typeId).val());
	$("#"+oldDivId).find("[name=dataLength]").attr("value",$("#"+v_LengthId).val());
}
  
//生成代码
function productCode(){
	//获取 所有 设置的字段属性信息 通过ajax 提交到后台
	var v_max = $("[id^=display_]").length;
	$("[id^=display_]").each(function(i){
		//先复制div 在给div 中的input 赋值
		if(v_max > i +1){
			addDiv(i);
		}
		var v_columName = $(this).attr("id").substring("display_".length,$(this).attr("id").length);
		copyDataToDiv(i,v_columName);
		
	});
  	
  	var url=contextRootPath+"/generate/generateCode";
  	
  		var params=iframe.iframeObj["form"].serialize();
  		$.ajax({
  		url: url,
  		type: 'POST',
  		data:params,
  		dataType: 'json',
  		error: function(){jyDialog({"type":"error"}).alert('error');},
  		success: function(result){
  			if(result.result&&result.result=="success"){
  				 $("").newMsg({}).show(result.message);
  				//alert(result.message);
  			}else{
  				 $("").newMsg({}).show(result.message);
  				//alert(result.message);
  			}
  		}  
  		});
  }
</script>
</head>
<body>

	<div id="content"></div>
	
	<!-- 用来存储 页面设置的字段属性信息 -->
<div id="div_param" style=" display: none">
<input name="columnName" id="columnNameId" value="" />
<input name="columnComments" id="columnCommentsId" value="" />
<input name="dataType" id="dataTypeId" value="" />
<input name="dataLength" id="dataLengthId" value="" />
</div>
</body>
</html>