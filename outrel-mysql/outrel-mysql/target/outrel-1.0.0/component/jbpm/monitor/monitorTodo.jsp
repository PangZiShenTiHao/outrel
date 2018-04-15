<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="syscolumn" uri="/syscolumn" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
  <%@ include file="/common/StaticJavascript.jsp"  %>
   <title>流程管理</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="${basePath1}component/jbpm/dialog/lhgdialog.js?skin=iblue"></script>
	<script src="${basePath1}js/plat/JBPM.biz.js"></script>
	<script src="${basePath1}component/jbpm/monitor/js/monitorPro.js"></script>
</head>

<body style="background-color:#FFFFFF">
<sysuser:search var="curUser" />
<!-- 列表按钮操作 start -->
	<div id="userTableToolbar" class="tableToolbar" style="display:none;">
			<a href="javascript:void(0)" onclick="backTask()" index="0">回退任务</a>
		  	<a href="javascript:void(0)" onclick="batchUpdateAssignee()" index="1">批量换人</a>
		  	<a href="javascript:void(0)" onclick="batchHandUp()" index="2">批量挂起</a>
		  	<a href="javascript:void(0)" onclick="batchRecovery()" index="3">批量恢复</a>
		  	<!-- <a href="javascript:void(0)" onclick="fastDoTask()" index="4">任务特送</a> -->
		  	<!-- <a href="javascript:void(0)" onclick="executeTask()" index="5">执行任务</a> -->
		  	<a href="javascript:void(0)" onclick="execptionStop()" index="5">异常终止流程</a>
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
	        ,{display : '业务类型', code : 'bizType', width : 200,  type:'select',value:<syscode:dictionary codeType="WORKFLOW_BIZ_TYPE" type="json" />}
	        ,{display : '姓名ID', code : 'processParticipationName', width : 200,  type:'hidden'}
	        ,{display : '姓名 ', code : 'processParticipationNameDis', width : 200,  type:'text',value:'',clickFun:function(){selectUser('${curUser.orgId}');}}
			,{display : '任务名称', code : 'busInfoName', width : 260, align : 'left', type:'text'}
	        ,{display : '节点名称', code : 'acitityName', width : 200,  type:'text'}
	        <c:if test="${!fn:contains(monitorHiddenColumn,'#CUR_EXE_ID#') }">
	        ,{display : '流程实例', code : 'processInsId', width : 200,  type:'text'}
	        </c:if>
	        ,{display : '到达时间', code : 'time', width : 100, align : 'left',type: 'dbDate',isCompare:true}
	        ,{display : '开始', code : 'startTime', width : 200,  type:'hidden'}
	        ,{display : '结束', code : 'endTime', width : 200,  type:'hidden'}
	        ,{display : '是否是管理监控', code : 'isMonitor', width : 200,  type:'hidden',value:'1'}
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
				{display : '任务名称', code : 'BIZ_INF_NAME', width : 260, align : 'left', type:'fun',
					value:function (obj){
						var v_aInfo = "<a href='javascript:void(0)' onclick='viewHistBizInfo(\""+obj.TASKID+"\",\""+obj.BIZ_TYPE
						+"\",\""+obj.CUR_EXE_ID+"\",\""+obj.CUR_ACT_NAME+"\",\""+obj.BIZ_INF_ID+"\",\""+obj.BIZ_TAB_NAME+"\",\""+obj.BIZ_TAB_ID+"\",\""+obj.BIZ_TYPE+"\")'>";
						//alert(obj.BIZ_TASK_TYPE);//obj.TASK_STATE
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
						/* 	系统管理-监控流程添加重复进件标识
						v_aInfo = v_aInfo + _font+ obj.BIZ_INF_NAME +'</font></a>'; */
						v_aInfo = v_aInfo + _font+ obj.BIZ_INF_NAME +'</font></a>';
						if(""!=obj.EXT2 && typeof(obj.EXT2) != "undefined"){
							v_aInfo = v_aInfo + " " +obj.EXT2 ;
						}
						if(""!=obj.EXT3 && typeof(obj.EXT3) != "undefined"){
							var mutls = "["+obj.EXT3+"]";
							v_aInfo = v_aInfo+"<a class='repeat' title='' onMouseOver='repeatView(\""+obj.BIZ_INF_NAME+"\",\""+obj.EXT3+"\")' onclick='doRepeatView(\""+obj.BIZ_INF_NAME+"\",\""+obj.EXT3+"\",\""+obj.BIZ_INF_NAME+"\")' id=\""+obj.BIZ_INF_NAME+"\" href='javascript:void(0)'>"+mutls+"</a>";
						}	
// 						$.ajax({
// 							type:"POST",
// 							url:contextRootPath+'/workfile/getRepeatList?intoId='+obj.BIZ_INF_NAME,
// 							async: false,
// 							dataType:"json",
// 							success:function(msg){
// 							 if(parseInt(msg.length)>0){
// 								 var mult;
// 								 if(""!=obj.CARD_ID_MULTIPLE && typeof(obj.CARD_ID_MULTIPLE) != "undefined"){
// 									 mult = ""; 
// 								 }else{
// 									 mult = "重"
// 								 }
// 								 v_aInfo = v_aInfo +"<a class='repeat' title='' onMouseOver='repeatView(\""+obj.BIZ_INF_NAME+"\",\""+msg.length+"\")' onclick='doRepeatView(\""+obj.BIZ_INF_NAME+"\",\""+msg.length+"\",\""+msg[0]["ID"]+"\")' id=\""+obj.BIZ_INF_NAME+"\" href='javascript:void(0)'>"+mult +"</a>";
// 							 }/*else{
// 								 v_aInfo = v_aInfo + _font+ obj.BIZ_INF_NAME +'</font></a>';
// 							 }*/
// 							}
// 						});
						
						
						return v_aInfo;
				    }
				},
				<c:if test="${!fn:contains(monitorHiddenColumn,'#BIZ_INF_NO#') }">
				{display : '业务编号', code : 'BIZ_INF_NO', width : 160, align : 'left', type:'text'},
				</c:if>
				{display : '当前归属人', code : 'CUR_OWNER_NAME', width : 100, align : 'left', type:'text', isOrder : true},
				{display : '当前节点', code : 'CUR_ACT_NAME', width : 100, align : 'left', type:'text'},
				{display : '上一环节处理人', code : 'UP_USER_NAME', width : 100, align : 'left', type:'text'},
				{display : '任务类型', code : 'BIZ_TYPE', width : 100, align : 'left', type:'select',
					value:<syscode:dictionary codeType="WORKFLOW_BIZ_TYPE" type="json"/>},
				{display : '是否锁定', code : 'LOCK_STATE', width : 60, align : 'left', type:'select',value:[{value:'1',text:'是'},{value:'0',text:'否'}]},
				/* {display : ' 紧急状态 ', code : 'TASK_STATE', width : 100, align : 'left', type:'text'}, */
				{display : ' 流程状态', code : 'PRO_INSTANCE_STATE', width : 120, align : 'center', type:'select',value:[{value:'1',text:'正常'},{value:'0',text:'挂起(暂停)'}]},
				<c:if test="${!fn:contains(monitorHiddenColumn,'#CUR_EXE_ID#') }">
				{display : '流程实例', code : 'CUR_EXE_ID', width : 200, align : 'left', type:'text'},
				</c:if>
				{display : '到达时间', code : 'START_TIME', width : 120, align : 'left', type:'text', isOrder : true},
				{display : '处理轨迹', code : 'viewPhone', width : 150, align : 'center', type:'link'
					, value:[{"text":"查看轨迹","action":viewHisData},
					         {"text":"流程图","action":showCurrentPhoto}
                            ]}
		   ],
			url : "${basePath1}workFlowProvider/findTaskInfo.do?customSQL=Y&extSort=ext1,",
			pageSize : 10,
			/* setTrStyle:function(obj){
				//alert(obj.BIZ_TASK_TYPE);//obj.TASK_STATE
				var _trcolor="" ;
				if("1" == obj.BIZ_TASK_TYPE){//如果是补件回来的待办则标黄
					_trcolor=" background-color:yellow " ;
				}
				if("1" == obj.TASK_STATE){//提醒则标蓝
					_trcolor=" background-color:#8ECBFF " ;
				}
				if("2" == obj.TASK_STATE){//超时标红
					_trcolor=" background-color:red " ;
				}
				return _trcolor;
			}, */
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
	/*   initToolbar();
	  initTableList(); */
	  initFn();
});

</script>

</html>
