	function toOpenLock(){
		var id= iframe.iframeObj["table"].getSelectedIds();
		openLock(id);
	}
	
	function viewHistBizInfo(v_bizType,v_infId,v_tabName,v_bizTabId,v_proInsId){
		var v_url= contextRootPath;
		v_viewURI = '/dojbpm/jbpmcreditaudit/prepareExecute/toViewAppInfo';
		v_url += encodeURI(v_viewURI);
		v_url = v_url +"?bizInfId="+encodeURI(v_infId);
		
		window.open(v_url,'viewHistInfoWindow'+v_infId);
	}
	/*
	*新增页面的 保存操作
	*/
	function addFromSave(){
		var contractIds = "";
		var obj = dialogAddObj.getIframe();
		var objs = iframe.iframeObj["table"].getSelectedObjs("");
		if(!obj.checkMyDataForm()){
			return ;
		}
		for(var i=0;i<objs.length;i++){
			if(!obj.checkNewManager(objs[i].customerService)){
				return;
			}
			if(contractIds){
				contractIds = contractIds+","+objs[i].contractId;
			}else{
				contractIds = objs[i].contractId;
			}
		}
		var params = obj.saveMyData();
		var url=contextRootPath+"/lbTManagerTransferLogs/insertLbTServiceTransferLogs?contractIds="+contractIds;
		jyAjax(
			url,
			params,
			function(result){
				var v_status = result.status;
	        	if(v_status.indexOf('ok') >-1){
	        		dialogAddObj.close();//先关闭弹出层
	        		$("").newMsg({}).show(result.msg);
	        		//弹出操作成功
	        		queryData();
	        	}
		});
	}
	
	function setCallFunToUser(v_ids,v_names){
		//通过 弹出层的dialog 获取 iframe 对象后再调用其对应的方法
		dialogAddObj.getIframe().setCallFunToUser(v_ids,v_names);
	}
	/**
	 * 客服转移
	 * @param type
	 */
	function custTransfer(type){
		var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
		var obj = iframe.iframeObj["table"].getSelectedObjs("");
		if(obj==''){
			$("").newMsg({}).show("请选择需要转移的数据！");
			return;
		}else{
			for(var i=0;i<obj.length;i++){
				if(obj[i].mainCustomTransfer!=null){
					//02:分部总，03:区域总，04:普惠总部
					if(obj[i].mainCustomTransfer.managerTransferKey=="02" || obj[i].mainCustomTransfer.managerTransferKey=="03" || obj[i].mainCustomTransfer.managerTransferKey=="04"){
						$("").newMsg({}).show("流程已提交，正在审批中");
						return;
					}
				}
			}
		}
		var url = contextRootPath+"/lbTManagerTransferLogs/prepareExecute/toViewHrManager?contractIds="+v_ids+"&type="+type;
		var dialogStruct={
			"display":url
			,"width":"850"
			,"height":"500"
			,title:'客服经理转移'
			,"buttons":[{"text":"保存","action":addFromSave,"isClose":false},
			{"text":"关闭","isClose":true}]};
		dialogAddObj=jyDialog(dialogStruct);
		dialogAddObj.open();
	}
	/**
	 * 提交审批  事件
	 */  
	function submitAppData(){
		var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
		var url =contextRootPath+"/jbpmServiceManagerTransfer/serviceManagerTransferWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids;
		jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
			jyAjax(
					url,
					'',
					function(msg){
						//保存成功后，执行查询页面查询方法
						$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
						var v_status = msg.status;
						if(v_status.indexOf('ok') >-1){
							//显示剩下数据
							queryData();
						}
					});
		},"确认提示");
	}
	/**
	 * 查看客服转移轨迹
	 * @param vId 进件id
	 */
	function viewTransferLogs(obj){
		var dialogStruct={
				'display':contextRootPath+'/lbTCustomTransferLog/prepareExecute/toQueryPage?intoAppId='+obj.baseExt7,
				'width':1500,
				'height':600,
				'title':'查看客服转移轨迹',
				'buttons':[
				 {'text':'关闭','isClose':true}
				]
		};
		var dialogView = jyDialog(dialogStruct).open();
	}
	/**
	 * 查看流程轨迹
	 * @param obj
	 */
	function viewTransferJbpmLogs(obj){
		var url=contextRootPath+"/lbTCustomTransfer/findJbpmByIntoIdAndBizType?intoAppId="+obj.baseExt7+"&type=custom";
		jyAjax(
			url,
			'',
			function(result){
				var v_bizTabName=result.data.BIZ_TAB_NAME;
				var processInstantceId=result.data.PRO_INSTANCE_ID;
				var v_bizInfId=result.data.BIZ_INF_ID;
				$.dialog({
					id:	'viewWrokflowHisLog',
				    lock: true,
				    width:850,
				    height:800,
				    title:'查看流程轨迹',
				    content: 'url:'+contextRootPath+'/component/jbpm/persontask/viewWorkflowHisLog.jsp?processInstantceId='+encodeURI(processInstantceId)+'&bizTabName='+encodeURI(v_bizTabName)+'&bizInfId='+encodeURI(v_bizInfId)
				});
		});
	}