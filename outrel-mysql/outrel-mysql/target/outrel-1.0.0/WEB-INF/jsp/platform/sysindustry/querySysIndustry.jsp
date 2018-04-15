<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询sys_industry</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/sysindustry/querySysIndustry.js"></script>
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		//alert($('#s_industry_id').attr("id"));
		//alert($("select[name='s_industry_id']:selected").val());
		//alert($("#s_industry_id").find("option:selected").text());
		jyDialog({"type":"info"}).alert($("#s_industry_id").find("option:selected").val());
	});
</script>

</head>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 start -->
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		  <shiro:hasPermission name="platform/sysindustry/querySysIndustry:add">
		  	<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		  </shiro:hasPermission>
	  	 <shiro:hasPermission name="platform/sysindustry/querySysIndustry:modify">
		  	<a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
		  </shiro:hasPermission>
		  <shiro:hasPermission name="platform/sysindustry/querySysIndustry:delete">
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
		  </shiro:hasPermission>
	  </div>
<!-- 列表按钮操作 end -->

	<!-- 
	页面初始化 需要的 div
	<div id="content"></div> -->
	
	默认：<industry:search hasLable="true" industryLableName="所在行业" positionLableName="职业"/>
	<br><br><br><br><br>
	<%-- 有默认值：
	 <industry:search defaultIndustry="Q30" defaultPosition="F02" hasLable="true" industryLableName="所在行业" positionLableName="职业"/> 
	 <br><br><br><br><br>
	 只显示行业
	 <industry:search hasLable="true" industryLableName="所在行业" positionLableName="职业" level="1"/>
	 <br><br><br><br><br>
	 <br><br><br><br><br>
	 
	  返回JSON格式  只显示行业
	  <industry:search displayFormat="json" defaultIndustry="Q30"/>
	  <br><br><br><br><br>
	 <br><br><br><br><br>
	  
	  显示行业职位
	 <industry:search displayFormat="json" defaultIndustry="Q30" defaultPosition="F02"/>
	 
	 <br><br><br><br><br>
	 <br><br><br><br><br>
	 <industry:search  level="1"  industryDomId="companyIndustry" defaultIndustry="${dto.companyIndustry }"/> --%>
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
			 {display : ' 行业名称 ', code : 'industryName', width : 200,  type:'text'}
	        ,{display : ' indu ', code : 'industryType', width : 200,  type:'text'}
	        ,{display : ' 职位所属 ', code : 'parentId', width : 200,  type:'text'}
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
			 {display : ' 行业名称/职位 ', code : 'industryName', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.industryName+"</a>";
				    }	 
			 }
			,{display : ' industr ', code : 'industryType', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 职位所属的行业 ', code : 'parentId', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}sysIndustry/queryListSysIndustry",
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
