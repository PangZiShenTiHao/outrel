/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
 * Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
 * Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
 * Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
 * Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	var week = {
		"0" : "/u65e5",
		"1" : "/u4e00",
		"2" : "/u4e8c",
		"3" : "/u4e09",
		"4" : "/u56db",
		"5" : "/u4e94",
		"6" : "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
								: "/u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};

Date.prototype.addDays = function(days) {
	  var times=this.getTime();
	  times=times+(days*1000*60*60*24);
	  return new Date(times);
};

Date.prototype.addMonths=function(months){
	  var isLeapYear=function(year) 
	  {  return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);  
	    
	  }
	  var getDay=function(endMonth){
	    if(endMonth==4||endMonth==6||endMonth==9||endMonth==11){
	      return 30;
	    }else{
	      return 31;
	    }
	  }
	  var sumDay=0;
	  var month=this.getMonth();
	  var year=this.getFullYear();
	   
	  for(var i=1;i<=months;i++){
	    var m=month+i;
	    var addy=parseInt(m/12);
	    var em=(m%12)+1;
	    if(em==2){
	      if(isLeapYear(year+addy)){
	        sumDay+=29;
	      }else{
	        sumDay+=28;
	      }
	    }else{
	      sumDay+=(getDay(em));
	    }
	  }
	   return this.addDays(sumDay);
};


String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.subByteStr = function(maxLen) {
	var srcStr = this;
	var len = jyTools.byteLength(srcStr);
	var newStr = "";
	var newLen = 0;
	if (len <= maxLen) {
		return srcStr;
	} else {
		for (var i = 0; i < srcStr.length; i++) {
			var subStr = srcStr.substr(i, 1);
			var subLen = jyTools.byteLength(subStr);
			if ((newLen + subLen) <= maxLen) {
				newStr += subStr;
				newLen += subLen;
			} else {
				return newStr;
			}
		}
	}
};
String.prototype.formatMoney = function(places, symbol, thousand,
		decimal) {
	return jyTools.formatMoney(this, places, symbol, thousand, decimal);
};
String.prototype.jyReplaceAll = function(s1, s2) {
	var r, re;
	eval("re = /" + s1 + "/g;");
	r = this.replace(re, s2);
	return (r);
};
function jyAjax(url, params, successFun, errorFun, type, Async,obj, isNoShowMask,otherParams) {
	var mask=$("").newMask();
	if (!isNoShowMask) {
		mask.show();
	}
	var AsyncStatus=true;
	if(!(undefined===Async||""===Async||null===Async)){
		AsyncStatus=Async;
	}
	var ajaxObj={
			url : url,
			type : type || 'POST',
			data : params,
			async:AsyncStatus,
			dataType : 'json',
			error : function(XmlHttpRequest, textStatus, errorThrown) {
				mask.close();
				if (errorFun) {
					errorFun(XmlHttpRequest,textStatus,errorThrown);
				} else {
					if (XmlHttpRequest.responseText != "") {
						jyDialog({"type":"error"}).alert('error:' + XmlHttpRequest.responseText);
					} else {
						jyDialog({"type":"error"}).alert("error");
					}
				}
			},
			success : function(result) {
				if (result) {
					if (result.status == "ok") {
						successFun(result);
						if (obj) {
							obj.removeAttr("disabled");
						}
					}else if (result.status == "failed") {
						if (errorFun) {
							errorFun(result);
						} else {
							jyDialog({"type":"error"}).alert(result.msg);
						}
						if (obj) {
							obj.removeAttr("disabled");
						}
					}else if(result.status=="forceLogout"){
	                    window.top.location.href = result.forceLogoutUrl;
	                    return;
	                }else {//返回 非 dataMsg 的请求时
						successFun(result);
						if (obj) {
							obj.removeAttr("disabled");
						}
					}
				}
				mask.close();
			}};
	
	if(otherParams){
		if(otherParams.timeout){
			ajaxObj["timeout"]=otherParams.timeout;
		}
	}
	$.ajax(ajaxObj);
}
/**
 * ajTools常用工具类
 */
