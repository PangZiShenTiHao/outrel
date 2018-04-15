//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTEmailapp/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	var dialogAdd =jyDialog(dialogStruct).open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTEmailapp/insertLaTEmailapp';
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
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待发送邮件的数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/laTEmailapp/prepareExecute/toUpdate?id='+v_ids,
			'width':1100,
			'height':500,
			'title':'邮件信息',
			'buttons':[
             {'text':'发送','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	if(!checkForm()){
        return ;
    }
	//序列化 新增页面的form表单数据
	var params=$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	var url=contextRootPath+'/laTEmailapp/insertLaTEmailapp';
	var options = {  
            url:url,//后台的处理，也就是form里的action  
            data:params,
            type:"POST",  
            dataType:"json", //数据格式，有XML，html，json，默认为文本  
            success:function(msg){  
            	var v_status = msg.status;
            	if(v_status.indexOf('ok') >-1){
            		$("").newMsg({}).show(msg.msg);
            		dialogUpdate.close();
            		queryData();
            	}else{
            		jyDialog({"type":"warn"}).alert(msg.msg);
            	}
            }  
         }; 
	$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).ajaxSubmit(options); 
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
            url:contextRootPath+"/laTEmailapp/deleteLaTEmailapp?ids="+v_ids,
            success:function(msg){
            	alert(msg.msg);
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
function viewData(obj){
	var v_ids = obj["ID"];
	var dialogStruct={
			'width':1100,
			'display':contextRootPath+'/laTEmailapp/prepareExecute/toView?id='+v_ids,
			'height':500,
			'title':'查看历史记录',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogView = jyDialog(dialogStruct);
	dialogView.open();
}
function checkForm(){
    var dtoemailFrom = $(dialogUpdate.iframe.contentDocument.getElementById("dtoemailFrom")).val();//发送人
    var dtoemailTo = $(dialogUpdate.iframe.contentDocument.getElementById("dtoemailTo")).val();//收件人
    var dtoemailContent = $(dialogUpdate.iframe.contentDocument.getElementById("dtoemailContent")).val();//邮件内容
    var dtoemailSubject = $(dialogUpdate.iframe.contentDocument.getElementById("dtoemailSubject")).val();//邮件主题
    
    /*
        校验不能为空
    */
    if(isNull(dtoemailFrom)){
        jyDialog({"type":"info"}).alert("发送人不能为空！");
        return false;
    }
    /*
	    校验不能为空
	*/
	if(isNull(dtoemailTo)){
	    jyDialog({"type":"info"}).alert("收件人不能为空！");
	    return false;
	}
	/*
	    校验不能为空
	*/
	if(isNull(dtoemailContent)){
	    jyDialog({"type":"info"}).alert("邮件内容不能为空！");
	    return false;
	}
	/*
	    校验不能为空
	*/
	if(isNull(dtoemailSubject)){
	    jyDialog({"type":"info"}).alert("邮件主题不能为空！");
	    return false;
	}
    /*
        校验邮件地址格式
    */
    if(!checkEmail(dtoemailFrom)){
        return false;
    }
    /*
	    校验邮件地址格式
	*/
	if(!checkEmail(dtoemailTo)){
	    return false;
	}
	/*
	校验邮件地址格式
	*/
	/*if(!isNull(dtoemailCc) && !checkEmail(dtoemailCc)){
		return false;
	}*/
	
    return true;
}
