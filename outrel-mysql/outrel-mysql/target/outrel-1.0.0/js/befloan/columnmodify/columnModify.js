// new表格
function ModifyElement(obj,columnName,columnCode,oldValue,bizNo,type){
	this.NEW="1";
	this.UPDATE="2";
	this.BASIC="0";
	
	this.oldValue=oldValue;
	this.newValue="";
	this.type=type;
	this.columnName=columnName;
	this.columnCode=columnCode;
	this.bizNo=bizNo;
	this.obj=obj;
	this.status=this.BASIC;
}
ModifyElement.prototype = {
	    constructor: ModifyElement,
	    validate:function(){
	    	var that=this;
	    	var type=that.type;
	    	if(type=="1"){
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
	    			that.setUpdate(newValue);
	    		}
	    	}else if(type=="2"){
	    		var elements=that.obj;
	    		var newValue="";
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
					newValue=vs.join(",");
				}
	    		if(newValue!=that.oldValue){
	    			that.setUpdate(newValue);
	    		}else{
	    			that.setBasic();
	    		}
	    	}else if(type=="3"){
	    		var editData=that.obj.getEditData();
	    		if(editData&&editData.length){
	    			that.setUpdate();
	    		}
	    	}
	    	return this;
	    },
	    
	    setNewValue:function(){
	    	
	    },
	    setNew:function(newValue){
	    	if(undefined!=newValue&&(newValue+"").length>0){
	    		this.status=this.NEW;
	    		this.newValue=newValue;
	    	}
	    },
	    setUpdate:function(newValue){
	    	this.status=this.UPDATE;
	    	this.newValue=newValue;
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
	    	if(this.status==this.UPDATE){
	    		return true;
	    	}
	    },
	    toJsonStr:function(){
	    	return jyTools.obj2JsonString(this);
	    }
};
function CModify() {
    this.init();
}
CModify.prototype = {
    constructor: CModify,
    init: function () {
       this.modifyObjs=[];
       this.modifyColumns=[];
    },
    query:function(basePath,bizNo,prodId){
    	var that=this;
    	var url=basePath+"lbTColumnModifyConf/queryListLbTColumnModifyConf";
    	var params="bizNo="+bizNo+"&fkProConfId="+prodId;
    	var groupObj=function(obj){
    		({
				"1":function(){
					var element=$("#"+obj.columnCode);
					that.modifyObjs.push(new ModifyElement(element,obj.columnName,obj.columnCode,element.val(),obj.bizNo,obj.type));
				},
				"2":function(){
					var elements=$(obj.columnCode);
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
					that.modifyObjs.push(new ModifyElement(elements,obj.columnName,obj.columnCode,oldValue,obj.bizNo,obj.type));
				},
				"3":function(){
					var tableObj=jyTools.string2JsonObj(obj.columnCode);
					that.modifyObjs.push(new ModifyElement(tableObj,"","","",obj.bizNo,obj.type));
				}
    		}[obj.type])();
    	};
    	jyAjax(url,params,function(msg){
    		if(msg.data&&msg.data.length){
    			that.modifyColumns=msg.data;
    			for(var i=0;i<that.modifyColumns.length;i++){
    				groupObj(msg.data[i]);
    			}
    		}
    	});
    },
    getModifyObjs:function(){
    	var mos=[];
    	var mtobj=[];
    	for(var i=0;i<this.modifyObjs.length;i++){
    		var modifyObj=this.modifyObjs[i];
    		if(modifyObj.type=="1"||modifyObj.type=="2"){
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

function checkBankReservedPhone(obj) {
	var val=$(obj).val();
	var regExp=/^[1][0-9]{10}$/;
	
	if(val!=""&&!regExp.test(val)) {
		return "请输入有效的手机号码";
	}

	return "";
}
