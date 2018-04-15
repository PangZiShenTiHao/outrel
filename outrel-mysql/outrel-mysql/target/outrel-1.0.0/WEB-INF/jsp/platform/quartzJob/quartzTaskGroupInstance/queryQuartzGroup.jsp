<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询任务分组定义表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}js/platform/quartzJob/quartzTaskGroupInstance/queryQuartzTaskGroupInstance.js"></script>
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		initFn();
	});
</script>

</head>
<body style="background-color:#FFFFFF">
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
			 {display : ' 分组编号 ', code : 'groupId', width : 200,  type:'text'}
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
			 {display : ' 分组编号 ', code : 'groupId', width : 100, align : 'left', type:'fun',
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick=viewData('"+obj.groupState+"')>"+obj.groupId+"</a>";
				    }	 
			 }
			,{display : ' 分组名称 ', code : 'groupName', width : 100, align : 'left', type:'text'}
			,{display : ' 执行批次', code : 'groupState', width : 200, align : 'left', type:'text'}
			,{display : ' 是否自动执行 ', code : 'autoExec', width : 100, align : 'left', type:'select',value:[
			                                                                                            {"value": "0", "text": "否"},
			                                                                                            {"value": "1", "text": "是"},
			                                                                                        ]}
			,{display : ' 执行时机', code : 'dealChance', width : 100, align : 'left', type:'select',value:[
			                                                                                            {"value": "day", "text": "日任务"},
			                                                                                            {"value": "year", "text": "年任务"},
			                                                                                        ]}
			,{display : ' 执行状态', code : 'isStop', width : 100, align : 'left', type:'select',value:[
			                                                                                            {"value": "0", "text": "暂停"},
			                                                                                            {"value": "1", "text": "运行"},
			                                                                                        ]}
			,{display : ' 执行结果', code : 'taskInsState', width : 100, align : 'left', type:'fun',
				value:function(obj){
					return obj.taskInsState==3?'待执行':(obj.taskInsState==2?'执行中':obj.taskInsState==1?'执行完毕':'异常');
				}
			}
			,{display : ' 任务创建时间 ', code : 'created', width : 150, align : 'left', type:'text'}
			,{display : ' 任务开始时间 ', code : 'taskStartTime', width : 150, align : 'left', type:'text'}
			,{display : ' 任务结束时间 ', code : 'taskEndTime', width : 150, align : 'left', type:'text'}
			,{display : '操作', code : 'modifier', width : 260, align : 'left', type:'link',value:[
                                                                                                   {"text":"暂停","action":pauseData},
                                                                                                   {"text":"断点恢复","action":resumeData},
                                                                                                   {"text":"重新执行","action":resumeData1},
                                                                                                   {"text":"自动执行","action":runAuto}
                                                                                                   ]}
		   ],
			url : "${basePath}quartzTaskGroupInstance/queryListQuartzGroup",
			toolbar:"",
			pageSize : 10,
			selectType : 'checkbox',
			isCheck : false,
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
