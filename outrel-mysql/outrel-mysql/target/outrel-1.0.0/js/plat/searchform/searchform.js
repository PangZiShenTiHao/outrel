// new表格
function SearchForm(formStructure, formName,container) {
	this.formStructure=formStructure;
	this.formName=formName;
	this.container=container;
	this.treeWidth=600;
	this.treeHeight=600;
	this.checkInit=false;
	this.treeMenus=[];
	this.init();
}
SearchForm.prototype = {
	init:function(){
			this.btns=this.formStructure.buttons;
			this.columns=this.formStructure.columns||[];
			//this.treeName="treeName"+this.formName;
	},
	show : function(isShow) {
		var that=this;
		$(this.container).html(that.create());
		that.reDrawObj();
		if(that.checkInit){
			checkedInitForm(that.formName);
		}
	},
	create:function(){
		var that=this;
		var formStrs=['<form class="searchFrom" isCheck=true id="'+that.formName+'">'];
		for(var i=0;i<that.columns.length;i++){
			formStrs.push(that.createObj(this.columns[i]));	
		}
		formStrs.push('</form>');
		formStrs.push(that.createBtn());
		return formStrs.join("");
	},
	serialize:function(){
		eachForm($("#"+this.formName),function(el){
			var v=$(el).val();
			if(v){
				if(typeof v!="object" && typeof v!="function") {
					$(el).val(v.trim());
				}
			}
		})
		return $("#"+this.formName).serialize();
	},
	checkFormFormat:function(){
		return submitCheckIsNull(this.formName)&&checkFormFormat(this.formName);
	},
	reDrawObj:function(){
		var that=this;
		events={	
				select : function(id) {
					//$(id).selectmenu();
				},
				date : function(id) {
					//$(id).datepicker($.datepicker.regional[ "zh-TW" ],"option","dateFormat", "yy-mm-dd" );
                    $(id).bind("click",function(){
                        WdatePicker({dateFmt:'yyyy-MM-dd'});
                    });
				},
				dateType : function(id,c) {
                    $(id).bind("click",function(){
                    	var _df = c.dateFormat||'yyyy-MM-dd';
                        WdatePicker({dateFmt:_df});
                    });
				},
				dbDate:function(id,c){
					var startId=id+"_start" ;
					var endId=id+"_end";
                    var dateObj_S={dateFmt:'yyyy-MM-dd'};
                    var dateObj_E={dateFmt:'yyyy-MM-dd'};
                    if(c.isCompare)
                    {
                    	var dd=0;
                    	if(undefined!=c.intervalDay){
                    		dd=c.intervalDay;
                    	}
                        dateObj_S.maxDate='#F{$dp.$D(\''+endId.replace("#","")+'\',{d:-'+dd+'})}';
//                        maxDate:'          #F{$dp.$D(\'d4322\',{d:-3});}'
                        dateObj_E.minDate='#F{$dp.$D(\''+startId.replace("#","")+'\',{d:'+dd+'})}';
                        
                        
                    }
                    $(startId).bind("click",function(){
                        WdatePicker(dateObj_S);
                    });
                    $(endId).bind("click",function(){
                        WdatePicker(dateObj_E);
                    });
				},
                dateTime : function(id) {
                    $(id).bind("click",function(){
                        WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});
                    });
                },
                dbDateTime:function(id,c){
                    var startId=id+"_start" ;
                    var endId=id+"_end";
                    var dateObj_S={dateFmt:'yyyy-MM-dd HH:mm:ss'};
                    var dateObj_E={dateFmt:'yyyy-MM-dd HH:mm:ss'};
                    if(c.isCompare)
                    {
                        dateObj_S.maxDate='#F{$dp.$D(\''+endId.replace("#","")+'\')}';
                        dateObj_E.minDate='#F{$dp.$D(\''+startId.replace("#","")+'\')}';
                    }
                     $(startId).bind("click",function(){
                        WdatePicker(dateObj_S);
                     });
                     $(endId).bind("click",function(){
                        WdatePicker(dateObj_E);
                     });
                },
				text : function(id,c) {
					 
					//that.pageIndex += 1;
				},
				dbText:function(id){
					
				},
				tree:function(id,c){
					var type=c.treeType||"radio";
					var w=c.treeWidth||that.treeWidth;
					var h=c.treeHeight||that.treeHeight;
					var dl=c.disabledLink||"false";
					var treeMenuObj=$(id+"_").treeMenu({"treeUrl":c.value,"width":w,"height":h,"treeType":type,"disabledLink":dl,"treeExtendObjs":$(id+"_nodeObj")[0],"okFun":c.okFun,"treeIdObj":$(id)[0]});
					that.treeMenus.push(treeMenuObj);
				},
				hidden:function(id){
					
				},
				radio:function(){
					
				},
				checkbox:function(){
					
				},
				autocomplete : function(id) {
					$(id).newAutoComplete();
				},
				multiselect : function(id,c) {
					debugger;
					$(id).multiselect({
						checkAllText: '全选',
		                uncheckAllText: '全不选',
		                noneSelectedText: '-请选择-',
		                selectedText: '# 选中',
		                minWidth: 180,
						close: function(){debugger;
							var options=$(this).multiselect("getChecked").map(function(){
								var sVal=this.value;
								if(c&&c.enumType&&c.enumType=="String") {
									sVal="'"+sVal+"'";
								}
								return sVal;
							}).get();
							
							var sourceId=$(id).attr("sourcename");
							$("#"+sourceId).val(options.join(","));
					   }
					});
				}
		};
		for(var i=0;i<that.columns.length;i++){
			(function(c){
				var id="#"+c.code+that.formName;
				events[c.type](id,c);
				if(c.clickFun){
					var obj=$(id);
					if(c.clickFun){
						obj.bind("click",function(){
							c.clickFun(obj[0]);
						});
					}
				}
			})(that.columns[i]);
		}
		for(var i=0;i<that.btns.length;i++){
			var btn=that.btns[i];
			$("#"+btn["id"]).bind("click",btn.fun);
			$("#"+btn["id"]).button({
			  icons: {
				primary:btn["icon"]
			  }
			});
		}
	},
	createBtn:function(btnObj){
		var that=this;
		var btnStr=['<div class="searchBtn">'];
		for(var i=0;i<this.btns.length;i++){
			var btn=this.btns[i];
			btn["id"]=that.formName+"btn"+i;
			btnStr.push('<button id="'+btn["id"]+'">'+btn["text"]+'</button>');
		}
		btnStr.push("</div>");
		return btnStr.join("");
	},
	reset:function(){
		for(var i=0;i<this.treeMenus.length;i++){
			var treeObj=this.treeMenus[i];
			if(treeObj){
				this.treeMenus[i].recovery();
				this.treeMenus[i]=null;
				this.treeMenus.splice(i, 1);
				i--;
			}
		}
		this.show();
	},
	getObj:function(code){
		var that=this;
		var objs=[];
		for(var i=0;i<that.columns.length;i++){
			var column=that.columns[i];
			if(column["code"]===code&&(column["type"]==="dbDate"||column["type"]==="dbText")){
				objs.push($("#"+code+this.formName+"_start")[0]);
				objs.push($("#"+code+this.formName+"_end")[0]);
				return objs;
			}
		}
		return $("#"+code+this.formName)[0];
	},
	createObj:function(obj){
		var that=this;
		if(!obj){
			return;
		}
		obj["type"]=obj.type||"text";
		var name=obj["code"];
		var id=obj["code"]+that.formName;
		var value=obj["value"];
		if(value == undefined||value==null||value=="NULL"||value=="null"){
			value="";
		};
		var startName=name+"_start";
		var endName=name+"_end";
		var startId=id+"_start";
		var endId=id+"_end";
		var dbStyle='style= " width:75px; "';
		var extendproperty=(function(){
			var extStr=[];
			if(obj.extendProperty){
				that.checkInit=true;
				for(var key in obj.extendProperty){
					extStr.push(' '+key+' = "'+obj.extendProperty[key]+'" ');
				}
			}
			return extStr.join("");
		})()
		var createInput=(function(){
			return function(type,name,id,value,dbStyle){
				var htmls=["<input"];
				htmls.push(' type="'+(type||"text")+'"');
				htmls.push(dbStyle);
				htmls.push(' value="'+ value+'"');
				htmls.push(' name="'+name+'" id="'+id+'"');
				htmls.push(extendproperty);
				htmls.push('>');
				return htmls.join(" ");
			};
		})();	
		var objs={
				select:function(){
					objStrs.push('<select class="fieldSelect" name="'+name+'" id="'+id+'">');
				  	for(var i=0;i<obj.value.length;i++){
						var o=obj.value[i];
						var selected="";
						if(obj.defaultValue==o.value){
							selected=' selected="selected" ';
						}
						objStrs.push('<option '+selected+' value="'+o.value+'">'+o.text+'</option>');
					}
				  	objStrs.push('</select>');
				},
				date:function(){
					objStrs.push(createInput("text",name,id,value));
				},
				dateType:function(){
					objStrs.push(createInput("text",name,id,value));
				},
				dbDate:function(){
					objStrs.push(createInput("text",startName,startId,value,dbStyle));
					objStrs.push("&nbsp;~&nbsp;");
					objStrs.push(createInput("text",endName,endId,value,dbStyle));
				},
                dateTime:function(){
                    objStrs.push(createInput("text",name,id,value));
                },
                dbDateTime:function(){
                    dbStyle='style= " width:125px; "';
                    objStrs.push(createInput("text",startName,startId,value,dbStyle));
                    objStrs.push("&nbsp;~&nbsp;");
                    objStrs.push(createInput("text",endName,endId,value,dbStyle));
                },
				text:function(){
					objStrs.push(createInput("text",name,id,value));
				},
				dbText:function(){
					objStrs.push(createInput("text",startName,startId,value,dbStyle));
					objStrs.push("&nbsp;~&nbsp;");
					objStrs.push(createInput("text",endName,endId,value,dbStyle));
				},
				tree:function(){
					objStrs.push(' <input type="hidden" name="'+name+'" id="'+id+'">');
					objStrs.push(' <input type="hidden" name="'+name+'_nodeObj" id="'+id+'_nodeObj">');
					objStrs.push(' <input type="text" name="'+name+'_" id="'+id+'_">&nbsp;');	
				},
				radio:function(type){
					var t=type||"radio";
					for(var i=0;i<obj.value.length;i++){
						var o=obj.value[i];
						objStrs.push('<span><input type="'+t+'" id="'+(id+i)+'" name="'+name+'" value="'+o.value+'"/><label for="'+(id+i)+'">'+o.text+'</label></span>')	
					}
				},
				checkbox:function(){
					objs["radio"]("checkbox");
				},
				hidden:function(){
					return createInput("hidden",name,id,value);
				},
				autocomplete:function(){
					objStrs.push('<select class="fieldSelect" name="'+name+'" id="'+id+'">');
				  	for(var i=0;i<obj.value.length;i++){
						var o=obj.value[i];
						var selected="";
						if(obj.defaultValue==o.value){
							selected=' selected="selected" ';
						}
						objStrs.push('<option '+selected+' value="'+o.value+'">'+o.text+'</option>');
					}
				  	objStrs.push('</select>');
				},
				multiselect:function(){
					debugger;
					objStrs.push(' <input type="hidden" name="'+name+'" id="source_'+name+'">');
					objStrs.push('<select multiple="multiple" class="fieldSelect" name="show_'+name+'" id="'+id+'" sourcename="source_'+name+'">');
				  	for(var i=0;i<obj.value.length;i++){
						var o=obj.value[i];
						var selected="";
						if(obj.defaultValue==o.value){
							selected=' selected="selected" ';
						}
						objStrs.push('<option '+selected+' value="'+o.value+'">'+o.text+'</option>');
					}
				  	objStrs.push('</select>');
				}
			};
		
		if(obj.type=="hidden"){
			return objs[obj.type]();
		}
		var objStrs=[' <div class="field"><label class="fieldName" for="speed">'+(obj["display"]||"&nbsp;")+':</label>'];
		objs[obj.type]();
		objStrs.push('</div>');
		return objStrs.join("");
	}
};
(function( $ ){  
  $.fn.newSearchForm = function(formStructure) {
	var fname="fname"+(new Date()).getTime();
   	return new SearchForm(formStructure,fname,$(this)[0]);
  };  
})(jQuery);  

