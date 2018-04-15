//utf-8
/**
*对应jsp 页面中的js 只存放 $(document).ready(function(){ ... });
*子表查询页面对应的js信息
**/
function addData(v_mainKeyId){

$.dialog({
	id:	'addDataDialogId',
    lock: true, 
    width:800,
    title:'新增信息',
    content: 'url:${jspDTO.jspPrefix}/${jspDTO.modelName}/add${jspDTO.formated_tab_name}.jsp?MAIN_ID='+v_mainKeyId
});
}
//修改数据
function updateData(){
	var selectedId = getSelectedId('selectedRadio');
	if(selectedId==""){
		$.dialog.alert("请选择数据");
		return;
	}
	$.dialog({
	id:	'updateDataDialogId',
    lock: true,
    width:800,
    title:'修改信息',
    content: 'url:${jspDTO.jspPrefix}/${jspDTO.modelName}/update${jspDTO.formated_tab_name}.jsp?dto.id='+selectedId
	});
}
//删除数据
function deleteData(){
   var selectedId = getSelectedId('selectedRadio');
	if(selectedId==""){
		$.dialog.alert("请选择数据");
		return;
	} 
	$.dialog.confirm('你确定要删除吗？', function(){
		//配置dwr 后可以删除
	   ${jspDTO.serviceClassName}.delete${jspDTO.formated_tab_name}(selectedId,deleteCallBack);
   }, function(){
	    $.dialog.tips('执行取消操作');
  }); 
  
  

}
//获取选中 的id
function getSelectedId(varName){
	var selectedId =""; 
	$("[name='"+varName+"']").each(function(i){
		if(this.checked){ 
			if(selectedId != "")
			selectedId = selectedId +",";
			
			selectedId = selectedId + this.value;
		}
	});
	
	return selectedId;
}
//删除数据 的回调函数
function deleteCallBack(data){
	$.dialog.alert(data,function(){
		//删除完后，刷新页面 
   		queryData();
	});
}
//查询数据
function queryData(){
	//浮动框提示 
	$.dialog.tips('查询中...',1000,'loading.gif'); 
	var v_iframeSrc = $(window.parent.document).find("#"+subInframeId).attr("src");
	$(window.parent.document).find("#"+subInframeId).attr("src",v_iframeSrc);
}
//重置数据
function restFun(){
	
	document.query.reset();
}
