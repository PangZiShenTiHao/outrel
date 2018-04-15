<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="syscolumn" uri="/syscolumn" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>我的待办任务</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath1}component/jbpm/dialog/lhgdialog.js?skin=iblue"></script>
<script type="text/javascript">
var JS_CUR_LOGIN_USER_ID = "<shiro:principal property="id"/>";
</script>

<script src="${basePath1}component/jbpm/persontask/js/personaltask.js"></script>
</head>
<body style="background-color:#FFFFFF">
	<input type="hidden" value="" id="partnerRuleJsonId"/>
<!-- 列表按钮操作 start -->
	<div id="userTableToolbar" class="tableToolbar" style="display:none;">
		<shiro:hasPermission name="component/jbpm/persontask/queryMyTodoTask:updateDataLock">
			<a href="javascript:void(0)" onclick="updateDataLock('1')" index="0">锁定任务</a>
		</shiro:hasPermission>	
		<shiro:hasPermission name="component/jbpm/persontask/queryMyTodoTask:openLock">
		  	<a href="javascript:void(0)" onclick="updateDataLock('0')" index="1">解锁任务</a>
		</shiro:hasPermission>  	
	  </div>
<!-- 列表按钮操作 end -->


	
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

</body>
<!-- 相关js方法 -->	
<script>

//执行待办任务
/**
 * v_taskId 任务ID
 * v_proInsId 流程实例ID
 * v_actNa 当前节点名称
 * v_infId 业务表主键ID
 * v_tabName 业务表名
 */
function doTask(v_taskId,v_url,v_proInsId,v_actNa,v_infId,v_tabName,v_bizTabId,_bizType,v_curOwner,v_formId){
/* 	$.dialog({
	id:	'executeTaskId',
    lock: true,
    width:850,
    height:300,
    title:'执行任务',
    content: 'url:${basePath1}'+encodeURI(v_url)
	}).max(); */
	//todo 验证 待流程实例是否是挂起 状态
	var v_lock = JBPM.common.getProInsState(v_bizTabId);
	if(!v_lock){
		alert("该待办任务的流程实例已经挂起，暂时不能处理该任务！");
		return ;
	}
	//todo 验证待办任务是否可以执行
	var v_msg = JBPM.common.getOperateTaskStateInfo(v_taskId,'<shiro:principal property="id"/>');
	if(v_msg != null && "" != v_msg){
		alert(v_msg);
		return;
	}
	v_url = '${basePath1}'+encodeURI(v_url);
	v_url = v_url +"?taskId="+encodeURI(v_taskId)+"&processInsId="+encodeURI(v_proInsId)+"&acitityName="+encodeURI(v_actNa);
	v_url = v_url +"&bizInfId="+encodeURI(v_infId)+"&bizTabName="+encodeURI(v_tabName)+"&bizTabId="+encodeURI(v_bizTabId);
	v_url = v_url +"&bizType="+encodeURI(_bizType);
	//通过ajax 来锁定数据，页面局部刷新 2014-10-31 17:33:47 chj
	dataLockImp(v_taskId,"1","N");
	
	//签收和撤销签收处理
	JBPM.common.acceptTask(v_taskId,v_formId,'1',JS_CUR_LOGIN_USER_ID,v_curOwner);	//alert("v_url:"+v_url);
	window.open(v_url,'newwindow'+v_infId);//alert(0);
}

/*
 *执行完待办任务后刷新该页面 
 */
