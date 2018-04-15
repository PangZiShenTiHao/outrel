<%@ page language="java" import="java.util.*,com.platform.util.ConstantBeanId" pageEncoding="UTF-8"%>
<%@ include file="/common.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>新增${jspDTO.tableComments}</title>
 <%@ include file="/jscommon2.jsp" %>
 <script type='text/javascript' src='js/add${jspDTO.formated_tab_name}.js'></script>
<link href="${'$'}{basePath }css/style.css" rel="stylesheet" type="text/css">
  </head>
  
  <body style="background-color:#FFFFFF">
  <br/>
    <fieldset class="search_fieldset2 mag_top">
<legend>新增信息</legend>
<br/>
<xweb:form name="newsForm" type="${jspDTO.actionPackageName}.${jspDTO.actionClassName}">
    <!-- 分步骤完成主子表的主表新增 -->
    <input type="hidden" name="operateOfAction" value="add${jspDTO.formated_tab_name}AndNextOperate" >
    <input type='hidden' name='dto.urlJspOfTab' id="dtourlJspOfTab" value="${'$'}{param.urlJspOfTab }" />
	<input type='hidden' name='dispatchMode' value='redirect' />
	
<table width="96%" border="0" align="center" >
<!-- 展示显示的字段信息 -->
<#list dataInfoList as dataInfo>
<#assign d_inde = dataInfo_index />
<#if (d_inde %3 ==0 ) >
<tr>
</#if>
  <td align="right" nowrap ><#if (dataInfo.COLUMN_COMMENTS??)> <#if (dataInfo.COLUMN_COMMENTS?length>3)>${dataInfo.COLUMN_COMMENTS[0..3]?default("")}<#else>${dataInfo.COLUMN_COMMENTS?default("")}</#if> <#else>${dataInfo.COLUMN_NAME}</#if>：</td>
  <td align="left" <#if ( ((dataInfoList ? size) -1) == d_inde ) >colspan="${ (3- ((d_inde+1) %3))*2 }"</#if>> 
  <#if (dataInfo.DATA_TYPE == 'DATE') > 
  <input type="text" readonly onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true})" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" value=""  />
  <#else>
  		<#if (dataInfo.MY_VIEW == '文本框') > 
  <input type="text" class="validate[maxSize[${(dataInfo.DATA_LENGTH / 2 )?string('#')}]]" maxlength="${(dataInfo.DATA_LENGTH / 2 )?string('#')}" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" value="" />
  		<#elseif (dataInfo.MY_VIEW == '文本域') >
  <textarea class="validate[maxSize[${(dataInfo.DATA_LENGTH / 2 )?string('#') }]]" rows="" cols="" maxlength="${(dataInfo.DATA_LENGTH / 2 )?string('#') }" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}"   ></textarea>		
  		<#elseif (dataInfo.MY_VIEW == '下拉框') >
  <select id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" style="width: 160px;">
  	<option value="">---请选择---</option>
  </select>
  		</#if>  
  </#if>  
  </td>
<#if ((d_inde+1) %3 ==0 || ((dataInfoList ? size) -1) == d_inde ) >
</tr>
</#if>
</#list>

<!-- 展示隐藏的字段信息 -->
<#list dataHideList as dataInfo>
<#assign d_inde = dataInfo_index />
<#if (d_inde %3 ==0 ) >
<tr style=" display: none">
</#if>
  <td align="right" nowrap ><#if (dataInfo.COLUMN_COMMENTS??)> <#if (dataInfo.COLUMN_COMMENTS?length>3)>${dataInfo.COLUMN_COMMENTS[0..3]?default("")}<#else>${dataInfo.COLUMN_COMMENTS?default("")}</#if> <#else>${dataInfo.COLUMN_NAME}</#if>：</td>
  <td align="left" <#if ( ((dataHideList ? size) -1) == d_inde ) >colspan="${ (3- ((d_inde+1) %3))*2  }"</#if>> 
  <#if (dataInfo.DATA_TYPE == 'DATE') > 
  <input type="text" readonly onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true})" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" value=""  />
  <#else>
  		<#if (dataInfo.MY_VIEW == '文本框') > 
  <input type="text" class="validate[maxSize[${(dataInfo.DATA_LENGTH / 2 )?string('#') }]]" maxlength="${(dataInfo.DATA_LENGTH / 2 )?string('#') }" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" value="" />
  		<#elseif (dataInfo.MY_VIEW == '文本域') >
  <textarea class="validate[maxSize[${(dataInfo.DATA_LENGTH / 2 )?string('#') }]]" rows="" cols="" maxlength="${(dataInfo.DATA_LENGTH / 2 )?string('#')}" id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}"   ></textarea>		
  		<#elseif (dataInfo.MY_VIEW == '下拉框') >
  <select id="${dataInfo.DTO_COLUMN_NAME?replace(".","")}" name="${dataInfo.DTO_COLUMN_NAME}" style="width: 160px;">
  	<option value="">---请选择---</option>
  </select>
  		</#if>  
	
  </#if>  
  </td>
<#if ((d_inde+1) %3 ==0 || ((dataHideList ? size) -1) == d_inde ) >
</tr>
</#if>
</#list>

<tr><td align="center" colspan="6" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="6" class="my_buttons">
        <input id="nextBtn" type="button" value="保存并下一步" onclick="nextOperate()" />
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
	$("#newsForm").validationEngine({scroll:false,focusFirstField:false,promptPosition:'topLeft'});
});

</script>
  </body>
</html>
<xweb:setForm useRequest="true" formName="newsForm"/>
<%String alterMsg = (String)request.getAttribute(ConstantBeanId.MSG); %>
<%@ include file="/alertCommon.jsp" %> 