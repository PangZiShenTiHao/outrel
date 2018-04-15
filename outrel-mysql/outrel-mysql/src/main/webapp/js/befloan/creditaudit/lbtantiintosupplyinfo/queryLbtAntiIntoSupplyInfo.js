    // 设置选中事件
	function setCheckEvent(id,rowIndex, that){
		var objs = iframe.iframeObj["table"].datas;
		var selectedObj = objs[rowIndex];
	    var remark = $("#"+id).val();
	    var v_remark ="";
		if (remark==undefined||remark==""||remark=="0") {
			$(that).attr("checked","checked");
			v_remark="1";
			$(that).val(v_remark);
			selectedObj.REMARK =v_remark;
			return;
		}else{
			$(that).removeAttr("checked");
			v_remark="0";
			$(that).val(v_remark);
			selectedObj.REMARK =v_remark;
			return;
		}
	}
	
	//处理同步数据任务
	function dealBatchTask(){
		var isBatchV = $("select[name='isBatch']").val();//获取同步状态的选中值
		if(!isBatchV){
			jyDialog({"type" : "info"}).alert("请选择[同步状态]查询条件，再数据同步！"+"<br/>"+"仅支持状态为未同步、已同步的数据同步！");
			return; 	
		}else if(isBatchV =="3"){
			jyDialog({"type" : "info"}).alert("仅支持状态为未同步、已同步的数据同步！");
			return;
		}
		var totalCount = iframe.iframeObj["table"].totalRows;
		//获取所有表格数据
		var allDatas = iframe.iframeObj["table"].getAllData();
		var totalCount = allDatas.length;
		if(totalCount==0){
			jyDialog({"type" : "info"}).alert("没有待同步的进件数据！");
			return;
		}
		//获取选择的数据
		var selectedObj = [];//已勾选可同步的数据
		var unSelectObj = [];//未勾选可同步的数据
		var selectedCount = 0;
		var unSelectCount = 0;
		if(allDatas.length>0){
			for(var i=0;i<allDatas.length;i++){
				var data=allDatas[i];
				if(data["REMARK"] =="1"){
					selectedObj.push(data);
					selectedCount++;
				}else if(data["REMARK"] =="0"){
					unSelectObj.push(data);
					unSelectCount++;
				}
			}
		}
		if((selectedCount==0 && totalCount>1000)||(selectedCount>1000)){
			window.top.showMessage("超过最大同步限制条数：1000！");
			return false;
		}
		if(selectedCount>0){
			exeBatchTask(selectedObj);
		}else if(selectedCount==0){
			exeBatchTask(unSelectObj);
		}
	}
	
	//执行进件同步处理任务
	function exeBatchTask(selectedObj) {
		var obj = [];
		for (var i = 0; i < selectedObj.length; i++) {
			var data = selectedObj[i];
			obj.push({"intoId" : data["id"],"intoCutRefId" : data["INTO_CUST_REFID"]});
		}
		var jsonStr = jyTools.parseJson2String(obj);
		var params = "intoInfoJson="+jsonStr;
		var url = contextRootPath+ '/lbTIntoInfo/dealBatchLbTIntoInfo';
		jyAjax(url,params, function(msg) {
			var v_status = msg.status;
			if (v_status.indexOf('ok') > -1) {
				queryData();
				window.top.showMessage("进件同步处理成功！");
			}
		});
	 }
	
	 //清空数据表
	 function deleteData(){
	   var totalCount = iframe.iframeObj["table"].totalRows; 
	   if(totalCount==0){
		   jyDialog({"type" : "info"}).alert("暂无待需清空的数据！");
		   return;
	   }
	   jyDialog().confirm("您确认要清空所有数据吗？",function(){
		   var url = contextRootPath+ '/lbtAntiIntoSupplyInfo/truncateTableBySql';
		   jyAjax(url,null, function(msg) {
			  var v_status = msg.status;
			  if (v_status.indexOf('ok') > -1) {
				 queryData();
				 window.top.showMessage(msg.msg);
			  }
		    });
	   });
     }

	// Excel导入
	var dialog_import = null;
	function importData(){
		var dialogStruct={
			'display':contextRootPath+'/component/upload/importAntiIntoSupplyExcelFile.jsp',
			'width':800,
			'height':400,
			'title':'导入数据',
			'isIframe':'true',
			'buttons':[{'text':'关闭','isClose':true,'action':flushTable}]
		};
		dialog_import =jyDialog(dialogStruct);
		dialog_import.open();
	}

	//刷新表格
	function flushTable(){
		queryData();
	}