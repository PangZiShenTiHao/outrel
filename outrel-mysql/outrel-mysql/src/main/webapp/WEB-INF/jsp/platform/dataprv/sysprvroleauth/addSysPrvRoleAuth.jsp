<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/sysuser" prefix="user"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增数据权限角色授权表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script type="text/javascript">
	   function queryInfo(){
			var userId = $('#userIds').val();
			var roleId = $('#roleIds').val();
			if(userId){
				if(roleId){
			$.ajax({
		        type:"POST",
		        url:contextRootPath+"/sysPrvRoleAuth/queryRoleAuthByUser?userId="+userId+"&roleId="+roleId,
		        success:function(data){
		        	data = eval('('+data+')');
		        	if(data.data>0){
		        		$("").newMsg({}).show("选择的授权已经存在！");
		        		//alert("选择的授权已经存在！");
		        	}else{
		        		$("#addForm")[0].submit();
		        	}
		        }
		    });
			}
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
			   $("#userIds").val(ids);
			 	$("#userNames").val(names);
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
	  
   </script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form isCheck="true" id='addForm' action="${basePath}sysPrvRoleAuth/insertSysPrvRoleAuth" method="post">
 <table class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 用户：</th>
  <td >
       <c:choose>  
      <c:when test="${userId1>0 }">
      	  	<input class='text' id='userNames' name='userNames' value="<user:search userId='${userId1 }'/>" readonly/>
		  	<input type="hidden" class="text" id="userIds" name="userIds" value="${userId1 }" readonly/>
      </c:when>  
      <c:otherwise>
      	<input class='text' id='userNames' name='userNames' value=''  onclick="selectUser();"/>
       	<input type="hidden" id="userIds" name="userIds" value="" />
      </c:otherwise>  
    </c:choose> 
  </td>
  <th> 角色：</th>
  <td > 
      <c:choose>
      <c:when test="${roleId>0 }">
       	<input type="text" class="text" id="roleNames" name="roleNames" readonly value="${param.roleName }" />
       	<input type="hidden" class="text" id="roleIds" name="roleIds" readonly value="${roleId }" />
      </c:when>  
      <c:otherwise>
      	<select id="roleIds" name="roleIds" >
      		<c:forEach items="${roles}" var="item">
      			<option value='${item.id}'>${item.roleName} </option>
      		</c:forEach>
      	</select> 
     <!--   	<input type="text" class="text" id="dtoroleId" name="roleId"  maxLength="11" value="" onblur="queryRoleAuthByUser();"/> -->
      </c:otherwise>
    </c:choose>  
  </td>
</tr>
      <c:choose>  
      <c:when test="${userId1>0 }">  
		  <input type="hidden" id="type" name="type" value="0"/>
      </c:when>  
      <c:otherwise>  
       	<input type="hidden"  id="type" name="type" value="1"/>
      </c:otherwise>  
    </c:choose> 
<tr><td colspan=4 align="center">
   <input type='button' value='保存' onclick='queryInfo();'/>
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
