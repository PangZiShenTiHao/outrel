<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript2.jsp" %>
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.common.smsreceive.syssmslog.controller.SysSmsLogController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
	<tr>
	  <th> 手机号：</th>
	  <td > 
	  <input type="text" class="text" id="dtotelephone" name="telephone" notNull="false" maxLength="10" value="${dto.telephone}" checkChName="手机号" />
	  </td>
	  <th> 短信内容：</th>
	  <td > 
	  <input type="text" class="text" id="dtomsg" name="msg" notNull="false" maxLength="100" value="${dto.msg}" checkChName="短信内容" />
	  </td>
	</tr>
	<tr>
	  <th> 创建时间：</th>
	  <td > 
	  <input type="text" class="text" id="dtocreateTime" name="createTime" notNull="false" maxLength="6" value="${dto.createTime}" checkChName="创建时间" />
	  </td>
	  <th> 类型：</th>
	  <td > 
	  <input type="text" class="text" id="dtotype" name="type" notNull="false" maxLength="2" value="${dto.type}" checkChName="类型" />
	  </td>
	</tr>
	<tr>
	  <th> 调用接口返回码：</th>
	  <td > 
	  <input type="text" class="text" id="dtoretCode" name="retCode" notNull="false" maxLength="5" value="${dto.retCode}" checkChName="调用接口返回码" />
	  </td>
	  <th> 调用发送返回信：</th>
	  <td colspan=""> 
	  <input type="text" class="text" id="dtoretDesc" name="retDesc" notNull="false" maxLength="50" value="${dto.retDesc}" checkChName="调用发送返回信" />
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
