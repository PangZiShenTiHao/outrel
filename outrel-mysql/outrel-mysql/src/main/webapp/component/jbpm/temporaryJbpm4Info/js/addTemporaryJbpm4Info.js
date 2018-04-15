//utf-8
/**
*	对应jsp 页面中的js 只存放 $(document).ready(function(){ ... });
*
**/
function closeWindow(){
var api = frameElement.api, W = api.opener;
	 //获取父页面的值
	 api.close();
	 //调用父页面查询 关闭时刷新父页面
	 W.queryData();
}


function saveData(){
	//所有的验证通过后才进行表单的提交
	var v_boolean = $("#newsForm").validationEngine("validate");
	if(v_boolean){
		$("#saveBtn").attr("disabled",true);
		document.newsForm.submit();
	}
}
