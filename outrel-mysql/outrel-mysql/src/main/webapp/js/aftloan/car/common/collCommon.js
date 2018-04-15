
//押品查看
function checkCollInfo(){
	// 后期 把 进件状态 带过来： 在签约中 的就不能修改。chj完善
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	
	//如果没有选中 数据则进行提醒
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待操作的数据！");
		return;
	}
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
//	alert(v_objs.appProductType);
	var intoId = objs[0].intoAppId;
	collateralViel(intoId);
}
//合同查询--押品查看
function latledgerCollInfo(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待查看押品的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("一次只能选择一条数据！");
		return;
	}
	var intoId = iframe.iframeObj["table"].getSelectedObjs()[0].intoCode;
	collateralViel(intoId);
}
//合同审核--押品查看
function penglingAuditContractCollInfo(){
	var v_objs=getObjs2("请选择待查看押品的数据！");
	if(!v_objs){
		return;
	}
	var intoId = v_objs.fkIntoAppId;
	collateralViel(intoId);
}
function collateralViel(intoId){
	$.ajax({
		type:"post",
		dataType:"JSON",
		url:contextRootPath+'/car/prepareExecute/judgeProductType?intoAppId='+intoId,
		success:function(msg){
			if(msg=="Y"){
				//展示押品列表
//				function viewData(vId){
					var dialogStruct={
							'display':contextRootPath +'/car/prepareExecute/collateralViel?intoAppId='+intoId +'&operation=contract',
							'width':1000,
							'height':500,
							'title':'押品列表',
							'buttons':[
							 {'text':'关闭','isClose':true}
							]
					};
						
					var dialogView = jyDialog(dialogStruct).open();
//				}
			}else{
				jyDialog().alert("请选择为抵押贷产品的进件！");
			}
		}
	});
}

//获取选中行的对象
function getObjs2(alertMsg){
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_objs.length == 0){
		$("").newMsg({}).show(alertMsg);
		return;
	}
	//如果选择多个 择提示
	if(v_objs.length > 1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	return v_objs[0];
}

//查看押品详细信息 （调用押品系统URL）
//参数-押品编号    实现方式-弹出新窗口
function viewYpDataByCollCode(collCode){
	 var dialogStruct={
				'display':contextRootPath+'/car/prepareExecute/collateralPage?operation=check&collCode='+collCode,
				'title':'查看押品',
				'width':900,
				'height':750,
				'modal':false,
				'buttons':[
				 {'text':'关闭','isClose':true}
				]
	 };
	 
	 window.top.windowTopDialog(dialogStruct);
}

//获得系统当前日期 例:2015-07-21
function getNowDate(){
	var now = new Date();
	var nowdate = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
	return nowdate;
}

//获得两个日期之间的天数(传入日期格式 字符串类型 例:2015-07-21)
function getDateDiff(beforeDay,nowDate){
	var arr1=beforeDay.split('-'); 
	var arr2=nowDate.split('-'); 
	var d1=new Date(arr1[0],arr1[1],arr1[2]); 
	var d2=new Date(arr2[0],arr2[1],arr2[2]); 
	return (d2.getTime()-d1.getTime())/(1000*3600*24);
}


//判断该进件是否为车贷(flag="Y" 表示为车贷产品)
function isCarLoan(intoId){
	var flag;
	$.ajax({
		type:"post",
		async:false,
		dataType:"JSON",
		url:contextRootPath+'/car/prepareExecute/judgeProductType?intoAppId='+intoId,
		success:function(msg){
		flag = msg;
		}
	});
	return flag;
}
//判断该进件是否为车贷(flag=true 表示为车贷产品)
function checkIfCarLoanByProType(intoId){
	var flag;
	$.ajax({
		type:"post",
		async:false,
		dataType:"JSON",
		url:contextRootPath+'/car/prepareExecute/checkIfCarLoanByProType?intoAppId='+intoId,
		success:function(msg){
		flag = msg;
		}
	});
	return flag;
}