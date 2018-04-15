<%@ page language="java" import="java.util.*,com.jy.platform.jbpm4.tool.StringUtilTools" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns:v="urn:schemeas-microsoft-com:vml">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
    <title>Web Workflow design</title>
   <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
      <link rel="stylesheet" type="text/css" href="scripts/ext-2.0.2/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="scripts/ux/ext-patch.css" />
    
     <link rel="stylesheet" type="text/css" href="styles/jbpm4.css" />
    <link rel="stylesheet" type="text/css" href="styles/org.css" />
	 
	 <!-- ext js -->
	 <script type="text/javascript" src="scripts/ext-2.0.2/ext-base.js"></script>
    <script type="text/javascript" src="scripts/ext-2.0.2/ext-all.js"></script>
    <script type="text/javascript" src="scripts/ext-2.0.2/ext-lang-zh_CN.js"></script>
    
    
    
    
	<script type="text/javascript" src="scripts/gef/scripts/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="scripts/gef/scripts/geom_entry.js"></script>
	<script type="text/javascript" src="scripts/gef/scripts/create_core.js"></script>
    <script type="text/javascript" src="scripts/gef/scripts/work_core.js"></script>
    <script type="text/javascript" src="scripts/gef/scripts/tools.js"></script>
    <script type="text/javascript" src="scripts/gef/scripts/model.js"></script>
    <!-- 网页中绘制矢量图形的 Javascript 库 -->
    <script type="text/javascript" src="scripts/gef/scripts/raphael-min.js"></script>
    
    <script type="text/javascript">
Gef.IMAGE_ROOT = 'scripts/gef/images/activities/48/';
//流程编码
Gef.PROCESS_KEY='my_process_key';
//流程名称
Gef.PROCESS_NAME='my_process_name';
//业务目录
Gef.PROCESS_BIZ_FILE="temp";
//版本号
Gef.PROCESS_VERSION="1";


Gef.DEPLOY_URL = '${basePath1}deployProcess.do';
Gef.SAVE_URL = '${basePath1}addTemporaryJbpm4Info.do';
Gef.PRO_PNG_URL='${basePath1}exportImage.do';
Gef.UPDATE_PUBLISED_URL='${basePath1}immediatelyUpdateProcess.do';

Gef.GET_PRO_DEF_XML = '${basePath1}workFlowProvider/getOneProcessXMLContent.do';

    </script>
    <script type="text/javascript" src="scripts/gef/all-editor.js"></script>
    <script type="text/javascript" src="scripts/edit-workflow.js"></script>
     <script type="text/javascript" src="scripts/gef/scripts/layout.js"></script>
     
    
    <script type="text/javascript" src="scripts/validation/all-validation.js"></script>
    <script type="text/javascript" src="scripts/form/all-forms.js"></script>
    <script type='text/javascript' src='scripts/property/all-property.js'></script>
 <!-- 
    <script type='text/javascript' src='scripts/ux/checkboxtree/Ext.lingo.JsonCheckBoxTree.js'></script>
   
    <link rel='stylesheet' type='text/css' href='scripts/ux/checkboxtree/Ext.lingo.JsonCheckBoxTree.css' />
    
     -->
     <!-- 
    <script type="text/javascript" src="scripts/org/OrgField.js"></script>
   -->
  
    <script type='text/javascript' src='scripts/ux/treefield/Ext.lingo.TreeField.js'></script>
 	<!-- 
    <script type='text/javascript' src='scripts/ux/localXHR.js'></script>
     -->
    <script type='text/javascript'>
Gef.ORG_URL = 'org.json';
    </script>
    
     
   
   
    <style type="text/css">
	    #pageh1{
		    font-size:36px;
			font-weight:bold;
			background-color:#C3D5ED;
			padding:5px;
		}
		#__gef_jbs_center__{
		    margin: 0;
			pading: 0;
			text-align: left;
			font-family: Arial, sans-serif, Helvetica, Tahoma;
			font-size: 8px;
			line-height: 1.5;
			color: black;
			background-image: url(images/bg.png);
		}
	</style>
		
		
  </head>
  <body>
    <link rel="stylesheet" type="text/css" href="scripts/loading/loading.css" />
    <div id="loading-mask"></div>
    <div id="loading">
        <div class="loading-indicator"><img src="scripts/loading/extanim32.gif" align="absmiddle"/>loading...</div>
    </div>  
	<script>
$("document").ready(function(){
	setTimeout(function() {
            
           var id = "<%=StringUtilTools.filterSpecial(request,"dto.id")%>";
			//初始化修改的信息
			App.initEditor(id);
        }, 1000);
        
	

});
var doc = document;
function exportImage(){
	svg = $("#__gef_jbs_center__").html();
	//可以考虑将画布上的内容另存为页面，进而在转化成图片
	alert("exportImage---"+svg);
	//alert($("#__gef_jbs_center__").html());
	
	//http://localhost:8080/platform/exportImage.do
}

	</script>
	
	
  </body>
</html>


