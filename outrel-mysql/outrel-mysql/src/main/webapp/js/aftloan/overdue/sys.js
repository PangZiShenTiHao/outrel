/**
 * 打开模态窗口,不能改变窗口大小
 */
function dialog(actionUrl, width, height) {
  var locX = (screen.width - width) / 2;
  var locY = (screen.height - height) / 2;
  var attrs = null;
  
  attrs = "status:no;directories:no;scroll:no;resizable:no;";
  attrs += "dialogWidth:" + width + "px;";
  attrs += "dialogHeight:" + height + "px;";
  attrs += "dialogLeft:" + locX + "px;";
  attrs += "dialogTop:" + locY + "px;";
  return window.showModalDialog(actionUrl, self, attrs);
}

/**
 * 打开模态窗口,能改变窗口大小


 */
function dialogChangesize(actionUrl, width, height) {
  var locX = (screen.width - width) / 2;
  var locY = (screen.height - height) / 2;
  var attrs = null;
  
  attrs = "status:no;directories:yes;scroll:yes;Resizable=yes;";
  attrs += "dialogWidth:" + width + "px;";
  attrs += "dialogHeight:" + height + "px;";
  attrs += "dialogLeft:" + locX + "px;";
  attrs += "dialogTop:" + locY + "px;";
  attrs += "scroll:yes" ;
  return window.showModalDialog(actionUrl, self, attrs);
}


/**
 * 打开窗口,能改变窗口大小


 */
function openWindow(actionUrl, title, width, height) {
  var winParam = "menubar=0,toolbar=0,status=0";
  winParam += ",scrollbars=1,resizable=1";
  if (!width) {
    width = 800;
  }
  if (!height) {
    height = 600;
  }
  var left = (screen.width - width) / 2;
  var top = (screen.height - 100 - height) / 2;
  winParam += ",width=" + width;
  winParam += ",height=" + height;
  winParam += ",top=" + top;
  winParam += ",left=" + left;
  winParam += ",location=no";
  
  return window.open(actionUrl, title, winParam);
}
 

/**
 * 全屏打开jsp，有滚动条
 * 
 * @author cxt
 * @param actionUrl
 * @param title
 * @returns
 */
 function openFullWindowWithScrollbar(actionUrl, title) {
	  var winParam = "menubar=0,toolbar=0,status=0";
	  winParam += ",scrollbars=1,resizable=1";
	  var left = 0;
	  var top = 0;
	  winParam += ",width=" + screen.width;
	  winParam += ",height=" + screen.height;
	  winParam += ",top=" + top;
	  winParam += ",left=" + left;
	  winParam += ",location=no";
	  
	  return window.open(actionUrl, title, winParam);
	}

 
 /**
  * 全屏打开jsp，没有滚动条
  * 
  * @author cxt
  * @param actionUrl
  * @param title
  * @returns
  */
 function openFullWindow(actionUrl, title) {
	  var winParam = "menubar=0,toolbar=0,status=0";
	  winParam += ",scrollbars=0,resizable=1";
	  var left = 0;
	  var top = 0;
	  winParam += ",width=" + screen.width;
	  winParam += ",height=" + screen.height;
	  winParam += ",top=" + top;
	  winParam += ",left=" + left;
	  winParam += ",location=no";
	  
	  return window.open(actionUrl, title, winParam);
	}
 
 
 
 /**
  * Select 生成 option方便方法


  */
 function setOptions(el,aOption,value){
		for(var i = 0 ;i<aOption.length;i++){
			var _option = document.createElement("option");
		_option.value = aOption[i].value;
		if (aOption[i].value == value) {
	      		_option.selected = true;
	    	}
		_option.appendChild(document.createTextNode(aOption[i].text ));
		el.appendChild(_option);
	}

}

/**
 * 判断是否是整数


 */
function isInteger(aValue) {
  if (aValue == null) {
    return false;
  }
  var reg = /^[-+]?[1-9][0-9]*$/;
  return reg.test(aValue);
}


/**
 * 判断是否是整数+ 0


 */
function isIntegeOrZero(aValue) {
  if (aValue == null) {
    return false;
  }
  var reg = /^\d+$/;
  return reg.test(aValue);
}
/**
 * 判断是否是正整数
 */
function isPositivInteger(aValue) {
  if (aValue == null) {
    return false;
  }
  var reg = /^[1-9][0-9]*$/;
  return reg.test(aValue);
}

/**
 * 判断日期是否有效
 */
function isValidDate(year, month, day) {
  // alert(year + " " + month + " " + day);
  return isValidDateStr(year + "-" + month + "-" + day);
}

/**
 * 判断是否为合法的日期串


 * 
 * @str 日期串


 */