var tools = {
	/**
	 * 检查是否存在中文
	 */
	existChinese : function(str) {
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) >= '\u4e00' && str.charAt(i) <= '\u9fa5') {
				return true;
			}
		}
		return false;
	},
	byteLength:function(val,length){
		endStr="xxx";
		if(length){
			endStr="";
			for(var i=0;i<length;i++){
				endStr+="x";
			}
		}
		return val.replace(/[\u4E00-\u9FA5]/g, endStr).length;
	},
	openWinByUrl : function(url, title, width, height, isScroll) {
		var t = title || "操作";
		var w = width || (window.screen.availWidth - 10);
		var h = height || (window.screen.availHeight - 30);
		var scroll = "";
		if (!isScroll) {
			scroll = "scroll=no; ";
		}
		var style = "status=no;" + scroll + "resizable=no;dialogWidth=" + w
				+ "px;dialogHeight=" + h + "px";
		var returnValue;
		if (window.showModalDialog) {
			returnValue = window.showModalDialog(url, window, style);
		} else {
			returnValue = window
					.open(
							url,
							t,
							"width="
									+ w
									+ ",height="
									+ h
									+ ", fullscreen=1,top=0, left=0,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=n o, status=no");
		}
		return returnValue;
	},
	getParentNodeByTagName:function(node,tagName){
		if(node){
			if (node.tagName == tagName.toUpperCase()) {
				return node;
			} else {
				return arguments.callee(node.parentNode, tagName);
			}
		}
		return node;
	},
	getParentNodeByAttr:function(node,attrName,attrValue){
		if(node){
			var newNode=$(node)
			if (newNode.attr(attrName)) {
				if(newNode.attr(attrName)==attrValue){
					return node;
				}
			} else {
				return arguments.callee(node.parentNode,attrName,attrValue);
			}
		}
		return node;
	},
	formatMoney : function(number, places, symbol, thousand, decimal) {
		places = !isNaN(places = Math.abs(places)) ? places : 2;
		symbol = symbol !== undefined ? symbol : "";
		thousand = thousand || ",";
		decimal = decimal || ".";
		var negative = number < 0 ? "-" : "", i = parseInt(number = Math.abs(
				+number || 0).toFixed(places), 10)
				+ "", j = (j = i.length) > 3 ? j % 3 : 0;
		return symbol
				+ negative
				+ (j ? i.substr(0, j) + thousand : "")
				+ i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand)
				+ (places ? decimal
						+ Math.abs(number - i).toFixed(places).slice(2) : "");
	},
	/**
	 * 将json对象转化为String
	 */
	parseJson2String : function(json) {
		var str = "";
		var jsonArray2String = function(json) {
			var str = "[";
			for (var i = 0; i < json.length; i++) {
				str += jsonObj2String(json[i]);
				if (i != json.length - 1) {
					str += ",";
				}
			}
			str += "]";
			return str;
		};
		var jsonObj2String = function(json) {
			var str = "{";
			var value;
			var exist = false;
			for ( var key in json) {
				exist = true;
				str += "'" + key + "':";
				value = json[key];
				if (value instanceof Array) {
					str += jsonArray2String(value);
				} else {
					str += "'" + value + "'";
				}
				str += ",";
			}
			if (exist) {
				str = str.substring(0, str.length - 1);
			}
			str += "}";
			return str;
		};
		if (json instanceof Array) {
			str = jsonArray2String(json);
		} else {
			str = jsonObj2String(json);
		}
		return str;
	},

	/**
	 * 将字符串转化为Json
	 */
	string2JsonObj : function(text) {
		try {
			return eval("(" + text + ")");
		} catch (e) {
			return {};
		}
	},
	obj2JsonString:function(obj){
		var str = "{";
		var value;
		var exist = false;
    	for(var key in obj){
			value = obj[key];
			if(value==undefined){
				value="";
			}
			if(!(typeof(value)=="function"||typeof(value)=="object")){
				exist = true;
				str+="'"+key+"':";
				if(value instanceof Array){
					str+=jsonArray2String(value);
				}else{
					str+="'"+value+"'";
				}
				str+=",";
			}
		}
		if(exist){
			str = str.substring(0,str.length-1);
		}
		str +="}";
		return str;
	},
	obj2Params : function(obj) {
		var params = [];
		for ( var key in obj) {
			params.push(key + "=" + obj[key]);
		}
		return params.join("&");
	},

	setString : function(str) {
		var strlen = 0;
		var len = str.length;
		alert(len);
		var s = "";
		for (var i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 128) {
				strlen += 2;
				s += str.charAt(i);
			} else {
				strlen++;
			}
		}
		return s;
	},

	getOffsetTop : function(ev, obj) {
		if (ev.offsetY) {
			return ev.offsetY;
		} else {
			return ev.pageY - $(obj).offset().top;
		}
	},
	getOffsetLeft : function(ev, obj) {
		if (ev.offsetX) {
			return ev.offsetX;
		} else {
			return ev.pageX - $(obj).offset().left;
		}
	},
	jyAjax : function(url, params, successFun, errorFun, type, Async,obj, isNoShowMask) {
		jyAjax(url, params, successFun, errorFun, type, Async,obj, isNoShowMask);
	},

	isValidDate : function(year, month, day) {
		// alert(year + " " + month + " " + day);
		return this.isValidDateStr(year + "-" + month + "-" + day);
	},
	/**
	 * 判断是否是合法的日期字段
	 * @param str
	 * @returns {Boolean}
	 */
	isValidDateStr : function(str) {
		if (!str) {
			return;
		}
		var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		if (r == null) {
			return false;
		}
		if (parseInt(r[1]) > 9999 || parseInt(r[1]) < 1753) {
			return false;
		}
		var d = new Date(r[1], r[3] - 1, r[4]);
		return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d
				.getDate() == r[4]);
	},

	/**
	 * 判断是否为合法的时间串
	 * 
	 * 
	 * @param str
	 * @return
	 */
	isValidTimeStr : function(str) {
		if (!str) {
			return;
		}
		var r = str.match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
		if (r == null) {
			return false;
		}
		if (parseInt(r[1]) > 59 || parseInt(r[1]) < 0) {
			return false;
		}
		if (parseInt(r[2]) > 59 || parseInt(r[2]) < 0) {
			return false;
		}
		if (parseInt(r[3]) > 59 || parseInt(r[3]) < 0) {
			return false;
		}
		return true;
	},
	
	/**
	 * 判断是否为合法的日期时间串
	 * 
	 * @param str
	 * @return
	 */
	isValidateTimeStr : function(str) {
		if (!str) {
			return;
		}
		var r = str
				.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
		if (r == null) {
			return false;
		}
		if (parseInt(r[1]) > 9999 || parseInt(r[1]) < 1753) {
			return false;
		}
		var d = new Date(r[1], r[3] - 1, r[4]);
		if (!(d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d
				.getDate() == r[4])) {
			return false;
		}
		if (parseInt(r[5]) > 59 || parseInt(r[5]) < 0) {
			return false;
		}
		if (parseInt(r[6]) > 59 || parseInt(r[6]) < 0) {
			return false;
		}
		if (parseInt(r[7]) > 59 || parseInt(r[7]) < 0) {
			return false;
		}
		return true;
	},
	saveLocal:function(key,value){
		if(window.localStorage){
			var storage=window.localStorage;
			storage.setItem(key,value);
		}
	},
	getLocal:function(key){
		if(window.localStorage){
			var storage=window.localStorage;
			return storage.getItem(key);
		}
		return "";
	},
	clearLocal:function (){
		if(window.localStorage){
			var storage=window.localStorage;
			storage.clear();
		}
	},
	diffStr:function(str1,str2){
		var as=str1.split("");
		var bs=str2.split("");
		//var aDeffObj=[];
		//var bDeffObj=[];
		var deffFun=function(srcCharArray,endStr){
			for(var j=0;j<srcCharArray.length;j++){
				var v=srcCharArray[j];
				if(endStr[j]!=v){
					srcCharArray[j]='<label style="color:#ff0000;background:#c0c0c0;font-size:18px;">'+v+'</label>';
				}
			}
		} 
		deffFun(as,bs)
		deffFun(bs,as)
		var endStrs=[];
		endStrs.push(as.join(""));
		endStrs.push(bs.join(""));
		return endStrs
	},
	isFloat:function(ev,obj){
		if(ev.keyCode==229||ev.keyCode==16){
			obj.blur();
			var that=this;
			//setTimeout(function(){$(that).focus();},10);
			return false;
		}
	
		var val=obj.val();
		if(ev.shiftKey||ev.ctrlKey||ev.altKey){
			return false;
		}
		if(!((ev.keyCode>=48&&ev.keyCode<=57)||(ev.keyCode>=96&&ev.keyCode<=105)||ev.keyCode==110||ev.keyCode==190||ev.keyCode==8||ev.keyCode==9||ev.keyCode==13)) {
			return false;
		}
		
		if((ev.keyCode==110||ev.keyCode==190) && val.length==0) {
			return false;
		}
		
		if((ev.keyCode==110||ev.keyCode==190) && val.indexOf(".")>-1) {
			return false;
		}
	},
	numToCny : function(numberValue){
		var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
		var chineseValue = ""; // 转换后的汉字金额
		var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
		var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
		var len = numberValue.length; // numberValue 的字符串长度
		var Ch1; // 数字的汉语读法
		var Ch2; // 数字位的汉字读法
		var nZero = 0; // 用来计算连续的零值的个数
		var String3; // 指定位置的数值
		if (len > 15) {
			//alert("超出计算范围");
			return "超出计算范围";
		}
		if (numberValue == 0) {
			chineseValue = "零元整";
			return chineseValue;
		}
		String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
		for (var i = 0; i < len; i++) {
			String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
			if (i != (len - 3) && i != (len - 7) && i != (len - 11)
					&& i != (len - 15)) {
				if (String3 == 0) {
					Ch1 = "";
					Ch2 = "";
					nZero = nZero + 1;
				} else if (String3 != 0 && nZero != 0) {
					Ch1 = "零" + String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				} else {
					Ch1 = String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				}
			} else { // 该位是万亿，亿，万，元位等关键位
				if (String3 != 0 && nZero != 0) {
					Ch1 = "零" + String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				} else if (String3 != 0 && nZero == 0) {
					Ch1 = String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				} else if (String3 == 0 && nZero >= 3) {
					Ch1 = "";
					Ch2 = "";
					nZero = nZero + 1;
				} else {
					Ch1 = "";
					Ch2 = String2.substr(i, 1);
					nZero = nZero + 1;
				}
				if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
					Ch2 = String2.substr(i, 1);
				}
			}
			chineseValue = chineseValue + Ch1 + Ch2;
		}
		if (String3 == 0) { // 最后一位（分）为0时，加上“整”
			chineseValue = chineseValue + "整";
		}
		return chineseValue;
	},
	cloneObj : function(obj) {
		var own=arguments.callee;
		function Clone(){}
		Clone.prototype = obj;
		var o = new Clone();
		for(var a in o){
			if(typeof o[a] == "object") {
				o[a] = own(o[a]);
			}
		}
		return o;
	}
};

