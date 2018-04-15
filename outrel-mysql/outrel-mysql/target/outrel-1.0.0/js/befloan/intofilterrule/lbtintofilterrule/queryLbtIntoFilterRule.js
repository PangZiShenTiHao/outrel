//utf-8

//获取选中行的对象
function getSelectObj(alertMsg){
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_objs.length == 0){
		$("").newMsg({}).show(alertMsg);
		return;
	}
	//如果选择多个 择提示
	if(v_objs.length > 1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	return v_objs[0];
}

//获取选中行的对象
function getSelectObjs(alertMsg){
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_objs.length == 0){
		$("").newMsg({}).show(alertMsg);
		return;
	}
	//如果选择多个 择提示
	if(v_objs.length > 1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	return v_objs;
}

//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbtIntoFilterRule/prepareExecute/toAdd',
		'width':800,
		'height':740,
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
		return ;
	}
	
	var params=[];
	params.push($("#addNewsFormData").serialize());
	
	var prodArr = [];
	$("#addNewsFormData input:checkbox[name='prodStr']:checked").each(function() {
		prodArr.push($(this).val());
	});
	
	if(prodArr.length<1) {
		$("").newMsg({}).show("请选择适用产品");
		return;
	}
	
	params.push('prodTabStr=' + prodArr.join(","));
	
	/**
	 * 适用门店操作
	 */
	var selectArray=[];
	var tabDatas=orgTable.getAllData();
	
	if(tabDatas.length<1) {
		$("").newMsg({}).show("请选择适用门店");
		return;
	}
	
	for(var k=0;k<tabDatas.length;k++) {
		selectArray.push(tabDatas[k]["STORECODE"]);
	}
	var selectStr=selectArray.join(",");
	params.push('orgTabStr=' + selectStr);
	
	/**
	 * 单位地址操作
	 */
	var selectJobAddrArray=[];
	var jobAddTabDatas=jobAddrTable.getAllData();
	for(var k=0;k<jobAddTabDatas.length;k++) {
		selectJobAddrArray.push(jobAddTabDatas[k]["JOBCITYCODE"]);
	}
	var selectJobAddrStr=selectJobAddrArray.join(",");
	params.push('jobAddrStr=' + selectJobAddrStr);
	
	var url=contextRootPath+'/lbtIntoFilterRule/insertLbtIntoFilterRule';
	//通过ajax保存
	jyAjax(
		url,
		params.join("&"),
		function(msg){
			//新增成功后，
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		queryData();
        		$("").newMsg({}).show(msg.msg);
        		dialogAddObj.close();
        	} else {
        		jyDialog({"type":"warn"}).alert(msg.msg);
        	}
  	});
}
//修改 事件
function toUpdateData(){
	var v_obj = getSelectObj("请选择待修改的数据！");
	if(v_obj["ruleStatus"]=="11"||v_obj["ruleStatus"]=="13") {
		var dialogStruct={
				'display':contextRootPath+'/lbtIntoFilterRule/prepareExecute/toUpdate?id='+v_obj.id,
				'width':800,
				'height':770,
				'title':'修改',
				'isIframe':"false",
				'buttons':[
				           {'text':'保存','action':doUpdateFrom},
				           {'text':'关闭','isClose':true}
				           ]
		};
		
		dialogUpdateObj = jyDialog(dialogStruct);
		dialogUpdateObj.open();
	} else {
		jyDialog({"type":"warn"}).alert("该规则不允许修改");
	}

}
//修改页面 的 保存操作
function doUpdateFrom(){
	var formObj=document.getElementById('updateNewsFormData');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		return ;
	}
	
	var params=[];
	params.push($("#updateNewsFormData").serialize());
	
	var prodArr = [];
	$("#updateNewsFormData input:checkbox[name='prodStr']:checked").each(function() {
		prodArr.push($(this).val());
	});
	
	if(prodArr.length<1) {
		$("").newMsg({}).show("请选择适用产品");
		return;
	}
	
	params.push('prodTabStr=' + prodArr.join(","));
	
	var selectArray=[];
	var tabDatas=orgTable.getAllData();
	
	if(tabDatas.length<1) {
		$("").newMsg({}).show("请选择适用门店");
		return;
	}
	
	for(var k=0;k<tabDatas.length;k++) {
		selectArray.push(tabDatas[k]["STORECODE"]);
	}
	var selectStr=selectArray.join(",");
	params.push('orgTabStr=' + selectStr);
	
	/**
	 * 单位地址操作
	 */
	var selectJobAddrArray=[];
	var jobAddTabDatas=jobAddrTable.getAllData();
	for(var k=0;k<jobAddTabDatas.length;k++) {
		selectJobAddrArray.push(jobAddTabDatas[k]["JOBCITYCODE"]);
	}
	var selectJobAddrStr=selectJobAddrArray.join(",");
	params.push('jobAddrStr=' + selectJobAddrStr);

	var url=contextRootPath+'/lbtIntoFilterRule/updateLbtIntoFilterRule';
	//通过ajax保存
	jyAjax(
		url,
		params.join("&"),
		function(msg){
			//保存成功后，执行查询页面查询方法
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		queryData();
        		$("").newMsg({}).show(msg.msg);
        		dialogUpdateObj.close();
        	} else {
        		jyDialog().alert(msg.msg);
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_obj = getSelectObj("请选择待删除的数据！");
	if(v_obj["ruleStatus"]=="11"||v_obj["ruleStatus"]=="13") {
		jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
			var url=contextRootPath+"/lbtIntoFilterRule/deleteLbtIntoFilterRule?ids="+v_obj.id;
			jyAjax(
					url,
					'',
					function(msg){
						//保存成功后，执行查询页面查询方法
						var v_status = msg.status;
						if(v_status.indexOf('ok') >-1){
							iframe.iframeObj["table"].removeSelectedRow();
						} else {
							jyDialog({"type":"warn"}).alert(msg.msg);
						}
					});
		},"确认提示");
	} else {
		jyDialog({"type":"warn"}).alert("该规则不允许删除");
	}
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbtIntoFilterRule/prepareExecute/toView?id='+vId,
			'width':800,
			'height':720,
			'title':'查看明细',
			'isIframe':"false",
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//查看明细
var dialogTree;
function showTree(){
	var dialogStruct={
			'display':contextRootPath+'/lbtIntoFilterRule/prepareExecute/addOrgTree',
			'width':600,
			'height':600,
			'title':'选择机构',
			'isIframe':"false",
			'buttons':[
			  {'text':'保存','action':saveOrgTree,'isClose':false}
			 ,{'text':'关闭','isClose':true}
			]
	};
		
	dialogTree = jyDialog(dialogStruct);
	dialogTree.open();
}

