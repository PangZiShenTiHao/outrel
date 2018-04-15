
//新增页面的保存操作
/*function fn_save(){
	//序列化 新增页面的form表单数据
	var params=$("#protect_period_conf_form").serialize();
	var url=contextRootPath+'/lbTProtectPeriodConf/saveProtectPeriodConf';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		//queryData();
        	}
  	});
}*/

