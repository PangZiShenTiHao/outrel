<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/product" prefix="pc"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>新增外联调用挡板规则表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extinvokefilterrule.controller.ExtInvokeFilterRuleController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
		<tr>
		  <th> 系统编码 ：</th>
		  <td> 
		   <input type="text" class="text" id="dtosysCode" name="sysCode" notNull="false" value="${sysCode}" style="width:300px;" readonly="readonly"/>
		  </td>
		</tr>
		<tr>
		  <th> 有效日期 ：</th>
		  <td > 
		  <input type="text" class="text" id="dtovalidTermStartdate" name="validTermStartdate"  notNull="false" maxLength="10" value="${custInfo.cardStartT }"  onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})"/>
		  <label>~</label>
		  <input type="text" class="text" id="dtovalidTermEnddate" name="validTermEnddate" notNull="false" maxLength="10" value="${custInfo.cardEndT }" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d'})"/>
		  </td>
		</tr>
		<tr>
		  <th> 是否启用产品限制 ：</th>
		  <td >
		  <syscode:dictionary id="dtoisProLimit" name="isProLimit" codeType="YESNO" type="radio" defaultValue="0"/> 
		  </td>
		</tr>
		<tr id="prodTr" style="display:none">
		  <th> 适用产品 ：</th>
		  <td > 
		  <%--<pc:productTag type="checkbox" id="dtoprodStr" name="prodStr"></pc:productTag>--%>
		  </td>
		</tr> 
		<tr>
		  <th> 是否启用门店限制 ：</th>
		  <td> 
		  <syscode:dictionary id="dtoisStoreLimit" name="isStoreLimit" codeType="YESNO" type="radio" defaultValue="0"/> 
		  </td>
		</tr>
  </table>
  <br/>
     <div class="tableToolbar" id="orgToolbar" style="display:none">
	   <a href="javascript:void(0)" index="0" onclick="showTree('add')">新增适用门店</a>
	   <a href="javascript:void(0)" index="1" onclick="removeOrgRow()">删除</a>
     </div>
     <div class="expandContent" id="orgTable" style="height: 200px; overflow-x: hidden; overflow-y: auto;display:none"> </div>
  <br/> 
     <div class="tableToolbar" id="funcToolbar">
	   <a href="javascript:void(0)" index="0" onclick="showFuncTree('add','${sysCode}')">新增适用功能</a>
	   <a href="javascript:void(0)" index="1" onclick="removeFuncRow()">删除</a>
     </div>
     <div class="expandContent" id="funcTable" style="height: 200px; overflow-x: hidden; overflow-y: auto;"> </div>
  <br/>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>
<script type="text/javascript">
	var orgTable;
	var funcTable;
	function removeOrgRow(){
		orgTable.removeSelectedRow();
	}
	function removeFuncRow(){
		funcTable.removeSelectedRow();
	}	 
	function showOrgTable(){
		var tableStructure = {
				//定义table 列表的表头信息
				columns : [
				 {display : ' 分公司 ', code : 'BRANCHNAME', width : 210, align : 'center', type:'text'}
				,{display : ' 分部 ', code : 'SUBSECTIONNAME', width : 210, align : 'center', type:'text'}
				,{display : ' 门店 ', code : 'STORENAME', width : 230, align : 'center', type:'text'}
			   ],
				url : "",
				datas : [],
				toolbar: [],
				selectType : 'checkbox',
				isCheck : true,
				hiddenFooter: true,
				rownumbers : true,
				loadEndFun:function(obj){
					if(obj.data&&obj.data.length){
						$("input[name='isStoreLimit']").each(function(i){
								if($(this).val()==1){
									$(this).attr("checked",true);
								}
							}
						);
					}else{
						$(":radio[name='isStoreLimit'][value='0']").prop("checked","checked");
					}
				},
				primaryKey:"id"
			};
		orgTable=$("#orgTable").newTable(tableStructure,"orgTable");
		orgTable.show(true);
	}
	
	function showFuncTable(){
		var tableStructure = {
				//定义table 列表的表头信息
				columns : [
				 {display : ' 映射ID ', code : 'MAP_ID', width : 210, align : 'center', type:'hidden'}
				,{display : ' 功能模块 ', code : 'FUNC_MODULE_NAME', width : 210, align : 'center', type:'text'}
				,{display : ' 功能类型 ', code : 'FUNC_TYPE_NAME', width : 210, align : 'center', type:'text'}
				,{display : ' 功能点 ', code : 'FUNC_NAME', width : 230, align : 'center', type:'text'}
			   ],
				url : "",
				datas : [],
				toolbar: [],
				selectType : 'checkbox',
				isCheck : true,
				hiddenFooter: true,
				rownumbers : true,
				primaryKey:"id"
			};
		funcTable=$("#funcTable").newTable(tableStructure,"funcTable");
		funcTable.show(true);
	}
	
	
	/**绑定是否功能**/
	(function(){
		var yesOrNoPanel=[{"name":"isStoreLimit","linkPanel":["orgToolbar","orgTable"]},{"name":"isProLimit","linkPanel":["prodTr"]}];
		for(var i=0;i<yesOrNoPanel.length;i++){
			var p=yesOrNoPanel[i];
			(function(pObj){
				$("input[name='"+pObj["name"]+"']").bind("click",function(ev){
					var value=$(this).val();
					for(var j=0;j<pObj["linkPanel"].length;j++){
						var panel=pObj["linkPanel"][j];
						if(value>0){
							$("#"+panel).show();
						}else{
							$("#"+panel).hide();
						}
					}
				});
			})(p);
		}
	})();

   $(document).ready(function(){
   	  checkedInit();
   	  showOrgTable();
   	  showFuncTable();
	});
</script>
  
</html>
