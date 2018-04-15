<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <script src="${basePath}js/threeJs/validate/jquery.validate.min.js"></script>
   <script src="${basePath}js/threeJs/validate/messages_zh.min.js"></script>
   <script src="${basePath}js/threeJs/validate/jquery.validate.extend.handler.js"></script>
   <link rel="stylesheet" href="${basePath}js/threeJs/validate/validate.css">
   <title>新增系统用户表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style type="text/css">
   	.emcls{color:red}
   </style>
   <script type="text/javascript">
   	//新增兼职机构
	function addPartTimeOrg(){
		var partTimeOrgTemplate = $("#partTimeOrgTemplate").clone();
		var orgAndPositionlast = $("tr[name=orgAndPosition]").last();
		
		var index = $("tr[name=orgAndPosition]").length+1;
		partTimeOrgTemplate.attr("name","orgAndPosition");
		
		var partTimeOrgName = partTimeOrgTemplate.find("input[id='partTimeOrgName']");
		partTimeOrgName.attr("id","partTimeOrgName"+index);
		partTimeOrgName.attr("name","partTimeOrgName"+index);
		
		var partTimeOrgId = partTimeOrgTemplate.find("input[id='partTimeOrgId']");
		partTimeOrgId.attr("id","partTimeOrgId"+index);
		partTimeOrgId.attr("name","partTimeOrgId"+index);
		
		var partTimePositionId = partTimeOrgTemplate.find("input[id='partTimePositionId']");
		partTimePositionId.attr("id","partTimePositionId"+index);
		partTimePositionId.attr("name","partTimePositionId"+index);
		var partTimePositionName = partTimeOrgTemplate.find("input[id='partTimePositionName']");
		partTimePositionName.attr("id","partTimePositionName"+index);
		partTimePositionName.attr("name","partTimePositionName"+index);

		orgAndPositionlast.after( partTimeOrgTemplate );
		partTimeOrgTemplate.show();
	}
	//删除兼职岗位
	function delPartTimeOrg(obj){
		$(obj).parent().parent().remove();
	}
	//选择机构
	var dialogOrgSelect = {}
	function selectOrg(obj){
		//取到元素id
		var fillElementId = $(obj).attr("id"); 
		var dialogStruct={
				'display':contextRootPath+'/sysOrg/prepareExecute/toSelectPage?fillElementId='+fillElementId,
				//'display':contextRootPath+'/component/system/treeSysOrgSelect.jsp?fillElementId='+fillElementId+'&orgId=1&check=true',
				'width':500,
				'height':500,
				'title':'选择机构',
				'isIframe':'false',
				'buttons':[]
			};
			dialogOrgSelect =jyDialog(dialogStruct);
			dialogOrgSelect.open();
	}
	//选择岗位
	var dialogPositionSelect = {};
	function selectPosition(obj){
		//取到元素id
		var fillElementId = $(obj).attr("id"); 
		var dialogStruct={
				'display':contextRootPath+'/sysPosition/prepareExecute/toSelectPage?fillElementId='+fillElementId,
				'width':630,
				'height':630,
				'isIframe':'false',
				'title':'选择岗位',
				'buttons':[]
			};
			dialogPositionSelect =jyDialog(dialogStruct);
			dialogPositionSelect.open();
	}
	
	//新增页面的保存操作
	function doAddFrom(){
		//校验必填项
		/* if (!checkFormFormat("addNewsFormData")) {
			alert("请正确填写！");
			return;
		} */
		
		if(!checkform("#addNewsFormData").form()) return; 
		
		//序列化 新增页面的form表单数据
		var params=$("#addNewsFormData").serialize();
		var partOrgAndPosistionNum =  $("tr[name=orgAndPosition]").length;
		params += "&partOrgAndPosistionNum="+partOrgAndPosistionNum;
		var url=contextRootPath+'/sysUser/insertSysUser';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				$("").newMsg({}).show(msg.msg);;
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		//queryData();
	        		loadUserList($('#orgId').val());
	        	}
	  	});
	}
	</script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 姓名<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtouserName" name="userName" notNull="true" maxLength="25" value="" />
  </td>
  <th> 编码<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtouserNo" name="userNo" notNull="true" maxLength="25" value="" />
  </td>
  </tr>
<tr>
  <th> 登录名<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtologinName" name="loginName" notNull="true" maxLength="25" value="" />
  </td>
  <th> 登录密码<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtopassword" name="password" notNull="true" maxLength="25" value="" />
  </td>
</tr>

<tr style="display: none;" id="partTimeOrgTemplate">
  <th> 兼职机构 ：</th>
  <td > 
  <input type="hidden" class="text" id="partTimeOrgId" name="partTimeOrgId"/>
  <input type="text" class="text" id="partTimeOrgName" name="partTimeOrgName" maxLength="25" readonly="readonly" value="- - -点击选择- - -" onclick="selectOrg(this);"/>
  </td>
  <th> 兼职岗位 ：</th>
  <td > 
  <input type="hidden" class="text" id="partTimePositionId" name="partTimePositionId"/>
  <input type="text" class="text" id="partTimePositionName" name="partTimePositionName" maxLength="25" readonly="readonly" value="- - -点击选择- - -" onclick="selectPosition(this);" />
  &nbsp;<button type="button" onclick="delPartTimeOrg(this);">删除兼职机构</button>
  </td>
