<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>修改模板</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script src="${basePath}js/threeJs/jquery/jquery.form.js"></script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form:form modelAttribute="dto" name="updateNewsFormData" id ="updateNewsFormData" isCheck="true" enctype="multipart/form-data" action="com.fintech.modules.boot.platform.systemplate.controller.SysTemplateController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 系统ID ：</th>
  <td > 
  <input type="text" class="text" id="dtoappId" name="appId" notNull="false" maxLength="25" value="${dto.appId}" />
  </td>
  <th> 模板编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtotemplateNo" name="templateNo" notNull="false" maxLength="25" value="${dto.templateNo}" onblur = "checkUnique(this);" />
  </td>
  </tr>
<tr>
  <th> 模板名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtotemplateName" name="templateName" notNull="false" maxLength="50" value="${dto.templateName}" />
  </td>
  <th> 模板类型  ：</th>
  <td > 
  <form:select path="templateType" id="dtotemplateType">
  	<form:option value="1">短信</form:option>
  	<form:option value="2">邮件</form:option>
  	<form:option value="9">其他</form:option>
  </form:select>
  </td>
</tr>
<tr>
  <th> 模板内容 ：</th>
  <td  colspan="3"> 
  	<input type="file" class="text" id="dtocontent" name="content" notNull="false" maxLength="2000"/>
  	${templateContent}
  </td>
</tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form:form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
   	checkedInit();
	});
   
	//校验唯一
	function checkUnique( obj  ){
		var params = 'tableName=sys_template&uniqueColumn=template_No&checkValue='+$(obj).val()+'&nocheckId='+$("#dtoid").val();
		if( $(obj).val()==null || $(obj).val()== "" ){
 		$(obj).addClass("checkError");
 		return;
		}
		jyAjax( 
				contextRootPath+"/common/checkUnique",
				params,
				function(msg){
					//新增成功后，
					var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		
		        	}else{
		        		//alert(v_status);
		        		$(obj).addClass("checkError");
					//	alert(msg.msg);
		        	}
		  	},
			function(msg){
				$("").newMsg({}).show(msg.msg);;
     			$(obj).addClass("checkError");
     			$(obj).focus();
		  	}  	
		);
	}
</script>
  
</html>
