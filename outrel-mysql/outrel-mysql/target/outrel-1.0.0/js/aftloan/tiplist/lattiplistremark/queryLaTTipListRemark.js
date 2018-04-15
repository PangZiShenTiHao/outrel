//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(contractId,id){
	var dialogStruct={
		'display':contextRootPath+'/laTTipListRemark/prepareExecute/toAdd?contractId='+contractId+'&id='+id,
		'width':800,
		'height':600,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}

function checkForm(obj){
	var func = obj.$("input[name='func']:checked").val();
	var relation = obj.$("input[name='relation']:checked").val();
	var custName = obj.$("#dtocustName").val();
	var phone = obj.$("#dtophone").val();
	var promptResult = obj.$("input[name='promptResult']:checked").val();
	var note = obj.$("#dtonote").val();
	
	var realRepayments = obj.$("input[name='realRepayments']:checked").val();
	var dialUp = obj.$("input[name='dialUp']:checked").val();
	var shouldRepayAmount = obj.$("#dtoshouldRepayAmount").val();
	var promiseRepayDate = obj.$("#dtopromiseRepayDate").val();
	var promiseRepayAmount = obj.$("#dtopromiseRepayAmount").val();
	
	if(isNull(func) || func == undefined ){
		jyDialog({"type":"warn"}).alert("温提途径不能为空！");
		return false;
	}
	if(isNull(relation) || relation == undefined){
		jyDialog({"type":"warn"}).alert("与客户关系不能为空！");
		return false;
	}
	if(isNull(custName)){
		jyDialog({"type":"warn"}).alert("温提联系对象不能为空！");
		return false;
	}
	if(isNull(phone)){
		jyDialog({"type":"warn"}).alert("联系电话不能为空！");
		return false;
	}
	/*if(!checkMobile(phone)){
		jyDialog({"type":"warn"}).alert("联系电话格式错误，请重新输入！");
		return false;
	}*/
	if(isNull(realRepayments) || realRepayments == undefined ){
		jyDialog({"type":"warn"}).alert("是否为实际还款人不能为空！");
		return false;
	}
	if(!isNull(func) && func != undefined && "1" == func){ //1 代表的是电话
		if(isNull(dialUp) || dialUp == undefined ){
			jyDialog({"type":"warn"}).alert("拨通情况不能为空！");
			return false;
		}
	}
	if(isNull(promptResult) || promptResult == undefined){
		jyDialog({"type":"warn"}).alert("温提结论不能为空！");
		return false;
	}
	if(isNull(note)){
		jyDialog({"type":"warn"}).alert("备注不能为空！");
		return false;
	}
	if(!isNull(promptResult) && promptResult != undefined && '8' == promptResult){
		if(isNull(shouldRepayAmount)){
			jyDialog({"type":"warn"}).alert("应还金额不能为空！");
			return false;
		}
		if(isNull(promiseRepayDate)){
			jyDialog({"type":"warn"}).alert("承诺还款时间不能为空！");
			return false;
		}
		if(isNull(promiseRepayAmount)){
			jyDialog({"type":"warn"}).alert("承诺还款金额不能为空！");
			return false;
		}
		if(Number(shouldRepayAmount) <= 0){
			jyDialog({"type":"warn"}).alert("该期已还清！");
			return false;
		}
		if(Number(shouldRepayAmount) < Number(promiseRepayAmount)){
			jyDialog({"type":"warn"}).alert("承诺还款金额不能大于应还金额！");
			return false;
		}
	}
	
	return true;
}

//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkForm(obj)){
		return ;
	} 

	//add at 170718 start 若选择的是承诺还款，添加前进行校验。还要进行划扣，保存到表 la_t_promrepayment。
	var promptResult = obj.$("input[name='promptResult']:checked").val();
	var fkPromrepaymentId= "";
	if(!isNull(promptResult) && promptResult != undefined && '8' == promptResult){
		var falg = false;
		var errmsg = "";
		var contractNO = obj.$("input[name='contractId']").val();
		//判断合同是否可以月承诺还款
		var url = contextRootPath+"/laTPromrepayment/checkMonthlyPromrepayment?contractCode="+contractNO;
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
		var params=$(obj.$("#addTipListRemarkFormData")).serialize();
		url=contextRootPath+'/laTPromrepayment/insertLaTMonthlyPromrepayment';
		//通过ajax保存
		$.ajax({
			type:"POST",
			url:url,
			async:false,
			data:params,
			success:function(data){
				var msg = $.parseJSON(data);
				//新增成功后，
				//$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					fkPromrepaymentId = msg.data.id;
					//errmsg = msg.msg;
				}
			}
		})
	}
	//add at 170718 end
	
	//序列化 新增页面的form表单数据
	var params=obj.$("#addTipListRemarkFormData").serialize();
	var url=contextRootPath+'/laTTipListRemark/insertLaTTipListRemark?fkPromrepaymentId='+fkPromrepaymentId;
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
        		dialogAddObj.close();
        		queryDataRemark();
        	}
  	});
}


function timer(time) {
    var btn = $("#sendButton");
    btn.attr("disabled", true);  //按钮禁止点击
    btn.val(time <= 0 ? "提交" : ("" + (time) + "秒后可提交"));
    var hander = setInterval(function() {
        if (time <= 0) {
            clearInterval(hander); //清除倒计时
            btn.val("提交");
            btn.attr("disabled", false);
            return false;
        }else {
            btn.val("" + (time--) + "秒后可提交");
        }
    }, 1000);
}


