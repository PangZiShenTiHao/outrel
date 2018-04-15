/* UTF-8
 * JBPM.common.js
 * 使用jquery1.4
 * 封装了介于jquery和jbpm 业务逻辑之间的公共功能部分，主要是公共js效果
 * author: chengang
 * 调用示例(详细说明见各个对象及方法)：
 * JBPM.common.initProInsToDoTurnDirection();
 */
(function(){
	var _common = {
		/*
		 * 活动的流程实例中的  流转方向 的下拉框
		 * 须获取页面参数：
		 * processInsId 流程实例ID
		 * acitityName 当前流程实例ID中活动的节点名称
		 */
		initProInsToDoTurnDirection : function(){
			var turnDirections = "";
			var v_proInsId = $("#processInsId").val();
			var v_actNa = $("#acitityName").val();
			//流转方向下拉框 通过ajax 查询出来进行显示
			$.ajax({
				url: contextRootPath+'/workFlowProvider/getAllTurenDirectory.do',
				type: 'POST',
				async:false,
				data:{processInsId:v_proInsId,acitityName:v_actNa},
				//dataType: 'json',
				error: function(){alert('error');},
				success: function(data){
						turnDirections = eval('(' + data + ')');
					}
				});
			//通过json数据 组装下拉框	
			$obj = $("#dtoturnDirection");
			var option = '';
			$obj.empty();
			for(var i = 0 ; i< turnDirections.length ; i++){
				if(turnDirections[i].turnDir == ""){
					option = '<option value="'+turnDirections[i].turnDir+'" title="默认">默认</option>';
				}else{
					option = '<option value="'+turnDirections[i].turnDir+'" title="'+turnDirections[i].turnDir+'" id="'+turnDirections[i].turnDir+'">'+turnDirections[i].turnDir+'</option>';
				}
				$obj.append(option);
				
				var myBtnName = turnDirections[i].turnDir;
				if(myBtnName == "") myBtnName ='提交';
				
				var myBtn = '<input style="margin:5px;" id="saveBtn" name="myProButn" type="button" value="'+myBtnName+'" onclick="prepareSubTask(\''+myBtnName+'\')" />';
			/*	myBtn = myBtn +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';*/
				$("#divSubBtnId").append(myBtn);
			}
			//默认追加关闭按钮
		 	$("#divSubBtnId").append('<input id="restBtn" style="margin:5px;"  name="myProButn" type="button" value="关闭" onclick="closeWindow()" />');
		},
		/*
		 * 判断 下一节点 task 选人规则 
		 */
		decidedSelectPartnerRule:function(v_myTurn){
			//获取下一个task 节点参与者规则配置信息
			JBPM.common.getPartnerRuleInfo();
			//判断 决策 是否 弹出 选人页面
			var nextFlag = JBPM.common.decidedSelectDialog(v_myTurn);//是否继续执行 弹出选人规则 则不继续向下执行
			return nextFlag;
		},
		/*
		 * 判断决策 是否弹出选人页面
		 */
		decidedSelectDialog:function(v_myTurn){
			debugger;
			var nextFlag = true;//是否继续执行 弹出选人规则 则不继续向下执行
			//var v_str = "[{participantType:'人工选择参与者',participantRule:'',otherParams:'',dialogBoolean:'true'}]";
			var ruleJson = eval('(' + $("#partnerRuleJsonId").val() + ')');
			var v_dialogFlag = ruleJson[0].dialogBoolean;//参与者 规则 是否需要弹出选人页面 进行人工选择
			var v_participantType = ruleJson[0].participantType;//参与者类型
			var v_otherParams = ruleJson[0].otherParams;//主要存放 角色 信息
			var v_nextPartnerId = ruleJson[0].nextPartnerId;//下一个task 的参与者ID
			var v_participantRule = ruleJson[0].participantRule;//配置的 规则信息 java 类
			var v_partType = ruleJson[0].partType;//人工选人 参与者类型 角色、机构、人员
			var v_formId = ruleJson[0].formId;//配置规则的 jbpm4_form_inf id
			var v_proNextActName = ruleJson[0].proNextActName;//form_id 对应的节点名称
			
			var v_taskId = $("#dtotaskId").val();
			var v_proInsId = $("#processInsId").val();
			var v_actNa = $("#acitityName").val();
			var v_bizTabId = $("#bizTabId").val();
			var v_bizTabNa = $("#bizTabName").val();
			var v_bizInfId = $("#bizInfId").val();
			var v_turnDic = $("#dtoturnDirection").val();
			var v_proInsParam = $("#dtootherParamJavaCode").val();
			//组装URL
			var v_url = contextRootPath+'/component/jbpm/selectPartner/querySelectPartner.jsp?myTurn='
		    +encodeURI(v_myTurn)+'&otherParams='+encodeURI(v_otherParams)+'&participantType='+encodeURI(v_participantType)
		    +'&participantRule='+encodeURI(v_participantRule)+'&formId='+encodeURI(v_formId)+'&partType='+encodeURI(v_partType)
		    +'&taskId='+encodeURI(v_taskId)+'&turnDirection='+encodeURI(v_turnDic)+'&acitityName='+encodeURI(v_actNa)
		    +'&bizTabName='+encodeURI(v_bizTabNa)+'&bizInfId='+encodeURI(v_bizInfId)+'&processInsId='+encodeURI(v_proInsId)
		    +'&bizTabId='+encodeURI(v_bizTabId)+'&proNextActName='+encodeURI(v_proNextActName)+'&proInsParam='+encodeURI(v_proInsParam);
			//如果为 true 则需要人工手动选择
			//alert("v_dialogFlag:"+v_dialogFlag);
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
				    /*,button: [{name: '确认',callback: function(){
			                	 doSurePartner(v_myTurn);//回写已选择的人 至页面中的 方法
			                	 return false;//触发事件后，不关闭页面
			                 	},focus: true
				             },{name: '关闭'}]*/
					});
			}else{
				//系统自动选择参与者
				$("#nameInfo").attr("value",v_nextPartnerId);//系统自动指定其名称为参与者ID
				$("#dtoparamUserId").attr("value",v_nextPartnerId);//系统自动指定 参与者ID
				//调用执行流程页面的 js 方法 进行相关业务参数变量的控制 等确认执行 待办任务后  才修改 其参与者信息
				//makeupPartnerInfo();
			}
			return nextFlag;
		},
		/*
		 * 判断 下一节点 task 选人规则  只有一个参与者时则不弹出选人页面，系统自动选择
		 */
		decidedSelectPartnerRuleOfBiz:function(v_myTurn){
			//获取下一个task 节点参与者规则配置信息
			JBPM.common.getPartnerRuleInfo();
			//判断 决策 是否 弹出 选人页面
			var nextFlag = JBPM.common.decidedSelectDialogOfBiz(v_myTurn);//是否继续执行 弹出选人规则 则不继续向下执行
			return nextFlag;
		},
		/*
		 * 判断决策 是否弹出选人页面
		 */
		decidedSelectDialogOfBiz:function(v_myTurn){
			var nextFlag = true;//是否继续执行 弹出选人规则 则不继续向下执行
			//var v_str = "[{participantType:'人工选择参与者',participantRule:'',otherParams:'',dialogBoolean:'true'}]";
			var ruleJson = eval('(' + $("#partnerRuleJsonId").val() + ')');
			var v_dialogFlag = ruleJson[0].dialogBoolean;//参与者 规则 是否需要弹出选人页面 进行人工选择
			var v_participantType = ruleJson[0].participantType;//参与者类型
			var v_otherParams = ruleJson[0].otherParams;//主要存放 角色 信息
			var v_nextPartnerId = ruleJson[0].nextPartnerId;//下一个task 的参与者ID
			var v_participantRule = ruleJson[0].participantRule;//配置的 规则信息 java 类
			var v_partType = ruleJson[0].partType;//人工选人 参与者类型 角色、机构、人员
			var v_formId = ruleJson[0].formId;//配置规则的 jbpm4_form_inf id
			var v_proNextActName = ruleJson[0].proNextActName;//form_id 对应的节点名称
			
			var v_taskId = $("#dtotaskId").val();
			var v_proInsId = $("#processInsId").val();
			var v_actNa = $("#acitityName").val();
			var v_bizTabId = $("#bizTabId").val();
			var v_bizTabNa = $("#bizTabName").val();
			var v_bizInfId = $("#bizInfId").val();
			var v_turnDic = $("#dtoturnDirection").val();
			var v_proInsParam = $("#dtootherParamJavaCode").val();
			var v_url = '?myTurn='
			+encodeURI(v_myTurn)+'&otherParams='+encodeURI(v_otherParams)+'&participantType='+encodeURI(v_participantType)
		    +'&participantRule='+encodeURI(v_participantRule)+'&formId='+encodeURI(v_formId)+'&partType='+encodeURI(v_partType)
		    +'&taskId='+encodeURI(v_taskId)+'&turnDirection='+encodeURI(v_turnDic)+'&acitityName='+encodeURI(v_actNa)
		    +'&bizTabName='+encodeURI(v_bizTabNa)+'&bizInfId='+encodeURI(v_bizInfId)+'&processInsId='+encodeURI(v_proInsId)
		    +'&bizTabId='+encodeURI(v_bizTabId)+'&proNextActName='+encodeURI(v_proNextActName)+'&proInsParam='+encodeURI(v_proInsParam);
			//如果为 true 则需要人工手动选择
			if("true" == v_dialogFlag){
				v_dialogFlag =true;
			}else{
				v_dialogFlag =false;
			}
			if(v_dialogFlag){
				//查询参与者list 如果只有一个参与者 则不弹出选人页面
				var myurl = contextRootPath+'/dojbpm/jbpmJYPartner/selectJbpmJYPartner'+v_url;
				//alert("myurl:"+myurl);
				$.ajax({
					url: myurl,
					type: 'POST',
					async:false,
					dataType: 'json',
					error: function(XmlHttpRequest,textStatus, errorThrown){
						if(XmlHttpRequest.responseText !=""){
							alert('error:'+XmlHttpRequest.responseText);
						}else{
							alert('decidedSelectDialogOfBiz error');
						}
					},
					success: function(data){
							//alert(data.totalRows);
							if(data.totalRows <= 1){//只有一个人则不需要弹出选人页面
								var objs = data.data;
								v_nextPartnerId = objs[0].parUserId;
								v_dialogFlag = false;
							}else{
								v_dialogFlag=true;
								v_url = contextRootPath+'/component/jbpm/selectPartner/querySelectPartner.jsp'+v_url;
							}
						}
				});
				
			}else{
				v_url = contextRootPath+'/component/jbpm/selectPartner/querySelectPartner.jsp'+v_url;
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
				    /*,button: [{name: '确认',callback: function(){
			                	 doSurePartner(v_myTurn);//回写已选择的人 至页面中的 方法
			                	 return false;//触发事件后，不关闭页面
			                 	},focus: true
				             },{name: '关闭'}]*/
					});
			}else{
				//系统自动选择参与者
				$("#nameInfo").attr("value",v_nextPartnerId);//系统自动指定其名称为参与者ID
				$("#dtoparamUserId").attr("value",v_nextPartnerId);//系统自动指定 参与者ID
				//调用执行流程页面的 js 方法 进行相关业务参数变量的控制 等确认执行 待办任务后  才修改 其参与者信息
				//makeupPartnerInfo();
			}
			return nextFlag;
		},
		
		/*获取当前待办任务下一个 task 任务的 选人规则信息
		 *如果需要人工选择 则弹出人工选择的 页面 
		 */
		getPartnerRuleInfo : function(){
			var v_taskId = $("#dtotaskId").val();
			var v_proInsId = $("#processInsId").val();
			var v_actNa = $("#acitityName").val();
			var v_bizTabId = $("#bizTabId").val();
			var v_bizTabNa = $("#bizTabName").val();
			var v_bizInfId = $("#bizInfId").val();
			var v_turnDic = $("#dtoturnDirection").val();
			//调用执行流程页面的 js 方法 进行相关业务参数变量的控制
			//makeupPartnerInfo(); 调整 为业务 页面执行
			var v_otherParam = $("#dtootherParamJavaCode").val();
			//alert(v_otherParam);
			//return;
			$.ajax({
				url: contextRootPath+'/dojbpm/jyjbpmProvider/getPartnerRuleInfo.do',
				type: 'POST',
				async:false,
				data:{taskId:v_taskId,turnDirection:v_turnDic,processInsId:v_proInsId,
					bizTabId:v_bizTabId,acitityName:v_actNa,bizTabName:v_bizTabNa,
					bizInfId:v_bizInfId,otherParamJavaCode:v_otherParam},
				//data:$("#bizFormData").serialize(),
				dataType: 'json',
				error: function(XmlHttpRequest,textStatus, errorThrown){
					if(XmlHttpRequest.responseText !=""){
						alert('error:'+XmlHttpRequest.responseText);
					}else{
						alert('getPartnerRuleInfo error');
					}
				},
				success: function(data){
						//var v_ruleJson = eval('(' + data + ')');
						//alert(data);
					    debugger;
						$("#partnerRuleJsonId").val(data);
					}
			});
		},
		/*
		 * 判断 待办任务的流程状态是否是挂起状态
		 */
		getProInsState : function(v_bizTabId){
			var v_lock = true;//默认 :true正常状态, false:挂起状态
			$.ajax({
				url: contextRootPath+'/dojbpm/jyjbpmProvider/getProInsState.do',
				type: 'POST',
				async:false,
				data:{bizTabId:v_bizTabId},
				//dataType: 'json',
				error: function(){alert('error');},
				success: function(data){
						 var msg = eval('(' + data + ')');
						 if("1" == msg[0].proInsState){
							 v_lock = true;
						 }else{
							 v_lock = false;
						 }
					}
			});
			return v_lock;
		},
		/*
		 * 判断 待处理的待办任务 是否存在 且是当前登录人的
		 */
		getOperateTaskStateInfo : function(v_taskId,v_userId){
			var v_msg = "";//msg 没有信息说明  当前登录人可以执行该待办任务
			$.ajax({
				url: contextRootPath+'/dojbpm/jyjbpmProvider/getOperateTaskStateInfo.do',
				type: 'POST',
				async:false,
				data:{taskId:v_taskId,curUserId:v_userId},
				//dataType: 'json',
				error: function(){alert('error');},
				success: function(data){
						 var msg = eval('(' + data + ')');
						 v_msg = msg[0].msg;
					}
			});
			return v_msg;
		},
		
		/**
		 * 根据流程定义KEY获取所有活动定义列表(活动类型为task和custom)
		 */
		getActivityDefines : function(v_selectId,v_proDefKey){
			var activityDefs = "";
			$.ajax({
				url: contextRootPath+'/dojbpm/jyjbpmProvider/getActivityDefines.do',
				type: 'POST',
				async:false,
				data:{proDefKey:v_proDefKey},
				//dataType: 'json',
				error: function(){alert('error');},
				success: function(data){
						activityDefs = eval('(' + data + ')');
					}
				});
			//通过json数据 组装下拉框	
			$obj = $("#"+v_selectId);
			var option = '';
			$obj.empty();
			for(var i = 0 ; i< activityDefs.length ; i++){
				if(activityDefs[i].actName == ""){
					option = '<option value="'+activityDefs[i].actName+'" title="默认">默认</option>';
				}else{
					option = '<option value="'+activityDefs[i].actName+'" title="'+activityDefs[i].actName+'" >'+activityDefs[i].actName+'</option>';
				}
				$obj.append(option);
			}
		},
		
		/**
		 * 根据流程实例ID和活动名称获取活动信息
		 */
		getActInstByProInstIdAndActName : function(v_proInstId,v_actName,v_performerItemId,v_performerNameItemId,v_completeTimeItemId){
			if(v_proInstId==""){
				alert("流程实例ID不能为空！");
				return ;
			}
			if(v_actName==""){
				alert("活动名称不能为空！");
				return;
			}
			var actInstInfo = "";
			//操作人ID
			var performerId = "";
			//操作人名称
			var performerName = "";
			//完成时间
			var completeTime = "";
			$.ajax({
				url: contextRootPath+'/dojbpm/jyjbpmProvider/getActInstByProInstIdAndActName.do',
				type: 'POST',
				async:false,
				data:{proInstId:v_proInstId,actName:v_actName},
				//dataType: 'json',
				error: function(){alert('error');},
				success: function(data){
					  actInstInfo = eval('(' + data + ')');
					  performerId = actInstInfo.performerId;
					  performerName = actInstInfo.performerName;
					  completeTime = actInstInfo.completeTime;
					}
				});
			if(v_performerItemId!='' && $("#"+v_performerItemId)!=undefined){
				$("#"+v_performerItemId).val(performerId);
			}
			if(v_performerNameItemId!='' && $("#"+v_performerNameItemId)!=undefined){
				$("#"+v_performerNameItemId).val(performerName);
			}
			if(v_completeTimeItemId!='' && $("#"+v_completeTimeItemId)!=undefined){
				$("#"+v_completeTimeItemId).val(completeTime);
			}
		},
		
		/**
		 * 流程发起前，获取指定活动节点的角色配置
		 * @param v_actName 活动名称
		 * @param v_defKey 流程定义key
		 * @param tabTitle 可以为空
		 */
		getNextPartnerRoleByProDef:function(v_actName,v_defKey,tabTitle){
			var v_m = new JBPM.common.Map();//new Map
		  	//m.remove("key2");//删除某个key 
		  	v_m.put("result", "to");
			var v_otherParam = v_m.toMapString();
			
			$.ajax({
				url: contextRootPath+'/dojbpm/jyjbpmProvider/getPartnerRoleByProDef.do',
				type: 'POST',
				async:false,
				data:{acitityName:v_actName,proDefKey:v_defKey,otherParamJavaCode:v_otherParam},
				//dataType: 'json',
				error: function(){jyDialog({"type":"error"}).alert('error:');},
				success: function(data){
				    $("#partnerRuleJsonId").val(data);
				  }
				});
			
		},

		/**
		 * 根据formId获取节点配置信息
		 */
		getPartnerRuleInfoByFormId:function(v_formId){
			var v_m = new JBPM.common.Map();//new Map
		  	//m.remove("key2");//删除某个key 
		  	v_m.put("result", "to");
			var v_otherParam = v_m.toMapString();
			
			$.ajax({
				url: contextRootPath+'/dojbpm/jyjbpmProvider/getPartnerRuleInfoByFormId.do',
				type: 'POST',
				async:false,
				data:{formId:v_formId,otherParamJavaCode:v_otherParam},
				//dataType: 'json',
				error: function(){jyDialog({"type":"error"}).alert('error:');},
				success: function(data){
					  $("#partnerRuleJsonId").val(data);		 
					}
				});	
		},
		/**
		 * 完成任务时获取下一个节点的角色配置
		 */
		getNextPartnerRole:function(){
			var v_taskId = $("#dtotaskId").val();
			var v_proInsId = $("#processInsId").val();
			var v_actNa = $("#acitityName").val();
			var v_bizTabId = $("#bizTabId").val();
			var v_bizTabNa = $("#bizTabName").val();
			var v_bizInfId = $("#bizInfId").val();
			var v_turnDic = $("#dtoturnDirection").val();
			//调用执行流程页面的 js 方法 进行相关业务参数变量的控制
			//makeupPartnerInfo(); 调整 为业务 页面执行
			var v_otherParam = $("#dtootherParamJavaCode").val();
			//alert(v_otherParam);
			//return;
			$.ajax({
				url: contextRootPath+'/dojbpm/jyjbpmProvider/getPartnerRole.do',
				type: 'POST',
				async:false,
				data:{taskId:v_taskId,turnDirection:v_turnDic,processInsId:v_proInsId,
					bizTabId:v_bizTabId,acitityName:v_actNa,bizTabName:v_bizTabNa,
					bizInfId:v_bizInfId,otherParamJavaCode:v_otherParam},
				//data:$("#bizFormData").serialize(),
				//dataType: 'json',
				error: function(XmlHttpRequest,textStatus, errorThrown){
					if(XmlHttpRequest.responseText !=""){
						alert('error:'+XmlHttpRequest.responseText);
					}else{
						alert('getPartnerRuleInfo error');
					}
				},
				success: function(data){
					 $("#partnerRuleJsonId").val(data);
				}
			});
		},
		
		/*
		 * 判断 下一节点 task 选人规则  针对推送角色的情况
		 */
		decidedSelectPartnerRole:function(v_myTurn){
			debugger;
			//获取下一个task 节点参与者规则配置信息
			JBPM.common.getNextPartnerRole();
			//判断 决策 是否 弹出 选人页面
			var nextFlag = JBPM.common.decidedSelectDialog(v_myTurn);//是否继续执行 弹出选人规则 则不继续向下执行
			return nextFlag;
		},
		/**
		 * 任务池 签收任务和撤销签收任务处理
		 * 自动分配角色组时需要此处理
		 * @param v_taskId 任务ID
		 * @param v_formId formId
		 * @param v_state 锁定状态 1：锁定 0：解锁
		 * @param v_loginUser 当前登录用户
		 * @param v_curOwner  当前任务归属人
		 */
		acceptTask:function(v_taskId,v_formId,v_state,v_loginUser,v_curOwner){
			debugger;
			//根据formId查询节点的参与者配置信息		
			JBPM.common.getPartnerRuleInfoByFormId(v_formId);
			var ruleJson = eval('(' + $("#partnerRuleJsonId").val() + ')');
			var isAutoAllocatRoleGroup = ruleJson[0].isAutoAllocatRoleGroup;//是否自动分配到角色组
			var group = ruleJson[0].otherParams;//主要存放 角色 信息
			//判断是否进行签收和撤销签收处理，签收时任务由角色组转移到当前登录用户，撤销签收时任务由当前登录用户转移到角色组
			if("true"==isAutoAllocatRoleGroup){
				//将任务由角色组修改为当前登录用户
				if(v_state=='1'){
					JBPM.common.changeAssignee(v_taskId,v_loginUser,v_curOwner);
				}else{//将任务由当前登录用户修改为角色组
					JBPM.common.changeAssignee(v_taskId,group,v_loginUser);
				}
				if(typeof queryData == 'function'){
					queryData();
				}
			}
			//置空
			$("#partnerRuleJsonId").val("");
		},
		
		/**
		 * 任务转移
		 * @param taskId 任务ID
		 * @param toUserId 转移目标用户ID
		 * @param fromUserId 源用户ID
		 */
		changeAssignee:function(taskId,toUserId,fromUserId){
			if(toUserId==fromUserId){
				return;
			}
			$.ajax({ 
			 type:"POST", 
			 async:false, 
			 url:contextRootPath+'/workFlowTask/execute.do', 
			 //dataType:'text', 
			 data:{operateData:'batchUpdateAssignee',tasks:taskId,toUserId:toUserId}, 
			 error: function(){alert('ajax error');}, 
			 success: function(data){ 
			 
			} 
			}); 
		},
		
		/*
		 * 流程发起时，判断指定下一个节点的 参与者
		 * 如果需要 手工选择，则弹出其选人页面
		 */
		selectNextPartner:function(v_actName,v_defKey,v_defVersion,tabTitle){
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
				error: function(){jyDialog({"type":"error"}).alert('error:');},
				success: function(data){
					$("#partnerRuleJsonId").val(data);
					}
				});
			//是否继续执行 弹出选人规则 则不继续向下执行
			var nextFlag = decidedSelectDialog('v_myTurn',tabTitle);
			return nextFlag;
		},
		
		/*
		 * 金额格式化
		 * 使用方法 onkeyup="$('#divId').val(JBPM.common.convertCurrency('1232'))";
		 */
		convertCurrency: function(currencyDigits) {
			// Constants:
			 var MAXIMUM_NUMBER = 99999999999.99;
			 // Predefine the radix characters and currency symbols for output:
			 var CN_ZERO = "零";
			 var CN_ONE = "壹";
			 var CN_TWO = "贰";
			 var CN_THREE = "叁";
			 var CN_FOUR = "肆";
			 var CN_FIVE = "伍";
			 var CN_SIX = "陆";
			 var CN_SEVEN = "柒";
			 var CN_EIGHT = "捌";
			 var CN_NINE = "玖";
			 var CN_TEN = "拾";
			 var CN_HUNDRED = "佰";
			 var CN_THOUSAND = "仟";
			 var CN_TEN_THOUSAND = "万";
			 var CN_HUNDRED_MILLION = "亿";
			 var CN_SYMBOL = "";
			 var CN_DOLLAR = "元";
			 var CN_TEN_CENT = "角";
			 var CN_CENT = "分";
			 var CN_INTEGER = "整";
			 // Variables:
			 var integral; // Represent integral part of digit number.
			 var decimal; // Represent decimal part of digit number.
			 var outputCharacters; // The output result.
			 var parts;
			 var digits, radices, bigRadices, decimals;
			 var zeroCount;
			 var i, p, d;
			 var quotient, modulus;
			 // Validate input string:
			 currencyDigits = currencyDigits.toString();
			 if (currencyDigits == "") {
			     return "还没有输入数字！";
			 }
			 if (currencyDigits.match(/[^,.\d]/) != null) {
			     return "请输入有效数字!";
			 }
			 if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
			     return "请输入有效格式数字！";
			 }
			 // Normalize the format of input digits:
			 currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
			 currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
			 // Assert the number is not greater than the maximum number.
			 if (Number(currencyDigits) > MAXIMUM_NUMBER) {
			     return "输入的数字太大了!";
			 }
			 // Process the coversion from currency digits to characters:
			 // Separate integral and decimal parts before processing coversion:
			 parts = currencyDigits.split(".");
			 if (parts.length > 1) {
			     integral = parts[0];
			     decimal = parts[1];
			     // Cut down redundant decimal digits that are after the second.
			     decimal = decimal.substr(0, 2);
			 } else {
			     integral = parts[0];
			     decimal = "";
			 }
			 // Prepare the characters corresponding to the digits:
			 digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
			 radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
			 bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
			 decimals = new Array(CN_TEN_CENT, CN_CENT);
			 // Start processing:
			 outputCharacters = "";
			 // Process integral part if it is larger than 0:
			 if (Number(integral) > 0) {
			     zeroCount = 0;
			     for (i = 0; i < integral.length; i++) {
			         p = integral.length - i - 1;
			         d = integral.substr(i, 1);
			         quotient = p / 4;
			         modulus = p % 4;
			         if (d == "0") {
			             zeroCount++;
			         } else {
			             if (zeroCount > 0) {
			                 outputCharacters += digits[0];
			             }
			             zeroCount = 0;
			             outputCharacters += digits[Number(d)] + radices[modulus];
			         }
			         if (modulus == 0 && zeroCount < 4) {
			             outputCharacters += bigRadices[quotient];
			         }
			      }
			      outputCharacters += CN_DOLLAR;
			 }
			 // Process decimal part if there is:
			 if (decimal != "") {
			     for (i = 0; i < decimal.length; i++) {
			         d = decimal.substr(i, 1);
			         if (d != "0") {
			             outputCharacters += digits[Number(d)] + decimals[i];
			         }
			     }
			 }
			 // Confirm and return the final output string:
			 if (outputCharacters == "") {
			     outputCharacters = CN_ZERO + CN_DOLLAR;
			 }
			 if (decimal == "") {
			     outputCharacters += CN_INTEGER;
			 }
			 outputCharacters = CN_SYMBOL + outputCharacters;
			 return outputCharacters;
		},
		/*
		 *判断用户的浏览器 是否是IE chrome 
		 * return : MSIE 为IE 
		 */
		getOs : function(){
			var OsObject = "";  
		   if(navigator.userAgent.indexOf("MSIE")>0) {  
		   	var b_version=navigator.appVersion
			var version=b_version.split(";");
			var trim_Version=version[1].replace(/[ ]/g,"");
		   	//alert("trim_Version:"+trim_Version);
			   if(trim_Version == 'MSIE10.0' ){
			   		return "Safari";
			   }
		        return "MSIE";  
		   }  
		   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		        return "Firefox";  
		   }  
		   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
		        return "Safari";  
		   }   
		   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
		        return "Camino";  
		   }  
		   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
		        return "Gecko";  
		   } 
		},
		/*
		 *将json数据转换成 字符串 
		 */
		json2str :function (ojson) { 
			var arr = []; 
			var fmt = function(s) { 
				if (typeof s == 'object' && s != null) return JBPM.common.json2str(s); 
				return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s; 
			} 
			for (var i in ojson) arr.push("'" + i + "':" + fmt(ojson[i])); 
			return '{' + arr.join(',') + '}'; 
		},
	    
		/**   
		 * Simple Map   
		 * var m = new Map();   
		 * m.put('key','value');   
		 * ...   
		 * var s = "";   
		 * m.each(function(key,value,index){   
		 *      s += index+":"+ key+"="+value+"/n";   
		 * });   
		 * alert(s);   
		 */    
		Map :function () {
			Array.prototype.remove = function(val) {
	            var index = this.indexOf(val);
	            if (index > -1) {
	                this.splice(index, 1);
	            }
	        };
		    this.keys = new Array(); /** 存放键的数组(遍历用到) */     
		    this.data = new Object();/** 存放数据 */    
		    /**   
		     * 放入一个键值对   
		     * @param {String} key   
		     * @param {Object} value   
		     */    
		    this.put = function(key, value) {     
		        if(this.data[key] == null){     
		            this.keys.push(key);
		        }
		        this.data[key] = value;
		    };     
		    /**   
		     * 获取某键对应的值   
		     * @param {String} key   
		     * @return {Object} value   
		     */    
		    this.get = function(key) {
		        return this.data[key];
		    };
		    /**   
		     * 删除一个键值对   
		     * @param {String} key   
		     */    
		    this.remove = function(k) {
		    	this.keys.remove(k);
		    	//delete this.keys[k];
		    	this.data[k] = null;     
		    };
		    /**   
		     * 遍历Map,执行处理函数   
		     *    
		     * @param {Function} 回调函数 function(key,value,index){..}   
		     */    
		    this.each = function(fn){     
		        if(typeof fn != 'function'){     
		            return;     
		        }     
		        var len = this.keys.length;     
		        for(var i=0;i<len;i++){     
		            var k = this.keys[i];     
		            fn(k,this.data[k],i);     
		        }     
		    };     
		    /**   
		     * 获取键值数组(类似Java的entrySet())   
		     * @return 键值对象{key,value}的数组   
		     */    
		    this.entrys = function() {     
		        var len = this.keys.length;     
		        var entrys = new Array(len);     
		        for (var i = 0; i < len; i++) {     
		            entrys[i] = {     
		                key : this.keys[i],     
		                value : this.data[i]     
		            };     
		        }     
		        return entrys;     
		    };     
		    /**   
		     * 判断Map是否为空   
		     */    
		    this.isEmpty = function() {     
		        return this.keys.length == 0;     
		    };     
		    /**   
		     * 获取键值对数量   
		     */    
		    this.size = function(){     
		        return this.keys.length;     
		    };     
		    /**   
		     * 重写toString    
		     */    
		    this.toString = function(){     
		        var s = "{";     
		        for(var i=0;i<this.keys.length;i++,s+=','){
		            var k = this.keys[i];     
		            s += k+"="+this.data[k];     
		        }     
		        s+="}";     
		        return s;     
		    };
		    /**   
		     * 重写toString    
		     */    
		    this.toMapString = function(){
		        var s = "java.util.Map map = new java.util.HashMap();";     
		        for(var i=0;i<this.keys.length;i++){
		        	var k = this.keys[i];
		        	if(i != 0)	s +=";";
		        	
		            s += "map.put(\""+k+"\",\""+this.data[k]+"\")";
		        }     
		        s+="; return map;";     
		        return s;     
		    };
		}, 
		/**
		*设置iframe页面内容自适应大小
		*
		*/
		autoSetIframHeight : function(v_Iframeid){
			try{
				$(window.parent.document).find("#"+v_Iframeid).load(function(){
					var main = $(window.parent.document).find("#"+v_Iframeid);
					//var thisheight = $(document).height()+35;
					var thisheight = $(document).height();
					main.height(thisheight);
				}); 
			}catch(e){}
		}
	};
	
	if(typeof JBPM == "undefined") window.JBPM={};
	JBPM.common = _common;
})();