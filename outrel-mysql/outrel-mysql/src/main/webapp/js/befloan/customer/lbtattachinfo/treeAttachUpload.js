var mappingInfo = {
	B1 : [ "identityInformation_1", "tableId_1" ],
	B2 : [ "identityInformation_3", "tableId_1" ],
	B3 : [ "identityInformation_5", "tableId_1" ],
	B4 : [ "identityInformation_6", "tableId_1" ],
	B5 : [ "identityInformation_4", "tableId_1" ],
	B6 : [ "identityInformation_2", "tableId_1" ],
	B7 : [ "tableId_1", "tableId_1" ],
	B8 : [ "identityInformation_7", "tableId_1" ],
	E1 : [ "jobInformation_3", "tableId_2" ],
	E2 : [ "jobInformation_4", "tableId_2" ],
	E3 : [ "jobInformation_1", "tableId_2" ],
	E4 : [ "tableId_2", "tableId_2" ],
	E5 : [ "tableId_2", "tableId_2" ],
	E6 : [ "tableId_2", "tableId_2" ],
	E7 : [ "tableId_2", "tableId_2" ],
	E8 : [ "jobInformation_5", "tableId_2" ],
	D1 : [ "tableId_3", "tableId_3" ],
	D2 : [ "incomeInformation_3", "tableId_3" ],
	D3 : [ "incomeInformation_1", "tableId_3" ],
	D4 : [ "incomeInformation_2", "tableId_3" ],
	D5 : [ "tableId_3", "tableId_3" ],
	D6 : [ "tableId_3", "tableId_3" ],
	D7 : [ "tableId_3", "tableId_3" ],
	D8 : [ "incomeInformation_4", "tableId_3" ],
	F1 : [ "addressInformation_6", "tableId_4" ],
	F2 : [ "addressInformation_7", "tableId_4" ],
	F3 : [ "addressInformation_5", "tableId_4" ],
	F4 : [ "addressInformation_3", "tableId_4" ],
	F5 : [ "tableId_4", "tableId_4" ],
	F6 : [ "tableId_4", "tableId_4" ],
	F7 : [ "addressInformation_8", "tableId_4" ],
	H1 : [ "assetInformation_1", "tableId_5" ],
	H2 : [ "tableId_5", "tableId_5" ],
	H3 : [ "assetInformation_4", "tableId_5" ],
	H4 : [ "tableId_5", "tableId_5" ],
	H5 : [ "tableId_5", "tableId_5" ],
	H6 : [ "tableId_5", "tableId_5" ],
	H7 : [ "tableId_5", "tableId_5" ],
	H8 : [ "assetInformation_5", "tableId_5" ],
	G1 : [ "companyInformation_1", "tableId_6" ],
	G2 : [ "companyInformation_2", "tableId_6" ],
	G3 : [ "companyInformation_3", "tableId_6" ],
	G4 : [ "tableId_6", "tableId_6" ],
	G5 : [ "tableId_6", "tableId_6" ],
	G6 : [ "companyAgreementinfo_5", "tableId_6" ],
	G7 : [ "companyInformation_6", "tableId_6" ],
	I1 : [ "carInformation_2", "tableId_7" ],
	I2 : [ "tableId_7", "tableId_7" ],
	I3 : [ "tableId_7", "tableId_7" ],
	I4 : [ "tableId_7", "tableId_7" ],
	I5 : [ "tableId_7", "tableId_7" ],
	I6 : [ "tableId_7", "tableId_7" ],
	I7 : [ "tableId_7", "tableId_7" ]
};
function viewFuns(nodeId,obj){
	debugger;
	var url = contextRootPath+'/lbTCustAttach/getImagesByType/'+(obj.ID||obj.id)+"/"+obj.ATTTYPE +"/"+$("#prod_Id").val()+"/"+$("#into_Id").val()+"/"+$("#cust_Id").val();
	jyAjax(url,"",function(result){
		debugger;
		var imgList = result.data;
		for(var i=0;i<imgList.length;i++){
			var img = imgList[i];
			img["groupId"]=img["attachType"];
			var node=tree.getTree().getNodeByParam("ATTTYPE",img["groupId"]);
			img["groupName"]=node["NAME"];
			img["name"]=img["codeName"];
			imgList[i]=img;
		}
		if(imgList.length > 0){
			var imageObj = {"imgList": imgList,"basePath":contextRootPath+'/js/plat/imageTool/'};
			imageTool = $("#imagesPanel").newImage(imageObj);
			imageTool.showList();
		}
	});
	showAttachItem(obj["ATTTYPE"]);
};


