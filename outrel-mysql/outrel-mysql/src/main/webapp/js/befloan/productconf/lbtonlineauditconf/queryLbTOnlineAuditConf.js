//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
function toAddData(prodId){
	var dialogStruct={
		'display':contextRootPath+'/lbTOnlineAuditConf/prepareExecute/toAdd?prodId='+prodId,
		'width':1000,
		'height':700,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj =jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	 var obj = dialogAddObj.getIframe();
	 var chk_value =[]; 
	 obj.$('input[name="fkProConfId"]:checked').each(function(){ 
	     chk_value.push($(this).next().text());
	 }); 
	 //所选产品名称赋予产品名称字段
	 obj.$("#dtofkProConfName").val(chk_value);
	 if(validateForm(["addNewsFormData"],obj)){
		var params=[];
		//筛选拒贷原因
		var refuseIds=obj.distribute();
		//序列化 新增页面的form表单数据
		params.push(obj.$("#addNewsFormData").serialize());
		params.push('refuseIds='+refuseIds);
		//---------------------单位地址操作---START----------------------
		var selectJobAddrArray=[];
		var jobAddTabDatas=obj.jobAddrTable.getAllData();
		for(var k=0;k<jobAddTabDatas.length;k++) {
			selectJobAddrArray.push(jobAddTabDatas[k]["jobCityCode"]);
		}
		var selectJobAddrStr=selectJobAddrArray.join(",");
		params.push('jobAddrStr=' + selectJobAddrStr);
		//----------------------单位地址操作----END---------------------
		var url=contextRootPath+'/lbTOnlineAuditConf/insertLbTOnlineAuditConf';
		//通过ajax保存
		jyAjax(
			url,
			params.join("&"),
			function(msg){
				//新增成功后，
				window.top.showMessage(msg.msg,1000);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		queryData();
	        		dialogAddObj.close();
	        	}
	  	});
	}
}
//修改 事件
function toUpdateData(){
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

	var dialogStruct={
			'display':contextRootPath+'/lbTOnlineAuditConf/prepareExecute/toUpdate?id='+v_ids,
			'width':1000,
			'height':700,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
	//将修改弹出的对话框同样命名为dialogAddObj,是为了兼容修改页面的	
	dialogAddObj = jyDialog(dialogStruct);
	dialogAddObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var obj = dialogAddObj.getIframe();
	var chk_value =[]; 
	obj.$('input[name="fkProConfId"]:checked').each(function(){ 
	     chk_value.push($(this).next().text());
	});
	//所选产品名称赋予产品名称字段
	obj.$("#dtofkProConfName").val(chk_value);
	if(validateForm(["updateNewsFormData"],obj)){
		var params=[];
		//筛选拒贷原因
		var refuseIds=obj.distribute();
		//序列化 新增页面的form表单数据
		params.push(obj.$("#updateNewsFormData").serialize());
		params.push('refuseIds='+refuseIds);
		//---------------------单位地址操作---START----------------------
		var selectJobAddrArray=[];
		var jobAddTabDatas=obj.jobAddrTable.getAllData();
		for(var k=0;k<jobAddTabDatas.length;k++) {
			selectJobAddrArray.push(jobAddTabDatas[k]["jobCityCode"]);
		}
		var selectJobAddrStr=selectJobAddrArray.join(",");
		params.push('jobAddrStr=' + selectJobAddrStr);
		//----------------------单位地址操作----END---------------------
		var url=contextRootPath+'/lbTOnlineAuditConf/updateLbTOnlineAuditConf?refuseIds='+refuseIds;
		//通过ajax保存
		jyAjax(
			url,
			params.join("&"),
			function(msg){
				//保存成功后，执行查询页面查询方法
				window.top.showMessage(msg.msg,1000);
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		queryData();
	        		dialogAddObj.close();
	        	}
	  	});
	}
}