function saveOrgTree() {
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

//提交审核 事件
function submitData(){
	var v_obj = getSelectObj("请选择待删除的数据！");
	if(v_obj["ruleStatus"]=="11"||v_obj["ruleStatus"]=="13") {
		jyDialog({"type":"question"}).confirm("您确认要将选择的数据提交审核吗？",function(){
			var url=contextRootPath+"/lbtIntoFilterRule/submitIntoFilterRule?id="+v_obj.id;
			jyAjax(
				url,
				'',
				function(msg){
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		queryData();
		          		$("").newMsg({}).show(msg.msg);
		          	} else {
		        		jyDialog({"type":"warn"}).alert(msg.msg);
		        	}
		  	});		
		   },"确认提示");
	} else {
		jyDialog({"type":"warn"}).alert("该规则不允许提交审核");
	}
}

//置为失效 事件
function toInvalid(){
	var v_obj = getSelectObj("请选择待删除的数据！");
	if(v_obj["ruleStatus"]=="01") {
		jyDialog({"type":"question"}).confirm("您确认要将选择的数据置为失效吗？",function(){
			var url=contextRootPath+"/lbtIntoFilterRule/toInvalidIntoFilterRule?id="+v_obj.id;
			jyAjax(
				url,
				'',
				function(msg){
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		queryData();
		          		$("").newMsg({}).show(msg.msg);
		          	} else {
		        		jyDialog({"type":"warn"}).alert(msg.msg);
		        	}
		  	});		
		   },"确认提示");
	} else {
		jyDialog({"type":"warn"}).alert("该规则不允许置为失效");
	}
}

var dialogAuditObj
function toAuditData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待审核的数据！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/lbtIntoFilterRule/prepareExecute/toAudit?id='+v_ids,
			'width':600,
			'height':400,
			'title':'政策筛选规则审核',
			'isIframe':"false",
			'buttons':[
	         {'text':'保存','action':auditData},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogAuditObj=jyDialog(dialogStruct);
	dialogAuditObj.open();
}

//置为失效 事件
function auditData(){
	var formObj=document.getElementById('auditFilterRuleForm');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		return ;
	}
	
	var params=$("#auditFilterRuleForm").serialize();
	var url=contextRootPath+"/lbtIntoFilterRule/auditIntoFilterRule";
	
	jyAjax(
		url,
		params,
		function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				queryData();
				$("").newMsg({}).show(msg.msg);
				dialogAuditObj.close();
			} else {
				jyDialog({"type":"warn"}).alert(msg.msg);
			}
		});			
}

function heightlight() {
	   	$("#updateNewsFormData input:checkbox[name='prodStr']:checked").each(function() {
	   		$(this).next().css("color","red");
	   	});
}

function getRuleLog(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待查看的数据！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/lbtIntoFilterRule/prepareExecute/showRuleLog?id='+v_ids,
			'width':600,
			'height':400,
			'title':'政策筛选规则日志记录',
			'isIframe':"false",
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	jyDialog(dialogStruct).open();
}

function getRuleTargetRecord(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待查看的数据！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/lbtIntoFilterRule/prepareExecute/showTargetRecord?id='+v_ids,
			'width':600,
			'height':470,
			'title':'政策筛选规则日志记录',
			'isIframe':"false",
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	jyDialog(dialogStruct).open();
}