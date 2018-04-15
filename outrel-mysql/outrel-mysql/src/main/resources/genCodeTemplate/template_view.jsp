<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript2.jsp"%>

<div id="formPageSwap">
	<form id="viewForm" name="viewForm" isCheck="true" action="${jspDTO.actionPackageName}.${jspDTO.actionClassName}">
		<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${'$'}{dto.id}" />
		<table id="viewTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1">
			<#assign indexNum = 2 />
			<#list dataInfoList as dataInfo>
			<#assign d_inde = dataInfo_index />
			<#if (dataInfo.COLUMN_COMMENTS??)>
				<#if (dataInfo.COLUMN_COMMENTS?length>6)>
					<#assign column_name = dataInfo.COLUMN_COMMENTS[0..6]?default("") />
				<#else>
					<#assign column_name = dataInfo.COLUMN_COMMENTS?default("") />
				</#if>
			<#else>
				<#assign column_name = dataInfo.COLUMN_NAME />
			</#if>
			<#if (d_inde %indexNum ==0 ) >
			<tr>
				</#if>
				<th>${column_name}：</th>
				<td <#if ( ((dataInfoList ? size) -1) == d_inde ) && (dataInfoList ? size)%indexNum != 0 >colspan="${ (indexNum- ((d_inde+1) %indexNum))*2 +1}"</#if>>${'$'}{${dataInfo.DTO_COLUMN_NAME}}</td>
				<#if ((d_inde+1) %indexNum ==0 || ((dataInfoList ? size) -1) == d_inde ) >
			</tr>
			</#if>
			</#list>
		</table>
		<!-- 关闭 按钮 在 查询页面进行控制 -->
	</form>
</div>