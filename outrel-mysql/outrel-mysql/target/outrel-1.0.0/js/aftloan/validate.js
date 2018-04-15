/**
 * 
 * @author CXT
 * @description:基本表单验证
 */




/*
用途：校验ip地址的格式 
输入：strIP：ip地址 
返回：如果通过验证返回true,否则返回false； 

*/ 
function isIP(strIP) { 
if (isNull(strIP)) return false; 
var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
if(re.test(strIP)) 
{ 
if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true; 
} 
return false; 
} 

/* 
用途：检查输入字符串是否为空或者全部都是空格 
输入：str 
返回： 
如果全是空返回true,否则返回false 
*/ 
function isNull( str ){ 
if ( str == "" ) return true; 
var regu = "^[ ]+$"; 
var re = new RegExp(regu); 
return re.test(str); 
} 

  
/* 
用途：检查输入对象的值是否符合整数格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isInteger( str ){  
var regu = /^[-]{0,1}[0-9]{1,}$/; 
return regu.test(str); 
} 

/* 
用途：检查输入手机号码是否正确 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkMobile( s ){   
var regu =/^1[0|1|2|3|4|5|6|7|8|9][0-9]\d{4,8}$/; 
return regu.test(s);
} 

  
/* 
用途：检查输入字符串是否符合正整数格式 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isNumber( s ){   
var regu = "^[0-9]+$"; 
var re = new RegExp(regu); 
if (s.search(re) != -1) { 
return true; 
} else { 
return false; 
} 
} 

/* 
用途：检查输入字符串是否是带小数的数字格式,可以是负数 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isDecimal( str ){   
if(isInteger(str)) return true; 
var re = /^[-]{0,1}(\d+)[\.]+(\d+)$/; 
if (re.test(str)) { 
if(RegExp.$1==0&&RegExp.$2==0) return false; 
return true; 
} else { 
return false; 
} 
} 

/* 
用途：检查输入对象的值是否符合端口号格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isPort( str ){  
return (isNumber(str) && str<65536); 
} 

/* 
用途：检查输入对象的值是否符合E-Mail格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isEmail( str ){  
var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/; 
if(myReg.test(str)) return true; 
return false; 
} 

/* 
用途：检查输入字符串是否符合金额格式 
格式定义为带小数的正数，小数点后最多三位 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isMoney( s ){   
var regu = /^([1-9][\d]{0,18}|0)(\.[\d]{1,2})?$/;
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
} else { 
return false; 
} 
} 
/* 
用途：检查输入字符串是否只由英文字母和数字和下划线组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isNumberOr_Letter( s ){//判断是否是数字或字母 

var regu = "^[0-9a-zA-Z\_]+$"; 
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
}else{ 
return false; 
} 
} 
/* 
用途：检查输入字符串是否只由英文字母和数字组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isNumberOrLetter( s ){//判断是否是数字或字母 

var regu = "^[0-9a-zA-Z]+$"; 
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
}else{ 
return false; 
} 
} 
/* 
用途：检查输入字符串是否只由汉字、字母、数字组成 
输入： 
value：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isChinaOrNumbOrLett( s ){//判断是否是汉字、字母、数字组成 

var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";   
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
}else{ 
return false; 
} 
} 

/* 
用途：判断是否是日期 
输入：date：日期；fmt：日期格式 
返回：如果通过验证返回true,否则返回false 
*/ 
function isDate( date, fmt ) { 
if (fmt==null) fmt="yyyyMMdd"; 
var yIndex = fmt.indexOf("yyyy"); 
if(yIndex==-1) return false; 
var year = date.substring(yIndex,yIndex+4); 
var mIndex = fmt.indexOf("MM"); 
if(mIndex==-1) return false; 
var month = date.substring(mIndex,mIndex+2); 
var dIndex = fmt.indexOf("dd"); 
if(dIndex==-1) return false; 
var day = date.substring(dIndex,dIndex+2); 
if(!isNumber(year)||year>"2100" || year< "1900") return false; 
if(!isNumber(month)||month>"12" || month< "01") return false; 
if(day>getMaxDay(year,month) || day< "01") return false; 
return true; 
} 

