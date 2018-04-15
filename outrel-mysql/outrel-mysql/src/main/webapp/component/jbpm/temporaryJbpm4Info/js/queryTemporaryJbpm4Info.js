//utf-8
/**
*	对应jsp 页面中的js 只存放 $(document).ready(function(){ ... });
*
**/
function addData(){
	
	var url = '../webDesign.jsp';
	window.open (url,'newwindow',' scrollbars=no');
}
//修改数据
function updateData(){
	var selectedId = getSelectedId();
	if(selectedId==""){
		jyDialog({"type":"warn"}).alert("请选择要修改的流程!");
		return;
	} 
	if(selectedId.indexOf(',')>-1){
		jyDialog({"type":"warn"}).alert("请选择一条要修改的流程!");
		return;
	}
	var url = '../webDesign.jsp?dto.id='+selectedId;
	window.open (url,'newwindow',' scrollbars=no');
}
//删除数据
function deleteData(obj){
   //var v_ids = obj["id"];
   var selectedId = getSelectedId();
   if(selectedId==""){
		jyDialog({"type":"warn"}).alert("请选择要删除的流程!");
		return;
	} 
   jyDialog().confirm("您确认要删除选择的流程吗？", function(){
	   var timestamp = (new Date()).valueOf();
	   $.ajax({
	   		type:"POST",
	   		async:false,
	   		url:AJAX_DELETE_TEMP_JBPM4,
	   		data:{ids:selectedId},
	   		error:function(){$.dialog.alert("error");},
	   		success: function(data){
	   			$.dialog.alert(data);
				queryData();
			}
	   });
   });
}
//发布流程
function publishProc(obj){
	//var selectedId = obj["id"];
	var selectedId = getSelectedId();
	if(selectedId==""){
		jyDialog({"type":"warn"}).alert("请选择要发布的流程！");
		return;
	} 
	if(selectedId.indexOf(',')>-1){
		jyDialog({"type":"warn"}).alert("请选择一条要发布的流程！");
		return;
	}
	var v_isPub = $("#publishState_"+selectedId).html();
	if('否' == v_isPub || v_isPub.indexOf("否") > -1){
		//可以发布
	}else{
		jyDialog({"type":"warn"}).alert("已发布的流程不能再次发布！");
		return;
	}
	/*if(confirm("你确定要发布该流程吗？")){
		$.ajax({
			type:"POST",
			//dataType:"JSON",
			async:false, 
			url:AJAX_DEPLOY_URL,
			data:{tempJpmbInfoId:selectedId},
			success: function(data){
				$.dialog.alert(data);
				queryData();
				}
			});	
	}*/
	$.dialog.confirm("你确定要发布该流程吗？", function(){
		$.ajax({
			type:"POST",
			//dataType:"JSON",
			async:false, 
			url:AJAX_DEPLOY_URL,
			data:{tempJpmbInfoId:selectedId},
			success: function(data){
				$.dialog.alert(data);
				queryData();
				}
			});	
	});
	/*jyDialog().confirm("你确定要发布该流程吗？", function(){
		$.ajax({
			type:"POST",
			//dataType:"JSON",
			async:false, 
			url:AJAX_DEPLOY_URL,
			data:{tempJpmbInfoId:selectedId},
			success: function(data){
				jyDialog({"type":"warn"}).alert(data);
				queryData();
				}
			});	
	});*/
}

/**
 * 获取选中的 行信息
 */
function getSelectedId(){
	var v_ids = "";
	$(".trSelected").each(function(i){
			if(v_ids != "") v_ids = v_ids + ",";
			
			v_ids = v_ids +$(this).attr("kvalue");
	});
	return v_ids;
}


//重置数据
function restFun(){
	
	document.query.reset();
}