function refreshThePage(){
	queryMyTodoData();
}
//初始化 table 列表 
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
		<c:if test="${!fn:contains(myHiddenColumn,'#PRO_REMARK#') }">
		,{display : '任务描述', code : 'remark', width : 100, align : 'left', type:'text'}
		</c:if>
		/* ,{display : '紧急状态', code : 'bizTaskType', width : 100, align : 'left', type:'text'} */
		,{display : '到达时间', code : 'time', width : 100, align : 'left',type: 'dbDate',isCompare:true}
		,{display : '到达时间开始', code : 'startTime', width : 100, align : 'left',type:'hidden'}
		,{display : '到达时间结束', code : 'endTime', width : 100, align : 'left',type:'hidden'}
	   ],
		//定义form 表单 按钮信息
		buttons:[
		 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
		,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
		]
	};
		
	//定义 table 列表信息	
	var tableStructure = {
			 columns : [
	   		 {display : ' 任务名称 ', code : 'BIZ_INF_NAME', width : 260, align : 'left', type:'fun',
	   			value:function (obj){
	   				var v_aInfo = "<a href='javascript:void(0)' onclick='doTask(\""+obj.TASKID+"\",\""+obj.PRO_ACTIVITY_FORM
					+"\",\""+obj.CUR_EXE_ID+"\",\""+obj.CUR_ACT_NAME+"\",\""+obj.BIZ_INF_ID+"\",\""+obj.BIZ_TAB_NAME+"\",\""+obj.BIZ_TAB_ID+"\",\""+obj.BIZ_TYPE+"\",\""+obj.CUR_OWNER+"\",\""+obj.FORM_ID+"\")'>";
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
				 	/* v_aInfo = v_aInfo + _font+ obj.BIZ_INF_NAME +'</font></a>';
 					我的任务添加重复件标识
  					*/
  					v_aInfo = v_aInfo + _font+ obj.BIZ_INF_NAME +'</font></a>';
  					if(flag!=true){
  						if(""!=obj.EXT2&& typeof(obj.EXT2) != "undefined"){
  	  						v_aInfo = v_aInfo + _font+ " " + obj.EXT2 ;
  	  					}
  					}
					if(""!=obj.EXT3 && typeof(obj.EXT3) != "undefined"){
						var mutls = "["+obj.EXT3;
						if(obj.EXT2.indexOf("重")>-1 && flag==true){
							mutls = '重' + mutls;
						}
						mutls = mutls +"]";
						v_aInfo = v_aInfo+"<a class='repeat' title='' onMouseOver='repeatView(\""+obj.BIZ_INF_NAME+"\",\""+obj.EXT3+"\")' onclick='doRepeatView(\""+obj.BIZ_INF_NAME+"\",\""+obj.EXT3+"\",\""+obj.BIZ_INF_NAME+"\")' id=\""+obj.BIZ_INF_NAME+"\" href='javascript:void(0)'>"+mutls+"</a>";
					}
// 					$.ajax({
// 						type:"POST",
// 						url:contextRootPath+'/workfile/getRepeatList?intoId='+obj.BIZ_INF_NAME,
// 						async: false,
// 						dataType:"json",
// 						success:function(msg){
// 						 if(parseInt(msg.length)>0){
// 							 var mult = "重";
// 							 if(""!=obj.CARD_ID_MULTIPLE && typeof(obj.CARD_ID_MULTIPLE) != "undefined"){
// 								 mult = "";
// 							 }
// 							 v_aInfo = v_aInfo +"<a class='repeat' title='' onMouseOver='repeatView(\""+obj.BIZ_INF_NAME+"\",\""+msg.length+"\")' onclick='doRepeatView(\""+obj.BIZ_INF_NAME+"\",\""+msg.length+"\",\""+msg[0]["ID"]+"\")'  id=\""+obj.BIZ_INF_NAME+"\"  href='javascript:void(0)'>"+mult+"</a>";
// 						 }/*else{
// 							 v_aInfo = v_aInfo + _font+ obj.BIZ_INF_NAME +"</font></a>";
// 						 }*/
// 						}
// 					});
					
					
				
					
	   				
	   				return v_aInfo;
	   		    }	
	   		 }
	   		<c:if test="${!fn:contains(myHiddenColumn,'#BIZ_INF_NO#') }">
	   		,{display : ' 业务编号 ', code : 'BIZ_INF_NO', width : 160, align : 'left', type:'text'}
	   		</c:if>
	   		<c:if test="${!fn:contains(myHiddenColumn,'#PRO_REMARK#') }">
	   		,{display : ' 描述 ', code : 'PRO_REMARK', width : 160, align : 'left', type:'text'}
	   		</c:if>
	   		<c:if test="${!fn:contains(myHiddenColumn,'#CUR_OWNER_NAME#') }">
	   		,{display : ' 归属人', code : 'CUR_OWNER_NAME', width : 100, align : 'left', type:'text'}
	   		</c:if>
	   		,{display : ' 当前节点 ', code : 'CUR_ACT_NAME', width : 100, align : 'left', type:'text'}
	   		,{display : ' 上一环节处理人', code : 'UP_USER_NAME', width : 100, align : 'left', type:'text'}
	   		,{display : ' 任务类型 ', code : 'BIZ_TYPE', width : 100, align : 'left', type:'select',value:<syscode:dictionary codeType="WORKFLOW_BIZ_TYPE" type="json" />}
	   		,{display : '是否锁定', code : 'LOCK_STATE', width : 60, align : 'left', type:'select',value:[{value:'1',text:'是'},{value:'0',text:'否'}], isOrder : true}
	   		/* ,{display : ' 紧急状态 ', code : 'TASK_STATE', width : 100, align : 'left', type:'text'} */
	   		,{display : ' 到达时间 ', code : 'START_TIME', width : 120, align : 'left', type:'text'}
	   		//,{display : '流程实例ID', code : 'CUR_EXE_ID', width : 60, align : 'left', type:'text', isOrder : true}
	   		,{display : ' 处理轨迹 ', code : 'dealHistory', width : 100, align : 'center', type:'link',
	   			value:[
	   	              {"text":"查看轨迹","action":viewHisData}
	   	             /* ,{"text":"流程图","action":showCurrentPhoto} */
	   	            ]
	   		}
	   	   ],
		url : "${basePath1}workFlowProvider/findTaskInfo.do?processState=PROCESS_TASK&paramUserId=<shiro:principal property="id"/>&customSQL=Y&extSort=ext1,",
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
//弹出层 关闭时会调用该方法进行 查询
function queryMyTodoData(){
	queryData();
}
var flag = false;
$(document).ready(function(){
	  //设置任务类型的宽度
	  //$("#bizType").attr("style","width: 167px");
	  
	  initFn();
	/*   var datas = iframe.table.getAllData();
	  alert(datas.length); */
	  
	  $.ajax({
			type:"POST",
			url:contextRootPath+'/workfile/getLoginRoleList',
			async: false,
			dataType:"json",
			success:function(msg){
				flag = msg.flag;
			}
		});
});	

function initHeight(){
	try{
	  var thisheight = $(document).height()+35;
	  var main = $(window.parent.document).find("#mainFrame");
	  alert(thisheight);
	  main.height(thisheight);
	  //alert("---"+$(main).parent("div").attr("id"));
	  //$(main).attr("scrolling","no");
	}catch(e){e}
}

</script> 

	 
</html>
