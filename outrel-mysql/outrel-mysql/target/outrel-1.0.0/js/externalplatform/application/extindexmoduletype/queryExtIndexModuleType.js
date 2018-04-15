//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;

function addFun(nodeId,obj){
	console.log(obj);
	var dialogStruct={	
		'display':contextRootPath+'/extIndexModuleType/prepareExecute/toAdd?pid='+obj.ID,
		'width':800,
		'height':500,
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
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/extIndexModuleType/insertExtIndexModuleType';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			console.log(msg.data);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		tree.addByPojo(msg.data);
        		dialogAddObj.close();
        	}
  	});
}


//编辑
function editFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/extIndexModuleType/prepareExecute/toUpdate?id='+obj.ID,
			'width':800,
			'height':500,
			'title':'修改',
			'isIframe':"false",
			'buttons':[
               {'text':'保存','action':doUpdateFrom(nodeId,obj)},
			   {'text':'关闭','isClose':true}
			]
		};
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open()
}

//修改页面 的 保存操作
function doUpdateFrom(nodeId,obj){
	return function(){
		var formObj=document.getElementById('updateNewsFormData');
		if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
			jyDialog({"type":"info"}).alert("请正确填写！");
			return;
		}
		//序列化 新增页面的form表单数据
		var params=$("#updateNewsFormData").serialize();
		var url=contextRootPath+'/extIndexModuleType/updateExtIndexModuleType';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
				$("").newMsg({}).show(msg.msg);
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		if(msg.data.validateState == '1') {
	        			tree.edit(msg.data);
	        		} else {
	        			tree.remove(obj);
	        		}
	        		dialogUpdateObj.close();
	        	}
	  	});
	}
}

//查看
function viewFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/extIndexModuleType/prepareExecute/toView?id='+obj.ID,
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

//删除
function removeFun(nodeId,obj){
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/extIndexModuleType/deleteExtIndexModuleType?ids="+obj.ID,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		tree.remove(obj);
            	}	
            }
        });
	   },"确认提示");	
}