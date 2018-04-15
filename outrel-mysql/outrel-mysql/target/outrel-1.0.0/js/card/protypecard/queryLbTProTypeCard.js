//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;

var cards;
var seed = 0;
var seed2 = 0;
var seed3 = 0;
var seed4 = 0;

var isCanHref = true;

function randomFix(){
	return "rid"+(seed2++);
}
function randomFix2(){
	return "pid"+(seed4++);
}
$(function() {
	//initProTypeCardSug(false,null,3);
	//initProTypeCardSug(false,null,4);

	changeTakeInValue('takeIn');
});


function changeTakeInValue(takeInId) {
	if($('#' + takeInId).val() == 0) {
		$('#numUp2').attr("disabled", "disabled");
		$('#numDown2').attr("disabled", "disabled");

		isCanHref = false;
		$("table").find("tr").each(function(){ 
			$(this).find("td").each(function(){
				$(this).find("input").each(function() {
					$(this).attr("disabled", "disabled");
					  removeNullCss($("#"+$(this).attr('id')));
				});
			});
		});
	} else {
		$('#numUp2').removeAttr("disabled");
		$('#numDown2').removeAttr("disabled");

		isCanHref = true;
		$("table").find("tr").each(function(){ 
			$(this).find("td").each(function(){
				$(this).find("input").each(function() {
					$(this).removeAttr("disabled");
				});
			});
		});
		checkedInit();//进行表单验证
	}
}



function takeInSelect(index,flag){
	if(flag){ //disabled="disabled"
		$('#numUp'+index).val();
		$('#numDown'+index).val();
		$('#numUp'+index).prop('disabled','disabled');
		$('#numDown'+index).prop('disabled','disabled');
	}else{
		$('#numUp'+index).prop('disabled',false);
		$('#numDown'+index).prop('disabled',false);
	}
}

function removeCondition(obj){
	if(!isCanHref) {
		return ;
	}
	obj.parent().parent().remove();
}

function updateProTypeAntiFraudDetailNext(obj,randFix){
	$('#numUp'+randFix).val(obj.numUp);
	$('#numDown'+randFix).val(obj.numDown);
	$('#sugMoney'+randFix).val(obj.sugMoney);
	$('#sugTime'+randFix).val(obj.sugTime);
	$('#form_create_Card').form('validate');
}

function addProTypeCardSug(canRemove, obj, flag, count){
	if(!isCanHref) {
		return ;
	}

	if(count > 0 && seed <= count) {
		seed = count;
	} 

	if(count > 0 && seed3 <= count) {
		seed3 = count;
	} 

	var randFix = "";
	var fix = "";
	if(flag == 1 || flag == 2){
		randFix = randomFix();
		fix = "proTypeCardDetailDTOs[0].proTypeCardDetailSugDTOs["+(seed++)+"]";
	}
	else if(flag == 3 || flag == 4){
		randFix = randomFix2();
		fix = "proTypeCardDetailDTOs[2].proTypeCardDetailSugDTOs["+(seed3++)+"]";
	}
	var flagStr = "";
	var sugMemo = '<td align="center"><input id="sugMemo'+randFix+'" type="textarea" name="'+fix+'.sugMemo"  cols="80" style="width: 95%; height: 30px;" maxlength="500"></td>';
	if(flag == 1){
		flagStr = '<td align="center"><input id="sugMoney'+randFix+'" name="'+fix+'.sugMoney"  style="width: 150px" maxlength="20" notNull="true"></td>'+sugMemo
	}else if(flag == 2){
		flagStr = '<td align="center"><input id="sugTime'+randFix+'" name="'+fix+'.sugTime" style="width: 150px"flag="requiredFlag2" maxlength="20"  notNull="true"></td>'+sugMemo
	}else if(flag == 3){
		flagStr = '<td align="center"><input id="sugMoney'+randFix+'" name="'+fix+'.sugMoney"  style="width: 150px" maxlength="20" checktype="number" notNull="true"></td>'
	}else if(flag == 4){
		flagStr = '<td align="center"><input id="sugTime'+randFix+'" name="'+fix+'.sugTime" style="width: 150px"flag="requiredFlag2" maxlength="20" checktype="number" notNull="true"></td>'
	}

	var html = '<tr flag="trFlag">'
		+'<td align="center"><input id="numUp'+randFix+'" name="'+fix+'.numUp" style="width: 100px" notNull="true" checktype="number" ></td>'
		+'<td align="center"><input id="numDown'+randFix+'" name="'+fix+'.numDown" flag="requiredFlag1" style="width: 100px" notNull="true" checktype="number" ></td>'
		+ flagStr
		+'<td align="center"><a id="ah'+randFix+'"  class="easyui-linkbutton" plain="true" icon="icon-remove" style="width: 24px;" onclick="removeCondition($(this));"> 删除 </a></td>'
		+'</tr>';
	$("#insert_pos"+flag).after(html);
	if(obj!=null){//如果原来有数据，就填充;
		updateProTypeAntiFraudDetailNext(obj,randFix);
	}
	checkedInit();
}

