<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript2.jsp" %>
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysasynjob.controller.SysAsynJobController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 业务实体：</th>
  <td >${dto.beanId}</td>
  <th> 业务主键ID ：</th>
  <td >${dto.bizKeyId}</td>
</tr>
<tr>
  <th> 任务状态 ：</th>
  <td ><c:if test="${1 eq dto.jobState }" >待调用</c:if><c:if test="${0 eq dto.jobState }" >待调用</c:if></td>
   <th> 是否有效：</th>
  <td ><syscode:dictionary codeType="YESNO" type="text" defaultValue="${dto.valid}" ></syscode:dictionary></td>
</tr>
<tr>
  <th> 执行开始时间 ：</th>
  <td >${dto.startTime}</td>
  <th> 执行结束时间 ：</th>
  <td >${dto.endTime}</td>
</tr>

<tr>
  <th> 重复执行次数 ：</th>
  <td >${dto.runCun}</td>
  <th> 创建时间 ：</th>
  <td >${dto.createTime}</td>
</tr>
<tr>
  <th> 执行中 ：</th>
  <td colspan="3"><syscode:dictionary codeType="YESNO" type="text" defaultValue="${dto.jobRun}" ></syscode:dictionary></td>
</tr>
<tr>
  <th> 任务异常描述 ：</th>
  <td colspan="3">${dto.errorRemark}</td>
</tr>

<tr>
  <th> 备注 ：</th>
  <td colspan="3">${dto.remark}</td>
</tr>
  </table>

<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>