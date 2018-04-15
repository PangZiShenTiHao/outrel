<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="/product" prefix="pc"%>

<link rel="stylesheet" href="${basePath}css/loanBefore/winExpend.css">
	<script type="text/javascript" src="${basePath}js/common/jbpm/loanJBPM.js"></script>
    <script type="text/javascript" src="${basePath}js/common/commonBiz.js"></script>
<style type="text/css">
	.expendTitle{
	    padding: 2px;
	    height: 24px;
	    background: #5bc7c4;
	    font-size: 15px;
	    padding-left: 5px;
	    border-bottom: 1px solid #c6eded;
	}
	.expendTitle .title{
		float:left;
		padding:3px;
	}
	.expendTitle .btn{
		float:right;
		width:19px;
		height:19px;
		background:url("../images/maxOrMin.png");
		background-position: 0px 0px;
	}
	
	.expendTitle .editBtn{
		float:right;
		margin:2px 15px;
		display:inline-block;
	}
	
	.bigBtn{
		background-position: -19px  0px !important;
	}
	.expendContent{
		position:absolute;
		top:30px;
		bottom:2px;
		left:2px;
		right:2px;
		over1flow:auto;
		background: #E8F2F5;
	}
	
	.checkRight {
		left: 70%;
	}
	
	.formBorder {
		border: 1px solid #c6eded;
    	padding: 0px;
	}
	
	.checkAnnex {
		position: absolute;
		left: 0px;
		right: 40.5%;
		top: 1px;
		bottom:0px;
	}
	
	.checkMove {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 4px;
		z-index: 10;
		cursor: w-resize;
	}
	
	.checkMoveOver {
		border: 1px solid #ff0000;
	}
	
	.checkIntoInfo {
		position: absolute;
		top: 1px;
		right: 0px;
		bottom: 0px;
		overflow: auto;
	}
	
	.intoInfoBasic {
		position: absolute;
	    bottom: 0px;
	    right: 0px;
	    left: 0px;
	    height: 198px;
	    overflow: auto;
	}
	
	.checkResult {
		position: absolute;
		bottom: 0px;
		right: 0px;
	}
	
	.maskDiv {
		position: absolute;
		z-index: 10000;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: rgba(248, 248, 247, 0.5);
		display: none;
		cursor: w-resize;
	}
	
	.expendTitle .title {
		float: left;
		padding: 3px;
		color: #FFFFFF;
	}
	
	.submitArea {
	  position: absolute;
	  left: 0px;
	  right: 0px;
	  bottom: 0px;
	  height: 30px;
	  padding:5px;
	  text-align: center;
	  border-top: 1px solid #83B4EC;
	}
	
	.submitBtn,.checkErrorBtn {
		display: inline-block;
		margin: auto;
		/* width: 300px; */
		/* height: 20px; */
		background: #4AC0EA;
		text-shadow: 0 1px 0 rgba(245, 234, 234, 0.8);
		font-size: 20px;
		font-weight: bold;
		color: #A80CE8;
		padding: 4px 20px 5px 20px;
		border-radius: 10px;
		-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
		background-image: -webkit-linear-gradient(top, rgba(92, 157, 211, 1) 0%,
			rgba(22, 169, 232, 1) 60%, rgba(92, 157, 211, 1) 100%);
		cursor: pointer;
	}
	
	.checkErrorBtn {
		color: #0B52B0;
		padding: 4px 20px 5px 20px;
		border-radius: 10px;
		-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
		background-image: -webkit-linear-gradient(top, rgba(211, 191, 92, 1) 0%,
			rgba(128, 142, 127, 1) 60%, rgba(167, 211, 92, 1) 100%);
	}

</style>
 	
<div id="tabs1" style="margin-top:35px;">
	<div id="lsDiv"></div>
</div>


<div class="checkAnnex formBorder" id="checkAnnex">
	<div class="expendTitle">
		<div class="title">客户信息</div>
		<div class="btn" id="btn1"></div>
	</div>
	<div id="checkAnnexContent" class="expendContent">
	<iframe width="100%" height="100%" id="imgTree" style="border:none;" src=""></iframe>
	
	</div>
