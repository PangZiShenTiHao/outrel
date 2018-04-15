<%@ page language="java" import="java.util.*,com.platform.util.ConstantBeanId" pageEncoding="UTF-8"%>
<%@ include file="/common.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>修改子表信息</title>
 <%@ include file="/jscommon2.jsp" %>
<link href="${'$'}{basePath }css/style.css" rel="stylesheet" type="text/css">
  </head>
  <body style="background-color:#FFFFFF">
  <br/>
<br/>
<fieldset class="search_fieldset2 mag_top">
<legend>${jspDTO.tableComments}信息</legend>
<iframe  id="subInfoIframeOne" name="subInfoIframeOne" src='${'$'}{basePath }${jspDTO.jspPrefix}/${jspDTO.modelName}/query${jspDTO.formated_tab_name}.jsp?subIframeId=subInfoIframeOne&MAIN_ID=${'$'}{param.MAIN_ID }' width="100%" frameborder="no" >
</iframe>

</fieldset>

<span id='appendMoreSubTabble'></span>

<table width="96%" border="0" align="center" >
<tr><td align="center" colspan="6" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="6" class="my_buttons">
  		<input id="saveBtn" type="button" value="返回上一页" onclick="backToPage('${'$'}{param.urlJspOfTab }')" />
        <input id="saveBtn" type="button" value="保存" onclick="saveData('${'$'}{param.urlJspOfTab }')" />
        <input id="restBtn" type="button" value="关闭" onclick="closeWindow('${'$'}{param.urlJspOfTab }')" />
  </td>
</tr>
</table>

<br/>
<script type="text/javascript">

//最后一步保存操作
function saveData(v_urlJspOfTab){
	//可以添加提交表单事件
	closeWindow(v_urlJspOfTab);
}
//关闭主子表新增页面 并刷新其查询页面
function closeWindow(v_urlJspOfTab){
	var v_tabid = window.parent.$("#framecenter").contents().find(".l-selected").attr("tabid");
	$(window.parent.document).find("iframe").each(function(i){
		var v_src = $(this).attr("src");
		if(v_src!="" && v_src.indexOf(v_urlJspOfTab) >0){
			if(window.parent.$("#"+$(this).attr("id")).get(0)!=null){
				window.parent.$("#"+$(this).attr("id")).get(0).contentWindow.queryData('Y'); //控制父页面tab
			}
		}
	
	});
	//关闭当前选中的tab页
	window.parent.tab.removeTabItem(v_tabid);
}


function backToPage(v_urlJspOfTab){
	history.go(-1);
}
</script>
  </body>
</html>