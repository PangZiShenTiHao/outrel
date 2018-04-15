//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTSignLimit/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'签约管理限制配置',
		'buttons':[
         {'text':'保存','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!obj.ckData()){
		return;
	}
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTSignLimit/insertLbTSignLimit';
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
			'display':contextRootPath+'/lbTSignLimit/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改签约限制配置',
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
	//序列化 新增页面的form表单数据
	if(!obj.ckData()){
		return;
	}
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTSignLimit/updateLbTSignLimit';
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
        		queryData();
        	}
  	});
}
//修改数据的有效性
function resetState(isState){
	var obj = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(obj == ""){
		jyDialog({"type":"info"}).alert("请选择需要修改的数据");
		return;
	}else{
		if(obj[0].isState==isState){
			if(isState=='0'){
				jyDialog({"type":"info"}).alert("该数据已无效,无需设置");
				return;
			}else if(isState=='1'){
				
				jyDialog({"type":"info"}).alert("该数据已有效,无需设置");
				return;
			}
		}
	}
	jyDialog({"type":"question"}).confirm("您确认要修改数据的有效性吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTSignLimit/updateLbTSignLimitState?id="+obj[0].id+"&isState="+isState,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//修改状态成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            	
            	
            }
        });
	   },"确认提示");
}
/**
 * 选择每天或指定日期时
 * @param dateType
 */
function ckLimitType(dateType){
		var obj=document.getElementsByName('limitDateType');
		 if(dateType=='everyDate'){//每天
			$("#specDate").attr("checked",false);
			$("#everyDate").attr("checked",true);
			$("#limitTimesStart1,#limitTimesEnd1").attr("disabled",false);
			$("#limitTimesStart2,#limitTimesEnd2").attr("disabled",true);
			$("#limitTimesStart2,#limitTimesEnd2").val("");
			for(var i=0;i<obj.length-1;i++){
				$("#limitDateType"+i).attr("disabled",true);
				$("#limitDateType"+i).attr("checked",false);
			}
		}else if(dateType=='specDate'){//指定日期
			$("#everyDate").attr("checked",false);
			$("#specDate").attr("checked",true);
			for(var i=0;i<obj.length-1;i++){
				$("#limitDateType"+i).attr("disabled",false);
			}
			$("#limitTimesStart2,#limitTimesEnd2,#limitDateType").attr("disabled",false);
			$("#limitTimesStart1,#limitTimesEnd1").attr("disabled",true);
			$("#limitTimesStart1,#limitTimesEnd1").val("");
		}
};
/**
 * 新增和修改共用使用的表单验证
 * @returns {Boolean}
 */
function ckData(){
	if($("#limitTimesStart1").attr("disabled")=="disabled"){
		var limitTimesStart2=$("#limitTimesStart2").val();
		var limitTimesEnd2=$("#limitTimesEnd2").val();
		var limitDateType=$("input[name='limitDateType']");
		if(!ckCheckBox(limitDateType.length-1,'limitDateType')){
			jyDialog({"type":"info"}).alert("请选择指定日期！");
			return false;
		}
		if(!limitTimesStart2){
			jyDialog({"type":"info"}).alert("请选择限制开始时间！");
			return false;
		}
		if(!limitTimesEnd2){
			jyDialog({"type":"info"}).alert("请选择限制结束时间！");
			return false;
		}
		if(limitTimesStart2>=limitTimesEnd2){
			jyDialog({"type":"info"}).alert("限制结束时间必须大于限制开始时间！");
			return false;
		}
	}else if($("#limitTimesStart2").attr("disabled")=="disabled"){
		var limitTimesStart1=$("#limitTimesStart1").val();
		var limitTimesEnd1=$("#limitTimesEnd1").val();
		if(!limitTimesStart1){
			jyDialog({"type":"info"}).alert("请选择限制开始时间！");
			return false;
		}
		if(!limitTimesEnd1){
			jyDialog({"type":"info"}).alert("请选择限制结束时间！");
			return false;
		}
		
		if(limitTimesStart1>=limitTimesEnd1){
			jyDialog({"type":"info"}).alert("限制结束时间必须大于限制开始时间！");
			return false;
		}
	}
	var objRoles=$("input[name='limitRoleCodes']");
	if(!ckCheckBox(objRoles.length,'limitRoleCodes')){
		jyDialog({"type":"info"}).alert("请选择需要限制的角色！");
		return false;
	}
	return true;
}
/**
 * 判断checkBox是否被选中
 */
function ckCheckBox(len,ckBoxId){
	var a=0;
	for(var i=0;i<len;i++){
		if(!document.getElementById(ckBoxId+i).checked){
			a++;
		}
	}
	if(a==len){
		return false;
	}
	return true;
}