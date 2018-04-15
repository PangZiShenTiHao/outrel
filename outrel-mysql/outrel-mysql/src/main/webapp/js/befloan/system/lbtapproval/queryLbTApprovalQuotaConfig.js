//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/approvalQuot/prepareExecute/toAdd',
		'width':800,
		'height':400,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAdd = jyDialog(dialogStruct);
	dialogAdd.open();
}
function toAddUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		alert("请选择一条数据！");
		return;
	}
	
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var id = objs[0].id;
	var roleId = objs[0].roleId;
	var roleNames = objs[0].roleName;
	var approvalFlag = objs[0].approvalFlag;
	var refuseFlag = objs[0].refuseFlag;
	var accreditAmount = objs[0].accreditAmount;
	var operateFlowKey = objs[0].operateFlowKey;
	
	var dialogStruct={
			'display':contextRootPath+'/approvalQuot/prepareExecute/toAdd?upd=true&id=' + id + '&roleId='+roleId+"&roleNames="+roleNames+"&approvalFlag="+approvalFlag+"&refuseFlag="+refuseFlag+"&accreditAmount="+accreditAmount+"&operateFlowKey=" + operateFlowKey,
			'width':800,
			'height':400,
			'title':'修改',
			'buttons':[
			           {'text':'保存','action':doAddFrom,'isClose':false},
			           {'text':'关闭','isClose':true}
			           ]
	};
	
	dialogAdd = jyDialog(dialogStruct);
	dialogAdd.open();
}

function validate() {
	if($("#dtoproductName").val() == '') {
		alert('请输入产品名称！');
		return false;
	}
	return true;
}

//新增页面的保存操作
function doAddFrom(){
	
	//序列化 新增页面的form表单数据
	if(!validate()) 
		return;
	var obj = dialogAdd.getIframe();
	debugger;
	var expa = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
	var roleId = obj.$("#roleId").val();
	var operateName = obj.$("#operateName").val();
	var apprProductName = obj.$("#apprProductName").val();
	var accreditAmount = obj.$("#accreditAmount").val();
	var operateFlowKey = "";
	if($("#upd").val()=="true"){
		operateFlowKey = obj.$("#operateFlowKeyHid").val();
	}else{
		operateFlowKey = obj.$("#operateFlowKey").val();
	}
	
	if(roleId==""){
		alert("请输入与之匹配的角色名称！");
		return;
	}
	if(operateFlowKey==""||operateFlowKey==null){
		alert("请选择操作流程！");
		return;
	}
	if(operateName==""||operateName==null){
		alert("请选择操作人！");
		return;
	}
	if(apprProductName==""||apprProductName==null){
		alert("请选择产品名称！");
		return;
	}
	if(!expa.test(accreditAmount)){
		alert("授权额度不能为空且必须为数字类型！");
		return;
	}
	
    var paramsx = obj.$("#addNewsFormDatacfg").serialize();
	var url=contextRootPath+'/approvalQuot/insertLbTProductConf';
	//通过ajax保存
	jyAjax(
		url,
		paramsx,
		function(msg){
			//新增成功后，
			alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAdd.close();
        		queryData();
        	}
  	});
}
//修改 事件
//function toUpdateData(v_ids){
//	//如果没有选中 数据则
//	if(v_ids == ""){
//		alert("请选择待修改的数据！");
//		return;
//	}
//
//	var dialogStruct={
//			'display':contextRootPath+'/approvalQuot/prepareExecute/toUpdate?id='+v_ids,
//			'width':900,
//			'height':650,
//			'title':'修改',
//			'isIframe':"false",
//			'buttons':[
////             {'text':'保存','action':doUpdateFrom,'isClose':true},
//			 {'text':'关闭','isClose':true}
//			]
//		};
//		
//	jyDialog(dialogStruct).open();
//}

function toUpdateData(v_ids){
	if(v_ids == ""){
		alert("请选择待修改的数据！");
		return;
	}
	var title="批贷额度配置详情页";
	
	var url=contextRootPath+'/approvalQuot/prepareExecute/toUpdate?id='+v_ids+'&tabTitle='+title;
	
	var obj = {
			"title" : title,
			"url" : url
	};
	window.top.tabs.add(obj);
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/approvalQuot/updateLbTProductConf';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			alert(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/approvalQuot/deleteLbTRolAndProductConf?ids="+v_ids,
            success:function(msg){
            	debugger;
            	var msage = $.parseJSON(msg);
				jyDialog().alert(msage.msg);
            	var v_status = msage.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/approvalQuot/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function viewTreeData() {
	var dialogStruct={
			'display':contextRootPath+'/approvalQuot/prepareExecute/toTreeMainView',
			'width':1000,
			'height':820,
			'isIframe':'false',
			'title':'查看',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}