</tr>

<tr name="orgAndPosition" id="mainOrgAndPosition">
  <th> 主机构<em class="emcls">*</em> ：</th>
  <td>
  <input type="hidden" class="text" id="mainOrgId" name="mainOrgId"/>
  <input type="text" class="text" id="mainOrgName" name="mainOrgName" notNull="true" maxLength="25" value="- - -点击选择- - -" onclick="selectOrg(this);"/>
  </td>
  <th> 任职岗位<em class="emcls">*</em> ：</th>
  <td > 
  <input type="hidden" class="text" id="positionId" name="positionId"/>
  <input type="text" class="text" id="positionName" name="positionName" notNull="true" maxLength="25" value="- - -点击选择- - -" onclick="selectPosition(this);"/>
  &nbsp;<button type="button" onclick="addPartTimeOrg();">添加兼职机构</button>
  </td>
</tr>

<tr>
<!--   <th> 盐值 ：</th>
  <td > 
  <input type="text" class="text" id="dtosalt" name="salt" notNull="false" maxLength="25" value="" />
  </td> -->
  <th> 手机 ：</th>
  <td > 
  <input type="text" class="text" id="dtomobile" name="mobile" checktype="mobilePhone" notNull="false" maxLength="25" value="" />
  </td>
  <th> 邮件 ：</th>
  <td > 
  <input type="text" class="text" id="dtoemail" name="email" checktype="email" notNull="false" maxLength="25" value="" />
  </td>
</tr>
<!-- <tr>
  <th> 用户头像 ：</th>
  <td > 
  <input type="text" class="text" id="dtouserImage" name="userImage" notNull="false" maxLength="50" value="" />
  </td>
  </tr>
<tr> -->
  <th> 性别 ：</th>
  <td > 
	  <select id="dtosex" name="sex">
	  	<option value="1">男</option>
	    <option value="0">女</option>
	  </select>
  </td>
  <th> 出生日期 ：</th>
  <td > 
  <input type="text" class="text" onClick="WdatePicker()"  id="dtobirthday" name="birthday" notNull="false" maxLength="25" value="" />
  </td>
</tr>
<tr>
  <th> 民族 ：</th>
  <td > 
   <syscode:dictionary name="nationality"  id="dtonationality" codeType="NATION" type="select" ></syscode:dictionary>
  </td>
  <th> 学历 ：</th>
  <td > 
  	<!-- <input type="text" class="text" id="dtoeducation" name="education" notNull="false" maxLength="25" value="" /> -->
  	<syscode:dictionary name="education"  id="dtoeducation" codeType="EDUCATION" type="select"></syscode:dictionary>
  </td>
</tr>
<tr>
  <th> 职务 ：</th>
  <td > 
  	<!-- <input type="text" class="text" id="dtojob" name="job" notNull="false" maxLength="50" value="" /> -->
  	<syscode:dictionary name="job"  id="dtojob" codeType="PT_USERJOB" type="select" ></syscode:dictionary>
  </td>
  <th> 家庭住址 ：</th>
  <td > 
  <input type="text" class="text" id="dtohomeAddress" name="homeAddress" notNull="false" maxLength="50" value="" />
  </td>
  </tr>
<tr>
  <th> 家庭邮编 ：</th>
  <td > 
  <input type="text" class="text" id="dtohomeZipcode" name="homeZipcode" notNull="false" maxLength="25" value="" />
  </td>
  <th> 家庭电话 ：</th>
  <td > 
  <input type="text" class="text" id="dtohomeTel" name="homeTel" notNull="false" maxLength="25" value="" />
  </td>
</tr>
<tr>
  <th> 办公电话 ：</th>
  <td > 
  <input type="text" class="text" id="dtoofficeTel" name="officeTel" notNull="false" maxLength="25" value="" />
  </td>
  <th> 办公地址 ：</th>
  <td > 
  <input type="text" class="text" id="dtoofficeAddress" name="officeAddress" notNull="false" maxLength="50" value="" />
  </td>
</tr>
<tr>
  <th> 排序 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorderBy" name="orderBy" notNull="false" maxLength="25" value="" />
  </td>
  <th> 是否锁定 ：</th>
  <td > 
<!--   <input type="text" class="text" id="dtoisLocked" name="isLocked" notNull="false" maxLength="1" value="" />
 -->  
<!--   <select id="dtoisLocked" name="isLocked">
  	<option value="0">未锁定</option>
    <option value="1">锁定</option>
  </select> -->
  <syscode:dictionary id="dtoisLocked" name="isLocked" codeType="YESNO" type="select"/>
  
  
  </td>
 </tr>
<tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
	<div class="ui-dialog-buttonset" style="text-align:center">
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" style="margin:20px auto" type="button" onclick="doAddFrom();">
			<span class="ui-button-text">保存</span>
		</button>
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" style="margin:20px auto" type="button" onclick="loadUserList($('#orgId').val());">
			<span class="ui-button-text">返回</span>
		</button>
	</div>
</div>


</body>

<script type="text/javascript">
   $(document).ready(function(){
	   checkform("#addNewsFormData");//校验
	});
</script>
  
</html>
