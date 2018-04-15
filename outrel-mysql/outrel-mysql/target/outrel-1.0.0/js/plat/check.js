var errorHTML = "<p><span class='icon icon-remind'>&nbsp;</span><span id='errortip'></span></p>";
var ERROR_CLASS = "checkError";
var NULL_CLASS="nullError";
var TOOLTIPDIV = "tooltipDiv" + (new Date()).getTime();
var TOOLTIPDIV_TEXT = TOOLTIPDIV + "_T";
var helpHTMLH = 86;
var regExps = {
    "date": /^([1-2]\d{3})(0?[1-9]|10|11|12)([1-2]?[0-9]|0[1-9]|30|31)$/ig,
    "telephone":/(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^[1][0-9]{10}$)/,
    "mobilePhone": /^1[0-9]{10}$/,// 移动手机
    "idCard": /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,// 身份证号
    "linePhone": /^[1][3|5][0-9]{9}$/,
    "postcode": /^[0-9]{6}$/,
    "email": /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
    "number": /^[0-9|.]*$/,// 数值
    "money":/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/,
    "percent":/^(([1-9]{1}\d?)|([0]{1}))(\.(\d){1,4})?$/,
    "rationalNumber":/^-?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/,
    "numberLetter": /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/,
    "fixedLineTelephone": /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
    "phone_area_code": /^0[0-9]{2,3}$/,//电话区号
    "single_telephone": /^[2-9][0-9]{6,7}$/,//固定电话(只有电话)
    "positiveInteger": /^[0-9]*$/,
    "positiveRation":/^(([0-9]+[\.]?[0-9]+)|[1-9])$/ //正有理数
}; // 数值加字母;
function createErrorTip() {
    if (!$("#" + TOOLTIPDIV).length) {
        $('<div id="' + TOOLTIPDIV + '" class="fieldTooltip"><div class="direction"></div><div id="' + TOOLTIPDIV_TEXT + '"></div></div>').appendTo(document.body);
    }
}
function createHelpTip() {
    if (!$("#helpTipDiv").length) {
        $('<div id="helpTipDiv" class="fieldTooltip" style="display:none;position:absolute;"></div>').appendTo(document.body);
    }
}
/** 为所有需要校验的字段增加事件，全局事件* */
function addCheckEvent(form) {
    createErrorTip();
    checkIsNullCallBack(form,function(element,backFun){
    	addAttributeEvent(element);
        addCheckBlurEvent(element);
        addCheckFocusEvent(element);
        backFun();
    });
}
 
function checkIsNullCallBack(formNameOrFormObj,callFun,errorEls) {
	var nullCount = 0;
    var errorEls =errorEls||[];
    eachForm(formNameOrFormObj,function(element){
    	var fun=function(){
    		var count = subIsNull(element);
    		if (count > 0) {
    			errorEls.push(element);
    		}
    	}
    	if(callFun){//如果调用时有回调方法，则执行回调。
			callFun(element,fun);
		}else{
			fun();
		}
    });//如果是form对像（名称，dom对像，jquery对像）
    return !errorEls.length;
}
function checkIsNullForJqueryObj(form) {
   return checkIsNullCallBack(form[0]);
}
function checkLength(element) {
    if (element) {
        var maxL = element.getAttribute("maxLength");
        if (maxL&& (element.nodeName.toUpperCase == "INPUT" ||element.nodeName.toUpperCase() == "TEXTAREA")) {
            if (element.type == "text" || element.type == "password"||element.nodeName.toUpperCase() == "TEXTAREA") {
                var jElement=$(element);
            	var value = jElement.val().trim();
                if (null != value && value.length > 0 && undefined != value) {
                    var length =jyTools.byteLength(value);
                    if (length > maxL) {
                    	return "长度超长";
                    }
                }
            }
        }
    }
    return "";
}

/** 公共的判断是否有空属性* */
function subIsNull(element) {
	var jElement=$(element);
    if (jElement.attr("notNull")) {
        var isNull = false;
        var v=jElement.val();
        if(null!=v&&undefined!=v&&(v+"").trim().length>0){
        	removeNullCss(jElement);
            $("#" + TOOLTIPDIV).hide();
            return 0;
        }else{
        	setNullCss(jElement,"字段不能为空");
            return 1; 
        }
    }
    return 0;
}
/** 增加失去焦点事件* */
function addCheckBlurEvent(element) {
    $(element).bind("blur", (function (ev) {
        if (subIsNull(element) <= 0) {
            checkBlurFormat(element);
        }
    }));
}