function getMaxDay(year,month) { 
if(month==4||month==6||month==9||month==11) 
return "30"; 
if(month==2) 
if(year%4==0&&year%100!=0 || year%400==0) 
return "29"; 
else 
return "28"; 
return "31"; 
} 

/* 
用途：字符1是否以字符串2结束 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isLastMatch(str1,str2) 
{  
var index = str1.lastIndexOf(str2); 
if(str1.length==index+str2.length) return true; 
return false; 
} 

  
/* 
用途：字符1是否以字符串2开始 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isFirstMatch(str1,str2) 
{  
var index = str1.indexOf(str2); 
if(index==0) return true; 
return false; 
} 

/* 
用途：字符1是包含字符串2 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isMatch(str1,str2) 
{  
var index = str1.indexOf(str2); 
if(index==-1) return false; 
return true; 
} 

  
/* 
用途：检查输入的起止日期是否正确，规则为两个日期的格式正确， 
且结束如期>=起始日期 
输入： 
startDate：起始日期，字符串 
endDate：结束如期，字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkTwoDate( startDate,endDate ) { 
if( !isDate(startDate) ) { 
	jyDialog({"type":"warn"}).alert("起始日期不正确!");
return false; 
} else if( !isDate(endDate) ) { 
	jyDialog({"type":"warn"}).alert("终止日期不正确!");
return false; 
} else if( startDate > endDate ) { 
	jyDialog({"type":"warn"}).alert("起始日期不能大于终止日期!");
return false; 
} 
return true; 
} 


/* 
用途：简单比较时间是否为空， 
且结束如期>=起始日期 
输入： 
startTime：起始日期，字符串 
endTime：结束如期，字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function timeSimpleCompare( startTime,endTime ) { 
	
	if(startTime == ""){
		jyDialog({"type":"warn"}).alert("起始时间不能为空！");
		return false;
	}
	if(!endTime&&endTime == ""){
		jyDialog({"type":"warn"}).alert("结束时间不能为空！");
		return false;
	}
	if(startTime!=""&&endTime!=""){
  		if(startTime>endTime){
  			jyDialog({"type":"warn"}).alert("起始时间不能大于结束时间！");
  			return false;
  		}
	} 
	return true; 
} 

/* 
用途：检查输入的Email信箱格式是否正确 
输入： 
strEmail：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkEmail(strEmail) { 
//var emailReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/; 
var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/; 
if( emailReg.test(strEmail.trim()) ){ 
return true; 
}else{ 
jyDialog({"type":"warn"}).alert("您输入的Email地址格式不正确！");
return false; 
} 
} 

/* 
用途：检查输入的电话号码格式是否正确 
输入： 
strPhone：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkPhone( strPhone ) { 
var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/; 
var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/; 
var prompt = "您输入的电话号码不正确!" 
if( strPhone.length > 9 ) { 
if( phoneRegWithArea.test(strPhone) ){ 
return true; 
}else{ 
	jyDialog({"type":"warn"}).alert( prompt ); 
return false; 
} 
}else{ 
if( phoneRegNoArea.test( strPhone ) ){ 
return true; 
}else{ 
	jyDialog({"type":"warn"}).alert( prompt ); 
return false; 
} 

  
} 
} 

  
/* 
用途：检查复选框被选中的数目 
输入： 
checkboxID：字符串 
返回： 
返回该复选框中被选中的数目 

*/ 

function checkSelect( checkboxID ) { 
var check = 0; 
var i=0; 
if( document.all(checkboxID).length > 0 ) { 
for(  i=0; i<document.all(checkboxID).length; i++ ) { 
if( document.all(checkboxID).item( i ).checked  ) { 
check += 1; 
} 

  

  
} 
}else{ 
if( document.all(checkboxID).checked ) 
check = 1; 
} 
return check; 
} 

