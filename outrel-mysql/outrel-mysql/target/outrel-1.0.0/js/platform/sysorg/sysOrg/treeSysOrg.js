//声明全局变量，避免变量冲突
var treeSysOrg = {};

treeSysOrg.dialogAdd = {};
var dialogUpdate;
function addFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/sysOrg/prepareExecute/toAdd?pid='+obj.ID,
			'width':800,
			'height':500,
			'title':'新增',
			'isIframe':'false',
			'buttons':[
	         {'text':'保存','action':doAddFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
	treeSysOrg.dialogAdd =jyDialog(dialogStruct);
	treeSysOrg.dialogAdd.open();
	return false;
}

//编辑
function editFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/sysOrg/prepareExecute/toUpdate?id='+obj.ID,
			'width':800,
			'height':500,
			'title':'修改',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
	treeSysOrg.dialogAdd= jyDialog(dialogStruct);
	treeSysOrg.dialogAdd.open();
	return false;
}

//新增页面的保存操作
function doAddFrom(){
	
	//校验必填项
	if ( $("#addNewsFormData").find(".checkError").length>0 || !checkFormFormat("addNewsFormData") || !checkIsNull($("#addNewsFormData")[0])) {
		jyDialog({"type":"info"}).alert("请正确填写！");
		//alert("请正确填写！");
		return false;
	}
	
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/sysOrg/insertSysOrg';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);;
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		tree.addByPojo(msg.data);
        		treeSysOrg.dialogAdd.close();//关闭弹出
        	}
  	});
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//校验必填项
	if ( $("#updateNewsFormData").find(".checkError").length>0 || !checkFormFormat("updateNewsFormData") || !checkIsNull($("#updateNewsFormData")[0])) {
		jyDialog({"type":"info"}).alert("请正确填写！");
		//alert("请正确填写！");
		return false;
	}
	
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/sysOrg/updateSysOrg';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);;
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		tree.edit(msg.data);
        		treeSysOrg.dialogAdd.close();//关闭弹出
        	}
  	});
}

//查看
function viewFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/sysOrg/prepareExecute/toView?id='+obj.ID,
			'width':800,
			'height':500,
			'title':'查看明细',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}

//删除
function removeFun(nodeId,obj){
		 $.ajax({
	            type:"POST",
	            url:contextRootPath+"/sysOrg/deleteSysOrg?ids="+obj.ID,
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
}

var tree;
jQuery(document).ready(function($) {
    var treeStr={"disabledLink":true,"isEdit":true,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysOrg/queryTreeSysOrg?openParentId= ',"addFun":addFun,"editFun":editFun,"removeFun":removeFun,"viewFun":viewFun};
    tree=$("#innerPanel").jyTree(treeStr);
    tree.show();
});
