// new表格
function ModifyElement(obj,oldShowvalue,columnCode,oldValue,bizNo,type){
	//this.NEW="1";
	//this.UPDATE="2";
	//this.BASIC="0";
	
	this.oldValue=oldValue;
	this.newValue="";
	this.newShowvalue="";
	this.type=type;
	this.changeItemName=getCheckThName(obj);
	this.bizTableColum=columnCode;/**表字段名称*/
	this.oldShowvalue=oldShowvalue;
	this.bizNo=bizNo;
	this.obj=obj;
	this.status=0;
}
ModifyElement.prototype = {
	    constructor: ModifyElement,
	    validate:function(){
	    	debugger;
	    	var that=this;
	    	var type=that.type;
	    	if(type=="1"){//input textarea
	    		var newValue=that.obj.val();
	    		var a=that.obj.val();
	    		var b=that.oldValue;
	    		if(that.obj.attr("isFloatColumn")){
	    			a=(a+"").formatMoney();
	    			b=(b+"").formatMoney();
	    		}
	    		if(a==b){
	    			that.setBasic();
	    		}else{
	    			that.setUpdate(newValue,newValue);
	    		}
	    	}else if(type=="2"){//checkbox,radio
	    		var elements=that.obj;
	    		var newValue="";
	    		var newShowvalue=""
	    		if(elements.length){
					var vs=[];
					var vsName=[];
					elements.each(function(){
						var own=$(this);
						if(own[0].checked){
							vs.push(own.val());
							vsName.push(getCheckNextText(own));
						}
					})
					newValue=vs.join(",");
					newShowvalue=vsName.join(",");
				}
	    		if(newValue!=that.oldValue){
	    			that.setUpdate(newValue,newShowvalue);
	    		}else{
	    			that.setBasic();
	    		}
	    	}else if(type=="3"){//table
	    		var editData=that.obj.getEditData();
	    		if(editData&&editData.length){
	    			that.setUpdate();
	    		}
	    	}else if(type=="4"){//select 
	    		var newValue=that.obj.val();
	    		var newShowvalue=that.obj.find("option:selected").text();
	    		var a=that.obj.val();
	    		var b=that.oldValue;
	    		if(a==b){
	    			that.setBasic();
	    		}else{
	    			that.setUpdate(newValue,newShowvalue);
	    		}
	    	}
	    	return this;
	    },

	    setNewValue:function(){
	    	
	    },
	    setNew:function(newValue){
	    	if(undefined!=newValue&&(newValue+"").length>0){
	    		this.status=1;
	    		this.newValue=newValue;
	    	}
	    },
	    setUpdate:function(newValue,newShowvalue){
	    	this.status="2";
	    	this.newValue=newValue;
	    	this.newShowvalue=newShowvalue;
	    },
	    validateUpdate:function(newValue){
	    	if(this.oldValue!=undefined&&(this.oldValue+"").length>0){
	    		if(this.oldValue!=newValue){
	    			this.setUpdate(newValue);
	    		}
	    	}
	    },
	    setBasic:function(){
	    	this.status=this.BASIC;
	    },
	    isUpdate:function(){
	    	if(this.status=="2"){
	    		return true;
	    	}
	    },
	    toJsonStr:function(){
	    	return jyTools.obj2JsonString(this);
	    }
};
function CModify(structure) {
	this.structure=structure;
    this.init();
}
CModify.prototype = {
    constructor: CModify,
    init: function () {
    	debugger;
    	var that=this;
       this.modifyObjs=[];
       this.initForm=that.structure.formObj;
       if(this.initForm){
    	   var filterElement={};
    	   eachForm(this.initForm,function(obj){
    		   var jqObj=$(obj);
    		   var nodeType=0;
    		   var nodeName=obj.nodeName;
    		   var oldShowvalue="";
    		   var showCode=jqObj.attr("name");
    		   if(nodeName=="INPUT"){
    			   var type=jqObj.attr("type");
    			   if(type=="text"){
    				   nodeType=1;
    				   oldShowvalue=jqObj.val();
    				   that.modifyObjs.push(new ModifyElement(jqObj,oldShowvalue,showCode,jqObj.val(),obj.bizNo,nodeType));
    			   }else if(type=="checkbox"||type=="radio"){
    				   nodeType=2;
    				   var name=jqObj.attr("name");
    				   oldShowvalue="";
    				   if(filterElement[name]){//如果是一组checkbox，在取到第一个后，后边的全部忽略。
    					   return ;
    				   }
    				   filterElement[name]=true;
    				   var elements=$("input[name="+name+"]");
    					var oldValue=elements.val();
    					if(elements.length){
    						var vs=[];
    						elements.each(function(){
    							var own=$(this);
    							var type=own.attr("type");
    							if(type&&type=="checkbox"){
    								if(own[0].checked){
    									vs.push($(this).val());
    								}
    							}else{
    								vs.push($(this).val());
    							}
    						})
    						oldValue=vs.join(",");
    					}
    					that.modifyObjs.push(new ModifyElement(elements,oldShowvalue,showCode,oldValue,obj.bizNo,nodeType));
    			   }
    		   }else if(nodeName=="TEXTAREA"){
    			   nodeType=1;
    			   var v=jqObj.val();
    			   oldShowvalue=v;
    			   that.modifyObjs.push(new ModifyElement(jqObj,oldShowvalue,showCode,v,obj.bizNo,nodeType));
    		   }else if(nodeName=="SELECT"){
    			   nodeType=4;
    			   oldShowvalue=jqObj.find("option:selected").text();
    			   that.modifyObjs.push(new ModifyElement(jqObj,oldShowvalue,showCode,jqObj.val(),obj.bizNo,nodeType));
    		   }
    	   });
       }
    },
    getModifyObjs:function(){
    	var mos=[];
    	var mtobj=[];
    	for(var i=0;i<this.modifyObjs.length;i++){
    		var modifyObj=this.modifyObjs[i];
    		if(modifyObj.type=="1"||modifyObj.type=="2"||modifyObj.type=="4"){
    			var mo=modifyObj.validate();
    			if(mo.status=="1"||mo.status=="2"){
    				mos.push(mo);
    			}
    		}else if(modifyObj.type=="3"){//对表格对像进行特殊操作
    			debugger;
    			var tableObj=modifyObj.obj;//获取表格对像
    			var pushModifyData=function(editDatas,type){
    				for(var i=0;i<editDatas.length;i++){
        				var data=editDatas[i];
        				if(data["editObj"]){
        					for( key in data["editObj"]){
        						var d=data["editObj"][key];
        						var obj=new ModifyElement(null,d.name,d.code,d.oldValue,modifyObj.bizNo);
        						if(type==2){
        							debugger;
        							obj.validateUpdate(d.newValue)
        						}else{
        							obj.setNew(d.newValue);
        						}
        						mtobj.push(obj);
        					}
        				}
        			}
    			};
    			pushModifyData(tableObj.getEditData(),2);
    			pushModifyData(tableObj.getNewData(),1);
    		}
    	}
    	return mos.concat(mtobj);
    },
    getModifyJsonStr:function(){
    	var objStr=[];
    	var objs=this.getModifyObjs();
    	for(var i=0;i<objs.length;i++){
    		objStr.push(objs[i].toJsonStr());
    	}
    	return "["+objStr.join(",")+"]";
    }
};

