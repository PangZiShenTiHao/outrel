<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <script src="${basePath}js/threeJs/validate/jquery.validate.min.js"></script>
   <script src="${basePath}js/threeJs/validate/messages_zh.min.js"></script>
   <script src="${basePath}js/threeJs/validate/jquery.validate.extend.handler.js"></script>
   <link rel="stylesheet" href="${basePath}js/threeJs/validate/validate.css">
   <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
   <title>修改系统用户表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style type="text/css">
   	.emcls{color:red}
   </style>
   <script type="text/javascript">
   	//新增兼职机构
	function addPartTimeOrg(){
		var partTimeOrgTemplate = $("#partTimeOrgTemplate").clone();
		var orgAndPositionlast = $("tr[name=orgAndPosition]").last();
		
		var index = $("tr[name=orgAndPosition]").length;
		for(var i = 1;i<=index;i++){
			if(!document.getElementById("partTimeOrgId"+i)){
				index = i;
				break;
			}
		}
		partTimeOrgTemplate.attr("name","orgAndPosition");
		
		var partTimeOrgName = partTimeOrgTemplate.find("input[id='partTimeOrgName']");
		partTimeOrgName.attr("id","partTimeOrgName"+index);
		partTimeOrgName.attr("name","partTimeOrgName");
		
		var partTimeOrgId = partTimeOrgTemplate.find("input[id='partTimeOrgId']");
		partTimeOrgId.attr("id","partTimeOrgId"+index);
		partTimeOrgId.attr("name","partOrgId");
		
		var partTimePositionId = partTimeOrgTemplate.find("input[id='partTimePositionId']");
		partTimePositionId.attr("id","partTimePositionId"+index);
		partTimePositionId.attr("name","partPositionId");
		var partTimePositionName = partTimeOrgTemplate.find("input[id='partTimePositionName']");
		partTimePositionName.attr("id","partTimePositionName"+index);
		partTimePositionName.attr("name","partTimePositionName");

        var sysOrgUserIds = partTimeOrgTemplate.find("input[id='sysOrgUserIds']");
		sysOrgUserIds.attr("id","sysOrgUserIds"+index);
		sysOrgUserIds.attr("name","orgUserId");
		
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
				'width':800,
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
		var orgCode;
		var fillElementId = $(obj).attr("id"); 
		if(fillElementId=="positionName"){
			orgCode = $("#mainOrgId").val();
		}else{
			var index = fillElementId.substring("partTimePositionName".length,fillElementId.length);
			orgCode = $("#partTimeOrgId" + index).val();
		}
		/*if(orgCode==''){
			jyDialog({"type":"warn"}).alert("请先选择主机构或兼职机构!");
			return; 
		}*/
		var dialogStruct={
				'display':contextRootPath+'/sysPosition/prepareExecute/toSelectPositionPage?fillElementId='+fillElementId+'&orgCode='+orgCode,
				'width':630,
				'height':630,
				'title':'选择岗位',
				'isIframe':'false',
				'buttons':[]
			};
			dialogPositionSelect =jyDialog(dialogStruct);
			dialogPositionSelect.open();
	}
	
	//修改页面 的 保存操作
	function doUpdateFrom(){
		//序列化 新增页面的form表单数据
		if(!checkform("#updateNewsFormData").form()) return; 
		var reg = new RegExp("^[0-9]+(.[0-9]{1})?$"); 
		var annualLeave = document.getElementById("dtoannualLeave");
		if(!annualLeave.value==''||!annualLeave.value==null){
			if(!reg.test(annualLeave.value)){  
		        jyDialog({"type":"warn"}).alert("标准年假项，请输入最多保留小数点后一位正数数字!"); 
		        annualLeave.focus(); 
		        return false;
		    }  
		}
		var params=$("#updateNewsFormData").serialize();
		var flag=0;
		var partTimeOrgIds = document.getElementsByName("partOrgId");
		var partTimePositionIds = document.getElementsByName("partPositionId");
		var positionId = $("#positionId").val();
		for(var i=0;i<partTimeOrgIds.length;i++){
		    if(partTimeOrgIds[i].value==''  ){
		        flag=1;
		        break;
		   	}
		    if(partTimePositionIds[i].value==''){
	        	flag=4;
	        	break;
	        }
		   	if(partTimePositionIds[i].value==positionId){
	        	flag=2;
	        	break;
	        }
	        if(i+1!=partTimePositionIds.length){
				if(partTimePositionIds[i].value==partTimePositionIds[i+1].value){
					flag=3;
		        	break;
				}
			}
		}
		if(flag==1){
			jyDialog({"type":"warn"}).alert("请正确填写兼职机构!");
		}else if(flag==4){
			jyDialog({"type":"warn"}).alert("请正确填写兼职岗位!");
		}else if(flag==2){
			jyDialog({"type":"warn"}).alert("兼职岗位不能与任职岗位相同!");
		}else if(flag==3){
			jyDialog({"type":"warn"}).alert("兼职岗位不能相同!");
		}else{
			var url=contextRootPath+'/sysUser/updateSysUser';
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({}).show(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
		        		//queryData();
		        		
		        		loadUserList($('#orgId').val());
		        	}
		  	});
	  	}
	}
	//校验用户名称唯一
	function checkUnique( obj  ){
	    // 调用只能输入数字
	    isNumber(obj);
		var params = 'tableName=sys_user&uniqueColumn=user_no&checkValue='+$(obj).val()+'&nocheckId='+$("#dtoid").val();
		if( $(obj).val()==null || $(obj).val()== "" ){
   		$(obj).addClass("checkError");
   		return;
		}
		jyAjax( 
				contextRootPath+"/common/checkUnique",
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
       			$(obj).addClass("checkError");
       			$(obj).focus();
		  	}  	
		);
	}
	function isNumber(obj){
		var value = obj.value;
	    //验证数字
		var r = /^[0-9]*[1-9][0-9]*$/;
		 if(!r.test(value)){
		    jyDialog({"type":"warn"}).alert("只允许输入数字！");
		 	$("#"+obj.id).val('');
			//$("#"+obj.id).focus();
			return false;
		 }
	}
	
	//变更密码选择
	function changePwd(){
		if(document.getElementById("checkpwd").checked){
		    document.getElementById("dtopassword").readOnly=false;
		    $("#dtoisChange").val("1");
		    $("#dtopassword").focus();
		}else{
		 	document.getElementById("dtopassword").readOnly=true;
		 	$("#dtoisChange").val("0");
		}
	}
	</script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form:form modelAttribute="dto" id="updateNewsFormData" name="updateNewsFormData" isCheck="true" >
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
<input type="hidden" class="text" id="dtoisChange" name="isChange" value="0" notNull="false"/>
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 姓名<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtouserName" name="userName" notNull="false" maxLength="25" value="${dto.userName}" />
  </td>
  <th> 编码<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtouserNo" name="userNo" notNull="false" maxLength="25" value="${dto.userNo}" onblur="checkUnique(this);" readOnly="true"/>
  </td>
  </tr>
