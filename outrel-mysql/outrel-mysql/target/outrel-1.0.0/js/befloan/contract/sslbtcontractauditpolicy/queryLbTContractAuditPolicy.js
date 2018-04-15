//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTContractAuditPolicy/prepareExecute/toAdd',
		'width':1000,
		'height':800,
		'title':'合同审核规则设置',
		'buttons':[
         {'text':'保存','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(model){
	debugger;
	var obj = dialogAddObj.getIframe();
	//必输项校验
	var policyName = $(obj.dtopolicyName).val();
	if(policyName==""|policyName==null){
		$("").newMsg({}).show("规则名称不能为空！");
		return;
	}
	var detail = $(obj.dtodetail).val();
	if(detail==""|detail==null){
		$("").newMsg({}).show("规则说明不能为空！");
		return;
	}
	var startTime = $(obj.dtostartTime).val();
	if(startTime==""|startTime==null){
		$("").newMsg({}).show("有效期开始时间不能为空！");
		return;
	}
	var endTime = $(obj.dtoendTime).val();
	if(endTime==""|endTime==null){
		$("").newMsg({}).show("有效期结束时间不能为空！");
		return;
	}
	if(startTime>endTime){
		$("").newMsg({}).show("开始时间不能大于结束时间！");
		return;
	}
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
	if(params.indexOf("contractAuditRole") < 0 ){
		$("").newMsg({}).show("合同审核角色不能为空！");
		return;
	} 
	//获取页面选择的营业部，多个以逗号分开
	var columnCode = "";
	$(obj.selectedStoreFields.options).each(function () {
	    var val = $(this).val(); //获取单个value
	    columnCode += val + ",";
	});
    
	 if(columnCode!="" & columnCode!=null){
		 columnCode = columnCode.substring(0, columnCode.length-1);
	 }else{
		 $("").newMsg({}).show("营业部不能为空！");
			return; 
	 }
	 if(params.indexOf("productType") < 0 ){
			$("").newMsg({}).show("请选择产品！");
			return;
		}
	 params= params+"&mapCode="+columnCode;
	var url=contextRootPath+'/lbTContractAuditPolicy/insertLbTContractAuditPolicy';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
			var v_msg = msg.msg;
        	if(v_status.indexOf('ok') >-1){
        		if(v_msg.indexOf('不能新增规则') >-1){
        			return;
        		}
        		dialogAddObj.close();
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
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	var v_state = v_objs[0].state;
	if( v_state != '0'){
		jyDialog({"type":"info"}).alert("该规则不能进行修改操作,请选择暂存状态的规则");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTContractAuditPolicy/prepareExecute/toUpdate?id='+v_ids,
			'width':1000,
			'height':800,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	debugger;
	var obj = dialogUpdateObj.getIframe();
	//必输项校验
	var policyName = $(obj.dtopolicyName).val();
	if(policyName==""|policyName==null){
		$("").newMsg({}).show("规则名称不能为空！");
		return;
	}
	var detail = $(obj.dtodetail).val();
	if(detail==""|detail==null){
		$("").newMsg({}).show("规则说明不能为空！");
		return;
	}
	var startTime = $(obj.dtostartTime).val();
	if(startTime==""|startTime==null){
		$("").newMsg({}).show("有效期开始时间不能为空！");
		return;
	}
	var endTime = $(obj.dtoendTime).val();
	if(endTime==""|endTime==null){
		$("").newMsg({}).show("有效期结束时间不能为空！");
		return;
	}
	if(startTime>endTime){
		$("").newMsg({}).show("开始时间不能大于结束时间！");
		return;
	}
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	var params=obj.$("#updateNewsFormData").serialize();
	if(params.indexOf("contractAuditRole") < 0 ){
		$("").newMsg({}).show("合同审核角色不能为空！");
		return;
	}
	//获取页面选择的营业部，多个以逗号分开
	var columnCode = "";
	$(obj.selectedStoreFields.options).each(function () {
	    var val = $(this).val(); //获取单个value
	    columnCode += val + ",";
	});
    
	 if(columnCode!="" & columnCode!=null){
		 columnCode = columnCode.substring(0, columnCode.length-1);
	 }else{
		 $("").newMsg({}).show("营业部不能为空！");
			return;
	 }
	 if(params.indexOf("productType") < 0 ){
			$("").newMsg({}).show("请选择产品！");
			return;
		}
	 params= params+"&mapCode="+columnCode;
	var url=contextRootPath+'/lbTContractAuditPolicy/updateLbTContractAuditPolicy';
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
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	var v_state = v_objs[0].state;
	if( v_state != '0'){
		jyDialog({"type":"info"}).alert("该规则不能进行删除操作,请选择暂存状态的规则");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTContractAuditPolicy/deleteLbTContractAuditPolicy?ids="+v_ids,
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
			'display':contextRootPath+'/lbTContractAuditPolicy/prepareExecute/toView?id='+vId,
			'width':1000,
			'height':800,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//置为 2.失效、 1.生效
function updateData(state){
	debugger;
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待操作的数据！");
		return;
	}
	
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	var v_state = v_objs[0].state;
	var v_msg = "";
	if( state == '1'){
		v_msg = '该规则不能进行生效操作,请选择暂存状态的规则';
	}else{
		v_msg = '该规则不能进行失效操作,请选择生效状态的规则';
	}
	if(state == '1' &&  v_state == '0'){
		updateState(v_ids,state);
	}else if( state == '2' &&  v_state == '1'){
		updateState(v_ids,state);
	}else{
		jyDialog({"type":"warn"}).alert(v_msg);
	}
}

function updateState(v_ids,state){
	
	jyDialog({"type":"question"}).confirm("您确认要操作选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTContractAuditPolicy/updateLbTContractAuditPolicyState?id="+v_ids+"&state="+state,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            }
        });
	   },"确认提示");
}

