<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <%@ include file="/common/exportExcel.jsp" %>
   <%@ include file="/common/exportTxt.jsp" %>
  <title>查询系统配置表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/sysConfig/querySysConfig.js"></script>
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
	<%-- $(document).ready(function(){
		
		
	   	var  orgurl='<%=basePath%>/sysOrg/queryTreeSysOrgByCurrentUserOrg?&trace=down';
	   	$("[name='configValue']").treeMenu({
	   		"treeUrl":orgurl
	   		,"treeType":"radio"
	   		,"treeIdObj":$("[name='configCode']")
	   		,"width":"200"
	   		,"height":"300"});
	   	
	}); --%>
</script>

</head>
<body style="background-color:#FFFFFF">
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>
	
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		  <a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		  <a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
		  <a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
		  <a href="javascript:void(0)" onclick="deleteCache()" index="3">清空系统数据缓存</a>
		  <!-- 
		  <a href="javascript:void(0)" onclick="cleanAllRedisCache()" index="4">清空reids全部数据缓存</a> /*屏蔽此功能*/
		  -->
		  <a href="javascript:void(0)" onclick="exportExcel()" index="5">导出Excel</a>
		  <a href="javascript:void(0)" onclick="exportTxt()" index="6">导出Txt</a>
		  <a href="javascript:void(0)" onclick="toDeleteRedisLock()" index="7">清除redis锁</a>
		  <shiro:hasPermission name="sysShell/toExecShell">
		 	 <a href="javascript:void(0)" onclick="toExecShell()" index="8">执行shell脚本</a>
		  </shiro:hasPermission>
	 </div>

</body>
<!-- 相关js方法 -->	
<script>
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
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 配置名称 ', code : 'configName', width : 200,  type:'text'}
	        ,{display : ' 配置编码 ', code : 'configCode', width : 200,  type:'text'}
	        ,{display : ' 配置值 ', code : 'configValue', width : 200,  type:'text'}
	        ,{display : '类型', code : 'configType', width : 200,  type:'autocomplete',value:[{"value":"","text":"请选择类型"},{"value":"0","text":"系统级"},{"value":"1","text":"项目级"}]}
	        //,{display : ' 乐观锁 ', code : 'version', width : 200,  type:'text'}
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义工具条	
		var toolbar={
			title:"系统参数查询列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 配置名称 ', code : 'configName', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.configName+"</a>";
				    }	 
			 }
			,{display : ' 配置编码 ', code : 'configCode', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 配置值 ', code : 'configValue', width : 300, align : 'left', type:'text', isOrder : false}
			,{display : ' 类型 ', code : 'configType', width : 100, align : 'left', type:'select',value:[{"value":"","text":"请选择类型"},{"value":"0","text":"系统级"},{"value":"1","text":"项目级"}]}
		   ],
			url : "${basePath}sysConfig/queryListSysConfig",
			pageSize : 10,
			toolbar:"tableToolbar",
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
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
</script> 
</html>
