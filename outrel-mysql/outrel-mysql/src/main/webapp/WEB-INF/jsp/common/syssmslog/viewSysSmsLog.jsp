<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript2.jsp" %>
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.common.smsreceive.syssmslog.controller.SysSmsLogController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 手机号 ：</th>
  <td >${dto.telephone}</td>
  <th> 短信内容 ：</th>
  <td >${dto.msg}</td>
</tr>
<tr>
  <th> 创建时间 ：</th>
  <td >${dto.createTime}</td>
  <th> 类型 ：</th>
  <td >${dto.type}</td>
</tr>
<tr>
  <th> 调用接口返回码 ：</th>
  <td >${dto.retCode}</td>
  <th> 调用发送返回信 ：</th>
  <td colspan="">${dto.retDesc}</td>
</tr>
  </table>

<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>