<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增业务模型属性配置</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script type="text/javascript" src="${basePath}js/platform/drools/common/resetTrNum.js"></script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.drools.sysrulemodel.controller.SysRuleModelController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 类型 ：</th>
  <td > 
  		<select id="dtomodelType" name="modelType">
  			<option value="1" <c:if test="${dto.modelType=='1'}">selected="selected"</c:if> >业务模型</option>
  			<option value="2" <c:if test="${dto.modelType=='2'}">selected="selected"</c:if> >实体类</option>
  		</select>
  </td>
  <th> 中文名 ：</th>
  <td > 
  <input type="text" class="text" id="dtochName" name="chName" notNull="false" maxLength="25" value="${dto.chName}" />
  </td>
  <th> 英文名 ：</th>
  <td > 
  <input type="text" class="text" id="dtoenName" name="enName" notNull="false" maxLength="25" readonly="readonly" value="${dto.enName}" />
  </td>
</tr>
<tr>
  <th> 备注 ：</th>
  <td colspan="5"> 
  <textarea id="dtoremark" name="remark" maxLength="100" rows="5" cols="60">${dto.remark}</textarea>
  </td>
</tr>
  </table>

属性管理
<div class="contentPanel">
	<table id="tab"  class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1">
	        <tr>
	            <td style="width: 5px;">序号</td>
	            <td>属性中文名</td>
	            <td>属性英文名</td>
	            <td>数据类型</td>
	            <td>长度</td>
	            <td>引用字典编码</td>
	            <td>描述</td>
	            <td>操作</td>
	       </tr>
	       <c:forEach items="${dto.modelAttrs}" var="attr" varStatus="status" >
	       
	       <tr id="${status.index+1}">
	            <td>
	            	<input type="text" name="modelAttrs[${status.index}].sequence" value="${attr.sequence}">
	            	<input type="hidden" name="modelAttrs[${status.index}].id" value="${attr.id}">
	            	<input type="hidden" name="modelAttrs[${status.index}].modelEnName" value="${attr.modelEnName}">
	            </td>
	            <td><input type="text"  class="text" name="modelAttrs[${status.index}].chName" notNull="false" maxLength="50" value="${attr.chName}" ></td>
	            <td><input type="text"  class="text" name="modelAttrs[${status.index}].enName" notNull="false" maxLength="50" value="${attr.enName}" ></td>
	            <td>
	            	<select name="modelAttrs[${status.index}].dataType" >
	            		<option value="1" >字符型</option>
	            		<option value="2" >数字型</option>
	            		<option value="3" >日期型</option>
	            		<option value="4" >浮点型</option>
	            	</select>
	            </td>
	            <td><input type="text"  class="text" name="modelAttrs[${status.index}].dataLong" maxLength="50" value="${attr.dataLong}" ></td>
	            <td><input type="text"  class="text" name="modelAttrs[${status.index}].dictCode" maxLength="50" value="${attr.dictCode}" ></td>
	            <td><input type="text"  class="text" name="modelAttrs[${status.index}].remark" maxLength="50" value="${attr.remark}" ></td>
	            <td><a href="#" onclick="deltr(${status.index+1})">删除</a></td>
	       </tr>
	       </c:forEach>
	    </table>
	    <table class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1">
	    	<tr><td style="text-align:right;width: 800px;"><input type="button" id="but" value="增加"/></td></tr>
	    </table>
</div>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
   	checkedInit();
   	
   	//增加<tr/>
    $("#but").click(function(){
        var _len = $("#tab tr").length;       
        $("#tab").append("<tr id="+_len+" align='center'>"
                            +'<td><input type="text" name="modelAttrs['+(_len-1)+'].sequence" value="'+_len+'"></td>'
                            +'<td><input type="text"  class="text" name="modelAttrs['+(_len-1)+'].chName" notNull="false" maxLength="50" value="" ></td>'
                            +'<td><input type="text"  class="text" name="modelAttrs['+(_len-1)+'].enName" notNull="false" maxLength="50" value="" ></td>'
                            +'<td><select name="modelAttrs['+(_len-1)+'].dataType">'
                            +'<option value="1" >数字型</option>'
                            +'<option value="2" >字符型</option>'
                            +'<option value="3" >日期型</option>'
                            +'<option value="4" >浮点型</option>'
                            +'</select></td>'
                            +'<td><input type="text"  class="text" name="modelAttrs['+(_len-1)+'].dataLong" notNull="false" maxLength="50" value="" ></td>'
                            +'<td><input type="text"  class="text" name="modelAttrs['+(_len-1)+'].dictCode" notNull="false" maxLength="50" value="" ></td>'
                            +'<td><input type="text"  class="text" name="modelAttrs['+(_len-1)+'].remark" notNull="false" maxLength="50" value="" ></td>'
                            +"<td><a href=\'#\' onclick=\'deltr("+_len+")\'>删除</a></td>"
                        +"</tr>");            
    });
    
	});
	
	 //删除<tr/>
   function deltr(index){
       //var _len = $("#tab tr").length;
       $("tr[id='"+index+"']").remove();//删除当前行
       resetTrNum("tab");
       /* for(var i=index+1,j=_len;i<j;i++)
       {
           //var nextTxtVal = $("#desc"+i).val();
           $("tr[id=\'"+i+"\']")
               .replaceWith("<tr id="+(i-1)+" align='center'>"
                               +'<td><input type="text" name="modelAttrs['+(i-2)+'].sequence" value="'+(i-1)+'"></td>'
                               +'<td><input type="text"  class="text" name="modelAttrs['+(i-2)+'].chName" notNull="false" maxLength="50" value="" ></td>'
                            +'<td><input type="text"  class="text" name="modelAttrs['+(i-2)+'].enName" notNull="false" maxLength="50" value="" ></td>'
                            +'<td><select name="modelAttrs['+(i-2)+'].dataType">'
                            +'<option value="1" >数字型</option>'
                            +'<option value="2" >字符型</option>'
                            +'<option value="3" >日期型</option>'
                            +'<option value="4" >浮点型</option>'
                            +'</select></td>'
                            +'<td><input type="text"  class="text" name="modelAttrs['+(i-2)+'].dataLong" notNull="false" maxLength="50" value="" ></td>'
                            +'<td><input type="text"  class="text" name="modelAttrs['+(i-2)+'].dictCode" notNull="false" maxLength="50" value="" ></td>'
                            +'<td><input type="text"  class="text" name="modelAttrs['+(i-2)+'].remark" notNull="false" maxLength="50" value="" ></td>'
                               +"<td><a href=\'#\' onclick=\'deltr("+(i-1)+")\'>删除</a></td>"
                           +"</tr>");
       } */
     }
</script>
</html>  

