<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
   <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
<title>任务委托列表</title>

  <!-- 引入 工作流 第三方 dialog js -->
<script type="text/javascript" src="<%=basePath%>component/jbpm/dialog/lhgdialog.js?skin=iblue"></script> 
</head>
<body> 
  <!-- 列表按钮操作 start -->
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		<shiro:hasPermission name="jbpm/consign/toConsignList:personadd">
		  	<a href="javascript:void(0)" onclick="addPojo(0)" index="0">新增个人委托</a>
		</shiro:hasPermission>  	
		  	<shiro:hasPermission name="jbpm/consign/toConsignList:add">
		  	<a href="javascript:void(0)" onclick="addPojo(1)" index="0">新增代理委托</a>
		  	</shiro:hasPermission>
		 <shiro:hasPermission name="jbpm/consign/toConsignList:deleteData"> 	
		  	<a href="javascript:void(0)" onclick="deleteData()" index="0">取消委托</a>
		 </shiro:hasPermission> 	
	 </div>
	 


<div id="content"></div>


<script>
var dialogAddObj;
var dialogUpdateObj;
var iframe;
var consignToOtherNum;
var repeatConsignNum;


/*
*新增页面的 保存操作
*/
function addFrom(){
	var obj = dialogAddObj.getIframe();
	if(!obj.checkMyDataForm()){
		return ;
	}
	var params = obj.saveMyData();
	var url="${basePath}consign/addOrUpdateConsign";
	jyAjax(
		url,
		params,
		function(result){
			alert(result.msg);
			var v_status = result.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();//先关闭弹出层
        		queryData();
        	}
	});
}
/*
 * 新增数据
 */
function addPojo(type){
	var url = "";
	if("0"==type){
		url = "${basePath}consign/toAddConsign";
	}else if("1"==type){
		url = "${basePath}consign/toAddAgencyConsign";
	}
	var dialogStruct={
		"display":url,
		"width":850,
		"height":500,
		"title":"新增",
		"buttons":[{"text":"保存","action":addFrom,"isClose":false},
	            	{"text":"关闭","isClose":true}]
	};
	//var ifTabObj = parent.tabs.getTabWinByTitle("客户复议");
	//ifTabObj.queryData();
	//alert(ifTabObj);
	dialogAddObj=jyDialog(dialogStruct).open();
}

/*
 * 删除 数据
 */
function deleteData(obj){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待取消的数据！");
		return;
	}
	
	var params={id:v_ids};
	var url="${basePath}consign/delById";
	jyAjax(
		url,
		params,
		function(result){
			alert(result.msg);
			queryData();
	});
}

function queryData(){
	iframe.iframeObj["table"].query();
}
function resetData(){
	iframe.iframeObj["form"].reset();
}
/*
 * 页面 初始化加载的数据信息
 */
