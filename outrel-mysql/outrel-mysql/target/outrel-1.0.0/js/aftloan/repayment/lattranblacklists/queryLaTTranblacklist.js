//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogAddObj1;
var dialogUpdateObj;
var selectIds;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTTranblacklist/prepareExecute/toAdd',
		'width':1100,
		'height':750,
		'title':'转入黑名单合同选择页面',
		'buttons':[
            {'name':'nextBtn','text':'下一步','action':openNextPage},
		 {'text':'关闭','isClose':true}
		]
	};

	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}

//下一步
function openNextPage(){
    selectIds = dialogAddObj.getIframe().getSelectedIds().join(",");
    //如果没有选中 数据则
    if(selectIds == ""){
        jyDialog({"type":"warn"}).alert("请先选择一条数据！");
        return;
    }
    //关闭查询界面
    dialogAddObj.close();
    //打开新增界面
    var url=contextRootPath+'/laTTranblacklist/prepareExecute/toAddNext?selectIds='+selectIds;
    var dialogStruct={
        'display':url,
        'width':800,
        'height':500,
        'title':'提前扣款黑名单转入',
        'buttons':[
            {'text':'上一步','action':openPrevPage},
            {'text':'保存','action':doAddFrom},
            {'text':'关闭','isClose':true}
        ]
    };

    dialogAddObj1 =jyDialog(dialogStruct);
    dialogAddObj1.open();
}
//上一步
function openPrevPage() {
    dialogAddObj1.close();
    toAddData();
}

//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj1.getIframe();
	obj.$("#selectIds").val(selectIds);
	if(obj.$("#dtoreason").val() == ''){
        jyDialog({"type":"warn"}).alert("请选择原因");
		return;
	}

    var options=obj.$("#dtoreason option:selected");
    if (options.text() == '其他') {
        if(obj.$("#dtoremark").val() == ''){
            jyDialog({"type":"warn"}).alert("请描述其他原因");
            return;
        }
    }


	//序列化 新增页面的form表单数据
	var params=obj.$("#addLeave").serialize();
	var url=contextRootPath+'/laTTranblacklist/insertLaTTranblacklist';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
            jyDialog({"type":"info"}).alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                dialogAddObj1.close();
        		queryData();
        	}
  	});
}
var outContractIds;
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
    outContractIds = v_ids;
	var dialogStruct={
			'display':contextRootPath+'/laTTranblacklist/prepareExecute/toUpdate',
			'width':800,
			'height':500,
			'title':'提前扣款黑名单转出',
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
    obj.$("#selectIds").val(outContractIds);
    if(obj.$("#dtoreason").val() == ''){
        jyDialog({"type":"warn"}).alert("请选择原因");
        return;
    }
    var options=obj.$("#dtoreason option:selected");
    if (options.text() == '其他') {
        if(obj.$("#dtoremark").val() == ''){
            jyDialog({"type":"warn"}).alert("请描述其他原因");
            return;
        }
    }
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#removeLeave"))) return;
	var params=obj.$("#removeLeave").serialize();
	var url=contextRootPath+'/laTTranblacklist/updateLaTTranblacklist';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			// $("").newMsg({}).show(msg.msg);
            jyDialog({"type":"info"}).alert(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
				dialogUpdateObj.close();
        		queryData();
        	}
  	});
}

//查看明细
function viewData(obj){
	var dialogStruct={
			'display':contextRootPath+'/laTTranblacklist/prepareExecute/toView?contractId='+obj.contractId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}