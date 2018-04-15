<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<%@taglib prefix="configForm" uri="/WEB-INF/tlds/configFormLable.tld" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <%@ include file="/common/StaticJavascript.jsp" %>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>修改工作流表单配置表</title>
    <script type="text/javascript" src="${basePath1}component/jbpm/scripts/jquery-1.7.2.min.js"></script>
<link type="text/css" rel="stylesheet" href="${basePath1}component/jbpm/css/validationEngine.jquery.css"   />
<script type="text/javascript" src="${basePath1}component/jbpm/scripts/jquery.validationEngine.min.js"></script>

 <script type='text/javascript' src='${basePath1}component/jbpm/jbpm4FormInfo/js/updateJbpm4FormInfo.js'></script>
  </head>
  
  <body style="background-color:#FFFFFF">
  <br/>
<fieldset class="search_fieldset2 mag_top">
<legend>修改工作流表单配置表</legend>
<br/>   
<form id="updateForm" name="updateForm" action="">
  <input type="hidden" maxlength="250" id="dtoid" type="text" name="id" value='<%=StringUtilTools.filterSpecial(request,"dto.id")%>' />



<table width="96%" border="0" align="center"  >

<!-- 显示的字段信息 -->
<tr>
  <td align="right" nowrap class="needRequired"> 流程编码 ：</td>
  <td align="left" > 
  <input type="text" class="validate[maxSize[250],required] input_hui" readonly="readonly"  maxlength="250" id="dtoproDefKey" name="proDefKey" value="${modifyDto.proDefKey}" />
    </td>
  <td align="right" nowrap class="needRequired"> 节点名称 ：</td>
  <td align="left" > 
  <input type="text" class="validate[maxSize[250],required] input_hui" readonly="readonly"  maxlength="250" id="dtoproActivityName" name="proActivityName" value="${modifyDto.proActivityName}" />
    </td>
 
    <td align="right" nowrap class="needRequired"> 流程的版本号1 ：</td>
  <td align="left" colspan="1"> 
  <input type="text" class="validate[maxSize[10],required] input_hui" readonly="readonly"  maxlength="10" id="dtoproLevel" name="proLevel" value="${modifyDto.proLevel}" />
    </td>
    
</tr>
<tr >
<td align="right" nowrap class="needRequired">
回退节点：</td>
	<td  align="left" >
   		 <configForm:nodeInfo id="backNodeInfo" proDefKey="${modifyDto.proDefKey}" proLevel="${modifyDto.proLevel}" extNodeInfo="${modifyDto.ext1}" showSize="3" style="width:200px"/>
    </td>
    <td align="right" nowrap class="needRequired">
跳转节点：</td>
	<td  align="left" >
   		 <configForm:nodeInfo id="jumpNodeInfo" proDefKey="${modifyDto.proDefKey}" proLevel="${modifyDto.proLevel}" extNodeInfo="${modifyDto.ext2}" showSize="3" style="width:200px"/>
    </td>
        <td align="right" nowrap class="needRequired">
显示按钮：</td>
	<td  align="left" >
   		<select style="width: 180px" class="validate[maxSize[500]]"  id="dtoext3" name="ext3" >
		  <option value=""  >请选择... </option>
		  	<option title="跳转" value="isJump" <c:if test="${'isJump' eq modifyDto.ext3}">selected="selected"</c:if> >跳转</option>
		  	<option title="回退" value="isBack" <c:if test="${'isBack' eq modifyDto.ext3}">selected="selected"</c:if> >回退</option>
		  	<option title="所有" value="isAll" <c:if test="${'isAll' eq modifyDto.ext3}">selected="selected"</c:if> >所有</option>
		</select>
    </td>