(function($) {
	$.fn.serializeJson = function() {
		var serializeObj = {};
		var array = this.serializeArray();
		var str = this.serialize();
		$(array).each(
				function() {
					if (serializeObj[this.name]) {
						if ($.isArray(serializeObj[this.name])) {
							serializeObj[this.name].push(this.value);
						} else {
							serializeObj[this.name] = [
									serializeObj[this.name], this.value ];
						}
					} else {
						serializeObj[this.name] = this.value;
					}
				});
		return serializeObj;
	};
})(jQuery);
var jyTools = tools;
var mid = "publicMarker23232322";
$(function() {
	$(document).ajaxStart(function() {
	}).ajaxSend(function() {
	}).ajaxSuccess(function(e, xhr, settings) {
        var resStatus = xhr.getResponseHeader("sessionstatus");
        if(resStatus != undefined &&  resStatus == "timeout"){
            var responseContent = eval("("+xhr.responseText+")");
            window.location.href = responseContent.forceLogoutUrl;
            return;
        }
		setTimeout(function() {
			$("#" + mid).hide();
		}, 100);
	}).ajaxError(function() {
		//alert("ajaxError");
		setTimeout(function() {
			$("#" + mid).hide();
		}, 100);
	});
});

(function($) {
	$.fn.jyAjax = function(url, params, successFun, errorFun, type,Async) {
		var obj = $(this);
		obj.attr("disabled", true);
		jyAjax(url, params, successFun, errorFun, type,Async, obj);
	};
})(jQuery);
(function($) {
	$.fn.downLink = function(linkObjStructure) {
		if (linkObjStructure) {
			var obj = $(this);
			var fillLinkObj = function(linkObj) {
				var pushOption = function(datas) {
					if (datas && linkObj) {
						var jObj;
						if (typeof (linkObj["linkObj"]) == "string") {
							jObj = document.getElementById(linkObj["linkObj"]);
						} else {
							jObj = linkObj["linkObj"];
						}
						jObj.options.length = 0;
						var selectIndex=0;
						for (var i = 0; i < datas.length; i++) {
							var optionObj = datas[i];
							if (linkObj.mapping) {
								datas[i]["text"]=optionObj[linkObj.mapping[0]];
								datas[i]["value"]=optionObj[linkObj.mapping[1]];
							} 
							
							if(optionObj["value"]==linkObj.defaultValue){
								selectIndex=i;
							}
							jObj.options.add(new Option(optionObj["text"],
									optionObj["value"]));
						}
						jObj.options[selectIndex].selected=true;
					}
					if(linkObj.callFun){
						linkObj.callFun(datas);
					}
				};
				var fillInFun = {
					"url" : function() {
						jyAjax(linkObj.linkUrl, linkObj.params,
								function(result) {
									pushOption(result.data);
								});
					},
					"fun" : function() {
						pushOption(linkObj.linkFun(obj.val()));
					},
					"funAsync" : function() {
						linkObj.linkFun(obj.val(), pushOption);
					},
					"callBackFun" : function() {
						linkObj.linkFun(obj.val(), pushOption);
					}
				};
				fillInFun[linkObj.type]();
			};
			obj.bind("change", function() {
				fillLinkObj(linkObjStructure);
			});
			var value = obj.val();
			if (null != value && undefined != value && value.length > 0) {
				// if(is)
				fillLinkObj(linkObjStructure);
			}
		}
	};

})(jQuery);


