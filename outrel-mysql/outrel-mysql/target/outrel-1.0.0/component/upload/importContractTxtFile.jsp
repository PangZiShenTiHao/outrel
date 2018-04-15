<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/WEB-INF/tlds/app.tld" prefix="app"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@taglib prefix="syscode" uri="/syscode" %>
<%@taglib prefix="ruleMapping" uri="/ruleMapping" %>
<%@ taglib uri="/sysuser" prefix="sysuser"%>
<script src="<app:contextPath/>/js/threeJs/jquery/jquery.js"></script>
<link href="<app:contextPath/>/js/threeJs/uploadFile/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<app:contextPath/>/js/threeJs/uploadFile/swfupload.js"></script>
<script type="text/javascript" src="<app:contextPath/>/js/threeJs/uploadFile/fileprogress.js"></script>
<script type="text/javascript" src="<app:contextPath/>/js/threeJs/uploadFile/handlers.js"></script>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String jspPath = request.getSession().getServletContext().getRealPath("")+request.getRequestURI().replace(path, "");
%>
<c:set var="basePath" value="${pageContext.request.scheme}${'://'}${pageContext.request.serverName}${':'}${pageContext.request.serverPort}${pageContext.request.contextPath}/"></c:set>
<% String myDate="20160929"; %>
<script type="text/javascript" src="${basePath}/js/aftloan/repayment/latmothrepayinit/queryLaTMothRepayInit.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/threeJs/jquery/jquery.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/threeJs/jquery/jquery-ui.min.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/threeJs/jquery/datepicker-zh-TW.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/threeJs/jquery/jquery.mousewheel.min.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/threeJs/zTree_v3/js/jquery.ztree.all-3.5.min.js?d=<%=myDate%>"></script>

<script src="<%=basePath %>js/plat/base/base.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/table/table.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/searchform/searchform.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/toolbar.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/searchIframe.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/dialog/dialog.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/menu/menu.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/tree/tree.js?d=<%=myDate%>"></script>
 

<script src="<%=basePath %>js/plat/treeMenu.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/tab/tab.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/check.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/imageTool/imageTool.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/message.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/tip/tooltip.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/JBPM.common.js"></script>
<script src="<%=basePath %>js/plat/JBPM.biz.js"></script>
<script src="<%=basePath %>js/threeJs/ajTools.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/plat/autocomplete/autocomplete.js?d=<%=myDate%>"></script>

<script src="<%=basePath %>js/platform/sysarea/sysArea.js?d=<%=myDate%>"></script>
<script src="<%=basePath %>js/threeJs/My97DatePicker/WdatePicker.js?d=<%=myDate%>"></script>

<script type="text/javascript" src="<%=basePath %>js/threeJs/multiSelect/jquery.multiselect.js"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath %>js/threeJs/multiSelect/jquery.multiselect.css" />

<link rel="stylesheet" href="<%=basePath %>js/threeJs/zTree_v3/css/zTreeStyle/zTreeStyle.css?d=<%=myDate%>">
<link rel="stylesheet" href="<%=basePath %>js/threeJs/jquery/jquery-ui.min.css?d=<%=myDate%>">
<link rel="stylesheet" href="<%=basePath %>js/plat/table/table.css?d=<%=myDate%>">
<link rel="stylesheet" href="<%=basePath %>js/plat/menu/menu.css?d=<%=myDate%>">
<link rel="stylesheet" href="<%=basePath %>js/plat/tab/tab.css?d=<%=myDate%>">
<link rel="stylesheet" href="<%=basePath %>js/plat/dialog/dialog.css?d=<%=myDate%>">
<link rel="stylesheet" href="<%=basePath %>js/plat/base/base.css?d=<%=myDate%>">
<link rel="stylesheet" href="<%=basePath %>js/plat/tip/tooltip.css?d=<%=myDate%>">
<link rel="stylesheet" href="<%=basePath %>js/plat/searchform/searchform.css?d=<%=myDate%>">
<link rel="stylesheet" href="<%=basePath %>js/plat/imageTool/imageTool.css?d=<%=myDate%>">
<style type="text/css">
	.progressBarStatus{padding:10px  0px;}
	.tipCls{width:100%;height:20px;}
	.tpCls{text-align:right;color:red;}
