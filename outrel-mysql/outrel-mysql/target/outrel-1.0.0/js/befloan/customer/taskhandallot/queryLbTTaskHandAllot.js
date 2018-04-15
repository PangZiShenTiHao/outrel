//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
var rollSelectObj;
function toAddData(){
	rollSelectObj = iframe.iframeObj["table"].getSelectedObjs();
	var rollids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(rollids == ""){
		jyDialog({"type":"info"}).alert("请选择需要转出的数据！");
		return;
	}
	//如果选择多个 择提示
	if(rollids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
		'display':contextRootPath+'/handTask/prepareExecute/toAdd?assignee='+rollids,
		'width':1200,
		'height':500,
		'title':'将转出笔数据确认',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
var rollCount;//转出笔数
var rollidf = "";
var rollName;
function doAddFrom(){
	debugger;
	rollidf = iframe.iframeObj["table"].getSelectedIds().join(",");
	rollName = iframe.iframeObj["table"].getSelectedObjs()[0].userName;
	var curOwner = iframe.iframeObj["table"].getSelectedObjs()[0].curOwner;
	var obj = dialogAddObj.getIframe();
	rollCount=obj.$("#rollofTime").val();
	var joinCounts=obj.$("#joinCounts").val();
	var minAppAmount=obj.$("#minAppAmount").val();
	var maxAppAmount=obj.$("#maxAppAmount").val();
	var applyPeriod=obj.$("#applyPeriod").val();
	var apprProductName=obj.$("#apprProductName").val();
	
	var expa = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
	var expd = /^[0-9]*[1-9][0-9]*$/;
	
    if($.trim(minAppAmount)!=''&&!expa.test(minAppAmount)){
	    alert('申请金额输入有误，请重新输入！');
	    return;
	  }
    if($.trim(maxAppAmount)!=''&&!expa.test(maxAppAmount)){
    	alert('申请金额输入有误，请重新输入！');
    	return ;
    }
    if($.trim(applyPeriod)!=''&&!expd.test(applyPeriod)){
    	alert('申请期限必须为整数型的数字，请重新输入！');
    	return ;
    }
    if(!expd.test(rollCount)){
    	alert('（可/将）转出笔数必须为整数型的数字，请重新输入！');
    	return;
    }
    if(parseInt(rollCount)>parseInt(joinCounts)){
    	alert('（可/将）转出笔数不能超过与之匹配的笔数！');
    	return;
	}
	
   //$("#maindiv").html("<label font-family: '微软雅黑','宋体',Arial,sans-serif>"+"转出人："+rollSelectObj[0].userName+" ，转出笔数为："+ rollCount +"</label>");
   //$("#maindiv").show();
	
	$.ajax({
        type:"POST",
        async:true,
        url:contextRootPath+"/handTask/setThreadLocalMap?userName="+rollSelectObj[0].userName+"&rollid="+rollidf+"&rollCount="+rollCount+"&apprProductName="+apprProductName+"&curOwner="+curOwner,
        success:function(msg){
			jyDialog({"type":"info"}).alert("转出人："+rollSelectObj[0].userName+" ，转出笔数为："+ rollCount+" ，请选择'转入对象及转入笔数'将做转入操作 ！");
        	dialogAddObj.close();
        	queryData();
        }
    });
	
	
	
}

function resetData(){
	$.ajax({
        type:"POST",
        async:true,
        url:contextRootPath+"/handTask/setThreadLocalMap?reset=1&rollid="+rollidf,
        success:function(msg){
        	queryData();
        }
    });
}

//修改 事件
function toUpdateData(){
	debugger;
	if(window.confirm('请确认是否进行转入操作吗？')){
	
		var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
		//如果没有选中 数据则
		if(v_ids == ""){
			jyDialog({"type":"info"}).alert("请选择待修改的数据！");
			return false;
		}
		if(rollidf == ""||typeof(rollidf) == "undefined"){
			jyDialog({"type":"info"}).alert("请选择需要转出的数据！");
			return false;
		}
		
		if($.inArray(rollidf,  v_ids.split(",")) !=-1){
			jyDialog({"type":"info"}).alert("对不起，将要转出的记录不能出现在要转入里面！");
			return false;
		}
		var joinObjs = iframe.iframeObj["table"].getSelectedObjs();
		var datas = new Array();
		var joinCount = 0;
		$(joinObjs).each(function (index, objs) {
				if(objs.joinCount!=null&&objs.joinCount!=""){
					datas.push(objs);
					joinCount += parseInt(objs.joinCount);
				}
			});
		var expd = /^[1-9]*[1-9][0-9]*$/;
		if(!expd.test(joinCount)){
			alert('转入笔数为大于0的正整数，请重新输入！');
			queryData();
		    return false;
		}
		if(parseInt(rollCount)<joinCount){
			jyDialog({"type":"info"}).alert("对不起，将要转入的记录不能超过转出的笔数！");
			return false;
		}
		
		$.ajax({
            type:"POST",
            async:true,
            url:contextRootPath+"/handTask/taskHandelAllotJoin?data="+JSON.stringify(datas)+"&rollCount="+rollCount+"&rollid="+rollidf+"&rollName="+rollName,
            success:function(msg){
            	var datas = $.parseJSON(msg);
            	var v_status = datas.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		jyDialog({"type":"info"}).alert(datas.msg);
            		queryData();
            	}
            	
            	
            }
        });
		
	
	}
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTRevolvingLog/updateLbTRevolvingLog';
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
            url:contextRootPath+"/lbTRevolvingLog/deleteLbTRevolvingLog?ids="+v_ids,
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
			'display':contextRootPath+'/lbTRevolvingLog/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}