</tr>
<tr>
 <td align="right" nowrap class="needRequired"> form表单信息 ：</td>
  <td align="left" colspan="3"> 
  <input type="text" size="60" class="validate[maxSize[250],required]"  maxlength="250" id="dtoproActivityForm" name="proActivityForm" value="${modifyDto.proActivityForm}" />
    </td>
  <td align="right" nowrap class="needRequired"> 选择参与者类型 ：</td>
  <td align="left" > 
  <select style="width: 180px" class="validate[maxSize[500],required]"  id="dtoparticipatorType" name="participatorType" onchange="changePartnertype();">
  <option value=""  >请选择... </option>
  	<option value="系统选择参与者" <c:if test="${'系统选择参与者' eq modifyDto.participatorType}">selected="selected"</c:if> >系统选择参与者</option>
  	<option title="执行待办时，按选定规则自动选择参与者" value="按规则自动选择参与者" <c:if test="${'按规则自动选择参与者' eq modifyDto.participatorType}">selected="selected"</c:if> >按规则自动选择参与者</option>
  	<option title="执行待办时弹出选人页面，供操作者手工选择" value="人工选择参与者" <c:if test="${'人工选择参与者' eq modifyDto.participatorType}">selected="selected"</c:if> >人工选择参与者</option>
  	<option title="执行待办时，按选定规则引擎选择参与者" value="按规则选择参与者" <c:if test="${'按规则选择参与者' eq modifyDto.participatorType}">selected="selected"</c:if> >按规则选择参与者</option>
  	<option title="执行待办时，进入自定义选择参与者请求" value="自定义选择参与者" <c:if test="${'自定义选择参与者' eq modifyDto.participatorType}">selected="selected"</c:if> >自定义选择参与者</option>
  </select>
  </td>
</tr>

<tr>
  <td id="tdRuleInfo" align="right" nowrap class=""> 指定java类 ：</td>
  <td align="left" colspan="5"> 
  <textarea rows="2" cols="105" class="validate[maxSize[500]]" maxlength="500" id="dtoruleInfo" name="ruleInfo"  >${modifyDto.ruleInfo}</textarea>
  </td>
</tr>

<tr>
  <td align="right" nowrap > 备注 ：</td>
  <td align="left" colspan="5"> 
  <textarea rows="2" cols="105" class="validate[maxSize[250]]" maxlength="250" id="dtoremark" name="remark"  >${modifyDto.remark}</textarea>
  </td>
</tr>

<tr id="trPersonSelectPartner" style=" display: ''">
	<td id="tdPartnerType" align="right" nowrap class="needRequired"> 选择类型 ：</td>
  	<td align="left"> 
  		 <select style="width: 180px" class="validate[maxSize[500],required]"  id="dtopartnerType" name="partType" onchange="changePartType()" >
		  	<option value="角色" <c:if test="${'角色' eq modifyDto.partType}">selected="selected"</c:if> >角色</option>
		  	<option value="机构" <c:if test="${'机构' eq modifyDto.partType}">selected="selected"</c:if> >机构</option>
		  	<option value="人员" <c:if test="${'人员' eq modifyDto.partType}">selected="selected"</c:if> >人员</option>
		  </select>
  	</td>
	<td id="tdOtherParams" align="right" nowrap class=""> 已选类型名称 ：</td>
  	<td align="left" colspan="3">
  	<input type="text" class="validate[maxSize[500]] input_hui" maxlength="500" id="dtootherParamsDis" name="otherParamsDis" value="${modifyDto.otherParamsDis}" />
  	<input type="hidden" id="dtootherParams" name="otherParams" value="${modifyDto.otherParams}" />
  	</td>
</tr>


<tr id="trPartnerRolesIdLeg" style=" display: ''">
  <td align="left" colspan="6" >
  <fieldset class="search_fieldset2 mag_top">
	<legend><a href="javascript:changeHideOrShow();" id="partnerRolesIdLeg">∨显示选择参与者设置</a></legend>
   <iframe  id="partnerRolesId" src="${basePath1}/component/jbpm/selectPartner/querySetPartnerRoles.jsp?autoIframeId=partnerRolesId&formInfoId=<%=StringUtilTools.filterSpecial(request,"dto.id")%>" width="100%" height="500px" frameborder="no"></iframe>
  </fieldset>
  </td>
</tr>

