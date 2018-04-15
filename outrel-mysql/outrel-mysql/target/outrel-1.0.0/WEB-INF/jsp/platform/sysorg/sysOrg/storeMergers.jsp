<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html> 
<head>
  <title>门店合并</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@ include file="/common/StaticJavascript.jsp" %>
  <%--使用 参考 贷前业务规则配置 页面addBizRuleConfDetail.jsp --%>
<!-- 相关js方法 -->
<script type="text/javascript">
var iframe;

//定义form表单 查询 方法
function queryData(){
	if($("[name='oldDeptId']").val().trim()==""){
		$("[name='oldDeptId']").val("");
		$("[name='oldDeptName']").val("");
		jyDialog({"type":"warn"}).alert("原门店不能为空,请重新选择！","输入错误");
		return false;
	}
	if($("[name='newDeptId']").val().trim()==""){
		$("[name='newDeptId']").val("");
		$("[name='newDeptName']").val("");
		jyDialog({"type":"warn"}).alert("合并到门店不能为空,请重新选择！","输入错误");
		return false;
	}
	if($("[name='newDeptName']").val().indexOf("营业")==-1 || $("[name='oldDeptName']").val().indexOf("营业")==-1){
		jyDialog({"type":"question","width":"300","height":"200"}).confirm("请确认进行操作的【"+$("[name='newDeptName']").val()+"】和【"+$("[name='oldDeptName']").val()+"】是机构门店？",function(){
			doStoreMerger();
		},"请慎重进行门店合并操作");
	}else{
		doStoreMerger();
	}
	
}
function  doStoreMerger(){
	var content='请确认将【<font font-weight=\"bold\" color=\"red\">'+$("[name='oldDeptName']").val()+"</font>】全部贷款业务数据 迁移到【<font font-weight=\"bold\" color=\"red\">"+$("[name='newDeptName']").val()+"</font>】下？<br><font font-weight=\"bold\" color=\"red\">请谨慎操作！</font>";
	jyDialog({"type":"question","width":"300","height":"200"}).confirm(content,function(){
		var params=iframe.iframeObj["form"].serialize();
		var url=contextRootPath+'/storeMerger/doStoreMerger';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
				jyDialog({"type":"info"}).alert(msg.msg);
				iframe.iframeObj["table"].query();
	  	});
	},"请慎重进行门店合并操作");
}

//定义 form表单 重置方法
function resetData(){
	iframe.iframeObj["form"].reset();
	initOrgTree();   
}

//初始化 查询页面元素
function initFn (){
	//定义 form表单查询 信息
	 var formStructure={
		// 定义form表单 字段信息
		columns : [
		 {display : '原门店ID', code : 'oldDeptId', width : 200,  type:'hidden'}
		,{display : '原门店', code : 'oldDeptName', width : 200,  type:'text'}
        ,{display : '合并到门店ID', code : 'newDeptId', width : 200,  type:'hidden'}
        ,{display : '合并到门店', code : 'newDeptName', width : 200,  type:'text'}
		],
		//定义form 表单 按钮信息
		buttons:[
		  {"text":"合并","fun":queryData,icon:"ui-icon-gear"}
		 ,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"} 
		]
	}
	//定义工具条	
	var toolbar={
		title:"查询列表"  
	 };
	//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 核心返回流水号 ', code : 'CORE_TRANSNO', width : 200, align : 'left', type:'text', isOrder : false }
			,{display : ' 原门店 ', code : 'OLDORG_NAME', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 新门店 ', code : 'NEWORG_NAME', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 合同列表,多个 ', code : 'CONTRACT_LIST', width : 300, align : 'left', type:'text', isOrder : false}
			,{display : ' 核心返回信息 ', code : 'RET_MSG', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 插入时间 ', code : 'INSERT_TIME', width : 120, align : 'left', type:'text'}
			,{display : ' 操作人 ', code : 'OPT_NAME', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}storeMerger/queryListLaTDocoredatastoremer",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'radio',
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
	//组装 searchIframe 的相关参数		
	var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
	//初始化 form 表单 table 列表 及工具条 
	iframe=$("#userTableDiv").newSearchIframe(searchIframe);
	iframe.show();
}
function  initOrgTree(){
	var orgId = $("#selectOrgId").val();
	if(orgId == null || orgId =="" || orgId == 'null' )orgId="-1";
	
   	var  orgurl=contextRootPath+'/sysOrg/queryTreeSysOrg?a=a';
   	orgurl =orgurl +'&orgId=' +orgId+'&trace=down';
   	$("[name='newDeptName']").treeMenu({
   		"treeUrl":orgurl
   		,"treeType":"radio"
   		,"treeIdObj":$("[name='newDeptId']")
   		,"width":"200"
   		,"height":"300"});
   	$("[name='oldDeptName']").treeMenu({
   		"treeUrl":orgurl
   		,"treeType":"radio"
   		,"treeIdObj":$("[name='oldDeptId']")
   		,"width":"200"
   		,"height":"300"});
}
//页面加载完后 
$(document).ready(function(){
   	initFn();
   	initOrgTree();   	
});
function refQueryData(){
	iframe.iframeObj["table"].query();
}
</script>
</head>
<body style="background-color:#FFFFFF">
<input type="hidden" id="selectOrgId" value="301"/>
<!-- 页面初始化 需要的 div -->
<div id="tableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="refQueryData()" index="0">查询</a>		  
	  </div>
<div id="userTableDiv"></div>

</body>
</html>
  <%--使用 参考 贷前业务规则配置 页面addBizRuleConfDetail.jsp --%>