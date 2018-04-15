<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
	<%@ include file="/common/StaticJavascript.jsp" %>
	<script type="text/javascript" src="${basePath}js/platform/sysauth/sysResource/treeSysResource.js"></script>
    <title>资源管理树形</title>
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
            left:30px;
            top:30px;
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
        .importcls{
        	margin-left:20%;
        	margin-top:20px;
        }
    </style>
<script type="text/javascript">
function importUrl(){
	var nodes = tree.getTree().getSelectedNodes();
	var selectNode = tree.getTree().transformToArray(nodes);
	if(selectNode ==''||selectNode=='undefined'||selectNode[0].TYPE!='module'){
		jyDialog({"type":"info"}).alert("请选择模块节点");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/sysResource/prepareExecute/toImport?pid='+selectNode[0].ID+'&pids='+selectNode[0].PIDS,
			'width':600,
			'height':300,
			'title':'导入URL',
			'isIframe':'true',
			'buttons':[
	         {'text':'导入','action':saveImport,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	    dialogImport =jyDialog(dialogStruct);
		dialogImport.open();
}

//导入操作
function saveImport(){
	
	//序列化 新增页面的form表单数据
	var params= $(dialogImport.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var url=contextRootPath+'/sysResource/importSysResource';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			// alert(msg.msg);
			 var treeStr={"disabledLink":false,"isEdit":true,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysResource/queryTreeSysResource',"addFun":addFun,"editFun":editFun,"removeFun":removeFun};
			 $(".ztree").remove();
			 tree=$("#innerPanel").jyTree(treeStr);
			 tree.show();
  	});
	
}

</script>
</head>
<body>

<div class="leftPanel">
    <div class="titleSwap"></div>
    <div class="contentSwap">
        <div class="innerPanel" id="innerPanel">
            <div class="ztree" id="treeDemo"></div>
        </div>
         <div class="importcls">
        <!-- 	<input type="button" class="text" value="导入" id="importbtn" onclick="importUrl()"/>
        	<span style="color:red;">注意：只能选择模块节点进行URL导入</span> -->
        </div> 
    </div>
</div>
</body>
</html>