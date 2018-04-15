//utf-8
//点击新增按钮 事件跳转至 新增页面
var houseDialogAddObj;
var houseDialogUpdateObj;
function toAddHouseData(intoCustRefId){
	return function() {
		var dialogStruct={
				'display':contextRootPath+'/lbTHouseInfo/prepareExecute/toAdd?intoCustRefId='+intoCustRefId,
				'width':1000,
				'height':400,
				'isIframe':'false',
				'title':'房产-新增',
				'buttons':[
		         {'text':'确定','action':doAddHouseFromToTable},
				 {'text':'关闭','isClose':true}
				]
			};
			
		houseDialogAddObj=jyDialog(dialogStruct);
		houseDialogAddObj.open();
	}
}

//新增页面的保存操作
function doAddHouseFromToTable(){
	var formName="houseAddFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	
	var pojo=formToJson(formName);

	//家庭详细地址
	pojo["houseAddr"]=getFullAreaText("houseAddrAreacode")+pojo["houseDetailAddr"];
	houseInfoTable.addPojo(pojo);
	houseDialogAddObj.close();
}

//新增页面的保存操作
function doAddHouseFrom(){
	var obj = houseDialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTHouseInfo/insertLbTHouseInfo';
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
function toUpdateHouseData(){
	var v_ids = houseInfoTable.getSelectedIds().join(",");
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

	var obj = houseInfoTable.getSelectedObjs()[0];
	var jsonStr = houseInfoTable.dataToJsonStr(obj,"editObj");
	jsonStr=encodeURIComponent(jsonStr);

	var dialogStruct={
			'display':contextRootPath+'/lbTHouseInfo/toUpdateByPageData?jsonStr='+jsonStr,
			'width':1000,
			'height':400,
			'isIframe':'false',
			'title':'房产-修改',
			'buttons':[
             {'text':'确定','action':doUpdateHouseFromToTable},
			 {'text':'关闭','isClose':true}
			]
		};
		
	houseDialogUpdateObj = jyDialog(dialogStruct);
	houseDialogUpdateObj.open();
}

//新增页面的保存操作
function doUpdateHouseFromToTable(){
	var formName="houseUpdateFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	
	var pojo=formToJson(formName);

	//家庭详细地址
	pojo["houseAddr"]=getFullAreaText("houseAddrAreacode")+pojo["houseDetailAddr"];
	houseInfoTable.modifyPojo(pojo);
	houseDialogUpdateObj.close();
}

//修改页面 的 保存操作
function doUpdateHouseFrom(){
	var obj = houseDialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTHouseInfo/updateLbTHouseInfo';
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
function deleteHouseData(){
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
            url:contextRootPath+"/lbTHouseInfo/deleteLbTHouseInfo?ids="+v_ids,
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
function viewHouseData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTHouseInfo/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function checkHouseProRightRate(obj) {
	var houseProRightRate = $(obj).val();

	if (!(/^(\d*(\.\d+)?)$/.test(houseProRightRate)) || eval(houseProRightRate) > 100) {
		return '请输入100以内的有效数字';
	}
	return '';
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

//所有单位为元的所有金额字段, 整数位必须大于2位
function checkMoney(obj) {
	var val = $(obj).val();
	var regExp = /^([1-9]\d{2,})(\.?\d{0,2})?$/;

	if (val != "" && !regExp.test(val)) {
		return "请输入大于100的金额, 最多保留2位小数!";
	}
	return "";
}

function checkHouseType() {
	var houseType = $("#dtohouseType").val();
	var houseType1Array=["dtohouseBuildArea","dtohousePrice","phouseAddrAreacode","chouseAddrAreacode","dtohouseAddrAreacode","dtohouseDetailAddr","dtohousePurchasedYears","dtohouseProRightRate"];
	var houseType23Array=["dtohouseBuildArea","dtohousePrice","phouseAddrAreacode","chouseAddrAreacode","dtohouseAddrAreacode","dtohouseDetailAddr","dtohousePurchasedYears","dtohouseProRightRate","dtohouseLoYearLimit","dtohouseMonthlyPayment","dtohouseLoBalance"];
	if(houseType=="1") {
		houseTyperemoveNullCss(houseType23Array);
		houseTypeSetNullCss(houseType1Array);
		checkedInit();
	} else if(houseType=="2" || houseType=="3") {
		houseTyperemoveNullCss(houseType23Array);
		houseTypeSetNullCss(houseType23Array);
		checkedInit();
	} else {
		houseTyperemoveNullCss(houseType23Array);
		checkedInit();
	}
	
	return '';
}

function houseTypeSetNullCss(arr) {
	for(var i=0;i<arr.length;i++) {
		$("#"+arr[i]).attr("notNull", "true");
	}
}

function houseTyperemoveNullCss(arr) {
	for(var i=0;i<arr.length;i++) {
		var obj=$("#"+arr[i]);
		obj.removeAttr("notNull");
		removeNullCss(obj);
	}
}

function checkHouseLoYearLimit(obj){
	var val = $(obj).val();
	var minV=1;
	var maxV=99;
	var regExp = /^[1-9][0-9]{0,1}$/;
	if (val != "" && !regExp.test(val)) {
		return "请输入"+minV+"-"+maxV+"之间的整数!";
	}
	return "";
}

function checkHousePurchasedYears(obj){
	var val = $(obj).val();
	var minV=0.25;
	var maxV=99;
	//var regExp = /^[1-9][0-9]{0,1}$/;
	if (val != "" && (parseFloat(val)<parseFloat(minV) || parseFloat(val)>parseFloat(maxV))) {
		return "请输入"+minV+"-"+maxV+"之间的整数!";
	}
	return "";
}

function checkHouseBuildArea(obj){
	var val = $(obj).val();
	var minV=10;
	var maxV=5000;
	var regExp =/(^[0-9]{2,3}(\.(\d){1,2})?$)|(^[1-4][0-9]{3,3}(\.(\d){1,2})?$)/
	if (val != "" && !regExp.test(val)) {
		return "请输入大于等于"+minV+"且小于"+maxV+"的数字,<br>"+"最多保留2位小数!";
	}
	return "";
}