//新增页面的保存操作
function addFrom(){
	//序列化 新增页面的form表单数据
	if(!checkForm(this)){
		return ;
	} 

	//序列化 新增页面的form表单数据
	var params=$("#addTipListRemarkFormDataTemp").serialize();
	var url=contextRootPath+'/laTTipListRemark/insertLaTTipListRemark';
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
        		timer(5);
        		queryDataRemark();
        	}
  	});
}

//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择最新数据进行修改！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}
	
	var contract_id = "";
	//判断温提备注是否为最新记录
	var  url = contextRootPath+"/laTTipListRemark/checkLaTTipListRemark?id="+v_ids;
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
			}else{
				contract_id = msg.data;
			}
		}
	})
	if(falg){
		jyDialog({"type":"warn"}).alert(errmsg);
		 return ; 
	}
	
	var dialogStruct={
			'display':contextRootPath+'/laTTipListRemark/prepareExecute/toUpdate?id='+v_ids+'&contractId='+contract_id,
			'width':800,
			'height':600,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	if(!checkForm(obj)){
		return ;
	} 
	//add at 170718  修改增加判断 start
	var promptResult = obj.$("input[name='promptResult']:checked").val();
	var remarkPromptResult = obj.$("input[name='remarkPromptResult']").val();//修改前的温提结论
	var fkPromrepaymentId = obj.$("input[name='fkPromrepaymentId']").val();//承诺月还表的主键ID
	var listStat = "";
	
	//由承诺还款，修改为承诺还款。
	if(!isNull(promptResult) && '8' == promptResult && !isNull(remarkPromptResult) && '8' == remarkPromptResult ){
		url=contextRootPath+'/laTPromrepayment/queryListLaTPromrepayment';
		//通过ajax保存
		$.ajax({
			type:"POST",
			url:url,
			async:false,
			data:{id:fkPromrepaymentId},
			success:function(data){
				var msg = $.parseJSON(data);
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					var obj = msg.data;
					listStat = obj[0].listStat;
				}
			}
		})
		//alert("fkPromrepaymentId1 = "+fkPromrepaymentId);
		//判断是否已经进行，若 la_t_promrepayment 中的 list_stat 不是初始录入，则禁止修改。
		if(!isNull(listStat) && '01' != listStat){
			jyDialog({"type":"info"}).alert("只有当承诺月还在初始状态下才可以修改！");
			return;
		}else{
			//alert("fkPromrepaymentId2 = "+fkPromrepaymentId);
			//更新重新输入的承诺还款时间与承诺还款金额
			url=contextRootPath+'/laTPromrepayment/updateLaTMonthlyPromrepayment';
			//通过ajax保存
			$.ajax({
				type:"POST",
				url:url,
				async:false,
				data:{id:fkPromrepaymentId,proTime:$("#dtoproTime").val(),proAmount:$("#dtoproAmount").val()},
				success:function(data){
					var msg = $.parseJSON(data);
					$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
				}
			})
		}
	}
	
	//由承诺还款，修改为非承诺还款。
	if(!isNull(promptResult) && '10' == promptResult && !isNull(remarkPromptResult) && '8' == remarkPromptResult ){
		url=contextRootPath+'/laTPromrepayment/queryListLaTPromrepayment';
		//通过ajax保存
		$.ajax({
			type:"POST",
			url:url,
			async:false,
			data:{id:fkPromrepaymentId},
			success:function(data){
				var msg = $.parseJSON(data);
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					var obj = msg.data;
					listStat = obj[0].listStat;
				}
			}
		})
		//判断是否已经进行，若 la_t_promrepayment 中的 list_stat 不是初始录入，则禁止修改。
		if(!isNull(listStat) && '01' != listStat){
			jyDialog({"type":"info"}).alert("只有当承诺月还在初始状态下才可以修改！");
			return;
		}else{
			//删除初始状态的承诺月还记录
			url=contextRootPath+'/laTPromrepayment/deleteLaTPromrepayment';
			//通过ajax保存
			$.ajax({
				type:"POST",
				url:url,
				async:false,
				data:{ids:fkPromrepaymentId},
				success:function(data){
				}
			})
		}
	}
	
	//由非承诺还款，修改为承诺还款。则需要插入表 la_t_promrepayment。
	if(!isNull(promptResult) && '8' == promptResult && !isNull(remarkPromptResult) && '10' == remarkPromptResult ){
		var falg = false;
		var errmsg = "";
		var contractNO = obj.$("input[name='contractId']").val();
		//判断合同是否可以月承诺还款
		var url = contextRootPath+"/laTPromrepayment/checkMonthlyPromrepayment?contractCode="+contractNO;
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
		var params=$(obj.$("#updateTipListRemarkFormData")).serialize();
		url=contextRootPath+'/laTPromrepayment/insertLaTMonthlyPromrepayment';
		//通过ajax保存
		$.ajax({
			type:"POST",
			url:url,
			async:false,
			data:params,
			success:function(data){
				var msg = $.parseJSON(data);
				//新增成功后，
				//$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					fkPromrepaymentId = msg.data.id;
					//errmsg = msg.msg;
				}
			}
		})
	}
	
	//add at 170718  修改增加判断 end
	
	var params=obj.$("#updateTipListRemarkFormData").serialize();
	var url=contextRootPath+'/laTTipListRemark/updateLaTTipListRemark?fkPromrepaymentId='+fkPromrepaymentId;
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
        		dialogUpdateObj.close();
        		queryDataRemark();
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
            url:contextRootPath+"/laTTipListRemark/deleteLaTTipListRemark?ids="+v_ids,
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
			'display':contextRootPath+'/laTTipListRemark/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


//上传文件
function toUploadFile(){
	//getValueForIndex("listStat",);
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请先选择一条数据！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=34",
			'width':1000,
			'height':600,
			'title':'上传',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}