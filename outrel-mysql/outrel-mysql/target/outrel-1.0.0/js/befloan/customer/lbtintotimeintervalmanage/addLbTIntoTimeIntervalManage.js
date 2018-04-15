//新增页面js处理

/**
 * 得到原因类型
 */
function queryReasonType(){
	 var url=contextRootPath+"/lbTIntoTimeIntervalManage/queryReasonType?dictCode=DQ_INTO_INTERVAL_TYPE";
	 jyAjax(
				url,
				'',
				function(result){
				var v_status = result.status;
	        	 if(v_status.indexOf('ok') >-1){
	        		 //移除旧的列表
	        		 $("#dtoreasonType option").remove(); 
	        		 $("#dtoreasonType").append("<option value=''>--请选择--</option>");
	        		 //追加新的列表
	 				$("#dtoreasonType").append(result.data);
	        	}
		});
}
/**
 * 得到一级原因
 * @param reasonType
 */
function queryReasonOne(reasonType){
	removeSelect('1');
	queryRefuseReason();
	var url="";
	if(reasonType==1){
	   url="/lbTIntoTimeIntervalManage/queryReasonType?dictCode=STORE_INTO_QUIT_REASON1";
	}else if(reasonType==2){
		url="/lbTIntoInfo/querySecondRefuseReasonsInfo";
	}
	comQueryReason('dtoreasonOne',url,reasonType);
}
/**
 * 得到二级原因
 * @param reasonType
 */
function queryReasonTwo(refuseCode){
	removeSelect('2');
	queryRefuseReason();
	var dtoreasonOne=$("#dtoreasonOne").val();
	if(dtoreasonOne){
		var url="";
		var reasonType=$("#dtoreasonType").val();
		if(reasonType==1){
		   url="/lbTIntoTimeIntervalManage/queryReasonType?dictCode=STORE_INTO_QUIT_REASON";
		}else if(reasonType==2){
			url="/lbTIntoInfo/querySecondRefuseReasonsInfo?refuseCode="+refuseCode;
		}
		comQueryReason('dtoreasonTwo',url,reasonType);
	}
}
function comQueryReason(showDtoId,url,reasonType){
	var url=contextRootPath+url;
	if(reasonType==1){//放弃
		 jyAjax(
					url,
					'',
					function(result){
					var v_status = result.status;
		        	 if(v_status.indexOf('ok') >-1){
		        		 //追加新的列表
		 				$("#"+showDtoId).append(result.data);
		        	}
			});
	}else if(reasonType==2){//拒贷
		jyAjax(
				url,
				'',
				function(result){
				var v_status = result.status;
	        	 if(v_status.indexOf('ok') >-1){
	        		 $.each(result.data, function(idx, e){
	        			  $("#"+showDtoId).append("<option value='"+e.refuseCode+"'>"+e.refuseReason+"</option>")
	        		 })
	        	}
		});
	}
}



function removeSelect(type){
	if(type==1){
		//移除旧的列表
		$("#dtoreasonOne option").remove(); 
		$("#dtoreasonTwo option").remove(); 
		$("#dtoreasonOne").append("<option value=''>--请选择--</option>");
		$("#dtoreasonTwo").append("<option value=''>--请选择--</option>");
	}else if(type==2){
		 //移除旧的列表
		 $("#dtoreasonTwo option").remove(); 
		 $("#dtoreasonTwo").append("<option value=''>--请选择--</option>");
	}
}
/**
 * 显示拒绝原因列表
 */
function queryRefuseReason(){
	var typeCode=$("#dtoreasonType").val();//原因类型
	var reasonCode1=$("#dtoreasonOne").val();//一级原因
	var reasonCode2=$("#dtoreasonTwo").val();//二级原因
	 var url=contextRootPath+"/lbTIntoTimeIntervalManage/queryRefuseReason?typeCode="+typeCode+"&reasonCode1="+reasonCode1+"&reasonCode2="+reasonCode2;
		jyAjax(
				url,
				'',
				function(result){
				var v_status = result.status;
	        	 if(v_status.indexOf('ok') >-1){
	        		$("#showTable").html("");
	        		$("#showTable").html(result.data);
	        	}
		});
}
/**
 * 点击某行时,判断首列复选框是选中还是取消
 * @param e
 */
function chkBoxTr(e){
	if(document.getElementById("ck"+e).checked){
		document.getElementById("ck"+e).checked=false;
	}else{
		document.getElementById("ck"+e).checked=true;
	}
}
/**
 * 点击全选框时
 */
function chkBoxAll(){
	if(document.getElementById("chkAll").checked){
		comChkBoxAll(1);
	}else{
	    comChkBoxAll(0);
	}
}
/**
 * 使用js实现全选或反选
 * @param value
 */
function comChkBoxAll(value){
	var checklist = document.getElementsByName ("chkBox");
	 for(var i=0;i<checklist.length;i++){
	      checklist[i].checked = value;
	   }
}
/**
 * 点击单个复选框时
 * @param e
 */
function chkBoxThis(e){
	chkBoxTr(e);
}