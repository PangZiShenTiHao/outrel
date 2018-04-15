<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<html>
  <head>
	<script type="text/javascript">
	
	function toJson(){
		var colums;
		
		//判断是否自定义导出字段
		if(typeof(exporttable) == 'undefined' || exporttable == undefined){
			colums = iframe.iframeObj["table"].columns;
		}else{
			colums = exporttable.columns;
		}
		
		return '{"statuses":'+JSON.stringify(colums)+'}';
	}
	
	function exportExcel(){
		var params = iframe.iframeObj["form"].serialize();
		$('#json').val(toJson());
		$('#url').val(iframe.iframeObj["table"].url);
		$('#totalRows').val(iframe.iframeObj["table"].totalRows);
		$('#currentPage').val(iframe.iframeObj["table"].getPageIndex());
		$('#pageSize').val(iframe.iframeObj["table"].getPageSize());
		$('#fileName').val(document.title);
		//判断导出列时间是否包含时分秒
		if(typeof(isTimeFlag) == 'undefined' || isTimeFlag == undefined){
			$('#isTime').val('false');
		}else{
			$('#isTime').val(isTimeFlag);
		}
		
		$('#exportForm').attr('action',contextRootPath+'/exportExcel/exportDataByReflect?'+params);
		$('#exportForm')[0].submit();
	}
	</script>
  </head>
  <body>
    	<form action="" target='_blank' id='exportForm' method='post'>
		<input name='json' id='json' type='hidden'/>
		<input name='sName'  type='hidden' value='shell'/>
		<input name='fileName' id='fileName' type='hidden' value='测试'/>
		<input name='url' id='url' type='hidden' value=''/>
		<input name='totalRows' id='totalRows' type='hidden' value=''/>
		<!--isAll=false时， currentPage，pageSize生效  -->
		<input name='currentPage' id='currentPage' type='hidden' value='1'/>
		<input name='pageSize' id='pageSize' type='hidden' value='10'/>
		<input name='isAll' id='isAll' type='hidden' value='true'/>
		<input name='isTime' id='isTime' type='hidden' value='false'/>
		<input name='isCombox' id='isCombox' type='hidden' value='true'/>
		<!-- 设置默认最大导出至为10000条 -->
		<input name='maxTotalRows' id='maxTotalRows' type='hidden' value=""/>
	</form>
  </body>
</html>
