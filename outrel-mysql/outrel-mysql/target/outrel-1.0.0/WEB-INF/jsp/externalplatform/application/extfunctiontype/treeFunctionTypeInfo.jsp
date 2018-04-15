<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
	<%@ include file="/common/StaticJavascript.jsp" %>
    <title>业务功能类型树形</title>
  	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <style type="text/css">
        .leftPanel{
            position: absolute;left:2px; top:10px;bottom:2px;
            width:90%; 
            border:1px solid #CCC9C9;
            border-radius: 5px;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            background: #FAFAFA;
        }
        .leftPanel .innerPanel{
            position: absolute;
            left:0px;
            top:10px;
            bottom:0px;
            right:0px;
            overflow: auto;
        }
        .contentPanel{
            position: absolute;left:310px; top:10px;bottom:2px;right:2px;border:1px solid #CCC9C9;
            border-radius: 5px;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            background: #FAFAFA;
        }
        .leftPanel .titleSwap,.contentPanel .titleSwap{
            display:block;margin:-10px 0px 0px 20px; text-align:left;
        }
        .leftPanel .innerTitle,.contentPanel .innerTitle{
            background: #FAFAFA;padding:0px 5px;
        }
        .leftPanel .contentSwap,.contentPanel .contentSwap{
            margin:5px;
        }
        .ztree li span.button.add {
            margin-left: 2px;
            margin-right: -1px;
            background-position: -144px 0;
            vertical-align: top;
        }
        .ztree li span.button.all {
            margin-left: 2px;
            margin-right: -1px;
            background-position: -1026px 0;
            vertical-align: top;
        }
        .ztree li span.button.all a {
            margin-top:6px;
            color:#FF0000;
        }
    </style>

    <title>树</title>
    <script type="text/javascript">

    </script>
</head>
<body>
	<div class="leftPanel">
		<div class="titleSwap">
			<label class="innerTitle">系统信息</label>
		</div>
		<div class="contentSwap">
			<div class="innerPanel" id="innerPanel">
				<div class="ztree" id="RoleList" style="height: 663px;">
					 
				</div>
			</div>
		</div>
	</div>
	<div class="contentPanel">
		<div class="titleSwap" style="height:30px;">
			<label class="innerTitle">系统功能信息</label>
			<input type="hidden" class="text" id="sysCode" name="sysCode"  value=""/>
		</div>
		<div class="contentSwap" id="contentSwap">
		</div>
	</div>

</body>
<script type="text/javascript">
var tree;
var tree1;
var tabs;
var dialogAddObj;
var dialogUpdateObj;
jQuery(document).ready(function($) {
	tree1=$("#RoleList").jyTree({"disabledLink":false,"isEdit":false,"expandAll":true,"check":false,"checkChildNodes":false,"url":contextRootPath+'/extSysManagement/queryTreeExtSysManagement?validateState=1',"viewFun":configProd});
	tree1.show();
});
function configProd(nodeId,obj){
	var sysCode=obj.ID;
    $("#sysCode").val(sysCode);
	$("#contentSwap").html("");
    tree=$("#contentSwap").jyTree({"disabledLink":false,"isEdit":true,"check":false,"checkChildNodes":false,"url":contextRootPath+'/extFunctionType/queryTreeFunctionTypeInfo?sysCode='+sysCode,"addFun":addFun,"editFun":editFun,"removeFun":removeFun,"viewFun":viewFun});
    tree.show();
}
//添加
function addFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/extFunctionType/prepareExecute/toAdd?pid='+obj.ID+'&sysCode='+$("#sysCode").val(),
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
	//校验必填项
	var formObj=document.getElementById('addNewsFormData');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		jyDialog({"type":"info"}).alert("请正确填写！");
		return;
	}
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/extFunctionType/insertExtFunctionType';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();
        		tree.addByPojo(msg.data);
        	}
  	});
}

//编辑
function editFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/extFunctionType/prepareExecute/toUpdate?id='+obj.ID+'&sysCode='+$("#sysCode").val(),
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
	dialogUpdateObj.open();
}

//修改页面 的 保存操作
function doUpdateFrom(nodeId,obj){
	return function(){
		//序列化 新增页面的form表单数据
		var params=$("#updateNewsFormData").serialize();
		var url=contextRootPath+'/extFunctionType/updateExtFunctionType';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
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


//删除
function removeFun(nodeId,obj){
	//对应功能点下是否有接口，有则不能删除
	jyAjax( 
		contextRootPath+"/extFunctionInterfaceRef/checkUnique",
		"&functionId="+obj.ID,
		function(data){
 			var v_status = data.status;
        	if(v_status.indexOf('no') >-1){
        		jyDialog({"type":"info"}).alert(data.msg);
        	}else{
		        $.ajax({
		            type:"POST",
		            dataType: "json",
		            url:contextRootPath+"/extFunctionType/deleteExtFunctionType?ids="+obj.ID,
		            success:function(msg){
		            	var v_status = msg.status;
		            	//删除成功后
		            	if(v_status.indexOf('ok') >-1){
		            		tree.remove(obj);
		            	}
		            }
		        });
         	}
	  	} 	
	);
}

//查看
function viewFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/extFunctionType/prepareExecute/toView?id='+obj.ID+'&sysCode='+$("#sysCode").val(),
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}
//校验字段唯一性
function checkUnique(obj,string){
	var params = string;
	if( $(obj).val()==null || $(obj).val()== "" ){
		$(obj).addClass("checkError");
		return;
	}
	jyAjax( contextRootPath+'/extFunctionType/checkUnique',
			params,
			function(msg){
				//新增成功后，
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		$(obj).removeClass("checkError");
	        	}else{
	        		$(obj).addClass("checkError");
	        	}
	  	},
		function(msg){
	  		$("").newMsg({}).show(msg.msg);
    		$(obj).addClass("checkError");
	  	}  	
	);
}
</script>
</html>