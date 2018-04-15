//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTOrgLimitConfig/prepareExecute/toAdd',
		'width':900,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	var dtorefuseCodeOne= obj.dtorefuseCodeOne.value;
	if(!dtorefuseCodeOne){
		jyDialog({"type":"info"}).alert("请选择一级原因！");
		return;
	}
	//得到选择的拒绝原因列表
	 var valArr = new Array;
	 obj.$("input[name='chkBox']:checkbox:checked").each(function(i){
		valArr[i] = $(this).val();
	 });
	var vals = valArr.join(',');//转换为逗号隔开的字符串
	//序列化 新增页面的form表单数据
	var params='refuseCodeIds='+vals;
	var url=contextRootPath+'/lbTOrgLimitConfig/insertLbTOrgLimitConfig';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();
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
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTOrgLimitConfig/deleteLbTOrgLimitConfig?ids="+v_ids,
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
//查询一级原因
function queryRefuseReasonOne(){
	 var url=contextRootPath+"/lbTOrgLimitConfig/queryRefuseReasonsInfo";
	 queryCom(url,'refuseCodeOne');
}
//查询二级原因
function queryRefuseReasonTwo(){
		$("select[name='refuseCodeOne']").bind("change",function(){
			var e=$("select[name='refuseCodeOne']").val();
			if(e!=''){
				var url=contextRootPath+"/lbTOrgLimitConfig/queryRefuseReasonsInfo?refuseCode="+e;
				queryCom(url,'refuseCodeTwo');
			}else{
				$("select[name='refuseCodeTwo'] option").remove(); 
			}
		});
}
//展示select
function queryCom(url,showName){
	 jyAjax(url,"",function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				 //移除旧的列表
	       		 $("select[name='"+showName+"'] option").remove(); 
	       		 $("select[name='"+showName+"']").append("<option value=''>--请选择--</option>");
	       		 //追加新的列表
					$.each(msg.data, function(idx, e){
	       			  $("select[name='"+showName+"']").append("<option value='"+e.refuseCode+"'>"+e.refuseReason+"</option>");
	       		 });
			}
		},"","",false);
}