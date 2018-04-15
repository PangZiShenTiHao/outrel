function checkCardId(obj) {
	var cardType = $("#addNewsFormData4 #cardType").val();
	var cardId = $(obj).val();
	if (cardType == '1' && !LOAN.util.isCheck18ID(cardId.toLowerCase())) {
		return "请输入合法的证件号码!";
	}
	//获取年龄  
    var myDate = new Date();  
    var month = myDate.getMonth() + 1;  
    var day = myDate.getDate();  
    var age = myDate.getFullYear() - cardId.substring(6, 10) - 1;  
    if (cardId.substring(10, 12) < month || cardId.substring(10, 12) == month && cardId.substring(12, 14) <= day) {
        age++;  
    }  
    var falg="";
	var url=contextRootPath+'/lbTIntoInfo/intoCheckAge?age='+age;
	//通过ajax保存
	jyAjax(
		url,"",function(msg){
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		falg =  "";
        	}else{
        	    falg =  msg.msg;
        	}
     	},"","",false);
	return falg;
}

function checkName(obj) {
	var custName = $(obj).val().replace(/\s/g,'');
	$(obj).val(custName);
	var regExp=/[a-zA-Z0-9\s]/g;
	if (regExp.test(custName)) {
		return "不允许输入字母、数字和空格!";
	}

	return "";
}