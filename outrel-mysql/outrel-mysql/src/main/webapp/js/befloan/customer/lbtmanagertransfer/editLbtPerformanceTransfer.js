$(function(){
	/*
	 * 转移原因进行改变时判断门店是否为空，如不为空，异步加载相应的团队
	 */
	$("#resaonId").change(function(){
		var parentId=$("#dtocomplOrg").val();
		var teamId=$("#manageTeamStoreCode").val();
		 if(parentId!=''){
			 var url=contextRootPath+"/lbtPerformanceTransfer/getOrgByParentId?parentId="+parentId+"&teamId="+teamId;
			 jyAjax(
						url,
						'',
						function(result){
						var v_status = result.status;
			        	 if(v_status.indexOf('ok') >-1){
			        		 //移除旧的列表
			        		 $("#storeId option").remove(); 
			        		 $("#storeId").append("<option value=''>--请选择--</option>");
			        		 //追加新的列表
			 				$("#storeId").append(result.data);
			 				queryInfo();
			        	}
				});
		 }else{
			 $("").newMsg({}).show("请选择新所属门店！");
			 $("#resaonId").val('');
		 }
	});
	/*
	 * 单击新所属门店时，清空选择的转移原因
	 */
	$("#orgName").click(function(){
		 $("#resaonId").val('');
	});
	/*
	 * 单击新所属团队，判断是否选择门店
	 */
	 $("#storeId").click(function(){
		 var parentId=$("#dtocomplOrg").val();
		 if(parentId==''){
			 $("").newMsg({}).show("请选择新所属门店！");
		 }
	 });
	 /*
	  * 改变团队时，异步查询相应的新团队经理编号 、新团队经理、新客户经理编号 、新客户经理
	  */
	 $("#storeId").change(function(){
		 	var orgId=$("#storeId").val();
			/*var oldTeamCode=$("#oldTeam").val();
			if(oldTeamCode==orgId){
				$("").newMsg({}).show("不能同一团队进件转移修改！");
				return;
			}*/
	 	var storeName=$('#storeId option:selected').text();
		$("input[name=manageTeamStore]").val(storeName);
			if(orgId!=''){
				 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByTeamId?orgId="+orgId;
				 jyAjax(
							url+"&positionId=86",//团队经理
							'',
							function(result){
							var v_status = result.status;
				        	 if(v_status.indexOf('ok') >-1){
				        		 //移除团队经理编号
				        		 $("#teamManageId  option").remove(); 
				        		 $("#teamManageId").append("<option value=''>--请选择--</option>");
				        		 //追加团队经理编号
				 				$("#teamManageId").append(result.data.split("@")[0]);
				 				//移除团队经理名称
				 				$("#teamManageName option").remove(); 
				        		 $("#teamManageName").append("<option value=''>--请选择--</option>");
				        		//追加团队经理名称
				 				$("#teamManageName").append(result.data.split("@")[1]);
				        	}
					});
				 
				 jyAjax(
						 url+"&positionId=163,86",//客户经理
							'',
							function(result){
							var v_status = result.status;
				        	 if(v_status.indexOf('ok') >-1){
				        		 //移除客户经理编号
				        		 $("#customerManageId option").remove(); 
				        		 $("#customerManageId").append("<option value=''>--请选择--</option>");
				        		 //追加客户经理编号
				 				$("#customerManageId").append(result.data.split("@")[0]);
				 				//移除客户经理名称
				 				$("#customerManageName option").remove(); 
				        		 $("#customerManageName").append("<option value=''>--请选择--</option>");
				        		 //追加客户经理名称
				 				$("#customerManageName").append(result.data.split("@")[1]);
				        	}
					});
			}else{
				 $("").newMsg({}).show("请选择新所属团队！");
			}
	 
		 });
	 /*
	  * 选择新团队经理编号时，异步显示相应的经理名称
	  */
		 $("#teamManageId").change(function(){
			 var orgId=$("#storeId").val();
				if(orgId!=''){
				  //团队经理编号
					var teamUserId=$("#teamManageId").val();
					if(teamUserId!=''){
						 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByParent?userNo="+teamUserId+"&orgId="+orgId+"&positionId=86";//团队经理
						 jyAjax(
									url,
									'',
									function(result){
									var v_status = result.status;
						        	 if(v_status.indexOf('ok') >-1){
						        		 //移除团队经理名称
						        		 $("#teamManageName  option").remove(); 
						        		 //追加团队经理名称
						 				$("#teamManageName").append(result.data);
						        	}
							});
					}
				}else{
					 $("").newMsg({}).show("请选择新所属团队！");
				}
			 
		 });
		 /*
		  * 选择新团队经理名称时，异步显示相应的经理编号
		  */
		 $("#teamManageName").change(function(){
			 var orgId=$("#storeId").val();
				if(orgId!=''){
				  //团队经理编号
					var teamManageName=$("#teamManageName").val();
					if(teamManageName!=''){
						 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByParent?uName="+teamManageName+"&orgId="+orgId+"&positionId=86";//团队经理
						 jyAjax(
								 url,
									'',
									function(result){
									var v_status = result.status;
						        	 if(v_status.indexOf('ok') >-1){
						        		 //移除团队经理名称
						        		 $("#teamManageId  option").remove(); 
						        		 //追加团队经理名称
						 				$("#teamManageId").append(result.data);
						        	}
							});
					}
				}else{
					 $("").newMsg({}).show("请选择新所属团队！");
				}
			 
		 });
		 /*
		  *  选择新客户经理编号时，异步显示相应的新客户经理名称
		  */
		 $("#customerManageId").change(function(){
			 var orgId=$("#storeId").val();
				if(orgId!=''){
					//客户经理编号
					var customerUserId=$("#customerManageId").val();
					if(customerUserId!=''){
						 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByParent?userNo="+customerUserId+"&orgId="+orgId+"&positionId=163,86";//客户经理
						 jyAjax(
								 url,
									'',
									function(result){
									var v_status = result.status;
						        	 if(v_status.indexOf('ok') >-1){
						        		 //移除客户经理名称
						        		 $("#customerManageName  option").remove(); 
						        		 //追加客户经理名称
						 				$("#customerManageName").append(result.data);
						        	}
							});
					}
				}else{
					 $("").newMsg({}).show("请选择新所属团队！");
				}
			 
		 });
		 /*
		  *  选择新客户经理编号时，异步显示相应的新客户经理名称
		  */
		 $("#customerManageName").change(function(){
			 var orgId=$("#storeId").val();
				if(orgId!=''){
					//客户经理编号
					var customerManageName=$("#customerManageName").val();
					if(customerManageName!=''){
						 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByParent?uName="+customerManageName+"&orgId="+orgId+"&positionId=163,86";//客户经理
						 jyAjax(
								 url,
									'',
									function(result){
									var v_status = result.status;
						        	 if(v_status.indexOf('ok') >-1){
						        		 //移除客户经理名称
						        		 $("#customerManageId  option").remove(); 
						        		 //追加客户经理名称
						 				$("#customerManageId").append(result.data);
						        	}
							});
					}
				}else{
					 $("").newMsg({}).show("请选择新所属团队！");
				}
			 
		 });
		 queryInfo();
	})

