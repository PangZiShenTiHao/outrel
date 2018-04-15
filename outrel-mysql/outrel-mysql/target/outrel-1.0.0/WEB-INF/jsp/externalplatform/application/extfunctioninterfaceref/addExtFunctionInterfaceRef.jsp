<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>新增功能接口映射表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extfunctioninterfaceref.controller.ExtFunctionInterfaceRefController">
 <input type="hidden" class="text" id="dtoConfType" name="confType" notNull="false" maxLength="11" value="1" /><!-- 配置类型（1-接口分配规则集  2-调用点分配规则集） -->
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
	<td colspan="6" align="center" class="thTop">基本信息</td>
</tr>
<tr>
  <th> 系统名称：</th>
  <td>
    <select id="sysCode" name="sysCode" notNull="false">
      <c:forEach items="${plist}" var="sysTypeDTO">
         <option value="${sysTypeDTO.sysCode}"> ${sysTypeDTO.sysName}</option>
      </c:forEach>
    </select>
  </td>
  <th> 功能模块：</th>
  <td colspan="4" > 
     <select id="funcTypeCode" name="funcTypeCode" notNull="false">
     </select>
  </td>
</tr>

<tr>
	<td colspan="6" align="center" class="thTop">功能操作</td>
</tr>

<tr>
  <td style="text-align: right;" colspan="2">
  <p>选择功能点：</p> 
  <select multiple id="unSelectedFuncPoint" size="10"></select>
  <select id="unSelectedFuncPoints" style="display:none;"></select>
</td>

<td style="text-align: center;">
  <p><input type="button" class="text" onclick="addExportField('unSelectedFuncPoint','selectedFuncPoint','unSelectedFuncPoints','selectedFuncPoints')" value="添加" /></p>
  <p><input type="button" class="text inputTop" onclick="delExportField('unSelectedFuncPoint','selectedFuncPoint','unSelectedFuncPoints','selectedFuncPoints')" value="移除" /></p>
</td>
  
  <td> 
    <p> 已选功能点 ：</p>
	<select multiple id="selectedFuncPoint" name="selectedFuncPoint" size="10"></select>
	<select id="selectedFuncPoints" style="display:none;"></select>
  </td>
  
  <td colspan="2">
  	<p><input type="button" class="text" onclick="upMove('selectedFuncPoint','selectedFuncPoints')" value="上移" /></p>
  	<p><input type="button" class="text" onclick="downMove('selectedFuncPoint','selectedFuncPoints')" value="下移" /></p>
  </td>
</tr>

<tr>
  <td style="text-align: right;" colspan="2">
  <p>选择接口信息：</p> 
   <select multiple id="unSelectedInterfaceInfo" size="10">
      <c:forEach items="${ilist}" var="interfaceInfo">
         <option value="${interfaceInfo.interfaceNo}"> ${interfaceInfo.interfaceName}</option>
      </c:forEach>
   </select>
   <select id="unSelectedInterfaceInfos" style="display:none;"></select>
</td>

<td style="text-align: center;">
  <p><input type="button" class="text" onclick="addExportField('unSelectedInterfaceInfo','selectedInterfaceInfo','unSelectedInterfaceInfos','selectedInterfaceInfos')" value="添加" /></p>
  <p><input type="button" class="text inputTop" onclick="delExportField('unSelectedInterfaceInfo','selectedInterfaceInfo','unSelectedInterfaceInfos','selectedInterfaceInfos')" value="移除" /></p>
</td>
  <td> 
  <p> 已选接口信息 ：</p>
	<select multiple id="selectedInterfaceInfo" name="selectedInterfaceInfo" size="10"></select>
	<select id="selectedInterfaceInfos" style="display:none;"></select>
  </td>
  
  <td colspan="2">
  	<p><input type="button" class="text" onclick="upMove('selectedInterfaceInfo','selectedInterfaceInfos')" value="上移" /></p>
  	<p><input type="button" class="text" onclick="downMove('selectedInterfaceInfo','selectedInterfaceInfos')" value="下移" /></p>
  </td>
</tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>
</div>
</body>
<script type="text/javascript">
//根据"系统类型 "，级联"功能类型 "
function queryExtFuncTypeList(){	
	$("#sysCode").downLink({"linkObj":"funcTypeCode","type":"funAsync","linkFun":function(objValue,fun){
		var url= contextRootPath+"/extFunctionType/queryExtFunctionTypeList?sysCode="+objValue;
		jyAjax(url,"",function(msg){
			var datas=msg.data;
			if(datas!=null){
				for(var i=0;i<datas.length;i++){
					datas[i]["text"]=datas[i]["funcTypeName"];
					datas[i]["value"]=datas[i]["funcTypeCode"];
				}
				datas.unshift({"text":"---请选择---","value":""});
				fun(datas)
			}else{
				$("#funcTypeCode").html("");//清空 功能类型
			}
			$("#unSelectedFuncPoint").html("");//清空 选择功能点
			$("#selectedFuncPoint").html("");//清空 已选择功能点
			$("#selectedInterfaceInfo").html("");//清空 已选择接口信息
			//查询接口信息
			queryExtInterfaceInfoList("sysCode");
		}) 
	}});	
}
//根据"功能类型 "，级联"功能点类型 "
function queryExtFuncPointList(){	
	$("#funcTypeCode").downLink({"linkObj":"unSelectedFuncPoint","type":"funAsync","linkFun":function(objValue,fun){
	    if(!objValue){
	    	$("#unSelectedFuncPoint").html("");//清空 选择功能点
	    	$("#selectedFuncPoint").html("");//清空 已选择功能点
	    	$("#selectedInterfaceInfo").html("");//清空 已选择接口信息
	    	return;
		}
		var url= contextRootPath+"/extFunctionType/queryExtFunctionTypeList?funcTypeCode="+objValue;
		jyAjax(url,"",function(msg){
			var datas=msg.data;
			if(datas!=null){
				for(var i=0;i<datas.length;i++){
					datas[i]["text"]=datas[i]["funcTypeName"];
					datas[i]["value"]=datas[i]["funcTypeCode"];
				}
				fun(datas)
			}
			$("#selectedFuncPoint").html("");//清空 选择功能点
			$("#selectedInterfaceInfo").html("");//清空 已选择接口信息
			//查询接口信息
			queryExtInterfaceInfoList("funcTypeCode");
		}) 
	}});	
}

//查询接口信息
function  queryExtInterfaceInfoList(opt_id){
	var url= contextRootPath+"/extFunctionInterfaceRef/queryListExtInterfaceInfo";
	$("#"+opt_id).downLink({"linkObj":"unSelectedInterfaceInfo","type":"funAsync","linkFun":function(objValue,fun){
		jyAjax(url,"",function(msg){
			var datas=msg.data;
			if(datas!=null){
				for(var i=0;i<datas.length;i++){
					datas[i]["text"]=datas[i]["interfaceName"];
					datas[i]["value"]=datas[i]["interfaceNo"];
				}
				fun(datas)
			}
		});
	}});
}

</script>
<script type="text/javascript">
   $(document).ready(function(){
   	   checkedInit();
   	   queryExtFuncTypeList(); //根据"系统类型 "，级联"功能类型 "
       queryExtFuncPointList();//根据"功能类型 "，级联"功能点类型 "
	});
</script>
  
</html>
