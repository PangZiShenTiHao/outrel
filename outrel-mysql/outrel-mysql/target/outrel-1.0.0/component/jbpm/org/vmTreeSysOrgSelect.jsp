<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
   <%@ include file="/common/StaticJavascript.jsp" %>
    <title>机构管理树形</title>
    <!-- 
    -------------------------------机构选择树形说明-----------------------------------
    
   	js 写法
    var dialogOrgSelect = {}//此变量必须：弹出框的对象，关闭弹出框时需要调用
    
    var receiveData = function(datas){//此方法为 弹出框树形控件选择后的数据接收方法，固定必须
    	//datas 当弹出的页面中发生确定数据选择时，返回此数据,此处可自定义数据的处理
    	//datas 数据的格式为json对象数组 [{ID:’’,NAME:’’},{ID:’’,NAME:’’},......]
    }
    
	function selectOrg(){//弹出树形选择界面的方法 不做限制，只要能弹出选择框就行
		var dialogStruct={
				'display':contextRootPath+'/component/system/treeSysOrgSelect.jsp?check=true&orgId=1,
				//可选参数check=true则支持复选   可选参数orgId 支持显示orgId 的节点以及他的子节点(或父节点)     
				追溯方式 trace，up 向上追溯，down 向下追溯 默认：down 
				appFlag  支持选择应用的虚拟机构 与 isVirtual互斥
				isVirtual 支持选择非虚拟机构   与 appFlag互斥
				'width':800,
				'height':500,
				'title':'选择机构',
				'buttons':[]
			};
			dialogOrgSelect =jyDialog(dialogStruct);
			dialogOrgSelect.open();
	}
	
	<input id="orgName" name="orgName" onclick="selectOrg(this);">
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

    <title>树</title>
    <script type="text/javascript">
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
    		v_ids +=v_data.orgId;
    	}
    	//将选中的 角色code 回写至 父页面
    	$(window.parent.document).find("#dtootherParamsDis").val(v_names);
    	$(window.parent.document).find("#dtootherParams").val(v_ids);
    	if("${param.callFun}" != ""){
    		callBackDataInf(v_ids,v_names);
    		doCloseWindow();
    	}
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

        var treeStr={"disabledLink":true,"isEdit":false,"check":$("#check").val()=="true","checkChildNodes":false,
        		"url":contextRootPath+'/vmtreeInfo/queryVmTreeSysOrg?orgType=',"addFun":null,"editFun":null,"removeFun":null,"viewFun":selectOneOrgData};
        tree=$("#innerPanelSelect").jyTree(treeStr);
        tree.show();
    });
    </script>
</head>
<body>

<input type="hidden" name="fillElementId" id="fillElementId" value="${param.fillElementId}">
<input type="hidden" name="rootOrgId" id="rootOrgId" value="${param.orgId}">
<input type="hidden" name="trace" id="trace" value="${param.trace}"><!-- 追溯方式trace，up 向上追溯，down 向下追溯 默认：down -->
<input type="hidden" name="check" id="check" value="${param.check}">
<input type="hidden" name="appFlag" id="appFlag" value="${param.appFlag}"><!-- 系统标示   与isVirtual 参数互斥-->
<input type="hidden" name="isVirtual" id="isVirtual" value="${param.isVirtual}"><!-- 是否虚拟组织  1 是  0  否   与appFlag参数互斥 -->





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