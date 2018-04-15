<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询映射表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/bizauth/vmrulemapping/queryVmruleMapping.js"></script>
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>

</head>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 start -->
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
		  <a href="javascript:void(0)" onclick="fulshAuth()" index="1">数据权限刷新</a>
		  <shiro:hasPermission name="platform/sysauth/sysRole/querySysRole:add">
		  	<a href="javascript:void(0)" onclick="cleanAuth()" index="3">离职权限清理</a>
		  </shiro:hasPermission>
	  </div>
<!-- 列表按钮操作 end -->

	
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

</body>
<!-- 相关js方法 -->	
<script>
/*
 * 设置 被 关联 信息
 */
function setBrefCallFun(_ids,_names){
	   var obj =dialogAddObj.getIframe();
	   if(_ids.indexOf(",") > -1){
			jyDialog({"type":"info"}).alert("请选择一条数据！");
	  		return;
	   }
	   obj.$("#dtomapKey").val(_names);
	   obj.$("#mapKeyId").val(_ids);
}

function setArefCallFun(_ids,_names)
{
	 var obj =dialogAddObj.getIframe();

	 obj.$("#dtomapValue").val(_names);
	 obj.$("#mapValueId").val(_ids);
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
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 类型 ', code : 'mapType', width : 200,  type:'select',value:[{"value": "", "text": "全部"},{"value": "1", "text": "人对人"},{"value": "2", "text": "人对机构"},{"value": "3", "text": "机构对机构"}]}
	        ,{display : ' 关联KEY', code : 'mapKey', width : 200,  type:'text'}
	        ,{display : ' 关联VALUE', code : 'mapValue', width : 200,  type:'text'}
	        ,{display : ' KEY名称', code : 'keyName', width : 200,  type:'text'}
	        ,{display : ' VALUE名称', code : 'valueName', width : 200,  type:'text'}
	        ,{display : ' 虚拟树代码', code : 'orgType', width : 200,  type:'text'}
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
			 {display : '类型', code : 'mapType', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						if(obj.mapType=='1')
							return '人对人';
						if(obj.mapType=='2')
							return '人对机构';
						if(obj.mapType=='3')
							return '机构对机构';
				    }	 
			 }
			,{display : ' 关联KEY ', code : 'mapKey', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 关联VALUE ', code : 'mapValue', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' KEY名称 ', code : 'keyName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' VALUE名称 ', code : 'valueName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 虚拟树代码 ', code : 'orgType', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}vmruleMapping/queryListVmruleMapping?orgtype=${orgtype}",
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
</script> 
</html>
