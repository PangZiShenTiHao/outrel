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
    	
    	if(obj.type=="attr"){
    		var inputId = $("#inputId").val();
        	var hiddenInputId = $("#hiddenInputId").val();
        	var dictId = $("#hiddenInputDict").val();
            window.parent.document.getElementById(inputId).value=obj.getParentNode().NAME+"."+obj.NAME;
            window.parent.document.getElementById(hiddenInputId).value=obj.PID+"."+obj.enName;
            window.parent.dialogSelectModelAttr.close();
    	}else{
    		jyDialog({"type":"info"}).alert("请选择业务模型属性！");
    		//alert("请选择业务模型属性！");
    	}
    }
    function removeFun(nodeId,obj){
        tree.remove(obj);
    }
    
    var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysRuleModel/queryTreeSelectModelAtrr',"addFun":addFun,"editFun":editFun,"removeFun":removeFun,"viewFun":viewFun};
    tree=$("#innerPanel").jyTree(treeStr);
    tree.show();
});



