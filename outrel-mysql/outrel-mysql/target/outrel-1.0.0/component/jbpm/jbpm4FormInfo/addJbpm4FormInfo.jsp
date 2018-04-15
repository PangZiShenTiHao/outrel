<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<%@taglib prefix="configForm" uri="/configFormLable" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>新增工作流表单配置表</title>
<script type="text/javascript" src="${basePath1}component/jbpm/scripts/jquery-1.7.2.min.js"></script>
<link type="text/css" rel="stylesheet" href="${basePath1}component/jbpm/css/validationEngine.jquery.css"   />
<script type="text/javascript" src="${basePath1}component/jbpm/scripts/jquery.validationEngine.min.js"></script>

<script type='text/javascript' src='js/addJbpm4FormInfo.js'></script>
  </head>
  
  <body style="background-color:#FFFFFF">
  <br/>
    <fieldset>
<legend>新增信息</legend>
<br/>
<form id="newsForm" name="newsForm" action="${basePath1}addJbpm4FormInfo.do">
<table width="96%" border="0" align="center" >
<!-- 展示显示的字段信息 -->
<tr>
  <td align="right" nowrap class="needRequired"> 流程定义编码 ：</td>
  <td align="left" > 
  <input type="text" class="validate[maxSize[250],required] input_hui" readonly="readonly" maxlength="250" id="dtoproDefKey" name="proDefKey" value="<%=StringUtilTools.filterSpecial(request,"proKey")%>" />
  </td>
  <td align="right" nowrap class="needRequired"> 节点名称 ：</td>
  <td align="left" > 
  <input type="text" class="validate[maxSize[250],required] input_hui" readonly="readonly"  maxlength="250" id="dtoproActivityName" name="proActivityName" value="<%=StringUtilTools.filterSpecial(request,"aName")%>" />
  </td>
  
  <td align="right" nowrap class="needRequired"> 流程的版本：</td>
  <td align="left" colspan="6"> 
  <input type="text" class="validate[maxSize[10],required] input_hui" readonly="readonly" maxlength="10" id="dtoproLevel" name="proLevel" value="<%=StringUtilTools.filterSpecial(request,"proVersion")%>" />
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
</tr>
<tr>
<td align="right" nowrap class="needRequired"> form表单信息 ：</td>
  <td align="left" colspan="3"> 
  <input size="60" type="text" class="validate[maxSize[250],required]" maxlength="250" id="dtoproActivityForm" name="proActivityForm" value="" />
  </td>
  <td align="right" nowrap class="needRequired"> 参与者类型 ：</td>
  <td align="left" > 
  <select style="width: 180px" class="validate[maxSize[500],required]"  id="dtoparticipatorType" name="participatorType" onchange="changePartnertype();">
  	<option value=""  >请选择... </option>
  	<option value="系统选择参与者" >系统选择参与者</option>
  	<option value="按规则选择参与者" >按规则选择参与者</option>
  	<option title="执行待办时弹出选人页面，供操作者手工选择" value="人工选择参与者" >人工选择参与者</option>
  	<option title="执行待办时，进入自定义选择参与者请求" value="自定义选择参与者"  >自定义选择参与者</option>
  	<option title="执行待办时，按选定规则自动选择参与者" value="按规则自动选择参与者" >按规则自动选择参与者</option>
  </select>
  </td>
  
</tr>

<tr>
  <td id="tdRuleInfo" align="right" nowrap class="needRequired"> 指定java类 ：</td>
  <td align="left" colspan="5"> 
  <textarea rows="2" cols="105" class="validate[maxSize[500]]" maxlength="500" id="dtoruleInfo" name="ruleInfo"  ></textarea>
  </td>
</tr>

<tr>
  <td align="right" nowrap > 备注 ：</td>
  <td align="left" colspan="5"> 
  <textarea rows="2" cols="105" class="validate[maxSize[250]]" maxlength="250" id="dtoremark" name="remark"  ></textarea>
  </td>
</tr>

<tr id="trPersonSelectPartner" style=" display: ''">
	<td id="tdPartnerType" align="right" nowrap class="needRequired"> 人工选择类型 ：</td>
  	<td align="left"> 
  		 <select style="width: 180px" class="validate[maxSize[500],required]"  id="dtopartnerType" name="partType" onchange="changePartType()" >
		  	<option value="角色" >角色</option>
		  	<option value="机构" >机构</option>
		  	<option value="人员" >人员</option>
		  </select>
  	</td>
	<td id="tdOtherParams" align="right" nowrap class=""> 已选类型名称 ：</td>
  	<td align="left" colspan="3">
  	<input type="text" class="validate[maxSize[500]] input_hui" maxlength="500" id="dtootherParamsDis" name="otherParamsDis" value="" />
  	<input type="hidden" id="dtootherParams" name="otherParams" value="" />
  	</td>
</tr>

<tr id="trPartnerRolesIdLeg" style=" display: ''">
  <td align="left" colspan="6" >
  <fieldset class="search_fieldset2 mag_top">
	<legend><a href="javascript:changeHideOrShow();" id="partnerRolesIdLeg">∨显示选择参与者设置</a></legend>
   <iframe  id="partnerRolesId" src="${basePath1}/component/jbpm/selectPartner/querySetPartnerRoles.jsp?autoIframeId=partnerRolesId&formInfoId=<%=StringUtilTools.filterSpecial(request,"dto.id")%>" width="100%" height="300px" frameborder="no"></iframe>
  </fieldset>
  </td>
</tr>

<!-- 展示隐藏的字段信息 -->
<tr style=" display: none">
  <td align="right" nowrap > EXT1 ：</td>
  <td align="left" > 
  <input type="text" class="validate[maxSize[250]]" maxlength="250" id="dtoext1" name="ext1" value="" />
	
  </td>
  <td align="right" nowrap > EXT2 ：</td>
  <td align="left" > 
  <input type="text" class="validate[maxSize[250]]" maxlength="250" id="dtoext2" name="ext2" value="" />
	
  </td>
  <td align="right" nowrap > EXT3 ：</td>
  <td align="left" > 
  <input type="text" class="validate[maxSize[250]]" maxlength="250" id="dtoext3" name="ext3" value="" />
	
  </td>
</tr>

<tr><td align="center" colspan="6" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="6" class="my_buttons">
        <input id="saveBtn" type="button" value="保存" onclick="saveData()" />
        <input id="restBtn" type="button" value="关闭" onclick="closeWindow()" />
  </td>
</tr>
</table>

</form>

</fieldset>

<br/>
<script type="text/javascript">
$(document).ready(function(){
	$("#newsForm").validationEngine({scroll:false,focusFirstField:false,promptPosition:'topLeft'});
		
	//控制参与者角色设置 默认隐藏
	$("#partnerRolesId").hide();
	//参与者类型的校验
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
		v_url = "${basePath1}/component/jbpm/org/treeSysOrgSelect.jsp?check=true&rootOrgId="+v_OrgId;
	}else {
		//机构 - 》 人员
		v_url = "${basePath1}/component/jbpm/org/sysUserSelect.jsp?check=true";
	}
	
	if(v_val !='${modifyDto.partType}'){
		$("#dtootherParamsDis").val("");
		$("#dtootherParams").val("");
	}
	$("#partnerRolesId").attr("src",v_url);
}
</script>
  </body>
</html>
