<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <%@ include file="/common/StaticJspTaglib.jsp" %>
  <title>查询系统用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 相关js方法 -->
<script type="text/javascript">
var sysuserSelectTable = {};
sysuserSelectTable.iframe = {};
   	//声明 全局 选人 变量
var v_selectPartnerMap = new JBPM.common.Map();

//定义form表单 查询 方法
sysuserSelectTable.queryData = function(){
	v_selectPartnerMap = new JBPM.common.Map();//查询时 重置
	sysuserSelectTable.iframe.iframeObj["table"].query();
}

//定义 form表单 重置方法
sysuserSelectTable.resetData = function(){
	//v_selectPartnerMap = new JBPM.common.Map();//查询时 重置
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
        ,{display : ' 状态 ', code : 'validateState', width : 200,   type:'select',
				 value:[{value:'',text:'所有'},{value:'0',text:'无效'},{value:'1',text:'有效'}]}
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
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns : [
		 {display : ' 姓名 ', code : 'userName', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 编码 ', code : 'userNo', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 登录名 ', code : 'loginName', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 状态 ', code : 'validateState', width : 40, align : 'left', type:'select', value:[ {"text":"无效","value":"0"},{"text":"有效","value":"1"}]}
	   ],
		url : "${basePath}sysUser/queryListSysUser"+(orgId!=null?("?orgId="+orgId):""),
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
		checkAllFun:function(objs){
			if(objs!=undefined){
				for(var i=0;i<objs.length;i++){
					var obj = objs[i];
					var v_val = v_selectPartnerMap.get(obj.id);
					if(v_val == null || v_val == ""){
						v_selectPartnerMap.put(obj.id,obj.userName);//put(key,value);
					}
				}
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
	if('${param.callBackFun}' !=''){
		parent.${param.callBackFun}(v_oldIds,v_oldNames);//调用传递过来的 回调 函数;
	}
}

//页面加载完后 
$(document).ready(function(){
   	sysuserSelectTable.initFn();


});


</script>

<input type="hidden" id="selectedPartner" name="selectedPartner" value=""/>
<input type="hidden" id="selectedPartnerRealName" name="selectedPartnerRealName" value=""/>

<input type="hidden" id="selectOrgId" name="selectOrgId" value="${param.orgId!=null?param.orgId:'-1'}"/>
<!-- 列表按钮操作 start -->
	<div id="userTableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="doSure()" index="0">确认</a>
		  	<!--  -->
		  	<c:if test="${empty param.callBackFun }">
		  	<a href="javascript:void(0)" onclick="doRestSure()" index="0">清空</a>
		  	</c:if>
	 </div>
<!-- 列表按钮操作 end -->

<!-- 页面初始化 需要的 div -->
<div id="userTableDiv"></div>
