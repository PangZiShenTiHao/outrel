<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>规则组分配</title>
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
<form id="ruleGroupFormData" name="ruleGroupFormData" isCheck="true">
 <input type="hidden" id="ruleId" name="ruleId" value="${ruleId}" notNull="true"/>
 <input type="hidden" id="mapType" name="mapType" value="GROUP" notNull="true"/>
 <table id="ruleGroupTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
    <tr class="test">
      <td class="selectTd"> </td>
      <th> 规则组编号</th>
      <th> 规则组名称</th>
    </tr>
   <c:forEach items="${ruleGroupList}" var="ruleGroup">
	  <tr class="test" id="${ruleGroup.id}">
         <td class="selectTd">
             <c:if test="${ruleGroup.ruleGroupCode eq ruleMap.mapCode}">
                <input type="radio" name="mapCode" value="${ruleGroup.ruleGroupCode}" notNull="true"  checked="checked"/>
             </c:if> 
             <c:if test="${ruleGroup.ruleGroupCode ne ruleMap.mapCode}">
                <input type="radio" name="mapCode" value="${ruleGroup.ruleGroupCode}" notNull="true"/>
             </c:if>
         </td>
		 <td>${ruleGroup.ruleGroupCode}</td>
		 <td>${ruleGroup.ruleGroupName}</td>
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

<script type="text/javascript">
   function corpBrchChecked(){
   	 return $("input:radio[name='creditId']:checked").val();
   }
   function corpBrchCode(){
   	 var id = $("input:radio[name='creditId']:checked").val();
   	 return $("#creditId"+id).val();
   }
   
</script>
  
</html>