function addCheckFocusEvent(element){
    $(element).bind("focus", (function (ev) {
    	var el=$(element);
    	var value=el.val();
    	var checkType=el.attr("checkType");
        if(checkType=="money"){
        	//el.val(value.jyReplaceAll(",",""));
        }
    }));
}

// **增加验证长度的事件不支技长度为0的
function addCheckLengthEvent(element) {
    var maxL = element.getAttribute("maxLength");
    if (maxL) {
        var cutStr = function (ev) {
            var value = element.value;
            if ((value + "").length > 0 && undefined != value) {
                var length = jyTools.byteLength(value);
                if (length > maxL) {
                    element.value = value.subByteStr(maxL);
                }
            }
        };
        $(element).bind("keyup", cutStr).bind("propertychange", cutStr);
    }
}

//**增加验证长度的事件不支技长度为0的
function addAttributeEvent(element) {
	var jElement=$(element);
	var isFloat=jElement.attr("isFloat")||jElement.attr("isMoney");
	var eventFun=function(){
		var maxL=jElement.attr("maxLength");
		var isNum=jElement.attr("isNum");
		if(maxL){
			 var value = jElement.val();
            if ((value + "").length > 0 && undefined != value) {
                var length = jyTools.byteLength(value);
                if (length > maxL) {
                	jElement.val(value.subByteStr(maxL));
                }
            }
		}
		if(isNum){
            var v = jElement.val();
            v = v.replace(/[^0-9]/g, '');
            jElement.val(v);
		}
		
	};
	jElement.bind("keyup", eventFun).bind("propertychange", eventFun);
	if(isFloat){
		jElement.bind("keydown", function(ev){
			 return jyTools.isFloat(ev,$(this));
		});
	}
}
function addNumberInputEvent(element) {
    var isNum = $(element).attr("isNum");
    if (isNum) {
        $(element).bind("keyup", function () {
            var v = element.value;
            v = v.replace(/[^0-9]/g, '');
            element.value = v;
        });
    }
}

/** 绑定body事件，用来显示提示数据错误信息（数据为空,数据格式不正确等）* */
function bindBodyEvent() {
    $("body").unbind().bind("mouseover", function (ev) {
        var obj = ev.srcElement || ev.target;
        var tooltipDiv = $("#" + TOOLTIPDIV);
        var el = $(obj);
        if (el.hasClass(ERROR_CLASS)||el.hasClass(NULL_CLASS)) {
            groupErrorTip(tooltipDiv, el);
            var y = el.offset().top;
            var x = el.offset().left;
            var elementW = el.width();
            var h = el.height();
            var w = el.width();
            tooltipDiv.css("left", ((x + (elementW - w) / 2)) + "px");
            tooltipDiv.css("top", (y + h + 10) + "px");
            tooltipDiv.css("min-width", w + "px");
            tooltipDiv.hide();
            tooltipDiv.slideToggle(500);
        } else {
            tooltipDiv.hide();
        }
        //hideHelpTip();// 公共的，当点击body时将帮助系统关闭
        //$("div.piup").hide();
    });

};