/**
 * 遍历form表单中的元素
 * @param formName
 * @param fun
 */
function eachForm(formName, fun) {
	var form="";
	var allElements=[];
	if(typeof (formName) == "object"){
		if(formName instanceof jQuery){//jquery对像
			form=formName;
		}else if(formName instanceof Array){//元素数组
			allElements=formName;
		}else{//dom对像
			form=$(formName);
		}
	}else{//字符串
		form = $("#" + formName);
	}
	var blElFun=function(elements){
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			if (fun) {
				fun(element);
			}
		}
	}
	if(allElements.length){//如果是form对像（名称，dom对像，jquery对像）
		blElFun(allElements);
	}
	if (form && form.length) {
		blElFun(form[0].elements);
	}
}

function getCheckThName(obj){
	var checkChName=obj.attr("checkChName")||"";
	if(!checkChName) {
		checkChName=obj.parent("td").prev("th").text()||"";
	}
	
	return checkChName;
}

function getCheckNextText(obj){
	var labelName=obj.attr("labelName")||"";
	if(!labelName) {
		labelName=obj.next("label").text()||"";
	}
	
	return labelName;
}

/** 填充form表单数据，主要针对预约 bespokeName预约字段,localName本地字段* */
function fillInForm(fDatas, formName) {
	if (fDatas) {
		eachForm(formName, function(element) {
			var el = $(element);
			var v = fDatas[element.id] || fDatas[element.name];
			var format = el.attr("format");
			var formatFun = {
				"date" : function(v) {
					return (new Date(v)).pattern("yyyy-MM-dd");
				}
			};
			if (format) {
				v = formatFun[format](v);
			}
			if (v) {
				$(element).val(v);
			}
		});
	}
}
/**
 * 将指定表单转换成json数据
 * @param fromObj
 * @returns {___anonymous15955_15956}
 */
