<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>统计业务系统节点错误日志</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/threeJs/chart/echarts.js"></script>
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
<!-- 列表按钮操作 end -->

	
	<!-- 页面初始化 需要的 div -->
	<div id="content">
	<form id="queryDataForm" action="${basePath}sysAppErrorCount/queryListSysAppErrorCount" method="post">
	<div class="field"> 
	<label for="speed" class="fieldName">按:</label>
	<select id="ctimeType" name="ctimeType" onchange="changeCtime()">
	<option value="0">时/日</option>
	<option value="1" >天/月</option>
	</select>
	</div>
	<div class="field"> 
	<label for="speed" class="fieldName">时间:</label>
	<input type="text"  readonly="readonly" id="ctime" name="ctime"  />
	</div>
	<div class="field"> 
	<label for="speed" class="fieldName">系统标识:</label>
	<syscode:dictionary id="appFlag" name="appFlag" codeType="SYSTEMFLAG" type="select"/>
	</div>
	<div class="field"> 
	<label for="speed" class="fieldName">级别:</label>
	<syscode:dictionary id="logLevel" name="logLevel" codeType="LOG_LEVEL" type="select"/>
	</div>
	<div class="searchBtnC" >
	<input id="tjsearchBtn" type="button" value="查询" />
	 </div>
	 <div style="height:20px;clear:both"></div>
	<div id="main" style="height:400px;clear:both"></div>
	</form>
	</div>

</body>
<!-- 相关js方法 -->	
<script>
	var type_month = "1";
	var type_day = "0";
	//系统标识一维数组 常量
	var appFlagDic = <syscode:dictionary id="appFlag" name="appFlag" codeType="SYSTEMFLAG" type="json"/>;
	var appFlagDicNames = [];
	$.each(appFlagDic,function(k,l){
		if(l.value != ''){
			appFlagDicNames.push(l.text);
		}
		
	});
	//将传入系统编码显示名称
	function appFlagValue(v){
		var r = '';
		$.each(appFlagDic,function(k,l){
			if(l.value != '' && l.value == v){
				r = l.text;
				return ;
			}
			
		});
		return r;
	}
	
</script> 
<script type="text/javascript" src="${basePath}js/platform/sysapperrorinfo/countSysAppErrorInfo.js"></script>
</html>
