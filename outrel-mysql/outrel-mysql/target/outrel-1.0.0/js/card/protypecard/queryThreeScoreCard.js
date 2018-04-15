
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
	if(flag){ 
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
	obj.parent().parent().detach();
}

function updateProTypeAntiFraudDetailNext(obj,randFix){
	$('#numUp'+randFix).val(obj.numUp);
	$('#numDown'+randFix).val(obj.numDown);
	$('#loanPeriod'+randFix).val(obj.loanPeriod);
	$('#auditAmount'+randFix).val(obj.auditAmount);
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
		fix = "proThreeScoreCardDTOs[1].lbtProThreeScoreCardItemDTOs["+(seed++)+"]";
	}
	else if(flag == 3 || flag == 4){
		randFix = randomFix2();
		fix = "proThreeScoreCardDTOs[1].lbtProThreeScoreCardItemDTOs["+(seed3++)+"]";
	}
	var flagStr = "";
	if(flag == 1  ){
		flagStr = '<td align="center"><input id="auditAmount'+randFix+'" name="'+fix+'.auditAmount"  style="width: 150px" maxlength="20" notNull="true"></td>'
	}else if(flag == 2 ){
		flagStr = '<td align="center"><input id="loanPeriod'+randFix+'" name="'+fix+'.loanPeriod"  style="width: 150px" maxlength="20" notNull="true"></td>'
	}else if(flag == 3 ){
		flagStr = '<td align="center"><select id="decisionType'+randFix+'" name="'+fix+'.decisionType"   style="width: 150px;"><option value="1">维持原结论</option><option value="2">使用新结论</option></select></td>'
			+'<td align="center"><input id="auditAmount'+randFix+'" name="'+fix+'.auditAmount"  style="width: 150px" maxlength="20" checktype="number" notNull="true"></td>'
	}else if(flag == 4){
		flagStr = '<td align="center"><select id="decisionType'+randFix+'" name="'+fix+'.decisionType"   style="width: 150px;"><option value="1">维持原结论</option><option value="2">使用新结论</option></select></td>'
		+'<td align="center"><input id="loanPeriod'+randFix+'" name="'+fix+'.loanPeriod"  style="width: 150px" maxlength="20" checktype="number" notNull="true"></td>'
	}

	var html = '<tr flag="trFlag">'
		+'<td align="center"><input id="numDown'+randFix+'" name="'+fix+'.numDown" flag="requiredFlag1" style="width: 150px" notNull="true" checktype="number" ></td>'
		+'<td align="center"><input id="numUp'+randFix+'" name="'+fix+'.numUp" style="width: 150px" notNull="true" checktype="number" ></td>'
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
	$('#auditAmount'+randFix).val(obj.auditAmount);
	$('#loanPeriod'+randFix).val(obj.loanPeriod);
	$('#form_create_Card').form('validate');
}

//新增页面的保存操作
function doAddFrom(scoreType){
	debugger;
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
   var params=$("#form_create_Card").serialize()+"&scoreType="+scoreType;
   var url=contextRootPath+'/lbtProThreeScoreCard/saveOrUpdateThreeScoreCard';
	//通过ajax保存
	jyAjax(url,params,function(msg){
		$("").newMsg({}).show(msg.msg);
	});
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


//三次评分跳转
function switchType(operateType){
	var params="operate="+operateType+"&prodId="+$("#prodId").val();
	var url=contextRootPath+'/lbTProTypeCard/queryThreeScoreConf';
	jyAjax(url,params,function(msg){
	});
}