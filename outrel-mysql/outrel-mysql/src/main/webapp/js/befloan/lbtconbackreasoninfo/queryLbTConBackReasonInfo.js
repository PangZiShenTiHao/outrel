function querySelect(){
		//默认加载一级原因
		queryBackReason('0','oneRefuseCode');
		//选择一级原因时,显示二级原因
		$("select[name='oneRefuseCode']").bind("change",function(){
			var sText=$("select[name=oneRefuseCode]").val();
			if(sText){
				queryBackReason(sText.substring(1),'twoRefuseCode');
			}else{
				 $("select[name=twoRefuseCode] option").remove(); 
			}
		});
}
//获取下拉框中的原因
function queryBackReason(parentId,dtoBackReasonId){
		 var url=contextRootPath+"/lbTBackReasonInfo/queryBackReason?parentId="+parentId;
			jyAjax(
					url,
					'',
					function(result){
					var v_status = result.status;
		        	 if(v_status.indexOf('ok') >-1){
		        		 $("select[name='"+dtoBackReasonId+"'] option").remove(); 
		        		  $("select[name='"+dtoBackReasonId+"']").append("<option value=''>--请选择--</option>"); 
		        		//追加新的列表
		    			 $("select[name='"+dtoBackReasonId+"']").append(result.data);
		        	}
			});
	}