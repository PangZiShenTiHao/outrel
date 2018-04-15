<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>修改岗位定义表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysorg.sysposition.controller.SysPositionController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
<input type="hidden" id="dtovalidateState" name="validateState" value="${dto.validateState}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 岗位名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtopositionName" name="positionName" notNull="false" maxLength="25" value="${dto.positionName}" />
  </td>
</tr>
<tr>
  <th> 岗位编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtopositionCode" name="positionCode" notNull="false" maxLength="25" value="${dto.positionCode}" onblur="checkUnique(this);" />
  </td>
</tr>
<tr>
  <th> 排序 ：</th>
  <td ><input type="text" class="text" id="dtoorderBy" name="orderBy" notNull="false" maxLength="25" value="${dto.orderBy}" /></td>
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
   
	//校验用户名称唯一
	function checkUnique( obj  ){
		var params = 'tableName=sys_position&uniqueColumn=position_Code&checkValue='+$(obj).val()+'&nocheckId='+$("#dtoid").val();
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
