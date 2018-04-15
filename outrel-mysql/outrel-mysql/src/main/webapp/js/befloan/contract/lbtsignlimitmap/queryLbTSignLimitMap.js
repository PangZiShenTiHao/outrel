//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObjMap;
var dialogUpdateObjMap;
function toAddDataMap(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}
	var dialogStruct={
		'display':contextRootPath+'/lbTSignLimitMap/prepareExecute/toAdd',
		'width':740,
		'height':500,
		'title':'适用门店',
		'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doAddFromMap,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObjMap=jyDialog(dialogStruct);
	dialogAddObjMap.open();
}
	
	//左移导出字段
	function addStoreField(){
		  $('#storeFields option:selected').attr("ondblclick","delStoreField()");
		  $('#storeFields option:selected').appendTo('#selectedStoreFields');
		  

		  
	}

	//右移导出字段
	function delStoreField(){
	  $('#selectedStoreFields option:selected').attr("ondblclick","addStoreField()");
	  $('#selectedStoreFields option:selected').appendTo('#storeFields');
	  
	}

	
	//待选门店集合
	function addFields(){
		
		var signLimitId = iframe.iframeObj["table"].getSelectedIds().join(",");	
		var dataUrl = contextRootPath + '/lbTSignLimitMap/searchLbTSignLimitMapOrgStore';
		
		$.ajax({
			url: dataUrl,
			type: 'get',
			dataType: 'json',
			data:{"signLimitId":signLimitId},
			success: function(results) {
				var result=results.data;
				var j;
				var resultLength = result.length - 1;
				for (j = 0; j <= resultLength; j++) {
					
					$('#storeFields').append("<option ondblclick='addStoreField()' value='"+result[j].mapCode+"'>"+result[j].orgName+"</option>");
					
				}
			}
		});
	}
 
	//已选门店集合
	function addSelectFields(obj){
		var signLimitId = iframe.iframeObj["table"].getSelectedIds().join(",");
		var dataUrl = contextRootPath + '/lbTSignLimitMap/searchLbTSignLimitMapOrgStoreSelected';

		$.ajax({
			url: dataUrl,
			type: 'get',
			dataType: 'json',
			data:{"signLimitId":signLimitId},
			success: function(results) {
				var result=results.data;
				var j;
				var resultLength = result.length - 1;
				for (j = 0; j <= resultLength; j++) {
					
					$('#selectedStoreFields').append("<option ondblclick='delStoreField()' value='"+result[j].mapCode+"'>"+result[j].orgName+"</option>");
					
				}
			}
		});
	}

	//保存
	function doAddFromMap(model){
		var signLimitId = iframe.iframeObj["table"].getSelectedIds().join(",");	
		 var columnCode = "";
		 $("#selectedStoreFields option").each(function () {
	         var val = $(this).val(); //获取单个value
	         columnCode += val + ",";
	     });
	     
		 if(columnCode!="" || columnCode!=null){
			 columnCode = columnCode.substring(0, columnCode.length-1);
		 }
		 
	     
	     var dataUrl = contextRootPath + '/lbTSignLimitMap/insertLbTSignLimitMap';
		 var params={"mapCode":columnCode,"signLimitId":signLimitId};
			 	 	 	 
	 	jyAjax(
	 			dataUrl,
	 			params,
	 			function(msg){
	 				alert("保存成功！");
	 	  	});
	}

