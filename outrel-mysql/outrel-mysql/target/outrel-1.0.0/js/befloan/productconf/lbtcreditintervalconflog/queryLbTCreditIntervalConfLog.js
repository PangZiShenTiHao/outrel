    //定义form表单 设置 方法
	function setOnLineAuditInterval(){
		var interval = $("input[name='interval']").val();
		var regExp =/^[1-9][0-9]{0,2}$/; //1-999
		var tip="仅能录入[1,999]之间的正整数!";
		if(interval == ""){
			window.top.showMessage("字段不能为空!",1000);
			return;
		}
		if (interval != "" && !regExp.test(interval)) {
			window.top.showMessage(tip,1000);
			return;
		}
		var params=[];
		params.push('interval='+interval);
		var url=contextRootPath+'/lbTCreditIntervalConf/updateLbTCreditIntervalConfByFlowId?creditFlowId=auditOnlineKey';
		//通过ajax保存
		jyAjax(
			url,
			params.join("&"),
			function(msg){
				window.top.showMessage(msg.msg,1000);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//修改成功后 刷新页面 
	        		queryData();
	        	}
	  	});
  }