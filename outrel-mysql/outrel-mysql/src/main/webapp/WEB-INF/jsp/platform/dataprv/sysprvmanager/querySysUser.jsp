<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询系统用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 相关js方法 -->
<script type="text/javascript">
	var iframe;
	function viewRoleData(obj){
		var userId = obj.id;
		$(parent.document).find("#info").attr("src",contextRootPath+"/sysPrvRoleAuth/prepareExecute/toQueryPage?userId="+userId);
	}
	function viewOrgData(obj){
		var userId = obj.id;
		$(parent.document).find("#info").attr("src",contextRootPath+"/sysPrvOrgAuth/prepareExecute/toQueryPage?userId="+userId);
	}
	function viewUserShare(obj){
		var userId = obj.id;
		$(parent.document).find("#info").attr("src",contextRootPath+"/sysPrvUserShare/prepareExecute/toQueryPage?userId="+userId);
	}
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
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 姓名 ', code : 'userName', width : 100,  type:'text'}
	        ,{display : ' 编码 ', code : 'userNo', width : 100,  type:'text'}
	        ,{display : ' 登录名 ', code : 'loginName', width : 100,  type:'text'}
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
			 {display : ' 姓名 ', code : 'userName', width : 90, align : 'left', type:'text', isOrder : false}
			,{display : ' 编码 ', code : 'userNo', width : 70, align : 'left', type:'text', isOrder : false}
			,{display : ' 登录名 ', code : 'loginName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 性别 ', code : 'sex', width : 50, align : 'left', type:'select', isOrder : false
				,value: [{"value": "0", "text": "女"},
				         {"value": "1", "text": "男"}
				]
			}
			,{display:'操作', code:'id', width:200, align:'center', type:'link',value:[ 
			                                                 				        {"text":"数据角色","action":viewRoleData}
			                                                 	                   ,{"text":"授权机构","action":viewOrgData}
			                                                 	                   ,{"text":"用户共享","action":viewUserShare}
			                                                 	                 ]}
		   ],
			url : "${basePath}sysUser/queryListSysUser",
			toolbar:"",
			pageSize : 10,
			selectType : '',
			isCheck : false,
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
<!-- 页面初始化 需要的 div -->
<div id="userTableDiv"></div>
