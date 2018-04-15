<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询系统用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  
  <!-- 使用方法 见 updateJbpm4FormInfo.jsp changePartType()
    -------------------------------按机构选择用户说明-----------------------------------
	js写法：
	var receiveUserData = function(datas){//此方法为 弹出框控件选择后的数据接收方法，固定必须
		//datas 当弹出的页面中发生确定数据选择时，返回此数据,此处可自定义数据的处理
		//datas 数据的格式为json对象数组 [{id:’’,userName:’’,...},{id:’’,userName:’’,...},......]
		alert(datas);
	contextRootPath+'/component/system/sysUserSelect.jsp',//check=true 可选参数   支持多选  orgId=1  可选参数 支持按机构过滤
   -->
  
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
	sysuserselect.loadUserList((obj!=null?(obj.ID):null));
}

sysuserselect.loadUserList = function (orgId){
	if(orgId == null || orgId ==""){
		orgId = $("#orgId").val();
	}
	$("#contentSwap").load(contextRootPath + "/component/jbpm/org/sysUserSelectTable.jsp?callBackFun=${param.callBackFun}"+(orgId!=null?("&orgId="+orgId):"") );
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
    <div class="titleSwap"><label class="innerTitle">组织机构树</label></div>
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

</body>
</html>
