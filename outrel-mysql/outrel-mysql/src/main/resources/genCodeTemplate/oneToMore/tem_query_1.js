//utf-8
/**
*	对应jsp 页面中的js 只存放 $(document).ready(function(){ ... });
*
**/

$(document).ready(function(){
		//$("#listContent tr:even").addClass("tr_body");
	    //列表鼠标滑过行效果
		PICC.common.initTableTrHover($("#listContent"),{
			overClass:"tr_hover",
			clickClass:"tr_body",
			clickCallback:function(tr){
			    var _tds = $(tr).children();	//获取当前行
				if(_tds.attr("id")=="noadd"){
				   return;
				}
				//选中Radio按钮
				if(_tds.eq(1).children().prop("checked") == "" || !_tds.eq(1).children().prop("checked")){
					var obj = _tds.eq(0).children();
					obj.prop("checked", true);
				}
			}
		});
});

//查看预览
function viewOnly(v_id){
	var v_url = '${jspDTO.jspPrefix}/${jspDTO.modelName}/view${jspDTO.formated_tab_name}.jsp?dto.id='+v_id;
	$.dialog({
		id:	'viewDataDialogId',
	    lock: true, 
	    width:900,
	    title:'查看信息',
	    content: 'url:'+v_url
	});
}

function addData(v_curJsp){
	var v_isNext = true;
	$(window.parent.document).find(".l-tab-links").find("a").each(function(i){
			var v_html = $(this).html();
			if('修改信息' == v_html || '新增信息' == v_html){
				alert("您已经打开了新增或修改页面，请先完成其相关操作！");
				v_isNext = false;
				return;
			}
	});
	//if(!v_isNext) return ;
	var v_url = '${jspDTO.jspPrefix}/${jspDTO.modelName}/add${jspDTO.formated_tab_name}.jsp?urlJspOfTab='+v_curJsp;
	//通过tab页面的方式新增主子表信息
	window.parent.f_addTab('','新增信息',v_url);

}
//修改数据
function updateData(v_curJsp){
	var selectedId = getSelectedId('selectedRadio');
	if(selectedId==""){
		$.dialog.alert("请选择数据");
		return;
	}
	
	var v_isNext = true;
	$(window.parent.document).find(".l-tab-links").find("a").each(function(i){
			var v_html = $(this).html();
			if('修改信息' == v_html || '新增信息' == v_html){
				alert("您已经打开了新增或修改页面，请先完成其相关操作！");
				v_isNext = false;
				return;
			}
	});
	
	var v_url = '${jspDTO.jspPrefix}/${jspDTO.modelName}/update${jspDTO.formated_tab_name}.jsp?dto.id='+selectedId+'&urlJspOfTab='+v_curJsp;
	//通过tab页面的方式新增主子表信息
	window.parent.f_addTab('','修改信息',v_url);
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
function queryData(v_isPageNo){
	//控制刷新页面时是否持有页码
	if('Y' == v_isPageNo){
		//浮动框提示 
		$.dialog.tips('刷新中...',1000,'loading.gif'); 
		location.href = location.href;
		return ;
	}
	
	//浮动框提示 
	$.dialog.tips('查询中...',1000,'loading.gif'); 
	$("#queryBtn").attr("disabled",true);
	document.query.submit();
}
//重置数据
function restFun(){
	
	document.query.reset();
}
