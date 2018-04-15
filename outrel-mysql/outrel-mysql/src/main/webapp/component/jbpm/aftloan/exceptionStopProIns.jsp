<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
 <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <%@ include file="/common/StaticJavascript.jsp" %>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>异常终止流程实例</title>
  	<script type="text/javascript" src="${basePath}component/jbpm/scripts/jquery-1.7.2.min.js"></script>
	<link type="text/css" rel="stylesheet" href="${basePath}component/jbpm/css/validationEngine.jquery.css"   />
	<script type="text/javascript" src="${basePath}component/jbpm/scripts/jquery.validationEngine.min.js"></script>
	
  </head>
  <body style="background-color:#FFFFFF">
  <br>
	<form id="exceptionStopProIns" name="exceptionStopProIns" method="post">
     <table  class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1"  width="96%">
		<tr><td align="right" nowrap class="needRequired">任务名称： </td>
         	<td><c:out value="${param.bizInfName}"></c:out></td>
       		<td align="right" nowrap class="needRequired">流程实例ID： </td>
         	<td><c:out value="${param.proInsId}"></c:out><input type="hidden" id="proInsId" name="proInsId" value="${param.proInsId}"/></td>
        </tr>
  		<tr>
            <td class="needRequired">备注： </td>
            <td colspan="3"><textarea id="exceptionRemark" name="exceptionRemark" rows="2" cols="60" class="validate[maxSize[100],required]"></textarea>
            </td>
        </tr>
        
        <tr><td></td><td align="center" colspan="4">
        <input onclick="saveData()" type="button" id="savaBtn" value="异常终止" />
        <input onclick="closeWindow()" type="button" id="savaBtn2" value="关闭" />
        </td>
        </tr>  
    </table>
    
    </form>
    
    
<script type="text/javascript">
$(document).ready(function(){
	//注册校验事件
	$("#exceptionStopProIns").validationEngine({scroll:false,focusFirstField:false,promptPosition:'topLeft'});
});

/*
 * 执行
 */
function saveData(){
	var v_boolean = $("#exceptionStopProIns").validationEngine("validate");
	//判断是否全部校验通过了
	if(v_boolean){
		if(confirm("您确定要异常终止该流程实例吗？")){
			$("[id^='saveBtn']").attr("disabled",true);
			$.ajax({
				type:"POST",
				/* dataType:"JSON", */
				url:contextRootPath+"/exceptionStopByProInsId.do",
				data:$("#exceptionStopProIns").serialize(),
				success:function(msg){
					alert(msg);
					//关闭页面 并刷新
					closeWindow();
				}
			});
		}
	}
}
/*
 * 关闭
 */
function closeWindow(){
	var api = frameElement.api, W = api.opener;
	 //获取父页面的值
	 api.close();
	 //调用父页面查询 关闭时刷新父页面
	 W.queryData();
}
</script>
  </body>
</html>
