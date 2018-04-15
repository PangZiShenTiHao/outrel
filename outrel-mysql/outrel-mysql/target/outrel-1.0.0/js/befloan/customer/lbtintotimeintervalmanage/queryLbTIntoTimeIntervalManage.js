//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTIntoTimeIntervalManage/prepareExecute/toAdd',
		'width':1045,
		'height':600,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	var dtoreasonType= obj.dtoreasonType.value;
	var timeInterval= obj.dtotimeInterval.value;
	if(!dtoreasonType){
		jyDialog({"type":"info"}).alert("请选择原因类型！");
		return;
	}
	if(!timeInterval){
		jyDialog({"type":"info"}).alert("请填写时间间隔！");
		return;
	}
	//得到选择的拒绝原因列表
	 var valArr = new Array;
	 obj.$("input[name='chkBox']:checkbox:checked").each(function(i){
		valArr[i] = $(this).val();
	 });
	var vals = valArr.join(',');//转换为逗号隔开的字符串
	var params=obj.$("#addNewsFormData").serialize()+"&cNum="+vals;
	var url=contextRootPath+'/lbTIntoTimeIntervalManage/insertLbTIntoTimeIntervalManage';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();
        		queryData();
        	}
  	});
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/lbTIntoTimeIntervalManage/prepareExecute/toUpdate?id='+v_ids,
			'width':600,
			'height':400,
			'title':'修改配置',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!obj.ckData()) return;
	var id=obj.dtoid.value;
	var timeInterval=obj.dtoTimeInterval.value;
	var url=contextRootPath+'/lbTIntoTimeIntervalManage/updateLbTIntoTimeIntervalManage?ids='+id+"&timeInterval="+timeInterval;
	//通过ajax保存
	jyAjax(
		url,
		'',
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		dialogUpdateObj.close();
        		queryData();
        	}
  	});
}
//修改数据 (生效2、失效3、废弃4)
function editDataState(state){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待操作的数据！");
		return;
	}
	if(ckEditData(state)){
		jyDialog({"type":"question"}).confirm("您确认要操作选择的数据吗？",function(){
			$.ajax({
	            type:"POST",
	            dataType:"json",
	            url:contextRootPath+"/lbTIntoTimeIntervalManage/updateLbTIntoTimeIntervalManage?ids="+v_ids+"&state="+state,
	            success:function(msg){
	            	$("").newMsg({}).show(msg.msg);
	            	var v_status = msg.status;
	            	//操作成功后
	            	if(v_status.indexOf('ok') >-1){
	            		queryData();
	            	}
	            }
	        });
		   },"确认提示");
	};
}
/**
 * 修改数据时,对数据状态进行验证
 * state(生效2、失效3、废弃4)
 */
function ckEditData(state){
	var objs = iframe.iframeObj["table"].getSelectedObjs("");
	if(objs.length>0){
		if(state=='2'){//生效(只能生效初始录入和失效)
			for(var i=0;i<objs.length;i++){
				if(objs[i].manageState!='1' && objs[i].manageState!='3'){
					jyDialog({"type":"info"}).alert("只能生效状态值为:初始录入和失效的数据！");
					return false;
				}
			}
		}else if(state=='3'){//失效(只能失效已生效的数据)
			for(var i=0;i<objs.length;i++){
				if(objs[i].manageState!='2'){
					jyDialog({"type":"info"}).alert("只能失效状态值为:已生效的数据！");
					return false;
				}
			}
		}else if(state=='4'){//废弃(只能废弃初始录入和失效)
			for(var i=0;i<objs.length;i++){
				if(objs[i].manageState=='2'){
					jyDialog({"type":"info"}).alert("只能废弃状态值为:初始录入和失效的数据！");
					return false;
				}
			}
		}
		return true;
	}else{
		jyDialog({"type":"info"}).alert("请选择待操作的数据！");
		return false;
	}
}
/**
 * 页面查询条件级联
 */
function queryReason(){
	$("select[name='reasonType']").bind("change",function(){
		removeSelect('1');
		 var url="";
		 var reasonType=$("select[name='reasonType']").val();
		 if(reasonType==1){//放弃
			 url="/lbTIntoTimeIntervalManage/queryReasonType?dictCode=STORE_INTO_QUIT_REASON1";
		 }else if(reasonType==2){
			 url="/lbTIntoInfo/querySecondRefuseReasonsInfo";
		 }
		 if(reasonType){
			 comSelect('reasonOne',reasonType,url);
		 }
	});
	
	
	 $("select[name='reasonOne']").bind("change",function(){
		 var url="";
		 removeSelect('2');
		 var reasonType=$("select[name='reasonType']").val();
		 var refuseCode=$("select[name='reasonOne']").val();
		 if(reasonType==1){//放弃
			 url="/lbTIntoTimeIntervalManage/queryReasonType?dictCode=STORE_INTO_QUIT_REASON";
		 }else if(reasonType==2){
			 url="/lbTIntoInfo/querySecondRefuseReasonsInfo?refuseCode="+refuseCode;
		 }
		 if(refuseCode){
		 	comSelect('reasonTwo',reasonType,url);
		 }
	}); 
	function comSelect(showName,reasonType,url){
		var url=contextRootPath+url;
					if(reasonType==1){//放弃
						 jyAjax(
									url,
									'',
									function(result){
									var v_status = result.status;
						        	 if(v_status.indexOf('ok') >-1){
				        				//追加新的列表
							 			$("select[name='"+showName+"']").append(result.data);
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
					        			  $("select[name='"+showName+"']").append("<option value='"+e.refuseCode+"'>"+e.refuseReason+"</option>")
					        		 })
					        	}
						});
				}
	}
	function removeSelect(type){
		if(type==1){
			//移除旧的列表
			$("select[name='reasonOne'] option").remove(); 
			$("select[name='reasonOne']").append("<option value=''>--请选择--</option>");
			//移除旧的列表
			$("select[name='reasonTwo'] option").remove(); 
			$("select[name='reasonTwo']").append("<option value=''>--请选择--</option>");
		}else if(type==2){
			//移除旧的列表
			 $("select[name='reasonTwo'] option").remove(); 
			 $("select[name='reasonTwo']").append("<option value=''>--请选择--</option>");
		}
	}
}