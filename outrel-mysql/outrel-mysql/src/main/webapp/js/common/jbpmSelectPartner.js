/*v_actName 下一节点 任务名称
 * 流程发起时，判断指定下一个节点的 参与者
 * 如果需要 手工选择，则弹出其选人页面
 */
function selectNextPartner(v_actName,v_defKey) {
	var v_defVersion = '1';//流程版本号
	var v_m = new JBPM.common.Map();//new Map
	//m.remove("key2");//删除某个key 
	v_m.put("result", "to");
	var v_otherParam = v_m.toMapString();
	$.ajax({
		url : contextRootPath
				+ '/dojbpm/jyjbpmProvider/getPartnerInfoByProDef.do',
		type : 'POST',
		async : false,
		data : {
			acitityName : v_actName,
			proDefKey : v_defKey,
			proDefVersion : v_defVersion,
			otherParamJavaCode : v_otherParam
		},
		//dataType: 'json',
		error : function() {
			alert('error');
		},
		success : function(data) {
			$("#partnerRuleJsonId").val(data);
		}
	});
	//是否继续执行 弹出选人规则 则不继续向下执行
	var nextFlag = commonSelectDialog('v_myTurn');
	return nextFlag;
}


/*
 * 判断 是否弹出 选人页面
 */
function commonSelectDialog(v_myTurn) {
	var nextFlag = true;//是否继续执行 弹出选人规则 则不继续向下执行
	var ruleJson = eval('(' + $("#partnerRuleJsonId").val() + ')');
	var v_dialogFlag = ruleJson[0].dialogBoolean;//参与者 规则 是否需要弹出选人页面 进行人工选择
	var v_participantType = ruleJson[0].participantType;//参与者类型
	var v_partType = ruleJson[0].partType;//人工选人 参与者类型 角色、机构、人员
	var v_otherParams = ruleJson[0].otherParams;//主要存放 角色 信息
	var v_nextPartnerId = ruleJson[0].nextPartnerId;//下一个task 的参与者ID
	var v_participantRule = ruleJson[0].participantRule;//配置的 规则信息 java 类
	var v_m = new JBPM.common.Map();//new Map
	//m.remove("key2");//删除某个key 
	v_m.put("result", "to");
	var v_otherParam = v_m.toMapString();
	var _title = "";
	var isIframe = $("#isIframe").val();
	if(isIframe){
		
	}else{
		_title= window.top.tabs.getActiveObj().title;
	}
	 
	debugger;
	//组装URL
	var v_url = contextRootPath
			+ '/component/jbpm/selectPartner/queryPerformanceTransferStartPartner.jsp?myTurn='
			+ encodeURI(v_myTurn) + '&otherParams='
			+ encodeURI(v_otherParams) + '&participantType='
			+ encodeURI(v_participantType) + '&participantRule='
			+ encodeURI(v_participantRule) + '&partType='
			+ encodeURI(v_partType) + '&proInsParam='
			+ encodeURI(v_otherParam)//其他参数信息
			+ '&tabTitle=' + _title + '&isIframe=' + isIframe;//tab title 名称

	//如果为 true 则需要人工手动选择
	if ("true" == v_dialogFlag) {
		v_dialogFlag = true;
	} else {
		v_dialogFlag = false;
	}
	if (v_dialogFlag) {
		nextFlag = false;
		$.dialog({
			id : 'selectPartnerDialogId',
			lock : true,
			width : 850,
			height : 500,
			title : '选择下一环节参与者',
			content : 'url:' + v_url
		});
	} else {
		//系统自动选择参与者
		$("#nameInfo").val(v_nextPartnerId);//系统自动指定其名称为参与者ID
		$("#dtoparamUserId").val(v_nextPartnerId);//系统自动指定 参与者ID
	}
	return nextFlag;
}