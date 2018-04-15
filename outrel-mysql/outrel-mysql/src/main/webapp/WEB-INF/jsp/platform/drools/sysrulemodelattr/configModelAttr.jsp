<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" >
 <input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />

<div >
	<table id="tab"  class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="0">
	        <tr>
	            <td style="width: 5px;">序号</td>
	            <td>输入</td>
	            <td>业务模型属性</td>
	            <td>运算符</td>
	            <td>输入</td>
	            <td>操作</td>
	       </tr>
	       <c:forEach items="${dto.attrConfigs}" var="attr" varStatus="status" >
	       
	       <tr id="${status.index+1}">
	            <td>
	            	<input type="text" size="1" name="attrConfigs[${status.index}].sequence" value="${attr.sequence}">
	            	<input type="hidden" name="attrConfigs[${status.index}].id" value="${attr.id}">
	            	<input type="hidden" name="attrConfigs[${status.index}].sysId" value="${attr.sysId}">
	            </td>
	            <td><input type="text" size="6" class="text" name="attrConfigs[${status.index}].preBrackets"  maxLength="50" value="${attr.preBrackets}" ></td>
	            <td>
	            	<input type="text"  class="text" readonly="readonly" onclick="selectModelAttr(this)" id="attrConfigs[${status.index}].conditionAttrCh"  name="attrConfigs[${status.index}].conditionAttrCh" notNull="false" maxLength="50" value="${attr.conditionAttrCh}" >
	            	<input type="hidden" id="attrConfigs[${status.index}].conditionAttrEn"  name="attrConfigs[${status.index}].conditionAttrEn" notNull="false" maxLength="50" value="${attr.conditionAttrEn}" >
	            </td>
	            <td>
	            	<select name="attrConfigs[${status.index}].operator" >
	            		<option value="" <c:if test="${attr.operator==''}">selected="selected"</c:if> >请选择</option>
	            		<option value="+" <c:if test="${attr.operator=='+'}">selected="selected"</c:if> >加</option>
	            		<option value="-" <c:if test="${attr.operator=='-'}">selected="selected"</c:if> >减</option>
	            		<option value="*" <c:if test="${attr.operator=='*'}">selected="selected"</c:if> >乘</option>
	            		<option value="/" <c:if test="${attr.operator=='/'}">selected="selected"</c:if> >除</option>
	            	</select>
	            </td>
	            <td><input type="text"  size="6" class="text" name="attrConfigs[${status.index}].afterBrackets" maxLength="50" value="${attr.afterBrackets}" ></td>
	            <td>
	            	<input type="hidden" name="attrConfigs[${status.index}].compilationResult" value="${attr.afterBrackets}" >
	            	<input type="hidden" name="attrConfigs[${status.index}].validateState" value="${attr.validateState}" >
	            	<a href="#" onclick="deltr(${status.index+1})">删除</a>
	            </td>
	       </tr>
	       </c:forEach>
	       
	    </table>
	    <table class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1">
	    	<tr><td style="text-align:right;width: 800px;"><input type="button" id="but" onclick="addRow()" value="增加一条"/></td></tr>
	    </table>
	    <center><input type="button" id="butSave" onclick="saveConfig()" value="保存"/></center>
</div>
<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>



