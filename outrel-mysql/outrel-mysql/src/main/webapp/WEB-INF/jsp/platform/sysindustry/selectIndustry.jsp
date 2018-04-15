<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>行业、职位选择</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <link rel="stylesheet" href="${basePath}js/threeJs/industry/industry.css">
  <script src="${basePath}js/threeJs/industry/drag.js"></script>
  <script src="${basePath}js/threeJs/industry/funtype_arr.js"></script>
  <script src="${basePath}js/threeJs/industry/funtype_func.js"></script>
  <script src="${basePath}js/threeJs/industry/industry_arr.js"></script>
  <script src="${basePath}js/threeJs/industry/industry_func.js"></script>
<script type="text/javascript">
$(function(){
	$("#sysIndustryName").bind('click',function(){
		IndustrySelect_2();
	});
	
	$("#sysFuncName").bind('click',function(){
		funtypeSelect_2();
	});
});
</script>
</head>
<body style="background-color:#FFFFFF">


<center style="margin-top:200px;">
	<input id="btn_IndustryID_2" type="button" value="请选择行业" onclick="IndustrySelect_2()" />
	<input id="IndustryID_2" type="hidden" name="IndustryID_2" value="" />单选

<br /><br /><br /><br />

	<input id="btn_FuntypeID_2" type="button" value="请选择职能类别" onclick="funtypeSelect_2()" />
	<input id="FuntypeID_2" type="hidden" name="FuntypeID_2" value="" />单选
	
	
	<br /><br />
	-------------------------------------------------------------------------------------------
	<br /><br />
	
	<input type="text" class="text" id="sysIndustryName"
			name="sysIndustryName" notNull="true" readonly="true" value="请选择行业"/>
	<br /><br /><br /><br />
	<input type="text" class="text" id="sysFuncName"
			name="sysFuncName" notNull="true"  readonly="true" value="请选择职位"/>
	
</center>
<!-- <br /><br />

	<input id="btn_IndustryID" type="button" value="请选择行业" onclick="IndustrySelect()" />
	<input id="IndustryID" type="hidden" name="IndustryID" value="" />多选

<br /><br /> -->

<!-- 	<input id="btn_FuntypeID" type="button" value="请选择职能类别" onclick="funtypeSelect()" />
	<input id="FuntypeID" type="hidden" name="FuntypeID" value="" />多选

<br /><br /> -->

<!-- alpha div -->
<div id="maskLayer" style="display:none">
<iframe id="maskLayer_iframe" frameBorder=0 scrolling=no style="filter:alpha(opacity=50)"></iframe>
<div id="alphadiv" style="filter:alpha(opacity=50);-moz-opacity:0.5;opacity:0.5"></div>
	<div id="drag">
		<h3 id="drag_h"></h3>
		<div id="drag_con"></div><!-- drag_con end -->
	</div>
</div><!-- maskLayer end -->
</div>
<!-- alpha div end -->
<div id="sublist" style="display:none"></div>
</body>
</html>
