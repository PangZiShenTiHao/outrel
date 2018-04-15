<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html> 
<head>
  <title>查询HR用户</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@ include file="/common/StaticJavascript.jsp" %>
  <%--使用 参考 贷前业务规则配置 页面addBizRuleConfDetail.jsp --%>
<!-- 相关js方法 -->
<script type="text/javascript">
var iframe;
var select_sys_user = new JBPM.common.Map();
//定义form表单 查询 方法
function queryData(){
	iframe.iframeObj["table"].query();
}

//定义 form表单 重置方法
function resetData(){
	iframe.iframeObj["form"].reset();
}

//初始化 查询页面元素
function initFn (){
	//定义 form表单查询 信息
	 var formStructure={
		// 定义form表单 字段信息
		columns : [
		 {display : ' 姓名 ', code : 'userName', width : 200,  type:'text'}
        ,{display : ' 编码 ', code : 'userNo', width : 200,  type:'text'}
        ,{display : '机构/部门ID', code : 'orgId', width : 200,  type:'hidden'}
        ,{display : '机构/部门', code : 'orgDeptName', width : 200,  type:'text'}
		],
		//定义form 表单 按钮信息
		buttons:[
		 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
		/* ,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"} */
		]
	}
	//定义工具条	
	var toolbar={
		title:"查询列表"
	}
	
	var roleCode = $("#selectroleCode").val();
	if(roleCode == null || roleCode =="" || roleCode == 'null' )roleCode="";
	var uriParam="?roleCode="+roleCode;
	
	var v_showLowerUser = $("#showLowerUser").val();
	if(v_showLowerUser == null || v_showLowerUser =="" || v_showLowerUser == 'null' )v_showLowerUser="true";
	uriParam= uriParam+"&showLowerUser="+v_showLowerUser;
	
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns : [
		 {display : ' 姓名 ', code : 'userName', width : 100, align : 'left', type:'text'}
		,{display : ' 编码 ', code : 'userNo', width : 100, align : 'left', type:'text'}
		,{display : ' 登录名 ', code : 'loginName', width : 100, align : 'left', type:'text'}
	   ],
		url : "${basePath}sysUser/queryListSysUser"+uriParam,
		toolbar:"userTableToolbar",
		pageSize : 10,
		selectType : ( $("#check").val()=='true'?'checkbox':'radio')  ,
		isCheck : true,
		rownumbers : true,
		pages : [ 10, 20, 30 ],
		trHeight : 30,
		checkedFun:function(obj){
			var v_val = select_sys_user.get(obj.id);
			if(v_val == null || v_val == ""){
				select_sys_user.put(obj.id,obj.userName);//put(key,value);
			}
		},
		cancelCheckFun:function(obj){
			var v_val = select_sys_user.get(obj.id);
			if(v_val != null && v_val != ""){
				select_sys_user.remove(obj.id);//移除 key
			}
		},
		
		primaryKey:"id"
	};
	//组装 searchIframe 的相关参数		
	var searchIframe={"form":formStructure,"table":tableStructure,"isNotQuery":true};	
	//初始化 form 表单 table 列表 及工具条 
	iframe=$("#userTableDiv").newSearchIframe(searchIframe);
	iframe.show();
}
/**
 * 确认操作
 */
function doSure(){
	var v_oldIds = "";
	var v_oldNames = "";
	
	var  objs = iframe.iframeObj["table"].getSelectedObjs();
	if("true" == $("#check").val()){
		for(var i =0;i < objs.length;i++){
			if(v_oldIds){
			   
				v_oldIds +=",";
				v_oldNames +=",";
			}
			v_oldIds +=objs[i].id;
			v_oldNames +=objs[i].userName;
		}
	}
	
	$("#selectedPartner").val(v_oldIds);
	$("#selectedPartnerRealName").val(v_oldNames);
	callBackDataInf();
	doCloseWindow();
}
/**
 * 清空操作
 */
function doRestSure(){
	select_sys_user = new JBPM.common.Map();
	$("#selectedPartner").val("");
	$("#selectedPartnerRealName").val("");
	callBackDataInf();
}

function callBackDataInf(){
	var v_tabTitle = "${param.tabTitle}";
	if(v_tabTitle !=""){
		
		 //回调 tab 页面中的  js function
		var iframeWid = parent.tabs.getTabWinByTitle("${param.tabTitle}");
		iframeWid.${param.callFun}($("#selectedPartner").val(),$("#selectedPartnerRealName").val());
	}else{
		//调用传递过来的 回调 函数
		parent.${param.callFun}($("#selectedPartner").val(),$("#selectedPartnerRealName").val());
	}
}
/**
 * 关闭操作
 */
function doCloseWindow(){
	var api = frameElement.api, W = api.opener;
	 //获取父页面的值
	 api.close();
}
//页面加载完后 
$(document).ready(function(){
   	initFn();
   	var orgId = $("#selectOrgId").val();
	if(orgId == null || orgId =="" || orgId == 'null' )orgId="-1";
	
	$("[name='orgId']").val(orgId);//给机构部门赋值
	
   	var  orgurl=contextRootPath+'/sysOrg/queryTreeSysOrg?a=a';
   	orgurl =orgurl +'&orgId=' +$("#selectOrgId").val()+'&trace=down';
   	$("[name='orgDeptName']").treeMenu({
   		"treeUrl":orgurl
   		,"treeType":"radio"
   		,"treeIdObj":$("[name='orgId']")
   		,"width":"200"
   		,"height":"300"});
   	
   	queryData();//查询
});
</script>
</head>
<body style="background-color:#FFFFFF">

<input type="hidden" id="selectedPartner" name="selectedPartner" value=""/>
<input type="hidden" id="selectedPartnerRealName" name="selectedPartnerRealName" value=""/>

<!--  人员是否可以多选 -->
<input type="hidden" id="check" name="check" value="${param.check}"/>
<!--  查询拥有某个机构下 的人员 -->
<input type="hidden" id="selectOrgId" name="selectOrgId" value="${param.orgId}"/>
<!--  查询拥有某个角色code 的人员 -->
<input type="hidden" id="selectroleCode" name="selectroleCode" value="${param.roleCode}"/>
<!-- 是否向下 查询所有的人员信息 默认是 -->
<input type="hidden" id="showLowerUser" name="showLowerUser" value="${param.showLowerUser}"/>


<!-- 列表按钮操作 start -->
	<div id="userTableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="doSure()" index="0">确认</a>
		  	<a href="javascript:void(0)" onclick="doRestSure()" index="0">清空</a>
		  	<a href="javascript:void(0)" onclick="doCloseWindow()" index="0">关闭</a>
	 </div>
<!-- 列表按钮操作 end -->

<!-- 页面初始化 需要的 div -->
<div id="userTableDiv"></div>

</body>
</html>
  <%--使用 参考 贷前业务规则配置 页面addBizRuleConfDetail.jsp --%>