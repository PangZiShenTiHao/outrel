<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>选择参与者</title>
  </head>
  <body style="background-color:#FFFFFF">
  <!-- 列表按钮操作 start -->
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="doSelectTask('${param.myTurn}')" index="0">确认</a>
		  	<a href="javascript:void(0)" onclick="operateCancle()" index="2">关闭</a>
	 </div>
<!-- 列表按钮操作 end -->
  
  <!-- 存放选中的参与者 ID 及 用户姓名 start  -->
	  <div style="padding:3px;">
			<input type="hidden" id="selectedPartner" name="selectedPartner" value=""/>
			<input type="hidden" id="selectedPartnerRealName" name="selectedPartnerRealName" value=""/>
	  </div>
 <!-- 存放选中的参与者 ID 及 用户姓名 end  -->
	<div id="content" style="position: absolute;top:30px;left:0px;right:0px;bottom:40px;"></div>
 
<script type="text/javascript">
var iframe;
/*
 * 选task 确认 操作
 */
function doSelectTask(v_myTurn){
	var api = frameElement.api, W = api.opener, cDG;
	var v_acitityName=$(window.parent.document).find("[id='jumpName']").val();
    if(v_acitityName){
    	$("#selectTaskInfoDialogId").dialog('destroy');
    	window.parent.prepareJumpTask(v_myTurn);
	}else{
		//alert("请选择参与者!");
		jyDialog({"type":"warn"}).alert("请选择下一环节!");
		return ;
	}
  	//关闭窗口 调用弹出页面的 operateCancle方法
   operateCancle();
}
//取消选择的操作 方法 关闭弹出层
function operateCancle(){
	var api = frameElement.api, W = api.opener, cDG;
	api.close();
}


//初始化 查询页面元素
function initFn(){
	var processInsId=$(window.parent.document).find("[id='processInsId']").val(); 
	var acitityName=$(window.parent.document).find("[id='acitityName']").val(); 
	var isAll=$(window.parent.document).find("[id='isAll']").val();
	var isBack=$(window.parent.document).find("[id='isBack']").val();
	var isJump=$(window.parent.document).find("[id='isJump']").val();
	//定义工具条	
	var toolbar={
		title:"下一环节列表"
	}
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns : [
		 //{display : ' 用户编号 ', code : 'taskNo', width : 100, align : 'left', type:'text'},
		{display : ' 节点名称 ', code : 'taskName', width : 200, align : 'left', type:'text'}
		
	   ],
		url : '${basePath}workFlowProvider/queryNextTaskInfo.do?processInsId='+processInsId
		+'&myTurn=${param.myTurn}&proNextActName=${param.proNextActName}&proInsParam=${param.proInsParam}&isAll='+isAll+'&isBack='+isBack+'&isJump='+isJump+'&acitityName='+encodeURI(acitityName),
		toolbar:"tableToolbar",
		pageSize : 100,
		selectType : 'radio',
		isCheck : true,
		rownumbers : true,
		pages : [ 100, 200, 300 ],
		trHeight : 30,
		checkedFun:function(obj){
		//alert("checkedFun:"+obj.taskName);
		//$("#acitityName").val(obj.taskName);
		//$(window.parent.document).find("[id='acitityName']").val(obj.taskName);
		$(window.parent.document).find("[id='jumpName']").val(obj.taskName);
		
			//$("#selectedPartner").val(obj.parUserId);
			//$("#selectedPartnerRealName").val(obj.parRealName);
		},
		cancelCheckFun:function(obj){
			$(window.parent.document).find("[id='jumpName']").val("");
			//$("#selectedPartnerRealName").val("");
		},
		primaryKey:"taskNo"
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
});
</script>



  </body>
</html>