function updateProTypeAntiFraudDetailNext(obj,randFix){
	$('#numUp'+randFix).val(obj.numUp);
	$('#numDown'+randFix).val(obj.numDown);
	$('#sugMoney'+randFix).val(obj.sugMoney);
	$('#sugTime'+randFix).val(obj.sugTime);
	$('#form_create_Card').form('validate');
}

function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/lbTProTypeCard/prepareExecute/toAdd',
			'width':800,
			'height':500,
			'title':'新增',
			'buttons':[
			           {'text':'保存','action':doAddFrom,'isClose':true},
			           {'text':'关闭','isClose':true}
			           ]
	};

	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	if($('#cardId').val() == '0') {
		jyDialog().alert('请选择评分卡');
		return ;
	}
	
	if($('#takeIn').val() != '0'){
		if(!validateInfo()){
			return;
		}
	}
   var params=$("#form_create_Card").serialize();
   var url=contextRootPath+'/lbTProTypeCard/saveProTypeCard';
	//通过ajax保存
	jyAjax(url,params,function(msg){
		$("").newMsg({}).show(msg.msg);
	});

	/*	var arrayObj = new Array();
	$('table').find('tr').each(function(){
		$(this).find('td').each(function(){
			$(this).find('input').each(function(){
				if($(this).val() == '') {
					arrayObj.push($(this).attr('id'));
				}
			});
		});
	});

	if(arrayObj.length != 0 && $('#takeIn').val() != '0') {
		$('#' + arrayObj[0]).focus();
		jyDialog().alert('请配置区间分值');
		return;
	}*/
}


function validateInfo() {
	var checkTrueCount = 0;
	var forms=["form_create_Card"];
	for(var i=0;i<forms.length;i++){
		var formObj=document.getElementById(forms[i]);
		if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
			checkTrueCount+=1;
		}
	}
	//校验判断
	if(checkTrueCount>0){
		return false;
	}
	return true;
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTProTypeCard/prepareExecute/toUpdate?id='+v_ids,
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
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTProTypeCard/updateLbTProTypeCard';
	//通过ajax保存
	jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
				alert(msg.msg);
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
		alert("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
		$.ajax({
			type:"POST",
			dataType:"JSON",
			url:contextRootPath+"/lbTProTypeCard/deleteLbTProTypeCard?ids="+v_ids,
			success:function(msg){
				alert(msg.msg);
				var v_status = msg.status;
				//删除成功后
				if(v_status.indexOf('ok') >-1){
					iframe.iframeObj["table"].removeSelectedRow();
				}


			}
		});
	}
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTProTypeCard/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			           {'text':'关闭','isClose':true}
			           ]
	};

	var dialogView = jyDialog(dialogStruct).open();
}

//三次评分跳转
function switchType(operateType){
	var params="operate="+operateType+"&prodId="+$("#prodId").val();
	var url=contextRootPath+'/lbTProTypeCard/queryThreeScoreConf';
	jyAjax(url,params,function(msg){
	
	});
}