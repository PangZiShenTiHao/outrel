//左移导出字段
function addExportField(id1,id2,id3,id4){

	  $('#'+id1+' option:selected').each(function () {
		  	var val = $(this).val(); //获取单个value
	         $("#"+id3+" option[value="+val+"]").appendTo('#'+id4);
	         if(id1=='unSelectedFuncPoint'){//根据功能点把对应接口带出来显示在已选接口框里
	        	 addExportInterfaceField(val); 
	         }	   	    
	  });
	  $('#'+id1+' option:selected').appendTo('#'+id2);	
}
//右移导出字段
function delExportField(id1,id2,id3,id4){
	$('#'+id2+' option:selected').each(function () {
	  	var val = $(this).val(); //获取单个value
         $("#"+id4+" option[value="+val+"]").appendTo('#'+id3);
         
  });
  $('#'+id2+' option:selected').appendTo('#'+id1);
}

//上移
function upMove(id1,id2){  
    var so = $("#"+id1+" option:selected");   
    
    if(so.get(0).index!=0){  
      so.each(function(){
    	 var val = $(this).val();
     	 var objectOption =  $("#"+id2+" option[value="+val+"]");
     	 objectOption.prev().before(objectOption);
         $(this).prev().before($(this));  
      });  
    }  
  }  
 
//下移
 function downMove(id1,id2){  
    var alloptions = $("#"+id1+" option");  
    var so = $("#"+id1+" option:selected");  
    
    if(so.get(so.length-1).index!=alloptions.length-1){  
      for(i=so.length-1;i>=0;i--)  
      {  
        var item = $(so.get(i));
        var objectOption =  $("#"+id2+" option[value="+item.val()+"]");
        objectOption.insertAfter(objectOption.next());
        item.insertAfter(item.next());  
      }  
    }  
  }


//初始化左移导出已选中接口字段
function addExportInterfaceField(funcTypeCode){
  	var url=contextRootPath+"/extFunctionInterfaceRef/searchListExtFunctionInterfaceRef?funcTypeCode="+funcTypeCode+"&confType=1";
  	jyAjax(url,"",function(msg){
		var datas=msg.data;
		if(datas!=null){
			for(var i=0;i<datas.length;i++){
				var interfaceNo =datas[i]["interfaceNo"];
		        $("#unSelectedInterfaceInfos option[value="+interfaceNo+"]").appendTo("#selectedInterfaceInfos");
		   	    $("#unSelectedInterfaceInfo option[value="+interfaceNo+"]").appendTo("#selectedInterfaceInfo");				         
			}
		}
	});
}

