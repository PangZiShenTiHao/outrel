//utf-8
//点击新增按钮 事件跳转至 新增页面、
var dialogAddObj;

function toAddData(){
	if(fatherId >0){
		var dialogStruct={
			'display':contextRootPath+'/bizRuleConf/prepareExecute/toAddDetail?fatherId='+fatherId,
			'width':500,
			'height':600,
			'title':'新增',
			'buttons':[
		         {'text':'保存','action':doAddFrom,'isClose':true},
				 {'text':'关闭','isClose':true}
			]
		};
		
		dialogAddObj=jyDialog(dialogStruct);
		dialogAddObj.open();
	}else{
		alert("请选择一条父规则！");
	}
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	var v_val = obj.$("#dtoruleType").val();
	var _aVal = obj.$("#dtoarefId").val();
	var _bVal = obj.$("#dtobrefId").val();
	if(checkIsNull(obj.$("#addNewsFormData")[0])){
		if("2" == v_val || "3" == v_val){
			//主关联信息 绑定 组织机构树
			obj.$("#dtoarefId").val(_aVal.replace("LOAN",""));
		}else if("4" == v_val){//机构对 机构
			obj.$("#dtoarefId").val(_aVal.replace("LOAN",""));
			obj.$("#dtobrefId").val(_bVal.replace("LOAN",""));
		}
		/*alert(obj.$("#dtoarefId").val().replace("LOAN",""));
		return ;*/
		//序列化 新增页面的form表单数据
		var params=obj.$("#addNewsFormData").serialize();
		var url=contextRootPath+'/bizRuleConf/insertBizRuleConf';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				alert(msg.msg);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		queryData();
	        	}
	  	});
	}
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
            url:contextRootPath+"/bizRuleConf/deleteBizRuleConf?ids="+v_ids,
            success:function(msg){
            	var json = $.parseJSON(msg );
				alert(json.msg);
            	var v_status = json.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
	        		queryData();
            	}
            	
            }
        });
    }
}

