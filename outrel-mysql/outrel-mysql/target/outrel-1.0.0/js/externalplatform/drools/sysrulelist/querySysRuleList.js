var tree;
function addFun(nodeId, obj) {
	if (obj.TYPE == 4) {
		jyDialog({"type":"warn"}).alert("规则不能添加子节点！");
		return;
	}else {
		$("#contentSwap").load(contextRootPath + "/sysRuleList/prepareExecute/toAdd?pCode="+ obj.ID);
	}
}
function editFun(nodeId, obj) {
	$("#contentSwap").load(contextRootPath + "/sysRuleList/prepareExecute/toUpdate?code="+ obj.ID);
}
function removeFun(nodeId, obj) {
	$.ajax({
		type : "POST",
		dataType : "json",
		url : contextRootPath + "/sysRuleList/deleteSysRuleList?code="+obj.ID,
		success : function(msg) {
			$("").newMsg({}).show(msg.msg);;
			var v_status = msg.status;
			// 删除成功后
			if (v_status.indexOf('ok') > -1) {
				tree.remove(obj);
			}
		}
    });
}
function viewFun(nodeId, obj) {
	if (obj.ID != '0')
		$("#contentSwap").load(contextRootPath + "/sysRuleList/prepareExecute/toView?code="+ obj.ID);
}

function updateSysRuleList() {
	var formObj=document.getElementById('updateNewsFormData');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		jyDialog({"type":"info"}).alert("请正确填写！");
		return;
	}
	var params = $("#updateNewsFormData").serialize();
	var url = contextRootPath + '/sysRuleList/updateSysRuleList';
	var pid;
	var code = $("#dtoruleCode").val();
	if (code.length == 3) {
        pid = 0;
	} else {
		pid = code.substring(0, code.length - 3);
	}
	var obj = {
		ID : code,
		NAME : $("#dtochName").val(),
		PID : pid,
		TYPE : $("#dtoruleType").val()
	};
	// 通过ajax保存
	jyAjax(url, params, function(msg) {
		 var v_status = msg.status;
		 $("").newMsg({}).show(msg.msg);
	});
}
function saveSysRuleList() {
	//校验必填项
	var formObj="addNewsFormData";
	if($("#"+formObj).find(".checkError").length>0||!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		jyDialog({"type":"info"}).alert("请正确填写！");
		return;
	}
	var params = $("#addNewsFormData").serialize();
	var url = contextRootPath + '/sysRuleList/insertSysRuleList';
	var pid;
	var code = $("#dtoruleCode").val();
	if (code.length == 3) {
		pid = 0;
	} else {
		pid = code.substring(0, code.length - 3);
	}
	var icon;
	if ($("#dtoruleType").val() == 1) {
		icon = contextRootPath + "/images/compile.gif";
	} else if ($("#dtoruleType").val() == 2) {
		icon = contextRootPath + "/images/ruleset.gif";
	} else if ($("#dtoruleType").val() == 3) {
		icon = contextRootPath + "/images/rulePackage.gif";
	} else if ($("#dtoruleType").val() == 4) {
		icon = contextRootPath + "/images/rule.gif";
	}
	var obj = {
		ID : code,
		NAME : $("#dtochName").val(),
		PID : pid,
		TYPE : $("#dtoruleType").val(),
		icon : icon
	};
	// 通过ajax保存
	jyAjax(url, params, function(msg) {
		// 新增成功后，
		$("").newMsg({}).show(msg.msg);
		var v_status = msg.status;
		if (v_status.indexOf('ok') > -1) {
			tree.addByPojo(obj);
		}
	});
}
function changeHidden(val) {
	var hiddenTr = $("#hiddenTr");
	if (val == 3) {
		hiddenTr.hide();
	} else {
		hiddenTr.show();
	}
}

//校验字段唯一性
function checkUnique(obj,string){
	var params = string;
	if( $(obj).val()==null || $(obj).val()== "" ){
		$(obj).addClass("checkError");
		return;
	}
	jyAjax( contextRootPath+'/sysRuleList/checkUnique',
			params,
			function(msg){
				//新增成功后，
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		$(obj).removeClass("checkError");
	        	}else{
	        		$(obj).addClass("checkError");
	        	}
	  	},
		function(msg){
	  		$("").newMsg({}).show(msg.msg);
    		$(obj).addClass("checkError");
	  	}  	
	);
}

/**
 * 页面查询条件级联
 */
function queryRule(){
	jyAjax(
			contextRootPath+"/sysRuleList/searchSysRuleList?ruleType=1",
			'',
			function(result){
			var v_status = result.status;
        	 if(v_status.indexOf('ok') >-1){
        		 $.each(result.data, function(idx, e){
        			  $("select[name='ruleBaseCode']").append("<option value='"+result.data[idx].ruleCode+"'>"+result.data[idx].chName+"</option>")
        		 })
        	}
	});
	$("select[name='ruleBaseCode']").append("<option value=''>--请选择--</option>");
	$("select[name='ruleBaseCode']").bind("change",function(){
		//移除旧的列表
		 $("select[name='ruleGroupCode'] option").remove(); 
		 $("select[name='ruleGroupCode']").append("<option value=''>--请选择--</option>");
		//移除旧的列表
		 $("select[name='ruleCode'] option").remove(); 
		 $("select[name='ruleCode']").append("<option value=''>--请选择--</option>");
		
		 var ruleBaseCode=$("select[name='ruleBaseCode']").val();
		 var url=contextRootPath+"/sysRuleList/querySysRuleGroupList?ruleBaseCode="+ruleBaseCode;
		 jyAjax(
					url,
					'',
					function(result){
					var v_status = result.status;
		        	 if(v_status.indexOf('ok') >-1){
		        		 $.each(result.data, function(idx, e){
		        			  $("select[name='ruleGroupCode']").append("<option value='"+result.data[idx].ruleGroupCode+"'>"+result.data[idx].ruleGroupName+"</option>")
		        		 })
		        	}
			});
	});
	
	
	 $("select[name='ruleGroupCode']").bind("change",function(){
		//移除旧的列表
		 $("select[name='ruleCode'] option").remove(); 
		 $("select[name='ruleCode']").append("<option value=''>--请选择--</option>");
		 var ruleGroupCode=$("select[name='ruleGroupCode']").val();
		 var url=contextRootPath+"/sysRuleList/querySysRuleList?ruleGroupCode="+ruleGroupCode;
		 comSelect('ruleCode',url);
	}); 
	function comSelect(showName,url){
		jyAjax(
				url,
				'',
				function(result){
				var v_status = result.status;
	        	 if(v_status.indexOf('ok') >-1){
	        		 $.each(result.data, function(idx, e){
	        			  $("select[name='"+showName+"']").append("<option value='"+result.data[idx].ruleCode+"'>"+result.data[idx].ruleName+"</option>")
	        		 })
	        	}
		});
	}
}

//查看规则内容
function viewContent(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysRuleList/prepareExecute/toViewContent?id='+vId,
			'width':800,
			'height':500,
			'title':'模板内容',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}