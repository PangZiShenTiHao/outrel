/**
*
*#UTF-8
*已经被 executeTast.jsp fastDoTast.jsp引用
*/
//选择参与者
function selectPartner(){
	//获取全局的lgdialog参数信息
	var api = frameElement.api, W = api.opener;
	//打开选择菜单 子页面
	W.$.dialog({
		id:	'selectPartnerDialogId',
	    lock: true, 
	    width:800,
	    height:800,
	    title:'选择参与者',
	    content: 'url:component/jbpm/selectPartner/selectPartnerMoniter.jsp',
	    parent:api,
	    close:function() { 
			//弹出两层时 iframe 丢失焦点处理	
	        api.opener.$.dialog({ id:'executeTaskId' });
	        return true; 
    	}
	});
}
//提供给 selectPartnerMoniter.jsp 回调设置参与者使用
function updatePartners(partersId,nameInfo){
	$("#nameInfo").attr("value",nameInfo);
	$("#dtoparamUserId").attr("value",partersId);
	
}