/**
 * 动态模糊查询功能，最多支持三级级联查询，没有强制级联关系限制。
 * 页面加载会初始化input里的数据，数据来源于指定的url，
 * @param dateType 数据url来源，1：使用平台jar包提供的url，2：是自定义url
 * @param firstSelect 一级级联的name，如果是自定义url，格式是：name：url，
 * 					url格式是：数据来源1：url?a=a，数据来源2：url?a=a&变量=值(dto属性，仅限一个参数,值没有可以不用传，等号必须在)，
 * 					input框里输入完整选项或者选中下拉列表里的选项方法自动会把隐藏域中select的option的value传给你指定的参数，
 * 					数据来源1：由于调用的是平台的jar包，所以固定参数&parentId（此方式现在仅在使用的是平台组织机构的方法调用，其他未验证），有这个属性做查询条件可以用，
 * 					没有此属性不可以用。注意：级联使用时，url要支持传参可以查询下级
 * @param secondSelect 二级级联name，格式同一级级联，注意：级联使用时，url要支持传参可以查询下级
 * @param thirdSelect  三级级联name，格式同一级级联，此级别url仅仅用于初始化数据
 * @param methodChange  格式{methodFirstText:"input里回显的值",methodSecondText:"input里回显的值",methodThirdText:"input里回显的值"}
 * @returns {cascadeObject}
 */
function  cascadeObject(dateType,firstSelect,secondSelect,thirdSelect,methodChange,changeEvent){
	debugger;
	this.firstSelect = firstSelect;
	this.secondSelect = secondSelect;
	this.thirdSelect = thirdSelect;
	this.dateType = dateType;
	this.methodChange = methodChange;
	this.changeEvent = changeEvent;
	this.init();
}

