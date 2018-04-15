//utf-8
//点击新增按钮 事件跳转至 新增页面
var insurpolicyDialogAddObj;
var insurpolicyDialogUpdateObj;
function toAddInsurpolicyData(intoCustRefId){
	return function(){
		var dialogStruct={
				'display':contextRootPath+'/lbtInsurancePolicyInfo/prepareExecute/toAdd?intoCustRefId='+intoCustRefId,
				'width':800,
				'height':300,
				'title':'保单信息-新增',
				'isIframe':'false',
				'buttons':[
				           {'text':'保存','action':doAddInsurpolicyFromToTable},
				           {'text':'关闭','isClose':true}
				           ]
		};
		
		insurpolicyDialogAddObj=jyDialog(dialogStruct);
		insurpolicyDialogAddObj.open();
	}
}

//新增页面的保存操作
function doAddInsurpolicyFromToTable(){
	var formName="insurpolicyFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	var pojo=formToJson(formName);
	if($("#dtoisLifelong")[0].checked){
		pojo["isLifelong"]="1";
	}else{
		pojo["isLifelong"]="";
	}
	
	insurpolicyTable.addPojo(pojo);
	insurpolicyDialogAddObj.close();
}

//新增页面的保存操作
function doAddInsurpolicyFrom(){
	var obj = insurpolicyDialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbtInsurancePolicyInfo/insertLbtInsurancePolicyInfo';
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
function toUpdateInsurpolicyData(){
	var v_ids = insurpolicyTable.getSelectedIds().join(",");
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
	
	var obj = insurpolicyTable.getSelectedObjs()[0];
	var jsonStr = insurpolicyTable.dataToJsonStr(obj,"editObj");
	jsonStr=encodeURIComponent(jsonStr);

	var dialogStruct={
			'display':contextRootPath+'/lbtInsurancePolicyInfo/toUpdateByPageData?jsonStr='+jsonStr,
			'width':800,
			'height':300,
			'title':'保单信息-修改',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateInsurpolicyFromToTable},
			 {'text':'关闭','isClose':true}
			]
		};
		
	insurpolicyDialogUpdateObj = jyDialog(dialogStruct);
	insurpolicyDialogUpdateObj.open();
}

//新增页面的保存操作
function doUpdateInsurpolicyFromToTable(){debugger;
	var formName="insurpolicyUpdateFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	var pojo=formToJson(formName);
	if($("#dtoisLifelong")[0].checked){
		pojo["isLifelong"]="1";
	}else{
		pojo["isLifelong"]="";
	}
	
	insurpolicyTable.modifyPojo(pojo);
	insurpolicyDialogUpdateObj.close();
}

//修改页面 的 保存操作
function doUpdateInsurpolicyFrom(){
	var obj = insurpolicyDialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbtInsurancePolicyInfo/updateLbtInsurancePolicyInfo';
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
function deleteInsurpolicyData(){
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
            url:contextRootPath+"/lbtInsurancePolicyInfo/deleteLbtInsurancePolicyInfo?ids="+v_ids,
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
function viewInsurpolicyData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbtInsurancePolicyInfo/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function checkinsurancePeriod(obj){
	var val = $(obj).val();
	var minV=0;
	var maxV=100;
	if (val != "" && (!regExps["money"].test(val)||(eval(val)<minV||eval(val)>maxV))) {
		return "请输入"+minV+"-"+maxV+"之间的数字,保留两位小数";
	}
	return "";
}

function checkpayPeriod(obj){
	var val = $(obj).val();
	var minV=0;
	var maxV=100;
	if (val != "" && (!regExps["money"].test(val)||(eval(val)<minV||eval(val)>maxV))) {
		return "请输入"+minV+"-"+maxV+"之间的数字,保留两位小数";
	}
	return "";
}

function checkinsurancePremium(obj){
	var val = $(obj).val();
	var minV=1;
	var maxV=1000000;
	if (val != "" && (!regExps["money"].test(val)||(eval(val)<minV||eval(val)>maxV))) {
		return "请输入"+minV+"-"+maxV+"之间的数字,保留两位小数";
	}
	return "";
}

function checkinsuranceAmount(obj){
	var val = $(obj).val();
	var minV=1;
	var maxV=10000000;
	if (val != "" && (!regExps["money"].test(val)||(eval(val)<minV||eval(val)>maxV))) {
		return "请输入"+minV+"-"+maxV+"之间的数字,保留两位小数";
	}
	return "";
}

function changeisLifelong(){
	var isLifelong=$("#dtoisLifelong")[0].checked;
	if(isLifelong){
		$("#isLifelong").val("1");
		$("#dtoinsurancePeriod").val("").removeAttr("notNull").attr("disabled", "disabled");
		removeNullCss($("#dtoinsurancePeriod"));
		removeErrorCss($("#dtoinsurancePeriod"));
	}else{
		$("#isLifelong").val("");
		$("#dtoinsurancePeriod").removeAttr("disabled").attr("notNull", "true");
		checkedInit();
	}
}