function viewFun(nodeId,obj){
	debugger;
	var url = contextRootPath+'/lbTCustAttach/getImagesByType/'+(obj.ID||obj.id)+"/"+obj.ATTACH_TYPE +"/"+$("#prod_Id").val()+"/"+$("#into_Id").val()+"/"+$("#cust_Id").val();
	jyAjax(url,"",function(result){
		
		var imgList = result.data;
		for(var i=0;i<imgList.length;i++){
			var img = imgList[i];
			img["groupId"]=img["attachType"];
			var node=tree.getTree().getNodeByParam("ATTTYPE",img["groupId"]);
			img["groupName"]=node["NAME"];
			img["name"]=img["codeName"];
			imgList[i]=img;
		}
		if(imgList.length > 0){
			var imageObj = {"imgList": imgList,"basePath":contextRootPath+'/js/plat/imageTool/'};
			imageTool = $("#imagesPanel").newImage(imageObj);
			imageTool.showList();
		}
	});
	showAttachItem(obj["ATTTYPE"]);
};


/****
 * 点击相关附件审核中对应的附件信息后，在附件审核展示该类型的列表信息
 */
function showAttachItem(attachCode){
	var activeObjForm = "";
	var invokeType=$("#invokeType").val();
	if(invokeType!="intoCall" ){
		var activeObj = tabs.getActiveObj();
		if(activeObj.title=="附件审核"){
		    activeObjForm = tabs.getActiveIframe();
		    transferAuditItem(attachCode,activeObjForm);
		}
	}else{
		transferIntoItem(attachCode,activeObjForm);
	}
}

//跳转附件上传界面
function upload(value){
	$.dialog({
		id:	'viewWrokflowId',
		lock: true,
		width:850,
		height:500,
		title:'查看明细',
		content: 'url:'+contextRootPath+'/lbTAttachInfo/prepareExecute/toUploadFile?id='+value +"&prodId="+$("#prod_Id").val()+"&intoId="+$("#into_Id").val()+"&custId="+$("#cust_Id").val(),
		cancel:false,
		button: [{name: '关闭',callback: function(){
			reloadLeftIframe();
			return true;
		},focus: true}
		]
	});	

}

function reloadLeftIframe(){
	tree.show();
	table.show(true);
}
/**
 * 展示客户 附件树信息
 * 此js 已经被attachuploadAssembly.jsp 调用
 * 对于附件展示相关页面，则不可进行编辑
 */
