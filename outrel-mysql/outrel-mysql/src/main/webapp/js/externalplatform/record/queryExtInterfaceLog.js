/**
 * 页面查询条件级联
 */
function queryFunc(){
	jyAjax(
			contextRootPath+"/extSysManagement/queryExtSysManagementList",
			'',
			function(result){
			var v_status = result.status;
        	 if(v_status.indexOf('ok') >-1){
        		 $.each(result.data, function(idx, e){
        			  $("select[name='sysCode']").append("<option value='"+result.data[idx].sysCode+"'>"+result.data[idx].sysName+"</option>")
        		 })
        	}
	});
	$("select[name='sysCode']").append("<option value=''>--请选择--</option>");
	$("select[name='sysCode']").bind("change",function(){
		//移除旧的列表
		 $("select[name='funcTypeCode'] option").remove(); 
		 $("select[name='funcTypeCode']").append("<option value=''>--请选择--</option>");
		//移除旧的列表
		 $("select[name='reqFuncCode'] option").remove(); 
		 $("select[name='reqFuncCode']").append("<option value=''>--请选择--</option>");
		
		 var sysCode=$("select[name='sysCode']").val();
		 var url=contextRootPath+"/extFunctionType/queryExtFunctionTypeList?sysCode="+sysCode;
		 comSelect('funcTypeCode',url);
	});
	
	
	 $("select[name='funcTypeCode']").bind("change",function(){
		//移除旧的列表
		 $("select[name='reqFuncCode'] option").remove(); 
		 $("select[name='reqFuncCode']").append("<option value=''>--请选择--</option>");
		 var funcTypeCode=$("select[name='funcTypeCode']").val();
		 var url=contextRootPath+"/extFunctionType/queryExtFunctionTypeList?funcTypeCode="+funcTypeCode;
		 comSelect('reqFuncCode',url);
	}); 
	function comSelect(showName,url){
		jyAjax(
				url,
				'',
				function(result){
				var v_status = result.status;
	        	 if(v_status.indexOf('ok') >-1){
	        		 $.each(result.data, function(idx, e){
	        			  $("select[name='"+showName+"']").append("<option value='"+result.data[idx].funcTypeCode+"'>"+result.data[idx].funcTypeName+"</option>")
	        		 })
	        	}
		});
	}
}