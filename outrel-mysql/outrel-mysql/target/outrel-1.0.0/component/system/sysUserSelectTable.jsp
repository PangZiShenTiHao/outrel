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
		
		var showLowerUser = $("#showLowerUser").val();
		var showLowerUserParam=(showLowerUser!=null?("&showLowerUser="+showLowerUser):"");
		
		
		if(uriParam.indexOf("?")!=-1){
			uriParam=uriParam+(roleCode!=null?("&roleCode="+roleCode):"");
		}else{
			uriParam=(roleCode!=null?("?roleCode="+roleCode):"");
		}
		
		uriParam += showLowerUserParam;
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
			url : "${basePath}sysUser/queryListSysUser"+uriParam,
			toolbar:[],
			pageSize : 10,
			selectType : ( $("#check").val()=='true'?'checkbox':'radio')  ,
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		sysuserSelectTable.iframe=$("#userTableDiv").newSearchIframe(searchIframe);
		sysuserSelectTable.iframe.show();
	}

	//页面加载完后 
	$(document).ready(function(){
    	/* if(typeof(dialogUserSelect) == 'undefined'){
    		alert("未定义dialogUserSelect对象，弹出层会无法关闭，请声明该对象");
    		return;
    	}
    	if(typeof(receiveUserData)=='undefined'){
    		alert("未定义receiveUserData方法，您将无法对返回选中的数据处理，请声明该方法！");
    		return;
    	} */
    	sysuserSelectTable.initFn();
	});
</script>
<input type="hidden" id="selectOrgId" name="selectOrgId" value="${param.orgId!=null?param.orgId:'-1'}"/>
<input type="hidden" id="selectroleCode" name="selectroleCode" value="${param.roleCode!=null?param.roleCode:'-1'}"/>

<!-- 页面初始化 需要的 div -->
<div id="userTableDiv"></div>
