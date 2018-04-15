<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="com.jy.modules.befloan.jbpm.tool.ObtainBizRuleConfTool,com.jy.platform.api.org.UserInfo,com.jy.platform.api.org.SessionAPI,org.springframework.web.context.support.WebApplicationContextUtils,org.springframework.web.context.WebApplicationContext,org.springframework.web.context.ContextLoader,org.springframework.context.ApplicationContext" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="syscolumn" uri="/syscolumn" %>
<%@taglib prefix="sysrole" uri="/sysrole" %>
<%@ taglib uri="/sysuser" prefix="sysuser"%>
<%@ taglib uri="/WEB-INF/tlds/productConf.tld" prefix="pc"%>
<%@ taglib uri="/WEB-INF/tlds/intoAuditStateConf.tld" prefix="iastate"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
  <%@ include file="/common/StaticJavascript.jsp"  %>
   <title>门店待办监控管理</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="${basePath1}component/jbpm/dialog/lhgdialog.js?skin=iblue"></script>
	<script src="${basePath1}js/plat/JBPM.biz.js"></script>
	<script src="${basePath1}component/jbpm/bizmonitor/js/monitorPro.js"></script>
</head>
<body style="background-color:#FFFFFF">
	<sysuser:search var="curUser" />
<!-- 列表按钮操作 start -->
	<div id="userTableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="batchUpdateAssignee()" index="1">批量换人</a>
	  </div>
<!-- 列表按钮操作 end -->


	
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>
	
