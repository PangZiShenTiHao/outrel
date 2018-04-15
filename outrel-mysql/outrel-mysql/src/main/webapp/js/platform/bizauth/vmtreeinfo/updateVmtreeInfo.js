//声明全局变量，避免变量冲突
var treeSysOrg = {};

var dialogAdd = {};

function addFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/vmtreeInfo/prepareExecute/toAdd?pid='+obj.ID+"&orgType="+obj.orgType,
			'width':800,
			'height':500,
			'title':'新增',
			'isIframe':'false',
			'buttons':[
	         {'text':'保存','action':doAddFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
	return false;
}

//编辑
function editFun(nodeId,obj){
	/*if(obj.sourceType=="HR"){
		alert("数据来自HR系统不能修改!");
		return;
	}*/
	
	var dialogStruct={
			'display':contextRootPath+'/vmtreeInfo/prepareExecute/toUpdate?orgId='+obj.ID+"&orgType="+obj.orgType,
			'width':800,
			'height':500,
			'title':'修改',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
	var dialogUpdate = jyDialog(dialogStruct).open();
	return false;
}

//新增页面的保存操作
function doAddFrom(){
	
	//校验必填项
	if ( $("#addNewsFormData").find(".checkError").length>0 || !checkFormFormat("addNewsFormData") || !checkIsNull($("#addNewsFormData")[0])) {
		jyDialog({"type":"info"}).alert("请正确填写！");
		//jyDialog().alert("请正确填写！");
		return false;
	}
	
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/vmtreeInfo/insertVmtreeInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			//jyDialog().$("").newMsg({}).show(msg.msg);;
			$("").newMsg({}).show(msg.msg);;
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		tree.addByPojo(msg.data);
        		dialogAdd.close();//关闭弹出
        	}
  	});
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//校验必填项
	if ( $("#updateNewsFormData").find(".checkError").length>0 || !checkFormFormat("updateNewsFormData") || !checkIsNull($("#updateNewsFormData")[0])) {
		jyDialog({"type":"info"}).alert("请正确填写！");
		//jyDialog().alert("请正确填写！");
		return false;
	}
//	alert($("#dtoorgId").val()+"  "+$("#dtoparentId").val());
	if($("#dtoorgId").val()==$("#dtoparentId").val()){
		jyDialog({"type":"info"}).alert("不能将该节点设置成为本身的父节点！");
		//jyDialog().alert("不能将该节点设置成为本身的父节点！");
		return false;
	}
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/vmtreeInfo/updateVmtreeInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);;
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		tree.show();
        	}
  	});
}

//查看
function viewFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/vmtreeInfo/prepareExecute/toView?orgId='+obj.ID+"&orgType="+obj.orgType,
			'width':900,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};	
	var dialogView = jyDialog(dialogStruct).open();
}

//删除
function removeFun(nodeId,obj){
	  if(obj.PID=='0'||obj.PID==undefined){
		  jyDialog({"type":"warn"}).alert("该节点为业务虚拟树根节点不能删除！");
		  //jyDialog().alert("该节点为业务虚拟树根节点不能删除！");
		  return false;
	  }
	  if(obj.children!=undefined&&obj.children.length!=0){
		  jyDialog({"type":"warn"}).alert("该节点为有子节点不能删除！");
		  //jyDialog().alert("该节点为有子节点不能删除！");
		  return false;
	  }
	  
	  jyDialog({"type":"question"}).confirm("删除该节点，会删除该节点已经配置的人员。确认删除  " + obj.NAME + " 吗？",function(){
		  $.ajax({
	            type:"POST",
	            url:contextRootPath+"/vmtreeInfo/deleteVmtreeInfo?ids="+obj.ID+"&orgType="+obj.orgType,
	            dataType: "json",
	            success:function(msg){
	            	$("").newMsg({}).show(msg.msg);;
	            	var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		tree.remove(obj);
	            	}
	            }
	        });
		   },"确认提示");
	  
	  
	  /*jyDialog().confirm("删除该节点，会删除该节点已经配置的人员。确认删除  " + obj.NAME + " 吗？",function(){
		  $.ajax({
	            type:"POST",
	            url:contextRootPath+"/vmtreeInfo/deleteVmtreeInfo?ids="+obj.ID+"&orgType="+obj.orgType,
	            dataType: "json",
	            success:function(msg){
	            	jyDialog().$("").newMsg({}).show(msg.msg);;
	            	var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		tree.remove(obj);
	            	}
	            }
	        });
	  });*/
}

