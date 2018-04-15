<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>新增模板</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" enctype="multipart/form-data" action="com.fintech.modules.boot.platform.systemplate.controller.SysTemplateController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 系统ID ：</th>
  <td > 
  <input type="text" class="text" id="dtoappId" name="appId" notNull="true" maxLength="25" value="" />
  </td>
  <th> 模板编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtotemplateNo" name="templateNo" notNull="true" maxLength="25" value="" onblur = "checkUnique(this);" />
  </td>
  </tr>
<tr>
  <th> 模板名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtotemplateName" name="templateName" notNull="true" maxLength="50" value="" />
  </td>
  <th> 模板类型  ：</th>
  <td > 
  <select id="dtotemplateType" name="templateType">
  	<option value="1">短信</option>
  	<option value="2">邮件</option>
  	<option value="9">其他</option>
  </select>
  </td>
</tr>
<tr>
  <th> 模板内容 ：</th>
  <td colspan="3"> 
  <input type="file" id="dtocontent" name="content">
  </td>
</tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>
</div>
</body>

<script type="text/javascript">
   $(document).ready(function(){
   		checkedInit();
	});
   
	//校验唯一
	function checkUnique( obj  ){
		var params = 'tableName=sys_template&uniqueColumn=template_No&checkValue='+$(obj).val();
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
				//alert(msg.msg);
				$("").newMsg({}).show("模板编码唯一性校验失败，请重新填写！");
				//alert("模板编码唯一性校验失败，请重新填写！");
				$(obj).addClass("checkError");
      			$(obj).focus();
		  	}  	
		);
	}
   
</script>
  
</html>