</body>
<script>
	var iframe;
	//定义form表单 查询 方法
	function queryData(){
		setStartEndDate();
		setProStartEndDate();
		iframe.iframeObj["table"].query();
	}
	//定义 form表单 重置方法
	function resetData(){
		iframe.iframeObj["form"].reset();
	}
	//初始化 查询页面元素
	function initFn(){
		//获取 流程监控的 隐藏字段信息
		<syscolumn:column codeType="JBPM_MONITOR_HIDDEN" var="monitorHiddenColumn" />
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 任务状态 ', code : 'processState', width : 200,  type:'select',
				 value:[{value:'PROCESS_TASK',text:'待办任务'}]}
	        <%-- ,{display : '业务类型', code : 'bizType', width : 200,  type:'select',value:<syscode:dictionary codeType="WORKFLOW_BIZ_TYPE" type="json"  />}--%>
	        ,{display : '客户姓名', code : 'custName', width : 200,  type:'text'}
	        ,{display : '姓名ID', code : 'processParticipationName', width : 200,  type:'hidden'}
	        ,{display : '任务名称', code : 'busInfoName', width : 200, align : 'left', type:'text'}
	        ,{display : '任务归属人 ', code : 'processParticipationNameDis', width : 200,  type:'text',value:'',clickFun:function(){selectUser('${curUser.orgId}');}}
	        ,{display : '节点名称', code : 'acitityName', width : 200,  type:'text'}
	        ,{display : '流程发起时间', code : 'protime', width : 100, align : 'left',type: 'dbDate',isCompare:true}
	        ,{display : '开始', code : 'proStartTime', width : 200,  type:'hidden'}
	        ,{display : '结束', code : 'proEndTime', width : 200,  type:'hidden'}
	        
	        ,{display : '任务到达时间', code : 'time', width : 100, align : 'left',type: 'dbDate',isCompare:true}
	        ,{display : '开始', code : 'startTime', width : 200,  type:'hidden'}
	        ,{display : '结束', code : 'endTime', width : 200,  type:'hidden'}
	        
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
				{display : '任务名称', code : 'BIZ_INF_NAME', width : 130, align : 'center', type:'fun',
					value:function (obj){
						var v_aInfo = "<a href='javascript:void(0)' onclick='viewCustAttachBizInfo(\""+obj.BIZ_INF_ID+"\",\""+obj.BIZ_TYPE+"\")'>";
						var _font='<font' ;
						if("1" == obj.BIZ_TASK_TYPE || "2" == obj.BIZ_TASK_TYPE  || "3" == obj.BIZ_TASK_TYPE){//如果是补件回来的待办则标黄  转信审、退回信审专员补充调查
							_font +=' color=green ' ;
						}
						if("1" == obj.TASK_STATE){//提醒则标蓝
							_font +=' color=#8ECBFF ' ;
						}
						if("2" == obj.TASK_STATE){//超时标红
							_font +=' color=red ' ;
						}
						_font +=' > ';
						v_aInfo = v_aInfo + _font+ obj.BIZ_INF_NAME +'</font></a>';
						
						v_aInfo = v_aInfo+"</a>";
						return v_aInfo;
				     }
				},
				{display : ' 任务当前状态 ', code : 'AUDITESTATE', width : 120, align : 'center', type:'select', value:<iastate:intoAuditStateTag type="json"></iastate:intoAuditStateTag>},
				{display : ' 客户姓名', code : 'CUSTNAME', width : 100, align : 'center', type:'text'},
				{display : ' 产品类型 ', code : 'APPRPRODUCTTYPE', width : 120, align : 'center', type:'select', value:<pc:productTag type="json"></pc:productTag>},
				{display : '当前归属人', code : 'CUR_OWNER_NAME', width : 100, align : 'center', type:'fun', 
					value:function (obj){
						var v_aInfo='';
						var  _objTaskOwnerId= obj.CUR_OWNER+'';
						if(_objTaskOwnerId.indexOf("10") < 0){
							//如果是历史用户则
							v_aInfo = '<font color=red>'+obj.CUR_OWNER_NAME +' 待换人</font>';
						}else{
							v_aInfo = obj.CUR_OWNER_NAME;
						}
						return v_aInfo;
				    }
				},
				{display : '当前节点', code : 'CUR_ACT_NAME', width : 100, align : 'center', type:'text'},
			/* {display : '上一环节处理人', code : 'UP_USER_NAME', width : 100, align : 'center', type:'text'}, */
				{display : '任务类型', code : 'BIZ_TYPE', width : 100, align : 'center', type:'select',
					value:<syscode:dictionary codeType="WORKFLOW_BIZ_TYPE" type="json"/>},
				{display : '是否锁定', code : 'LOCK_STATE', width : 60, align : 'center', type:'select',value:[{value:'1',text:'是'},{value:'0',text:'否'}]},
				{display : ' 流程状态', code : 'PRO_INSTANCE_STATE', width : 100, align : 'center', type:'select',value:[{value:'1',text:'正常'},{value:'0',text:'挂起(暂停)'}]},
				{display : ' 进件门店', code : 'INTOSOURCENAME', width : 100, align : 'center', type:'text'},
				{display : '流程发起时间', code : 'START_INS_TIME', width : 120, align : 'center', type:'text', isOrder : true},
				{display : '任务到达时间', code : 'START_TIME', width : 120, align : 'center', type:'text', isOrder : true},
				{display : '处理轨迹', code : 'viewPhone', width : 100, align : 'center', type:'link'
					, value:[{"text":"查看轨迹","action":viewHisData}
                            ]}
		   ],
			url : "${basePath1}dojbpm/monitorjbpmbiz/findTaskInfoByOrgId.do?customSQL=Y",
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
		var searchIframe={"toolbar":"","form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
</script> 
 <script type="text/javascript">
$(document).ready(function(){
	  initFn();
});
/*
 * 设置 回调 姓名
 */
function callFunMoniSetUser(objs){
	callFunSetUser(objs);
}

function viewCustAttachBizInfo(v_infId,bizType){
	var v_url= contextRootPath;
    if(bizType=="1001"){
		v_viewURI = '/dojbpm/jbpmReconsideration/prepareExecute/toViewCustAttach';
	}else if(bizType=="1002"){
		v_viewURI = '/dojbpm/jbpmonlineaudit/prepareExecute/toViewCustAttach';
	}else if(bizType=="1012"){
		v_viewURI = '/dojbpm/jbpmcarloanaudit/prepareExecute/toViewCustAttach';
	}else if(bizType=="1015"){
		v_viewURI = '/dojbpm/jbpmHouseLoanAudit/prepareExecute/toViewCustAttach';
	}else{
		v_viewURI = '/dojbpm/jbpmcreditaudit/prepareExecute/toViewCustAttach';
	}
	v_url += encodeURI(v_viewURI);
	v_url = v_url +"?bizInfId="+encodeURI(v_infId);
	window.open(v_url,'viewCustAttachBizInfo'+v_infId);
}
</script>

</html>
