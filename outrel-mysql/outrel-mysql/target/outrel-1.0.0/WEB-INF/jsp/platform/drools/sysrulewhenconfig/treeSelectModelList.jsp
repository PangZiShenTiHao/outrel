<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
	<%@ include file="/common/StaticJavascript.jsp" %>
	
	<script type="text/javascript">
	 var tree;
	   jQuery(document).ready(function($) {
	       
	       //var l="locale_data/tree.json";
	       // var treeStr={"isEdit":true,"url":"http://localhost:8080/demo-web/","target":"contentSwap","baseRoot":"role"};
	       function addFun(nodeId,obj){
	       tree.addByPojo(obj);
	       }
	       function editFun(nodeId,obj){
	          //alert("编辑事件");
	       }
	       function viewFun(nodeId,obj){
	    	   if(obj.type=="attr"||obj.type=="detail"){
	               window.parent.document.getElementById('${param.inputId}').value=obj.getParentNode().NAME+"."+obj.NAME;
	               window.parent.document.getElementById('${param.hiddenInputId}').value=obj.ID;
	               window.parent.dialogSelectModelAttr.close();
	       	}else{
	       		jyDialog({"type":"info"}).alert("请选择业务模型属性！");
	       	}
	       }
	       function removeFun(nodeId,obj){
	           tree.remove(obj);
	       }
	       
	       var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+"/sysRuleWhenConfig/queryTreeSelectModelList?mName=${param.mName }","addFun":addFun,"editFun":editFun,"removeFun":removeFun,"viewFun":viewFun};
	       tree=$("#innerPanel").jyTree(treeStr);
	       tree.show();
	   });

	</script>
    <title>业务模型管理树形</title>
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
    <div class="titleSwap"><label class="innerTitle">业务模型</label></div>
    <div class="contentSwap">
        <div class="innerPanel" id="innerPanel">
            <div id="treeDemo" class="ztree"></div>
        </div>
    </div>
</div>
</body>
</html>