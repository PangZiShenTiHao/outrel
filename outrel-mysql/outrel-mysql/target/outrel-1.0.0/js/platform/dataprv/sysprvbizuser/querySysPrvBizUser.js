//修改 事件
function toUpdateData(){
	var dialogStruct={
			'display':contextRootPath+'/sysPrvBizUser/prepareExecute/toUpdate',
			'width':800,
			'height':500,
			'title':'修改',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
	var dialogUpdate = jyDialog(dialogStruct).open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/sysPrvBizUser/updateSysPrvBizUser';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);;
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}


var dialogUserSelect;//此变量为弹出框确定以及关闭的关键变量，固定必须
var receiveUserData = function(datas){//此方法为 弹出框控件选择后的数据接收方法，固定必须
	$("input[name='userId']").val(datas[0].id);
	$("input[name='userName']").val(datas[0].userName);
}

function selectUser(){
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
