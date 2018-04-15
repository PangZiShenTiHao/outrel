var mappingInfo = {
	B1 : [ "identityInformation_1", "tableId_1" ],
	B2 : [ "identityInformation_3", "tableId_1" ],
	B3 : [ "identityInformation_5", "tableId_1" ],
	B4 : [ "identityInformation_6", "tableId_1" ],
	B5 : [ "identityInformation_4", "tableId_1" ],
	B6 : [ "identityInformation_2", "tableId_1" ],
	B7 : [ "tableId_1", "tableId_1" ],
	B8 : [ "identityInformation_7", "tableId_1" ],
	E1 : [ "jobInformation_3", "tableId_2" ],
	E2 : [ "jobInformation_4", "tableId_2" ],
	E3 : [ "jobInformation_1", "tableId_2" ],
	E4 : [ "tableId_2", "tableId_2" ],
	E5 : [ "tableId_2", "tableId_2" ],
	E6 : [ "tableId_2", "tableId_2" ],
	E7 : [ "tableId_2", "tableId_2" ],
	E8 : [ "jobInformation_5", "tableId_2" ],
	D1 : [ "tableId_3", "tableId_3" ],
	D2 : [ "incomeInformation_3", "tableId_3" ],
	D3 : [ "incomeInformation_1", "tableId_3" ],
	D4 : [ "incomeInformation_2", "tableId_3" ],
	D5 : [ "tableId_3", "tableId_3" ],
	D6 : [ "tableId_3", "tableId_3" ],
	D7 : [ "tableId_3", "tableId_3" ],
	D8 : [ "incomeInformation_4", "tableId_3" ],
	F1 : [ "addressInformation_6", "tableId_4" ],
	F2 : [ "addressInformation_7", "tableId_4" ],
	F3 : [ "addressInformation_5", "tableId_4" ],
	F4 : [ "addressInformation_3", "tableId_4" ],
	F5 : [ "tableId_4", "tableId_4" ],
	F6 : [ "tableId_4", "tableId_4" ],
	F7 : [ "addressInformation_8", "tableId_4" ],
	H1 : [ "assetInformation_1", "tableId_5" ],
	H2 : [ "tableId_5", "tableId_5" ],
	H3 : [ "assetInformation_4", "tableId_5" ],
	H4 : [ "tableId_5", "tableId_5" ],
	H5 : [ "tableId_5", "tableId_5" ],
	H6 : [ "tableId_5", "tableId_5" ],
	H7 : [ "tableId_5", "tableId_5" ],
	H8 : [ "assetInformation_5", "tableId_5" ],
	G1 : [ "companyInformation_1", "tableId_6" ],
	G2 : [ "companyInformation_2", "tableId_6" ],
	G3 : [ "companyInformation_3", "tableId_6" ],
	G4 : [ "tableId_6", "tableId_6" ],
	G5 : [ "tableId_6", "tableId_6" ],
	G6 : [ "companyAgreementinfo_5", "tableId_6" ],
	G7 : [ "companyInformation_6", "tableId_6" ],
	I1 : [ "carInformation_2", "tableId_7" ],
	I2 : [ "tableId_7", "tableId_7" ],
	I3 : [ "tableId_7", "tableId_7" ],
	I4 : [ "tableId_7", "tableId_7" ],
	I5 : [ "tableId_7", "tableId_7" ],
	I6 : [ "tableId_7", "tableId_7" ],
	I7 : [ "tableId_7", "tableId_7" ]
};
//form集合
var formNames=["identityInformation","jobInformation","incomeInformation","addressInformation","assetInformation","companyInformation","companyAgreementinfo","carInformation","educationInformation"];
//获取表单信息
function getInformation(){
	var params=[];
	for(var i=0;i<formNames.length;i++){
		var subParams=[];
		$("input:checkbox[name='"+formNames[i]+"']").each(
				function(i){
					if($(this).is(":checked") == true){
						var tableName =  $(this).attr("linkFromId") +"_table";
						var tabObj = eval("("+tableName+")");
						var formData = tabObj.toJson();
						var resultStr = formData.replace("[","").jyReplaceAll("]","");
						if(resultStr.length > 0){
							subParams.push(resultStr);	
						}
					}
				}
		);
		params.push(formNames[i]+"=["+subParams.join(",")+"]");
	}
	return params.join("&");
}


