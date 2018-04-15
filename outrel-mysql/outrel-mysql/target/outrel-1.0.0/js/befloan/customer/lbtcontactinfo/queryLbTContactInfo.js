//utf-8
//点击新增按钮 事件跳转至 新增页面
var contactDialogAddObj;
var contactDialogUpdateObj;
function toAddContactData(intoCustRefId){
	return function() {
		var dialogStruct={
				'display':contextRootPath+'/lbTContactInfo/prepareExecute/toAdd?intoCustRefId='+intoCustRefId+"&marryStatus="+$("#dtomarrStatus  option:selected").val(),
				'width':1000,
				'height':350,
				'isIframe':'false',
				'title':'联系人-新增',
				'buttons':[
		         {'text':'确定','action':doAddContactByMode},
				 {'text':'关闭','isClose':true}
				]
			};
			
		contactDialogAddObj=jyDialog(dialogStruct);
		contactDialogAddObj.open();
	}
}

function doAddContactByMode(){
	var formName="contactAddFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	
	var operateMode=$("#operateMode").val();
	
	if(operateMode=="intimeAdd") {
		//序列化 新增页面的form表单数据
		var params=$("#contactAddFormData").serialize();
		var url=contextRootPath+'/lbTContactInfo/insertLbTContactInfo';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		var pojo=formToJson(formName);
	        		//家庭详细地址
	        		pojo["conHomeAddr"]=getFullAreaText("conHomeAreacode")+pojo["conHomeDetailAddr"];
	        		//工作详细地址
	        		pojo["conJobAddr"]=getFullAreaText("conJobAreacode")+pojo["conJobDetailAddr"];
	        		linkPersonTable.addPojo(pojo);
	        		contactDialogAddObj.close();
	        	}else{
	        		jyDialog().alert("联系人保存失败,请重新保存!","警告:");
	        	}
	  	});
	}else{
		var pojo=formToJson(formName);
		//家庭详细地址
		pojo["conHomeAddr"]=getFullAreaText("conHomeAreacode")+pojo["conHomeDetailAddr"];
		//工作详细地址
		pojo["conJobAddr"]=getFullAreaText("conJobAreacode")+pojo["conJobDetailAddr"];
		linkPersonTable.addPojo(pojo);
		contactDialogAddObj.close();
	}
}

//新增页面的保存操作
function doAddContactFromToTable(){
	var formName="contactAddFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	
	var pojo=formToJson(formName);

	//家庭详细地址
	pojo["conHomeAddr"]=getFullAreaText("conHomeAreacode")+pojo["conHomeDetailAddr"];
	//工作详细地址
	pojo["conJobAddr"]=getFullAreaText("conJobAreacode")+pojo["conJobDetailAddr"];
	linkPersonTable.addPojo(pojo);
	contactDialogAddObj.close();
}

function getSelectedAreaText(selectedId) {
	var areaText="";
	if($("#"+selectedId+" option:selected").val() != "") {
		areaText=$("#"+selectedId+" option:selected").text();
	}
	
	return areaText;
}

function getFullAreaText(id) {
	return getSelectedAreaText("p"+id)+getSelectedAreaText("c"+id)+getSelectedAreaText("dto"+id);
}

//新增页面的保存操作
function doAddContactFrom(){
	var obj = contactDialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#contactAddFormData").serialize();
	var url=contextRootPath+'/lbTContactInfo/insertLbTContactInfo';
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
function toUpdateContactData(){
	var v_ids = linkPersonTable.getSelectedIds().join(",");
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

	var obj = linkPersonTable.getSelectedObjs()[0];
	var jsonStr = linkPersonTable.dataToJsonStr(obj,"editObj");
	jsonStr=encodeURIComponent(jsonStr);
	var dialogStruct={
			'display':contextRootPath+'/lbTContactInfo/toUpdateByPageData?jsonStr='+jsonStr+"&marryStatus="+$("#dtomarrStatus").val(),
			'width':1000,
			'height':350,
			'isIframe':'false',
			'title':'联系人-修改',
			'buttons':[
             {'text':'确定','action':doUpdateContactByMode},
			 {'text':'关闭','isClose':true}
			]
		};
		
	contactDialogUpdateObj = jyDialog(dialogStruct);
	contactDialogUpdateObj.open();
}

function doUpdateContactByMode() {
	var formName="contactUpdateFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	
	var operateMode=$("#operateMode").val();
	
	if(operateMode=="intimeAdd") {
		var params=$("#contactUpdateFormData").serialize();
		var url=contextRootPath+'/lbTContactInfo/updateLbTContactInfo';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		var pojo=formToJson(formName);
	        		//家庭详细地址
	        		pojo["conHomeAddr"]=getFullAreaText("conHomeAreacode")+pojo["conHomeDetailAddr"];
	        		//工作详细地址
	        		pojo["conJobAddr"]=getFullAreaText("conJobAreacode")+pojo["conJobDetailAddr"];
	        		linkPersonTable.modifyPojo(pojo);
	        		contactDialogUpdateObj.close();
	        	}else{
	        		jyDialog().alert("联系人保存失败,请重新保存!","警告:");
	        	}
	  	});
	}else {
		var pojo=formToJson(formName);
		//家庭详细地址
		pojo["conHomeAddr"]=getFullAreaText("conHomeAreacode")+pojo["conHomeDetailAddr"];
		//工作详细地址
		pojo["conJobAddr"]=getFullAreaText("conJobAreacode")+pojo["conJobDetailAddr"];
		linkPersonTable.modifyPojo(pojo);
		contactDialogUpdateObj.close();
	}
}

