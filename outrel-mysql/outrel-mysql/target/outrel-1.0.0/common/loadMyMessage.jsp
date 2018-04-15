<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<script>
	/************我的消息说明************
	 *1.在项目首页面中引入此JSP
	 *2.根据自己的项目名称，修改系统对应的系统标识
	 *  //S001	贷款系统
	 *	//S002	理财系统
	 *	//S009	第三方系统
	 * 注意：当前测试用例用的标识为var current_system_flag = {systemFlag:'S009'}
	 *      
	 */


	$(function(){
		
		//加载右下角消息
		   function msgFun(obj){
				var param = {msgId:obj.id};
			   jyAjax('<app:contextPath/>/sysMessage/updateMessageHasRead',param,function(result){
				   if(result && result.status == 'ok'){
					   jyDialog().alert(obj.conent);
				   }
			   },null,null,null,true);
		    	
		    }
		
		//是否有消息
		var params = {systemFlag:'S009'};
		jyAjax('<app:contextPath/>/sysMessage/hasMyMessage',params,function(result){
			if (result && result.status == 'ok') {
				var count = result.data;
				$("#user_message_count").text("");
        		$("#user_message_count").text(count);
				var msgStructure={"title":"系统新消息","type":"message","url":"<app:contextPath/>/sysMessage/queryMyMessage","msgFun":msgFun};
			 	var msgObj = $("").newMsg(msgStructure);
			}else{
				var count = result.data;
				$("#user_message_count").text("");
				$("#user_message_count").text(count);
			}
		},null,null,null,true);
		
			
		 	
		
	});
	
	
 </script>