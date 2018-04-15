$(function() {
	$("ul.droptrue").sortable({
		connectWith : "ul"
	});
	$("#sortable1, #sortable2, #sortable3").disableSelection();
	$("#resizable1").resizable();
	$("#resizable2").resizable();
	$("#resizable3").resizable();
});




function save(){
	var mustSring = new Array();
	$("#sortable2").find("li").each(function(i){
		var val = $(this).text();
		mustSring.push(val);
	});
	$('#must').val(mustSring);
	var freeSring = new Array();
	$("#sortable3").find("li").each(function(i){
		var val = $(this).text();
		freeSring.push(val);

	});
	$('#free').val(freeSring);
	var params=$("#transConfig").serialize();
	var url=contextRootPath+'/lbTTransConf/insertLbTTransConf?prodId='+$("#prodId").val();
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				alert("保存成功");
			}
	});
}