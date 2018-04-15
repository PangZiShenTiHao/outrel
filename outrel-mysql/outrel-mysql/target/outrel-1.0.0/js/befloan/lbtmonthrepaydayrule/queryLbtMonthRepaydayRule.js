//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbtMonthRepaydayRule/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增月还日规则',
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
	

	var selectArray=[];
	$("#addNewsFormData input:checkbox[name='corpBrchCode']:checked").each(function() {
		selectArray.push($(this).val());
	});
	
	if(selectArray.length<1) {
		$("").newMsg({}).show("请选择放款机构");
		return;
	}
	
	var selectStr=selectArray.join(",");
	params.push('orgTabStr=' + selectStr);
	
	var prodArr = [];
	$("#addNewsFormData input:checkbox[name='productType']:checked").each(function() {
		prodArr.push($(this).val());
	});
	
	if(prodArr.length<1) {
		$("").newMsg({}).show("请选择适用产品");
		return;
	}
	
	params.push('prodTabStr=' + prodArr.join(","));
	
	
	var url=contextRootPath+'/lbtMonthRepaydayRule/insertLbtMonthRepaydayRule';
	//通过ajax保存
	jyAjax(
		url,
		params.join("&"),
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
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
	
	if( v_state == '0'){
		var dialogStruct={
				'display':contextRootPath+'/lbtMonthRepaydayRule/prepareExecute/toUpdate?id='+v_ids,
				'width':800,
				'height':500,
				'title':'修改月还日规则',
				'isIframe':"false",
				'buttons':[
	             {'text':'保存','action':doUpdateFrom},
				 {'text':'关闭','isClose':true}
				]
			};
			
		dialogUpdateObj = jyDialog(dialogStruct);
		dialogUpdateObj.open();
	}else{
		jyDialog({"type":"warn"}).alert("该规则不能修改，请选择未生效状态的规则！");
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
	
	var selectArray=[];
	$("#updateNewsFormData input:checkbox[name='corpBrchCode']:checked").each(function() {
		selectArray.push($(this).val());
	});
	
	if(selectArray.length<1) {
		$("").newMsg({}).show("请选择放款机构");
		return;
	}
	
	var selectStr=selectArray.join(",");
	params.push('orgTabStr=' + selectStr);
	
	var prodArr = [];
	$("#updateNewsFormData input:checkbox[name='productType']:checked").each(function() {
		prodArr.push($(this).val());
	});
	
	if(prodArr.length<1) {
		$("").newMsg({}).show("请选择适用产品");
		return;
	}
	
	params.push('prodTabStr=' + prodArr.join(","));
	
	
	var url=contextRootPath+'/lbtMonthRepaydayRule/updateLbtMonthRepaydayRule';
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
        		queryData();
        		$("").newMsg({}).show(msg.msg);
        		dialogUpdateObj.close();
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
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	var v_state = v_objs[0].state;
	
	if( v_state == '0'){
		
		jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
			$.ajax({
	            type:"POST",
	            dataType:"json",
	            url:contextRootPath+"/lbtMonthRepaydayRule/deleteLbtMonthRepaydayRule?ids="+v_ids,
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
		
	}else{
		jyDialog({"type":"warn"}).alert("该规则不能删除");
	}
	
}
// 置为 2.失效、 1.生效
function updateData(state){
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
		v_msg = '该规则不能进行生效操作,请选择未生效状态的规则';
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
            url:contextRootPath+"/lbtMonthRepaydayRule/updateLbtMonthRepaydayRuleState?id="+v_ids+"&state="+state,
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

//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbtMonthRepaydayRule/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'isIframe':"false",
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}