var tree;
$(document).ready(function($) {
	var isUploadFlag = $("#isUpload").val();
	 if(isUploadFlag!="NO"){
		 var treeCon = {
				"disabledLink" : false,
				"isHiddenAdd" : true,
				"isHiddenEdit" : true,
				"isHiddenDel" : true,
				/*"expandAll" : true,*/
				"isEdit":true,
				"check" : false,
				"checkChildNodes" : false,
				"url" : contextRootPath+ '/lbTAttachInfo/queryTreeAttachTypeByCustomer?prodId='+ $("#prod_Id").val() + "&intoId="+ $("#into_Id").val() + "&custId="+ $("#cust_Id").val()+"&attType="+$("#attType").val(),
				"viewFun" : viewFun,
				"groupData":function(obj){
					if(obj["ISMUST"]=='1'){
						obj["icon"]=contextRootPath+ "/js/plat/base/icon/important.png";
					}
					return obj;
				},
				"editBtnExt":function(node){
				    var isUploadFlag = $("#isUpload").val();
				    if(!(isUploadFlag=="NO")){
				    	if(node.UPLOAD=="Y"){
				    		var isHiddenDelPic =  $("#isHiddenDelPic").val();
				    		if(isHiddenDelPic == "Y"){
				    			return [{name:"upload",fun:uploadFile}];
				    		}else{
				    			return [{name:"remove",fun:removeFun},{name:"upload",fun:uploadFile}];
				    		}
						}else if(node.UPLOAD=="PIC"){
							return [{name:"remove",fun:removeFun},{name:"coverfile",fun:coverFile},{name:"downloadfile",fun:downloadFile}];
						}
				    }
				},
				"async": {
					enable: true,
					autoParam:["ATTTYPE=attachType"],
					url:contextRootPath+ '/lbTAttachInfo/queryTreeAttachTypeInfoByAttachType?prodId='+ $("#prod_Id").val() + "&intoId="+ $("#into_Id").val() + "&custId="+ $("#cust_Id").val(),
				},
				"loadFun":function(newTree,data){
					var treeNodes=newTree.getNodes();
					for(var i=0;i<treeNodes.length;i++){
						var tn=treeNodes[i];
						newTree.expandNode(tn, true, false, true);
						 
					}
				}
			};
			tree=$("#treePanel").jyTree(treeCon);
			tree.show(); 
			
	  }else{
		  //只查看附件 （把已经上传的附件组装成数 展示）
		  queryAttachByType();
		  
		  var treeCon = {
					"disabledLink" : false,
					"isHiddenAdd" : true,
					"isHiddenEdit" : true,
					"isHiddenDel" : true,
					/*"expandAll" : true,*/
					"isEdit":true,
					"check" : false,
					"checkChildNodes" : false,
					"url" : contextRootPath+ '/lbTCustAttach/queryViewImages?prodId='+ $("#prod_Id").val() + "&intoId="+ $("#into_Id").val() + "&custId="+ $("#cust_Id").val()+"&attType="+$("#attType").val(),
					"viewFun" : viewFuns,
					"groupData":function(obj){
						if(obj["ISMUST"]=='1'){
							obj["icon"]=contextRootPath+ "/js/plat/base/icon/important.png";
						}
						return obj;
					},
					"editBtnExt":function(node){
					    if(node.DOWNLOAD=="Y"){
					    	return [{name:"downloadfile",fun:downloadFile}];
						}
					},
					"async": {
						enable: true,
						autoParam:["ATTTYPE=attachType"],
						url:contextRootPath+ '/lbTAttachInfo/queryTreeAttachTypeInfoByAttachType?prodId='+ $("#prod_Id").val() + "&intoId="+ $("#into_Id").val() + "&custId="+ $("#cust_Id").val(),
					},
					"loadFun":function(newTree,data){
						var treeNodes=newTree.getNodes();
						for(var i=0;i<treeNodes.length;i++){
							var tn=treeNodes[i];
							newTree.expandNode(tn, true, false, true);
							 
						}
					}
				};
				tree=$("#treePanel").jyTree(treeCon);
				tree.show(); 
				
	  }
		
});


//查看客户的附件信息
function queryAttachByType(){
	var url = contextRootPath+'/lbTCustAttach/queryViewImagesByType';
	var params = "prodId="+$("#prod_Id").val()+"&intoId="+$("#into_Id").val()+"&custId="+$("#cust_Id").val();
	jyAjax(url,params,function(result){
		var imgList = result.data;
		if(imgList.length > 0){
			for(var i=0;i<imgList.length;i++){
				var img = imgList[i];
				img["groupId"]=img["attachType"];
				img["groupName"]=img["attachName"];
				img["name"]=img["codeName"];
				imgList[i]=img;
			}
			var imageObj = {"imgList": imgList,"basePath":contextRootPath+'/js/plat/imageTool/'};
			imageTool = $("#imagesPanel").newImage(imageObj);
			imageTool.showList();
		}else{
			$("#imagesPanel").html('<div style="position:absolute;top:200px;left:40%;font-weight:bold;font-size:16px">该客户无附件信息！</div>');
		}
	});
};