function formToJson(fromObj){
	var jsonObj={};
	eachForm(fromObj, function(element) {
		jsonObj[element.name]=$(element).val();
	});
	return jsonObj;
}

/**
 * 设置指定的form表单为只读
 * @param formName
 * @param fun
 */

function setFormRead(formName, fun) {
	var setElementRead = function(element) {
		if (element) {
			var end = $(element);
			var elementParent = end.parent();
			var hideElements = elementParent.find(".readOnlyDiv");
			var readDiv = "";
			if ((end.attr("type") && end.attr("type") == "hidden")
					|| end.css("display") == "none") {
				return;
			}
			if (!hideElements.length) {
				readDiv = $('<div class="readOnlyDiv"></div>');
				readDiv.appendTo(end.parent());
			} else {
				readDiv = $(hideElements.get(0));
			}
			var v = end.val() || "";
			if (element.tagName == "SELECT") {
				if(end.val()){
					v = $(element.options[end.get(0).selectedIndex]).text();
				}
			} else if (element.tagName == "INPUT"
					&& (end.attr("type") && (end.attr("type") == "radio" || end
							.attr("type") == "checkbox"))) {
				if(end.attr("checked")){
					v = end.next().text();
				}else{v="";}
			}
			if (fun) {
				fun(end, elementParent);
			}
			if (elementParent.find("input").length) {
				var space = "";
				if (readDiv.get(0).innerHTML) {
					space = "~";
				}
				if((v+"").length){
					readDiv.get(0).innerHTML = readDiv.get(0).innerHTML + space + v;
				}
			} else {
				readDiv.html(v);
			}
			readDiv.show();
			end.hide();
		}
	};
	if (typeof (formName) == "string") {
		eachForm(formName, setElementRead);
	} else if (typeof (formName) == "object") {
		if(formName instanceof  Array){
			for (var i = 0; i < formName.length; i++) {
				setElementRead(document.getElementById(formName[i]));
			}
		}else{
			eachForm(formName, setElementRead);
		}
	}
}

