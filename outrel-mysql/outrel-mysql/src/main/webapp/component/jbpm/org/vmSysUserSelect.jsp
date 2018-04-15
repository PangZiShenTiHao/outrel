<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询系统用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  
  <!-- 
    -------------------------------按机构选择用户说明-----------------------------------
	js写法：
	var dialogUserSelect = {};//此变量为弹出框确定以及关闭的关键变量，固定必须
	
	var receiveUserData = function(datas){//此方法为 弹出框控件选择后的数据接收方法，固定必须
		//datas 当弹出的页面中发生确定数据选择时，返回此数据,此处可自定义数据的处理
		//datas 数据的格式为json对象数组 [{id:’’,userName:’’,...},{id:’’,userName:’’,...},......]
		alert(datas);
	}
	
	function selectUser(){
		//取到元素id
		var dialogStruct={
				'display':contextRootPath+'/component/system/sysUserSelect.jsp',//check=true 可选参数   支持多选  orgId=1  可选参数 支持按机构过滤    新加参数  showLowerUser=false  支持不显示下级机构的用户  默认为true
				'width':1200,
				'height':800,
				'title':'选择 用户',
				'buttons':[]
			};
		dialogUserSelect =jyDialog(dialogStruct);
		dialogUserSelect.open();
	}  
  
  
	html写法 参考
	<input name="userName" id="userName" onclick="selectUser();">
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
//声明 全局 选人 变量
var v_selectPartnerMap = new JBPM.common.Map();
sysuserselect.loadUserListPage = function (nodeId,obj){
	sysuserselect.loadUserList((obj!=null?(obj.orgId):null),(obj!=null?(obj.orgType):null));
}

sysuserselect.loadUserList = function (orgId,orgType){
	if(orgId == null || orgId ==""){
		orgId = $("#orgId").val();
	}
	$("#contentSwap").load(contextRootPath + "/component/jbpm/org/vmUserSelectTable.jsp?a=a&orgId="+orgId+"&orgType="+orgType );
}

sysuserselect.loadOrgTree = function (){
	
  	var rootOrgId = $("#orgId").val();
    var orgIdParam = (rootOrgId!=null&&rootOrgId!="")?("&orgId="+rootOrgId):"";
	var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'/vmtreeInfo/queryVmTreeSysOrg?orgType='+orgIdParam,"addFun":null,"editFun":null,"removeFun":null,"viewFun":sysuserselect.loadUserListPage};
	sysuserselect.tree=$("#innerPanel").jyTree(treeStr);
	sysuserselect.tree.show();
}

//页面加载完后 
$(document).ready(function(){
	sysuserselect.loadOrgTree();
	sysuserselect.loadUserListPage();
});


</script>

</head>
<body style="background-color:#FFFFFF">
<input type="hidden" id="orgId" name="orgId" value="${param.orgId}"/>
<input type="hidden" id="roleCode" name="roleCode" value="${param.roleCode}" >
<input type="hidden" name="check" id="check" value="${param.check}">
<input type="hidden" id="showLowerUser" name="showLowerUser" value="${param.showLowerUser}" >

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


 <!-- <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" >
	<div class="ui-dialog-buttonset" style=" display:block; position:absolute; left:0px ;bottom:0px; width:100%; text-align: center;">
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" onclick="sysuserSelectTable.chooseUserData();">
			<span class="ui-button-text">确定</span>
		</button>
		
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" onclick="loadUserList($('#orgId').val());">
			<span class="ui-button-text">返回</span>
		</button>
		
	</div> -->
</div>

</body>
</html>