//表单校验
function validateForm(forms,obj){
	var obj = dialogAddObj.getIframe();
	var checkTrueCount = 0;
	var formatErrors=[];
	for (var i = 0; i < forms.length; i++) {
		var formObj = obj.document.getElementById(forms[i]);
		//正则校验
		checkFormFormat(formObj,null,null,formatErrors);
	}
	if(formatErrors.length) {
		var checkTip=("["+$(formatErrors[0]).attr("checkchname")+"]"||"")+"校验未通过!";
		$(formatErrors[0]).focus();
		window.top.showMessage(checkTip);
		return false;
	} 
	//校验判断
	if (checkTrueCount <= 0) {
		 //序列化 新增页面的form表单数据
		 var minAuditAmount = obj.$("#dtominAuditAmount").val();//审批额度最低额(含)
		 var maxAuditAmount = obj.$("#dtomaxAuditAmount").val();//审批额度最高额(含)
		 if(minAuditAmount==''&& maxAuditAmount==''){
			 return true;  
		 }else if(minAuditAmount!=''&& maxAuditAmount!=''){
			 if(eval(minAuditAmount) >= eval(maxAuditAmount)) {
				 obj.$("#dtomaxAuditAmount").focus();
				 setNullCss(obj.$("#dtomaxAuditAmount"));
				 window.top.showMessage("审批额度最高额必须大于审批额度最底额!");
				 return false;
			 }
		 }else{
			 if(minAuditAmount==''){
				 obj.$("#dtominAuditAmount").focus();
				 setNullCss(obj.$("#dtominAuditAmount"));
			 }else if(maxAuditAmount==''){
				 obj.$("#dtomaxAuditAmount").focus();
				 setNullCss(obj.$("#dtomaxAuditAmount"));
			 }
			 window.top.showMessage("[审批额度最高额(含)][审批额度最低额(含)]录入必须2个字段均录入!");
			 return false;  
		 }
	}else{
		return false;
	}
	return true;
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
            dataType:"JSON",
            url:contextRootPath+"/lbTOnlineAuditConf/deleteLbTOnlineAuditConf?ids="+v_ids,
            success:function(msg){
            	window.top.showMessage(msg.msg,1000);
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
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTProductConf/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//选择审核人员信息
function selectUserInfo(obj,orgId){
	var v_id = obj.id;
	var _titleObj = window.parent.parent.parent.tabs.getActiveObj();
	var _title = _titleObj.title;
	//var v_url = contextRootPath+'/component/dialoguser/selectSysUser.jsp?a=a&check=true&showLowerUser=false';
	var v_url = contextRootPath+'/component/dialoguser/selectVmTreeUser.jsp?a=a&showLowerUser=false&orgType=LOAN&orgId='+orgId;
	if(v_id=="dtosaleManType"){//初审人员
	    v_url = v_url+'&check=true&callFun=setAddOnlinePerson&tabTitle='+_title;
	}else if(v_id=="dtofinalAuditPersonName"){//终审人员
	    v_url = v_url+'&check=true&callFun=setOnlineFinalPerson&tabTitle='+_title;
	}else if(v_id=="dtoonlineAuditPersonName"){//任务稽核专员
		v_url = v_url+'&check=false&callFun=setOnlineAuditPerson&tabTitle='+_title;
	}
	$.dialog({
		id:	'selectUserDialogId',
	    lock: true,
	    width:420,
	    height:680,
	    isIframe:false,
	    title:'选择审核人员信息',
	    content: 'url:'+ v_url
		}); 
}


//选择营业部信息
var dialogTree;
function selectOrgInfo(){
	var dialogStruct={
			'display':contextRootPath+'/lbTOnlineAuditConf/prepareExecute/addOrgTree',
			 width:420,
	         height:380,
			'title':'选择营业部信息',
			'isIframe':"false",
			'buttons':[
			  {'text':'保存','action':saveOrgTree,'isClose':false}
			 ,{'text':'关闭','isClose':true}
			]
	};
		
	dialogTree = jyDialog(dialogStruct);
	dialogTree.open();
}

//保存营业部信息
function saveOrgTree() {
	var v_ids = "";
	var v_names = "";
	var nodes =tree.getTree().getCheckedNodes();
	for(var i = 0 ; i< nodes.length ; i++){
		var node = nodes[i];
		var storeCode=node["CODE"];
		var storeName=node["NAME"];
		if(node.children) {
		    continue;
		}
		if(v_ids){
			v_ids +=",";
			v_names +=",";
		}
		v_names +=storeName;
		v_ids +=storeCode;
	}
	$("#dtobizDept").val(v_names);
	$("#dtobizPersonId").val(v_ids);
	dialogTree.close();
}

//额度校验
function checkMoney(obj) {
	var val = $(obj).val();
	var v_id=obj.id;
	var regExp = /^([0-9]\d*)(\.?\d{0,2})?$/;
	if ( val != "" &&(eval(val)<=0||!regExp.test(val))) {
		return "请输入大于0的金额，最多保留两位小数！";
	}
	if(v_id=="dtominAuditAmount"){//审批额度最低额
		var maxValue = $("#dtomaxAuditAmount").val();
		if(eval(val) >= eval(maxValue)) {
		    return "审批额度最底额必须小于审批额度最高额";
		}else{
			removeNullCss($(obj));
		}
	}
	if(v_id=="dtomaxAuditAmount"){//审批额度最高额
		var minValue = $("#dtominAuditAmount").val();
		if(eval(val) <= eval(minValue)) {
		    return "审批额度最高额必须大于审批额度最底额";
		}else{
			removeNullCss($(obj));
		}
	}
	return "";
}

//概率校验   仅能输入0-1之间的小数，精确值小数点后两位
function checkProbability(obj){
	var val = $(obj).val();  
	var regExp =/^([01](\.0{0,2})?|0\.[0-9]{0,2})$/;
	if (val != "" && !regExp.test(val)) {
		return "请输入0-1之间的小数，最多保留两位小数！";
	}
}

/* 客户工作单位地址筛选功能*/
function addJobAddrInfo(){
	var pJobAddrCode=$("#pJobAddrCode").val();
	var cJobAddrCode=$("#cJobAddrCode").val();
	if(cJobAddrCode==null || cJobAddrCode=="") {
		$("").newMsg({}).show("请选择要增加的单位地址!");
		return;
	}
	
	var allDatas=jobAddrTable.getAllData();
	for(var i=0;i<allDatas.length;i++) {
		if(cJobAddrCode==allDatas[i]["jobCityCode"]) {
			$("").newMsg({}).show("该单位地址已经存在,不允许重复添加!");
			return;
		}
	}
	
	var pJobAddrName=$("#pJobAddrCode option:selected").text();
	var cJobAddrName=$("#cJobAddrCode option:selected").text();
	
	var pojo={"jobProvinceCode":pJobAddrCode,"jobProvinceName":pJobAddrName,"jobCityCode":cJobAddrCode,"jobCityName":cJobAddrName};
	jobAddrTable.addPojo(pojo);
};

function removeJobAddrInfo(){
	jobAddrTable.removeSelectedRow();
}

/* 查询客户工作单位地址明细*/

function viewJobAddrDetail(ruleId){
	
	var dialogStruct={
			'display':contextRootPath+'/lbTOnlineAuditConfMap/prepareExecute/toView?ruleId='+ruleId,
			'width':520,
			'height':400,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}