//删除
function removeFun(nodeId,obj){
	jyDialog().confirm("确认删除  " + obj.NAME + " 吗？",function(){
	//序列化 新增页面的form表单数据
	var params="id="+obj.ID+"&attachType="+obj.ATTACH_TYPE+"&prodId="+$("#prod_Id").val()+"&custId="+$("#cust_Id").val()+"&intoId="+$("#into_Id").val();
	var url=contextRootPath+"/lbTCustAttach/deleteAttachByType";
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
        	var v_status = msg.status;
        	//删除成功后
        	if(v_status.indexOf('ok') >-1){
        		//tree.remove(obj);
        		location.reload();
        	}
      });
	});
}


//跳转附件上传界面
function uploadFile(nodeId,obj){
	/*var marrStatus=$("#marrStatus").val();
	if(obj.ID=="11" && marrStatus=="1"){//obj.ID 代表上传 结婚证,marrStatus=1代表 未婚
		jyDialog().alert("婚姻状况为未婚,禁止上传结婚证件");
		return false;
	}*/
	$.dialog({
		id:	'viewWrokflowId',
		lock: true,
		width:850,
		height:500,
		title:'附件上传',
		content: 'url:'+contextRootPath+'/lbTAttachInfo/prepareExecute/toUploadFile?id='+(obj.ID||obj.id) +"&prodId="+$("#prod_Id").val()
		+"&intoId="+$("#into_Id").val()+"&custId="+$("#cust_Id").val()+"&type=upload&contractId="+$("#contractId").val()+"&uploadType=single"
		+ "&updSource=" + $("#updSource").val(),
		cancel:false,
		button: [{name: '关闭',callback: function(){
			tree.show();
			return true;
		},callback: function(){
			reloadShow(obj);
			return true;
		},focus: true}
		]
	});	
}
function reloadShow(obj){
	if(obj.ID=="149")
	location.reload();
}
function batchUploadFile(){
	$.dialog({
		id:	'viewWrokflowId',
		lock: true,
		width:850,
		height:500,
		title:'批量附件上传',
		content: 'url:'+contextRootPath+'/lbTAttachInfo/prepareExecute/batchAttachUpload?prodId='+$("#prod_Id").val()
		+"&intoId="+$("#into_Id").val()+"&custId="+$("#cust_Id").val()+"&type=upload&contractId="+$("#contractId").val()+"&uploadType=batch"
		+ "&updSource=" + $("#updSource").val(),
		cancel:false,
		button: [{name: '关闭',callback: function(){
			tree.show();
			return true;
		},focus: true}
		]
	});	
}

//跳转附件覆盖界面
function coverFile(nodeId,obj){
	$.dialog({
		id:	'coverFile',
		lock: true,
		width:850,
		height:500,
		title:'文件覆盖',
		content: 'url:'+contextRootPath+'/lbTAttachInfo/prepareExecute/toUploadFile?id='+obj.ATTYPEID +"&attachTypeId="+(obj.ID||obj.id)+"&prodId="+$("#prod_Id").val()
		+"&intoId="+$("#into_Id").val()+"&custId="+$("#cust_Id").val()+"&type=cover&uploadType=single",
		cancel:false,
		button: [{name: '关闭',callback: function(){
			tree.show();
			return true;
		},focus: true}
		]
	});	
}

//下载文件
function downloadFile(nodeId,obj){
	jyDialog({"type":"question"}).confirm("您确认要下载吗？",function(){
		window.location.href=contextRootPath+"/lbTCustAttach/upAfterdownLoadFile/"+obj.ID;
		
	   },"确认提示");
	
}