/*
 * 提交 执行 待办任务
 */
var dialogUpdate;
	function subTask(params){
		var turnDirection=$("#dtoturnDirection").val();

		var obj= iframe.iframeObj["table"].getSelectedObjs("");
		jyDialog({"type":"question"}).confirm("您确认对选择的["+obj.length+"]笔记录审批"+params+"吗？",function(){
			for(var i=0;i<obj.length;i++){
				makeupPartnerInfo(obj[i]);//遍历参数
				var otherParamJavaCode=$("#dtootherParamJavaCode").val();
							var url = contextRootPath
									+ "/jbpmOverAgingLock/executeOverAgingWorkflow?processInsId="+ obj[i].CUR_EXE_ID + "&bizTabId="+ obj[i].BIZ_TAB_ID + "&acitityName="+ obj[i].CUR_ACT_NAME + "&taskId="+ obj[i].TASKID + "&turnDirection="+ turnDirection + "&otherParamJavaCode="+ otherParamJavaCode + "&refuseMeg="+ params + "&id="+ obj[i].id + "&nextPartnerId="+$("#dtoparamUserId").val();
							//通过ajax保存
							jyAjax(url,"",function(msg){
								var v_status = msg.status;
								if(v_status.indexOf('ok') >-1){
									if(i==(obj.length-1)){
										$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
										queryData();
									}
								}
							},"","",false);
						}
			queryData();
					},"确认提示");
	}
/*
 * 组装选中的参与者信息
 */
 function makeupPartnerInfo(obj){
	 var v_m = new JBPM.common.Map();//new Map
	    v_m.put("result", "to");
	    v_m.put("proTaskId",obj.TASKID+"");
		v_m.put("proProcessInsId",obj.CUR_EXE_ID+"");
		v_m.put("proAcitityName", obj.CUR_ACT_NAME+"");
		v_m.put("proBizTabId", obj.BIZ_TAB_ID+"");
		v_m.put("proBizTabName", obj.BIZ_TAB_NAME+"");
		v_m.put("proBizInfId", obj.BIZ_INF_ID+"");
		var v_userId = $("#dtoparamUserId").attr("value");//指定参与者id
		v_m.put("owner",v_userId);
		var v_otherMap = v_m.toMapString();
		$("#dtootherParamJavaCode").val(v_otherMap);
	}

//上传文件
function toUploadFile(){
    //getValueForIndex("listStat",);
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    //如果没有选中 数据则
    if(v_ids == ""){
        jyDialog({"type":"warn"}).alert("请先选择一条数据！");
        return;
    }
    //如果选择多个 择提示
    if(v_ids.indexOf(",") > -1){
        jyDialog({"type":"warn"}).alert("只能选择一条数据！");
        return;
    }

    var dialogStruct={
        'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=36",
        'width':1100,
        'height':800,
        'title':'上传',
        'buttons':[
            {'text':'关闭','isClose':true}
        ]
    };

    dialogUpdate =jyDialog(dialogStruct);
    dialogUpdate.open();
}