</div><!-- 附件信息 -->
<div class="checkMove" id="checkMove"></div>
<div class="checkIntoInfo formBorder checkRight" id="intoInfo"><!-- 信审客户信息 -->
	<div class="expendTitle">
		<div class="title">信审信息</div>
		<div class="btn" id="btn2"></div>
	</div>
	<div id="formPageSwap" class="expendContent">
		 <div style="width:99%;" id="formSwap">
		 	<div id="creditManage">
		 	
		 	</div>
		 </div>
	</div>	
</div>

<%-- <div class="intoInfoBasic formBorder checkRight" id="intoInfoBasic">
	<div class="expendTitle">
		<div class="title">流程审批信息</div>
		<div class="btn" id="btn2"></div>
	</div>
	<div id="formPageSwap" class="expendContent">
		 <div style="width:99%;" id="formSwap">
		 	<form id="workflowFormData"  isCheck="true">
			 	<div id="creditManage">
			 	 	<%@include file="/common/impJBPMAudit.jsp" %>
			 	</div>
		 	</form>
		 </div>
	</div>	
</div>  --%>

<div id="maskDiv" class="maskDiv"></div>
<script type="text/javascript">
	var tree;
	var tabs;
  $(document).ready(function(){
 
	  expandToggle();//填加伸缩事件
	  $("div[id^='dialog']").css("overflow", "auto");
	  groupWin();
	  extendsWin();
	  loadTitle();
	  loadImgTree();
  });
  
  function loadImgTree(){
	  var url="${basePath}loanAttachInfo/toUploadPlat?bizType="+imgAttachType+"&bizId="+imgBizId;
	  $("#imgTree").attr("src",url);
  }
  function groupWin(){
	  var downBit=false;
	  var downX=0;
	  var downY=0;
	  var moveLeft=0;
	  var leftObjRight;
	  var rightObjLeft;
	  var offsetValue=0;
	  var p=8;
	  var offset=200;
	  (function(){
		  var leftObj=$("#checkAnnex");
		  var rightObj=$("#intoInfo");
		  var moveObj=$("#checkMove");
		  var parent=leftObj.parent()
		  var parentW=parent.width();
		  var w=(parentW-p)/2
		  moveLeft=(w+2-offset);
		  leftObjRight=(w+p+offset);
		  rightObjLeft=(w+p-offset);
		  leftObj.css("right",leftObjRight+"px");
		  rightObj.css("left",rightObjLeft+"px");
		  moveObj.css("left",moveLeft+"px")
		  moveObj.bind("mousedown",function(ev){
			  downBit=true;
			  $("#maskDiv").show();
			  downX=ev.pageX;
			  downY=ev.pageY;
			  moveLeft=moveObj.offset().left;
		  }).bind("mouseover",function(){
			  $(this).addClass("checkMoveOver");
		  }).bind("mouseout",function(){
			  if(!downBit){
				  $(this).removeClass("checkMoveOver");
			  }
		  });
		  $("#maskDiv").bind("mouseup",function(){
			  downBit=false;
			  rightObjLeft=moveObj.offset().left;
			  leftObjRight=parentW-rightObjLeft;
			  leftObj.css("right",(leftObjRight+4)+"px");
			  rightObj.css("left",(rightObjLeft+4)+"px")
			  moveObj.css("left",moveLeft+offsetValue+"px");
			  offsetValue=0;
			  moveObj.removeClass("checkMoveOver");
			  $("#maskDiv").hide();
		  }).bind("mousemove",function(ev){
			  var moveX=ev.pageX;
			  var moveY=ev.pageY;
			  offsetValue=(moveX-downX);
			  moveObj.css("left",moveLeft+offsetValue+"px");
			  //moveX
			 // console.log("moveX:"+moveX+"---moveY:"+moveY);
		  }) 
	  })()
  }
 
  
  function extendsWin(){
	  var wins=[{"btn":"btn1","win":"checkAnnex"},{"btn":"btn2","win":"intoInfo"},{"btn":"btn3","win":"intoInfoBasic"}];
	  for(var i=0;i<wins.length;i++){
	  	  (function(win){
	  	  	  var btn=$("#"+win["btn"]);
			  btn.bind("click",function(ev){
			  		var wDiv=$("#"+win["win"]);
			  		if(!win["oldPosition"]){
				  		var obj={};
				  		obj["left"]=wDiv.css("left");
				  		obj["top"]=wDiv.css("top");
				  		obj["bottom"]=wDiv.css("bottom");
				  		obj["right"]=wDiv.css("right");
				  		if(wDiv.css("height")){
				  			obj["height"]=wDiv.css("height");
				  			wDiv.css("height","");
				  		}
				  		win["oldPosition"]=obj;
				  		wDiv.css("left","0px");
				  		wDiv.css("top","0px");
				  		wDiv.css("bottom","0px");
				  		wDiv.css("right","0px");
				  		wDiv.css("z-index","1");
				  		btn.addClass("bigBtn");
			  		}else{
			  			var obj=win["oldPosition"];
			  			wDiv.css("left",obj["left"]);
				  		wDiv.css("top",obj["top"]);
				  		wDiv.css("bottom",obj["bottom"]);
				  		wDiv.css("right",obj["right"]);
				  		if(obj["height"]){
				  			wDiv.css("height",obj["height"]);
				  		}
				  		wDiv.css("z-index","");
				  		win["oldPosition"]=null;
				  		btn.removeClass("bigBtn");
			  		}
			  });
	  	  })(wins[i]);
	  }
  }
   
  
  
  
  function loadTitle(){
		var bizInfId="${bizInfId}";
		var bizType="${bizType}";
		var prodTabs=prodTabsObj;
		var params="aaa=1";
		tabs=$("#creditManage").newTabs({"isClose":false,"tabList":prodTabs,
			"reBuildUrl":function(url){
				if(url.indexOf("?")>-1){
					return url+"&"+params;
				}else{
					return url+"?"+params;
				}
			},
			switchFun:function(obj){
	           //console.log("----------------------------------------");
	        }
		});
 
  }
  var tabFrameList=[];
  function exFun(obj){
	  tabFrameList.push(obj);
  }
  
  /**
  *验证每个子tab页验证是否通过。
  **/
  function checkTabResult(successFun,v_myTurn){
	  var bit=true;
	  var count=tabFrameList.length;
	  var succCount=0;//成功个数
	  var errorCount=0;//失败个数
	  var checkSumCount=0;//需要检查的子tab个数
	  var checkTimes=20;//检查次数
	  var timeLong=200;//每次检查间隔时间
	  for(var i=0;i<count;i++){
		  var obj=tabFrameList[i];
		  if(obj.checkResult){
			  checkSumCount++;
			  obj.checkResult(function(status){
				  if(status){
					  succCount++;
				  }else{
					  errorCount++;
				  }
			  },v_myTurn);
		  }
	  }
	  (function(){
		  var own=arguments.callee;
		  if(checkTimes>0){
			  setTimeout(function(){
				  checkTimes--;
				  if((errorCount+succCount)>=checkSumCount){
					  if(!errorCount){
						  checkTimes=0;
						  successFun();
					  }
				  }else{
					  own();
				  }
			  },timeLong);
		  }else{
			  console.log("校验超时");
		  }
	  })();
  }
  
  function getTabsFormDatas(){
	  var count=tabFrameList.length;
	  var formDatas=[];
	  for(var i=0;i<count;i++){
		 var obj=tabFrameList[i];
		 if(obj.getFormDatas){
			formDatas.push(obj.getFormDatas()); 
		 }
	  }
	  return formDatas.join("&");
  }
  
  /*
   *准备提交\执行 我的待办任务
   *进行 业务规则，
   *选人规则的校验
   */
  function prepareSubTask(v_myTurn){
	  checkTabResult(function(){
	  	var viewDatas=getTabsFormDatas();
	    var formData=$("#workflowFormData");
	    if(showLatestCheckNullErrors(formData) || showLatestCheckFormatErrors(formData)) return; 
		$("#dtoturnDirection").val(v_myTurn);//选中 option
		//组装选中的参与者信息
		makeupPartnerInfo("${taskId}","${processInsId}","${acitityName}","${bizTabId}", "${bizTabName}","${bizInfId}");		
		//选人规则判断
		var nextF = JBPM.common.decidedSelectPartnerRule(v_myTurn);
		//需要人工 选择参与者的 则弹出页面 
		if(!nextF)	return;		
		//真实执行待办任务的 方法
		var url = proccessSubmitUrl;		
		//组装选中的参与者信息
		makeupPartnerInfo("${taskId}","${processInsId}","${acitityName}","${bizTabId}", "${bizTabName}","${bizInfId}");
		var params = formData.serialize()+"&"+ viewDatas;
		subTask(v_myTurn,url,params);
	  },v_myTurn);
  }
 
</script>
  

