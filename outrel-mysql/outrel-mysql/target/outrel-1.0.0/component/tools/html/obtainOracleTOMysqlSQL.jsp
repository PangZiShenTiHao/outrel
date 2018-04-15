<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <title>通过sql unload2 快速导出oracle表数据为mysql文本文件</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <%@ include file="/common/StaticJavascript.jsp" %>
    <script type="text/javascript" src="${basePath}js/threeJs/validate/jquery.validate.min.js"></script>
   <script type="text/javascript" src="${basePath}js/threeJs/validate/messages_zh.min.js"></script>
   <script type="text/javascript" src="${basePath}js/threeJs/validate/jquery.validate.extend.handler.js"></script>
   <link rel="stylesheet" href="${basePath}js/threeJs/validate/validate.css"></head>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysconfig.controller.SysConfigController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 源DBCONN ：</th>
  <td > 
      <textarea  id="dtosrcdbconn" name="srcdbconn" cols="30" rows="3" notNull="true" maxLength="500" >user=ptuser/ptuser@172.18.100.86:1521/testdb</textarea>
  </td>
  <th> expDB ：</th>
  <td >
      <textarea  id="dtoexpdb" name="expdb" cols="30" rows="3" notNull="true" maxLength="500" >sys_app_error_info.sql</textarea>
  </td>
    <th> 目标表名称 ：</th>
    <td >
        <textarea  id="dtotagtable" name="tagtable" cols="30" rows="3" notNull="true" maxLength="500" >sys_app_error_info</textarea>
    </td>

  </tr>
<tr>
  <th> toolsPath ：</th>
  <td>
      <textarea  id="dtotoolsPath" name="toolsPath" cols="30" rows="3" notNull="true" maxLength="500" >F:/chengangGit/mysql/fintech/src/main/webapp/component/tools/</textarea>
  </td>

    <th> cmdFile ：</th>
    <td >
        <textarea  id="dtologCmdFile" name="logCmdFile" cols="30" rows="3" notNull="true" maxLength="500" >F:/chengangGit/mysql/fintech/src/main/webapp/component/tools/log/exe_log.log</textarea>
    </td>
    <th> logFile ：</th>
    <td >
        <textarea  id="dtologFile" name="logFile"  cols="30" rows="3" notNull="true" maxLength="500" >F:/chengangGit/mysql/fintech/src/main/webapp/component/tools/sqlunloader_logs.log</textarea>
    </td>
</tr>
     <tr>
         <th> tagdbcols ：</th>
         <td>
             <textarea  id="dtotagdbcols" name="tagdbcols" cols="30" rows="3" notNull="true" maxLength="500" >ID ,NODE_NAME,APP_FLAG ,CREATE_TIME,CONCENT,FILE_NAME,LOG_LEVEL,LEVEL_SETUP_ID ,MATCHED_FLAG </textarea>
         </td>

         <th> srcSql ：</th>
         <td colspan="3">
             <textarea  id="dtosrcSql" name="srcSql" cols="100" rows="3" notNull="true" maxLength="500" >select ID ,NODE_NAME,APP_FLAG ,CREATE_TIME,CONCENT,FILE_NAME,LOG_LEVEL,LEVEL_SETUP_ID ,MATCHED_FLAG  from sys_app_error_info</textarea>
         </td>
     </tr>

 </table>

<div class="searchBtn" style="margin-top: 8px;">
    <input type="button" value="oracle导出mysql平面文件" onclick="expMysql();" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"/>
<br/>
    /*
    * 将导出的平面文件 导入mysql中 参考*/
    <br/>
    <b>bin></b>mysql -h172.18.100.102 -upt_dev -ppt_dev
    <br/>
    <b>mysql></b> use ptdd
    Database changed
    <br/>
    <b>mysql></b>LOAD DATA LOCAL INFILE "F:/cgJYwork/fintech/src/main/webapp/component/tools/db/sys_app_error_info.sql" INTO TABLE sys_app_error_info FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\n';

</div>
<!-- 保存 关闭 按钮 在 查询页面进行控制 -->
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
       checkedInit();//校验
	});
    function expMysql(){
        //校验必填项
        if ( $("#addNewsFormData").find(".checkError").length>0 || !checkFormFormat("addNewsFormData") || !checkIsNull($("#addNewsFormData")[0])) {
            //jyDialog({"type":"info"}).alert("请正确填写！");
            $("").newMsg({}).show("请正确填写！");
            return false;
        }
        //序列化 新增页面的form表单数据
        var params=$("#addNewsFormData").serialize();
        var url=contextRootPath+'/fastdb/obtainOracleToMysqlSQL';
        //通过ajax保存
        jyAjax(
                url,
                params,
                function(msg){
                    var v_status = msg.status;
                    if(v_status.indexOf('ok') >-1){
                        //新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                        $("").newMsg({}).show(msg.msg);
                    }else{
                        jyDialog({"type":"info"}).alert(msg.msg);
                    }
                });
    }
</script>

</html>