function getTotalBytes(varField) { 
if(varField == null) 
return -1; 

var totalCount = 0; 
for (i = 0; i< varField.value.length; i++) { 
if (varField.value.charCodeAt(i) > 127) 
totalCount += 2; 
else 
totalCount++ ; 
} 
return totalCount; 
} 

function getFirstSelectedValue( checkboxID ){ 
var value = null; 
var i=0; 
if( document.all(checkboxID).length > 0 ){ 
for(  i=0; i<document.all(checkboxID).length; i++ ){ 
if( document.all(checkboxID).item( i ).checked ){ 
value = document.all(checkboxID).item(i).value; 
break; 
} 
} 
} else { 
if( document.all(checkboxID).checked ) 
value = document.all(checkboxID).value; 
} 
return value; 
} 

  
function getFirstSelectedIndex( checkboxID ){ 
var value = -2; 
var i=0; 
if( document.all(checkboxID).length > 0 ){ 
for(  i=0; i<document.all(checkboxID).length; i++ ) { 
if( document.all(checkboxID).item( i ).checked  ) { 
value = i; 
break; 
} 
} 
} else { 
if( document.all(checkboxID).checked ) 
value = -1; 
} 
return value; 
} 

function selectAll( checkboxID,status ){ 

if( document.all(checkboxID) == null) 
return; 

if( document.all(checkboxID).length > 0 ){ 
for(  i=0; i<document.all(checkboxID).length; i++ ){ 

document.all(checkboxID).item( i ).checked = status; 
} 
} else { 
document.all(checkboxID).checked = status; 
} 
} 

function selectInverse( checkboxID ) { 
if( document.all(checkboxID) == null) 
return; 

if( document.all(checkboxID).length > 0 ) { 
for(  i=0; i<document.all(checkboxID).length; i++ ) { 
document.all(checkboxID).item( i ).checked = !document.all(checkboxID).item( i ).checked; 
} 
} else { 
document.all(checkboxID).checked = !document.all(checkboxID).checked; 
} 
} 

/**************************************************** 
function:cTrim(sInputString,iType) 
description:字符串去空格的函数 
parameters:iType：1=去掉字符串左边的空格 

2=去掉字符串左边的空格 
0=去掉字符串左边和右边的空格 
return value:去掉空格的字符串 
****************************************************/ 
function cTrim(sInputString,iType) 
{ 
var sTmpStr = ' '; 
var i = -1; 

if(iType == 0 || iType == 1) 
{ 
while(sTmpStr == ' ') 
{ 
++i; 
sTmpStr = sInputString.substr(i,1); 
} 
sInputString = sInputString.substring(i); 
} 

if(iType == 0 || iType == 2) 
{ 
sTmpStr = ' '; 
i = sInputString.length; 
while(sTmpStr == ' ') 
{ 
--i; 
sTmpStr = sInputString.substr(i,1); 
} 
sInputString = sInputString.substring(0,i+1); 
} 
return sInputString; 
} 

/*银行卡号校验

 Description:  银行卡号Luhm校验

 Luhm校验规则：16位银行卡号（19位通用）:

 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
 3.将加法和加上校验位能被 10 整除。
*/
function luhmCheck(bankno){
	if (bankno.length < 16 || bankno.length > 19) {
		//$("#banknoInfo").html("银行卡号长度必须在16到19之间");
		return false;
	}
	var num = /^\d*$/;  //全数字
	if (!num.exec(bankno)) {
		//$("#banknoInfo").html("银行卡号必须全为数字");
		return false;
	}
	//开头6位
	var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";    
	if (strBin.indexOf(bankno.substring(0, 2))== -1) {
		//$("#banknoInfo").html("银行卡号开头6位不符合规范");
		return false;
	}
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9
    
    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
            arrJiShu.push(parseInt(newArr[j])*2);
            else
            arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else //偶数位
        arrOuShu.push(newArr[j]);
    }
    
    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }        
    
    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }
    
    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }
    
    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }      
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
    
    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
    var luhm= 10-k;
    
    if(lastNum==luhm){
    	return true;
    }
    else{
    	return false;
    }        
}
