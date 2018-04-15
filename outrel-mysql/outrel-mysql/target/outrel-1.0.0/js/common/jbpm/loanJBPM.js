
//关闭任务窗口
function closeWindow(){
	try{
		window.opener.refreshThePage();
		var api = frameElement.api, W = api.opener;
		 //获取父页面的值
		 api.close();
		 //调用父页面查询 关闭时刷新父页面
		 //W.queryData();
	}catch(e){
		window.close();
	}
}

/*
 * 流程发起时，判断指定下一个节点的 参与者
 * 如果需要 手工选择，则弹出其选人页面
 */
function selectNextPartner(v_actName,v_defKey,v_defVersion,tabTitle){
	var v_m = new JBPM.common.Map();//new Map
  	//m.remove("key2");//删除某个key 
  	v_m.put("result", "to");
	var v_otherParam = v_m.toMapString();
	
	$.ajax({
		url: contextRootPath+'/dojbpm/jyjbpmProvider/getPartnerInfoByProDef.do',
		type: 'POST',
		async:false,
		data:{acitityName:v_actName,proDefKey:v_defKey,proDefVersion:v_defVersion,otherParamJavaCode:v_otherParam},
		//dataType: 'json',
		error: function(){alert('error:');},
		success: function(data){
			$("#partnerRuleJsonId").val(data);
			}
		});
	//是否继续执行 弹出选人规则 则不继续向下执行
	var nextFlag = decidedSelectDialog('v_myTurn',tabTitle);
	return nextFlag;
}
/*
 * 判断 是否弹出 选人页面
 */
function decidedSelectDialog(v_myTurn,tabTitle){
	//var api = frameElement.api, W = api.opener, cDG;
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
	//组装URL
	var v_url = contextRootPath+'/component/jbpm/selectPartner/queryAutoStartPartner.jsp?myTurn='
    +encodeURI(v_myTurn)+'&otherParams='+encodeURI(v_otherParams)+'&participantType='+encodeURI(v_participantType)
    +'&participantRule='+encodeURI(v_participantRule)+'&partType='+encodeURI(v_partType)
	+'&proInsParam='+encodeURI(v_otherParam)//其他参数信息
	+'&tabTitle='+tabTitle;//自动 执行 代办任务 选择参与者 queryAudoStartPartner.jsp 回调 tab
	
	//如果为 true 则需要人工手动选择
	if("true" == v_dialogFlag){
		v_dialogFlag =true;
	}else{
		v_dialogFlag =false;
	}
	if(v_dialogFlag){
		nextFlag = false;
		$.dialog({
			id:	'selectPartnerDialogId',
		    lock: true,
		    width:850,
		    height:500,
		    title:'选择下一环节参与者',
		    content: 'url:'+v_url
		             
			});
	}else{
		//系统自动选择参与者
		$("#nameInfo").val(v_nextPartnerId);//系统自动指定其名称为参与者ID
		$("#dtoparamUserId").val(v_nextPartnerId);//系统自动指定 参与者ID
	}
	return nextFlag;
}

/*
 * 组装选中的参与者信息
 * 及流程业务变量信息
 */
function makeupPartnerInfo(proTaskId,proProcessInsId,proAcitityName,proBizTabId,proBizTabName,proBizInfId){
	
	var v_m = new JBPM.common.Map();//new Map
    v_m.put("result", "to");
    v_m.put("proTaskId", proTaskId);
	v_m.put("proProcessInsId",proProcessInsId);
	v_m.put("proAcitityName", proAcitityName);
	v_m.put("proBizTabId", proBizTabId);
	v_m.put("proBizTabName", proBizTabName);
	v_m.put("proBizInfId", proBizInfId);
	var v_userId = $("#dtoparamUserId").attr("value");//指定参与者id
	v_m.put("owner",v_userId);
	var v_otherMap = v_m.toMapString();
	$("#dtootherParamJavaCode").val(v_otherMap);
}
//隐藏 显示 意见列表
function clickTopOptionsInfo(){
	if($("#bizOptionIframeId:visible").length>0){
		$(this).html("∨显示意见信息");
		$("#bizOptionIframeId").hide();
	}else{
		$(this).html("∧隐藏意见信息");
		$("#bizOptionIframeId").show();
	}
}

/*
 * 提交 工作流任务
 */
function subTask(v_myTurn,url,params){
	if(confirm("您确定要执行待办任务吗？")){
		$("[name^='myProButn']").attr("disabled",true);
		jyAjax(url, params, function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				alert(msg.msg);
				closeWindow();
			}else{
				alert('error:' + msg.msg);
			}
	  	});
	}	
}