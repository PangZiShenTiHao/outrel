//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
var dialogRuleGroupObj;

function toAddData(sysCode){
	var dialogStruct={
		'display':contextRootPath+'/extInvokeFilterRule/prepareExecute/toAdd?sysCode='+sysCode,
		'width':1000,
		'height':800,
		'title':'新增',
		'isIframe':"false",
		'buttons':[
         {'text':'保存','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var formObj=document.getElementById('addNewsFormData');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		jyDialog({"type":"info"}).alert("请正确填写！");
		return;
	}
	var params=[];
	params.push($("#addNewsFormData").serialize());
	/**
	 * 适用产品操作
	 */
	var prodArr = [];
	var isProLimit = $(":radio[name='isProLimit']:checked").val();//是否启用产品限制 
	if(isProLimit=="1"){//"是否启用产品限制-启用"时，遍历适用产品类型
		$("#addNewsFormData input:checkbox[name='prodStr']:checked").each(function() {
			prodArr.push($(this).val());
		});
	}
	if(isProLimit=="1" && prodArr.length<1) {//"是否启用产品限制-启用"时，适用产品必须选择
		$("").newMsg({}).show("请选择适用产品");
		return;
	}
	params.push('prodTabStr=' + prodArr.join(","));
	/**
	 * 适用门店操作
	 */
	var selectArray=[];
	var tabDatas=orgTable.getAllData();
	var isStoreLimit = $(":radio[name='isStoreLimit']:checked").val();//是否启用门店限制 
	if(isStoreLimit=="1") {
		if(tabDatas.length<1){////"是否启用门店限制-启用"时，适用门店必须选择
			$("").newMsg({}).show("请选择适用门店");
			return;
		}else{
			for(var k=0;k<tabDatas.length;k++) {
				selectArray.push(tabDatas[k]["STORECODE"]);
			}
		}
	}
	params.push('orgTabStr=' + selectArray.join(","));
	/**
	 * 适用功能操作
	 */
	var funcArr = [];
	var funcDatas=funcTable.getAllData();
	if(funcDatas.length<1){////"是否启用门店限制-启用"时，适用门店必须选择
		$("").newMsg({}).show("请选择适用功能");
		return;
	}
	for(var k=0;k<funcDatas.length;k++) {
		funcArr.push(funcDatas[k]["FUNC_CODE"]);
	}
	params.push('funcTabStr=' + funcArr.join(","));
	var url=contextRootPath+'/extInvokeFilterRule/insertExtInvokeFilterRule';
	//通过ajax保存
	jyAjax(
		url,
		params.join("&"),
		function(msg){
			//新增成功后，
			var v_status = msg.status;
			$("").newMsg({}).show(msg.msg);
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();
        		queryData();
        	} else {
        		jyDialog({"type":"warn"}).alert(msg.msg);
        	}
  	});
}
//修改 事件
function toUpdateData(sysCode){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/extInvokeFilterRule/prepareExecute/toUpdate?id='+v_ids+'&sysCode='+sysCode,
			'width':1000,
			'height':800,
			'title':'修改',
			'isIframe':"false",
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var formObj=document.getElementById('updateNewsFormData');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		jyDialog({"type":"info"}).alert("请正确填写！");
		return;
	}
	var params=[];
	params.push($("#updateNewsFormData").serialize());
	/**
	 * 适用产品操作
	 */
	var prodArr = [];
	var isProLimit = $(":radio[name='isProLimit']:checked").val();//是否启用产品限制 
	if(isProLimit=="1"){//"是否启用产品限制-启用"时，遍历适用产品类型
		$("#updateNewsFormData input:checkbox[name='prodStr']:checked").each(function() {
			prodArr.push($(this).val());
		});
	}
	if(isProLimit=="1" && prodArr.length<1) {//"是否启用产品限制-启用"时，适用产品必须选择
		$("").newMsg({}).show("请选择适用产品");
		return;
	}
	params.push('prodTabStr=' + prodArr.join(","));
	/**
	 * 适用门店操作
	 */
	var tabDatas=orgTable.getAllData();
	var isStoreLimit = $(":radio[name='isStoreLimit']:checked").val();//是否启用门店限制 
	if(isStoreLimit=="1") {
		if(tabDatas.length<1){////"是否启用门店限制-启用"时，适用门店必须选择
			$("").newMsg({}).show("请选择适用门店");
			return;
		}
	}
	var url=contextRootPath+'/extInvokeFilterRule/updateExtInvokeFilterRule';
	//通过ajax保存
	jyAjax(
		url,
		params.join("&"),
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogUpdateObj.close();
        		queryData();
        	}else {
        		jyDialog({"type":"warn"}).alert(msg.msg);
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/extInvokeFilterRule/deleteExtInvokeFilterRule?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
	   },"确认提示");
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/extInvokeFilterRule/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
//----------------------------------------选择适用门店------------START----------------------------------------
var dialogTree;
function showTree(operateBtn){
	var operateInfo = [];
	if(operateBtn =="add"){
	   operateInfo = [{'text':'保存','action':saveOrg},{'text':'关闭','isClose':true}]
	}else if(operateBtn =="update"){
	   operateInfo = [{'text':'保存','action':saveOrgTree},{'text':'关闭','isClose':true}]
	}
	var dialogStruct={
			'display':contextRootPath+'/extInvokeFilterRule/prepareExecute/addOrgTree',
			'width':600,
			'height':600,
			'title':'选择机构',
			'isIframe':"false",
			'buttons': operateInfo
	};
		
	dialogTree = jyDialog(dialogStruct);
	dialogTree.open();
}

