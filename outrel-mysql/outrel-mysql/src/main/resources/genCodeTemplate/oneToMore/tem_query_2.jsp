<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
 <%@ include file="/common.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
   <title>查询${jspDTO.tableComments}</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <c:if test="${'$'}{'viewOnly' ne param.viewOnly}">
 <%@ include file="/jscommon.jsp" %>
 </c:if>
 <c:if test="${'$'}{'viewOnly' eq param.viewOnly}">
 <%@ include file="/jscommon2.jsp" %>
 </c:if>
 
  <%-- 只引入一个通用表单样式 --%>
  <link href="${'$'}{basePath }css/style.css" rel="stylesheet" type="text/css">
  <script type='text/javascript'>
  var subInframeId = '${'$'}{param.subIframeId}';
  </script>
  <script type='text/javascript' src='js/query${jspDTO.formated_tab_name}.js'></script>
   <%-- 引入dwr js --%>
   <script type='text/javascript' src='${'$'}{basePath }dwr/engine.js'></script>
   <script type='text/javascript' src='${'$'}{basePath }dwr/util.js'></script>
   <script type='text/javascript' src='${'$'}{basePath }dwr/interface/${jspDTO.serviceClassName}.js'></script>
   
  </head>
  <body style="background-color:#FFFFFF">

		<!-- 默认查询列表传递的信息 -->
   		<xweb:setBean id="provider" type="${jspDTO.providerPackageName}.${jspDTO.providerClassName}">
   		  <xweb:property name="dto.httpRequest" value="<%=request %>" />
   		  <xweb:property name="dto.userIdOfOperateData" value="${'$'}{userId }" />
   		  <xweb:property name="operateOfProvider" value="queryByPage" />
   		  <xweb:property name="dto.${jspDTO.proOfSubTable}" value='<%=StringUtilTools.filterSpecial(request,"MAIN_ID")%>' />
   		  
		</xweb:setBean>
		<!-- 操作信息 -->
		<c:if test="${'$'}{'viewOnly' ne param.viewOnly}">
		<table id="listContent1" width="99.9%" border="0" align="center" style="margin-top: 5px;" class="" >
		<tr> <td id="noadd" align="left" colspan="${(dataInfoList ? size)}"  class="my_buttons" >
				  列表结果 &nbsp;&nbsp; <input id="addBTN" type="button" value="&nbsp;新增&nbsp;" onclick="addData('${'$'}{param.MAIN_ID}')"/>
				 			<input id="updateBTN" type="button" value="&nbsp;修改&nbsp;" onclick="updateData()"/>
				 			&nbsp;&nbsp; <input id="deleteBTN" type="button" value="&nbsp;删除&nbsp;" onclick="deleteData()"/>
				</td>
			</tr>
		</table>
		</c:if>
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
				<td align="center" nowrap ><c:if test="${'$'}{'viewOnly' ne param.viewOnly}"><input type="radio" name="selectedRadio" id="selectedRadio" value="${'$'}{temp.ID}"/></c:if><xweb:rowNumber/></td>
				<#list dataInfoList as dataInfo>
				<td align="center"><c:out value="${'$'}{temp.${dataInfo.COLUMN_NAME}}"/></td>
				</#list>
			</tr>
				</xweb:iterate>
				
			<tr  align="center">
				<td id="noadd" colspan="${(dataInfoList ? size)+1}"  align="center" height="25" class="tab_bg2">
				<xweb:pageInfo/>&nbsp;&nbsp;<xweb:prevLink title=" < " />&nbsp;&nbsp;<xweb:numberLink/>&nbsp;&nbsp;<xweb:nextLink title=" > " />&nbsp;&nbsp;<xweb:gotoOtherPage style="linkNo" jsfunName="_goToOtherPage('url','totalPages')"/>
				</td>
			</tr>
			</xweb:page>
			
		</table>
   	<!-- 列表详情 end -->

<!-- 相关js方法 -->
<script type="text/javascript">
$(document).ready(function(){
		//$("#listContent tr:even").addClass("tr_body");
	    //列表鼠标滑过行效果
		PICC.common.initTableTrHover($("#listContent"),{
			overClass:"tr_hover",
			clickClass:"tr_body",
			clickCallback:function(tr){
			    var _tds = $(tr).children();	//获取当前行
				if(_tds.attr("id")=="noadd"){
				   return;
				}
				//选中Radio按钮
				if(_tds.eq(1).children().prop("checked") == "" || !_tds.eq(1).children().prop("checked")){
					var obj = _tds.eq(0).children();
					obj.prop("checked", true);
				}
			}
		});
	//设置iframe自适应大小	
	PICC.common.autoSetIframHeight('${'$'}{param.subIframeId}');	
});
</script>   
  </body>
</html>
