<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
  <title>查询用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 相关js方法 -->

<script>
	var selectUserIframe;
	//定义form表单 查询 方法
	function queryData(){
		selectUserIframe.iframeObj["table"].query();
	}
	//定义 form表单 重置方法
	function resetData(){
		selectUserIframe.iframeObj["form"].reset();
	}
	//初始化 查询页面元素
	function initFn(){
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			  {display : ' 用户名称 ', code : 'userName', width : 200,  type:'text'}
			 ,{display : ' 用户编号 ', code : 'userNo', width : 200,  type:'text'}
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义工具条	
		var toolbar={
			title:"用户查询列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 用户名称 ', code : 'userName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 用户编号 ', code : 'id', width : 100, align : 'left', type:'text', isOrder : false}
			/* ,{display : ' 操作 ', code : 'id', width : 100, align : 'left', type:'fun', isOrder : false,
				value:function (obj){
					return "<a href='javascript:void(0)' onclick='selectSysUserData(\""+obj.id+"\",\""+obj.userName+"\")'>保存</a>";
			    }		
			} */
		   ],
			url : "${basePath}sysRoleUser/queryListSysUser?roleId="+roleId,
			toolbar:[/*{"text":"确定","action":selectPositionData}*/],
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
		selectUserIframe=$("#selectSysUser").newSearchIframe(searchIframe);
		selectUserIframe.show();
	}
</script> 

<script type="text/javascript">
	var roleId = $("#roleId").val();
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
	//选中一个用户
	function selectSysUserData(id , userName){
		var fillElementId = $("#fillElementId").val();
		$("#"+fillElementId).val(userName);//岗位名称赋值
		$("#"+fillElementId).prev().val(id);//岗位id赋值
		window.location.href="${basePath}sysRoleUser/insertSysRoleUser?roleId="+roleId+"&targetId="+id+"&targetType=user";
		dialogPositionSelect.close();
	}
</script>

</head>
<body style="background-color:#FFFFFF">
	<input type="hidden" name="roleId" id="roleId" value="<%=request.getParameter("roleId")%>">
	<input type="hidden" name="fillElementId" id="fillElementId" value="${param.fillElementId}">
	<!-- 页面初始化 需要的 div -->
	<div id="selectSysUser"></div>
</body>
<!-- 相关js方法 -->	

</html>
