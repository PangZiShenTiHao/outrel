<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="syscolumn" uri="/syscolumn" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>我的已办任务</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath1}component/jbpm/dialog/lhgdialog.js?skin=iblue"></script>
<script type="text/javascript">
var JS_CUR_LOGIN_USER_ID = "<shiro:principal property="id"/>";
</script>

<script src="${basePath1}component/jbpm/persontask/js/personaltask.js"></script>
</head>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 start -->
		<div id="userTableToolbar" class="tableToolbar" style="display:none;">
			<shiro:hasPermission name="component/jbpm/persontask/queryMyTodoTask:backTask">
				<a href="javascript:void(0)" onclick="backTask()" index="4">收回任务</a>
			</shiro:hasPermission>	
	  </div>
<!-- 列表按钮操作 end -->

	
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>
	
	<!-- 存放 收回任务的相关参数start -->
	<input type="hidden" id="oldUserId" name="oldUserId" value="-1"/>
	<input type="hidden" id="turnDirection" name="turnDirection" value=""/>
	<!-- 存放 收回任务的相关参数end -->
</body>
<!-- 相关js方法 -->	
<script>

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
		,{display : '节点名称', code : 'acitityName', width : 200,  type:'text'}
		/* ,{display : '业务编号', code : 'busInfoNo', width : 160, align : 'left', type:'text'} */
		<c:if test="${!fn:contains(myHiddenColumn,'#PRO_REMARK#') }">
		,{display : '任务描述', code : 'remark', width : 100, align : 'left', type:'text'}
		</c:if>
		/* ,{display : '紧急状态', code : 'bizTaskType', width : 100, align : 'left', type:'text'} */
		,{display : '完成时间', code : 'time', width : 100, align : 'left',type: 'dbDate',isCompare:true}
		,{display : '完成时间开始', code : 'startTime', width : 100, align : 'left',type:'hidden'}
		,{display : '完成时间结束', code : 'endTime', width : 100, align : 'left',type:'hidden'}
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
					var v_aInfo = "<a href='javascript:void(0)' onclick='viewHistBizInfo(\""+obj.TASKID+"\",\""+obj.BIZ_TYPE
					+"\",\""+obj.CUR_EXE_ID+"\",\""+obj.CUR_ACT_NAME+"\",\""+obj.BIZ_INF_ID+"\",\""+obj.BIZ_TAB_NAME+"\",\""+obj.BIZ_TAB_ID+"\")'>";
					if(obj.BIZ_INF_NAME)	v_aInfo = v_aInfo + obj.BIZ_INF_NAME ;
					
					v_aInfo = v_aInfo+"</a>";
					return v_aInfo;
			    }	
			 }
			<c:if test="${!fn:contains(myHiddenColumn,'#BIZ_INF_NO#') }">
			,{display : ' 业务编号 ', code : 'BIZ_INF_NO', width : 160, align : 'left', type:'text'}
			</c:if>
			<c:if test="${!fn:contains(myHiddenColumn,'#PRO_REMARK#') }">
			,{display : ' 描述 ', code : 'PRO_REMARK', width : 160, align : 'left', type:'text'}
			</c:if>
			,{display : ' 当前节点 ', code : 'CUR_ACT_NAME', width : 100, align : 'left', type:'text'}
			/* ,{display : ' 当前归属人', code : 'CUR_OWNER_NAME', width : 100, align : 'left', type:'text'} */
			,{display : ' 任务类型 ', code : 'BIZ_TYPE', width : 100, align : 'left', type:'select',value:<syscode:dictionary codeType="WORKFLOW_BIZ_TYPE" type="json" />}
			/* ,{display : ' 紧急状态 ', code : 'TASK_STATE', width : 100, align : 'left', type:'text'} */
			,{display : ' 完成时间 ', code : 'END_TIME', width : 120, align : 'left', type:'text'}
			//,{display : '是否锁定', code : 'LOCK_STATE', width : 60, align : 'left', type:'select',value:[{value:'1',text:'是'},{value:'0',text:'否'}], isOrder : true}
			//,{display : '流程实例ID', code : 'CUR_EXE_ID', width : 60, align : 'left', type:'text', isOrder : true}
			,{display : ' 处理轨迹 ', code : 'dealHistory', width : 100, align : 'center', type:'link',
				value:[
			          {"text":"查看轨迹","action":viewHisData}
			         /* ,{"text":"流程图","action":showCurrentPhoto} */
			        ]
			}
			],
			url:"${basePath1}workFlowProvider/findTaskInfo.do?processState=COMPLETED_TASK&paramUserId=<shiro:principal property="id"/>",
		pageSize : 10,
		toolbar:"userTableToolbar",
		selectType : 'checkbox',
		isCheck : true,
		rownumbers : true,
		pages : [ 10, 20, 30 ],
		trHeight : 30,
		primaryKey:"TASKID"
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
