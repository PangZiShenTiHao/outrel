//查询一级原因
function queryRefuseReasonOne(){
	 var url=contextRootPath+"/lbTOrgLimitConfig/queryRefuseReasonsInfo";
	 queryCom(url,'dtorefuseCodeOne');
}
//查询二级原因
function queryRefuseReasonTwo(e){
	if(e!=''){
		var url=contextRootPath+"/lbTOrgLimitConfig/queryRefuseReasonsInfo?refuseCode="+e;
		queryCom(url,'dtorefuseCodeTwo');
		queryRefuseReason();
	}else{
		$("#showTable").html("");
		$("#dtorefuseCodeTwo option").remove(); 
	}
}
//展示select
function queryCom(url,showDtoId){
	 jyAjax(url,"",function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				 //移除旧的列表
	       		 $("#"+showDtoId+" option").remove(); 
	       		 $("#"+showDtoId).append("<option value=''>--请选择--</option>");
	       		 //追加新的列表
					$.each(msg.data, function(idx, e){
	       			  $("#"+showDtoId).append("<option value='"+e.refuseCode+"'>"+e.refuseReason+"</option>");
	       		 });
			}
		},"","",false);
}
/**
 * 显示拒绝原因列表
 */
function queryRefuseReason(){
	var reasonOne=$("#dtorefuseCodeOne").val();//一级原因
	var reasonTwo=$("#dtorefuseCodeTwo").val();//二级原因
	 var url=contextRootPath+"/lbTOrgLimitConfig/queryRefuseReason?reasonOne="+reasonOne+"&reasonTwo="+reasonTwo;
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