<!-- 隐藏的字段信息 -->
<tr style=" display: none">
  <td align="right" nowrap > EXT1 ：</td>
  <td align="left" > 
  <input type="text" class="validate[maxSize[250]]"  maxlength="250" id="dtoext1" name="ext1" value="${modifyDto.ext1}" />
  </td>
  <td align="right" nowrap > EXT2 ：</td>
  <td align="left" > 
  <input type="text" class="validate[maxSize[250]]"  maxlength="250" id="dtoext2" name="ext2" value="${modifyDto.ext2}" />
  </td>
  <!--  
  <td align="right" nowrap > EXT3 ：</td>
  <td align="left" > 
  <input type="text" class="validate[maxSize[250]]"  maxlength="250" id="dtoext3" name="ext3" value="${modifyDto.ext3}" />
  </td>-->
</tr>
  
<tr><td align="center" colspan="6" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="8" class="my_buttons">
        <input id="saveBtn" type="button" value="保存" onclick="saveUpdateData()" />
        <input id="restBtn" type="button" value="关闭" onclick="closeWindow()" />
  </td>
</tr>
</table>

</form>
</fieldset>

<div style="display: none">
<!-- 查询指定人员的选择参与者的信息 -->
<fieldset class="search_fieldset2 mag_top">
<legend>查询参与者信息</legend>
<br/>   

<form action="" id="queryPartners" name="queryPartners">
<table width="96%" border="0" align="center"  >
<!-- 显示的字段信息 -->
<tr>
  <td align="right" nowrap class="needRequired"> 流程编码 ：</td>
  <td align="left" ><input type="text" class="validate[maxSize[250],required] input_hui" readonly="readonly"  maxlength="250" id="dtoproDefKey" name="proDefKey" value="${modifyDto.proDefKey}" />
  </td>
  <td align="right" nowrap class="needRequired"> 节点名称 ：</td>
  <td align="left" ><input type="text" class="validate[maxSize[250],required] input_hui" readonly="readonly"  maxlength="250" id="dtoproActivityName" name="proActivityName" value="${modifyDto.proActivityName}" />
  </td>
  <td align="right" nowrap class="needRequired"> 流程的版本号 ：</td>
  <td align="left" colspan="1"><input type="text" class="validate[maxSize[10],required] input_hui" readonly="readonly"  maxlength="10" id="dtoproLevel" name="proLevel" value="${modifyDto.proLevel}" />
  </td>
</tr>
<tr>
 <td align="right" nowrap class="needRequired"> 流程定义ID ：</td>
  <td align="left" ><input type="text" class="validate[maxSize[250],required] input_hui" readonly="readonly" maxlength="250" id="dtoproActivityForm" name="proActivityForm" value="<c:out value="${param.proDefId}" />" />
  </td>
  <td align="right" nowrap class="needRequired"> 选择参与者类型 ：</td>
  <td align="left" ><input type="text" class="validate[maxSize[250],required]"  maxlength="500" id="dtoparticipatorType" name="participatorType" value="${modifyDto.participatorType}" />
  </td>
 
  <td align="right" nowrap class="needRequired"> 流程流转方向 ：</td>
  <td align="left" ><select id="dtoturnDirection" name="turnDirection"  style="width:150px;">
						<option value="">--默认--</option>
				   </select>
  </td>
</tr>

<tr>
 <td align="right" nowrap class="needRequired"> 任务处理人 ：</td>
 <td align="left" >
  <input type="text" class="validate[required] input_hui" title="点击查询图片选择任务处理人" readonly="readonly" maxlength="10" id="nameInfo" name="nameInfo" value="" onclick="selectPartner()"/>
  <input type="hidden"  maxlength="50" id="dtoparamUserId" name="paramUserId" value="" />
  </td>
</tr>
  
<tr><td align="center" colspan="6" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="8" class="my_buttons">
        <input id="queryPartnersBtn" type="button" value="查询设置的参与者" onclick="queryMyPartners()" />
  </td>
</tr>
</table>
</form>
</fieldset>
</div>


<br/>
<script type="text/javascript">