<tr>
  <th> 登录名<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtologinName" name="loginName" notNull="false" maxLength="25" value="${dto.loginName}" />
  </td>
  <th> 登录密码<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtopassword" name="password" notNull="false" maxLength="25" value="${dto.password}"/>
  <input type="checkbox" id="checkpwd" name="checkpwd" onclick="changePwd()"/><lable>修改密码</lable>
  </td>
</tr>

<!-- <tr style="display: none;" id="partTimeOrgTemplate">
  <th> 兼职机构 ：</th>
  <td > 
  <input type="hidden" class="text" id="sysOrgUserIds" name="sysOrgUserIds"/>
  <input type="hidden" class="text" id="partTimeOrgId" name="partTimeOrgId"/>
  <input type="text" class="text" id="partTimeOrgName" name="partTimeOrgName" maxLength="25" readonly="readonly" value="- - -点击选择- - -" onclick="selectOrg(this);"/>
  </td>
  <th> 兼职岗位 ：</th>
  <td > 
  <input type="hidden" class="text" id="partTimePositionId" name="partTimePositionId"/>
  <input type="text" class="text" id="partTimePositionName" name="partTimePositionName" maxLength="25" readonly="readonly" value="- - -点击选择- - -" onclick="selectPosition(this);" />
  &nbsp;<button type="button" onclick="delPartTimeOrg(this);">删除兼职机构</button>
  </td>
