<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="formPageSwap">
  <br/>
	<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.common.smsreceive.syssmslog.controller.SysSmsLogController">
	 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
		<tr>
		  <th> 手机号：</th>
		  <td > 
		  <input type="text" class="text" id="dtotelephone" name="telephone" notNull="false" maxLength="10" value="" checkChName="手机号" />
		  </td>
		  <th> 短信内容：</th>
		  <td > 
		  <input type="text" class="text" id="dtomsg" name="msg" notNull="false" maxLength="100" value="" checkChName="短信内容" />
		  </td>
		</tr>
		<tr>
		  <th> 创建时间：</th>
		  <td > 
		  <input type="text" class="text" id="dtocreateTime" name="createTime" notNull="false" maxLength="6" value="" checkChName="创建时间" />
		  </td>
		  <th> 类型：</th>
		  <td > 
		  <input type="text" class="text" id="dtotype" name="type" notNull="false" maxLength="2" value="" checkChName="类型" />
		  </td>
		</tr>
		<tr>
		  <th> 调用接口返回码：</th>
		  <td > 
		  <input type="text" class="text" id="dtoretCode" name="retCode" notNull="false" maxLength="5" value="" checkChName="调用接口返回码" />
		  </td>
		  <th> 调用发送返回信：</th>
		  <td colspan="5"> 
		  <input type="text" class="text" id="dtoretDesc" name="retDesc" notNull="false" maxLength="50" value="" checkChName="调用发送返回信" />
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