</style>

<!------------------------------ 说明----------------------------------------
	此页面为导入txtDEMO页面，可根据需求进行复制调整
	一.JS引用:页面中可通过定义下面的函数进行引用
		var dialog_import_txt = null;
		function importTxtData(){
			var dialogStruct={
				'display':contextRootPath+'/component/upload/importTxtFile.jsp',
				'width':800,
				'height':400,
				'title':'导入数据',
				'isIframe':'true',
				'buttons':[
				 {'text':'关闭','isClose':true}
				]
			};
			dialog_import_txt =jyDialog(dialogStruct);
			dialog_import_txt.open();
	
		}
	二.上传控制类：
		 通过参数 upload_url 定义controller,此例中的controller为ImportController
		 通过仿写ImportController方法中的importTxt方法，实现数据的导入
	           其中ImportController类中关键API接口为：		 
		// 1.构建头部,fieldName同DTO中属性名对应，且索引顺序同模板列顺序一致
			TxtHeader header = new TxtHeader();
			List<TxtColumn> txtColumns = new ArrayList<TxtColumn>();
			txtColumns.add(new TxtColumn(0, "configName", "配置名称", true));
			txtColumns.add(new TxtColumn(1, "configCode", "配置编码", true));
			txtColumns.add(new TxtColumn(2, "configValue", "配置值", false));// 不进行导入的字段isImport为false即可
			header.setColumns(txtColumns);
	   // 2.设置需要进行数据转换的格式,map中的KEY值为fieldName
			Map<String, Map> txtColumnsConvertMap = new HashMap<String, Map>();
			Map<String, Integer> configCode = new HashMap<String, Integer>();
			configCode.put("是", 1);
			txtColumnsConvertMap.put("configCode", configCode);
			header.setColumnsConvertMap(txtColumnsConvertMap);
	   //3.导入数据到内存
			List<SysConfigDTO> dataOfimport = (List<SysConfigDTO>) template.importData(inputStream, SysConfigDTO.class, header);
	   //4.入库或其他操作自行完成
	三.上传成功后的操作可在js方法 uploadSuccess 中自定义
 -->


<script type="text/javascript">
	var upload;
	//文件ID集合
	var fileIdArr = [];
	$(function() {
		var settings = {
   			flash_url : "<app:contextPath/>/js/threeJs/uploadFile/swfupload.swf",
   			upload_url: "<app:contextPath/>/laTMothRepayInit/importTxt;jsessionid=<%=request.getSession().getId()%>",	
   			use_query_string : true,
   			file_size_limit : "100 MB",
   			file_types : "*.txt;",
   			file_types_description : "请选择txt格式的文本文件",
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
    		 jyDialog({"type":"info"}).alert(result.status);
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
<html xmlns="http://www.w3.org/1999/xhtml" >
<body style="background-color:#FFFFFF">
<div id="content">
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
	</div><br>
	<div>
		<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.jy.modules.aftloan.repayment.latmothrepayinit.controller.LaTMothRepayInitController">
			<table id="addNewsTableId" class="formTableSwap" border="0" align="left" cellpadding="0" cellspacing="1" >
				<tr>
				  <th>月还日：</th>
				  <td > 
				  <input type="text" class="text" id="dtomonthRepayDay" name="monthRepayDay" onfocus="WdatePicker({minDate:'%y-%M-\#\{%d+2\}'})"/>
				  </td>
				  <th>划扣方式初始化：</th>
				  <td colspan="5">
					  <syscode:dictionary id="dtorepayFun" name="repayFun" codeType="DH_DEDUCT_WAY" type="select" extendProperty="notNull='true'"></syscode:dictionary>
				 </td>
				</tr>
			</table>
		</form>
	</div>
	<%-- <div align="center" class="button">
			<input type="button" value="保存" id="doUpdateInto" onclick="saveMonthRepayInit('${listId}')"/>
			<input type="button" value="关闭" id="doCloseInto" onclick="closeTabAndFlushP('${tabTitle }','${parentTitle }')" />
	</div> --%>
</div>

