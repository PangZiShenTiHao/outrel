<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title></title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script src="<%=basePath%>js/platform/sysarea/sysArea.js"></script> 
	<style>
		.demo{color:red;}
	</style>
</head>
  
  
<body style="background-color:#FFFFFF">
<div class="info">
	<div id="test">
    </div> 
    
</div>

<div style="text-align:left;margin:30px 30px">

	---------------------------实例说明--------------------------------
	<!-- 
		
		@author
	    @description :查询城市标签使用实例DEMO
	
	 -->
	<br>
	<br/>
	<span class="demo"><strong>一.默认返回文本类型：</strong></span>
	<br/>
	<br/>
		1.<sysarea:searchArea cityCode="110105"></sysarea:searchArea>
	<br/>
	<br/>
		2.<sysarea:searchArea cityCode="150500"></sysarea:searchArea>
	<br/>
	<br/>
	<span class="demo"><strong>二.返回JSON：</strong></span>
	<br/>
	<br/>
	<span class="demo">1.传入区县(直辖市返回二级)编码 (朝阳区：110105)：</span>
	<br/>
	<br/>
		<sysarea:searchArea cityCode="110105" dataType="json"></sysarea:searchArea>
	<br/>
	<br/>
	<span class="demo">2.传入区县(非直辖市返回三级)编码 (南和县：130527)：</span>
	<br/>
	<br/>
	<sysarea:searchArea cityCode="130527" dataType="json"></sysarea:searchArea>
	<br/>
	<br/>
	<span class="demo">3.传入城市编码 (通辽市：150500)：</span>
	<br/>
	<br/>
	<sysarea:searchArea cityCode="150500" dataType="json"></sysarea:searchArea>
	<br/>
	<br/>
	<span class="demo">4.传入省级编码 (湖北省：420000)：</span>
	<br/>
	<br/>
	<sysarea:searchArea cityCode="420000" dataType="json"></sysarea:searchArea>
	<br/>
	<br/>
	<span class="demo"><strong>三.html格式：</strong></span>
	<br/>
	<br/>
	<span class="demo">1.传入区县(直辖市返回二级)编码 (朝阳区：110105) 且实现自定义的onchange事件：</span>
	<br/>
	<br/>
		<sysarea:searchArea cityCode="110105" dataType="html" provinceId="p1" cityId="c1" countryId="cry1"></sysarea:searchArea>
	<br/>
	<br/>
	<span class="demo">2.传入区县(非直辖市返回三级)编码 (南和县：130527)：</span>
	<br/>
	<br/>
	<sysarea:searchArea cityCode="130527" dataType="html" provinceId="p2"></sysarea:searchArea>
	<br/>
	<br/>
	<span class="demo">3.传入城市编码 (通辽市：150500)：</span>
	<br/>
	<br/>
	<sysarea:searchArea cityCode="150500" dataType="html" provinceId="p3"></sysarea:searchArea>
	<br/>
	<br/>
	<span class="demo">4.传入省级编码 (湖北省：420000)：</span>
	<br/>
	<br/>
	<sysarea:searchArea cityCode="420000" dataType="html" provinceId="p4"></sysarea:searchArea>
	<br/>
	<br/>
	<br/>
	<br/>
	<span class="demo">5.传入省级编码 (湖北省：420000)且level=2只显示2级：</span>
	<br/>
	<br/>
	<sysarea:searchArea cityCode="420000" dataType="html" provinceId="p5" level="2"></sysarea:searchArea>
	<br/>
	<br/>
</div>
</body>
<script type="text/javascript">
   $(function(){
	  //绑定onchange事件,选择省份，根据ID，查询下所有城市，重新加载城市下拉列表，两个方法待封装
	  $('#p1').bind('change',function(){
		  
		  var parentId =  $(this).find("option:selected").attr("id")
		    $.ajax({
				url: contextRootPath+'/sysArea/queryListSysAreaByParentId',
				type: 'POST',
				async:false,
				dataType:'json',
				data:{pId:parentId,level:3},
				error: function(){jyDialog({"type":"error"}).alert('获取城市列表错误');},
				success: function(result){
							var citys = result.data;
							 $('#c1').html("<option value=\"\">请选择城市</option>");
							 $('#cry1').html("<option value=\"\">请选择区县</option>");
							for(var j=0;j<=citys.length-1;j++){
							      $('#c1').append('<option id="'+citys[j].id+'" value="'+citys[j].areaCode+'">'+citys[j].areaName+'</option>');
							}
						}
				});
	  });
	  
	$('#c1').bind('change',function(){
		  
		  var parentId =  $(this).find("option:selected").attr("id")
			
		    $.ajax({
				url: contextRootPath+'/sysArea/queryListSysAreaByParentId',
				type: 'POST',
				async:false,
				dataType:'json',
				data:{pId:parentId,level:3},
				error: function(){jyDialog({"type":"error"}).alert('获取城市列表错误');},
				success: function(result){
							var citys = result.data;
							 $('#cry1').html("<option value=\"\">请选择区县</option>");
							for(var j=0;j<=citys.length-1;j++){
							      $('#cry1').append('<option id="'+citys[j].id+'" value="'+citys[j].areaCode+'">'+citys[j].areaName+'</option>');
							}
						}
				});
	  });
	  
   	});
</script>
</html>