/**
 * 根据门店显示出团队，根据团队显示出相应的管理人员
 */
function queryInfo(){
	//用户编辑时，根据门店id,得到团队列表
	var parentId=$("#dtocomplOrg").val();
	var teamId=$("#manageTeamStoreCode").val();
	 if(parentId!=''){
		 var url=contextRootPath+"/lbtPerformanceTransfer/getOrgByParentId?parentId="+parentId+"&teamId="+teamId;
		 jyAjax(
					url,
					'',
					function(result){
					var v_status = result.status;
		        	 if(v_status.indexOf('ok') >-1){
		        		 //移除旧的列表
		        		 $("#storeId option").remove(); 
		        		 $("#storeId").append("<option value=''>--请选择--</option>");
		        		 //追加新的列表
		 				$("#storeId").append(result.data);
		        	}
			});
	 }
	 
		var teamManagerCode=$("#manageTeamManagerCode").val();
		var teamManagerName=$("#manageTeamManagerName").val();
		var customerManagerCode=$("#manageCustomerManagerCode").val();
		var customerManagerName=$("#manageCustomerManagerName").val();
				 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByTeamId?orgId="+teamId
				 jyAjax(
							url+"&positionId=86&code="+teamManagerCode+"&codeName="+teamManagerName,//团队经理
							'',
							function(result){	
							var v_status = result.status;
				        	 if(v_status.indexOf('ok') >-1){
				        		 //移除团队经理编号
				        		 $("#teamManageId  option").remove(); 
				        		 $("#teamManageId").append("<option value=''>--请选择--</option>");
				        		 //追加团队经理编号
				 				$("#teamManageId").append(result.data.split("@")[0]);
				 				//移除团队经理名称
				 				$("#teamManageName option").remove(); 
				        		 $("#teamManageName").append("<option value=''>--请选择--</option>");
				        		//追加团队经理名称
				 				$("#teamManageName").append(result.data.split("@")[1]);
				        	}
					});
				 jyAjax(
						 url+"&positionId=163,86&code="+customerManagerCode+"&codeName="+customerManagerName,//客户经理
							'',
							function(result){
							var v_status = result.status;
				        	 if(v_status.indexOf('ok') >-1){
				        		 //移除客户经理编号
				        		 $("#customerManageId option").remove(); 
				        		 $("#customerManageId").append("<option value=''>--请选择--</option>");
				        		 //追加客户经理编号
				 				$("#customerManageId").append(result.data.split("@")[0]);
				 				//移除客户经理名称
				 				$("#customerManageName option").remove(); 
				        		 $("#customerManageName").append("<option value=''>--请选择--</option>");
				        		 //追加客户经理名称
				 				$("#customerManageName").append(result.data.split("@")[1]);
				        	}
					});
}

