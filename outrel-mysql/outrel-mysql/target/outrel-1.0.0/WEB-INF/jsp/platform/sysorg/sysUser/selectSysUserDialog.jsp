<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJspTaglib.jsp" %>
<!-- 相关js方法 -->
<script type="text/javascript">
	var selectSysUserDialogiframe;
	
	//定义form表单 查询 方法
	function queryData(){
		selectSysUserDialogiframe.iframeObj["table"].query();
	}
	//定义 form表单 重置方法
	function resetData(){
		selectSysUserDialogiframe.iframeObj["form"].reset();
	}
	//定义 form表单数据获取方法
	function getSelectedSysRoleUserObjs(isRadio){
		var objs=selectSysUserDialogiframe.iframeObj["table"].getSelectedObjs();
		if(!objs || objs.length == 0){
			jyDialog({"type":"info"}).alert("请选择关联的数据！");
			return;
		}
		//如果选择多个 择提示
		if(isRadio && objs.length > 1){
			jyDialog({"type":"info"}).alert("请选择一条数据！");
			return;
		}
		return objs;
	}
	
	//初始化 查询页面元素
	function initFn(){
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 姓名 ', code : 'userName', width : 200,  type:'text'}
	        ,{display : ' 编码 ', code : 'userNo', width : 200,  type:'text'}
	        ,{display : ' 登录名 ', code : 'loginName', width : 200,  type:'text'}
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
			 {display : ' 姓名 ', code : 'userName', width : 150, align : 'center', type:'text'}
			,{display : ' 编码 ', code : 'userNo', width : 100, align : 'center', type:'text'}
			,{display : ' 登录名 ', code : 'loginName', width : 100, align : 'center', type:'text'}
			,{display : ' 机构 ', code : 'orgCN', width : 200, align : 'left', type:'text'}
			,{display : ' 岗位 ', code : 'positionCN', width : 200, align : 'left', type:'text'}
			,{display : ' 是否锁定', code : 'isLockedCN', width : 100, align : 'center', type:'text'}
		   ],
			url : "${basePath}sysUser/queryListSysUser?validateState=1&orgId=${orgId}&roleCode=${roleCode}",
			pageSize : 10,
			selectType : 'checkbox',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure,"isNotQuery":true};	
		//初始化 form 表单 table 列表 及工具条 
		selectSysUserDialogiframe=$("#userTableDiv").newSearchIframe(searchIframe);
		selectSysUserDialogiframe.show();
	}

	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>


<!-- 页面初始化 需要的 div -->
<div id="userTableDiv"></div>