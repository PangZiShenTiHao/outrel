<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/WEB-INF/tlds/app.tld" prefix="app"%>
<%
	String path = request.getContextPath();
	String basePath = path+"/";
	String jspPath = basePath;
%>


<script src="<app:contextPath/>/js/threeJs/jquery/jquery.js"></script>
<link rel="stylesheet" href="<%=basePath %>js/plat/base/base.css/"/>
<style type="text/css">
	TD {word-break:break-all;}
</style>
<script>
function executeSql(){
	var sql=$("#sqlStr").val();
	debugger;
	sql=$.trim(sql);
	if(!sql || sql==undefined){
		alert("请输入待执行的sql");
		return;
	}
	$.ajax({
		type:"POST",
		dataType:"JSON",
		url:"<app:contextPath/>/api/staticFilesUpdate/executSql",
		data:{"sqlStr":sql},
		success:function(msg){
			debugger;
			var data=msg.data;
			//操作成功后
			var tableStr=new Array();
			tableStr.push("<tr><th valign='center'>执行sql</th><th width='100' valign='left'>执行结果</th></tr>")
			if(data){
				for(var i=0;i<data.length;i++){
					tableStr.push("<tr><td>"+data[i].key+"</td><td>"+data[i].result+"</td></tr>");
				}
			}
			$("#resultTable").html(tableStr.join(""));
		}
	});
}

function copyToClipboard(txt) {
	if (window.clipboardData) {
		window.clipboardData.clearData();
		clipboardData.setData("Text", txt);
		alert("复制成功！");

	} else if (navigator.userAgent.indexOf("Opera") != -1) {
		window.location = txt;
	} else if (window.netscape) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		} catch (e) {
			alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'");
		}
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip)
			return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans)
			return;
		trans.addDataFlavor("text/unicode");
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		var copytext = txt;
		str.data = copytext;
		trans.setTransferData("text/unicode", str, copytext.length * 2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip)
			return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
		alert("复制成功！");
	}
}






</script>









<div id="formPageSwap">

<form id="addForm" name="addForm" isCheck="true" action="">

	<label>执行sql</label>
	<textarea name="sqlStr" id="sqlStr" cols="50" rows="20">
	</textarea>
	<input type="button" onclick="executeSql()" value="执行"/>
	<table id="resultTable"  class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1">

	</table>
</form>
</div>

