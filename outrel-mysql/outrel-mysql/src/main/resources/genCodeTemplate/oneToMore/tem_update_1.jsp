<%@ page language="java" import="java.util.*,com.platform.util.ConstantBeanId" pageEncoding="UTF-8"%>
<%@ include file="/common.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>修改${jspDTO.tableComments}</title>
 <%@ include file="/jscommon2.jsp" %>
 <script type='text/javascript' src='js/update${jspDTO.formated_tab_name}.js'></script>
    <link href="${'$'}{basePath }css/style.css" rel="stylesheet" type="text/css">
  </head>
  
  <body style="background-color:#FFFFFF">
  <br/>
<fieldset class="search_fieldset2 mag_top">
<legend>修改信息</legend>
<br/>   
<xweb:form name="updateForm" type="${jspDTO.actionPackageName}.${jspDTO.actionClassName}">
    <!-- 分步骤完成主子表信息的修改 -->
    <input type="hidden" name="operateOfAction" value="update${jspDTO.formated_tab_name}AndNextOperate" >
     <input type='hidden' name='dto.urlJspOfTab' id="dtourlJspOfTab" value="${'$'}{param.urlJspOfTab }" />
     <input type='hidden' name='dispatchMode' value='redirect' />
     <!-- 修改时存放的id -->
  <input type="hidden" maxlength="250" id="dtoid" type="text" name="dto.id" value='<%=StringUtilTools.filterSpecial(request,"dto.id")%>' />

<!-- 默认查询列表传递的信息 -->
<xweb:setBean id="dtoOfUpdate" type="${jspDTO.providerPackageName}.${jspDTO.providerClassName}">
	<xweb:property name="dto.httpRequest" value="<%=request %>" />
	<xweb:property name="dto.userIdOfOperateData" value="${'$'}{userId }" />
	<xweb:property name="operateOfProvider" value="queryOneDTOById" />
	<xweb:property name="dto.id" value='<%=StringUtilTools.filterSpecial(request,"dto.id")%>' />
</xweb:setBean>


<table width="96%" border="0" align="center"  >
<!-- 修改一条数据 -->
<xweb:page rows="-1" provider="<%=dtoOfUpdate%>" paging="false">
<xweb:iterate type="java.util.Map" id="temp">
<!-- 显示的字段信息 -->
<#list dataInfoList as dataInfo>
<#assign d_inde = dataInfo_index />
<#if (d_inde %3 ==0 ) >
<tr>
</#if>
  <td align="right" nowrap ><#if (dataInfo.COLUMN_COMMENTS??)> <#if (dataInfo.COLUMN_COMMENTS?length>3)>${dataInfo.COLUMN_COMMENTS[0..3]?default("")}<#else>${dataInfo.COLUMN_COMMENTS?default("")}</#if> <#else>${dataInfo.COLUMN_NAME}</#if>：</td>
  <td align="left" <#if ( ((dataInfoList ? size) -1) == d_inde ) >colspan="${ (d_inde+1) %4 }"</#if>> 
  <#if (dataInfo.DATA_TYPE == 'DATE') > 
  <input type="text" readonly onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true})" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" value="${'$'}{temp.${dataInfo.COLUMN_NAME }}"  />
  <#else>
  		<#if (dataInfo.MY_VIEW == '文本框') > 
  <input type="text" class="validate[maxSize[${(dataInfo.DATA_LENGTH / 2 )?string('#')}]]"  maxlength="${(dataInfo.DATA_LENGTH / 2 )?string('#') }" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" value="${'$'}{temp.${dataInfo.COLUMN_NAME }}" />
  		<#elseif (dataInfo.MY_VIEW == '文本域') >
  <textarea class="validate[maxSize[${(dataInfo.DATA_LENGTH / 2 )?string('#') }]]" rows="" cols="" maxlength="${(dataInfo.DATA_LENGTH / 2 )?string('#') }" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" >${'$'}{temp.${dataInfo.COLUMN_NAME }}</textarea>
  		<#elseif (dataInfo.MY_VIEW == '下拉框') >
  <select id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" style="width: 160px;">
  	<option value="">---请选择---</option>
  	<option value="${'$'}{temp.${dataInfo.COLUMN_NAME }}" selected="selected" >${'$'}{temp.${dataInfo.COLUMN_NAME }}</option>
  </select>
  		</#if>
  </#if>
  </td>
<#if ((d_inde+1) %3 ==0 || ((dataInfoList ? size) -1) == d_inde ) >
</tr>
</#if>
</#list>

<!-- 隐藏的字段信息 -->
<#list dataHideList as dataInfo>
<#assign d_inde = dataInfo_index />
<#if (d_inde %3 ==0 ) >
<tr style=" display: none">
</#if>
  <td align="right" nowrap ><#if (dataInfo.COLUMN_COMMENTS??)> <#if (dataInfo.COLUMN_COMMENTS?length>3)>${dataInfo.COLUMN_COMMENTS[0..3]?default("")}<#else>${dataInfo.COLUMN_COMMENTS?default("")}</#if> <#else>${dataInfo.COLUMN_NAME}</#if>：</td>
  <td align="left" <#if ( ((dataHideList ? size) -1) == d_inde ) >colspan="${ (d_inde+1) %4 }"</#if>> 
  <#if (dataInfo.DATA_TYPE == 'DATE') > 
  <input type="text" readonly onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true})" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" value="${'$'}{temp.${dataInfo.COLUMN_NAME }}"  />
  <#else>
  		<#if (dataInfo.MY_VIEW == '文本框') > 
  <input type="text" class="validate[maxSize[${(dataInfo.DATA_LENGTH / 2 )?string('#')}]]"  maxlength="${(dataInfo.DATA_LENGTH / 2 )?string('#') }" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" value="${'$'}{temp.${dataInfo.COLUMN_NAME }}" />
  		<#elseif (dataInfo.MY_VIEW == '文本域') >
  <textarea class="validate[maxSize[${(dataInfo.DATA_LENGTH / 2 )?string('#')}]]" rows="" cols="" maxlength="${(dataInfo.DATA_LENGTH / 2 )?string('#')}" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" >${'$'}{temp.${dataInfo.COLUMN_NAME }}</textarea>
  		<#elseif (dataInfo.MY_VIEW == '下拉框') >
  <select id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" style="width: 160px;">
  	<option value="">---请选择---</option>
  	<option value="${'$'}{temp.${dataInfo.COLUMN_NAME }}" selected="selected" >${'$'}{temp.${dataInfo.COLUMN_NAME }}</option>
  </select>
  		</#if>
  </#if>  
  </td>
<#if ((d_inde+1) %3 ==0 || ((dataHideList ? size) -1) == d_inde ) >
</tr>
</#if>
</#list>
  </xweb:iterate>
  </xweb:page>
  
<tr><td align="center" colspan="6" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="8" class="my_buttons">
       <input id="saveBtn" type="button" value="保存并下一页" onclick="saveUpdateData()" />
       <input id="restBtn" type="button" value="关闭" onclick="closeWindow('${'$'}{param.urlJspOfTab }')" />
  </td>
</tr>
</table>

</xweb:form>
</fieldset>


<br/>
<script type="text/javascript">
$(document).ready(function(){
//注册校验事件
	$("#updateForm").validationEngine({scroll:false,focusFirstField:false,promptPosition:'topLeft'});
});

</script>
  </body>
</html>
<xweb:setForm useRequest="true" formName="updateForm"/>
<%String alterMsg = (String)request.getAttribute(ConstantBeanId.MSG); %>
<%@ include file="/alertCommon.jsp" %> 