/**
 * 设置当前dom下的所有form表单的只读操作
 */
function setDomFormsRead(){
	 var forms = document.forms;
    if (forms) {
        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            setReadStatus=$(form).attr("setRead");
            if(setReadStatus){
            	setFormRead(form);
            }
        }
    }
}
/**
 * 取消form表单的只读功能。前题是之前的表单使用setDomFormsRead做了只读操作
 * @param formName
 */
function cancelFormRead(formName) {
	eachForm(formName, function(element) {
		var end = $(element);
		var hideElements = end.parent().find(".readOnlyDiv");
		if (hideElements.length) {
			hideElements[0].hide();
			end.show();
		}
	});
}

/**
 * 针对于指定的子窗口进行最大化及最小化操作
 * @param formName
 */
function expandToggle(formName){
	var fName=formName||"formSwap";
	$("#"+fName).bind("click",function(ev){
		var obj=ev.srcElement || ev.target;
		var endObj=$(obj);
		var nextObj=endObj.parent().next();
		if(obj.tagName=="SPAN"&&endObj.hasClass("expandBtn")){
			if(endObj.hasClass("expandOver")){
				endObj.removeClass("expandOver");
				nextObj.show("blind");
			}else{
				endObj.addClass("expandOver");
				nextObj.hide("blind");
			}
		}
	});
}

