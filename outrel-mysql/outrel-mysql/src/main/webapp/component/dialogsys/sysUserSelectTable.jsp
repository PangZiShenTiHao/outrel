<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html><head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
  <title>查询系统用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 相关js方法 -->
<script type="text/javascript">
function closeWindow(){
	var api = frameElement.api, W = api.opener;
	 //获取父页面的值
	 api.close();
}
	var sysuserSelectTable = {};
	 sysuserSelectTable.iframe = {};

	sysuserSelectTable.chooseUserData = function() {
		var objs = sysuserSelectTable.iframe.iframeObj["table"].getSelectedObjs();
    	
    	try{
    		var v_names = "";
    		var v_ids = "";
    		for(var i = 0;i < objs.length; i++){
    			if(v_ids!=""){
    				v_ids +=",";
    				v_names+=",";
    			}
    			v_names +=objs[i].userName;
    			v_ids +=objs[i].id;
    		}
    		$(window.parent.document).find("#${param.dispalyNameId}").val(v_names);
    		$(window.parent.document).find("#${param.hiddenInputId}").val(v_ids);
    		if("${param.callFun}" !=""){
    			parent.${param.callFun}(objs);//调用传递过来的 回调 函数
    		}
    	}catch(e){
    		//异常时 回调 tab 页面中的  js function
    		var iframeWid = parent.tabs.getTabWinByTitle("${param.tabTitle}");
    		iframeWid.${param.callFun}(objs);
    	}
    	//关闭弹出 层页面
    	closeWindow();
	}
	
	
	//定义form表单 查询 方法
	sysuserSelectTable.queryData = function(){
		sysuserSelectTable.iframe.iframeObj["table"].query();
	}
	
	//定义 form表单 重置方法
	sysuserSelectTable.resetData = function(){
		sysuserSelectTable.iframe.iframeObj["form"].reset();
	}
	
	//初始化 查询页面元素
	sysuserSelectTable.initFn = function(){
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 姓名 ', code : 'userName', width : 200,  type:'text'}
	        ,{display : '员工编号', code : 'userNo', width : 200,  type:'text'}
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":sysuserSelectTable.queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":sysuserSelectTable.resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义工具条	
		var toolbar={
			title:"查询列表"
		}
		
		var orgId = $("#selectOrgId").val();
		if(orgId == null || orgId =="" || orgId == 'null' )orgId="-1";
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 姓名 ', code : 'userName', width : 160, align : 'left', type:'text', isOrder : false}
			,{display : ' 员工编号 ', code : 'userNo', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}sysUser/queryListSysUser?orgId="+(orgId!=null?(""+orgId):"")+"&dispalyNameId=${param.dispalyNameId}&hiddenInputId=${param.hiddenInputId}",
			toolbar:[],
			pageSize : 10,
			selectType : ( $("#check").val()=='true'?'checkbox':'radio')  ,
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		sysuserSelectTable.iframe=$("#userTableDiv").newSearchIframe(searchIframe);
		sysuserSelectTable.iframe.show();
		
	}

	//页面加载完后 
	$(document).ready(function(){
    	sysuserSelectTable.initFn();
	});
</script>

</head>
<body>



<input type="hidden" id="selectOrgId" name="selectOrgId" value="${param.orgId}"/>


<!-- 页面初始化 需要的 div -->
<div id="userTableDiv"></div>
</body></html>