function getAllBtnElement() {
    var forms = document.forms;
    var returnElements = [];
    if (forms) {
        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            var elements = form.elements;
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element.nodeName == "INPUT" || element.nodeName == "input") {
                    // if(element.attributes["type"]&&element.attributes["type"].nodeValue){
                    // if(element.attributes["type"].nodeValue=="button"){
                    returnElements.push(element);
                    // }
                    // }
                }
            }
        }
    }
    return returnElements;
}
function groupErrorTip(tipObj, element) {
    var strs = [];
    if(element.val() != null && element.val() != undefined&&element.hasClass(NULL_CLASS)&&element.attr("nulltip")){
    	strs.push(element.attr("nulltip"));
    }else if(element.hasClass(ERROR_CLASS)&&element.attr("errortip")){
    	strs.push(element.attr("errortip"));
    }
    if(!strs.length){
    	if(element.attr("checktip")){
    		strs.push(element.attr("checktip"));
    	}else if (element.attr("tipText")) {
    		strs.push(element.attr("tipText") + "校验未通过!");
    	}else{
    		strs.push("未通过校验！");
    	}
    }
    $("#" + TOOLTIPDIV_TEXT).html(strs.join("<br/>"));
}
/** 方法校验* */
function checkCallFun(elObj, isCheckFun) {
    if (isCheckFun) {
        var fun = elObj.attr("checkFun")||elObj.attr("checkfun");
        if (typeof (fun) == "string") {
            fun = eval("("+fun+")");
            var str = fun(elObj[0]);
            if (str && str.length > 0) {
                return str;
            }else{
            	elObj.removeClass(ERROR_CLASS);
            	//elObj.removeClass(NULL_CLASS);
            }
        }
    }
    return "";
}
/*属性效验*/
function checkProperty(element) {
	var value= element.val().trim();
	var checkType=element.attr('checkType');
	if(checkType=="money"){
		value=value.jyReplaceAll(",","");
	}
    if (testRegExp(checkType,value)) {
    	if(checkType=="money"){
//    		element.val(value.formatMoney());
    	}
    	return "";
    }else{
    	return "校验错误";
    }
}

function checkBlurFormat(element, isCheckFun) {
	var checkStatus = 1;
    if (element) {
        var str = "";
        var elObj = $(element);
        try {
            if (!str&&elObj.attr("checkType")) {
                str = checkProperty(elObj);
            }
            if (!str&&elObj.attr("regExp")) {
                var regExp = elObj.attr("regExp");
                regExp = eval(regExp);
                if (!testRegExp(null,elObj.val().trim(),regExp)) {
                    str = "校验失败";
                }
            }
            if (!str&&elObj.attr("checkFun")) {
            	str = checkCallFun(elObj, true);
            }
        } catch(e){}
        if(!str){
        	str=checkLength(element);//校验长度。
        }
        //var elements = checkLinkObj(element);//用来校验关链的对像
        if (str && str.length > 0) {
            setErrorCss(elObj, str);
        } else {
            removeErrorCss(elObj);
            checkStatus=0;
        }
        if(isCheckFun){
        	isCheckFun(element,checkStatus);
        }
    }
    return checkStatus;
}
/** 提交时只做非空校验操作* */
function submitCheckIsNull(formInfo,isFilterDisplayNone,errorElements) {
    return checkIsNullCallBack(formInfo,function(element,callFun){
    	if(isFilterDisplayNone){
    		if(checkisNoDisplay(element)){
    			callFun();
    		}
    	}else{
    		callFun();
    	}
    },errorElements);
}
function checkIsNull(formInfo,isFilterDisplayNone){
	 return submitCheckIsNull(formInfo,isFilterDisplayNone);
}
function checkIsNullByObjs(elements,isFilterDisplayNone){
	return submitCheckIsNull(elements,isFilterDisplayNone)
}
function removeErrorCss(elObj) { 
    elObj.removeClass(ERROR_CLASS);
    //elObj.attr("errortip", "");
    $("#" + TOOLTIPDIV).hide();
}
function setErrorCss(elObj, str) {
    elObj.addClass(ERROR_CLASS);
    elObj.attr("errortip", str);
}
function removeNullCss(elObj) { 
    elObj.removeClass(NULL_CLASS);
    //elObj.attr("nulltip", "");
    $("#" + TOOLTIPDIV).hide();
}

function setNullCss(elObj, str) {
    elObj.addClass(NULL_CLASS);
    elObj.attr("nulltip", str);
}


