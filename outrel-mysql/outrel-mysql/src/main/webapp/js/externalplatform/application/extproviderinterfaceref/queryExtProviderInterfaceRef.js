//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/extProviderInterfaceRef/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':'false',
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
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/extProviderInterfaceRef/insertExtProviderInterfaceRef';
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
function toUpdateData(){
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
			'display':contextRootPath+'/extProviderInterfaceRef/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/extProviderInterfaceRef/updateExtProviderInterfaceRef';
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
function deleteData(){
	var v_ids = iframe.getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/extProviderInterfaceRef/deleteExtProviderInterfaceRef?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.removeSelectedRow();
            	}
            	
            	
            }
        });
	   },"确认提示");
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/extProviderInterfaceRef/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//----------------------------------------选择适用接口------------START----------------------------------------
var dialogTree;
var providerNo;
function showTree(providerCode){
	if('-1'==providerCode){
		jyDialog({"type":"info"}).alert("请选择待要添加的提供商！");
		return;
	}
	providerNo=providerCode;
	var dialogStruct={
			'display':contextRootPath+'/extProviderInterfaceRef/prepareExecute/toAdd?providerCode='+providerCode,
			'width':600,
			'height':600,
			'title':'选择接口',
			'isIframe':"false",
			'buttons':[
	         {'text':'保存','action':saveOrgTree},
			 {'text':'关闭','isClose':true}
			]
	};
		
	dialogTree = jyDialog(dialogStruct);
	dialogTree.open();
}

function saveOrgTree(){
	saveOrg();
	saveProviderInterfaceRef();
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
		var id=node["ID"];
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
			"STORENAME":storeName,
		    "ID":id});
	}
	
	iframe.datas=orgs;
	iframe.flush();
//	dialogTree.close();
}

function saveProviderInterfaceRef(){
	//保存系统对应接口
	var params = [];
	var orgArr = [];
	var orgDatas=iframe.getAllData();
	if(orgDatas.length<1){
		$("").newMsg({}).show("请选择接口");
		return;
	}
	for(var k=0;k<orgDatas.length;k++) {
		orgArr.push(orgDatas[k]["STORECODE"]);
	}
	params.push('providerCode='+providerNo);
	params.push('interfaceTabStr=' + orgArr.join(","));
	var url=contextRootPath+'/extProviderInterfaceRef/insertExtProviderInterfaceRef';
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
        		dialogTree.close();
        		iframe.query();
        	}
  	});	
}