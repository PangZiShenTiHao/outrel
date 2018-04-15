//utf-8
/**
*	对应jsp 页面中的js 只存放 $(document).ready(function(){ ... });
*
**/
function closeWindow(){
var api = frameElement.api, W = api.opener;
	 api.close();
}
function saveUpdateData(){
	dealData();
	
//所有的验证通过后才进行表单的提交
	var v_boolean = $("#updateForm").validationEngine("validate");
	if(v_boolean){
		$("#saveBtn").attr("disabled",true);
		//document.updateForm.submit();
		//调用ajax开始生成代码
		var timestamp = (new Date()).valueOf();
		$.ajax({
		type:"POST",
		async:false, 
		url:JBPM4_PATH+"updateJbpm4FormInfo.do?timestamp="+timestamp,
		//data:{operateOfAction:$("#dtotableName").val()},
		data:$("#updateForm").serialize(),//提交的表单信息
		success: function(data){
				alert(data);
				closeWindow();
			}
		});	
		
	}
	
}

function dealData(){
	var select = document.getElementById("backNodeInfo");
    var str = "";
    for(i=0;i<select.length;i++){
        if(select.options[i].selected&&select[i].value!=null&&select[i].value!=""){
            str=str+select[i].value+",";
        }
    }
    document.getElementById("dtoext1").value=str;
    var select2 = document.getElementById("jumpNodeInfo");
    var str2 = "";
    for(i=0;i<select2.length;i++){
        if(select2.options[i].selected&&select2[i].value!=null&&select2[i].value!=""){
            str2=str2+select[i].value+",";
        }
    }
    document.getElementById("dtoext2").value=str2;
}



//指定任务处理人
function selectPartner(){
	//获取全局的lgdialog参数信息
	var api = frameElement.api, W = api.opener;
	//打开选择菜单 子页面
	W.$.dialog({
		id:	'selectPartnerDialogId',
	    lock: true, 
	    width:800,
	    height:800,
	    title:'选择处理任务人员',
	    content: 'url:component/jbpm/selectPartner/selectMakeupFormPartner.jsp?dto.partnerSqlId=same_company',
	    parent:api,
	    close:function() { 
			//弹出两层时 iframe 丢失焦点处理	
	        api.opener.$.dialog({ id:'makeupFormInfoId' });
	        return true; 
    	}
	});
}

//查询该任务人可以选择的参与者信息
function queryMyPartners(){
	var v_boolean = $("#queryPartners").validationEngine("validate");
	if(v_boolean){
	var v_url = 'component/jbpm/selectPartner/selectMakeupFormPartner.jsp?formDTO.turnDirection='+encodeURI($("#dtoturnDirection").attr("value"))+'&formDTO.id='+$("#dtoid").attr("value")+'&formDTO.taskUserId='+$("#dtoparamUserId").val();
		//获取全局的lgdialog参数信息
		var api = frameElement.api, W = api.opener;
		//打开选择菜单 子页面
		W.$.dialog({
			id:	'selectPartnerDialogId',
		    lock: true, 
		    width:800,
		    height:800,
		    title:'可选参与者',
		    content: 'url:'+v_url,
		    parent:api,
		    close:function() { 
				//弹出两层时 iframe 丢失焦点处理	
		        api.opener.$.dialog({ id:'makeupFormInfoId' });
		        return true; 
	    	}
		});
	
	}
}

//
function changeHideOrShow(){
var v_hml = $("#partnerRolesIdLeg").html();
 	if(v_hml.indexOf("显示") != -1){
 		$("#partnerRolesIdLeg").html("∧隐藏选择参与者设置")
 		$("#partnerRolesId").show();
 		
 	}else{
 		$("#partnerRolesIdLeg").html("∨显示选择参与者设置")
 		$("#partnerRolesId").hide();
 	}
}