function getElementsByName(name) {
    if (name) {
        var elements = document.all;
        if (elements) {
            var els = [];
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element != null && element != undefined) {
                    if (element.attributes) {
                        var node = element.attributes["name"];
                        if (node && node.nodeValue && node.nodeValue == name) {
                            els.push(element);
                        }
                    }

                }
            }
            return els;
        }
        return document.getElementsByName(name);
    }
}
function checkLinkObj(element) {
    var elements = [ element ];
    if (element.attributes["linkObj"]
        && element.attributes["linkObj"].nodeValue) {
        var objName = element.attributes["linkObj"].nodeValue;
        if (objName.indexOf(",") > -1) {
            var ids = objName.split(",");
            for (var i = 0; i < ids.length; i++) {
                var linkObj = document.getElementById(ids[i]);
                if (linkObj) {
                    elements.push(linkObj);
                }
            }
        } else {
            var linkObj = document
                .getElementById(element.attributes["linkObj"].nodeValue);
            if (linkObj) {
                elements.push(linkObj);
            }
        }
    }
    if (element.attributes["linkObjName"]
        && element.attributes["linkObjName"].nodeValue) {
        var objName = element.attributes["linkObjName"].nodeValue;
        var linkObjs = getElementsByName(objName);
        if (linkObjs) {
            for (var i = 0; i < linkObjs.length; i++) {
                elements.push(linkObjs[i]);
            }
        }
    }
    return elements;
}
function checkisNoDisplay(element){
	var jElement=$(element);
	var isDisplayNone=function(jElement){
		if((jElement.css("display")&&jElement.css("display")=="none") || jElement.attr("type")=="hidden"){
			return false;
		}
		return true;
	}
	var checkFun=function(jElement){
		var bit=isDisplayNone(jElement);
		if(!bit){
			return bit;
		}else{
			var pe=jElement.parent();
			if(pe&&pe.length&&pe[0].tagName.toUpperCase()=="BODY"){
				return isDisplayNone(pe);
			}else{
				return arguments.callee(pe);
			}
		}
	}
	return checkFun(jElement);
}
/** 公共统一管理前台格式校验信息 
 * isCheckFun:校验完该元素时,调用回调函数执行操作
 * * */
function checkFormFormat(formName,isFilterDisplayNone, isCheckFun,errorEls) {
	errorEls=errorEls||[];
    eachForm(formName,function(element){
    	var bit=true;
    	if(isFilterDisplayNone){
    		bit=checkisNoDisplay(element);
    	}
    	if(bit&&checkBlurFormat(element, isCheckFun)){
    		errorEls.push(element)
		}
    });
    return !(errorEls.length);
}
function checkFormatByObjs(elements,isFilterDisplayNone){
	return checkFormFormat(elements,isFilterDisplayNone)
}

/** 新建节点* */
function createNode(nodeName, innerText) {
    var newNode = document.createElement(nodeName);
    newNode.className = "icon-question";
    newNode.innerHTML = innerText;
    return newNode;
}
// 向指定结点后插入新结点函数
function appAfter(element) {
    var newNode = createNode("em", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    if (element.parentNode) {
        var nextNode = $(element).next();
        if (nextNode) {
            element.parentNode.insertBefore(newNode, nextNode[0]);
        } else {
            element.parentNode.appendChild(newNode);
        }
    }
    return newNode;
}
/** 重新定位帮助页面的位置* */
function createHelp(element, content) {
    var newNode = $(element).next();
    if (newNode) {
        newNode.bind("click", function (ev) {
            var $el = newNode;
            var y = $el.offset().top;
            var x = $el.offset().left;
            var elementW = $el.width();
            $("#helpTipDiv").hide();
            $("#bubble_middle").html(content);
            var helpHTMLH = $("#helpTipDiv").height();
            if ((y - helpHTMLH) > -1) {
                createTopHelp(x, y, helpHTMLH, element);
            } else {
                createDownHelp(x, y, helpHTMLH, element);
            }
            $("#bubble_middle").html(content);
            $("#helpTipDiv").slideToggle(500);
        });
    }
}
function createTopHelp(x, y, helpHTMLH, element) {
    var bigWidth = window.screen.availWidth > document.body.clientWidth ? document.body.clientWidth
        : window.screen.availWidth;
    if ((x + $("#helpTipDiv").width()) > bigWidth) {
        x = x - $("#helpTipDiv").width() + 130;
    }
    // alert(document.body.clientWidth+"----"+x+"----"+$("#helpTipDiv").width());
    $("#helpTipDiv").css("left", (x - 80) + "px");
    $("#helpTipDiv").css("top", (y - helpHTMLH) + "px");
    $("#helpTipDiv").html(helpHTML);
}
function createDownHelp(x, y, helpHTMLH, element) {
    var objH = element.offsetHeight;
    $("#helpTipDiv").css("left", (x - 80) + "px");
    $("#helpTipDiv").css("top", (y + objH) + "px");
    $("#helpTipDiv").html(helpHTML2);
}
/** 全部重建帮助提示* */
function appendHelpSys(helpDatas, form) {
    createHelpTip();
    if (helpDatas && form) {
        // var helpStr="<em
        // class='icon-question'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em>";
        // var elements=form.elements;
        for (var i = 0; i < helpDatas.length; i++) {
            var data = helpDatas[i];
            var fieldId = data["name"];
            if (fieldId) {
                var element = $("#" + fieldId);
                if (element) {
                    createHelp(element[0], data["descrip"]);
                }
            }
        }
    }
}
function hideHelpTip() {
    $("#helpTipDiv").hide();
}

/** 重置表单* */
function resetForm(formName) {
    var form = document.getElementById(formName);
    var elements = form.elements;
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.nodeName.toUpperCase() == "INPUT" || element.nodeName.toUpperCase() == "TEXTAREA") {
            $(element).val("");
        } else if (element.nodeName == "SELECT"){
            if (element.options.length > 0) {
                element.options[0].selected = true;
            }
        }
    }
}

