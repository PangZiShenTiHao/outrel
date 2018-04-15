//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(confType){
	var height = 700;
	if (confType == "2") {
		height = 500;
	}
	var dialogStruct={
		'display':contextRootPath+'/extFunctionInterfaceRef/prepareExecute/toAdd?confType='+confType,
		'width':1000,
		'height':height,
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
	var params = [];
	//组装已选择功能点信息
	var funcPointStr = [];
	if($("select[name='selectedFuncPoint']").val()){
		$("#addNewsFormData select[name='selectedFuncPoint']").each(function() {
			funcPointStr.push($(this).val());
		});
	}else{
		jyDialog({"type":"info"}).alert("请选择功能点！");
		return;
	}
	// 配置类型（1-接口分配规则集  2-调用点分配规则集）
	var confType = $("#dtoConfType").val();
	//组装已选择接口信息
	var interfaceInfoStr = [];
	if(confType == '1'){
		if($("select[name='selectedInterfaceInfo']").val()){
			var selectedInterfaceInfo = document.getElementById('selectedInterfaceInfo');
			for(var i=0;i< selectedInterfaceInfo.options.length;i++)
		    {  
				var interfaceNo  = selectedInterfaceInfo.options[i].value;
				var priority = i+1;
				interfaceInfoStr.push({"priority": priority,"interfaceNo" : interfaceNo});
		    }
		}else{
			jyDialog({"type":"info"}).alert("请选择接口信息！");
			return;
		}
		params.push("interfaceInfoStr="+jyTools.parseJson2String(interfaceInfoStr));
	}
	params.push("funcPointStr="+funcPointStr.join(","));
	params.push("confType="+confType);
	var url=contextRootPath+'/extFunctionInterfaceRef/insertExtFunctionInterfaceRef';
	//通过ajax保存
	jyAjax(
		url,
		params.join("&"),
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();
        		queryData();
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
            url:contextRootPath+"/extFunctionInterfaceRef/deleteExtFunctionInterfaceRef?ids="+v_ids,
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

/**
 * 规则集分配
 */
var dialogRuleGroupObj;
function distributeRuleGroup(obj){
	var dialogStruct={
		'display':contextRootPath+'/extFunctionInterfaceRef/prepareExecute/toDistribute?id='+obj.id+'&sysCode='+obj.sysCode+'&funcTypeCode='+obj.funcTypeCode+'&interfaceNo='+obj.interfaceNo+'&confType='+obj.confType,
		'width':1000,
		'height':600,
		'title':'规则集分配',
		'isIframe':"false",
		'buttons':[
           {'text':'保存','action':saveRuleGroup}
   		  ,{'text':'关闭','isClose':true}
		]
	};
	dialogRuleGroupObj=jyDialog(dialogStruct);
	dialogRuleGroupObj.open();
}

//保存分配的规则组
function saveRuleGroup(){
	var formObj=document.getElementById('ruleGroupFormData');
	var params = [];
	var ruleGroupCode = $(":radio[name='ruleGroupCode']:checked").val();//选中的规则集编码 
	if(!ruleGroupCode){
		jyDialog({"type":"info"}).alert("请选择规则集！");
		return;

	}
	params.push('ruleGroupCode='+ruleGroupCode);
	params.push('id='+$("#dtoid").val());
	var url=contextRootPath+'/extFunctionInterfaceRef/updateExtFunctionInterfaceRef';
	//通过ajax保存
	jyAjax(
		url,
		params.join("&"),
		function(msg){
			//保存成功
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//关闭规则分配页面
        		dialogRuleGroupObj.close();
        		queryData();
        	}
  	});
}