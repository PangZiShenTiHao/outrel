<%@ page contentType="text/html; charset=UTF-8" %>

		
	<!-- 意见列表start -->
	<!-- <p align="left"><a class="r" id="showOptionInfoBtn" style="cursor:pointer;">∧隐藏意见信息</a><br></p>-->
	<div style="width: 100%;height: 99%"  align="center">
		<iframe id="bizOptionIframeId" name="bizOptionIframeName" src="${basePath}/component/jbpm/bizOption/queryBizOption.jsp?bizTabId=${bizTabId}" width="100%" width="100%" frameborder="no"></iframe>
	</div> 
	<!-- 意见列表end -->
	

<!-- 工作流相关参数信息end -->



<script type="text/javascript">
$(document).ready(function() {
	//初始化 流程流转方向 下来框
	JBPM.common.initProInsToDoTurnDirection();
	//注册 显示 隐藏 功能
	//$("#showOptionInfoBtn").click(clickTopOptionsInfo);
	expandToggle();
	$("#divSubBtnId input").each(function(){
		$(this).button();
	});
})


</script>