/**
 * 根据当前控件获取下一控件
 * @param ev
 * @param key
 */
function getNextInput(ev,key){debugger;
	   var obj = ev.target || ev.srcElement;//获取事件源
	   var key=key||13;
	   if(ev.keyCode===key){
		   var form=jyTools.getParentNodeByTagName(obj,"FORM");
		   var nextObj=(function(){
			   if(form){
				   for(var i=0;i<form.elements.length;i++){
					   if(form.elements[i]==obj){
						   break;
					   }
				   }
				   while(true){
					   if(++i<form.elements.length){
						   if(form.elements[i].type!="hidden"){
							   return form.elements[i];
						   }
					   }else{
						   return form.elements[0];
					   }
				   }
			   }
		   })();
		   if(nextObj){
			   $(nextObj).focus();
			   ev.preventDefault();
		   }
	   }
}


function Mask(struct, maskName, container) {
    this.struct= struct;
    this.maskName = maskName + "Mask";
    this.container = container||document.body;
}

Mask.prototype = {
    constructor: Mask,
    show:function(showText){
    	var that=this;
    	var isDisplay=' display:block; ';
    	var tsV="0.12";
    	var text="正在加载..."
    	if(showText){
    		//isDisplay="display:none; ";
    		//tsV="0";
    		text=showText;
    	}
    	$(that.container).append(
				'<div style="position: absolute;width:100%;top:0px;bottom:0px;z-index:100000;background:rgba(73, 69, 69, '+tsV+')" id="'
						+ that.maskName
						+ '">'
						+ '<div style="position: absolute; width:105px;left:50%;'+isDisplay
						+ 'border: 2px solid #69AAE6;background:#FFFFFF; margin-left:-55px;top:50%;margin-top:-15px;margin:auto;">'
						+ '<div class="loading"></div><div style="float: left;margin: 6px;">'+text+'</div></div></div>');

    },
    close:function(){
    	var that=this;
    	setTimeout(function(){
    		$("#"+that.maskName).remove();
    		that=null;
    	},100)
    	
    }
};
(function($){
    $.fn.newMask = function (struct, name) {
        var tname = (new Date()).getTime()+Math.round((Math.random()*100));
        return new Mask(struct, tname, $(this)[0]);
    };
})(jQuery);
function banBackSpace(e){
    var ev = e || window.event;//获取event对象
    var obj = ev.target || ev.srcElement;//获取事件源
    var t = obj.type || obj.getAttribute('type');//获取事件源类型
    //获取作为判断条件的事件类型
    var vReadOnly = obj.getAttribute('readonly');
    var vEnabled = obj.getAttribute('enabled');
    //处理null值情况
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;
    vEnabled = (vEnabled == null) ? true : vEnabled;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readonly属性为true或enabled属性为false的，则退格键失效
    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea") && (vReadOnly==true || vEnabled!=true))?true:false;

    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ?true:false;

    //判断
    if(flag2){
        return false;
    }
    if(flag1){
        return false;
    }
}

//禁止后退键 作用于Firefox、Opera
document.onkeypress=banBackSpace;
//禁止后退键  作用于IE、Chrome
document.onkeydown=banBackSpace;
window.history.forward(1);
 