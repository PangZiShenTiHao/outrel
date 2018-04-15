<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询附件类型表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <style type="text/css">
  	.expandSwap{
  		margin:0px;
  		border-radius:0px;
  		width:100%;
  	}
  	.expandTitle{
  		background:#E8F6F6 !important;
  	}
  	.expandTitle .text{
  		color:#000000  !important;
  	}
  </style>
</head>
<body style="background-color:#FFFFFF">
	<div  style=";position: absolute;left:3px;top:3px;bottom:3px;right:3px;">
		<div id="imgTypeContent" style="width:150px;position: absolute;left:0px;top:0px;bottom:5px;border:1px solid #c7bcbc;padding:2px;">
			<div class="expandSwap">
				<div class="expandTitle"><span class="text">附件类型</span></div>
				<div id="treePanel">
				</div>
			</div>
		</div>
		<div id="imgContent" style="position: absolute;left:160px;top:0px;bottom:5px;right:0px;border:1px solid #c7bcbc;padding:2px;">	
			<div class="expandSwap">
				<div class="expandTitle"><span class="text">附件内容</span></div>
				<div id="imgPanel" style="position: absolute;left:3px;top:35px;bottom:3px;right:3px;padding:3px;">
						
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	//页面加载完后 
	var attachType="";
	function uploadFile(attachNo){
		var dialogStruct={
			'display':contextRootPath+'/loanAttachInfo/toUpload?bizId=${bizId}&bizType=${bizType}&attachType='+attachNo,
			'width':800,
			'height':500,
			'title':'新增',
			'buttons':[
			 {'text':'关闭','isClose':true,'action':reflushImgInfo}
			]
		};
		dialogAddObj=jyDialog(dialogStruct);
		dialogAddObj.open();
	}
	
	
	
	function groupBatch(imgList){
		 for(var i=0;i<imgList.length;i++){
			  imgList[i]["groupName"]=imgList[i]["attachType"];
			  imgList[i]["groupId"]=imgList[i]["attachType"];
			  imgList[i]["url"]=imgList[i]["attachUrl"];
			  imgList[i]["name"]=imgList[i]["attachName"];
		  }
		  var imageObj = {"imgList": imgList,"basePath":'${basePath}js/plat/imageTool/icon',"isMinImgExt":false};
		  imageTool = $("#imgPanel").newImage(imageObj);
		  imageTool.showList();
	}
	
	function flushImgInfo(attachType){
		 //序列化 新增页面的form表单数据
        var params={"fkBizId":"${bizId}","fkBizType":"${bizType}"};
		if(attachType){
			params["attachType"]=attachType;
		}
        var url=contextRootPath+'/loanAttachInfo/queryListLoanAttachInfo';
        //通过ajax保存
        jyAjax(
           url,
           params,
           function(msg){
              if(msg.status&&msg.status=="ok"){
           	   if(msg.data&&msg.data.length){
            	   groupBatch(msg.data);
           	   }
              }
           });
        
	}
	function reflushImgInfo(){
		if(attachType+"".length){
			flushImgInfo(attachType);
		}
	}
	
	function createTree($){
		var tree;
		var treeCon = {
			"disabledLink" : false,
			"isHiddenAdd" : true,
			"isHiddenEdit" : true,
			"isHiddenDel" : true,
			/*"expandAll" : true,*/
			"isEdit":true,
			"check" : false,
			"checkChildNodes" : false,
			"mapping":{"id":"attachNo","name":"attachName"},
			"viewFun" : function(obj,nodeObj){
				var attachNo=nodeObj["attachNo"];
				$("#imgPanel").html("");
				flushImgInfo(attachNo);
			},
			"groupData":function(obj){
				if(obj["ISMUST"]=='1'){
					obj["icon"]=contextRootPath+ "/js/plat/base/icon/important.png";
				}
				return obj;
			},
			"async": {
				enable: true,
				autoParam:["ATTTYPE=attachType"],
				url:'',
			},
			"loadFun":function(newTree,data){//载入数据完成后要做的动作
				 
			}
		};
		
		var isUpload="${isUploadOp}";
		if(isUpload=="upload"){
			treeCon["editBtnExt"]=function(node){
				return [{name:"upload",fun:function(id,nodeObj){
					var attachNo=nodeObj["attachNo"];
					attachType=attachNo;
					uploadFile(attachNo);
				}}];
			}
		
			var url=contextRootPath+'/loanAttachType/queryTreeLoanAttachType';
			var params={}
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		tree=$("#treePanel").jyTree(treeCon);
		        		tree.show(msg.data); 
		        	}
		  	});
		}else{
			$("#imgTypeContent").remove();
			$("#imgContent").css("left","0px");
		}
	}
	
	$(document).ready(function($) {
		createTree($);
		flushImgInfo();
	});
</script>	
</html>