//左移导出字段
function addStoreField(){
	  $('#storeFields option:selected').attr("ondblclick","delStoreField()");
	  $('#storeFields option:selected').appendTo('#selectedStoreFields');
	  

	  
}

//右移导出字段
function delStoreField(){
  $('#selectedStoreFields option:selected').attr("ondblclick","addStoreField()");
  $('#selectedStoreFields option:selected').appendTo('#storeFields');
  
}


//待选门店集合(新增使用)
function addFields(){
	
	var dataUrl = contextRootPath + '/lbTContractAuditPolicy/searchLbTSignLimitMapOrgStore';
	
	$.ajax({
		url: dataUrl,
		type: 'get',
		dataType: 'json',
		data:{"id":0},
		success: function(results) {
			var result=results.data;
			var j;
			var resultLength = result.length - 1;
			for (j = 0; j <= resultLength; j++) {
				
				$('#storeFields').append("<option ondblclick='addStoreField()' value='"+result[j].mapCode+"'>"+result[j].orgName+"</option>");
				
			}
		}
	});
		
	
}

//已选门店集合(新增使用)
/*function addSelectFields(){
	var dataUrl = contextRootPath + '/lbTContractAuditPolicy/searchLbTSignLimitMapOrgStoreSelected';

	$.ajax({
		url: dataUrl,
		type: 'get',
		dataType: 'json',
		data:{"id":0},
		success: function(results) {
			var result=results.data;
			var j;
			var resultLength = result.length - 1;
			for (j = 0; j <= resultLength; j++) {
				
				$('#selectedStoreFields').append("<option ondblclick='delStoreField()' value='"+result[j].mapCode+"'>"+result[j].orgName+"</option>");
				
			}
		}
	});
}
*/

//待选门店集合(修改使用)
function addFields1(id){
	debugger;
	var id = id;	
	var dataUrl = contextRootPath + '/lbTContractAuditPolicy/searchLbTSignLimitMapOrgStore';
	
	$.ajax({
		url: dataUrl,
		type: 'get',
		dataType: 'json',
		data:{"id":id},
		success: function(results) {
			var result=results.data;
			var j;
			var resultLength = result.length - 1;
			for (j = 0; j <= resultLength; j++) {
				
				$('#storeFields').append("<option ondblclick='addStoreField()' value='"+result[j].mapCode+"'>"+result[j].orgName+"</option>");
				
			}
		}
	});
		
	
}

//已选门店集合(修改使用)
function addSelectFields1(id){
	debugger;
	var id = id;
	var dataUrl = contextRootPath + '/lbTContractAuditPolicy/searchLbTSignLimitMapOrgStoreSelected';

	$.ajax({
		url: dataUrl,
		type: 'get',
		dataType: 'json',
		data:{"id":id},
		success: function(results) {
			var result=results.data;
			var j;
			var resultLength = result.length - 1;
			for (j = 0; j <= resultLength; j++) {
				
				$('#selectedStoreFields').append("<option ondblclick='delStoreField()' value='"+result[j].mapCode+"'>"+result[j].orgName+"</option>");
				
			}
		}
	});
}