//新增页面的保存操作
function doUpdateContactFromToTable(){
	var formName="contactUpdateFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	var pojo=formToJson(formName);
	
	//家庭详细地址
	pojo["conHomeAddr"]=getFullAreaText("conHomeAreacode")+pojo["conHomeDetailAddr"];
	//工作详细地址
	pojo["conJobAddr"]=getFullAreaText("conJobAreacode")+pojo["conJobDetailAddr"];
	linkPersonTable.modifyPojo(pojo);
	contactDialogUpdateObj.close();
}

//修改页面 的 保存操作
function doUpdateContactFrom(){
	var obj = contactDialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#contactUpdateFormData").serialize();
	var url=contextRootPath+'/lbTContactInfo/updateLbTContactInfo';
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
function deleteContactData(){
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
            url:contextRootPath+"/lbTContactInfo/deleteLbTContactInfo?ids="+v_ids,
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
function viewContactData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTContactInfo/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//校验联系电话
function checkContactPhone(obj) {
	var phoneAreacode=$("#dtoconPhoneAreaCode").val();
	var cval=$(obj).val();
	var phoneRegx=/(^[2-9][0-9]{6,7}$)|(^[1][0-9]{10}$)/;
	if(phoneAreacode!="") {
		phoneRegx=/^[2-9][0-9]{6,7}$/;
	} 
	
	if(cval!=""&&!(phoneRegx.test(cval))) {
		return '请填写有效的固定电话(移动电话不能填写电话区号)';
	}
	
	return '';
}

function checkMarryInfo(marryStatus,selectVal) {
	if(marryStatus!='2' && selectVal.value=='2'){
		if(marryStatus=='1'){
			$("").newMsg({}).show("该客户当前未婚，无法选择配偶，请重新选择！");
		}else if(marryStatus=='3'){
			$("").newMsg({}).show("该客户当前离异，无法选择配偶，请重新选择！");
		}else{
			$("").newMsg({}).show("该客户当前丧偶，无法选择配偶，请重新选择！");
		}
		$("#dtoconRelation").val('');;
	}
}

//校验联系电话
function checkPhoneAreacode(obj) {debugger;
	var areacodeRegx=/^0[0-9]{2,3}$/;
	var linkObj=$("#dtoconPhone");
	var cval=$(obj).val();
	if(cval!="") {
		if(!(areacodeRegx.test(cval))) {
			return '校验错误';
		}
		
		var phoneRegx=/^[2-9][0-9]{6,7}$/;
		if(!(phoneRegx.test(cval))) {
			setErrorCss(linkObj,"请填写有效的固定电话(移动电话不能填写电话区号)");
		}else{
    		linkObj.removeAttr("notNull")
    		removeNullCss(linkObj);
    		removeErrorCss(linkObj);
		}
    }else{
    	var phoneRegx=/(^[2-9][0-9]{6,7}$)|(^[1][0-9]{10}$)/;
    	var conPhone=linkObj.val();
    	if(conPhone!="" && phoneRegx.test(conPhone)) {
    		linkObj.removeAttr("notNull");
    		removeNullCss(linkObj);
    		removeErrorCss(linkObj);
    	}
    }
	
	return '';
}

var conRelations=[];

function initConRelation(){
	$("#dtoconRelation option").each(function(index,element){
		conRelations.push(element)
	});
}

function changeConType(val){
	if(conRelations.length==0){
		initConRelation();
	}
	
	$("#dtoconRelation").empty();
	$.each(conRelations,function(index,option){
		$("#dtoconRelation").append(option);
	});
	$("#dtoconRelation option[value='']").attr("selected","selected");
	if(val==2){
		//紧急
		$.each(conRelations,function(index,option){
			if($(option).val()==1){
				$(option).remove();
			}
		});
	}else if(val==3){
		//家庭
		$.each(conRelations,function(index,option){
			var optVal=$(option).val();
			if(optVal!=""&&"1,6,7".indexOf(optVal)>-1){
				$(option).remove();
			}
		});
	}
}

//校验家庭联系人
function checkContactType() {
	var contactType = $("#dtocontactType").val();
	
	if(contactType=="3") {
		$("#dtoconCompany").attr("notNull", "true");
		$("#pconHomeAreacode").attr("notNull", "true");
		$("#cconHomeAreacode").attr("notNull", "true");
		$("#dtoconHomeAreacode").attr("notNull", "true");
		$("#dtoconHomeDetailAddr").attr("notNull", "true");
		checkedInit();
	} else {
		$("#dtoconCompany").removeAttr("notNull");
		removeNullCss($("#dtoconCompany"));
		
		$("#pconHomeAreacode").removeAttr("notNull");
		removeNullCss($("#pconHomeAreacode"));

		$("#cconHomeAreacode").removeAttr("notNull");
		removeNullCss($("#cconHomeAreacode"));

		$("#dtoconHomeAreacode").removeAttr("notNull");
		removeNullCss($("#dtoconHomeAreacode"));

		$("#dtoconHomeDetailAddr").removeAttr("notNull");
		removeNullCss($("#dtoconHomeDetailAddr"));
	}
	
	return '';
}

function checkConName(obj) {
	var custName = $(obj).val().replace(/\s/g,'');
	$(obj).val(custName);
	var regExp=/[a-zA-Z0-9\s]/g;
	if (regExp.test(custName)) {
		return "不允许输入字母、数字和空格!";
	}

	return "";
}