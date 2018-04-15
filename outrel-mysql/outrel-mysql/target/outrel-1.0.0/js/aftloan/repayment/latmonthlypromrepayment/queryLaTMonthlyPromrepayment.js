//utf-8
//点击新增按钮 事件跳转至 新增页面
var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
var dialogUpdate;
function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=backfund',
			'width':1100,
			'height':750,
			'title':'查询合同信息',
			'buttons':[
			  {'name':'nextBtn','text':'下一步','action':openNextPage},
			  {'text':'关闭','isClose':true}
			]
		};
	addDlg1=jyDialog(dialogStruct);
	addDlg1.open();
}

//下一步
function openNextPage(){
	var selectIds = addDlg1.getIframe().getSelectedIds().join(",");
	//如果没有选中 数据则
	if(selectIds == ""){
		jyDialog({"type":"warn"}).alert("请先选择一条数据！");
		return;
	}
	//如果选择多个 择提示
	if(selectIds.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("只能选择一条数据！");
		return;
	}
	var obj=addDlg1.getIframe().getSelectedObjs2();
	var contractNO=obj.contractCode;
	//判断合同是否可以月承诺还款
	var  url = contextRootPath+"/laTPromrepayment/checkMonthlyPromrepayment?contractCode="+contractNO;
	var falg = false;
	var errmsg = "";
	$.ajax({
		type:"POST",
		url:url,
		async:false,
		success:function(data){
			var msg = $.parseJSON(data);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') <=-1){
        		errmsg = msg.msg;
        		falg = true;
			}
		}
	})
	if(falg){
		jyDialog({"type":"warn"}).alert(errmsg);
		 return ; 
	}
	//关闭查询界面
	addDlg1.close();
	var selectObj = addDlg1.getIframe().getSelectedObjs();
	//打开新增界面
	var url=contextRootPath+'/laTPromrepayment/prepareExecute/toAddNext?'+selectObj;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增月承诺还款信息',
			'buttons':[
             {'text':'上一步','action':openPrevPage},
	         {'text':'保存','action':doAddFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	 addDlg2 =jyDialog(dialogStruct);
	 addDlg2.open();
}
//上一步
function openPrevPage() {
	addDlg2.close();
	toAddData();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$(addDlg2.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var url=contextRootPath+'/laTPromrepayment/insertLaTMonthlyPromrepayment';
	
	var dtoproAmount = $(addDlg2.iframe.contentDocument.getElementById("dtoproAmount")).val();
	var dtocurRepayMoney = $(addDlg2.iframe.contentDocument.getElementById("dtocurRepayMoney")).val();//月还款
	var dtosuspendAmount = $(addDlg2.iframe.contentDocument.getElementById("dtosuspendAmount")).val();//挂账
	var dtoactualRepayAmount = $(addDlg2.iframe.contentDocument.getElementById("dtoactualRepayAmount")).val();//实还
	
	var dtorepayDay = $(addDlg2.iframe.contentDocument.getElementById("dtorepayDay")).val();//月还款日
	var dtoproTime = $(addDlg2.iframe.contentDocument.getElementById("dtoproTime")).val();//承诺还款日期
	
	var amount = Number(dtocurRepayMoney)-Number(dtosuspendAmount)-Number(dtoactualRepayAmount);
	amount = amount.toFixed(2);
	if(dtoproTime == null){
		jyDialog({"type":"warn"}).alert("承诺还款日期不能为空！");
		return;
	}
	if(!checkAmount(dtoproAmount)){
		jyDialog({"type":"warn"}).alert("承诺还款金额格式不正确！");
		return;
	}
	if(Number(dtosuspendAmount)>=Number(dtocurRepayMoney)){
		jyDialog({"type":"warn"}).alert("挂账金额大于或等于月还款金额，无法此操作！");
		return;
	}
	if(Number(dtoproAmount) <= 0){
		jyDialog({"type":"warn"}).alert("承诺还款金额需大于0！");
		return;
	}
	if(amount>=100 && Number(dtoproAmount)<100){
		jyDialog({"type":"warn"}).alert("承诺还款金额必须大于或等于100元！");
		return;
	}
	if(amount<100 && Number(dtoproAmount)!=amount){
		jyDialog({"type":"warn"}).alert("本期剩余月还金额 小于100元，承诺还款金额必须等于剩余月还金额！");
		return;
	}
	if(Number(dtoproAmount)>amount){
		jyDialog({"type":"warn"}).alert("承诺还款金额必须小于等于月还款金额和挂账金额之差！");
		return;
	}
	
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        		addDlg2.close();
        	}
  	});
}

