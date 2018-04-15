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
		  	<a href="javascript:void(0)" onclick="doSurePartner('${param.myTurn}')" index="0">确认</a>
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
 * 选人页面 确认 操作
 */
function doSurePartner(v_myTurn){	
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var partnerIds = "";
	var partnerNames = "";
	for(var i=0;i<objs.length;i++){
		var v_obj = objs[i];
		var partnerId = v_obj.parUserNo;
		var partnerName = v_obj.parRealName;
		if(i==0){
			if(partnerId != '') partnerIds = partnerId;
			if(partnerName != '') partnerNames = partnerName;
		}else{
			if(partnerId != '') partnerIds = partnerIds + "," + partnerId;
			if(partnerName != '') partnerNames = partnerNames + "," + partnerName;
		}
	}
	
	var v_userName=partnerNames;
	var v_userId=partnerIds;
	$(window.parent.document).find("[id='nameInfo']").val(v_userName);
	$(window.parent.document).find("[id='dtoparamUserId']").val(v_userId);
    if(v_userName){
		//如果选择了参与者 则执行待办//回传至父页面
		window.parent.subTask(v_myTurn);
	}else{
		//alert("请选择参与者!");
		jyDialog({"type":"warn"}).alert("请选择参与者!");
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
		    {display : '用户编号 ', code : 'parUserNo', width : 200,  type:'text'}
			,{display : '用户姓名 ', code : 'parRealName', width : 200,  type:'text'}
		],
		//定义form 表单 按钮信息
		buttons:[
		 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
		,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
		]
	}
	//定义工具条	
	var toolbar={
		title:"参与者列表"
	}
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns : [
		 {display : ' 用户编号 ', code : 'parUserNo', width : 100, align : 'left', type:'text'}
		,{display : ' 用户姓名 ', code : 'parRealName', width : 100, align : 'left', type:'text'}
		,{display : ' 部门名称 ', code : 'parDeptName', width : 100, align : 'left', type:'text'}
	   ],
		url : '${basePath}dojbpm/jbpmJYPartner/selectJbpmJYPartner?myTurn=${param.myTurn}&otherParams=${param.otherParams}&participantType=${param.participantType}&participantRule=${param.participantRule}'
		+'&formId=${param.formId}&partType=${param.partType}'
		+'&taskId=${param.taskId}&turnDirection=${param.turnDirection}&acitityName=${param.acitityName}&bizTabName=${param.bizTabName}&bizInfId=${param.bizInfId}&processInsId=${param.processInsId}'
		+'&bizTabId=${param.bizTabId}&proNextActName=${param.proNextActName}&proInsParam=${param.proInsParam}',
		toolbar:"tableToolbar",
		pageSize : 10,
		selectType : 'checkbox',
		isCheck : true,
		rownumbers : true,
		pages : [ 10, 20, 30 ],
		trHeight : 30,		
		primaryKey:"parUserId"
	};
	//组装 searchIframe 的相关参数		
	var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
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
