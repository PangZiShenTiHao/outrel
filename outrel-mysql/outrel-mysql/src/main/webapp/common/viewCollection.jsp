<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<script type="text/javascript">

//页面加载完后 
$(document).ready(function(){
	initFnCollectRecord();//催收记录
	initFnTcl();//约定
	$("#collectRecord > div").removeClass("resizable");
	$("#tclContent > div").removeClass("resizable");
	//$("#telContent").removeAttr("src");
});
</script>



<div class="expandSwap">
	<div class="expandTitle" align="left"><span class="text" >催收记录信息</span><span class="expandBtn"></span></div>
	<div class="expandContent">

	<div id="collectRecord" style="width:100%;" align="left"></div>
	
	
	<div id="tclContent" style="width:100%;" align="left"></div>
	
	
	</div>
</div>


<script type="text/javascript">
var iframe;
//初始化 查询页面元素
function initFnCollectRecord(){
	
	//定义工具条	
	var toolbar={
		title:"<div style='text-align:left'>催收记录信息</div>"
	}
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns : [
		 {display : ' 催收时间 ', code : 'baseExt2', width : 100, align : 'left', type:'date', isOrder : false	}
		,{display : ' 催收类型 ', code : 'baseExt3', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 与客户关系 ', code : 'baseExt4', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 催收对象姓名 ', code : 'contacterName', width : 100,  type:'text'}
		,{display : ' 联系电话 ', code : 'contactPhone', width : 150, align : 'left', type:'text', isOrder : false}
		,{display : ' 催收结论 ', code : 'baseExt5', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 备注 ', code : 'collectContent', width : 150, align : 'left', type:'text', isOrder : false}
		],
		url : "${basePath}laTCollectRecord/queryListLaTCollectRecord?contractId=${dto.contractId}",
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
	var searchIframe={"toolbar":toolbar,"table":tableStructure};	
	//初始化 form 表单 table 列表 及工具条 
	iframe=$("#collectRecord").newSearchIframe(searchIframe);
	iframe.show();
}



var iframeTcl;
//初始化 查询页面元素
function initFnTcl(){
	
	//定义工具条	
	var toolbar={
		title:"<div style='text-align:left'>约定处理记录</div>"
	}
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns : [
		 {display : ' 约定时间 ', code : 'datAdd', width : 100, align : 'left', type:'date', isOrder : false	}
		,{display : ' 创建人 ', code : 'createUserNameExt', width : 100, align : 'left', type:'text', isOrder : false}
		,{display : ' 创建时间 ', code : 'createTime', width : 100, align : 'left', type:'date', isOrder : false}
		,{display : ' 备注 ', code : 'tclMemo', width : 613, align : 'left', type:'text', isOrder : false}
		],
		url : "${basePath}tclPopup/queryListLaTTclPopup?contractId=${dto.contractId}",
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
	var searchIframe={"toolbar":toolbar,"table":tableStructure};	
	//初始化 form 表单 table 列表 及工具条 
	iframeTcl=$("#tclContent").newSearchIframe(searchIframe);
	iframeTcl.show();
}
</script>


