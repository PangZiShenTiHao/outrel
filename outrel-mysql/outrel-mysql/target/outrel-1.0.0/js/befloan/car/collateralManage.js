//新增押品
function toAddPage(intoId){
	var title = "新增押品("+intoId+")";
	var parentTitle=getActiveTabTitle();
//	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/uploadIntoAttachment';
	var url=contextRootPath+'/car/prepareExecute/collateralPage?operation=add'+'&intoAppId='+$("#hd_intoID").val()+'&ownerName='+$("#hd_ownerName").val()+'&costomerCode='+$("#hd_coustomerCode").val()+"&tabTitle="+title+"&parentTitle="+parentTitle;
	var obj = {
			"title" : title,
			"url" : url,
			"cascade": true,
			"closeFun":function(iframe,closeFun){
				debugger;
				var closeBtn=iframe.getBtn3()[0];
				flushTab(parentTitle);
				closeFun();
//				closeBtn.click();
			}
	};
	window.top.tabs.add(obj);
}

//修改押品
function toEditData(intoId){
	var v_objs=getObjs("请选择待修改的押品！");
	if(!v_objs){
		return;
	}
	var v_objs2=getObjs2("只能选择一条数据 ！");
	if(!v_objs2){
		return;
	}
	var collCode = v_objs[0].collateralCode;
	var title = "修改押品("+collCode+")";
	var parentTitle=getActiveTabTitle();
	var url=contextRootPath+'/car/prepareExecute/collateralPage?operation=edit&collCode='+collCode+"&tabTitle="+title+"&parentTitle="+parentTitle;
	var obj = {
			"title" : title,
			"url" : url,
			"cascade": true,
			"closeFun":function(iframe,closeFun){
				debugger;
				var closeBtn=iframe.getBtn3()[0];
				flushTab(parentTitle);
				closeFun();
//				closeBtn.click();
			}
	};
	window.top.tabs.add(obj);
}

//移除押品
function toDelData(){
	var v_objs=getObjs("请选择待移除的押品！");
	if(!v_objs){
		return;
	}
	var collArry="";
	for(var ele in v_objs){
		if(v_objs[ele].importState=="是"){//选择已引入的押品
			collArry += '&collateral_code='+v_objs[ele].collateralCode
		}else{
			$("").newMsg({}).show("请选择已引入的押品！");
		}
	}
	var into_code = $("#hd_intoID").val();//进件编号
	var url = contextRootPath+'/car/removeCollateralRel?into_code='+into_code +collArry;
	$.ajax({
		 type:"POST",
	     dataType:"JSON",
	     url:url,
	     success:function(){
	    	 //刷新
	    	 queryData();
	     }
	});
	
}

//押品引入
function toImport(){
	var v_objs=getObjs("请选择待引入的押品！");
	if(!v_objs){
		return;
	}
	var collArry="";
	for(var ele in v_objs){
		if(v_objs[ele].importState=="否"){//选择未引入的押品
			collArry += '&collateral_code='+v_objs[ele].collateralCode
		}
		
	}
	
	var into_code = $("#hd_intoID").val();//进件编号
	var collateral_name = v_objs.collateralName;//押品名称
	var collateral_code = v_objs.collateralCode;//押品编号
	var collateral_type = v_objs.collateralLevel;//押品类别
	var collateral_state = v_objs.collateralState;//押品状态
	var owner_name = v_objs.collateralOwner;//抵质押品人名称
	var import_state = v_objs.importState;//抵质押品人名称
	if(collArry !=""){
		var url=contextRootPath+'/car/savaCollateralRel?into_code='+into_code +collArry;
		$.ajax({
	        type:"POST",
	        dataType:"JSON",
	        url:url,
	        success:function(msg){
	        	if('error'==msg){
	        		jyDialog({"type":"warn"}).alert("调用接口同步业务与押品的关系失败！")
	        	}
	        	//刷新列表
//	        	initFn();
	        	queryData();
	        }
	    });
	} else{
		$("").newMsg({}).show("您选择的押品已全部引入！");
		return;
	}
	
}
//查看押品详细信息 （调用押品系统URL）
function viewDataByCollCode(collCode){
	var title = "查看押品("+collCode+")";
	var parentTitle=getActiveTabTitle();
	var url=contextRootPath+'/car/prepareExecute/collateralPage?operation=check&collCode='+collCode+"&tabTitle="+title+"&parentTitle="+parentTitle;
	var obj = {
			"title" : title,
			"url" : url,
			"cascade": true,
			"closeFun":function(iframe,closeFun){
				debugger;
				var closeBtn=iframe.getBtn3()[0];
				closeFun();
//				closeBtn.click();
			}
	};
	window.top.tabs.add(obj);
}

//刷新指定的tab(按照tab标题)
function flushTab(tabTitle) {
	var winObj=window.top.tabs.getTabWinByTitle(tabTitle);
	if(winObj){
		winObj.queryData();
	}
}
//获取当前活动tab的标题
function getActiveTabTitle() {
	return window.top.tabs.getActiveObj().title;
}

//关闭tab(按照tab标题),并且刷新父tab
function closeTab(tabTitle, parentTitle) {
	debugger;
	if(parentTitle) {
//		flushTab(parentTitle)
		window.top.tabs.activeByTitle(parentTitle);
	}
	
	window.top.tabs.close(tabTitle);
}

//获取选中行的对象
function getObjs(alertMsg){
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_objs.length == 0){
		$("").newMsg({}).show(alertMsg);
		return;
	}
	//如果选择多个 择提示
//	if(v_objs.length > 1){
//		$("").newMsg({}).show("请选择一条数据！");
//		return;
//	}
	return v_objs;
}
//获取选中行的对象
function getObjs2(alertMsg){
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	//如果选择多个 择提示
	if(v_objs.length > 1){
		$("").newMsg({}).show("只能选择一条数据！");
		return;
	}
	return v_objs;
}