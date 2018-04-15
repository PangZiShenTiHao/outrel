<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
 <%@ include file="/common.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
   <title>查询${jspDTO.tableComments}</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <%@ include file="/jscommon.jsp" %>
  <%-- 只引入一个通用表单样式 --%>
  <link href="${'$'}{basePath }css/style.css" rel="stylesheet" type="text/css">
  <script type='text/javascript' src='js/query${jspDTO.formated_tab_name}.js'></script>
   <%-- 引入dwr js --%>
   <script type='text/javascript' src='${'$'}{basePath }dwr/engine.js'></script>
   <script type='text/javascript' src='${'$'}{basePath }dwr/util.js'></script>
   <script type='text/javascript' src='${'$'}{basePath }dwr/interface/${jspDTO.serviceClassName}.js'></script>
   
  </head>
  <body style="background-color:#FFFFFF">
  <!-- 查询条件start -->
<form name="query" id="query" method="post" action="<%=StringUtilTools.filterRequestURL(request)%>">
<fieldset class="search_fieldset2 mag_top">
<legend>查询条件</legend>
<table id="queryTableList" name="queryTableList" width="96%" align="center" >
<#list dataInfoList as dataInfo>
<#assign d_inde = dataInfo_index />
<#if (d_inde %4 ==0 ) >
<tr>
</#if>
  <td align="right" nowrap ><#if (dataInfo.COLUMN_COMMENTS??)> <#if (dataInfo.COLUMN_COMMENTS?length>3)>${dataInfo.COLUMN_COMMENTS[0..3]?default("")}<#else>${dataInfo.COLUMN_COMMENTS?default("")}</#if> <#else>${dataInfo.COLUMN_NAME}</#if>：</td>
  <td align="left" <#if ( ((dataInfoList ? size) -1) == d_inde ) >colspan="${ (4- ((d_inde+1) %4))*2 }"</#if>> 
  <#if (dataInfo.DATA_TYPE == 'DATE') > 
  <input type="text" readonly onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true})" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" value=""  />
  <#else>
  		 <#if (dataInfo.MY_VIEW == '下拉框')> 
 <select id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" style="width: 160px;">
  	<option value="">---请选择---</option>
  </select>
  		<#else>
  <input type="text" maxlength="${(dataInfo.DATA_LENGTH / 2 )?string('#') }" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" value="" />
  		</#if>  
  </#if>
  </td>
<#if ((d_inde+1) %4 ==0 || ((dataInfoList ? size) -1) == d_inde ) >
</tr>
</#if>
</#list>

<tr>
  <td align="center" colspan="8" class="my_buttons">
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
   		<xweb:setBean id="provider" type="${jspDTO.providerPackageName}.${jspDTO.providerClassName}">
   		  <xweb:property name="dto.httpRequest" value="<%=request %>" />
   		  <xweb:property name="dto.userIdOfOperateData" value="${'$'}{userId }" />
   		  <xweb:property name="operateOfProvider" value="queryByPage" />
   		  
		</xweb:setBean>
		<!-- 操作信息 -->
		<table id="listContent1" width="99.9%" border="0" align="center" style="margin-top: 5px;" class="" >
		<tr> <td id="noadd" align="left" colspan="${(dataInfoList ? size) }"  class="my_buttons" >
				  列表结果 &nbsp;&nbsp; <input id="addBTN" type="button" value="&nbsp;新增&nbsp;" onclick="addData('query${jspDTO.formated_tab_name}.jsp')"/>
				 			<input id="updateBTN" type="button" value="&nbsp;修改&nbsp;" onclick="updateData('query${jspDTO.formated_tab_name}.jsp')"/>
				 			&nbsp;&nbsp; <input id="deleteBTN" type="button" value="&nbsp;删除&nbsp;" onclick="deleteData()"/>
				</td>
			</tr>
		</table>
		<!-- 列表详情 start -->
		<table id="listContent" width="99.9%" border="0" align="center" style="margin-top: 5px;" class="tab_1" >
			<tr><th align="center" nowrap >选择</th>
				<#list dataInfoList as dataInfo>
				<#assign d_inde = dataInfo_index />
				<th align="center" nowrap ><#if (dataInfo.COLUMN_COMMENTS??)><#if (dataInfo.COLUMN_COMMENTS?length>3)>${dataInfo.COLUMN_COMMENTS[0..3]?default("")}<#else>${dataInfo.COLUMN_COMMENTS?default("")}</#if><#else>${dataInfo.COLUMN_NAME}</#if></th>
				</#list>
			</tr>
			<xweb:page rows="10" provider="<%=provider%>">
				<xweb:iterate type="java.util.Map" id="temp">
			<tr class="">
				<td align="center" nowrap ><input type="radio" name="selectedRadio" id="selectedRadio" value="${'$'}{temp.ID}"/><xweb:rowNumber/></td>
				<#list dataInfoList as dataInfo>
				<#assign d_inde = dataInfo_index />
				<#if (d_inde ==0 ) >
				<td align="center"><a href="javascript:viewOnly('${'$'}{temp.ID}');"><c:out value="${'$'}{temp.${dataInfo.COLUMN_NAME}}"/></a></td>
				</#if>
				<#if (d_inde >0 ) >
				<td align="center"><c:out value="${'$'}{temp.${dataInfo.COLUMN_NAME}}"/></td>
				</#if>
				</#list>
			</tr>
				</xweb:iterate>
				
			<tr  align="center">
				<td id="noadd" colspan="${(dataInfoList ? size) +1}"  align="center" height="25" class="tab_bg2">
				<xweb:pageInfo/>&nbsp;&nbsp;<xweb:prevLink title=" < " />&nbsp;&nbsp;<xweb:numberLink/>&nbsp;&nbsp;<xweb:nextLink title=" > " />&nbsp;&nbsp;<xweb:gotoOtherPage style="linkNo" jsfunName="_goToOtherPage('url','totalPages')"/>
				</td>
			</tr>
			</xweb:page>
			
		</table>
   	<!-- 列表详情 end -->


  </body>
</html>
<xweb:setForm useRequest="true" formName="query"/>