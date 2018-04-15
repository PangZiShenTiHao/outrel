<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="syscolumn" uri="/syscolumn" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>我的已结历史任务</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath1}component/jbpm/dialog/lhgdialog.js?skin=iblue"></script>
<script type="text/javascript">
var JS_CUR_LOGIN_USER_ID = "<shiro:principal property="id"/>";
</script>

<script src="${basePath1}component/jbpm/persontask/js/personaltask.js"></script>
</head>
<body style="background-color:#FFFFFF">

   <div id="content" ></div>

</body>
<!-- 相关js方法 -->	
<script>
/**
 * v_taskId 任务ID
 * v_proInsId 流程实例ID
 * v_actNa 当前节点名称
 * v_infId 业务表主键ID
 * v_tabName 业务表名
 */
function viewHistBizInfo(v_bizType,v_infId,v_tabName,v_bizTabId,v_proInsId){
/* 	$.dialog({
	id:	'executeTaskId',
    lock: true,
    width:850,
    height:300,
    title:'执行任务',
    content: 'url:${basePath1}'+encodeURI(v_url)
	}).max(); */
	//获取 业务类型对应的历史 预览 url
	var v_url = JBPM.biz.getViewBizUrl(v_bizType);
	v_url = v_url +"?bizInfId="+encodeURI(v_infId)+"&bizTabName="+encodeURI(v_tabName)+"&bizTabId="+encodeURI(v_bizTabId)+"&bizType="+encodeURI(v_bizType)+"&processInsId="+encodeURI(v_proInsId);
	window.open(v_url,'viewHistInfoWindow'+v_infId);
}
//预览流程 图
function showProPng(obj){
	var name = obj["NAME"];
	var version = obj["VERSION"];
	$.dialog({
	id:	'viewWrokflowId',
    lock: true,
    width:850,
    height:800,
    title:'流程图',
    content: 'url:${basePath1}component/jbpm/viewWorkflow.jsp?processName='+encodeURI(name)+'&processVersion='+version
	}); 
}


var iframe;
//定义form表单 查询 方法
function queryData(){
	setStartEndDate();
	iframe.iframeObj["table"].query();
}
//定义 form表单 重置方法
function resetData(){
	iframe.iframeObj["form"].reset();
}
function setStartEndDate(){
	var _staTime = $("[name='time_start']").val();
	$("[name='startTime']").val(_staTime);
	var _endTime = $("[name='time_end']").val();
	$("[name='endTime']").val(_endTime);
}
//初始化 查询页面元素
function initFn(){
	//获取 个人任务的 隐藏字段信息
	<syscolumn:column codeType="JBPM_PERSON_HIDDEN" var="myHiddenColumn" />
	//定义 form表单查询 信息
	 var formStructure={
		// 定义form表单 字段信息
		columns : [
		 {display : '任务类型', code : 'bizType', width : 100, align : 'left', type:'select',value:<syscode:dictionary codeType="WORKFLOW_BIZ_TYPE" type="json" />}
		,{display : '任务名称', code : 'busInfoName', width : 260, align : 'left', type:'text'}
		/* ,{display : '业务编号', code : 'busInfoNo', width : 160, align : 'left', type:'text'} */
		/* ,{display : '紧急状态', code : 'bizTaskType', width : 100, align : 'left', type:'text'} */
		,{display : '发起时间', code : 'time', width : 100, align : 'left',type: 'dbDate',isCompare:true}
		,{display : '发起时间开始', code : 'startTime', width : 100, align : 'left',type:'hidden'}
		,{display : '发起时间结束', code : 'endTime', width : 100, align : 'left',type:'hidden'}
	   ],
		//定义form 表单 按钮信息
		buttons:[
		 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
		,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
		]
	}
	//定义 table 列表信息	
	var tableStructure = {
			 columns : [
			 {display : ' 任务名称 ', code : 'BIZ_INF_ID', width : 260, align : 'left', type:'fun',
				value:function (obj){
					var v_aInfo = "<a href='javascript:void(0)' onclick='viewHistBizInfo(\""+obj.BIZ_TYPE
					+"\",\""+obj.BIZ_INF_ID+"\",\""+obj.BIZ_TAB_NAME+"\",\""+obj.BIZ_TAB_ID+"\",\""+obj.CUR_EXE_ID+"\")'>";
					if(obj.BIZ_INF_NAME)	v_aInfo = v_aInfo + obj.BIZ_INF_NAME ;
					
					v_aInfo = v_aInfo+"</a>";
					return v_aInfo;
			    }	
			 }
			<c:if test="${!fn:contains(myHiddenColumn,'#BIZ_INF_NO#') }">
			,{display : ' 业务编号 ', code : 'BIZ_INF_NO', width : 160, align : 'left', type:'text'}
			</c:if>
			,{display : ' 业务发起人', code : 'START_PRO_USERNAME', width : 100, align : 'left', type:'text'}
			,{display : ' 任务类型 ', code : 'BIZ_TYPE', width : 100, align : 'left', type:'select',value:<syscode:dictionary codeType="WORKFLOW_BIZ_TYPE" type="json" />}
			/* ,{display : ' 紧急状态 ', code : 'TASK_STATE', width : 100, align : 'left', type:'text'} */
			,{display : ' 发起时间 ', code : 'CREATE_TIME', width : 120, align : 'left', type:'text'}
			,{display : ' 办结时间 ', code : 'PRO_END_TIME', width : 120, align : 'left', type:'text'}
			/* ,{display : '流程实例ID', code : 'PRO_INSTANCE_ID', width : 160, align : 'left', type:'text', isOrder : true} */
			,{display : ' 流程状态', code : 'PRO_INSTANCE_STATE', width : 120, align : 'center', type:'select',value:[{value:'1',text:'正常'},{value:'0',text:'挂起(暂停)'}]}
			,{display : ' 处理轨迹 ', code : 'dealHistory', width : 100, align : 'center', type:'link',
				value:[
		              {"text":"查看轨迹","action":viewHisDataByHist}
		             /* ,{"text":"流程图","action":showProPng} */
		            ]
			}
		   ],
		url:"${basePath1}workFlowProvider/findTaskInfo.do?processState=END_HIST_TASK&paramUserId=<shiro:principal property="id"/>",
		pageSize : 10,
		toolbar:"userTableToolbar",
		selectType : 'checkbox',
		isCheck : true,
		rownumbers : true,
		pages : [ 10, 20, 30 ],
		trHeight : 30,
		primaryKey:"ID"
	};
	//组装 searchIframe 的相关参数		
	var searchIframe={"toolbar":"","form":formStructure,"table":tableStructure,"isNotQuery":true};	
	//初始化 form 表单 table 列表 及工具条 
	iframe=$("#content").newSearchIframe(searchIframe);
	iframe.show();
}

$(document).ready(function(){
	initFn();
});	
</script> 
</html>
