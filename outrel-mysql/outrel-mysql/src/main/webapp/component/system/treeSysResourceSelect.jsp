<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
	<%@ include file="/common/StaticJspTaglib.jsp" %>
    <title>资源管理树形</title>
    <!-- 
    -------------------------------资源选择树形说明-----------------------------------
    
   	js 写法
    var dialogResourceSelect = {}//此变量必须：弹出框的对象，关闭弹出框时需要调用
    
    var receiveData = function(datas){//此方法为 弹出框树形控件选择后的数据接收方法，固定必须
    	//datas 当弹出的页面中发生确定数据选择时，返回此数据,此处可自定义数据的处理
    	//datas 数据的格式为json对象数组 [{ID:’’,NAME:’’},{ID:’’,NAME:’’},......]
    }
    
	    
	function selectResource(){//弹出树形选择界面的方法 不做限制，只要能弹出选择框就行
			var dialogStruct={
					'display':contextRootPath+'/component/system/treeSysResourceSelect.jsp?check=true&rootId=1',
					'width':800,
					'height':500,
					'title':'选择资源',
					'buttons':[]
				};
				dialogResourceSelect =jyDialog(dialogStruct);
				dialogResourceSelect.open();
	}
	
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
    	if(typeof(receiveData) != 'undefined'){
	    	receiveData(tree.getTree().getCheckedNodes());
    	}
		dialogResourceSelect.close();
    }
    
  	//选中资源，无checkbox时
    function selectResourceData(nodeId,obj){
	    var data = [];
    	data.push(obj);
    	if(typeof(receiveData) != 'undefined'){
	    	receiveData(data);
    	}
		dialogResourceSelect.close();
    }

    var tree;
    jQuery(document).ready(function($) {
    	if(typeof(dialogResourceSelect) == 'undefined'){
    		jyDialog({"type":"info"}).alert("未定义dialogResourceSelect对象，弹出层会无法关闭，请声明该对象");
    		return;
    	}
    	if(typeof(receiveData)=='undefined'){
    		jyDialog({"type":"info"}).alert("未定义receiveData方法，您将无法对返回选中的数据处理，请声明该方法！");
    		return;
    	}
      	var rootId = $("#rootId").val();
        var params = (rootId!=null&&rootId!="")?("&resourceId="+rootId):"";
        var treeStr={"disabledLink":true,"isEdit":false,"check":$("#check").val()=="true","checkChildNodes":false,
        		"url":contextRootPath+'/sysResource/queryTreeSysResource?type=button'+params,"addFun":null,"editFun":null,"removeFun":null,"viewFun":($("#check").val()=="true")?null:selectResourceData};
        tree=$("#innerPanelSelect").jyTree(treeStr);//type=button 意为树中不显示button级别的资源
        tree.show();
    });
    </script>
</head>
<body>
<input type="hidden" name="fillElementId" id="fillElementId" value="${param.fillElementId}">
<input type="hidden" name="rootId" id="rootId" value="${param.rootId}">
<input type="hidden" name="check" id="check" value="${param.check}">
<div class="leftPanel">
    <div class="titleSwap"></div>
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
		<!-- 
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" onclick="loadUserList($('#orgId').val());">
			<span class="ui-button-text">返回</span>
		</button>
		 -->
	</div>
</div>

</c:if>

</body></html>