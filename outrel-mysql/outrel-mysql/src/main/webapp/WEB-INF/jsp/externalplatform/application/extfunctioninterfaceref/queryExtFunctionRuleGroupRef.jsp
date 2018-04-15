<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询功能规则集映射表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 start -->
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		  	<a href="javascript:void(0)" onclick="toAddData('2')" index="0">新增</a>
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
	  </div>
<!-- 列表按钮操作 end -->
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

</body>
<!-- 相关js方法 -->
<script type="text/javascript" src="${basePath}/js/externalplatform/application/extfunctioninterfaceref/queryExtFunctionInterfaceRef.js?d=<%=myDate%>"></script>
<script type="text/javascript" src="${basePath}/js/externalplatform/application/common/modelWidget.js?d=<%=myDate%>"></script>
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
		queryFunc();
	});
</script>	
<script>
	var iframe;
	
	//定义form表单 查询 方法
	function queryData(){
		iframe.iframeObj["table"].query();
	}
	//定义 form表单 重置方法
	function resetData(){
		iframe.iframeObj["form"].reset();
		queryFunc();
	}
	//初始化 查询页面元素
	function initFn(){
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
					 {display : ' 系统名称 ', code : 'sysCode', width : 200,  type:'select', value:''}
					,{display : ' 功能模块名称 ', code : 'funcModuleType', width : 200,  type:'select', value:''}
					,{display : ' 功能点名称 ', code : 'funcTypeCode', width : 200,  type:'select', value:''}
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
			 {display : ' 系统名称 ', code : 'sysName', width : 180, align : 'center', type:'text', isOrder : false}
			,{display : ' 系统编码 ', code : 'sysCode', width : 180, align : 'center', type:'hidden', isOrder : false}
			,{display : ' 功能模块名称 ', code : 'funcModuleName', width : 180, align : 'center', type:'text', isOrder : false}
			,{display : ' 功能模块类型 ', code : 'funcModuleType', width : 180, align : 'left', type:'hidden', isOrder : false}
			,{display : ' 功能点名称 ', code : 'funcTypeName', width : 180, align : 'center', type:'text', isOrder : false}
			,{display : ' 功能点编码 ', code : 'funcTypeCode', width : 180, align : 'left', type:'hidden', isOrder : false}
			,{display : '规则集名称', code : 'ruleGroupName', width : 100, align : 'center', type:'text', isOrder : false}
			,{display : '规则集编码', code : 'ruleGroupCode', width : 100, align : 'center', type:'hidden', isOrder : false}
			,{display : '创建时间', code : 'createTime', width : 180, align : 'center', type:'date', format: 'yyyy-MM-dd HH:mm:ss'}
			,{display : '修改时间', code : 'modifyTime', width : 180, align : 'center', type:'date', format: 'yyyy-MM-dd HH:mm:ss'}
			,{display : '配置类型', code : 'confType', width : 180, align : 'center', type:'hidden'}
			,{display : '操作', code : 'opts', width : 100, align : 'center', type:'link', value:[
			    {"text":"分配规则集","action":function(obj){distributeRuleGroup(obj)}}
             ]}
		   ],
			url : "${basePath}extFunctionInterfaceRef/queryListExtFunctionInterfaceRef?confType=2",
			toolbar:"tableToolbar",
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
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
	
	/**
	 * 页面查询条件级联
	 */
	function queryFunc(){
		jyAjax(
				contextRootPath+"/extSysManagement/queryExtSysManagementList",
				'',
				function(result){
				var v_status = result.status;
	        	 if(v_status.indexOf('ok') >-1){
	        		 $.each(result.data, function(idx, e){
	        			  $("select[name='sysCode']").append("<option value='"+result.data[idx].sysCode+"'>"+result.data[idx].sysName+"</option>")
	        		 })
	        	}
		});
		$("select[name='sysCode']").append("<option value=''>--请选择--</option>");
		$("select[name='sysCode']").bind("change",function(){
			//移除旧的列表
			 $("select[name='funcModuleType'] option").remove(); 
			 $("select[name='funcModuleType']").append("<option value=''>--请选择--</option>");
			//移除旧的列表
			 $("select[name='funcTypeCode'] option").remove(); 
			 $("select[name='funcTypeCode']").append("<option value=''>--请选择--</option>");
			
			 var sysCode=$("select[name='sysCode']").val();
			 var url=contextRootPath+"/extFunctionType/queryExtFunctionTypeList?sysCode="+sysCode;
			 comSelect('funcModuleType',url);
		});
		
		
		 $("select[name='funcModuleType']").bind("change",function(){
			//移除旧的列表
			 $("select[name='funcTypeCode'] option").remove(); 
			 $("select[name='funcTypeCode']").append("<option value=''>--请选择--</option>");
			 var funcModuleType=$("select[name='funcModuleType']").val();
			 var url=contextRootPath+"/extFunctionType/queryExtFunctionTypeList?funcTypeCode="+funcModuleType;
			 comSelect('funcTypeCode',url);
		}); 
		function comSelect(showName,url){
			jyAjax(
					url,
					'',
					function(result){
					var v_status = result.status;
		        	 if(v_status.indexOf('ok') >-1){
		        		 $.each(result.data, function(idx, e){
		        			  $("select[name='"+showName+"']").append("<option value='"+result.data[idx].funcTypeCode+"'>"+result.data[idx].funcTypeName+"</option>")
		        		 })
		        	}
			});
		}
	}
</script> 
</html>
