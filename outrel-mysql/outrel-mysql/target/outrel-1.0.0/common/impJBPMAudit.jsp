<%@ page contentType="text/html; charset=UTF-8" %>
<style>
#btns{
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		z-index: 5;
		text-align: center;
		padding-right: 10px;
	}
</style>
 
	<table class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1">
	<!--  <tr>
	  <th width="20%"> 系统在该环节的描述：</th>
	  <td width="80%"><input name="systemActiveInfo" id="systemActiveInfoId" maxlength="100" value=""/></td>
	</tr>-->
	<tr>
	  <th> 意见信息：</th>
	  <td> <textarea rows="5" cols="85" id="optionRemarkId" name="optionRemark" maxlength="1000" notNull="false"></textarea></td>
	</tr>
	<tr>
		<td  colspan="2">
			<!-- 工作流按钮start -->
			<div id="divSubBtnId"  class="expandToolbar"></div>
			<!-- 工作流按钮end -->
		</td>
	</tr>
	</table>
	
 
				  	<input type="hidden" maxlength="10" id="nameInfo" name="nameInfo" value="-1"  />
				  	<!-- 如果 paramUserId 值是-1 或0  则完成待办任务时 系统会按配置的业务规则  自动指定一个参与者  -->
				  	<input type="hidden"  maxlength="50" id="dtoparamUserId" name="paramUserId" value="" />
				   	<input type="hidden"  maxlength="50" id="foreachJoinId" name="foreachJoin" value="N" />
 
			  		<input type="hidden"  readonly="readonly"  id="disTaskId" name="disTaskId" value="<c:out value="${taskId }"/>" />
				 	<!-- 必须参数 不可变动start -->
				  	<input type="hidden"  id="dtotaskId" name="taskId" value="<c:out value="${taskId }"/>" />
				   	<input type="hidden"  id="processInsId" name="processInsId" value="<c:out value="${processInsId}" />" />
				   	<input type="hidden"  id="acitityName" name="acitityName" value="<c:out value="${acitityName}" />" />
				   	<input type="hidden"  id="bizTabId" name="bizTabId" value="<c:out value="${bizTabId}" />" />
				   	<input type="hidden"  id="bizTabName" name="bizTabName" value="<c:out value="${bizTabName}" />" />
				   	<input type="hidden"  id="bizInfId" name="bizInfId" value="<c:out value="${bizInfId}" />" />
					<input type="hidden" value="" id="partnerRuleJsonId"/>
				   	<!-- 必须参数 不可变动end -->
 				<div style="display:none;">
			  	 	<select id="dtoturnDirection" name="turnDirection"  style="width:150px; "><option value="">--默认--</option></select> 
					<textarea class="validate[maxSize[500]] input_hui"  id="dtootherParamJavaCode" name="otherParamJavaCode" rows="5" cols="120" title='' ></textarea>
				 </div>
</div>
 

<script type="text/javascript">
$(document).ready(function() {
	//初始化 流程流转方向 下来框
	//JBPM.common.initProInsToDoTurnDirection();
	//注册 显示 隐藏 功能
	//$("#showOptionInfoBtn").click(clickTopOptionsInfo);
	//重绘按钮样式
	$("#divSubBtnId").find("input").each(function(){
		$(this).button();
	});
	
})


</script>



