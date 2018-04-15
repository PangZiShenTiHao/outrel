<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>新增菜单管理表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  	<script type="text/javascript">
  	
  	var addsysmenu = {};
  	
  	
	//校验用户名称唯一
	function checkMenuUnique( obj , string ){
		var params = string;
		if( $(obj).val()==null || $(obj).val()== "" ){
    		$(obj).addClass("checkError");
    		return;
		}
		jyAjax( 
				contextRootPath+"/sysMenu/checkUnique",
				params,
				function(msg){
					//新增成功后，
					var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		
		        	}else{
		        		//alert(v_status);
		        		$(obj).addClass("checkError");
					//	alert(msg.msg);
		        	}
		  	},
			function(msg){
		  		$("").newMsg({}).show(msg.msg);
				//alert(msg.msg);
        		$(obj).addClass("checkError");
        		//$(obj).attr("unique" , false);
		  	}  	
		);
	}
	
    var dialogResourceSelect = {}//此变量必须：弹出框的对象，关闭弹出框时需要调用
    
    var receiveData = function(datas){//此方法为 弹出框树形控件选择后的数据接收方法，固定必须
		$("#dtoresourceName").val(datas[0].NAME);//名称赋值
		$("#dtoresourceName").prev().val(datas[0].ID);//id赋值
    }
    
    addsysmenu.selectResource = function(){//弹出树形选择界面的方法 不做限制，只要能弹出选择框就行
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
	
  	</script> 
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 菜单编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtomenuCode" name="menuCode" notNull="true" maxLength="25" value=""  onblur="checkMenuUnique(this,'&menuCode='+$(this).val());"/>
  </td>
  <th> 菜单名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtomenuName" name="menuName" notNull="true" maxLength="50" value="" />
  <input type="hidden" class="text" id="dtoparentId" name="parentId" notNull="false" maxLength="25" value="${param.parentId }" />
  </td>
  </tr>
<!-- <tr>
  <th> 菜单图标 ：</th>
  <td > 
  <input type="text" class="text" id="dtomenuIcon" name="menuIcon" notNull="true" maxLength="50" value="" />
  </td>
  <th> 菜单URL ：</th>
  <td > 
  <input type="text" class="text" id="dtomenuUrl" name="menuUrl" notNull="true" maxLength="50" value="" style="width: 300px;" />
  </td>
</tr> 
<tr>
  <th> 系统ID，备用 ：</th>
  <td> 
  
  <input type="text" class="text" id="dtoappId" name="appId" notNull="false" maxLength="11" value="" />
  </td>
</tr>
-->
<tr>
  <th> 菜单图标 ：</th>
  <td > 
  <input type="text" class="text" id="dtomenuIcon" name="menuIcon" notNull="true" maxLength="50" value="" />
  </td>
  <th> 排序 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorderBy" name="orderBy" notNull="false" maxLength="25" value=""  onblur="validateOrderBy();"/>
  </td>
  </tr>
  <tr>
  <th>资源：</th>
  <td colspan="3"> 
  <input type="hidden" class="text" id="dtoresourceId" name="resourceId" value="" />
  <input type="text" class="text" id="dtoresourceName" name="resourceName"  onclick="addsysmenu.selectResource()" value="- - -点击选择- - -" />
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
   
   function validateOrderBy(){  
       var reg = new RegExp("^[0-9]*$");  
       var obj = document.getElementById("dtoorderBy");  
    if(!reg.test(obj.value)){  
    	obj.value='';
    	jyDialog({"type":"info"}).alert("排序字段请输入数字!");  
        return false;
    }  
  }  
</script>
  
</html>