function clickLinkDiv(opObj,m){
		var val = opObj.attr("linkFromId");
		if(opObj.is(":checked") == true){
			var colName = formNames[m]+"_commonTableObj";
			colObj = eval("("+colName+")");
			objs = colObj[val];
			var columns = eval("("+formNames[m]+"_columns"+")");
			var columnIndexs = objs[1];
			var columnObjs=[];
			var url="";
			for(var n=0;n<columnIndexs.length;n++){
				columnObjs.push(columns[columnIndexs[n]]);
			}
			var tabName = formNames[m]+"_tableStructure" ;
			var tableStruct = eval("("+tabName+")");
			tableStruct.columns = columnObjs;
			url = tableStruct.url;
			if(val == "company_cooperation"){
				tableStruct.url = tableStruct.url;
			}else{
				tableStruct.url = tableStruct.url+"&fileType="+objs[2];
			}
			var tableObj= $("#"+val).newTable(tableStruct,val);
			tableObj["fileType"]=opObj.val();
			objs[0](tableObj);
			$("#"+opObj.attr("linkFromId")+"_div").show();
			tableStruct.url = url;
			tableObj.show(true);
			if(val=="capital_car"){
				insuranceTable.show(true);
			}
		}else{
			$("#"+opObj.attr("linkFromId")+"_div").hide();
			$("#"+val).html("");
		}
}

function validateForm(){
	var checkTrueCount = 0;
	var forms=["carInfoForm", "educationInfoForm"];
	var tableArray=[capital_car_table, education_graduate_table];
	for(var i=0;i<forms.length;i++){
		var formObj=document.getElementById(forms[i]);
		if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
			checkTrueCount+=1;
		}
	}
	for(var i=0;i<tableArray.length;i++){
		checkTrueCount+=tableArray[i].checkFormat();
	}
	//校验判断
	if(checkTrueCount>0){
		return false;
	}
	return true;
}

function del_obj(obj){
	obj.parentNode.parentNode.remove();
}

jQuery(document).ready(function($) {

	var tab=[];
	$("div .shenfen").hide();
	$("div .jobinfo").hide();
	$("div .incomeInfo").hide();
	$("div .addressInfo").hide();
	$("div .capitalInfo").hide();
	$("div .companyInfo").hide();

	$("#formSwap").bind("click",function(ev){
		var obj=ev.srcElement || ev.target;
		var endObj=$(obj);
		var nextObj=endObj.parent().next();
		if(obj.tagName=="SPAN"&&endObj.hasClass("expandBtn")){
			if(endObj.hasClass("expandOver")){
				endObj.removeClass("expandOver");
				nextObj.show("blind");
			}else{
				endObj.addClass("expandOver");
				nextObj.hide("blind");
			}
		}
	});
	
	$("#formSwap2").bind("click",function(ev){
		var obj=ev.srcElement || ev.target;
		var endObj=$(obj);
		var nextObj=endObj.parent().next();
		if(obj.tagName=="SPAN"&&endObj.hasClass("expandBtn")){
			if(endObj.hasClass("expandOver")){
				endObj.removeClass("expandOver");
				nextObj.show("blind");
			}else{
				endObj.addClass("expandOver");
				nextObj.hide("blind");
			}
		}
	});
	
	$("#formSwap3Score").bind("click",function(ev){
		var obj=ev.srcElement || ev.target;
		var endObj=$(obj);
		var nextObj=endObj.parent().next();
		if(obj.tagName=="SPAN"&&endObj.hasClass("expandBtn")){
			if(endObj.hasClass("expandOver")){
				endObj.removeClass("expandOver");
				nextObj.show("blind");
			}else{
				endObj.addClass("expandOver");
				nextObj.hide("blind");
			}
		}
	});

//点击触发事件
(function(){
	for(var a=0;a<formNames.length;a++){
		(function(m){
			$("input:checkbox[name='"+formNames[m]+"']").bind("click",function(){
				clickLinkDiv($(this),m)
			});
		})(a);
	}
})();



//页面初始化加载
(function (){
	for(var i=0;i<formNames.length;i++){
		$("input:checkbox[name='"+formNames[i]+"']").each(
			function(){
				var checkObj = $(this);
				var linkDivId=checkObj.attr("linkFromId");
				var colName = formNames[i]+"_commonTableObj";
				var colObj = eval("("+colName+")");
				var columns = eval("("+formNames[i]+"_columns"+")");
				objs = colObj[linkDivId];
				var columnIndexs = objs[1];
				var columnObjs=[];
				var url="";
				for(var j=0;j<columnIndexs.length;j++){
					columnObjs.push(columns[columnIndexs[j]]);
				}
				var tabName = formNames[i]+"_tableStructure" ;
				var tableStruct = eval("("+tabName+")");;
				tableStruct.columns = columnObjs;
				url = tableStruct.url;
				if(linkDivId == "company_cooperation"){
					tableStruct.url = tableStruct.url;
				}else{
					tableStruct.url = tableStruct.url+"&fileType="+objs[2];
				}
				tableStruct.loadEndFun = function(result){
					if(result&&result.data&&result.data.length>0){
						checkObj.attr("checked",true);
						$("#"+linkDivId+"_div").show();
						var datas=tableObj.getAllData();
						for(var i=0;i<datas.length;i++){
							datas[i]["type"]=checkObj.val();
						}
					}
				}
				var tableObj= $("#"+linkDivId).newTable(tableStruct,linkDivId);
						tableObj.show(true);
						if(linkDivId=="capital_car"){
							insuranceTable.show(true);
						}
						objs[0](tableObj);
						tableStruct.url = url;
					}
			);
		}
	})();
});

