 function addRow(){
	    var _len = $("#tab tr").length;       
	    $("#tab").append("<tr id="+_len+" align='center'>"
	                        +'<td width=5%><input name="whenConfigs['+(_len-1)+'].sequence" value="'+_len+'"  style="width:20%;"/></td>'
	                        +'<td width=10%><input name="whenConfigs['+(_len-1)+'].preBrackets"/></td>'
	                        +'<td width=20%><input readOnly="true" id="whenConfigs['+(_len-1)+'].conditionAttrCh" name="whenConfigs['+(_len-1)+'].conditionAttrCh" ondblclick="selectModelList(this);"/>'
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
	                        +'<td width=20%><input name="whenConfigs['+(_len-1)+'].compareValueCh" id="whenConfigs['+(_len-1)+'].compareValueCh" readOnly="true"  ondblclick="selctAffterList(this);"/>'
	                        +'<input type="hidden" name="whenConfigs['+(_len-1)+'].compareValueEn" id="whenConfigs['+(_len-1)+'].compareValueEn"/></td>'
	                        +'<td width=10%><input name="whenConfigs['+(_len-1)+'].afterBrackets"/></td>'
	                        +'<td width=10%><select name="whenConfigs['+(_len-1)+'].logicalOperator">'
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

   //打开业务属性选择树
   function selectModelList(thisObj){
   	var dialogModelAttrStruct={
   			'display':contextRootPath+'/sysRuleModel/prepareExecute/treeSelectModelAttr?inputId='
   				+ thisObj.id+'&hiddenInputId='+$(thisObj).next().attr("id")+'&dictId='
   				+$(thisObj).next().next().attr("id"),
   			'width':600,
   			'height':500,
   			'title':'业务模型属性选择','isIframe':'true',
   			'buttons':[
   			 {'text':'关闭','isClose':true}
   			]
   		};
   		 dialogSelectModelAttr = jyDialog(dialogModelAttrStruct);
   		 dialogSelectModelAttr.open();
   }
   
   function selctAffterList(thisObj){
	   var code = document.getElementById(thisObj.name.replace('compareValueCh','conditionAttrEn')).value;
	   var dialogModelAttrStruct={
			   'display':contextRootPath+'/sysRuleWhenConfig/prepareExecute/toTreeSelect?inputId='
			   + thisObj.id+'&hiddenInputId='+$(thisObj).next().attr("id")+'&mName='
			   +code,
			   'width':600,
			   'height':500,
			   'title':'业务模型属性选择','isIframe':'true',
			   'buttons':[
			              {'text':'关闭','isClose':true}
			              ]
	   };
	   dialogSelectModelAttr = jyDialog(dialogModelAttrStruct);
	   dialogSelectModelAttr.open();
   }
   
   function saveConfig(){
		var params=$("#addData").serialize();
		console.log(params.excutionCode);
		var url=contextRootPath+'/sysRuleWhenConfig/saveOrUpdateSysRuleWhenConfig';
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