</tr> -->

<tr style="display: none;" id="partTimeOrgTemplate">
  <th> 兼职机构 ：</th>
  <td > 
  <input type="hidden" class="text" id="sysOrgUserIds" name="sysOrgUserIds"/>
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
<c:choose>
    <c:when test="${dto.sysOrgUserDTOs!=null }"><%-- && dto.sysOrgUserDTOs.size()>0--%>
	    <c:forEach var="sysOrgUserDto" items="${dto.sysOrgUserDTOs}" varStatus="idx">
		<c:choose>
			<c:when test="${sysOrgUserDto.isMainOrg eq '1' }">
				<tr name="orgAndPosition" id="mainOrgAndPosition">
				  <th> 主机构 <em class="emcls">*</em>：</th>
				  <td>
				  <input type="hidden" class="text" id="sysOrgUserId" name="sysOrgUserId" value="${sysOrgUserDto.id}"/>
				  <input type="hidden" class="text" id="mainOrgId" name="mainOrgId" value="${sysOrgUserDto.orgId}"/>
				  <input type="text" class="text" id="mainOrgName" name="mainOrgName" notNull="true" maxLength="25" value="${sysOrgUserDto.orgName }" onclick="selectOrg(this);"/>
				  </td>
				  <th> 任职岗位<em class="emcls">*</em> ：</th>
				  <td > 
				  <input type="hidden" class="text" id="positionId" name="positionId" value="${sysOrgUserDto.positionId}"/>
				  <input type="text" class="text" id="positionName" name="positionName" notNull="true" maxLength="25" value="${sysOrgUserDto.positionName}" onclick="selectPosition(this);"/>
				  &nbsp;<button type="button" onclick="addPartTimeOrg();">添加兼职机构</button>
				  </td>
				</tr>
			</c:when>
			<c:otherwise>
				<tr name="orgAndPosition">
				  <th> 兼职机构 ：</th>
				  <td > 
				  <input type="hidden" class="text" id="sysOrgUserId${idx.index}" name="orgUserId" value="${sysOrgUserDto.id}"/>
				  <input type="hidden" class="text" id="partTimeOrgId${idx.index}" name="partOrgId" value="${sysOrgUserDto.orgId}"/>
				  <input type="text" class="text" id="partTimeOrgName${idx.index}" name="partTimeOrgName" maxLength="25" readonly="readonly" value="${sysOrgUserDto.orgName }" onclick="selectOrg(this);"/>
				  </td>
				  <th> 兼职岗位 ：</th>
				  <td > 
				  <input type="hidden" class="text" id="partTimePositionId${idx.index}" name="partPositionId" value="${sysOrgUserDto.positionId}"/>
				  <input type="text" class="text" id="partTimePositionName${idx.index}" name="partTimePositionName" maxLength="25" readonly="readonly" value="${sysOrgUserDto.positionName}" onclick="selectPosition(this);" />
				  &nbsp;<button type="button" onclick="delPartTimeOrg(this);">删除兼职机构</button>
				  </td>
				</tr>
			</c:otherwise>
		</c:choose>
	</c:forEach>
    </c:when>
    <c:otherwise>
          <tr name="orgAndPosition" id="mainOrgAndPosition">
			  <th> 主机构 <em class="emcls">*</em>：</th>
			  <td>
			  <input type="hidden" class="text" id="sysOrgUserId" name="sysOrgUserId" />
			  <input type="hidden" class="text" id="mainOrgId" name="mainOrgId" />
			  <input type="text" class="text" id="mainOrgName" name="mainOrgName" notNull="true" maxLength="25" onclick="selectOrg(this);"/>
			  </td>
			  <th> 任职岗位<em class="emcls">*</em> ：</th>
			  <td > 
			  <input type="hidden" class="text" id="positionId" name="positionId" />
			  <input type="text" class="text" id="positionName" name="positionName" notNull="true" maxLength="25" onclick="selectPosition(this);"/>
			  &nbsp;<button type="button" onclick="addPartTimeOrg();">添加兼职机构</button>
			  </td>
		</tr>
    </c:otherwise>
