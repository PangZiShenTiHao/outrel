<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<html>
  <head>
	<script type="text/javascript">
	
	function tableToJson(){
		var colums;
		//判断是否自定义导出字段
		if(typeof(exporttable) == 'undefined' || exporttable == undefined){
			colums = iframe.iframeObj["table"].columns;
		}else{
			colums = exporttable.columns;
		}
		return '{"statuses":'+JSON.stringify(colums)+'}';
	}
	
	function exportTxt(){
		var params = iframe.iframeObj["form"].serialize();
		$('#tableJson').val(tableToJson());
		$('#tableUrl').val(iframe.iframeObj["table"].url);
		$('#targetName').val(document.title);
		$('#exportTxtForm').attr('action',contextRootPath+'/exportTxt/exportDataByReflect?'+params);
		$('#exportTxtForm')[0].submit();
	}
	</script>
  </head>
  <body>
    	<form action="" target='_blank' id='exportTxtForm' method='post'>
			<input name='tableJson' id='tableJson' type='hidden'/>
			<input name='targetName' id='targetName' type='hidden'/>
			<input name='tableUrl' id='tableUrl' type='hidden' value=''/>
		</form>
  </body>
</html>
