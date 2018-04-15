//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogAddObj1;
var dialogUpdateObj;
var selectedObj;
var dialogUpdate;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTStoreWithdrawals/prepareExecute/toAdd',
		'width':1100,
		'height':800,
		'title':'新增',
		'buttons':[
         {'text':'下一步','action':openNextPageOne},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}

//下一步
function openNextPageOne(){
    selectIds = dialogAddObj.getIframe().getSelectedIds().join(",");
    selectedObj = dialogAddObj.getIframe().getSelectedObjs();
    //如果没有选中 数据则
    if(selectIds == ""){
        jyDialog({"type":"warn"}).alert("请选择打款流水！");
        return;
    }
    var jsonStr = eval("("+toArray(selectedObj)+")");

    var uniqueNumber = jsonStr["uniqueNumber"];//打款标识
    //关闭查询界面
    dialogAddObj.close();
    //打开新增界面
    var url=contextRootPath+'/laTStoreWithdrawals/prepareExecute/toNextAdd?uniqueNumber='+uniqueNumber;
    var dialogStruct={
        'display':url,
        'width':1100,
        'height':600,
        'title':'退款信息',
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
	if(selectedObj == ''){
        jyDialog({"type":"info"}).alert("请选择打款流水！");
        return;
	}
    var jsonStr = eval("("+toArray(selectedObj)+")");
    var uniqueNumber = jsonStr["uniqueNumber"];//打款标识
    var accountNo = jsonStr["accountNo"];//居间人账号
    var acctAmount = jsonStr["acctAmount"];//交易金額
    var repayTime = jsonStr["repayTime"];//交易时间
    var oopName = jsonStr["otherSideName"];//对方名称
    var otherSideAccount = jsonStr["otherSideAccount"];//对方账户
    obj.$("#accountNo").val(accountNo);
    obj.$("#acctAmount").val(acctAmount);
    obj.$("#repayTime").val(repayTime);
    if(oopName!=''&&oopName!='null'){
        obj.$("#otherSideName").val(oopName);
	}
    if(otherSideAccount!=''&&otherSideAccount!='null'){
        obj.$("#otherSideAccount").val(otherSideAccount);
    }
    var mblReg = /^(13|14|15|17|18)[0-9]{9}$/;
    var bankReg = /^([1-9]{1})(\d{15,20})$/;
    var cardId = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if(!mblReg.test(obj.$("#mblNo").val())){
        jyDialog({"type":"warn"}).alert("请填写正确手机号");
        return;

    }
    if(!bankReg.test(obj.$("#bankCard").val())){
        jyDialog({"type":"warn"}).alert("请填写正确银行卡号");
        return;

    }
    if(obj.$("#idType").val()=='1'){
        if(!cardId.test(obj.$("#cardId").val())){
            jyDialog({"type":"warn"}).alert("请填写正确身份证号");
            return;
        }
    }
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addLeave"))) return;
	var params=obj.$("#addLeave").serialize();
	var url=contextRootPath+'/laTStoreWithdrawals/insertLaTStoreWithdrawals?acctAmount='+acctAmount;
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                dialogAddObj1.close();
        		queryData();
        	}
  	});
}

//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var listStat = iframe.iframeObj["table"].getSelectedObjs("listStat");

	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	//只能删除初始数据
    if(listStat != "01"){
        jyDialog({"type":"info"}).alert("只能删除初始数据！");
        return;
    }
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/laTStoreWithdrawals/deleteLaTStoreWithdrawals?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
	   },"确认提示");
}
//申请页面查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTStoreWithdrawals/prepareExecute/toView?id='+vId,
			'width':1100,
			'height':600,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


//返回拼好json格式的字符串
function toArray(str)
{
    var list = str.split("&");
    var myStr = "{";
    for(var i=0;i<list.length;i++)
    {
        try{
            var keys = list[i].split("=");
            var key = Trim(keys[0]);
            var value= Trim(keys[1]);
            if(i>0)
            {
                myStr += ",";
            }
            myStr += "\""+key+"\":\""+value+"\"";
        }catch(e)
        {
            continue;
        }
    }
    myStr += "}";
    return myStr;
}
//替换掉字符串中头尾的空格
function Trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
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
        'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=37",
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
    var  url = contextRootPath+"/laTImageBizAss/checkUpload?listId="+obj["listId"] + "&listType=37";
    debugger
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
    var url =contextRootPath+"/jbpmWithdrawals/withdrawalsWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids;
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