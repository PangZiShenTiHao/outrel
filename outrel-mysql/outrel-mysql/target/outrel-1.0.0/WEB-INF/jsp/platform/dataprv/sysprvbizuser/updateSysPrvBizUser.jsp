<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>修改业务数据用户权限表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.dataprv.sysprvbizuser.controller.SysPrvBizUserController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th>离职用户 ：</th>
  <td > 
  <!-- <input type="text" class="text" id="fromUserId" name="fromUserId" notNull="false" maxLength="11" value="" /> -->
  <input class="text" id="fromUserName" name="fromUserName" value="" onclick='selectUser();'/>
  <input type="hidden" id="fromUserId" name="fromUserId" value="" />
  </td>
</tr>
<tr>
  <th>接管用户 ：</th>
  <td > 
  <!-- <input type="text" class="text" id="toUserId" name="toUserId" notNull="false" maxLength="11" value="" /> -->
  <input class="text" id="toUserName" name="toUserName" value="" onclick='selectToUser();'/>
  <input type="hidden" id="toUserId" name="toUserId" value="" />
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
	var isActive=true;
	function selectUser(){
		isActive=true;
		//取到元素id
		var dialogStruct={
				'display':contextRootPath+'/component/system/sysUserSelect.jsp',
				'width':900,
				'height':800,
				'title':'选择用户',
				'buttons':[],
				'isIframe':'false'
			};
		dialogUserSelect =jyDialog(dialogStruct);
		dialogUserSelect.open();
	}
	
	var receiveUserData = function(datas){//此方法为 弹出框控件选择后的数据接收方法，固定必须
		 var ids="",names="";
		   for(var o in datas){
			   if(ids){
				   	ids = ids+","+datas[o].id;
			   		names = names+","+datas[o].userName;
			   }else{
				   	ids = datas[o].id;
			   		names =datas[o].userName;
			   }
		      }
		      if(isActive){
		      	$("#fromUserId").val(ids);
		 		$("#fromUserName").val(names);
		      }else{
		      	$("#toUserId").val(ids);
		 		$("#toUserName").val(names);
		      }
	}
	
	function selectToUser(){
		isActive=false;
		//取到元素id
		var dialogStruct={
				'display':contextRootPath+'/component/system/sysUserSelect.jsp',
				'width':900,
				'height':800,
				'title':'选择用户',
				'buttons':[],
				'isIframe':'false'
			};
		dialogUserSelect =jyDialog(dialogStruct);
		dialogUserSelect.open();
	}
	
</script>
  
</html>
