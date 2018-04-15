<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <%@ include file="/common/StaticJspTaglib.jsp" %>
  <title>查询虚拟用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

  <script type="text/javascript" src="${basePath}js/platform/bizauth/vmuservmorgmap/queryVmSysUser.js"></script>
<!-- 相关js方法 -->
<div id="tableToolbar" class="tableToolbar" style="display:none;">
		<!--  
		  <shiro:hasPermission name="platform/bizauth/vmrulemapping/queryVmruleMapping:add">
		  	<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		  </shiro:hasPermission>
	  	 <shiro:hasPermission name="platform/bizauth/vmrulemapping/queryVmruleMapping:modify">
		  	<a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
		  </shiro:hasPermission>
		  <shiro:hasPermission name="platform/bizauth/vmrulemapping/queryVmruleMapping:delete">
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
		  </shiro:hasPermission>
		  -->
		  <input type="hidden" id="orgtype" value="${orgtype}" />
		  <a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		  <!--  
		  <a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
		  -->
		  <a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
		  
		  <c:if test="${not empty orgId}">
		  		<a href="javascript:void(0)" onclick="refreshData()" index="1">数据权限刷新</a>
		  </c:if>
		  <shiro:hasPermission name="platform/sysauth/sysRole/querySysRole:add">
		  	<a href="javascript:void(0)" onclick="cleanData()" index="2">离职数据权限清理</a>
		  </shiro:hasPermission>
	  </div>
<script type="text/javascript">

/*
 * 设置 关联 信息
 */
 
function setBrefCallFun(_ids,_names){
	  
	   var obj =dialogAddObj.getIframe();
	   obj.$("#dtouserId").val(_ids);
	   obj.$("#dtouserName").val(_names);
	   
}

	var iframe;
	
	//定义form表单 查询 方法
	function queryData(){
		iframe.iframeObj["table"].query();
	}
	//定义 form表单 重置方法
	function resetData(){
		iframe.iframeObj["form"].reset();
	}
	//初始化 查询页面元素
	function initFn(){
		var orgId = $("#orgId").val();
		var orgType=$("#orgType").val();
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
                       {display : ' 用户姓名 ', code : 'userName', width : 200,  type:'text'}
						//,{display : '虚拟组织代码 ', code : 'orgId', width : 200,  type:'text'}
				        ,{display : ' 组织名称', code : 'orgName', width : 200,  type:'text'}
	     	],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义工具条	
		var toolbar={
			title:"查询列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 用户ID ', code : 'userId', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.userId+"</a>";
				    }	 
			 }
			,{display : '姓名 ', code : 'userName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : '用户是否有效 ', code : 'validateState', width : 100, align : 'left', type:'fun', isOrder : false,
					value:function (obj){
			  			if(obj.validateState=="1"){
							return "是";
						}else{
							return "否";
						}
				    }
			}
			,{display : '任职岗位 ', code : 'positionCN', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : '虚拟组织代码 ', code : 'orgId', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : '组织名称 ', code : 'orgName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : '虚拟树类型 ', code : 'orgType', width : 100, align : 'left', type:'text', isOrder : false}
			
			//,{display : ' 编码 ', code : 'userName', width : 100, align : 'left', type:'text', isOrder : false}
	
		   ],
			url : "${basePath}vmuserVmorgMap/queryListVmuserVmorgMap"+(orgId!=null?("?orgId="+orgId):"")+(orgType!=null?("&orgType="+orgType):""),
			//url : "${basePath}sysUser/queryListSysUser"+(orgId!=null?("?orgId="+orgId):""),
			toolbar:'tableToolbar',
			pageSize : 10,
			selectType : 'checkbox',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#userTableDiv").newSearchIframe(searchIframe);
		iframe.show();
	}

	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>
<input type="hidden" id="orgId" name="orgId" value="${orgId}"/>
<input type="hidden" id="orgType"  name="orgType" value="${orgType}"/>
<input type="hidden" id="orgName"  name="orgName" value="${orgName}"/>
<!-- 页面初始化 需要的 div -->
<div id="userTableDiv"></div>
