<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/app" prefix="app"%>
<script src="<app:contextPath/>/js/threeJs/jquery/jquery.js"></script>
<link href="<app:contextPath/>/swfupload/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<app:contextPath/>/swfupload/swfupload.js"></script>
<script type="text/javascript" src="<app:contextPath/>/swfupload/fileprogress.js"></script>
<script type="text/javascript" src="<app:contextPath/>/swfupload/handlers.js"></script>
<style type="text/css">
	.progressBarStatus{
		padding:10px  0px;
	}
</style>
<script type="text/javascript">
	var upload;
	//文件ID集合
	var fileIdArr = [];
	var upload_url = "";
	$(function() {
		var settings = {
   			flash_url : "<app:contextPath/>/swfupload/swfupload.swf",
   			upload_url: "<app:contextPath/>"+upload_url + "${param.url}",	
   			post_params: {"jsessionid": "<%=request.getSession().getId()%>"},  
   			use_query_string : true,
   			file_size_limit : "100 MB",
   			file_types : "*.*",
   			file_types_description : "All Files",
   			file_upload_limit : 50,
   			file_queue_limit : 0,
   			custom_settings : {
   				progressTarget : "fsUploadProgress",
   				cancelButtonId : "btnCancel",
   				percentage:"percentage"
   			},
   			debug: false,

   			button_image_url : "<app:contextPath/>/images/upload.png",	
   			button_placeholder_id : "spanButtonPlaceHolder",
   			button_text: '<span class="theFont">浏览</span>',
   			button_text_style: ".theFont { font-size: 16; }",
			button_text_left_padding: 12,
			button_text_top_padding: 3,
   			button_width: 65,
   			button_height: 29,
   			
   			file_dialog_start_handler : fileDialogStart,
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
    	if(result.msg!="" && result.msg!=undefined){
    		jyDialog().alert(result.msg,"警告:");
    		return ;
    	} 
    	fileIdArr.push(result.id);
		try {
			var progress = new FileProgress(file, this.customSettings.progressTarget);
			progress.setComplete();
			var arr = [];
			arr.push("<span style='display:block;float:left; width:60px;'>上传成功 </span>");
			arr.push("<span style='display:block;float:left; width:60px;'>size:"+result.size+"</span>");
			var downloadUrl = result.url+"?download=yes";
			arr.push("<span style='display:block;float:left; width:60px;'><a  href='"+downloadUrl+"'>下载</a></span>");
			arr.push("<span style='display:block;float:left; width:60px;'><a  href='javascript:void(0);' onclick=delFile("+result.id+",this)>删除</a></span>");
			var url = '';
			if(result.suffix == 'pdf'){
				arr.push("<a style='display:block;float:left;' title='点击查看' target='_blank'  href='"+ result.url +"'>><img style='display:block;float:left;width:30px;' src=<app:contextPath/>/swfupload/pdf.png >");
			}else if(result.suffix == 'doc' || result.suffix == 'docx'){
				arr.push("<a style='display:block;float:left;' title='点击查看' target='_blank'  href='"+ result.url +"'><img style='display:block;float:left;width:30px;'  src=<app:contextPath/>/swfupload/word.png >");
			}else if(result.suffix == 'xls' || result.suffix == 'xlsx'){
				arr.push("<a style='display:block;float:left;' title='点击查看' target='_blank'  href='"+ result.url +"'><img style='display:block;float:left;width:30px;' src=<app:contextPath/>/swfupload/excel.png >");
			}else if(result.suffix == 'bmp' || result.suffix == 'jpg' || result.suffix == 'jpeg' || result.suffix == 'png' || result.suffix == 'gif'){
				arr.push("<a style='display:block;float:left;' title='点击查看' target='_blank' href='"+ result.url +"'><img style='display:block;float:left;width:30px;' onerror='' src='"+result.url+"'></a>");
			}
			progress.setStatus(arr.join(''));
			progress.toggleCancel(false);			
		} catch (ex) {
			this.debug(ex);
		}
	}
  
    function delFile(id,obj){ 
	    jyDialog().confirm("删除将无法恢复,确认删除？", function(){
	    	jyAjax("<app:contextPath/>"+deleteFile_url+id,'',function(result){
      			$(obj).closest('.progressContainer').remove();
      			delFileIdFromArr(id);
      		})  
	    });
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

