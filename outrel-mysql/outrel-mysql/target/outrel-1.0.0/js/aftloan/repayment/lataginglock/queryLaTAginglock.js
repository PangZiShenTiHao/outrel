//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogAddObj1;
var selectIds;
var dialogUpdate;
function toAddData(){
	var dialogStruct={
            'display':contextRootPath+'/laTAginglock/prepareExecute/toAdd',
            'width':1000,
            'height':700,
            'title':'查询逾期合同',
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
	debugger
    selectIds = dialogAddObj.getIframe().getSelectedIds().join(",");
    //如果没有选中 数据则
    if(selectIds == ""){
        jyDialog({"type":"warn"}).alert("请先选择一条数据！");
        return;
    }

    //关闭查询界面
    dialogAddObj.close();
    //打开新增界面
    var url=contextRootPath+'/laTAginglock/prepareExecute/toNextAdd?contractId='+selectIds;
    var dialogStruct={
        'display':url,
        'width':1100,
        'height':800,
        'title':'新增申请',
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
	var re = new RegExp(/^[0-9]+\.{0,1}[0-9]{0,2}$/);
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
    if(obj.$("#dtoreason").val() == ''){
        jyDialog({"type":"warn"}).alert("请选择原因");
        return;
    }
    if(obj.$("#totalRepayAmountText").val() == ''){
        jyDialog({"type":"warn"}).alert("请填写还款金额");
        return;
    }
    if(!re.test(obj.$("#totalRepayAmountText").val())){
        jyDialog({"type":"warn"}).alert("请填写正确还款金额");
        return;

    }
    if(Number(obj.$("#dtocurRepayMoney").val())>Number(obj.$("#totalRepayAmountText").val())){
        jyDialog({"type":"warn"}).alert("还款金额不能小于应还金额！");
        return;
    };


    var options=obj.$("#dtoreason option:selected");
    if (options.text() == '其他') {
        if(obj.$("#dtoremark").val() == ''){
            jyDialog({"type":"warn"}).alert("请描述其他原因");
            return;
        }
    }

	var url=contextRootPath+'/laTAginglock/insertLaTAginglock';
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

function deleteData(type){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    var objs = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待执行的数据！");
		return;
	}

	//如果是撤销验证审批中、审批通过状态
    if(type=='05'){
	    if(objs[0].state!='02'&&objs[0].state!='03'){
            jyDialog({"type":"info"}).alert("请选择审批中或审批通过数据！");
            return;
        }
    }
    //如果是废弃验证初始、已上传附件状态
    if(type=='06'){
	    if(objs[0].state!='01'){
            jyDialog({"type":"info"}).alert("请选择初始录入数据！");
            return;
        }
    }
	jyDialog({"type":"question"}).confirm("您确认要执行选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/laTAginglock/deleteLaTAginglock?ids="+v_ids+"&type="+type,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//执行成功后
            	if(v_status.indexOf('ok') >-1){
            		//iframe.iframeObj["table"].removeSelectedRow();
                    queryData();
            	}
            	
            	
            }
        });
	   },"确认提示");
}
//上传文件
function toUploadFile(){
    //getValueForIndex("listStat",);
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    //如果没有选中 数据则
    if(v_ids == ""){
        jyDialog({"type":"warn"}).alert("请先选择一条数据！");
        return;
    }
    //如果选择多个 择提示
    if(v_ids.indexOf(",") > -1){
        jyDialog({"type":"warn"}).alert("只能选择一条数据！");
        return;
    }

    var dialogStruct={
        'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=36",
        'width':1100,
        'height':800,
        'title':'上传',
        'buttons':[
            {'text':'关闭','isClose':true}
        ]
    };

    dialogUpdate =jyDialog(dialogStruct);
    dialogUpdate.open();
}
function checkUpload(obj) {
    var isUpload = false;
    var  url = contextRootPath+"/laTImageBizAss/checkUpload?listId="+obj["id"] + "&listType=36";
    $.ajax({
        type:"POST",
        url:url,
        async:false,
        success:function(msg){
            if(msg.indexOf('ok') >-1){
                isUpload = true;
            } else {
                isUpload = false;
            }
        }
    });
    return isUpload;
}

/**
 * 提交审批  事件
 */
function submitAppData(){
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    var url =contextRootPath+"/jbpmOverAgingLock/overAgingLockWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids;
    jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
        jyAjax(
            url,
            '',
            function(msg){
                //保存成功后，执行查询页面查询方法
                $("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
                var v_status = msg.status;
                if(v_status.indexOf('ok') >-1){
                    //显示剩下数据
                    queryData();
                }
            });
    },"确认提示");
}