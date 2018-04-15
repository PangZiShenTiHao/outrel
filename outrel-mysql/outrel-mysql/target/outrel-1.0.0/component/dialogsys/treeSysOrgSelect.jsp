<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
   <%@ include file="/common/StaticJavascript.jsp" %>
    <title>机构管理树形</title>
  	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <style type="text/css">
        .leftPanel{
            position: absolute;left:2px; top:10px;bottom:2px;
            width:99%; 
            height:85%; 
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
    function getAllCheckedNodes(){
    	if(typeof(receiveData) != 'undefined'){
	    	receiveData(tree.getTree().getCheckedNodes());
    	}
		dialogOrgSelect.close();
    }
    
  	//选中机构
    function selectOneOrgData(nodeId,obj){
	    var data = [];
    	data.push(obj);
    	if(typeof(receiveData) != 'undefined'){
	    	receiveData(data);
    	}
		dialogOrgSelect.close();
    }

    var tree;
    $(document).ready(function() {

      	var rootOrgId = $("#rootOrgId").val();
        var orgIdParam = (rootOrgId!=null&&rootOrgId!="")?("&orgId="+rootOrgId):"";
        var treeStr={"disabledLink":true
        		,"isEdit":false
        		,"check":$("#check").val()=="true"
        		,"checkChildNodes":false,
        		"url":contextRootPath+'/sysOrg/queryTreeSysOrg?a=a'+orgIdParam
   				,"addFun":null
   				,"editFun":null
   				,"removeFun":null
   				,"viewFun":($("#check").val()=="true")?null:selectOneOrgData};
        tree=$("#innerPanelSelect").jyTree(treeStr);
        tree.show();
    });
    </script>
</head>
<body>
<input type="hidden" name="fillElementId" id="fillElementId" value="${param.fillElementId}">
<input type="hidden" name="rootOrgId" id="rootOrgId" value="${param.rootOrgId}">
<input type="hidden" name="check" id="check" value="${param.check}">


<div class="leftPanel">
    <div class="titleSwap"><!-- <label class="innerTitle">机构树</label> --></div>
    <div class="contentSwap">
        <div class="innerPanel" id="innerPanelSelect">
            <div class="ztree" id="treeDemo"></div>
        </div>
    </div>
</div>

<c:if test="${param.check}">
<!-- 

 <div class="contentPanel">
    <div class="titleSwap"></div>
    <div class="contentSwap" id="contentSwap">
    </div>
</div>
 -->
 
 <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" >
	<div class="ui-dialog-buttonset" style=" display:block; position:absolute; left:0px ;bottom:0px; width:100%; text-align: center;">
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" onclick="getAllCheckedNodes();">
			<span class="ui-button-text">确定</span>
		</button>
		<!-- 
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" onclick="loadUserList($('#orgId').val());">
			<span class="ui-button-text">返回</span>
		</button>
		 -->
	</div>
</div>

</c:if>

</body></html>