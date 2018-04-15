//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddMenu = {};
function addFun(nodeId,obj){
	var dialogStruct={
		'display':contextRootPath+'/sysMenu/prepareExecute/toAdd?parentId='+obj.ID,
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	dialogAddMenu =jyDialog(dialogStruct);
	dialogAddMenu.open();
}

function addTopMenuFun(obj){
	var dialogStruct={
		'display':contextRootPath+'/sysMenu/prepareExecute/toAdd?parentId='+obj,
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	dialogAddMenu =jyDialog(dialogStruct);
	dialogAddMenu.open();
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
	var url=contextRootPath+'/sysMenu/insertSysMenu';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);;
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//debugger;
        		var node = msg.data;
       		if("0"==node["PID"]){
       			//node["PID"] = null;
       			menuTree.treeNode=null;
        	}
        		menuTree.addByPojo(node);
        		dialogAddMenu.close();//关闭弹出框
        	}
  	});
}
//修改 事件
function editFun(nodeId,obj){
	var dialogMenuUpdate = jyDialog({
		'display':contextRootPath+'/sysMenu/prepareExecute/toUpdate?id='+obj.ID,
		'width':800,
		'height':500,
		'title':'修改',
		'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doUpdateFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	}).open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/sysMenu/updateSysMenu';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);;
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		menuTree.edit(msg.data);
        	}
  	});
}
//删除 事件
function removeFun(nodeId,obj){
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/sysMenu/deleteSysMenu?ids="+obj.ID,
            success:function(msg){
//            	返回数据转换为json对象
            	msg=eval("("+msg+")");
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		menuTree.remove(obj);
            	}
            }
        });
	   },"确认提示");
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysMenu/deleteSysMenu?ids="+obj.ID,
            success:function(msg){
//            	返回数据转换为json对象
            	msg=eval("("+msg+")");
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		menuTree.remove(obj);
            	}
            }
        });
    }*/
}
//查看明细
function viewFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/sysMenu/prepareExecute/toView?id='+obj.ID,
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


var menuTree;
jQuery(document).ready(function($) {
    var treeStr={"disabledLink":false,"isEdit":true,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysMenu/queryTreeSysMenu',"addFun":addFun,"editFun":editFun,"removeFun":removeFun,"viewFun":viewFun};
    menuTree=$("#innerPanel").jyTree(treeStr);
    menuTree.show();
});
