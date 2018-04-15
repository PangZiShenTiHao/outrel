/**
 * 获得卡内余额
 */
function queryCardBalance(contractId,id) {
	var amount = '';
	debugger;
	$.ajax({
		type : "POST",
		async:false,
		data : {contractId : contractId},
		url : contextRootPath+"/laTPromrepayment/queryCardBalance",
		success : function(msg) {
    		var advice = eval('(' + msg + ')');
			var str = advice.msg;
			if (null != str && str.indexOf("可用余额为@@+") >= 0) {
				amount = str.match(/可用余额为@@\+(\S*)@@#106001/)[1];
				$(id).after('建议划扣金额 ' + amount + '元');
			}
		}
	})
	return amount;
}

/**
 * 脱敏金额
 * */
function desAmount(str){
	if(str){
		if(null != str && str.indexOf("可用余额为@@+")>=0){
			//var amount = str.match(/可用余额为@@\+(\S*)@@#106001/)[1];
			//return str.replace(amount,'******');
			return "余额不足";
		}
	}
	return str;
}
