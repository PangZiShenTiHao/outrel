<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript2.jsp" %>
<div id="formPageSwap">
  <br/>
	<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.syschanagedetail.controller.SysChanageDetailController">
	 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
		<tr>
		  <th> 信息变更表名称：</th>
		  <td > 
		  <input type="text" class="text" id="dtobizTableName" name="bizTableName" notNull="false" maxLength="25" value="" checkChName="信息变更表名称" />
		  </td>
		  <th> 表字段名称：</th>
		  <td > 
		  <input type="text" class="text" id="dtobizTableColum" name="bizTableColum" notNull="false" maxLength="25" value="" checkChName="表字段名称" />
		  </td>
		</tr>
		<tr>
		  <th> 变更信息描述：</th>
		  <td > 
		  <input type="text" class="text" id="dtochangeItemName" name="changeItemName" notNull="false" maxLength="50" value="" checkChName="变更信息描述" />
		  </td>
		  <th> 原值：</th>
		  <td > 
		  <input type="text" class="text" id="dtooldValue" name="oldValue" notNull="false" maxLength="100" value="" checkChName="原值" />
		  </td>
		</tr>
		<tr>
		  <th> 新值：</th>
		  <td > 
		  <input type="text" class="text" id="dtonewValue" name="newValue" notNull="false" maxLength="100" value="" checkChName="新值" />
		  </td>
		  <th> 原值描述：</th>
		  <td > 
		  <input type="text" class="text" id="dtooldShowvalue" name="oldShowvalue" notNull="false" maxLength="100" value="" checkChName="原值描述" />
		  </td>
		</tr>
		<tr>
		  <th> 新值描述：</th>
		  <td > 
		  <input type="text" class="text" id="dtonewShowvalue" name="newShowvalue" notNull="false" maxLength="100" value="" checkChName="新值描述" />
		  </td>
		  <th> 表主键ID：</th>
		  <td > 
		  <input type="text" class="text" id="dtofkBizId" name="fkBizId" notNull="false" maxLength="11" value="" checkChName="表主键ID" />
		  </td>
		</tr>
		<tr>
		  <th> 批次号/流程实：</th>
		  <td > 
		  <input type="text" class="text" id="dtobatNo" name="batNo" notNull="false" maxLength="50" value="" checkChName="批次号/流程实" />
		  </td>
		  <th> 变更是否生效（：</th>
		  <td > 
		  <input type="text" class="text" id="dtostate" name="state" notNull="false" maxLength="1" value="" checkChName="变更是否生效（" />
		  </td>
		</tr>
		<tr>
		  <th> 创建人：</th>
		  <td > 
		  <input type="text" class="text" id="dtocreateBy" name="createBy" notNull="false" maxLength="11" value="" checkChName="创建人" />
		  </td>
		  <th> 创建时间：</th>
		  <td > 
		  <input type="text" class="text" id="dtocreateTime" name="createTime" notNull="false" maxLength="6" value="" checkChName="创建时间" />
		  </td>
		</tr>
		<tr>
		  <th> 数据有效性：</th>
		  <td > 
		  <input type="text" class="text" id="dtovalid" name="valid" notNull="false" maxLength="1" value="" checkChName="数据有效性" />
		  </td>
		  <th> 备注：</th>
		  <td colspan="5"> 
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
