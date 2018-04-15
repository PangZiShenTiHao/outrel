<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增映射表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script type="text/javascript" src="<%=basePath%>component/jbpm/dialog/lhgdialog.js?skin=iblue"></script> 
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.bizauth.vmrulemapping.controller.VmruleMappingController"> 
<table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 类型：</th>
  <td > 
  		 <select id="dtomapType" name="mapType" onchange="changeRuleType()" notNull="true">
						  	<option value="1" >人对人</option>
						  	<option value="2" >人对机构</option>
						  	<option value="3" >机构对机构</option>
		</select>
  </td>
</tr>
<tr>  
  <th> 关联KEY：</th>
  <td > 
  <input type="text" class="text" id="dtomapKey" notNull="true" maxLength="10" value=""  onclick="selectAShowInfo()" />
  <input type="hidden" id="mapKeyId" name="mapKey" notNull="true" maxLength="25" value="" />
  <input type="hidden" id="orgtype"  name="orgType" value="${orgtype}"/>
  </td>
</tr>
<tr>  
  <th> 关联VALUE：</th>
  <td > 
	  <input type="text" class="text" id="dtomapValue"  notNull="true" maxLength="10" value="" onclick="selectBShowInfo()"/>
	  <input type="hidden" notNull="true" id="mapValueId" name="mapValue" value=""/>
  </td>
</tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">

   $(document).ready(function(){
   		checkedInit();
	});
   
   function changeRuleType(){
		$("#dtomapKey").val("");
		$("#mapKeyId").val("");
		$("#dtomapValue").val("");
		$("#mapValueId").val("");
		
		var v_val = $("#dtomapType").val();
		
		//切换时先事件解绑定
		$("#dtomapKey").unbind();
		$("#dtomapValue").unbind();
		
		if("1" == v_val){//人对人
		}else if("2" == v_val){  //人对组织
			//主关联信息 绑定 组织机构树
			//var  orgurl=contextRootPath+'/sysOrg/queryTreeSysOrg?a=a';
		   	//orgurl =orgurl +'&orgId=&trace=down';
		   	var orgtype = $("#orgtype").val();
		   	var orgurl=contextRootPath+'/vmtreeInfo/queryTreeVMOrgByOrgType?orgType='+orgtype+'&orgId=';
		   	$("#dtomapValue").treeMenu(
	   			{"treeUrl":orgurl
	   			,"treeType":"checkbox","disabledLink": "true"
		   		,"treeIdObj":$("#mapValueId")
		   		,"width":"200"
		   		,"height":"300"});
		}else if("3" == v_val){//机构对机构
			var orgtype = $("#orgtype").val();
			var orgurl=contextRootPath+'/vmtreeInfo/queryTreeVMOrgByOrgType?orgType='+orgtype+'&orgId=';
			$("#dtomapKey").treeMenu(
		   			{"treeUrl":orgurl
		   			/*  ,"treeType":"checkbox" */
			   		,"treeIdObj":$("#mapKeyId")
			   		,"width":"200"
			   		,"height":"300"});
			
		   	$("#dtomapValue").treeMenu(
	   			{"treeUrl":orgurl
	   			,"treeType":"checkbox","disabledLink": "true"
		   		,"treeIdObj":$("#mapValueId")
		   		,"width":"200"
		   		,"height":"300"});
		}
	}
   
   function selectUser(_callFun){
	    var _titleObj = window.parent.parent.tabs.getActiveObj();
		var _title = _titleObj.title;
		var _orgType = $("#orgtype").val();
		var v_url = contextRootPath+'/component/dialoguser/selectVmTreeUser.jsp?a=a&check=true&showLowerUser=true';
		v_url = v_url+'&callFun='+_callFun+'&tabTitle='+_title+"&orgType="+_orgType;
		$.dialog({
			id:	'selectUserDialogId',
		    lock: true,
		    width:420,
		    height:680,
		    title:'选择关联信息',
		    content: 'url:'+ v_url
			}); 
	} 

   function selectAShowInfo(){
		var v_val = $("#dtomapType").val();
		if("1" == v_val || "2" == v_val){//人对人
			selectUser("setBrefCallFun");
		}
	}
	function selectBShowInfo(){
		var v_val = $("#dtomapType").val();
		if("1" == v_val){//人对人
			selectUser("setArefCallFun");
			$("#dtomapValuetree").hide();
		}
	}
</script>
  
</html>
