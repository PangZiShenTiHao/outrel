<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/common/StaticJavascript.jsp"%>
<title>查询员工请假表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});

	//取消请假
	function cancelLeave(){
		var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
		//如果没有选中 数据则
		if(v_ids == ""){
			jyDialog({"type":"info"}).alert("请选择待数据！");
			return;
		}
		
		jyDialog({"type":"question"}).confirm("你确定要取消请假吗？",function(){
			var ids = getSelectedId();
			cancle_leave(ids);
		});
	}
	
	/**
	 * 获取选中的 行信息
	 */
	function getSelectedId(){
		var v_ids = "";
		$(".trSelected").each(function(i){
				if(v_ids != "") v_ids = v_ids + ",";
				
				v_ids = v_ids +$(this).attr("kvalue");
		});
		return v_ids;
	}
	
	/*
	 * 新增数据
	 */
	function toAddLeave(type){
		var url = "";
		if("2"==type){
			url = "${basePath}system/leaveInfo/prepareExecute/toAddLeave";
		}else if("1"==type){
			url = "${basePath}system/leaveInfo/prepareExecute/toAddAgencyLeave";
		}
		var dialogStruct={
			"display":url
			,"width":"850"
			,"height":"500"
			,title:'新增'
			,"buttons":[{"text":"保存","action":addFrom,"isClose":false},
			{"text":"关闭","isClose":true}]};
		//var ifTabObj = parent.tabs.getTabWinByTitle("客户复议");
		//ifTabObj.queryData();
		//alert(ifTabObj);
		debugger;
		dialogAddObj=jyDialog(dialogStruct);
		dialogAddObj.open();
	}
	
	/*
	*新增页面的 保存操作
	*/
	function addFrom(){
		var obj = dialogAddObj.getIframe();
		if(!obj.checkMyDataForm()){
			return ;
		}
		var params = obj.saveMyData();
		var url="${basePath}system/leaveInfo/insertLeaveInfo";
		jyAjax(
			url,
			params,
			function(result){
				debugger;
				//jyDialog({"type":"info"}).alert(result.msg);
				$("").newMsg({}).show(result.msg);
				var v_status = result.status;
	        	if(v_status.indexOf('ok') >-1){
	        		dialogAddObj.close();//先关闭弹出层
	        		queryData();
	        	}
		});
	}
	
	function setCallFunToUser(v_ids,v_names){
		//通过 弹出层的dialog 获取 iframe 对象后再调用其对应的方法
		dialogAddObj.getIframe().setCallFunToUser(v_ids,v_names);
	}
	
	//新增页面的保存操作
	function doAddFrom(v_Id){
		//序列化 新增页面的form表单数据
		var params=$("#addNewsFormData").serialize();
		var url=contextRootPath+'/leaveInfo/insertLeaveInfo';
		//通过ajax保存
		jyAjax(
				url,
				params,
				function(msg){
					//新增成功后，
					var v_status = msg.status;
					if(v_status.indexOf('ok') >-1){
						//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
						queryData();
					}
				});
	}

	function viewDataInfo(v_Id,type){
		var dialogStruct={
				'display':contextRootPath+'/system/leaveInfo/prepareExecute/toView?ids='+v_Id+"&leaveType="+type,
				'width':800,
				'height':500,
				'title':'预约请假',
				'isIframe':'false',
				'buttons':[
				           {'text':'保存','action':doAddFrom,'isClose':true},
				           {'text':'关闭','isClose':true}
				           ]
		};

		var dialogView = jyDialog(dialogStruct).open();
	}




	function cancle_leave(v_Id){
		$.ajax({
			type:"POST",
			url:contextRootPath+"/system/leaveInfo/deleteLeaveInfo?ids="+v_Id,
			success:function(msg){
				queryData();
			}
		});
	}


	function leaveDateInfo(){
		var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
		//如果没有选中 数据则
		if(v_ids == ""){
			jyDialog({"type":"info"}).alert("请选择待请假的数据！");
			return;
		}
		var dialogStruct={
				'display':contextRootPath+'/system/leaveInfo/prepareExecute/toView?ids='+v_ids+"&leaveType=1",
				'width':800,
				'height':500,
				'title':'预约请假',
				'isIframe':'false',
				'buttons':[
				           {'text':'保存','action':insertInfo,'isClose':true},
				           {'text':'关闭','isClose':true}
				           ]
		};

		var dialogView = jyDialog(dialogStruct).open();
	}


	function insertInfo(){
		//序列化 新增页面的form表单数据
		var params=$("#addNewsFormData").serialize();
		var url=contextRootPath+'/system/leaveInfo/batchInsertLeaveInfo';
		//通过ajax保存
		jyAjax(
				url,
				params,
				function(msg){
					//新增成功后，
					var v_status = msg.status;
					if(v_status.indexOf('ok') >-1){
						//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
						queryData();
					}
				});
	}
	
</script>

</head>
<body style="background-color: #FFFFFF">

    <div id="tableToolbar" class="tableToolbar" style="display: none;">
    	<shiro:hasPermission name="lbTLeaveInfo/queryLbTLeaveInfo:personadd">
    		<a href="javascript:void(0)" onclick="toAddLeave(2)" index="0">个人请假</a>
    	</shiro:hasPermission>
    	<shiro:hasPermission name="lbTLeaveInfo/queryLbTLeaveInfo:add">
    		<a href="javascript:void(0)" onclick="toAddLeave(1)" index="0">代理请假</a>
    	</shiro:hasPermission>
    	<shiro:hasPermission name="lbTLeaveInfo/queryLbTLeaveInfo:cancelLeave">
			<a href="javascript:void(0)" onclick="cancelLeave()" index="0">取消请假</a> 
		</shiro:hasPermission>
	</div>

	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

</body>
<!-- 相关js方法 -->
<script>
	var iframe;
	
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
			 {display : '是否管理员', code : 'isAdmin', width : 200,  type:'hidden',value:'${isAdmin}'}
             ,{display : ' 员工姓名 ', code : 'userName', width : 200,  type:'text'}
			/* ,{display : ' 员工职级 ', code : 'userLevel', width : 200,  type:'text'}
	        ,{display : ' 员工部门 ', code : 'orgName', width : 200,  type:'text'} */
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义工具条	
		var toolbar={
			title:"查询列表"
		}
		//定义 table 列表信息	
			var tableStructure = {
			//定义table 列表的表头信息
			columns : [			 
            {display : ' 员工姓名 ', code : 'userName', width : 100, align : 'center', type:'text'}
			,{display : ' 员工职级 ', code : 'userLevel', width : 100, align : 'center', type:'text'}
			,{display : ' 员工部门', code : 'orgName', width : 100, align : 'center', type:'text'}
			,{display : ' 请假开始时间 ', code : 'startTime', width : 100, align : 'center', type:'date',dateFormat:'yyyy-MM-dd'}
			,{display : ' 请假结束时间 ', code : 'endTime', width : 100, align : 'center', type:'date',dateFormat:'yyyy-MM-dd'}
			,{display : ' 事由 ', code : 'reason', width : 200, align : 'center', type:'text'}
			],
			url : "${basePath}system/leaveInfo/queryListLeaveInfo",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'checkbox',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
</script>
</html>
