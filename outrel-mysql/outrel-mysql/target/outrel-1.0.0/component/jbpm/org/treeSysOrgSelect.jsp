<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
   <%@ include file="/common/StaticJavascript.jsp" %>
    <title>机构管理树形</title>
    <!-- 使用方法 见 updateJbpm4FormInfo.jsp changePartType()
    -------------------------------机构选择树形说明-----------------------------------
    	//datas 数据的格式为json对象数组 [{ID:’’,NAME:’’},{ID:’’,NAME:’’},......]
		contextRootPath+'/component/system/treeSysOrgSelect.jsp?check=true&orgId=1,//可选参数check=true则支持复选   可选参数orgId 支持只显示orgId 的节点以及他的子节点
     -->
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

    <title>组织机构树</title>
</head>
<body>
<input type="hidden" name="fillElementId" id="fillElementId" value="${param.fillElementId}">
<input type="hidden" name="rootOrgId" id="rootOrgId" value="${param.rootOrgId}">
<input type="hidden" name="check" id="check" value="${param.check}">


<div class="leftPanel">
    <div class="titleSwap"><label class="innerTitle">组织机构树</label></div>
    <div class="contentSwap">
        <div class="innerPanel" id="innerPanelSelect">
            <div class="ztree" id="treeDemo"></div>
        </div>
    </div>
</div>

<c:if test="${param.check}">
 <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" >
	<div class="ui-dialog-buttonset" style=" display:block; position:absolute; left:0px ;bottom:0px; width:100%; text-align: center;">
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" onclick="getAllCheckedNodes();">
			<span class="ui-button-text">确定</span>
		</button>
	</div>
</div>

</c:if>


   
<script type="text/javascript">
 var tree;
 //初始化 组织机构树
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
/*
 *获取 选中的 树信息
 */
function getAllCheckedNodes(){
	var v_json = JBPM.common.json2str(tree.getTree().getCheckedNodes());
	var v_names = "";
	var v_ids = "";
	var dataObj =  tree.getTree().getCheckedNodes() ;
	for(var i = 0 ; i< dataObj.length ; i++){
		var v_data = dataObj[i];
		if(v_ids ){
			v_ids +=",";
			v_names +=",";
		}
		v_names +=v_data.NAME;
		v_ids +=v_data.ID;
	}
	//将选中的 角色code 回写至 父页面
	$(window.parent.document).find("#dtootherParamsDis").val(v_names);
	$(window.parent.document).find("#dtootherParams").val(v_ids);
	if("${param.callFun}" != ""){
		callBackDataInf(v_ids,v_names);
		doCloseWindow();
	}
	

}
/**
 * 选中机构
 */
 function selectOneOrgData(nodeId,obj){
  	var data = [];
 	data.push(obj);
 	if(typeof(receiveData) != 'undefined'){
  		receiveData(data);
 	}
 }
 
function callBackDataInf(v_ids,v_names){
	var v_tabTitle = "${param.tabTitle}";
	<c:if test="${param.callFun !=null}" >
	if(v_tabTitle !=""){
		
		 //回调 tab 页面中的  js function
		var iframeWid = parent.tabs.getTabWinByTitle("${param.tabTitle}");
		iframeWid.${param.callFun}(v_ids,v_names);
	}else{
		//调用传递过来的 回调 函数
		parent.${param.callFun}(v_ids,v_names);
	}
	</c:if>
}
/**
 * 关闭操作
 */
function doCloseWindow(){
	var api = frameElement.api, W = api.opener;
	 //获取父页面的值
	 api.close();
}
 </script>
</body></html>