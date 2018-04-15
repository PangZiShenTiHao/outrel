<%@ page contentType="text/html; charset=UTF-8" %>
<div class="expandSwap">	
	<div style="display:none;">
		<table>
			<!-- 工作流相关参数信息start -->
			<tr><th > 指定参与者 ：</th>
			  	<td align="left" >
				  	<!-- 如果 paramUserId 值是-1 或0  则完成待办任务时 系统会按配置的业务规则  自动指定一个参与者  -->
				  	<input type="hidden" maxlength="10" id="nameInfo" name="nameInfo" value="-1"  />
				  	<!-- 如果 paramUserId 值是-1 或0  则完成待办任务时 系统会按配置的业务规则  自动指定一个参与者  -->
				  	<input type="hidden"  maxlength="50" id="dtoparamUserId" name="paramUserId" value="" />
				   	<input type="hidden"  maxlength="50" id="foreachJoinId" name="foreachJoin" value="N" />
			  	</td>
			  	<th> 任务ID ：</th>
			  	<td>
			  	<input type="hidden"  readonly="readonly"  id="disTaskId" name="disTaskId" value="<c:out value="${taskId }"/>" />
				 	<!-- 必须参数 不可变动start -->
				  	<input type="hidden"  id="dtotaskId" name="taskId" value="<c:out value="${taskId }"/>" />
				   	<input type="hidden"  id="processInsId" name="processInsId" value="<c:out value="${processInsId}" />" />
				   	<input type="hidden"  id="acitityName" name="acitityName" value="<c:out value="${acitityName}" />" />
				   	<input type="hidden"  id="bizTabId" name="bizTabId" value="<c:out value="${bizTabId}" />" />
				   	<input type="hidden"  id="bizTabName" name="bizTabName" value="<c:out value="${bizTabName}" />" />
				   	<input type="hidden"  id="bizInfId" name="bizInfId" value="<c:out value="${bizInfId}" />" />
				   	<!-- 必须参数 不可变动end -->
			  	</td>
			  	<th> 流程流转方向 ：</th>
			  	<td><select id="dtoturnDirection" name="turnDirection"  style="width:150px;"><option value="">--默认--</option></select></td>
			</tr>
			<tr>
				<th>流程参数信息 ：</th>
			  	<td colspan="5">
				<textarea class="validate[maxSize[500]] input_hui"  id="dtootherParamJavaCode" name="otherParamJavaCode" rows="5" cols="120" title='' ></textarea>
			   	</td>
			</tr>
		</table>
	</div>
	<!-- 下一节点 task 选人规则的配置start -->
	<input type="hidden" value="" id="partnerRuleJsonId"/>
	<!-- 下一节点 task 选人规则的配置 end-->
	
	
	
	<!-- 意见列表start -->
	<!-- <p align="left"><a class="r" id="showOptionInfoBtn" style="cursor:pointer;">∧隐藏意见信息</a><br></p> -->
	<div style="width: 100%;" align="center">
		<iframe id="bizOptionIframeId" name="bizOptionIframeName" src="${basePath}component/jbpm/bizOption/queryBizOption.jsp?bizTabId=${bizTabId}" width="100%" width="100%" frameborder="no"></iframe>
	</div> 
	<!-- 意见列表end -->
	
	</div>
</div>
<!-- 工作流相关参数信息end -->



<script type="text/javascript">
$(document).ready(function() {
	//debugger;
	//初始化 流程流转方向 下来框
	//JBPM.common.initProInsToDoTurnDirection();
	//注册 显示 隐藏 功能
	//$("#showOptionInfoBtn").click(clickTopOptionsInfo);
})


</script>



