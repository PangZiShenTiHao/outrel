/**
 * 单位名称辅助录入
 * @param request
 * @param response
 * @param columnId
 */
function comNameAssistInput(fun, val, obj) {
	try{
		var v = val;
		var columnId = obj.attr("id");
		var minLen = 6;
		if(!checkMinLength(v,minLen)) {
			return;
		}
		
		var preVal = getPreVal(columnId);
		var diffFlag=true;
		if(preVal&&v.substr(0,minLen)!=preVal){
			diffFlag=false;
		}
		setPreVal(columnId, v.substr(0,minLen));
		
		var preLength = getPreLength(columnId);
		if(diffFlag&&preLength&&Math.abs(v.length-preLength)<2){
			return;
		}
		
		setPreLength(columnId, v.length);
		
		var applyPrefix=getApplyPrefix();
		var pyIdx=getPyIdx(columnId);
		var url = contextRootPath+"/lbTIntoInfo/comNameAssistInput";
		var params = "applyPrefix="+applyPrefix+"&pyIdx="+pyIdx+"&keyWords="+val;
		jyAjax(url, params, function(msg) {
			var v_status = msg.status;
			if (v_status.indexOf('ok') > -1) {
				if(msg.data) {
					fun(msg.data);
				}
			}
		},null,null,null,null,true);
	} catch(err) {
	}
}

/**
 * 地址辅助录入
 * @param request
 * @param response
 * @param columnId
 */
function addressAssistInput(fun, val, obj, areaCodeColumnId) {
	try{
		var v = val;
		var columnId = obj.attr("id");
		var minLen = 4;
		var areaCode=$("#"+areaCodeColumnId).val();
		if(null==areaCode||undefined==areaCode||(areaCode+"").trim()=="") {
			return;
		}
		
		if(!checkMinLength(v,minLen)) {
			return;
		}
		
		var preVal = getPreVal(columnId);
		var diffFlag=true;
		if(preVal&&v.substr(0,minLen)!=preVal){
			diffFlag=false;
		}
		setPreVal(columnId, v.substr(0,minLen));
		
		var preLength = getPreLength(columnId);
		if(diffFlag&&preLength&&Math.abs(v.length-preLength)<2){
			return;
		}
		setPreLength(columnId, v.length);
		
		var applyPrefix=getApplyPrefix();
		var pyIdx=getPyIdx(columnId);
		var params = "applyPrefix="+applyPrefix+"&pyIdx="+pyIdx+"&areaCode="+areaCode+"&keyWords="+val;
		var url = contextRootPath+"/lbTIntoInfo/addressAssistInput";
		
		jyAjax(url, params, function(msg) {
			var v_status = msg.status;
			if (v_status.indexOf('ok') > -1) {
				if(msg.data) {
					fun(msg.data);
				}
			}
		},null,null,null,null,true);
	} catch(err) {
	}
}

/**
 * 校验允许查询的最小值
 * @param v
 * @param minLen
 * @returns {Boolean}
 */
function checkMinLength(v, minLen) {
	if(null!=v&&undefined!=v&&(v+"").trim()!=""&&v.length>=minLen) {
		return true;
	} else {
		return false;
	}
}

function filterVal(v) {
	return v.replace(/[^\u4E00-\u9FA5]*/ig,"");
}

//
var preLengthMap={};
function setPreLength(columnId, len) {
	preLengthMap[columnId+"Len"]=len;
}

function getPreLength(columnId) {
	return preLengthMap[columnId+"Len"];
}

var preValMap={};
function setPreVal(columnId, v) {
	preValMap[columnId+"Val"]=v;
}

function getPreVal(columnId) {
	return preValMap[columnId+"Val"];
}

//
//0101:dtojName
//0201:dtohometownAddr
//0202:dtocurrentAddr
//0203:dtojAddr
var applyIdMap={
				"dtojName":"0101",
				"dtohometownAddr":"0201","dtocurrentAddr":"0202","dtojAddr":"0203"
				};

function getApplyPrefix() {
	return $("#pyApplyPrefix").val();
}

function getPyIdx(columnId) {
	return applyIdMap[columnId];
}