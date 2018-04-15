//utf-8
//点击新增按钮 事件跳转至 新增页面
var manageDialogAddObj;
var manageDialogUpdateObj;
function toAddManageData(intoCustRefId){
	return function(){
		var dialogStruct={
				'display':contextRootPath+'/lbTManageInfo/prepareExecute/toAdd?intoCustRefId='+intoCustRefId,
				'width':700,
				'height':300,
				'isIframe':'false',
				'title':'私营业主-新增',
				'buttons':[
		         {'text':'确定','action':doAddManageFromToTable},
				 {'text':'关闭','isClose':true}
				]
			};
			
			manageDialogAddObj=jyDialog(dialogStruct);
			manageDialogAddObj.open();
	}
}

//新增页面的保存操作
function doAddManageFromToTable(){
	var formName="manageFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	
	manageInfoTable.addPojo(formToJson(formName));
	manageDialogAddObj.close();
}

//新增页面的保存操作
function doAddManageFrom(){
	var obj = manageDialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#manageFormData").serialize();
	var url=contextRootPath+'/lbTManageInfo/insertLbTManageInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}

//修改 事件
function toUpdateManageData(){
	var v_ids = manageInfoTable.getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	
	var obj = manageInfoTable.getSelectedObjs()[0];
	var jsonStr = manageInfoTable.dataToJsonStr(obj,"editObj");
	jsonStr=encodeURIComponent(jsonStr);
	
	var dialogStruct={
			'display':contextRootPath+'/lbTManageInfo/toUpdateByPageData?jsonStr='+jsonStr,
			'width':700,
			'height':300,
			'isIframe':'false',
			'title':'私营业主-修改',
			'buttons':[
             {'text':'确定','action':doUpdateManageFromToTable},
			 {'text':'关闭','isClose':true}
			]
		};
		
	manageDialogUpdateObj = jyDialog(dialogStruct);
	manageDialogUpdateObj.open();
}

//新增页面的保存操作
function doUpdateManageFromToTable(){
	var formName="manageUpdateFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	
	manageInfoTable.modifyPojo(formToJson(formName));
	manageDialogUpdateObj.close();
}

//修改页面 的 保存操作
function doUpdateManageFrom(){
	var obj = manageDialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTManageInfo/updateLbTManageInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}
//删除 事件
function deleteManageData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/lbTManageInfo/deleteLbTManageInfo?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看明细
function viewManageData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTManageInfo/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//校验持股比例有效性
function checkShareholdRatio(obj) {
	var comType=$("#dtocomType").val();
	var dtoshareholdRatio = $(obj).val();
	var minV=20;
	var maxV=100;

	if (comType!="1"&&(!(/^(\d*(\.\d+)?)$/.test(dtoshareholdRatio)) || eval(dtoshareholdRatio) < minV || eval(dtoshareholdRatio) >= maxV)) {
		return "请输入"+minV+"-"+maxV+"(不含)之间的数字";
	}
	return '';
}

function checkComType(val){
	var linkObj=$("#dtoshareholdRatio");
	if(val=="1") {
		linkObj.val("100").attr("disabled","disabled");
		linkObj.removeAttr("notNull");
		removeNullCss(linkObj);
		removeErrorCss(linkObj);
	}else{
		linkObj.val("").removeAttr("disabled");
		linkObj.attr("notNull", "true");
		checkedInit();
	}
}