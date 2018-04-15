<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/sysuser" prefix="user"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增组织授权表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script type="text/javascript">
   var dialogOrgSelect;//此变量必须：弹出框的对象，关闭弹出框时需要调用

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
	   $("#orgIds").val(ids);
	   $("#orgName").val(names);
   	//datas 当弹出的页面中发生确定数据选择时，返回此数据,此处可自定义数据的处理
   	//datas 数据的格式为json对象数组 [{ID:’’,NAME:’’},{ID:’’,NAME:’’},......]
   }
 //弹出树形选择界面的方法 不做限制，只要能弹出选择框就行
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
 
 //唯一性验证
 function queryInfo(){
	 var orgIds = $("#orgIds").val();
	 var userId = $("#userId").val();
	 if(orgIds){
		 $.ajax({
		        type:"POST",
		        url:contextRootPath+"/sysPrvOrgAuth/queryInfoByUserAndOrg?userId="+userId+"&orgIds="+orgIds,
		        success:function(data){
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
   </script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form isCheck="true" id='addForm' action="${basePath}sysPrvOrgAuth/insertSysPrvOrgAuth" method="post">
 <table class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 用户：</th>
  <td >
  <input class="text" id="userName" name="userName" value="<user:search userId='${param.userId1 }'/>" readonly/>
  <input type="hidden" id="userId" name="userId" value="${param.userId1 }" />
  </td>
  <th>组织机构：</th>
  <td > 
  		<input type="text" class="text" id="orgName" notNull="false" value="" onclick="selectOrg();" />
  		<input type="hidden"id="orgIds" name="orgIds" notNull="false" maxLength="31" value=""/>
  </td>
</tr>
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