window.onload=function(){
	var formStructure={
		columns : [
            {display : '是否管理员', code : 'isAdmin', width : 200,  type:'hidden',value:'${param.isAdmin}'},
			{display : '委托人ID', code : 'fromUserId', width : 200,  type:'hidden',value:''},
			{display : '委托人', code : 'fromUserName', width : 200,  type:'text',value:'',clickFun:function(){selectUser('','','callFunSetFromUser');}},
			
			{display : '办理人ID', code : 'toUserId', width : 200,  type:'hidden',value:''},
			{display : '办理人', code : 'toUserName', width : 200,  type:'text',value:'',clickFun:function(){selectUser('','','callFunSetToUser');}},
			
			/* {display : '事由', code : 'reason', width : 200,  type:'text',value:''},
			{display : '委托流程', code : 'proDefKey', width : 200,  type:'text',value:''},
			{display : '备注', code : 'remark', width : 200,  type:'text'},
			{display : '创建人', code : 'createdBy', width : 200,  type:'text',value:''}, */
			{display : '委托开始时间 ', code : 'startTime', width : 200,  type:'date',onClick:"WdatePicker()"},
			{display : '委托结束时间', code : 'endTime', width : 200,  type:'date',onClick:"WdatePicker()"}
			
		],
		buttons:[
			{"text":"查询","fun":queryData,icon:"ui-icon-search"},
			{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
		]
	}
	var toolbar={
		title:"委托列表"
	}
	var tableStructure = {
			columns : [
				{display : '委托人', code : 'FROM_USER_NAME', width : 150, align : 'center', type:'text'},
				{display : '办理人', code : 'TO_USER_NAME', width : 100, align : 'center', type:'text'},
				{display : '创建人', code : 'CREATED_BY_NAME', width : 100, align : 'center', type:'text'},
				{display : '委托开始时间', code : 'START_TIME', width : 150, align : 'center',type:'text'},
				{display : '委托结束时间', code : 'END_TIME', width : 150, align : 'center',type:'text'},
				{display : '创建时间', code : 'CREATED', width : 150, align : 'center',type:'text'},
				/* {display : '最后更新人', code : 'LAST_UPD_BY', width : 100, align : 'center',type:'text'},
				{display : '创建人', code : 'CREATED_BY', width : 100, align : 'center', type:'text'},
				{display : '最后更新时间', code : 'LAST_UPD', width : 150, align : 'center',type:'text'}, 
				{display : '委托流程', code : 'PRO_DEF_KEY', width : 150, align : 'center'},*/
				{display : '事由', code : 'REASON', width : 100, align : 'left',type:'text'},
				{display : '备注', code : 'REMARK', width : 100, align : 'left',type:'text'}
		   ],
			url : "${basePath}consign/findAllConsign",
			toolbar:'tableToolbar',
			pageSize : 10,
			selectType : 'radio',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			primaryKey:"ID",
			trHeight : 30
		};
		
	var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
	iframe=$("#content").newSearchIframe(searchIframe);
	iframe.show();	
}

/*
 * 选择人员
 */
function selectUser(v_disId,v_hiddenId,v_callFun){
	/* var v_url = contextRootPath+'/component/dialogsys/sysUserSelect.jsp?check=true&dispalyNameId='+v_disId+'&hiddenInputId='+v_hiddenId;
	v_url = v_url+'&callFun='+v_callFun+'&tabTitle=任务委托';
	$.dialog({
		id:	'selectUserDialogId',
	    lock: true,
	    width:700,
	    height:680,
	    title:'选择人',
	    content: 'url:'+ v_url
		});
	 */
	var _titleObj = window.parent.tabs.getActiveObj();
	var _title = _titleObj.title;
	var v_url = contextRootPath+'/component/dialoguser/selectSysUser.jsp?a=a&check=true&showLowerUser=false&orgId=${curUser.orgId}';
	v_url = v_url+'&callFun='+v_callFun+'&tabTitle='+encodeURI(_title);
	
	$.dialog({
		id:	'selectUserDialogId',
	    lock: true,
	    width:420,
	    height:680,
	    title:'选择人',
	    content: 'url:'+ v_url
		}); 
}
/*
 * 回调设置 委托人
 */
/* function callFunSetFromUser(objs){
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
	$("[name='fromUserName']").val(v_names);
	$("[name='fromUserId']").val(v_ids);
	
} */
function callFunSetFromUser(v_ids,v_names){
	$("[name='fromUserName']").val(v_names);
	$("[name='fromUserId']").val(v_ids);	
}
/*
 * 回调设置 处理人
 */
/* function callFunSetToUser(objs){
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
	$("[name='toUserName']").val(v_names);
	$("[name='toUserId']").val(v_ids);
} */ 
function callFunSetToUser(v_ids,v_names){
	$("[name='toUserName']").val(v_names);
	$("[name='toUserId']").val(v_ids);
}
/*
 * 提供sysUserSelect.jsp  addConsign.jsp 选人回调使用
 */
function setCallFunToUser(v_ids,v_names){
	//通过 弹出层的dialog 获取 iframe 对象后再调用其对应的方法
	dialogAddObj.getIframe().setCallFunToUser(v_ids,v_names);
}
/*
 * 提供sysUserSelect.jsp  addConsign.jsp 选人回调使用
 */
function setCallFunFromUser(v_ids,v_names){
	//通过 弹出层的dialog 获取 iframe 对象后再调用其对应的方法
	dialogAddObj.getIframe().setCallFunFromUser(v_ids,v_names);
}
</script>

</body>
</html>
