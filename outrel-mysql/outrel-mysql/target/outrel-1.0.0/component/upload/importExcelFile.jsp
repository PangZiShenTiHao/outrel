<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/WEB-INF/tlds/app.tld" prefix="app"%>
<script src="<app:contextPath/>/js/threeJs/jquery/jquery.js"></script>
<link href="<app:contextPath/>/js/threeJs/uploadFile/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<app:contextPath/>/js/threeJs/uploadFile/swfupload.js"></script>
<script type="text/javascript" src="<app:contextPath/>/js/threeJs/uploadFile/fileprogress.js"></script>
<script type="text/javascript" src="<app:contextPath/>/js/threeJs/uploadFile/handlers.js"></script>
<style type="text/css">
	.progressBarStatus{padding:10px  0px;}
	.tipCls{width:100%;height:20px;}
	.tpCls{text-align:right;color:red;}
</style>

<!------------------------------说明----------------------------------------
	此页面为导入excelDEMO页面，可根据需求进行复制调整
	一.JS引用:页面中可通过定义下面的函数进行引用
		var dialog_import = null;
		function importData(){
			var dialogStruct={
				'display':contextRootPath+'/component/upload/importExcelFile.jsp',
				'width':800,
				'height':400,
				'title':'导入数据',
				'isIframe':'true',
				'buttons':[{'text':'关闭','isClose':true}]
			};
			dialog_import =jyDialog(dialogStruct);
			dialog_import.open();
	
		}
	二.上传控制类：
		 通过参数 upload_url 定义controller,此例中的controller为ImportController
		 通过仿写ImportController方法中的excute方法，实现数据的导入
	           其中ImportController类中关键API接口为：		 
		1.构建头部,fieldName同DTO中属性名对应
			ExcelHeader excelHeader = new ExcelHeader();
			List<ExcelColumn> excelColumns = new ArrayList<ExcelColumn>();
			excelColumns.add(new ExcelColumn(1, "configName", "配置名称", true));
			excelColumns.add(new ExcelColumn(2, "configCode", "配置编码", true));
			excelColumns.add(new ExcelColumn(3, "configValue", "配置值", false));// 不进行导入的字段isImport为false即可
			excelHeader.setColumns(excelColumns);
		2.设置数据开始行数
			excelHeader.setRowCount(1);
		3.设置总的行数
			excelHeader.setTotalRows(51);
		4.设置需要进行数据转换的格式,map中的KEY值为fieldName
			Map<String, Map> excelColumnsConvertMap = new HashMap<String, Map>();
			Map<String, Integer> configCode = new HashMap<String, Integer>();
			configCode.put("是", 1);
			excelColumnsConvertMap.put("configCode", configCode);
			excelHeader.setColumnsConvertMap(excelColumnsConvertMap);
		5.导入数据到内存
			List<SysConfigDTO> dataOfimport = (List<SysConfigDTO>) template
					.importData(inputStream, SysConfigDTO.class, excelHeader);
		6.入库或其他操作自行完成
	三.上传成功后的操作可在js方法 uploadSuccess 中自定义
 -->


<script type="text/javascript">
	var upload;
	//文件ID集合
	var fileIdArr = [];
	$(function() {
		var settings = {
   			flash_url : "<app:contextPath/>/js/threeJs/uploadFile/swfupload.swf",
   			upload_url: "<app:contextPath/>/import/importFile;jsessionid=<%=request.getSession().getId()%>",	
   			use_query_string : true,
   			file_size_limit : "100 MB",
   			file_types : "*.xls;*.xlsx;",
   			file_types_description : "All Files",
   			file_upload_limit : 2,
   			file_queue_limit : 0,
   			custom_settings : {
   				progressTarget : "fsUploadProgress",
   				cancelButtonId : "btnCancel",
   				percentage:"percentage"
   			},
   			debug: false,
   			button_action:SWFUpload.BUTTON_ACTION.SELECT_FILES,
   			button_image_url : "<app:contextPath/>/images/upload.png",	
   			button_placeholder_id : "spanButtonPlaceHolder",
   			button_text: '<span class="theFont">浏览</span>',
   			button_text_style: ".theFont { font-size: 16; }",
			button_text_left_padding: 12,
			button_text_top_padding: 3,
   			button_width: 65,
   			button_height: 29,
   			//file_dialog_start_handler : fileDialogStart,
   			file_queued_handler : fileQueued,
   			file_queue_error_handler : fileQueueError,
   			file_dialog_complete_handler : fileDialogComplete,
   			upload_start_handler : uploadStart,
   			upload_progress_handler : uploadProgress,
   			upload_error_handler : uploadError,
   			upload_success_handler : uploadSuccess,
   			upload_complete_handler : uploadComplete
   		};

		upload = new SWFUpload(settings);
    });
    
    function uploadSuccess(file, serverData) {
    	 var result = eval("("+serverData+")");
    	 if(result.status=='ok'){
    		 try {
    				var progress = new FileProgress(file, this.customSettings.progressTarget);
    				progress.setComplete();
    				var arr = [];
    				arr.push("<span style='display:block;float:left; width:60px;'>导入成功 </span>");
    				progress.setStatus(arr.join(''));
    				progress.toggleCancel(false);
    			} catch (ex) {
    				this.debug(ex);
    			}
    	 }else{
    		 jyDialog({"type":"info"}).alert("导入失败");
    	 }
	}
	
	
    function delFile(id,obj){
    	jyDialog({"type":"question"}).confirm("删除将无法恢复,确认删除？",function(){
		     jyAjax("<app:contextPath/>"+deleteFile_url+id,'',function(result){
      			$(obj).closest('.progressContainer').remove();
      			delFileIdFromArr(id);
      		})  ;
		   },"确认提示");
    	/* if(window.confirm("删除将无法恢复,确认删除？")){
       		jyAjax("<app:contextPath/>"+deleteFile_url+id,'',function(result){
      			$(obj).closest('.progressContainer').remove();
      			delFileIdFromArr(id);
      		})     		
    	} */
    }
    
    
    function delFileIdFromArr(id){
    	for(var i=0;i<fileIdArr.length;i++){
    		if(fileIdArr[i] == id){
    			fileIdArr.splice(i,1);
    			break;
    		}
    	}
    }
    
    
    //返回附件ID
    function getFileIds(){
    	return fileIdArr.join(',');
    }
    
    
</script>
<div id="content">
	<div class="tipCls">
		<div></div>
		<div class="tpCls"><span>模板下载：</span><a href="<app:contextPath/>/import/download">模板.xls</a></div>
	</div>
	<div class="uploadCls">
			<form id="form1" method="post" enctype="multipart/form-data">
				<div class="fieldset flash" id="fsUploadProgress">
					<span class="legend">文件上传</span>
				</div>
				<div style="padding-left: 5px;">
					<span id="spanButtonPlaceHolder"></span>
		            <input id="btnCancel" type="button" style="display:none" value="取消上传" onclick="cancelQueue(upload);" style="margin-left: 2px; height: 22px; font-size: 8pt;"/>
				</div>
			</form>
	</div>
</div>

