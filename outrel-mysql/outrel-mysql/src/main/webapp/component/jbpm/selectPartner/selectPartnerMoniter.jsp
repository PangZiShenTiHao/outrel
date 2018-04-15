<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>选择参与者</title>
  </head>
  
  <body style="background-color:#FFFFFF">
  <br/>

<!-- 查询条件start -->
<form name="query" id="query" method="post" action="<%=StringUtilTools.filterRequestURL(request)%>">
<fieldset class="search_fieldset2 mag_top">
<legend>查询条件</legend>
<table id="queryTableList" name="queryTableList" width="96%" align="center" >
<tr>
  <th align="right" nowrap > 部门名称 ：</th>
  <td align="left" ><input id="dtodeptName" name="dto.deptName" value="" maxlength="10"/> </td>
  <th align="right" nowrap > 姓名 ：</th>
  <td align="left" ><input id="dtorealdName" name="dto.realdName" value="" maxlength="10"/></td>
  <th align="right" nowrap > 员工号 ：</th>
  <td align="left" ><input id="dtouserName" name="dto.userName" value="" maxlength="50"/>
  <input id="dtoisNeedQuery"  type="hidden" name="dto.isNeedQuery" value="1" maxlength="50"/>
   <input id="isForeachJoin"  type="hidden" name="isForeachJoin" value="N" maxlength="50"/>
  </td>
</tr>
<tr>
  <th align="right" nowrap > 查询方式 ：</th>
  <td align="left" ><select id="dtopartnerSqlId" name="dto.partnerSqlId" style=" width: 160px">
  	<xweb:dict dictionary="queryPartnerMethod" mode="options"/>
  </select></td>
</tr>
<tr>

<tr>
  <td align="center" colspan="6" class="my_buttons">
  
  
        <input id="queryBtn" type="button" onclick="queryData()" value="&nbsp;查&nbsp;询&nbsp;" />
         &nbsp;&nbsp;&nbsp;
        <input type="button" value="&nbsp;重&nbsp;置&nbsp;" onclick="restFun()"/>
  </td>
</tr>
</table>
</fieldset>
</form>  
  <!-- 查询条件end --> 

		<!-- 默认查询列表传递的信息 -->
   		<xweb:setBean id="provider" type="com.platform.components.jbpm.provider.PartnerProvider">
   		  <xweb:property name="dto.httpRequest" value="<%=request %>" />
   		  <xweb:property name="dto.userIdOfOperateData" value="${userId }" />
   		  
		</xweb:setBean>
		<!-- 列表详情 start -->
		<table id="listContent" width="99.9%" border="0" align="center" style="margin-top: 5px;" class="tab_1" >
			<tr >
				<th  align="center" >选择</th>
				<th align="center" >姓名</th>
				<th align="center">员工编号</th>
				<th align="center">EMAIL</th>
				<th align="center">岗位</th>
				<th align="center" >部门</th>
			</tr>
			<xweb:page rows="10" provider="<%=provider%>">
				<xweb:iterate type="java.util.Map" id="temp">
					<tr class="table-alternate1">
					<!-- 如果是会签则可以选择多个人 -->
					<c:if test="${'Y' eq param.isForeachJoin}">
					<td align="center"><input name="selectedRadio" id="selectPar_${temp.ID}" type="checkbox" value="${temp.ID},${temp.USERNAME},${temp.REALNAME},${temp.DEPTNAME}" /><xweb:rowNumber/></td>
					</c:if>
					
					<c:if test="${empty param.isForeachJoin or 'Y' ne param.isForeachJoin}">
					<td align="center"><input name="selectedRadio" id="selectPar_${temp.ID}" type="radio" value="${temp.ID},${temp.USERNAME},${temp.REALNAME},${temp.DEPTNAME}" /><xweb:rowNumber/></td>
					</c:if>
						<td  height="25" align="center" ><c:out value="${temp.REALNAME}"/></td>
						<td  height="25" align="center" ><c:out value="${temp.USERNAME}"/></td>
						<td height="25" align="center" ><c:out value="${temp.EMAIL}"/></td>
						<td height="25" align="center" ><c:out value="${temp.JOBNAME}"/></td>
						<td height="25" align="center" ><c:out value="${temp.DEPTNAME}"/></td>
					</tr>
				</xweb:iterate>
				
				
			<tr  align="center">
				<td id="noadd" colspan="6"  align="center" height="25" class="tab_bg2">
				<xweb:pageInfo/>&nbsp;&nbsp;<xweb:prevLink title=" < " />&nbsp;&nbsp;<xweb:numberLink/>&nbsp;&nbsp;<xweb:nextLink title=" > " />&nbsp;&nbsp;<xweb:gotoOtherPage style="linkNo" jsfunName="_goToOtherPage('url','totalPages')"/>
				</td>
			</tr>
			</xweb:page>
			<tr  align="center">
				<td id="noadd" colspan="6"  align="center" class="my_buttons" >
				<input id="addBTN" type="button" value="&nbsp;确认&nbsp;" onclick="sureSelected()"/>
				&nbsp;&nbsp;
				<input id="addBTN" type="button" value="&nbsp;取消&nbsp;" onclick="operateCancle()"/>
				</td>
			</tr>
			
		</table>
   	<!-- 列表详情 end -->

