<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询SYS_ORG_USER</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 相关js方法 -->
<script type="text/javascript">
//页面加载完后 
$(document).ready(function(){
	initFn();
});

//查看明细
function viewData(version){
	var dialogStruct={
			'display':contextRootPath+'/synClient/prepareExecute/toSynDetail?version='+version,
			'width':850,
			'height':500,
			'title':'查看明细',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
	
//更新数据
function toUpData(version){
	var v_versions = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_versions == ""){
		jyDialog({"type":"info"}).alert("请选择待更新的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要更新选择的数据吗？",function(){
	     $.ajax({
            type:"POST",
            url:contextRootPath+"/synClient/udpateSysDataSyn?versions="+v_versions,
            success:function(msg){
            	msg = eval("("+msg+")");
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            		//清空redis缓存
            		cleanDataCache();
            	}
            }
        });
	   },"确认提示");
}
	
//同步银谷黄页用户组织机构数据
function toUpYgData(version){
	jyDialog({"type":"question"}).confirm("您确认要同步银谷黄页员工数据吗？",function(){
	     $.ajax({
            type:"POST",
            url:contextRootPath+"//system/impBaseOrgEmp/impBaseJSON",
            success:function(msg){
            	msg = eval("("+msg+")");
            	$("").newMsg({}).show(msg.msg);;
            }
        });
	   },"确认提示");
}

function toUpYgOrgData(version){
	jyDialog({"type":"question"}).confirm("您确认要同步银谷黄页组织数据吗？",function(){
	     $.ajax({
            type:"POST",
            url:contextRootPath+"//system/impBaseOrgEmp/impOrgBaseJSON",
            success:function(msg){
            	msg = eval("("+msg+")");
            	$("").newMsg({}).show(msg.msg);;
            }
        });
	   },"确认提示");
}
/*
 * 清空redis 业务数据缓存
 */
function cleanDataCache(){
	//清空redis 缓存
	try{
		$.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/sysConfig/cleanDataCache",
            success:function(msg){
            	//$("").newMsg({}).show(msg.msg);
            }
        });
	}catch(e){
		
	}
}
</script>

</head>
<body style="background-color:#FFFFFF">

	<!-- 列表按钮操作 start -->
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
			 <a href="javascript:void(0)" onclick="toUpData()" index="0">更新</a>
			 
			  <a href="javascript:void(0)" onclick="toUpYgData()" index="0">同步银谷黄页员工</a>
			  <a href="javascript:void(0)" onclick="toUpYgOrgData()" index="0">同步银谷黄页组织</a>
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
			 {display : ' 用户ID ', code : 'version', width : 200,  type:'text'}
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
			 {display : ' 修改概要 ', code : 'rowMsg', width : 500, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.version+")'>"+obj.rowMsg+"</a>";
				    }	 
			 }
			,{display : ' 修改时间 ', code : 'createDateFmt', width : 150, align : 'left', type:'text', isOrder : false}
		   ],
			url : "${basePath}synClient/queryListSysSyn",
			pageSize : 10,
			selectType : 'checkbox',
			isCheck : true,
			toolbar:"tableToolbar",
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure,"isNotQuery":true};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
</script> 
</html>
