<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>修改菜单管理表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysMenu.controller.SysMenuController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
<table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 菜单编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtomenuCode" name="menuCode" notNull="false" maxLength="25" value="${dto.menuCode}" />
  </td>
  <th> 菜单名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtomenuName" name="menuName" notNull="false" maxLength="50" value="${dto.menuName}" />
  </td>
  </tr>
<!-- <tr>
  <th> 菜单图标 ：</th>
  <td > 
  <input type="text" class="text" id="dtomenuIcon" name="menuIcon" notNull="false" maxLength="50" value="${dto.menuIcon}" />
  </td>
  <th> 菜单URL ：</th>
  <td > 
  <input type="text" class="text" id="dtomenuUrl" name="menuUrl" notNull="false" maxLength="50" value="${dto.menuUrl}" />
  </td>
</tr> -->
<tr>
  <th> 系统ID，备用 ：</th>
  <td > 
  <input type="hidden" class="text" id="dtoparentId" name="parentId" notNull="false" maxLength="25" value="${dto.parentId}" />
  <input type="text" class="text" id="dtoappId" name="appId" notNull="false" maxLength="11" value="${dto.appId}" />
  </td>
  <th> 排序 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorderBy" name="orderBy" notNull="false" maxLength="25" value="${dto.orderBy}" />
  </td>
</tr>

<tr>
  <th> 菜单图标 ：</th>
  <td > 
  <input type="text" class="text" id="dtomenuIcon" name="menuIcon" notNull="false" maxLength="50" value="${dto.menuIcon}" />
  </td>
  <th>资源：</th>
  <td> 
  <input type="hidden" class="text" id="dtoresourceId" name="resourceId" value="${dto.resourceId }" />
  <input type="text" class="text" id="dtoresourceName" name="resourceName"  onclick="updateSysmenu.selectResource()" value="${resource.resoureName }" />
  </td>
</tr>

</table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
	var updateSysmenu = {};

    var dialogResourceSelect = {}//此变量必须：弹出框的对象，关闭弹出框时需要调用
    
    var receiveData = function(datas){//此方法为 弹出框树形控件选择后的数据接收方法，固定必须
		$("#dtoresourceName").val(datas[0].NAME);//名称赋值
		$("#dtoresourceName").prev().val(datas[0].ID);//id赋值
    }
    
    updateSysmenu.selectResource = function(){ //弹出树形选择界面的方法 不做限制，只要能弹出选择框就行
			var dialogStruct={
					'display':contextRootPath+'/component/system/treeSysResourceSelect.jsp',
					'width':600,
					'height':400,
					'title':'选择资源',
					'isIframe':'false',
					'buttons':[]
				};
				dialogResourceSelect =jyDialog(dialogStruct);
				dialogResourceSelect.open();
	}

   $(document).ready(function(){
   	checkedInit();
	});
</script>
  
</html>