</c:choose>




<tr>
  <%-- <th> 盐值 ：</th>
  <td > 
  <input type="text" class="text" id="dtosalt" name="salt" notNull="false" maxLength="25" value="${dto.salt}" />
  </td> --%>
  <th> 手机 ：</th>
  <td > 
  <input type="text" class="text" id="dtomobile" name="mobile" notNull="false" maxLength="25" value="${dto.mobile}" />
  </td>
  <th> 邮件 ：</th>
  <td > 
  <input type="text" class="text" id="dtoemail" name="email" notNull="false" maxLength="50" value="${dto.email}" />
  </td>
</tr>
<%-- <tr>
  
  <th> 用户头像 ：</th>
  <td > 
  <input type="text" class="text" id="dtouserImage" name="userImage" notNull="false" maxLength="50" value="${dto.userImage}" />
  </td>
  </tr> --%>
<tr>
  <th> 性别 ：</th>
  <td >
  <form:select path="sex" id="dtosex">
	  	<form:option value="0">女</form:option>
	  	<form:option value="1">男</form:option>
  </form:select>
  </td>
  <th> 出生日期 ：</th>
  <td > 
   <input type="text" class="text" value='${dto.birthday}' onClick="WdatePicker()"  id="dtobirthday" name="birthday" notNull="false" maxLength="25" value="" />
  </td>
</tr>
<tr>
  <th> 民族 ：</th>
  <td > 
 <%--  <input type="text" class="text" id="dtonationality" name="nationality" notNull="false" maxLength="25" value="${dto.nationality}" /> --%>
 <syscode:dictionary name="nationality"  id="dtonationality" codeType="NATION" type="select" defaultValue="${dto.nationality}"></syscode:dictionary>
  </td>
  <th> 学历 ：</th>
  <td > 
  <%-- <input type="text" class="text" id="dtoeducation" name="education" notNull="false" maxLength="25" value="${dto.education}" /> --%>
  <syscode:dictionary name="education"  id="dtoeducation" codeType="MD_EDUCATION" type="select" defaultValue="${dto.education}"></syscode:dictionary>
  </td>
</tr>
<tr>
  <th> 职务 ：</th>
  <td > 
 <%--  <input type="text" class="text" id="dtojob" name="job" notNull="false" maxLength="50" value="${dto.job}" /> --%>
   <syscode:dictionary name="job"  id="dtojob" codeType="DUTY" type="select" defaultValue="${dto.job}" ></syscode:dictionary>
  </td>
  <th> 家庭住址 ：</th>
  <td > 
  <input type="text" class="text" id="dtohomeAddress" name="homeAddress" notNull="false" maxLength="50" value="${dto.homeAddress}" />
  </td>
  </tr>
<tr>
  <th> 家庭邮编 ：</th>
  <td > 
  <input type="text" class="text" id="dtohomeZipcode" name="homeZipcode" notNull="false" maxLength="25" value="${dto.homeZipcode}" />
  </td>
  <th> 家庭电话 ：</th>
  <td > 
  <input type="text" class="text" id="dtohomeTel" name="homeTel" notNull="false" maxLength="25" value="${dto.homeTel}" />
  </td>
</tr>
<tr>
  <th> 办公电话 ：</th>
  <td > 
  <input type="text" class="text" id="dtoofficeTel" name="officeTel" notNull="false" maxLength="25" value="${dto.officeTel}" />
  </td>
  <th> 办公地址 ：</th>
  <td > 
  <input type="text" class="text" id="dtoofficeAddress" name="officeAddress" notNull="false" maxLength="50" value="${dto.officeAddress}" />
  </td>