function checkAmount(value){
	if((value+"").length<1){
		return false;
	}
	var patrn=/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
	if(patrn.test(value)){
		return true;
	}else{
		return false;
	}
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	var obj=iframe.iframeObj["table"].getSelectedObjs();
	var listStat=obj[0].listStat;
	if(listStat != "01"){
		jyDialog({"type":"warn"}).alert("该承诺还款不允许修改！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/laTPromrepayment/prepareExecute/toUpdate?id='+v_ids,
			'width':1100,
			'height':750,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	var url=contextRootPath+'/laTPromrepayment/updateLaTMonthlyPromrepayment';
	var dtoproAmount = $(dialogUpdate.iframe.contentDocument.getElementById("dtoproAmount")).val();
	var dtocurRepayMoney = $(dialogUpdate.iframe.contentDocument.getElementById("dtocurRepayMoney")).val();//月还款
	var dtosuspendAmount = $(dialogUpdate.iframe.contentDocument.getElementById("dtosuspendAmount")).val();//挂账
	
	var dtorepayDay = $(dialogUpdate.iframe.contentDocument.getElementById("dtorepayDay")).val();//月还款日
	var dtoproTime = $(dialogUpdate.iframe.contentDocument.getElementById("dtoproTime")).val();//承诺还款日期
	
	//var amount = Number(dtocurRepayMoney)-Number(dtosuspendAmount);
	var amount = accSub(dtocurRepayMoney,dtosuspendAmount);
	if(dtoproTime == null){
		jyDialog({"type":"warn"}).alert("承诺还款日期不能为空！");
		return;
	}
	if(!checkAmount(dtoproAmount)){
		jyDialog({"type":"warn"}).alert("承诺还款金额格式不正确！");
		return;
	}
	if(Number(dtoproAmount) <= 0){
		jyDialog({"type":"warn"}).alert("承诺还款金额需大于0！");
		return;
	}
	if(Number(dtoproAmount)>amount){
		jyDialog({"type":"warn"}).alert("承诺还款金额必须小于等于月还款金额和挂账金额之差！");
		return;
	}
	if(amount>=100 && Number(dtoproAmount)<100){
		jyDialog({"type":"warn"}).alert("承诺还款金额必须大于或等于100元！");
		return;
	}
	if(amount<100 && Number(dtoproAmount)!=amount){
		jyDialog({"type":"warn"}).alert("承诺还款金额必须等于月还款金额和挂账金额之差！");
		return;
	}
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(data){
			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(data.msg);
			var v_status = data.status;
        	if(v_status.indexOf('ok') >-1){
        		//修改成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        		dialogUpdate.close();
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待取消的数据！");
		return;
	}
	var obj=iframe.iframeObj["table"].getSelectedObjs();
	var listStat=obj[0].listStat;
	if(listStat != "01"){
		jyDialog({"type":"warn"}).alert("该承诺还款不允许取消！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要取消选择的数据吗？",function(){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/laTPromrepayment/deleteLaTPromrepayment?ids="+v_ids,
            success:function(data){
            	var msg = $.parseJSON(data);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		$("").newMsg({}).show(msg.msg);
            		queryData();
            	}else{
            		jyDialog({"type":"warn"}).alert(msg.msg);
            	}
            	
            	
            }
        });
    },"确认提示");
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTPromrepayment/prepareExecute/toView?id='+vId,
			'width':900,
			'height':600,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function isStartEndDate(startTime,endTime){
	startTime = startTime.replace(/-/g, "/");
    endTime = endTime.replace(/-/g, "/");
    startTime = new Date(startTime);
    endTime = new Date(endTime);

    var days= endTime.getTime() - startTime.getTime(); 
    
    if(days<0)
    {
        return false;
    }
    else 
        return true;
}


/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1减去arg2的精确结果
 **/
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); 
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}