function testRegExp(typeName, value,regExpObj) {
    if (null != value && value.toString().length > 0) {
    	var regExp = "";
    	if(regExpObj){
    		regExp=regExpObj;
    	}else{
    		regExp=regExps[typeName];
    	}
        if (regExp) {
            return regExp.test(value);
        }
    }
    return true;
}

function checkedInit() {
    var forms = document.forms;
    if (forms) {
        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            checkedInitForm(form);
        }
    }
}
function checkedInitForm(formObj) {
    var form;
    if (typeof(formObj) == "string") {
        form = $("#" + formObj)[0];
    } else {
        form = formObj;
    }
    if (form.attributes["isCheck"]) {
        addCheckEvent(form);
        bindBodyEvent();
    }
}
//校验密码复杂度
function checkPass(s){ 
	var _warnMsg = "密码不少于8位且应包含字母数字大小写";
	if(s ==null||s == ''||s =='密码'){
		return _warnMsg;
	}
	var cun = 0;
    if(s.length >= 8) cun++;
   
    if(s.match(/([a-z])+/)) cun++;
    if(s.match(/([0-9])+/)) cun++;
    if(s.match(/([A-Z])+/)) cun++;
   
    //特殊字符控制
    //if(s.match(/[^a-zA-Z0-9]+/)) cun++;
    if(cun != 4){
 	   return _warnMsg;
    }else{
 	   return "";
    }
}

/*----------------------------------------------------校验并弹框提醒----------------------------------------------------*/
/**
 * 非空校验
 * @param formObj
 * @returns {Boolean}
 */
function showLatestCheckNullErrors(formObj) {
	var nullErrors=[];
	submitCheckIsNull(formObj,null,nullErrors);
	
	if(nullErrors.length) {
		var nullErrorObj=$(nullErrors[0]);
		var checkChName=nullErrorObj.attr("checkChName")||"";
		if(!checkChName) {
			checkChName=nullErrorObj.parent("td").prev("th").text()||"";
		}
		
		if(checkChName) {
			checkChName="["+checkChName+"]";
		}
		
		var checkTip=msgAddCss(checkChName)+"不能为空!";
		$("").newMsg({}).show(checkTip);
		return true;
	}
	
	return false;
}

/**
 * 格式校验
 * @param formObj
 * @returns {Boolean}
 */
function showLatestCheckFormatErrors(formObj) {
	var formatErrors=[];
	checkFormFormat(formObj,null,null,formatErrors);
	
	if(formatErrors.length) {
		var formatErrorObj=$(formatErrors[0]);
		var checkChName=formatErrorObj.attr("checkChName")||"";
		if(!checkChName) {
			checkChName=formatErrorObj.parent("td").prev("th").text()||"";
		}
		
		if(checkChName) {
			checkChName="["+checkChName+"]";
		}
		
		var checkTip=msgAddCss(checkChName)+"未通过校验!";
		$("").newMsg({}).show(checkTip);
		return true;
	}
	
	return false;
}

/**
 * 显示信息-添加显示样式
 * @param msg
 * @returns {String}
 */
function msgAddCss(msg){
	return "<span style='font-weight:bolder;color:#ff0000;'>"+msg+"</span>"
}
/*----------------------------------------------------校验并弹框提醒----------------------------------------------------*/