<%@ page language="java" import="java.util.*,com.platform.util.ConstantBeanId" pageEncoding="UTF-8"%>
<%@ include file="/common.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>查看${jspDTO.tableComments}</title>
 <%@ include file="/jscommon2.jsp" %>
    <link href="${'$'}{basePath }css/style.css" rel="stylesheet" type="text/css">
  </head>
  <style type="text/css">
			TD {word-break:break-all;}
   </style>
  <body style="background-color:#FFFFFF">
  <br/>
<fieldset class="search_fieldset2 mag_top">
<legend>详情信息</legend>
<!-- 默认查询列表传递的信息 -->
<xweb:setBean id="dtoOfUpdate" type="${jspDTO.providerPackageName}.${jspDTO.providerClassName}">
	<xweb:property name="dto.httpRequest" value="<%=request %>" />
	<xweb:property name="dto.userIdOfOperateData" value="${'$'}{userId }" />
	<xweb:property name="operateOfProvider" value="queryOneDTOById" />
	<xweb:property name="dto.id" value='<%=StringUtilTools.filterSpecial(request,"dto.id")%>' />
</xweb:setBean>


<table width="96%" id="listContent"  border="1" bordercolor="#CCCCCC" style="margin:20px;border-collapse:collapse;">
<!-- 修改一条数据 -->
<xweb:page rows="-1" provider="<%=dtoOfUpdate%>" paging="false">
<xweb:iterate type="java.util.Map" id="temp">

<!-- 显示的字段信息 -->
<#list dataInfoList as dataInfo>
<#assign d_inde = dataInfo_index />
<#if (d_inde %3 ==0 ) >
<tr>
</#if>
  <td align="right" nowrap style="width:10%" ><#if (dataInfo.COLUMN_COMMENTS??)> <#if (dataInfo.COLUMN_COMMENTS?length>3)>${dataInfo.COLUMN_COMMENTS[0..3]?default("")}<#else>${dataInfo.COLUMN_COMMENTS?default("")}</#if> <#else>${dataInfo.COLUMN_NAME}</#if>：</td>
  <td align="left" style="width:20%" <#if ( ((dataInfoList ? size) -1) == d_inde ) >colspan="${ (d_inde+1) %3 }"</#if>>${'$'}{temp.${dataInfo.COLUMN_NAME }}</td>
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
  <td align="right" nowrap style="width:10%" ><#if (dataInfo.COLUMN_COMMENTS??)> <#if (dataInfo.COLUMN_COMMENTS?length>3)>${dataInfo.COLUMN_COMMENTS[0..3]?default("")}<#else>${dataInfo.COLUMN_COMMENTS?default("")}</#if> <#else>${dataInfo.COLUMN_NAME}</#if>：</td>
  <td align="left" style="width:20%" <#if ( ((dataHideList ? size) -1) == d_inde ) >colspan="${ (d_inde+1) %4 }"</#if>>${'$'}{temp.${dataInfo.COLUMN_NAME }}</td>
<#if ((d_inde+1) %3 ==0 || ((dataHideList ? size) -1) == d_inde ) >
</tr>
</#if>
</#list>


  </xweb:iterate>
  </xweb:page>
</table>
<hr>
子表信息

	<link href="<%=basePath %>lib/ligerUI/skins/red/css/ligerui-tab.css" rel="stylesheet" type="text/css" />
   <script src="<%=basePath %>lib/ligerUI/js/core/base.js" type="text/javascript"></script>
   <script src="<%=basePath %>lib/ligerUI/js/plugins/ligerTab.js" type="text/javascript"></script>
   <script src="<%=basePath %>lib/ligerUI/js/plugins/ligerMenu.js" type="text/javascript"></script>
   <script src="<%=basePath %>lib/ligerUI/js/plugins/ligerDrag.js" type="text/javascript"></script>
   <script type="text/javascript">
   	$(document).ready(function(){
   	
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
   	
   	$("#tab1").ligerTab({ onBeforeSelectTabItem: function (tabid){
				var myCount = tabid.substring(tabid.indexOf("tabitem")+"tabitem".length,tabid.length);
   				//代码生成 查看预览最多自动添加4个tab（4个子表）
   				switch(myCount*1){
   					case 1:
	   					if(!$("#ifr1").attr("src")){
	                		$("#ifr1").attr("src",v_testSrc)
	                	}
   					break;
   					case 2:
	   					var v_testSrc = '<%=basePath %>moreSubTabJspPath?subIframeId=ifr1&viewOnly=viewOnly&MAIN_ID=<%=StringUtilTools.filterSpecial(request,"dto.id")%>';
	   					if(!$("#ifr2").attr("src")){
	                		$("#ifr2").attr("src",v_testSrc)
	                	}
   					break;
   					case 3:
	   					var v_testSrc = '<%=basePath %>moreSubTabJspPath?subIframeId=ifr1&viewOnly=viewOnly&MAIN_ID=<%=StringUtilTools.filterSpecial(request,"dto.id")%>';
	   					if(!$("#ifr3").attr("src")){
	                		$("#ifr3").attr("src",v_testSrc)
	                	}
   					break;
   					case 4:
	   					var v_testSrc = '<%=basePath %>moreSubTabJspPath?subIframeId=ifr1&viewOnly=viewOnly&MAIN_ID=<%=StringUtilTools.filterSpecial(request,"dto.id")%>';
	   					if(!$("#ifr4").attr("src")){
	                		$("#ifr4").attr("src",v_testSrc)
	                	}
   					break;
   					
   				}
				 
            }
            });
   	});
   </script>
<div id="tab1" align="center" style="overflow:hidden; border:1px solid #c0c0c0; width: 98%;"> 
            <div id="div1" title="子表1">
            <iframe id="ifr1" name="ifr1"  src="<%=basePath %>oneSubTabJspPath?subIframeId=ifr1&viewOnly=viewOnly&MAIN_ID=<%=StringUtilTools.filterSpecial(request,"dto.id")%>" width="100%" frameborder="no"></iframe>
            </div>
            <span id='appendMoreSubTabble'></span>
</div>
<br/>
</fieldset>


  </body>
</html>
