var tree;
jQuery(document).ready(function($) {
    function viewFun(nodeId,obj){
    	var v_input = "";
        var v_hiddenInput = "";
    	var inputId = $("#inputId").val();
    	var hiddenInputId = $("#hiddenInputId").val();
    	if(obj.ID=="0"||obj.PID=="0"||obj.children){
    		window.parent.document.getElementById(inputId).value= v_input;
            window.parent.document.getElementById(hiddenInputId).value= v_hiddenInput;
    		jyDialog({"type":"info"}).alert("请选择指标模型属性！");
    	}else{
            if(obj.LEVEL==2){
            	v_input = obj.getParentNode().NAME+"."+obj.NAME;
            	v_hiddenInput = "this"+"[\""+obj.PCODE+"\"]"+"[\""+obj.CODE+"\"]";
            }else if(obj.LEVEL==3){
            	v_input = obj.getParentNode().NAME+"."+obj.NAME; 
            	v_hiddenInput = "this"+"[\""+obj.getParentNode().PCODE+"\"]"+"[\""+obj.getParentNode().CODE+"\"]"+"[\""+obj.CODE+"\"]";
            }else{
            	jyDialog({"type":"info"}).alert("暂不支持多层级指标配置！");
            }
            window.parent.document.getElementById(inputId).value= v_input;
            window.parent.document.getElementById(hiddenInputId).value= v_hiddenInput;
            window.parent.dialogSelectModelAttr.close();
    	}
    	
    }
    var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'/extIndexModuleType/queryTreeExtIndexModuleType',"viewFun":viewFun};
    tree=$("#innerPanel").jyTree(treeStr);
    tree.show();
});


