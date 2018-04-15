<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改规则执行表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.drools.sysrulethenconfig.controller.SysRuleThenConfigController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 执行代码 ：</th>
  <td > 
  <input type="text" class="text" id="dtoexcutionCode" name="excutionCode" notNull="false" maxLength="1000" value="${dto.excutionCode}" />
  </td>
  <th> 编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtoruleCode" name="ruleCode" notNull="false" maxLength="25" value="${dto.ruleCode}" />
  </td>
  <th> 备注 ：</th>
  <td > 
  <input type="text" class="text" id="dtoremark" name="remark" notNull="false" maxLength="500" value="${dto.remark}" />
  </td>
</tr>
<tr>
  <th> 创建人 ：</th>
  <td > 
  <input type="text" class="text" id="dtocreateUser" name="createUser" notNull="false" maxLength="25" value="${dto.createUser}" />
  </td>
  <th> 创建时间 ：</th>
  <td > 
  <input type="text" class="text" id="dtocreateDate" name="createDate" notNull="false" maxLength="4" value="${dto.createDate}" />
  </td>
  <th> 修改人 ：</th>
  <td > 
  <input type="text" class="text" id="dtoupdateUser" name="updateUser" notNull="false" maxLength="25" value="${dto.updateUser}" />
  </td>
</tr>
<tr>
  <th> 修改时间 ：</th>
  <td > 
  <input type="text" class="text" id="dtoupdateDate" name="updateDate" notNull="false" maxLength="4" value="${dto.updateDate}" />
  </td>
  <th> 版本号 ：</th>
  <td > 
  <input type="text" class="text" id="dtoversionNum" name="versionNum" notNull="false" maxLength="10" value="${dto.versionNum}" />
  </td>
  <th> 此版本是否修改 ：</th>
  <td > 
  <input type="text" class="text" id="dtonewVersionIsUpdate" name="newVersionIsUpdate" notNull="false" maxLength="11" value="${dto.newVersionIsUpdate}" />
  </td>
</tr>
<tr>
  <th> 帮助信息，保存 ：</th>
  <td > 
  <input type="text" class="text" id="dtohelp" name="help" notNull="false" maxLength="1000" value="${dto.help}" />
  </td>
  <th> 规则表的规则编 ：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtoparentCode" name="parentCode" notNull="false" maxLength="25" value="${dto.parentCode}" />
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
</script>
  
</html>