<br/>
<script type="text/javascript">
function queryData(){
	$("#queryBtn").attr("disabled",true);
	document.query.submit();
}

function sureSelected(){
	var selectedId = getSelectedId('selectedRadio');
	//alert(selectedId);
	if(selectedId==""){
		alert("请选择参与者");
		return;
	}
	var ids = selectedId.split("龒");
	var partnerIds = "";
	var partnerNames = "";
	for(var i = 0;i < ids.length;i ++){
		var partnersInfo = ids[i].split(",");
		
		if(partnerIds != ""){
			partnerIds = partnerIds +",";
			partnerNames = partnerNames +",";
		}
		partnerIds = partnerIds + partnersInfo[0];
		partnerNames = partnerNames + partnersInfo[2];
	}
	
	var api = frameElement.api, W = api.opener, cDG;
	//回传至父页面
	//调用父页面方法  回填公司信息
	api.get("executeTaskId").updatePartners(partnerIds,partnerNames); 
    api.close(); 
}

function operateCancle(){
	var api = frameElement.api, W = api.opener, cDG;
	api.close();
}


$(document).ready(function(){
	    //列表鼠标滑过行效果
		PICC.common.initTableTrHover($("#listContent"),{
			overClass:"tr_hover",
			clickClass:"tr_body",
			clickCallback:function(tr){
			    var _tds = $(tr).children();	//获取当前行
				if(_tds.attr("id")=="noadd"){
				   return;
				}else{
					//会签时允许选择多个参与者
					<c:if test="${'Y' eq param.isForeachJoin}">
					if($(tr).find("input[type='checkbox']").attr("checked")){
						$(tr).find("input[type='checkbox']").attr("checked",false);
					}else{
						$(tr).find("input[type='checkbox']").attr("checked",true);
					}
					</c:if>
					
					<c:if test="${empty param.isForeachJoin or 'Y' ne param.isForeachJoin}">
					$(tr).find("input[type='radio']").attr("checked",true);
					</c:if>
				}
			}
		});
		
		//获取父页面 是否有会签，如果有会签操作 则允许多选
		var api = frameElement.api, W = api.opener, cDG;
		//var v_isJoin = api.get("executeTaskId").document.getElementById('foreachJoinId').value;
		var v_isJoin =api.get("executeTaskId").$("#foreachJoinId").val();
		//是否会签
		$("#isForeachJoin").val(v_isJoin);
		
});

//获取选中 的id
function getSelectedId(varName){
	var selectedId =""; 
	$("[name='"+varName+"']").each(function(i){
		if(this.checked){ 
			if(selectedId != "")
			selectedId = selectedId +"龒";
			
			selectedId = selectedId + this.value;
		}
	});
	
	return selectedId;
}
</script>



  </body>
</html>
<xweb:setForm useRequest="true" formName="query"/>