function isValidDateStr(str) {
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
  var d = new Date(r[1], r[3]-1, r[4]); 
  return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}

/**
 * 判断是否为合法的时间串


 * @param str
 * @return
 */
function isValidTimeStr(str) {
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
}

/**
 * 判断是否为合法的日期时间串


 * @param str
 * @return
 */
function isValidateTimeStr(str) {
  if (!str) {
    return;
  }
  var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})$/); 
  if (r == null) {
    return false;
  }
  if (parseInt(r[1]) > 9999 || parseInt(r[1]) < 1753) {
    return false;
  }
  var d = new Date(r[1], r[3]-1, r[4]); 
  if (!(d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4])) {
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
}

 /**  
  * 对Date的扩展，将 Date 转化为指定格式的String  
  * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符  
  * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)  
  * eg:  
  * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423  
  * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04  
  * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04  
  * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04  
  * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18  
  */  
 Date.prototype.pattern=function(fmt) {   
     var o = {   
     "M+" : this.getMonth()+1, //月份   
     "d+" : this.getDate(), //日   
     "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时   
     "H+" : this.getHours(), //小时   
     "m+" : this.getMinutes(), //分   
     "s+" : this.getSeconds(), //秒   
     "q+" : Math.floor((this.getMonth()+3)/3), //季度   
     "S" : this.getMilliseconds() //毫秒   
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
     if(/(y+)/.test(fmt)){   
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
     }   
     if(/(E+)/.test(fmt)){   
         fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);   
     }   
     for(var k in o){   
         if(new RegExp("("+ k +")").test(fmt)){   
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
         }   
     }   
     return fmt;   
 } 
 
 
 
 
 /**
  * 处理frameset,左边是菜单,右边是功能区,菜单不随着功能区滚动的问题
  * @param menuId
  * @param mainId
  * @param minHeight
  * @param url
  * @return
  */
 function doFramesetScroll(menuId, mainId, minHeight, url) {
   try {
     var main = document.getElementById(mainId);
     var menu = document.getElementById(menuId);
  //   menu.scrolling = "no";
     menu.contentWindow.document.body.style.height = "auto";
     menu.contentWindow.document.attachEvent && menu.contentWindow.document.attachEvent("onmousewheel", function(e) {
       var top = (main.contentWindow.document.documentElement || main.contentWindow.document.body).scrollTop;
       if (e.wheelDelta >= 120) {
         main.contentWindow.scrollTo(0, top - 50);
       }
       else {
         main.contentWindow.scrollTo(0, top + 50);
       }
     });
     main.onload = main.onreadystatechange = function() {
       if (!this.readyState || this.readyState == "complete") {
         menu.contentWindow.scrollTo(0, 0);
         main.contentWindow.document.body.style.minHeight = parseInt(minHeight-160) + "px";
         if (main.contentWindow.attachEvent) {
           main.contentWindow.attachEvent("onscroll", function(e) {
             menu.contentWindow.scrollTo(0, main.contentWindow.document.documentElement.scrollTop);
             return false;
           });
         }
         else if (main.contentWindow.addEventListener) {
           main.contentWindow.addEventListener("scroll", function(e) {
             menu.contentWindow.scrollTo(0, main.contentWindow.document.documentElement.scrollTop);
             return false;
           }, false);
         }
       }
     };
     main.src = url;
   } catch (e) {
     
   } finally {
     
   }
 }
 
 /**
  * 格式化金额
  * @param obj
  * @param n
  */
function farmatMoney(obj, n)  {  
   var s = obj.value;
   if(obj.value == ""){
	   $(obj).val("");
   }else{
	   n = n > 0 && n <= 20 ? n : 2;  
	   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	   var l = s.split(".")[0].split("").reverse(),  
	   r = s.split(".")[1];  
	   t = "";  
	   for(i = 0; i < l.length; i ++ )  
	   {  
	      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	   }  
	   $(obj).val(t.split("").reverse().join("") + "." + r);
   }
}  

/**
 * 格式化金额
 * @param obj
 * @param n
 */
function fMoney(s, n)  {  
  if(s == ""){
	  return s;  
  }else{
	  n = n > 0 && n <= 20 ? n : 2;  
	  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	  var l = s.split(".")[0].split("").reverse(),  
	  r = s.split(".")[1];  
	  t = "";  
	  for(i = 0; i < l.length; i ++ )  
	  {  
	     t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	  }  
	  return t.split("").reverse().join("") + "." + r;  
  }
} 


/**
 * 还原金额
 * @param s
 * @returns
 */
function rmoney(s)  {  
   return parseFloat(s.replace(/[^\d\.-]/g, ""));  
} 