</tr>
<tr>
  <th> 排序 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorderBy" name="orderBy" notNull="false" maxLength="25" value="${dto.orderBy}" />
  </td>
  <th> 是否锁定 ：</th>
  <td > 
  <form:select path="isLocked" id="dtoisLocked">
	  	<form:option value="0">未锁定</form:option>
	  	<form:option value="1">锁定</form:option>
  </form:select>
  </td>
</tr>

<tr>
  <th> 是否有效 ：</th>
  <td colspan="3"> 
  <form:select path="validateState" id="dtovalidateState">
	  	<form:option value="0">无效</form:option>
	  	<form:option value="1">有效</form:option>
  </form:select>
  </td>
</tr>
  <tr>
	<th>证件号码：</th>
	<td>
	<input type="text" class="text" id="dtocardNo" name="cardNo" maxLength="25" value="${dto.cardNo}" />
	</td>
	<th>政治面貌：</th>
	<td>
	<syscode:dictionary id="dtopoliticalStatus" name="politicalStatus" extendProperty="notNull=true"
     defaultValue="${dto.politicalStatus}" codeType="MD_POLITICAL_STATUS" type="select"/>
	</td>
</tr>
<tr>
	<th>员工关系：</th>
	<td>
	<syscode:dictionary id="dtouserRelation" name="userRelation" extendProperty="notNull=true"
     defaultValue="${dto.userRelation}" codeType="MD_USER_RELATION" type="select"/>
	</td>
	<th>试用期：</th>
	<td>
	<input type="text" class="text" id="dtoprobationPeriod" name="probationPeriod" maxLength="25" value="${dto.probationPeriod}" />
	</td>
</tr>
<tr>
	<th>入职日期：</th>
	<td>
	<fmt:formatDate type="date" value="${dto.entryDate}" var="entryDate" pattern="yyyy-MM-dd" /> 
	<input type="text" class="text" id="dtoentryDate" name="entryDate" maxLength="25" value="${entryDate}"  onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
	</td>
	<th>离职日期：</th>
	<td>
	<fmt:formatDate type="date" value="${dto.quitDate}" var="quitDate" pattern="yyyy-MM-dd" /> 
	<input type="text" class="text" id="dtoquitDate" name="quitDate" maxLength="25" value="${quitDate}"  onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
	</td>
</tr>
<tr>
	<th>参加工作日期：</th>
	<td>
	<fmt:formatDate type="date" value="${dto.workDate}" var="workDate" pattern="yyyy-MM-dd" /> 
	<input type="text" class="text" id="dtoworkDate" name="workDate" maxLength="25" value="${workDate}"  onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
	</td>
	<th>标准年假：</th>
	<td>
	<input type="text" class="text" id="dtoannualLeave" name="annualLeave" maxLength="25" value="${dto.annualLeave}" />
	</td>
</tr>
<tr>
	<th>年假起始日期：</th>
	<td>
	<fmt:formatDate type="date" value="${dto.njqsrq}" var="njqsrq" pattern="yyyy-MM-dd" /> 
	<input type="text" class="text" id="dtonjqsrq" name="njqsrq" maxLength="25" value="${njqsrq}"  onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
	</td>
	<th>基薪职级：</th>
	<td>
	<syscode:dictionary id="dtojxzj" name="jxzj" extendProperty="notNull=true"
     defaultValue="${dto.jxzj}" codeType="SYS_USER_JXZJ" type="select"/>
	</td>
</tr>
<tr>
  <th> 操作提示 ：</th>
  <td colspan="3"> 
  	<font color="red">修改登入密码请选中“修改密码”并点击保存；如果不需要修改密码请直接点击保存，密码将不会同步更新。</font>
  </td>
  </tr>
</table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form:form>


</div>

<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
	<div class="ui-dialog-buttonset" style="text-align:center">
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" style="margin:20px auto" type="button" onclick="doUpdateFrom();">
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
   	   //修改页面默认密码为只读
	   checkform("#updateNewsFormData");//校验
	   $("input[name=password]").attr("readonly","readonly");
	});
</script>
  
</html>
