/**
 * ajTools常用工具类
 */
var tools = {
/***
 * @author cxt
 * @since 
 * 请求后台交互，获取JSON对象
 * url : 请求地址
 * param: 传值参数
 * async: 发送方式，同步（false）或异步（true）
 * callback：响应处理函数，执行成功调用返回方法
 */
requestJsonRs:function(url,param,async,callback){
	if(!param) param = {};
    var jsonObj = null;
	$.ajax({
		type:"post",
		dataType:"html",
		url:url,
		data:param,
		async:(async?async:false),
		success:function(data){
			jsonObj = eval("("+data+")");
			
			if(callback){
				alert(data)
				callback(jsonObj);
		    }
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			jsonObj = {rtState:false,rtMsg:"Error"};
		}
	});
	//alert(jsonObj.rtData[0].id);
	return jsonObj;
},
/**
 * str转为json
 */
strToJson:function(str){  
    var json = eval("(" + str + ")");  
	    return json;  
},
/**
 * 表单内控件转换为POST请求的JSON格式
 * form : 表单对象
 */
formToJson:function(form){
	var json = {};
	$(form).find("input[name][type=text]").each(function(i,obj){
		json[$(obj).attr("name")] = $(obj).val();
	});
	$(form).find("input[name][type=hidden]").each(function(i,obj){
		json[$(obj).attr("name")] = $(obj).val();
	});
	$(form).find("textarea[name]").each(function(i,obj){
		json[$(obj).attr("name")] = $(obj).val();
	});
	$(form).find("select[name]").each(function(i,obj){
		json[$(obj).attr("name")] = $(obj).val();
	});
	$(form).find("input[name][type=checkbox]").each(function(i,obj){
		if($(obj).attr("checked")){
			json[$(obj).attr("name")] = 1;
		}else{
			json[$(obj).attr("name")] = 0;
		}
	});
	$(form).find("input[name][type=radio][checked]").each(function(i,obj){
		json[$(obj).attr("name")] = $(obj).val();
	});
	
	$(form).find("input[name][type=password]").each(function(i,obj){
		json[$(obj).attr("name")] = $(obj).val();
	});
	return json;
},
/**
 * array中是否存在target元素
 */
findInSet:function(target,array1){
	var sp = (array1+"").split(",");
	for(var i=0;i<sp.length;i++){
		if((sp[i]+"")==(target+"")){
			return true;
		}
	}
	return false;
},
/**
 * 检查是否存在中文
 */
existChinese:function(str){
	for(var i=0;i<str.length;i++){
		if(str.charAt(i)>='\u4e00' && str.charAt(i)<='\u9fa5'){
			return true;
		}
	}
	return false;
},
/**
 * 将json对象转化为String
 */
parseJson2String:function(json){
	var str = "";
	if(json instanceof Array){
		str = this.jsonArray2String(json);
	}else{
		str = this.jsonObj2String(json);
	}
	return str;
},
/**
 * Array转化为String
 */
jsonArray2String:function(json){
	var str = "[";
	for(var i=0;i<json.length;i++){
		str+=this.jsonObj2String(json[i]);
		if(i!=json.length-1){
			str+=",";
		}
	}
	str += "]";
	return str;
},
/**
 * json对象转化为String
 */
jsonObj2String:function(json){
	var str = "{";
	var value;
	var exist = false;
	for(var key in json){
		exist = true;
		str+="'"+key+"':";
		value = json[key];
		if(value instanceof Array){
			str+=this.jsonArray2String(value);
		}else{
			str+="'"+value+"'";
		}
		str+=",";
	}
	if(exist){
		str = str.substring(0,str.length-1);
	}
	str +="}";
	return str;
},

/**
 * 将字符串转化为Json
 */
 string2JsonObj:function (text){
	try{
		return eval("("+text+")");
	}catch(e){
		return {};
	}
}
};


/**
 * 把Json数据绑定到控件

  json : json对象
  filters : 过滤不需要绑定的控件
 */
function bindJsonObj2Cntrl(json, filters) {
  for (var property in json) {
    if (filters) {
      if (Object.isString(filters) && filters.indexOf(",") > 0) {
        var filterArray = filters.split(",");
        if (!filterArray.contains(property)) {
          continue;
        }
      }else if (Object.isString(filters)) {
        var ancestor = $(filters);
        var elem = $(property);
        if (ancestor && elem && !Element.descendantOf(elem, ancestor)) {
          continue;
        }
      }else if (Object.isArray(filters)) {
        if (!filters.contains(property)) {
          continue;
        }
      }else if (Object.isElement(filters)) {
        var elem = $(property);
        if (elem && !Element.descendantOf(elem, ancestor)) {
          continue;
        }
      }
    }
    var value = json[property];  
    var cntrlArray = document.getElementsByName(property);    
    var cntrlCnt = cntrlArray.length;
    if (!cntrlArray || cntrlCnt < 1) {
      if (document.getElementById(property)) {
        cntrlArray = [document.getElementById(property)];
        cntrlCnt = 1;
      }else {
        continue;
      }
    }
    if (cntrlCnt == 1) {
      var cntrl = cntrlArray[0];
      if (cntrl.tagName.toLowerCase() == "input" && cntrl.type.toLowerCase() == "checkbox") {
    	  
        if (cntrl.value == value) {
          cntrl.checked = true;
        }else {
          cntrl.checked = false;
        }
      }else if (cntrl.tagName.toLowerCase() == "td"
          || cntrl.tagName.toLowerCase() == "div"
          || cntrl.tagName.toLowerCase() == "span") {
        cntrl.innerHTML = value;
      } else if (cntrl.tagName.toLowerCase() == 'select') {
        for (var i = 0; i < cntrl.childNodes.length; i++) {
          if (cntrl.childNodes[i].value == value) {
            cntrl.childNodes[i].setAttribute("selected", "selected");
            break;
          }
        }
      }else {
        cntrl.value = value;
      }
    }else {
      for (var i = 0; i < cntrlCnt; i++) {
        var cntrl = cntrlArray[i];
        if (cntrl.value == value) {
          cntrl.checked = true;
        }else {
          cntrl.checked = false;
        }
      }
    }
  }
}

//截取字符串(返回中文）
function setString(str){
    var strlen = 0; 
    var len = str.length;
    alert(len);
 	 var s = "";
	 for(var i = 0;i < str.length;i++){
	     if(str.charCodeAt(i) > 128){
	     	 strlen += 2;
	     	 s += str.charAt(i);
	     }else{ 
	     	 strlen++;
	     }
	 }
	 return s;
}

