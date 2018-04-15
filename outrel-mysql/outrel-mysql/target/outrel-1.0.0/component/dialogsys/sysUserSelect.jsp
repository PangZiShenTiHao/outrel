<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询系统用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style type="text/css">
        .leftPanel{
            position: absolute;left:2px; top:10px;bottom:2px;
            width:25.3%;
            height:90%; 
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
            height:90%; 
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
  
  
<!-- 相关js方法 -->
<script type="text/javascript">

//utf-8

var sysuserselect = {};

sysuserselect.tree = {};
sysuserselect.loadUserListPage = function (nodeId,obj){
	var orgId = "-1";
	if(obj!=null){
		orgId = obj.ID;
	}else{
		orgId=$("#orgId").val();
	}
	
	sysuserselect.loadUserList(orgId);
}

sysuserselect.loadUserList = function (orgId){
	$("#contentSwap").load(contextRootPath + "/component/dialogsys/sysUserSelectTable.jsp?dispalyNameId=${param.dispalyNameId}&hiddenInputId=${param.hiddenInputId}&callFun=${param.callFun}&tabTitle=${param.tabTitle}&orgId="+(orgId!=null?(""+orgId):"") );
}

sysuserselect.loadOrgTree = function (){
	
  	var rootOrgId = $("#orgId").val();
    var orgIdParam = (rootOrgId!=null&&rootOrgId!="")?("&orgId="+rootOrgId):"";
	var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysOrg/queryTreeSysOrg?a=a'+orgIdParam,"addFun":null,"editFun":null,"removeFun":null,"viewFun":sysuserselect.loadUserListPage};
	sysuserselect.tree=$("#innerPanel").jyTree(treeStr);
	sysuserselect.tree.show();
}

//页面加载完后 
$(document).ready(function(){
	sysuserselect.loadUserListPage();
	sysuserselect.loadOrgTree();
});


</script>

</head>
<body style="background-color:#FFFFFF">
<input type="hidden" id="orgId" name="orgId" value="${param.orgId}"/>
<input type="hidden" name="check" id="check" value="${param.check}">

<div class="leftPanel">
    <div class="titleSwap"><label class="innerTitle">机构树</label></div>
    <div class="contentSwap">
        <div class="innerPanel" id="innerPanel">
            <div class="ztree" id="treeDemo"></div>
        </div>
    </div>
</div>
<div class="contentPanel">
    <div class="titleSwap"><!-- <label class="innerTitle">机构树</label> --></div>
    <div class="contentSwap" id="contentSwap"></div>
</div>


 <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" >
	<div class="ui-dialog-buttonset" style=" display:block; position:absolute; left:0px ;bottom:0px; width:100%; text-align: center;">
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" onclick="sysuserSelectTable.chooseUserData();">
			<span class="ui-button-text">确定</span>
		</button>
		<!-- 
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" onclick="loadUserList($('#orgId').val());">
			<span class="ui-button-text">返回</span>
		</button>
		 -->
	</div>
</div>

</body>
</html>
