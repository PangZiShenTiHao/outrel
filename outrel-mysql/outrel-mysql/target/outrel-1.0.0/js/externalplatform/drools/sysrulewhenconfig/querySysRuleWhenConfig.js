  function addTab1Row(){
	    var _len = $("#tab1 tr").length;       
	    $("#tab1").append("<tr id="+_len+" align='center'>"
	                        +'<td width=5%><input name="whenConfigs['+(_len-1)+'].sequence" value="'+_len+'"  style="width:20%;"/></td>'
	                        +'<td width=10%><input name="whenConfigs['+(_len-1)+'].preBrackets"/></td>'
	                        +'<td width=20%><input readOnly="true" id="whenConfigs['+(_len-1)+'].conditionAttrCh" name="whenConfigs['+(_len-1)+'].conditionAttrCh" style="width:80%" onclick="selectModelList(this);"/>'
	                        +'<input type="hidden" id="whenConfigs['+(_len-1)+'].conditionAttrEn" name="whenConfigs['+(_len-1)+'].conditionAttrEn"/></td>'
	                        +'<td width=10%><select name="whenConfigs['+(_len-1)+'].operator">'
	                        +'<option value="" >请选择</option>'
	                        +'<option value="==">等于</option>'
	                        +'<option value="!=">不等于</option>'
	                        +'<option value=">">大于</option>'
	                        +'<option value=">=">大于等于</option>'
	                        +'<option value="<">小于</option>'
	                        +'<option value="<=">小于等于</option>'
	                        +'<option value="contains">包含</option>'
	                        +'<option value="not contains">不包含</option>'
	                        +'<option value="matches">正则匹配</option>'
	                        +'<option value="not matches">正则不匹配</option>'
	                        +'</select></td>'
	                        +'<td width=20%><input readOnly="true" id="whenConfigs['+(_len-1)+'].compareValueCh" name="whenConfigs['+(_len-1)+'].compareValueCh"  style="width:80%" onclick="selectModelList(this);"/>'
	                        +'<input type="hidden" id="whenConfigs['+(_len-1)+'].compareValueEn" name="whenConfigs['+(_len-1)+'].compareValueEn"/></td>'
	                        +'<td width=10%><input name="whenConfigs['+(_len-1)+'].afterBrackets"/></td>'
	                        +'<td width=10%><select name="whenConfigs['+(_len-1)+'].logicalOperator">'
	                        +'<option value="" >请选择</option>'
	                        +'<option value="&&">并且</option>'
	                        +'<option value="||" >或者</option>'
	                        +'</select></td>'
	                        +"<td width=5%><a href=\'#\' onclick=\'deltr("+_len+")\'>删除</a></td>"
	                    +"</tr>");   
  }
  
  function addTab2Row(){
	    var _len = $("#tab2 tr").length;       
	    $("#tab2").append("<tr id="+_len+" align='center'>"
	                        +'<td width=5%><input name="whenConfigs['+(_len-1)+'].sequence" value="'+_len+'"  style="width:20%;"/></td>'
	                        +'<td width=20%><input readOnly="true" id="whenConfigs_02['+(_len-1)+'].conditionAttrCh" name="whenConfigs['+(_len-1)+'].conditionAttrCh" style="width:80%" onclick="selectModelList(this);"/>'
	                        +'<input type="hidden" id="whenConfigs_02['+(_len-1)+'].conditionAttrEn" name="whenConfigs['+(_len-1)+'].conditionAttrEn"/></td>'
	                        +'<td width=10%><select id="whenConfigs_02['+(_len-1)+'].arithmeticOperator" name="whenConfigs['+(_len-1)+'].arithmeticOperator">'
	                        +'<option value="" >请选择</option>'
	                        +'<option value="+">加</option>'
	                        +'<option value="-">减</option>'
	                        +'<option value="*">乘</option>'
	                        +'<option value="/">除</option>'
	                        +'</select></td>'
	                        +'<td width=20%><input readOnly="true" id="whenConfigs_02['+(_len-1)+'].compareValueCh" name="whenConfigs['+(_len-1)+'].compareValueCh"  style="width:80%" onclick="selectModelList(this);"/>'
	                        +'<input type="hidden" id="whenConfigs_02['+(_len-1)+'].compareValueEn" name="whenConfigs['+(_len-1)+'].compareValueEn"/></td>'
	                        +'<td width=10%><input id="whenConfigs_02['+(_len-1)+'].preBrackets" name="whenConfigs['+(_len-1)+'].preBrackets"/></td>'
	                        +'<td width=10%><select id="whenConfigs_02['+(_len-1)+'].operator" name="whenConfigs['+(_len-1)+'].operator">'
	                        +'<option value="" >请选择</option>'
	                        +'<option value="==">等于</option>'
	                        +'<option value="!=">不等于</option>'
	                        +'<option value=">">大于</option>'
	                        +'<option value=">=">大于等于</option>'
	                        +'<option value="<">小于</option>'
	                        +'<option value="<=">小于等于</option>'
	                        +'<option value="contains">包含</option>'
	                        +'<option value="not contains">不包含</option>'
	                        +'<option value="matches">正则匹配</option>'
	                        +'<option value="not matches">正则不匹配</option>'
	                        +'</select></td>'
	                        +'<td width=10%><input id="whenConfigs_02['+(_len-1)+'].afterBrackets" name="whenConfigs['+(_len-1)+'].afterBrackets"/></td>'
	                        +'<td width=10%><select id="whenConfigs_02['+(_len-1)+'].logicalOperator"  name="whenConfigs['+(_len-1)+'].logicalOperator">'
	                        +'<option value="" >请选择</option>'
	                        +'<option value="&&">并且</option>'
	                        +'<option value="||" >或者</option>'
	                        +'</select></td>'
	                        +"<td width=5%><a href=\'#\' onclick=\'deltr("+_len+")\'>删除</a></td>"
	                    +"</tr>");   
   }
   //删除<tr/>
   function deltr(index){
      $("tr[id='"+index+"']").remove();//删除当前行
      resetTrNum("tab");
    }

   //打开指标模型选择树
   function selectModelList(thisObj){
   	var dialogModelAttrStruct={
   			'display':contextRootPath+'/sysRuleList/prepareExecute/treeSelectModelAttr?inputId='+ thisObj.id+'&hiddenInputId='+$(thisObj).next().attr("id")+'&dictId='+$(thisObj).next().next().attr("id"),
   			'width':600,
   			'height':500,
   			'title':'指标模型选择','isIframe':'true',
   			'buttons':[
   			  {'text':'关闭','isClose':true}
   			]
   		};
   		 dialogSelectModelAttr = jyDialog(dialogModelAttrStruct);
   		 dialogSelectModelAttr.open();
   }
   
   
   function saveConfig(formId){
	    debugger;
		var params = $("#"+formId).serialize();
		var ruleConfType = $(":radio[name='ruleConfType']:checked").val();//规则配置类型(1-字段比较 ； 2-字段运算) 
		var url=contextRootPath+'/sysRuleWhenConfig/saveOrUpdateSysRuleWhenConfig?ruleConfType='+ruleConfType;
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，提示成功
				$("").newMsg({}).show(msg.msg);;
	  	}); 
   }
   
   function saveThenConfig(){
		var params=$("#addThenData").serialize();
		var url=contextRootPath+'/sysRuleThenConfig/insertSysRuleThenConfig';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，提示成功
				$("").newMsg({}).show(msg.msg);;
	  	}); 
   }