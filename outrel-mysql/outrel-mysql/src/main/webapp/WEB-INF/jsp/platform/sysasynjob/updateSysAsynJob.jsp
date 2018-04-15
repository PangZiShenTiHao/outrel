<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript2.jsp" %>
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysasynjob.controller.SysAsynJobController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
	<tr>
	  <th> 备注：</th>
	  <td colspan="3"><textarea id="dtoremark" name="remark"  notNull="false" rows="10" cols="60" maxLength="200" checkChName="备注"></textarea>
	  </td>
	</tr>
  </table>
<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>
</div>

<script type="text/javascript">
   $(document).ready(function(){
   		checkedInit();
	});
</script>
