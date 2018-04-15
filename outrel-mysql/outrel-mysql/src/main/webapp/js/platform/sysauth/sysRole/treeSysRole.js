//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/sysRole/prepareExecute/toAdd',
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
	var url=contextRootPath+'/sysRole/insertSysRole';
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
        	}
  	});
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/sysRole/updateSysRole';
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
        	}
  	});
}

function addFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/sysRole/prepareExecute/toAdd&pid='+obj.ID,
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

//编辑
function editFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/sysRole/prepareExecute/toUpdate?id='+obj.ID,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
	var dialogUpdate = jyDialog(dialogStruct).open();
}

//查看
function viewFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/sysRole/prepareExecute/toView?id='+obj.ID,
			'width':800,
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
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/sysRole/deleteSysOrg?ids="+obj.ID,
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
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysRole/deleteSysOrg?ids="+obj.ID,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		tree.remove(obj);
            	}
            }
        });
    }*/
}

var tree;
jQuery(document).ready(function($) {
    var treeStr={"disabledLink":false,"isEdit":true,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysRole/queryTreeSysRole',"addFun":addFun,"editFun":editFun,"removeFun":removeFun,"viewFun":viewFun};
    tree=$("#innerPanel").jyTree(treeStr);
    tree.show();
});
