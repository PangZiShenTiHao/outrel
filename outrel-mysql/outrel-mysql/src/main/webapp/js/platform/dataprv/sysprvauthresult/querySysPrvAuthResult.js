//权限更新 事件
function updateData(){
    $.ajax({
        type:"POST",
        url:contextRootPath+"/sysPrvAuthResult/insertSysAuthResult",
        success:function(msg){
        	queryData();
        	$("").newMsg({}).show(msg.msg);;
        }
    });
}
var dialogUserSelect;//此变量为弹出框确定以及关闭的关键变量，固定必须
var isAuthorize;//是授权用户还是被授权用户
var receiveUserData = function(datas){//此方法为 弹出框控件选择后的数据接收方法，固定必须
	
	if(isAuthorize == 'true'){
		$("input[name='userIdFrom']").val(datas[0].id);
		$("input[name='userIdFromName']").val(datas[0].userName);
	}else{
		$("input[name='userIdTo']").val(datas[0].id);
		$("input[name='userIdToName']").val(datas[0].userName);
	}
	isAuthorize = "";
}

function selectUserFrom(){
	
	isAuthorize = 'true';
	//取到元素id
	var dialogStruct={
			'display':contextRootPath+'/component/system/sysUserSelect.jsp',
			'width':900,
			'height':800,
			'title':'选择用户',
			'buttons':[],
			'isIframe':'false'
		};
	dialogUserSelect =jyDialog(dialogStruct);
	dialogUserSelect.open();
}
function selectUserTo(){
	
	isAuthorize = 'false';
	//取到元素id
	var dialogStruct={
			'display':contextRootPath+'/component/system/sysUserSelect.jsp',
			'width':900,
			'height':800,
			'title':'选择用户',
			'buttons':[],
			'isIframe':'false'
		};
	dialogUserSelect =jyDialog(dialogStruct);
	dialogUserSelect.open();
}