function saveOrgTree(){
	saveOrg();
	saveExtInvokeRuleOrgMap();
}


function saveOrg() {
	var orgs=[];
	var nodes =tree.getTree().getCheckedNodes();
	for(var i=0;i<nodes.length;i++) {
		var node=nodes[i];

		if(node.children) {
			continue;
		}
		var storeCode=node["CODE"];
		var storeName=node["NAME"];
		var subsectionCode="";
		var subsectionName="";
		var branchCode="";
		var branchName="";
		
		var pnode=node.getParentNode();
		if(pnode) {
			subsectionCode=pnode["CODE"];
			subsectionName=pnode["NAME"];
			var ppnode=pnode.getParentNode();
			if(ppnode) {
				branchCode=ppnode["CODE"];
				branchName=ppnode["NAME"];
			}
		}
		
		orgs.push({
			"BRANCHCODE":branchCode,
			"BRANCHNAME":branchName,
			"SUBSECTIONCODE":subsectionCode,
			"SUBSECTIONNAME":subsectionName,
			"STORECODE":storeCode,
			"STORENAME":storeName});
	}
	
	orgTable.datas=orgs;
	orgTable.flush();
	dialogTree.close();
}

function saveExtInvokeRuleOrgMap(){
	//保存适用功能类型
	var params = [];
	var orgArr = [];
	var orgDatas=orgTable.getAllData();
	if(orgDatas.length<1){
		$("").newMsg({}).show("请选择适用门店");
		return;
	}
	for(var k=0;k<orgDatas.length;k++) {
		orgArr.push(orgDatas[k]["STORECODE"]);
	}
	params.push('ruleId=' + $("#dtoid").val());
	params.push('orgTabStr=' + orgArr.join(","));
	var url=contextRootPath+'/extInvokeFilterRuleMap/saveExtInvokeRuleMap?mapType=org';
	//通过ajax保存
	jyAjax(
		url,
		params.join("&"),
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		orgTable.query();
        	}
  	});	
}
//----------------------------------------选择适用门店------------END----------------------------------------



