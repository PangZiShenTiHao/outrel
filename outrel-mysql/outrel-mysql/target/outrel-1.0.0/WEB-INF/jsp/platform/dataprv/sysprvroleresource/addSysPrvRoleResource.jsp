<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增数据角色资源表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
//唯一性验证
function queryRoleResourceByResource(){
var resourceId = $("#resourceIds").val();
var roleId = $("#roleId").val();
if(resourceId){
	var type = $("#resourceType").val();
	$.ajax({
        type:"POST",
        url:contextRootPath+"/sysPrvRoleResource/queryRoleResourceByResource?resourceIds="+resourceId+"&roleId="+roleId+"&resourceType="+type,
        success:function(msg){
        	var msg1=eval("(" + msg + ")");
        	if(msg1.data=='0'){
        		$("#addForm")[0].submit();
        	}else{
        		$("").newMsg({}).show("该资源已经存在！");
        		//alert("该资源已经存在！");
        		return        		;
        	}
        }
    });
}
}
var dialogUserSelect;//此变量为弹出框确定以及关闭的关键变量，固定必须

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
	   $("#resourceIds").val(ids);
	   $("#resourceNames").val(names);
	 //  $("#orgName").val(names);
}
var receiveData = function(datas){//此方法为 弹出框树形控件选择后的数据接收方法，固定必须
	   var ids="",names="";
	   for(var o in datas){
		   if(ids){
			   	ids = ids+","+datas[o].ID;
		   		names = names+","+datas[o].NAME;
		   }else{
			   	ids = datas[o].ID;
		   		names =datas[o].NAME;
		   }
	      }  
	   $("#resourceIds").val(ids);
	   $("#resourceNames").val(names);
	//datas 当弹出的页面中发生确定数据选择时，返回此数据,此处可自定义数据的处理
	//datas 数据的格式为json对象数组 [{ID:’’,NAME:’’},{ID:’’,NAME:’’},......]
}

function selectOrg(){
   	var dialogStruct={
   			'display':contextRootPath+'/component/system/treeSysOrgSelect.jsp?check=true&orgId=1',
   			'width':400,
   			'height':500,
   			'title':'选择机构',
   			'buttons':[],
   			'isIframe':'false'
   		};
   		dialogOrgSelect =jyDialog(dialogStruct);
   		dialogOrgSelect.open();
   }
function selectUser(){
	//取到元素id
	var dialogStruct={
			'display':contextRootPath+'/component/system/sysUserSelect.jsp?check=true',
			'width':900,
			'height':800,
			'title':'选择用户',
			'buttons':[],
			'isIframe':'false'
		};
	dialogUserSelect =jyDialog(dialogStruct);
	dialogUserSelect.open();
}  
	function openResource(){
		var rType = $('#resourceType').val();
		if(rType=='user'){
			selectUser();
		}else{
			selectOrg();
		}
		
	}

</script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id='addForm' isCheck="true" action="${basePath}sysPrvRoleResource/insertSysPrvRoleResource" method="post">
 <table class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 角色：</th>
  <td >
  <input type='text' class='text' id='roleName' name='roleName' value='${roleName }' readonly/>
  <input type="hidden" class="text" id="roleId" name="roleId" readonly value="${roleId }" />
  </td>
  <th> 资源 ：</th>
  <td > 
  <input type="text" class="text" id="resourceNames" name="resourceNames" value="" onclick='openResource();'/>
  <input type="hidden"  id="resourceIds" name="resourceIds" value=""/>
  </td>
 </tr>
 <tr>
  <th> 资源类型 ：</th>
  <td >
  <select id="resourceType" name="resourceType">
  		<option value='user'>用户</option>
  		<option value='org'>组织机构</option>
  </select>
  </td>
  <td></td><td></td>
</tr>
<tr><td colspan=4 align="center">
   <input type='button' value='保存' onclick='queryRoleResourceByResource();'/>
  <input type='button' value='取消' onclick="window.history.back();"/> 
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
</script>
  
</html>
