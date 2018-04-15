<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <%@ include file="/common/StaticJspTaglib.jsp" %>
  <title>查询系统用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 相关js方法 -->
<script type="text/javascript">
var sysuserSelectTable = {};
sysuserSelectTable.iframe = {};

sysuserSelectTable.chooseUserData = function() {
	var objs = sysuserSelectTable.iframe.iframeObj["table"].getSelectedObjs();
   	if(typeof(receiveUserData) != 'undefined'){
    	receiveUserData(objs);
   	}
   	dialogUserSelect.close();
}


//定义form表单 查询 方法
sysuserSelectTable.queryData = function(){
	sysuserSelectTable.iframe.iframeObj["table"].query();
}

//定义 form表单 重置方法
sysuserSelectTable.resetData = function(){
	sysuserSelectTable.iframe.iframeObj["form"].reset();
}

//初始化 查询页面元素
sysuserSelectTable.initFn = function(){
	//定义 form表单查询 信息
	 var formStructure={
		// 定义form表单 字段信息
		columns : [
		 {display : ' 姓名 ', code : 'userName', width : 200,  type:'text'}
        ,{display : ' 编码 ', code : 'userNo', width : 200,  type:'text'}
        /* ,{display : ' 手机 ', code : 'mobile', width : 200,  type:'text'}
        ,{display : ' 性别 ', code : 'sex', width : 200,  type:'text'}
        ,{display : ' 职务 ', code : 'job', width : 200,  type:'text'}
        ,{display : ' 是否锁定 ', code : 'isLocked', width : 200,  type:'select',value:[{"value": "0", "text": "未锁定"},{"value": "1", "text": "锁定"}]} */
		],
		//定义form 表单 按钮信息
		buttons:[
		 {"text":"查询","fun":sysuserSelectTable.queryData,icon:"ui-icon-search"}
		,{"text":"重置","fun":sysuserSelectTable.resetData,icon:"ui-icon-extlink"}
		]
	}
	//定义工具条	
	var toolbar={
		title:"查询列表"
	}
	
	var orgId = $("#selectOrgId").val();
	var uriParam=(orgId!=null?("?orgId="+orgId):"");
	var roleCode = $("#selectroleCode").val();

	
	if(uriParam.indexOf("?")!=-1){
		uriParam=uriParam+(roleCode!=null?("&orgType="+roleCode):"");
	}else{
		uriParam=(roleCode!=null?("?orgType="+roleCode):"");
	}
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns : [
		 {display : ' 姓名 ', code : 'userName', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 编码 ', code : 'userNo', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 登录名 ', code : 'loginName', width : 100, align : 'left', type:'text', isOrder : false}
		/* ,{display : ' 性别 ', code : 'sex', width : 100, align : 'left', type:'select', isOrder : false
			,value: [{"value": "0", "text": "女"},
			         {"value": "1", "text": "男"}
			]
		}
		,{display : ' 出生日期 ', code : 'birthday', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 学历 ', code : 'education', width : 100, align : 'left', type:'text', isOrder : false} 
		,{display : ' 职务 ', code : 'job', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 是否锁定', code : 'isLockedCN', width : 100, align : 'left', type:'text', isOrder : false}
		*/
	   ],
		url : "${basePath}vmuserVmorgMap/queryListVmuser"+uriParam,
		toolbar:"userTableToolbar",
		pageSize : 10,
		selectType : ( $("#check").val()=='true'?'checkbox':'radio')  ,
		isCheck : true,
		rownumbers : true,
		pages : [ 10, 20, 30 ],
		trHeight : 30,
		checkedFun:function(obj){
			var v_val = v_selectPartnerMap.get(obj.id);
			if(v_val == null || v_val == ""){
				v_selectPartnerMap.put(obj.id,obj.userName);//put(key,value);
			}
		},
		cancelCheckFun:function(obj){
			var v_val = v_selectPartnerMap.get(obj.id);
			if(v_val != null && v_val != ""){
				v_selectPartnerMap.remove(obj.id);//移除 key
			}
		},
		primaryKey:"id"
	};
	//组装 searchIframe 的相关参数		
	var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
	//初始化 form 表单 table 列表 及工具条 
	sysuserSelectTable.iframe=$("#userTableDiv").newSearchIframe(searchIframe);
	sysuserSelectTable.iframe.show();
}
/**
 * 确认操作
 */
function doSure(){
	var v_oldIds = "";
	var v_oldNames = "";
	v_selectPartnerMap.each(function(v_key,v_val){
		if(v_oldIds){
			v_oldIds +=",";
			v_oldNames +=",";
		}
		v_oldIds +=v_key;
		v_oldNames +=v_val;
	});
	$("#selectedPartner").val(v_oldIds);
	$("#selectedPartnerRealName").val(v_oldNames);
	
	callBackDataInf();
}
/**
 * 清空操作
 */
function doRestSure(){
	//v_selectPartnerMap = new JBPM.common.Map();
	$("#selectedPartner").val("");
	$("#selectedPartnerRealName").val("");
	callBackDataInf();
	
}
/**
 * 回写 数据 至 父页面
 */
function callBackDataInf(){
	var v_oldIds = $("#selectedPartner").val();
	var v_oldNames = $("#selectedPartnerRealName").val();
	
	//将选中的 角色code 回写至 父页面
	$(window.parent.document).find("#dtootherParamsDis").val(v_oldNames);
	$(window.parent.document).find("#dtootherParams").val(v_oldIds);
}
//页面加载完后 
$(document).ready(function(){
   	sysuserSelectTable.initFn();
});
</script>
<input type="hidden" id="selectedPartner" name="selectedPartner" value=""/>
<input type="hidden" id="selectedPartnerRealName" name="selectedPartnerRealName" value=""/>

<input type="hidden" id="selectOrgId" name="selectOrgId" value="${param.orgId!=null?param.orgId:'-1'}"/>
<input type="hidden" id="selectroleCode" name="selectroleCode" value="${param.orgType!=null?param.orgType:'-1'}"/>

<!-- 列表按钮操作 start -->
	<div id="userTableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="doSure()" index="0">确认</a>
		  	<a href="javascript:void(0)" onclick="doRestSure()" index="0">清空</a>
	 </div>
<!-- 列表按钮操作 end -->

<!-- 页面初始化 需要的 div -->
<div id="userTableDiv"></div>