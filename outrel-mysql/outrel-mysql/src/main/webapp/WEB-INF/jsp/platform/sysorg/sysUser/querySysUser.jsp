<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <%@ include file="/common/StaticJspTaglib.jsp" %>
  <title>查询系统用户表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/sysorg/sysUser/querySysUser.js"></script>
<!-- 相关js方法 -->
<script type="text/javascript">
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
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 姓名 ', code : 'userName', width : 200,  type:'text'}
	        ,{display : ' 编码 ', code : 'userNo', width : 200,  type:'text'}
	        ,{display : ' 岗位 ', code : 'positionCN', width : 200,  type:'text'}
	        ,{display : ' 登录名 ', code : 'loginName', width : 200,  type:'text'}
	        ,{display : ' 手机 ', code : 'mobile', width : 200,  type:'text'}
	        ,{display : ' 性别 ', code : 'sex', width : 200,  type:'select',value:[{"value": "", "text": "全部"},{"value": "1", "text": "男"},{"value": "0", "text": "女"}]}
	        ,{display : ' 是否锁定 ', code : 'isLocked', width : 200,  type:'select',value:[{"value": "", "text": "全部"},{"value": "0", "text": "未锁定"},{"value": "1", "text": "锁定"}]}
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			/* ,{"text":"新增","fun":toAddData,icon:"ui-icon-extlink"}
			,{"text":"修改","fun":toUpdateData,icon:"ui-icon-extlink"}
			,{"text":"删除","fun":deleteData,icon:"ui-icon-extlink"} */
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
			 {display : ' 姓名 ', code : 'userName', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.userName+"</a>";
				    }	 
			 }
			,{display : ' 编码 ', code : 'userNo', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 登录名 ', code : 'loginName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 机构 ', code : 'orgCN', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 岗位 ', code : 'positionCN', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 手机 ', code : 'mobile', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 邮件 ', code : 'email', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 性别 ', code : 'sex', width : 100, align : 'left', type:'select', isOrder : false
				,value: [{"value": "0", "text": "女"},
				         {"value": "1", "text": "男"}
				]
			}
			,{display : ' 出生日期 ', code : 'birthday', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 民族 ', code : 'nationality', width : 100, align : 'left', type:'select',value:<syscode:dictionary codeType="sysuser_nation" type="json"/>}
			,{display : ' 学历 ', code : 'education', width : 100, align : 'left', type:'select',value:<syscode:dictionary codeType="sysuser_education" type="json"/>}
			,{display : ' 职务 ', code : 'job', width : 100, align : 'left',type:'select',value:<syscode:dictionary codeType="sysuser_job" type="json"/>}
			,{display : ' 家庭住址 ', code : 'homeAddress', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 是否有效', code : 'validateStateCN', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 是否锁定', code : 'isLockedCN', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : '操作', code : '', width : 100, align : 'left', type:'link', isOrder : false,	
			    value:[
			   			{"text":"查看角色","action":viewRoles}
                 ]
		     }

		   ],
			url : "${basePath}sysUser/queryListSysUser"+(orgId!=null?("?orgId="+orgId):""),
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
		iframe=$("#userTableDiv").newSearchIframe(searchIframe);
		iframe.show();
	}

	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>
<input type="hidden" id="orgId" name="orgId" value="${param.orgId}"/>

<div id="tableToolbar" class="tableToolbar" style="display:none;">
			<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
			<a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
			<a href="javascript:void(0)" onclick="deleteData()" index="3">删除</a>
			<a href="javascript:void(0)" onclick="setDisabledData()" index="3">设置无效</a>
			<a href="javascript:void(0)" onclick="synLdapData()" index="4">初始化密码</a>
			<a href="javascript:void(0)" onclick="changeBaseResource()" index="5">变更基本资源</a>
</div>
<!-- 页面初始化 需要的 div -->
<div id="userTableDiv"></div>