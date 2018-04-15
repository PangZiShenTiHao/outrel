var tree;
jQuery(document).ready(function($) {
    
    //var l="locale_data/tree.json";
    // var treeStr={"isEdit":true,"url":"http://localhost:8080/demo-web/","target":"contentSwap","baseRoot":"role"};
    function addFun(nodeId,obj){
    tree.addByPojo(obj);
    }
    function editFun(nodeId,obj){
      // alert("编辑事件");
    }
    function viewFun(nodeId,obj){
    	if(obj.type=="attr"){
    		$("#contentSwap").load(contextRootPath+'/sysRuleModelAttr/queryListModelAttr?id='+obj.ID);
    	}else{
    		jyDialog({"type":"info"}).alert("请选择业务模型属性！");
    		//alert("请选择业务模型属性！");
    	}
       // $("#contentSwap").html(obj.NAME);
        
    }
    function removeFun(nodeId,obj){
        tree.remove(obj);
    }
    
    var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysRuleModel/queryTreeModelAtrr?id='+$("#dtoId").val(),"addFun":addFun,"editFun":editFun,"removeFun":removeFun,"viewFun":viewFun};
    tree=$("#innerPanel").jyTree(treeStr);
    tree.show();
});


//打开业务属性选择树
function selectModelAttr(thisObj){
	var dialogModelAttrStruct={
			'display':contextRootPath+'/sysRuleModel/prepareExecute/treeSelectModelAttr?modelFlag=1&inputId='+thisObj.id+'&hiddenInputId='+$(thisObj).next().attr("id"),
			'width':600,
			'height':500,
			'title':'业务模型属性选择','isIframe':'true',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
		 dialogSelectModelAttr =jyDialog(dialogModelAttrStruct);
		 dialogSelectModelAttr.open();
		 
}


//增加一行
function addRow(){
    var _len = $("#tab tr").length;       
    $("#tab").append("<tr id="+_len+" align='center'>"
                        +'<td><input type="text" size="1" name="attrConfigs['+(_len-1)+'].sequence" value="'+_len+'"></td>'
                        +'<td><input type="text"  size="6" class="text" name="attrConfigs['+(_len-1)+'].preBrackets" maxLength="50" value="" ></td>'
                        +'<td><input type="text"  class="text" readonly="readonly" onclick="selectModelAttr(this)" id="attrConfigs['+(_len-1)+'].conditionAttrCh" name="attrConfigs['+(_len-1)+'].conditionAttrCh" notNull="false" maxLength="50" value="" >'
                        +'<input type="hidden"  class="text" id="attrConfigs['+(_len-1)+'].conditionAttrEn" name="attrConfigs['+(_len-1)+'].conditionAttrEn" value="" ></td>'
                        +'<td><select name="attrConfigs['+(_len-1)+'].operator">'
                        +'<option value="" >请选择</option>'
                        +'<option value="+" >加</option>'
                        +'<option value="-" >减</option>'
                        +'<option value="*" >乘</option>'
                        +'<option value="/" >除</option>'
                        +'</select></td>'
                        +'<td><input type="text"  size="6" class="text" name="attrConfigs['+(_len-1)+'].afterBrackets" maxLength="50" value="" ></td>'
                        +"<td><a href=\'#\' onclick=\'deltr("+_len+")\'>删除</a></td>"
                    +"</tr>");   
}

 //删除<tr/>
function deltr(index){
   $("tr[id='"+index+"']").remove();//删除当前行
   resetTrNum("tab");
 }

//批量保存
function saveConfig(){
	var flag = checkIsNull($("#addNewsFormData"));
	if(!flag) return;
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/sysRuleModelAttr/saveOrUpdateSysRuleModelAttrConfig';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，提示成功
			$("").newMsg({}).show(msg.msg);;
        	
  	});
}



