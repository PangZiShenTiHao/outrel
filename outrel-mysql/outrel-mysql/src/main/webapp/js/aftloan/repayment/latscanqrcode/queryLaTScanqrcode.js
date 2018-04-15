//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
var addDlg2;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTScanqrcode/prepareExecute/toAdd',
		'width':1000,
		'height':600,
		'title':'申请还款',
		'buttons':[
         {'text':'下一步','action':openNextPage,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}

//下一步
function openNextPage(){
	var selectIds = dialogAddObj.getIframe().getSelectedIds().join(",");
	//如果没有选中 数据则
	if(selectIds == ""){
		jyDialog({"type":"info"}).alert("请先选择一条数据！");
		return;
	}
	//如果选择多个 择提示
	if(selectIds.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("只能选择一条数据！");
		return;
	}
	var contractId = dialogAddObj.getIframe().getSelectedObjss('contractId');
	var shouldAmount = dialogAddObj.getIframe().getSelectedObjss('shouldAmount');
	var state = dialogAddObj.getIframe().getSelectedObjss('state');
	var curRepayMoney = dialogAddObj.getIframe().getSelectedObjss('curRepayMoney');
	var overdueDebtAmount = dialogAddObj.getIframe().getSelectedObjss('overdueDebtAmount');
	var curRepayOverdueSum = dialogAddObj.getIframe().getSelectedObjss('curRepayOverdueSum');
	
	//add at 170921  根据合同中的合作机构编号，判断是否是信托类合同
	var flag = false;
	$.ajax({
        type:"POST",
        url:contextRootPath+"/aftloanqueryDate/checkIsEntrust?contractId="+contractId,
        dataType:"json",
        async:false,
        success:function(msg){
            var v_status = msg.status;
            if((v_status.indexOf('ok') >-1 && msg.msg != null && msg.msg != '') || v_status.indexOf('ok') <=-1){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	flag = true;
            }
        }
    });
	if(flag) return;
	
	//打开新增界面
	var url = contextRootPath
			+ '/laTScanqrcode/prepareExecute/toNext?contractId=' + contractId + '&shouldAmount=' + shouldAmount + '&state=' + state
			+ '&curRepayMoney=' + curRepayMoney + '&overdueDebtAmount='
			+ overdueDebtAmount + '&curRepayOverdueSum=' + curRepayOverdueSum;
	var dialogStruct={
			'display':url,
			'width':500,
			'height':320,
			'title':'还款',
			'buttons':[
	         {'text':'申请','action':doAddFrom}
			]
		};
		
	 addDlg2 =jyDialog(dialogStruct);
	 addDlg2.open();
}

//新增页面的保存操作
function doAddFrom(){
	var obj = addDlg2.getIframe();
	//校验表单数据
//	if(!checkIsNull(obj.$("#addNewsFormData")))
	var repaymentWay = obj.$("input[name='repaymentWay']:checked").val();
	if(isNull(repaymentWay) || repaymentWay == undefined ){
        jyDialog({"type":"warn"}).alert("支付方式不能为空！");
        return;
    }
	/*if(obj.$("#dtorepaymentType").val()==''){
		jyDialog({"type":"warn"}).alert("还款业务类型不能为空！");
		return;
	}*/
	if(obj.$("#dtopayChannel").val()==''){
    	jyDialog({"type":"warn"}).alert("支付渠道不能为空！");
    	return;
    }
	var repayAmount = obj.$("#dtorepayAmount").val();
    if(repayAmount ==''){
        jyDialog({"type":"warn"}).alert("申请金额不能为空！");
        return;
    }
    if(!(/^\d+(\.\d+)?$/.test(repayAmount))){
	    jyDialog({"type":"warn"}).alert("申请金额只能填写整数或小数！");
	    return;
	}
    if(Number(repayAmount) < 0){
    	jyDialog({"type":"warn"}).alert("申请金额不能小于 0！");
    	return;
    }
    if(!/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test(repayAmount)){
    	jyDialog({"type":"warn"}).alert("申请金额最多只能两位小数！");
    	return;
    }
    if(Number(repayAmount) < 10){
    	jyDialog({"type":"warn"}).alert("申请金额不能小于10元！");
    	return;
    }
    var intNum = repayAmount.split(".");
    if(intNum[0].length > 13){
    	jyDialog({"type":"warn"}).alert("申请金额整数位数不能多于13位！");
    	return;
    }

    //判断金额开始
    var shouldAmount = obj.$("input[name='shouldAmount']").val();//应还款金额
    var state = obj.$("input[name='state']").val();//合同状态
    var curRepayMoney = obj.$("input[name='curRepayMoney']").val(); //月还金额
    var overdueDebtAmount = obj.$("input[name='overdueDebtAmount']").val();//逾期欠款总额
    var curRepayOverdueSum = obj.$("input[name='curRepayOverdueSum']").val();//月还金额+逾期欠款总额

    if(Number(repayAmount) > Number(shouldAmount)){
    	jyDialog({"type":"info"}).alert("申请金额不能超过应还款金额");
		return;
    }
    //正常状态的合同
    if('09' == state){
    	if(Number(repayAmount) > Number(curRepayMoney)){
    		jyDialog({"type":"question"}).confirm("申请金额大于当期月还金额，是否继续操作？",function(){
        		saveInsertData();
        	},"确认提示");
    	}else{
    		saveInsertData();
    	}
    	return;
    }
    //逾期状态的合同
    if('10' == state){
    	if(Number(repayAmount) > Number(curRepayOverdueSum)){
    		jyDialog({"type":"question"}).confirm("申请金额大于当期应还金额，是否继续操作？",function(){
    			saveInsertData();
    		},"确认提示");
    	}else{
    		saveInsertData();
    	}
    	return;
    }
    //判断金额结束
}

//新增保存方法
function saveInsertData(){
	var obj = addDlg2.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTScanqrcode/insertLaTScanqrcode';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				addDlg2.close();
				dialogAddObj.close();
				queryData();
			}
	});
}

//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/laTScanqrcode/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/laTScanqrcode/updateLaTScanqrcode';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/laTScanqrcode/deleteLaTScanqrcode?ids="+v_ids,
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
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTScanqrcode/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//查看二维码
function viewCode(){
	var v_ids = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待查看的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}
	if(v_ids[0].state != '0' && v_ids[0].state != '1'){
		jyDialog({"type":"info"}).alert("只有支付中、支付成功状态的记录才可以查看");
		return;
	}
	var url= v_ids[0].qrImageUrl ; //转向网页的地址; 
    var iWidth = 400; //弹出窗口的宽度; 
    var iHeight = 400; //弹出窗口的高度; 
    //获得窗口的垂直位置 
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
    //获得窗口的水平位置 
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
    window.open(url, "newwindow", 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no'); 
}
