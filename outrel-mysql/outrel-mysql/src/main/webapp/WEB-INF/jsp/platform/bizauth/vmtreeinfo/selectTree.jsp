<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
	<%@ include file="/common/StaticJspTaglib.jsp" %>
    <title>机构管理树形</title>
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
            margin-left:25px;
            margin-right:10px;
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
    
    var select_tree_org = {};
    
  	//选中机构
    select_tree_org.selectOneOrgData = function (nodeId,obj){
		var fillElementId = $("#fillElementId").val();
		$("#"+fillElementId).val(obj.NAME);//名称赋值
		$("#"+fillElementId).prev().val(obj.ID);//id赋值
		$("#"+fillElementId).prev().prev().val(obj.children==undefined?"1":"0");//id赋值
		dialogOrgSelect.close();
    };
    select_tree_org.tree = {};
    jQuery(document).ready(function($) {
        var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'${url}',"addFun":null,"editFun":null,"removeFun":null,"viewFun":select_tree_org.selectOneOrgData};
        select_tree_org.tree=$("#innerPanelSelect").jyTree(treeStr);
        select_tree_org.tree.show();
    });
    </script>
</head>
<body>
<input type="hidden" name="fillElementId" id="fillElementId" value="${fillElementId}">
<div class="leftPanel">
    <div class="titleSwap"><!-- <label class="innerTitle">机构树</label> --></div>
    <div class="contentSwap">
        <div class="innerPanel" id="innerPanelSelect">
            <div class="ztree" id="treeDemo"></div>
        </div>
    </div>
</div>
</body>
</html>