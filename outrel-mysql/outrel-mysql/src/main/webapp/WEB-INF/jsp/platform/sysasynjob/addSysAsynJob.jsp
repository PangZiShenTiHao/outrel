<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript2.jsp" %>
<div id="formPageSwap">
  <br/>
	<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysasynjob.controller.SysAsynJobController">
	 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
		<tr>
		  <th> 业务实体bea：</th>
		  <td > 
		  <input type="text" class="text" id="dtobeanId" name="beanId" notNull="false" maxLength="50" value="" checkChName="业务实体bea" />
		  </td>
		  <th> 业务表主键ID：</th>
		  <td > 
		  <input type="text" class="text" id="dtobizKeyId" name="bizKeyId" notNull="false" maxLength="50" value="" checkChName="业务表主键ID" />
		  </td>
		</tr>
		<tr>
		  <th> 任务状态（1：：</th>
		  <td > 
		  <input type="text" class="text" id="dtojobState" name="jobState" notNull="false" maxLength="1" value="" checkChName="任务状态（1：" />
		  </td>
		  <th> 任务调用开始时：</th>
		  <td > 
		  <input type="text" class="text" id="dtostartTime" name="startTime" notNull="false" maxLength="6" value="" checkChName="任务调用开始时" />
		  </td>
		</tr>
		<tr>
		  <th> 任务调用结束时：</th>
		  <td > 
		  <input type="text" class="text" id="dtoendTime" name="endTime" notNull="false" maxLength="6" value="" checkChName="任务调用结束时" />
		  </td>
		  <th> 任务异常描述：</th>
		  <td > 
		  <input type="text" class="text" id="dtoerrorRemark" name="errorRemark" notNull="false" maxLength="2000" value="" checkChName="任务异常描述" />
		  </td>
		</tr>
		<tr>
		  <th> 数据有效性(1：</th>
		  <td > 
		  <input type="text" class="text" id="dtovalid" name="valid" notNull="false" maxLength="1" value="" checkChName="数据有效性(1" />
		  </td>
		  <th> 任务是否正在执：</th>
		  <td > 
		  <input type="text" class="text" id="dtojobRun" name="jobRun" notNull="false" maxLength="1" value="" checkChName="任务是否正在执" />
		  </td>
		</tr>
		<tr>
		  <th> 重复执行次数：</th>
		  <td > 
		  <input type="text" class="text" id="dtorunCun" name="runCun" notNull="false" maxLength="11" value="" checkChName="重复执行次数" />
		  </td>
		  <th> 数据新增时间：</th>
		  <td > 
		  <input type="text" class="text" id="dtocreateTime" name="createTime" notNull="false" maxLength="6" value="" checkChName="数据新增时间" />
		  </td>
		</tr>
		<tr>
		  <th> 备注：</th>
		  <td colspan="3"> 
		  <input type="text" class="text" id="dtoremark" name="remark" notNull="false" maxLength="100" value="" checkChName="备注" />
		  </td>
		</tr>
	  </table>
	<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
	</form>
</div>

<script type="text/javascript">
   $(document).ready(function(){
   		checkedInit();
	});
</script>
