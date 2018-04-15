function hideBtn(){
	var operateBtn = $("#operateBtn").val();
	if(operateBtn == 'hide'){
		$("#topDivInfo").css("margin-top","0");
		$("#div_save").css("display", "none");
	}
}

function setPageFormRead(formName){
	var operateBtn = $("#operateBtn").val();
	if(operateBtn == 'hide'||operateBtn == 'view'){
		setFormRead(formName);
	}
}

