<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
 <%@ taglib uri="/sysarea" prefix="sysarea"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
   <title>修改机构部门表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form:form modelAttribute="dto"  id="updateNewsFormData" name="updateNewsFormData" isCheck="true">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
<input type="hidden" class="text" id="dtoparentId" name="parentId" notNull="false" maxLength="11" value="${dto.parentId}" />
<input type="hidden" class="text" id="dtoparentIds" name="parentIds" notNull="false" maxLength="11" value="${dto.parentIds}" />


 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 机构编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorgCode" name="orgCode" notNull="true" maxLength="50" value="${dto.orgCode}"  onblur="checkUnique(this);"/>
  </td>
  <th> 机构名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorgName" name="orgName" notNull="true" maxLength="50" value="${dto.orgName}" />
  </td>
  </tr>
<tr>
  <th> 机构类型：</th>
  <td > 
  <form:select path="orgType" id="dtoorgType">
	  	<form:option value="org">组织</form:option>
	  	<form:option value="dept">部门</form:option>
  </form:select>
  </td>
  <th> 排序 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorderBy" name="orderBy" notNull="false" maxLength="25" value="${dto.orderBy}" />
  </td>
</tr>

<tr>
<th>机构所属行政区划：</th>
	<td colspan="3">
	<sysarea:search level='3' pid="pcurrentAreacode" pname="pcurrentAreacode" className="notnull" cid="ccurrentAreacode" cname="ccurrentAreacode" tname='areaCodes' tid="areaCodes" defaultValue="${dto.areaCodes}" type="select" />
	<input class="text" id="dtoareaAdress" name="areaAdress" value="${dto.areaAdress}">
</td>
</tr>

<tr>
  <th> 是否有效 ：</th>
  <td> 
  <form:select path="validateState" id="dtovalidateState">
	  	<form:option value="0">无效</form:option>
	  	<form:option value="1">有效</form:option>
  </form:select>
  </td>
  <th> 是否是虚拟组织 ：</th>
  <td > 
  <form:select path="isVirtual" id="dtoisVirtual" onchange="isVirtualChange(this)">
	  	<form:option value="0">否</form:option>
	  	<form:option value="1">是</form:option>
  </form:select>
  </td>
</tr>
<tr id="appFlagTr" ${ '1' eq dto.appFlag ? '':'style="display: none;"' }>
  <th> 系统标示 ：</th>
  <td colspan="3"> 
  <form:select path="appFlag" id="dtoappFlag" >
   	<form:option value="">---请选择---</form:option>
  	<form:option value="1">平台</form:option>
  	<form:option value="2">贷前贷后</form:option>
  	<form:option value="3">理财</form:option>
  	<form:option value="4">核心</form:option>
  </form:select>
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
   
   //change
   function isVirtualChange(obj){
	   if($(obj).val()=='1'){
		   $("#appFlagTr").show();
	   }else{
		   $("#appFlagTr").hide();
		   $("#appFlagTr").find("select").val("");
	   }
   }
   
	//校验用户名称唯一
	function checkUnique( obj  ){
		var params = 'tableName=sys_org&uniqueColumn=org_Code&checkValue='+$(obj).val()+'&nocheckId='+$("#dtoid").val();
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
