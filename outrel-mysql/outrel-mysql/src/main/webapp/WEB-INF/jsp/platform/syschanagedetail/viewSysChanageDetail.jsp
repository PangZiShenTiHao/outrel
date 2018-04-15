<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript2.jsp" %>
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.syschanagedetail.controller.SysChanageDetailController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 信息变更表名称 ：</th>
  <td >${dto.bizTableName}</td>
  <th> 表字段名称 ：</th>
  <td >${dto.bizTableColum}</td>
</tr>
<tr>
  <th> 变更信息描述 ：</th>
  <td >${dto.changeItemName}</td>
  <th> 原值 ：</th>
  <td >${dto.oldValue}</td>
</tr>
<tr>
  <th> 新值 ：</th>
  <td >${dto.newValue}</td>
  <th> 原值描述 ：</th>
  <td >${dto.oldShowvalue}</td>
</tr>
<tr>
  <th> 新值描述 ：</th>
  <td >${dto.newShowvalue}</td>
  <th> 表主键ID ：</th>
  <td >${dto.fkBizId}</td>
</tr>
<tr>
  <th> 批次号/流程实 ：</th>
  <td >${dto.batNo}</td>
  <th> 变更是否生效（ ：</th>
  <td >${dto.state}</td>
</tr>
<tr>
  <th> 创建人 ：</th>
  <td >${dto.createBy}</td>
  <th> 创建时间 ：</th>
  <td >${dto.createTime}</td>
</tr>
<tr>
  <th> 数据有效性 ：</th>
  <td >${dto.valid}</td>
  <th> 备注 ：</th>
  <td colspan="2">${dto.remark}</td>
</tr>
  </table>

<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>