cascadeObject.prototype={
		init:function(){
			var that=this;
			this.firstName=this.firstSelect.split(":")[0];
			this.firstUrl=this.firstSelect.split(":")[1];
			if(this.methodChange!=undefined){
				this.methodFirstText = this.methodChange.methodFirstText;
				this.methodSecondText = this.methodChange.methodSecondText;
				this.methodThirdText = this.methodChange.methodThirdText;
			}			
			
			debugger;
			var firstSelectArray,secondSelectArray,thirdSelectArray;
			var firstName,secondName,thirdName;
			if(that.firstSelect){
				firstSelectArray = that.firstSelect.split(":");
				firstName=firstSelectArray[0];
			}
			
			if(that.secondSelect){
				secondSelectArray = that.secondSelect.split(":");
				secondName=secondSelectArray[0];
			}
			
			if(that.thirdSelect){
				thirdSelectArray = that.thirdSelect.split(":");
				thirdName=thirdSelectArray[0];
			}			
			
			
			if($("input[name="+firstName+"]").length>0){
				$("input[name="+firstName+"]").after("<select style='width:200px;height:32px;' id='"+firstName+"'></select>");
				$("input[name="+firstName+"]").hide();
				$("input[name="+firstName+"]").removeAttr("id");				
			}
			
			if($("input[name="+secondName+"]").length>0){
				$("input[name="+secondName+"]").after("<select style='width:200px;height:32px;' id='"+secondName+"'></select>");
				$("input[name="+secondName+"]").hide();
				$("input[name="+secondName+"]").removeAttr("id");
			}
			
			
			if($("input[name="+thirdName+"]").length>0){
				$("input[name="+thirdName+"]").after("<select style='width:200px;height:32px;' id='"+thirdName+"'></select>");
				$("input[name="+thirdName+"]").hide();
				$("input[name="+thirdName+"]").removeAttr("id");
			}
			
			$("#" + firstName).hide();
			if($("#dto" + firstName).length<=0){
				$("#" + firstName).after("<input id='dto"+firstName+"' class='ui-autocomplete-input;' autocomplete='off' style='width:200px;height:32px;'><div id='autocomplete"+firstName+"'></div>");
			}
			
			$("#" + secondName).hide();
			if($("#dto" + secondName).length<=0){
				$("#" + secondName).after("<input id='dto"+secondName+"' class='ui-autocomplete-input;' autocomplete='off' style='width:200px;height:32px;'><div id='autocomplete"+secondName+"'></div>");
			}
			
			$("#" + thirdName).hide();
			if($("#dto" + thirdName).length<=0){
				$("#" + thirdName).after("<input id='dto"+thirdName+"'  class='ui-autocomplete-input;' autocomplete='off' style='width:200px;height:32px;'><div id='autocomplete"+thirdName+"'></div>");
			}
			$("#dto" + firstName).unbind();
			$("#dto" + secondName).unbind();
			$("#dto" + thirdName).unbind();
			
			$("#dto" + firstName).change(function(){
				that.checkDate(this.id);
				if(that.changeEvent){
					eval(that.changeEvent);
				}
			});
			$("#dto" + secondName).change(function(){
				that.checkDate(this.id);
				if(that.changeEvent){
					eval(that.changeEvent);
				}
			});
			$("#dto" + thirdName).change(function(){
				that.checkDate(this.id);
				if(that.changeEvent){
					eval(that.changeEvent);
				}
			});
			
			
			that.cascadeSelect(that.firstName,that.firstUrl,that.secondSelect);
	},
	
	//初始化方法
	cascadeSelect:function(name,url,nextSelect){
		var that=this;
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			data:'',
			error: function(results) {
				var result;
				if(that.dateType!=1){
					result=results.data;
				}else{
					result = results;
				}
				jyDialog({"type":"warn"}).alert("级联加载错误：" + result);
			},
			success: function(results) {
				debugger;
				
				var firstSelectArray,secondSelectArray,thirdSelectArray;
				var firstName,secondName,thirdName;
				if(that.firstSelect){
					firstSelectArray = that.firstSelect.split(":");
					firstName=firstSelectArray[0];
				}
				
				if(that.secondSelect){
					secondSelectArray = that.secondSelect.split(":");
					secondName=secondSelectArray[0];
				}
				
				if(that.thirdSelect){
					thirdSelectArray = that.thirdSelect.split(":");
					thirdName=thirdSelectArray[0];
				}

				var selectOptions=[];
				var result;
				if(that.dateType!="1"){
					result=results.data;
				}else{
					result = results;
				}
				
				var j;
				var resultLength = result.length - 1;
				$("#" + name).html("<option value=''>--请选择--</option>");
				
				for (j = 0; j <= resultLength; j++) {
					$("#" + name).append("<option name='"+result[j].NAME+"' value='"+result[j].CODE+"'>"+result[j].NAME+"</option>");
					selectOptions.push(result[j].NAME);
				}
				that.completeAuto(selectOptions,name,that.firstSelect,that.secondSelect,that.thirdSelect,url,that.dateType);
				var selectCount = $("#" + name)[0].options.length;
				if(resultLength==0 && selectCount<1){
					$("#" + name).append("<option value='"+undefined+"'>暂无数据</option>");
				}
				
				if(nextSelect){
					var nextSelectArray = nextSelect.split(":");
					var nextName,nextUrl;
					nextName=nextSelectArray[0];
					nextUrl=nextSelectArray[1];
					
					var selectCount = $("#"+nextName)[0].options.length;
					if(selectCount<1){
						$("#"+nextName).html("<option value=''>--请选择--</option>");
						$("#" + thirdName).html("<option value=''>--请选择--</option>");
					}
					
					if(thirdName==name){
						return;
					}

					that.cascadeSelect(nextName,nextUrl,that.thirdSelect);
					
				}
			}
		});
	},
	
	/**
	 * 公用级联模糊查询
	 */
	completeAuto:function(selectOptions, selectID,firstSelect,secondSelect,thirdSelect,url,dateType){
		var that=this;
		debugger;
		var firstSelectArray,secondSelectArray,thirdSelectArray;
		var firstName,secondName,thirdName;
		if(firstSelect){
			firstSelectArray = firstSelect.split(":");
			firstName=firstSelectArray[0];
		}
		
		if(secondSelect){
			secondSelectArray = secondSelect.split(":");
			secondName=secondSelectArray[0];
		}
		
		if(thirdSelect){
			thirdSelectArray = thirdSelect.split(":");
			thirdName=thirdSelectArray[0];
		}
		
		if (selectOptions.length > 0) {
			$("#dto" + selectID).autocomplete({
				source : selectOptions,
				minLength : 0,
				delay : 300,
				appendTo : "#autocomplete" + selectID ,
				select:function(event, ui){
					
					var text = ui.item.value;
					var option = $("#"+selectID+" option[name="+text+"]");
					 $("#"+selectID+" option").each(function(){
						 $(this).removeAttr("selected");
					 });
					 
					$("#"+selectID+" option[name="+text+"]").attr("selected","true");
					$("input[name="+selectID+"]").val($("#"+selectID+" option[name="+text+"]").val());
					if(selectID==thirdName){
						return;
					}
					
					var nextSelect;
					if(selectID==firstName){
						nextSelect=secondSelect;
					}
					if(selectID==secondName){
						nextSelect=thirdSelect;
					}
					
					that.changeMethod(option,nextSelect,firstSelect,secondSelect,thirdSelect,url,dateType);
					if(that.changeEvent){
						eval(that.changeEvent);
					}
			    }
			}).focus(function() {
				$(this).autocomplete("search");
			});
			that.methodName(that.methodFirstText,that.methodSecondText,that.methodThirdText);
		}else{
			$("#dto" + secondName).autocomplete({
					source : selectOptions,
					minLength : 0,
					delay : 300
				}).focus(function() {
					$(this).autocomplete("search");
				});
			$("#dto" + thirdName).autocomplete({
				source : selectOptions,
				minLength : 0,
				delay : 300
			}).focus(function() {
				$(this).autocomplete("search");
			});
		}
		
	},
	
	//change事件
	changeMethod:function(option,nextSelect,firstSelect,secondSelect,thirdSelect,url,dateType){
		var that = this;
		debugger;
		
		if(!nextSelect){
			return;
		}
		
		var nextSelectArray,firstSelectArray,secondSelectArray,thirdSelectArray;
		var nextName,nextUrl,firstName,secondName,thirdName;
		
		if(nextSelect){
			nextSelectArray = nextSelect.split(":");
			nextName=nextSelectArray[0];
			nextUrl=nextSelectArray[1];
		}
		
		if(firstSelect){
			firstSelectArray = firstSelect.split(":");
			firstName=firstSelectArray[0];
		}
		
		if(secondSelect){
			secondSelectArray = secondSelect.split(":");
			secondName=secondSelectArray[0];
		}
		
		if(thirdSelect){
			thirdSelectArray = thirdSelect.split(":");
			thirdName=thirdSelectArray[0];
		}
		
		var nextSelectCount = $("#"+nextName)[0].options.length;
		var thirdSelectCount = $("#"+thirdName)[0].options.length;
		
		if(nextSelectCount>1){
			$("#dto"+nextName).val("");
			$("#"+nextName).html("<option value=''>--请选择--</option>");
			$("#dto"+thirdName).val("");
			$("#"+thirdName).html("<option value=''>--请选择--</option>");
		}
		if(thirdSelectCount>1){
			$("#dto"+thirdName).val("");
			$("#"+thirdName).html("<option value=''>--请选择--</option>");
		}
		
		if(nextSelectArray.length>1){
			var t = firstSelectArray[1].indexOf("=");
			for(var i=0;i<1;i++){
				t = firstSelectArray[1].indexOf("=",t+1);
			}
			nextUrl=firstSelectArray[1].substring(0,t+1);
		}else if(nextSelectArray.length<=1){
			var t = secondSelectArray[1].indexOf("=");
			for(var i=0;i<1;i++){
				t = secondSelectArray[1].indexOf("=",t+1);
			}
			nextUrl=secondSelectArray[1].substring(0,t+1);
		}
		var valueFather = option.val();
		var textFather = option.text();
		if(valueFather==""){
			valueFather=-1;
		}
		if(dateType!="1"){
			nextUrl = nextUrl + valueFather;
		}else{
			nextUrl = nextUrl + "&parentId=" + valueFather;
		}
		debugger;
		$.ajax({
			url: nextUrl,
			type: 'get',
			dataType: 'json',
			data:'',
			error: function(results) {
				var result;
				if(dateType!=1){
					result=results.data;
				}else{
					result = results;
				}
				jyDialog({"type":"warn"}).alert("级联加载错误：" + result);
			},
			success: function(results) {
				var result;
				if(dateType!="1"){
					result=results.data;
				}else{
					result = results;
				}
				
				if(!result){
					return;
				}
				
				var j;
				var resultLength = result.length - 1;
				//$("select[name="+name+"]").html("<option value=''>--请选择--</option>");
				var selectOptions=[];
				for (j = 0; j <= resultLength; j++) {
					$("#"+nextName).append("<option name='"+result[j].NAME+"' value='"+result[j].CODE+"'>"+result[j].NAME+"</option>");
					selectOptions.push(result[j].NAME);
				}
				
				that.completeAuto(selectOptions,nextName,firstSelect,secondSelect,thirdSelect,url,dateType);
				
				if(nextName==secondName){
					that.changeMethod(option,thirdName,firstSelect,secondSelect,thirdSelect,url,dateType);
				}
			}
		});
	},
	
	//回显数据
	methodName:function(firstText,secondText,thirdText){
		var that = this;
		var firstSelectArray,secondSelectArray,thirdSelectArray;
		var firstName,secondName,thirdName;
		if(that.firstSelect){
			firstSelectArray = that.firstSelect.split(":");
			firstName=firstSelectArray[0];
		}
		
		if(that.secondSelect){
			secondSelectArray = that.secondSelect.split(":");
			secondName=secondSelectArray[0];
		}
		
		if(that.thirdSelect){
			thirdSelectArray = that.thirdSelect.split(":");
			thirdName=thirdSelectArray[0];
		}
		
		if(firstText){
			$("#dto" + firstName).val(firstText);
			$("#"+firstName+" option[name="+firstText+"]").attr("selected","true");
		}
		
		if(secondText){
			$("#dto" + secondName).val(secondText);
			$("#"+secondName+" option[name="+secondText+"]").attr("selected","true");
		}
		
		if(thirdText){
			$("#dto" + thirdName).val(thirdText);
			$("#"+thirdName+" option[name="+thirdText+"]").attr("selected","true");
		}
	},
	
	
	/**
	 * input输入框和select的change事件
	 * @param id
	 */
	checkDate:function(id){
		var that = this;
		debugger;
		var msg;
		var url = that.firstSelect.split(":")[1];
		var t = $("#"+id).val();
		var idInput = id;
		id = id.split("dto")[1];
		var length =  $("#"+id+" option[name="+t+"]").length;
		if(length>0){
			msg="1";
			$("#"+id + " option").each(function(){
				 $(this).removeAttr("selected");
			 });
			$("#"+id+" option[name="+t+"]").attr("selected","true");
			$("input[name="+id+"]").val($("#"+id+" option[name="+t+"]").val());
		}else{
			$("#"+id + " option").each(function(){
				 $(this).removeAttr("selected");
			 });
			$("#" + idInput).val("");
			$("input[name="+id+"]").val("");
		}

		if(!that.secondSelect){
			return;
		}
		
		if(!that.thirdSelect){
			return;
		}
		
		var thirdName = that.thirdSelect.split(":")[0];
		
		if(thirdName == id){
			return;
		}

		var nextSelectArray,firstSelectArray,secondSelectArray,thirdSelectArray;
		var nextName,firstName,firstUrl,secondName,secondUrl,thirdName,thirdUrl;
		
		if(that.firstSelect){
			firstSelectArray = that.firstSelect.split(":");
			firstName=firstSelectArray[0];
			firstUrl=firstSelectArray[1];
			
		}
		
		if(that.secondSelect){
			secondSelectArray = that.secondSelect.split(":");
			secondName=secondSelectArray[0];
			secondUrl = secondSelectArray[1];
		}
		
		if(that.thirdSelect){
			thirdSelectArray = that.thirdSelect.split(":");
			thirdName=thirdSelectArray[0];
			thirdUrl = thirdSelectArray[1];
		}
		
		var nextSelect;
		if(id==firstName){
			nextSelect=that.secondSelect;
		}
		if(id==secondName){
			nextSelect=that.thirdSelect;
		}
		
		if(nextSelect){
			nextSelectArray = nextSelect.split(":");
			nextName=nextSelectArray[0];
		}
		
		if(msg=="1"){
			if(id==that.thirdSelect){
				var option = $("#"+id+" option[name="+t+"]");
				 $("#"+id).each(function(){
					 $(this).removeAttr("selected");
				 });
				$("#"+id+" option[name="+t+"]").attr("selected","true");
				$("input[name="+id+"]").val($("#"+id+" option[name="+t+"]").val());
				return;
			}
			var option = $("#"+id+" option[name="+t+"]");
			that.changeMethod(option,nextSelect,that.firstSelect,that.secondSelect,that.thirdSelect,url,that.type,that.dateType);
		}else{
			if(id==firstName){
				that.cascadeSelect(secondName,secondUrl,that.thirdSelect);
			}
			if(id==secondName){
				var firstValue = $("#dto"+firstName).val();
				if(firstValue){
					var optionFirst = $("#"+firstName+" option[name="+firstValue+"]");
					var newSelect =  thirdName + ":" + secondUrl;
					that.changeMethod(optionFirst,that.secondSelect,that.firstSelect,that.secondSelect,that.thirdSelect,url,that.type,that.dateType);
				}else{
					that.cascadeSelect(secondName,secondUrl,that.thirdSelect);
				}
			}
			return;
		}
	}
};

(function($) {
	$.fn.newCascadeObject = function(dateType,firstSelect, secondSelect,
			thirdSelect,methodChange,changeEvent) {
		return new cascadeObject(dateType,firstSelect, secondSelect,
				thirdSelect,methodChange,changeEvent);
	};
})(jQuery);