$(document).ready(function(){
//注册校验事件
	$("#updateForm").validationEngine({scroll:false,focusFirstField:false,promptPosition:'topLeft'});
	$("#queryPartners").validationEngine({scroll:false,focusFirstField:false,promptPosition:'topLeft'});
		
	toDoTurnDirection();
	//选择参与者类型的校验
	changePartnertype();
});
//选择参与者类型 变动事件 控制
function changePartnertype(){
	var v_val = $("#dtoparticipatorType").val();
	$("#tdRuleInfo").html("指定java类 ：");
	//控制 类型编号 不必填
	$("#tdOtherParams").removeClass("needRequired");
	$("#dtootherParamsDis").removeClass("validate[required]");
	
	$("#trPersonSelectPartner").hide();
	$("#trPartnerRolesIdLeg").hide();
	if("人工选择参与者" == v_val){
		//去掉 不必添校验
		$("#tdRuleInfo").removeClass("needRequired");
		$("#dtoruleInfo").removeClass("validate[required]");
		
		$("#tdOtherParams").addClass("needRequired");
		$("#dtootherParamsDis").addClass("validate[required]");
		
		$("#trPersonSelectPartner").show();
		$("#trPartnerRolesIdLeg").show();
		changeHideOrShow();
	}else if("自定义选择参与者" == v_val){
		$("#tdRuleInfo").html("指定URL:");
	}else if("按规则自动选择参与者" == v_val){
		$("#tdRuleInfo").removeClass("needRequired");
		$("#dtoruleInfo").removeClass("validate[required]");
		
		$("#tdOtherParams").addClass("needRequired");
		$("#dtootherParamsDis").addClass("validate[required]");
		//dtopartnerType
		$("#trPersonSelectPartner").show();
		$("#trPartnerRolesIdLeg").show();
	}else{
		$("#dtootherParamsDis").val("");//清空 参与者角色编号
		$("#tdRuleInfo").addClass("needRequired");
		$("#dtoruleInfo").addClass("validate[required]");
	}
	
	changePartType();
}
/**
 * 变更人工选择类型 fun
 */
function changePartType(){
	var v_val = $("#dtopartnerType").val();
	/* var v_sval = $("#dtoparticipatorType").val();
	if("按规则自动选择参与者" == v_sval){
		 $("#dtopartnerType").val("角色");
		 v_val="角色";
	} */
	
	var v_url = "";
	if("角色" == v_val){
		v_url = "${basePath1}/component/jbpm/selectPartner/querySetPartnerRoles.jsp?autoIframeId=partnerRolesId&formInfoId=<%=StringUtilTools.filterSpecial(request,"dto.id")%>";
	}else if("机构" == v_val){
		var v_OrgId = "";//仅展示 某个 机构内的 组织信息
		//v_url = "${basePath1}/component/jbpm/org/treeSysOrgSelect.jsp?check=true&rootOrgId="+v_OrgId;
		v_url = "${basePath1}/component/jbpm/org/vmTreeSysOrgSelect.jsp?check=true&rootOrgId="+v_OrgId;
	}else {
		//机构 - 》 人员
		//v_url = "${basePath1}/component/jbpm/org/sysUserSelect.jsp?check=true";
		v_url = "${basePath1}/component/jbpm/org/vmSysUserSelect.jsp?check=true";
	}
	
	if(v_val !='${modifyDto.partType}'){
		$("#dtootherParamsDis").val("");
		$("#dtootherParams").val("");
	}
	$("#partnerRolesId").attr("src",v_url);
}
//流转方向下拉框
function toDoTurnDirection(){
	//流转方向下拉框 通过ajax 查询出来进行显示
	$.ajax({
	url: '${basePath1}workFlowProvider/getTurenDirectory.do',
	type: 'POST',
	async:false,
	data:{processDefinitionId:'<c:out value="${param.proDefId}" />',activeName:'<c:out value="${param.aName}" />'},
	error: function(){alert('error');},
	success: function(data){
				var turnDirections = eval('(' + data + ')');
				$obj = $("#dtoturnDirection");
				var option = '';
				$obj.empty();
				
				for(var i = 0 ; i< turnDirections.length ; i++){
					if(turnDirections[i].turnDir == ""){
						option = '<option value="'+turnDirections[i].turnDir+'" title="默认">默认</option>';
					}else{
						option = '<option value="'+turnDirections[i].turnDir+'" title="'+turnDirections[i].turnDir+'" id="'+turnDirections[i].turnDir+'">'+turnDirections[i].turnDir+'</option>';
					}
					$obj.append(option);
				}
					
			}
	});
	
}
</script>
  </body>
</html>
