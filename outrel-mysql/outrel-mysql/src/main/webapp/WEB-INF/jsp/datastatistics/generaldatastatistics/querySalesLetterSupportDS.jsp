<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <%@ taglib uri="/WEB-INF/tlds/productConf.tld" prefix="pc"%>
  <title>信销支持数据统计</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
	  </div>
<!-- 列表按钮操作 end -->
	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>

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
				{display : ' 放款机构 ', code : 'corpBrchCode', width : 200,  type:'select',value:<syscode:dictionary codeType="LOANFUNDS" type="json"></syscode:dictionary>}
				,{display : ' 产品类型 ', code : 'proId', width : 200,  type:'autocomplete', value:<pc:productTag type="json"></pc:productTag>}
				,{display : ' 期数', code : 'period', width : 200,  type:'select',value:<syscode:dictionary codeType="LOANPERIODS" type="json"></syscode:dictionary>}
				,{display : ' 进件日期 ', code : 'intoCreateDate', width : 200, type:'dbDate',isCompare:true}
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
				 {display : ' 业务状态 ', code : 'BIZ_STATE', width : 150, align : 'center', type:'text'}
				,{display : ' 业务数量 ', code : 'BIZ_CNT', width : 150, align : 'center', type:'text'}
				,{display : ' 合同金额合计(元) ', code : 'SIGN_AMOUNT', width : 150, align : 'right', type:'fun', value:function(obj){
					var val=obj.SIGN_AMOUNT;
					if(!isNaN(val)){
						val=jyTools.formatMoney(val);
					}
					return val;
				}}
				,{display : ' 放款金额合计(元) ', code : 'LOAN_AMOUNT', width : 150, align : 'right', type:'fun', value:function(obj){
					var val=obj.LOAN_AMOUNT;
					if(!isNaN(val)){
						val=jyTools.formatMoney(val);
					}
					return val;
				}}
		   ],
			url : "${basePath}generalDataStatistics/querySalesLetterSupportDS",
			toolbar:"tableToolbar",
			pageSize : 10,
			selectType : 'radio',
			isCheck : true,
			rownumbers : false,
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
