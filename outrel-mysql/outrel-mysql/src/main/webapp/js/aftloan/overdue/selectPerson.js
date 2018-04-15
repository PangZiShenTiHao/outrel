/**
 * 通用选人
 * @author cxt
 * @param retArray
 */
var dialog; 
var paramArray;
function selectSingleUser(retArray) {
	paramArray = retArray;
	var level = "";
	if(retArray[6]&&retArray[6]!=''){
		level = retArray[6];
	}
	var orgId = "";
	var positionCode = "";
	if(retArray[3]&&retArray[3]!=''){
		if(document.getElementById( retArray[3])){
			orgId = document.getElementById( retArray[3]).value;
		}
	}
	if(retArray[4]&&retArray[4]!=''){
		positionCode = retArray[4];
	}
	$.dialog({
		id:	'selectSingleUserView',
	    lock: true,
	    width:500,
	    height:600,
	    title:'人员选择',
	    zIndex: 9999,
	    content: 'url:'+contextRootPath+'/overdue/toSelectSinglePerson?orgId='+orgId+'&positionCode='+positionCode+"&level="+level
	}); 
}

function selectUsers(retArray) {
	paramArray = retArray;
	var orgId = "";
	var positionCode = "";
	var level = "";
	if(retArray[6]&&retArray[6]!=''){
		level = retArray[6];
	}
	if(retArray[3]&&retArray[3]!=''){
		if(document.getElementById( retArray[3])){
			orgId = document.getElementById( retArray[3]).value;
		}
	}
	if(retArray[4]&&retArray[4]!=''){
		positionCode = retArray[4];
	}
	$.dialog({
		id:	'selectUsersView',
	    lock: true,
	    width:380,
	    height:600,
	    title:'人员选择',
	    zIndex: 9999,
	    content: 'url:'+contextRootPath+'/overdue/toSelectPersons?orgId='+orgId+'&positionCode='+positionCode+"&level="+level
	}); 
}

function submitCheck(obj){
	var to_id_field = document.getElementById( paramArray[0]);
	var to_name_field = document.getElementById( paramArray[1]);
	//alert(paramArray[0]+","+paramArray[1]+","+paramArray[2]+","+paramArray[3]+","+paramArray[4]+","+obj.userName);
	if(paramArray[5]!=null){
		var to_user_stoId = document.getElementById( paramArray[5]);
		jQuery(to_user_stoId).val(obj.orgId);
	}
	jQuery(to_name_field).val(obj.userName);
	jQuery(to_id_field).val(obj.userId);
	
	if(paramArray[2]&&paramArray[2]!=''){
		ReturnMethod(paramArray[2]);
	}
}

function submitCheckUsers(obj){
	var to_id_field = document.getElementById( paramArray[0]);
	var to_name_field = document.getElementById( paramArray[1]);
	var name = "";
	var id = "";
	$.each(obj,function(userId,userName){
		name += this.userName + ",";
		id += this.userId + ",";
	});
	if(name.endWith(",")){
		name = name.substring(0, name.length-1);
	}
	if(id.endWith(",")){
		id = id.substring(0, id.length-1);
	}
	if(paramArray[5]!=null){
		var to_user_stoId = document.getElementById( paramArray[5]);
		jQuery(to_user_stoId).val(obj[0].orgId);
	}
	jQuery(to_name_field).val(name);
	jQuery(to_id_field).val(id);
	if(paramArray[2]&&paramArray[2]!=''){
		ReturnMethod(paramArray[2]);
	}
}

function clearUser(obj){
	var to_id_field = document.getElementById( paramArray[0]);
	var to_name_field = document.getElementById( paramArray[1]);
	jQuery(to_name_field).val("");
	jQuery(to_id_field).val("");
}

function ReturnMethod(methodName){ 
	try{ 
	    this.func=new Function(methodName+"();");
	    func();
	}catch(e){ 
		alert(methodName+"()不存在！"); 
	}
}

String.prototype.startWith=function(str){     
	var reg=new RegExp("^"+str);     
	return reg.test(this);        
} 
	 
String.prototype.endWith=function(str){     
    var reg=new RegExp(str+"$");     
    return reg.test(this);        
}
