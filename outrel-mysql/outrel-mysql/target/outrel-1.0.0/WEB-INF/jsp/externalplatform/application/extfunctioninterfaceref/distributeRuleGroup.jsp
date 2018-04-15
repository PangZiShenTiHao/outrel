<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>规则集分配</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style type="text/css">
	   .test th{
            text-align:center;
            padding:3px 5px;
            vertical-align: middle;
		    min-width:140px !important;
        }
       .test tr {
           text-align:center;
           padding:3px 5px;
           vertical-align: middle;
       }    
	   .test td{
		    text-align:center;
		    padding:3px 5px;
		    vertical-align: middle;
		}
		.selectTd{
		    min-width:40px !important;
		}
   </style>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="ruleGroupFormData" name="ruleGroupFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extfunctioninterfaceref.controller.ExtFunctionInterfaceRefController">
 <input type="hidden" id="dtoid" name="id" value="${id}" notNull="true"/>
 <table id="ruleGroupTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
    <tr class="test">
      <td class="selectTd"> </td>
      <th> 规则集编号</th>
      <th> 规则集名称</th>
    </tr>
   <c:forEach items="${ruleGroupList}" var="ruleGroup">
	  <tr class="test" id="${ruleGroup.id}">
         <td class="selectTd">
             <c:if test="${ruleGroup.ruleCode eq ruleMap.ruleGroupCode}">
                <input type="radio" name="ruleGroupCode" value="${ruleGroup.ruleCode}" notNull="true"  checked="checked"/>
             </c:if> 
             <c:if test="${ruleGroup.ruleCode ne ruleMap.ruleGroupCode}">
                <input type="radio" name="ruleGroupCode" value="${ruleGroup.ruleCode}" notNull="true"/>
             </c:if>
         </td>
		 <td>${ruleGroup.ruleCode}</td>
		 <td>${ruleGroup.chName}</td>
	  </tr>
   </c:forEach>
 </table>
<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>
</div>
</body>

<script type="text/javascript">
   $(document).ready(function(){
    $(".test").click(function () {
    	var val = $(this).attr("id");
    	$("input:radio[value='"+val+"']").attr("checked","true");
      });
	});
</script>
  
</html>