//----------------------------------------选择适用功能------------START----------------------------------------
var dialogFuncTree;
function showFuncTree(operateBtn,sysCode){
	var operateInfo = [];
	if(operateBtn =="add"){
	   operateInfo = [{'text':'保存','action':saveFunc},{'text':'关闭','isClose':true}]
	}else if(operateBtn =="update"){
	   operateInfo = [{'text':'保存','action':saveFuncTree},{'text':'关闭','isClose':true}]
	}
	var dialogStruct={
			'display':contextRootPath+'/extInvokeFilterRule/prepareExecute/addFuncTree?sysCode='+sysCode,
			'width':600,
			'height':600,
			'title':'选择功能',
			'isIframe':"false",
			'buttons': operateInfo
	};
		
	dialogFuncTree = jyDialog(dialogStruct);
	dialogFuncTree.open();
}

//功能选择页面的保存操作
function saveFuncTree(){
	saveFunc();
	saveExtInvokeRuleFunMap();
}

function saveFunc() {
	var funcs=[];
	var nodes =tree.getTree().getCheckedNodes();
	for(var i=0;i<nodes.length;i++) {
		var node=nodes[i];
		if(node.children) {
			continue;
		}
		var funcCode=node["CODE"];
		var funcName=node["NAME"];
		var subfuncCode="";
		var subfuncName="";
		var funcModuleCode="";
		var funcModuleName="";
		
		var pnode=node.getParentNode();
		if(pnode) {
			subfuncCode=pnode["CODE"];
			subfuncName=pnode["NAME"];
			var ppnode=pnode.getParentNode();
			if(ppnode) {
				funcModuleCode=ppnode["CODE"];
				funcModuleName=ppnode["NAME"];
			}
		}
		funcs.push({
			"FUNC_MODULE_CODE":funcModuleCode,
			"FUNC_MODULE_NAME":funcModuleName,
			"FUNC_TYPE_CODE":subfuncCode,
			"FUNC_TYPE_NAME":subfuncName,
			"FUNC_CODE":funcCode,
			"FUNC_NAME":funcName});
	}
	
	funcTable.datas=funcs;
	funcTable.flush();
	dialogFuncTree.close();
}

function saveExtInvokeRuleFunMap(){
	//保存适用功能类型
	var params = [];
	var funcArr = [];
	var funcDatas=funcTable.getAllData();
	if(funcDatas.length<1){
		$("").newMsg({}).show("请选择适用功能");
		return;
	}
	for(var k=0;k<funcDatas.length;k++) {
		funcArr.push(funcDatas[k]["FUNC_CODE"]);
	}
	params.push('ruleId=' + $("#dtoid").val());
	params.push('funcTabStr=' + funcArr.join(","));
	var url=contextRootPath+'/extInvokeFilterRuleMap/saveExtInvokeRuleMap?mapType=func';
	//通过ajax保存
	jyAjax(
		url,
		params.join("&"),
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		funcTable.query();
        	}
  	});	
}
//----------------------------------------选择适用功能------------END-----------------------------------------------


/**
 *  删除"适用功能"
 */
function deleteFuncRow(){
	var  v_ids = funcTable.getSelectedObjs("MAP_ID");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/extInvokeFilterRuleMap/deleteExtInvokeFilterRuleMap?ids="+v_ids+"&mapType=func",
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		funcTable.removeSelectedRow();
            	}
            }
        });
	   },"确认提示");
}

/**
 *  删除"适用门店"
 */
function deleteOrgRow(){
	var  v_ids = orgTable.getSelectedObjs("MAP_ID");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/extInvokeFilterRuleMap/deleteExtInvokeFilterRuleMap?ids="+v_ids+"&mapType=org",
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		orgTable.removeSelectedRow();
            		var v_length = orgTable.getAllData().length;//获取适用门店的条目
            		if(v_length==0){
            			$(":radio[name='isStoreLimit'][value='0']").prop("checked","checked");
            		}
            	}
            }
        });
	   },"确认提示");
}