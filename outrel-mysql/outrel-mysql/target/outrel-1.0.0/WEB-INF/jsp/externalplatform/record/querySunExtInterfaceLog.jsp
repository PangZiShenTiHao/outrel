<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ taglib uri="/WEB-INF/tlds/productConf.tld" prefix="pc"%>
   <%@ taglib prefix="syscommon" uri="/syscommon" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询调用接口日志表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<!-- 相关js方法 -->
<script type="text/javascript" src="${basePath}/js/externalplatform/record/queryExtInterfaceLog.js?d=<%=myDate%>"></script>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 end -->
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

</body>
<!-- 相关js方法 -->
<!-- 输入过滤条件可滚动效果 -->
<style>
.ui-autocomplete {
  max-height: 100px;
  overflow-y: auto;
  /* 防止水平滚动条 */
  overflow-x: hidden;
}
/* IE 6 不支持 max-height
 * 我们使用 height 代替，但是这会强制菜单总是显示为那个高度
 */
* html .ui-autocomplete {
  height: 100px;
 }
</style> 
<script type="text/javascript">
/*
 * 选择组织机构树
 */
function selectTree(){
	var _orgurl='${basePath}/vmtreeInfo/queryVmTreeSysOrg?orgType=LOAN&_orgId=${curUser.orgId}';
	$("[name='reqOrgCode2']").next(".custom-combobox").find("a").treeMenu(
   			{"treeUrl":_orgurl
   			,"treeType":"checkbox","disabledLink":"true"
	   		,"treeIdObj":$("[name='reqOrgCode']")
	   		,"treeNameObj":$("[name='reqOrgCode2']").next(".custom-combobox").find("input")
	   		,"width":"200"
	   		,"height":"300"});

}
	//页面加载完后 
	$(document).ready(function(){
		initFn();
		selectTree();
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
		selectTree();
		$("select[name='reqOrgCode2'] + span >input").blur(function(){
			$("input[name='reqOrgCode']").val($("select[name='reqOrgCode2'] ").val());
		});
		queryFunc();
	}
	//初始化 查询页面元素
	function initFn(){
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 系统名称 ', code : 'sysCode', width : 200,  type:'select', value:''}
			,{display : ' 功能模块名称 ', code : 'funcTypeCode', width : 200,  type:'select', value:''}
		    ,{display : ' 功能点名称 ', code : 'reqFuncCode', width : 200,  type:'select', value:''}
			,{display : ' 机构 ', code : 'reqOrgCode2', width : 200,  type:'autocomplete', value:<syscommon:commonTag type="json" codeType="LOAN" beanID="com.jy.modules.platform.sysdict.impl.SysCommonTagAPImpl"></syscommon:commonTag>}			
			,{display : ' 机构 ', code : 'reqOrgCode', width : 200,  type:'hidden', value:''}			
	        ,{display : ' 产品 ', code : 'reqProCode', width : 200,  type:'select', value:<pc:productTag type="json"></pc:productTag>}	
	        ,{display : '调用时间', code : 'reqTime', width : 100, align : 'left',type: 'dbDate'}
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
			 {display : ' 机构名称 ', code : 'orgName', width : 100, align : 'left', type:'fun', isOrder : false,
				  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.orgName+"</a>";
				    }	 
			 }
			,{display : ' 机构编码 ', code : 'reqOrgCode', width : 100, align : 'left', type:'hidden', isOrder : false}
			,{display : ' 产品名称 ', code : 'productName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 产品编码 ', code : 'reqProCode', width : 100, align : 'left', type:'hidden', isOrder : false}
			,{display : ' 系统名称', code : 'sysName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 系统编码', code : 'sysCode', width : 100, align : 'left', type:'hidden', isOrder : false}
			,{display : ' 功能模块名称', code : 'funcTypeName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 功能模块编码', code : 'funcTypeCode', width : 100, align : 'left', type:'hidden', isOrder : false}
			,{display : ' 功能点名称', code : 'reqFuncTypeName', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 功能点编码 ', code : 'reqFuncCode', width : 100, align : 'left', type:'hidden', isOrder : false}
			,{display : ' 交易流水号 ', code : 'reqTransNo', width : 120, align : 'left', type:'text', isOrder : false}
			,{display : ' 接口编码 ', code : 'interfaceNo', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 业务编码 ', code : 'businessCode', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 请求时间 ', code : 'reqTime', width : 120, align : 'left', type:'date', format:'yyyy-MM-dd hh:mm:ss', isOrder : false}
			,{display : ' 返回码 ', code : 'retCode', width : 100, align : 'left', type:'select', value:<syscode:dictionary codeType="RET_CODE" type="json"></syscode:dictionary>, isOrder : false}
			,{display : ' 返回时间 ', code : 'retTime', width : 120, align : 'left', type:'date', format:'yyyy-MM-dd hh:mm:ss', isOrder : false}
			],
			url : "${basePath}extInterfaceLog/queryListExtInterfaceLog?parentId=1",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'radio',
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
	//查看明细
	function viewData(vId){
		var dialogStruct={
				'display':contextRootPath+'/extInterfaceLog/prepareExecute/toView?id='+vId,
				'width':800,
				'height':500,
				'title':'查看明细',
				'buttons':[
				 {'text':'关闭','isClose':true}
				]
		};
			
		var dialogView = jyDialog(dialogStruct).open();
	}
</script> 
</html>
