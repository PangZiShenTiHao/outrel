var xf = "<option value='101'>购物</option>"+
		 "<option value='102'>培训</option>"+
		 "<option value='103'>装修</option>"+
		 "<option value='104'>旅游</option>"+
		 "<option value='105'>结婚</option>";

var stjy = "<option value='201'>实体经营</option>"+
		   "<option value='202'>进货</option>"+
		   "<option value='203'>扩大经营</option>"+
		   "<option value='204'>发工资</option>";

var jrtz = "<option value='301'>证券</option>"+
			"<option value='302'>理财产品</option>";

var mgyt = "<option value='401'>医疗费用</option>"+
			"<option value='402'>还他人钱</option>"+
			"<option value='403'>还信用卡</option>"+
			"<option value='404'>还贷款</option>"+
			"<option value='405'>为他人借款</option>"+
			"<option value='406'>博彩类</option>"
			
var gf = "<option value='601'>购房</option>";	

var gc = "<option value='701'>购车</option>";	

var other = "<option value='501'>其他</option>";

var empty=  "<option value=''>请选择</option>";

function initUsed(obj) {
	$("#loanUsed0").bind("change", function() {
		if($(this).val() == '1') {
			$("#loanUsed1").empty();
			$("#loanUsed1").append(xf);
		} else if($(this).val() == '2') {
			$("#loanUsed1").empty();
			$("#loanUsed1").append(stjy);
		} else if($(this).val() == '3') {
			$("#loanUsed1").empty();
			$("#loanUsed1").append(jrtz);
		} else if($(this).val() == '4') {
			$("#loanUsed1").empty();
			$("#loanUsed1").append(mgyt);
		} else if($(this).val() == '5') {
			$("#loanUsed1").empty();
			$("#loanUsed1").append(other);
		} else if($(this).val() == '6') {
			$("#loanUsed1").empty();
			$("#loanUsed1").append(gf);
		} else if($(this).val() == '7') {
			$("#loanUsed1").empty();
			$("#loanUsed1").append(gc);
		}else if($(this).val() == ''){
			$("#loanUsed1").empty();
			$("#loanUsed1").append(empty);
		}
	});
	if($("#loanUsed0").val() == '1') {
		$("#loanUsed1").append(xf);
		$("#loanUsed1").val(obj);
	} else if($("#loanUsed0").val() == '2') {
		$("#loanUsed1").append(stjy);
		$("#loanUsed1").val(obj);
	} else if($("#loanUsed0").val() == '3') {
		$("#loanUsed1").append(jrtz);
		$("#loanUsed1").val(obj);
	} else if($("#loanUsed0").val() == '4') {
		$("#loanUsed1").append(mgyt);
		$("#loanUsed1").val(obj);
	} else if($("#loanUsed0").val() == '5') {
		$("#loanUsed1").append(other);
		$("#loanUsed1").val(obj);
	} else if($("#loanUsed0").val() == '6') {
		$("#loanUsed1").append(gf);
		$("#loanUsed1").val(obj);
	} else if($("#loanUsed0").val() == '7') {
		$("#loanUsed1").append(gc);
		$("#loanUsed1").val(obj);
	}else if($("#loanUsed0").val() == ''){
		$("#loanUsed1").append(empty);
		$("#loanUsed1").val(obj);
	}
}

//工作方式：1-雇佣
var hire_map={"companyType":"单位性质",
		      "companyIndustry":"单位所属行业",
		      "currentCompanyWorkYear":"本人在现单位工作年限"};
//工作方式：2-自营
var proprietary_map={"myCompanyIndustry":"企业所属行业",
		             "companyRegisterYear":"企业经营年限(年)",
		             "myCompanyType":"经营场所类型",
		             "holdRate":"股权比例(%)"
		             }; 
var houseInfo_map={"isHouseLoan":"是否有房贷"};

//工作情况必输项控制
function checkWorkInfo(){
	if($("#workMode").val() == "01") {
		 for(var key in proprietary_map){
		    var v_value=$("#"+key).val();
			$("#"+key).removeAttr("notnull");
			$("#"+key).removeAttr("checkchname");
			removeNullCss($("#"+key));
	     }
	     for(var key in hire_map){
		    var v_value=$("#"+key).val();
			if(v_value==""){
			  $("#"+key).attr("notnull","true");
			  $("#"+key).attr("checkchname",hire_map[key]);
			  setNullCss($("#"+key));
			}
		}
	}else if($("#workMode").val() == "02"){
		 for(var key in hire_map){
		    var v_value=$("#"+key).val();
			$("#"+key).removeAttr("notnull");
			$("#"+key).removeAttr("checkchname");
			removeNullCss($("#"+key));
		  }
		  for(var key in proprietary_map){
			     var v_value=$("#"+key).val();
			     if(key=="holdRate"){
			    	 if($(":radio[name='borrowerIsOwner']:checked").val()=="1"){
					        if(v_value==''){
					        	$("#"+key).attr("notnull","true");
						    	$("#"+key).attr("checkchname","股权比例(%)");
						    	setNullCss($("#"+key));
					        }   	
					 }else if($(":radio[name='borrowerIsOwner']:checked").val()=="0"){
					    	$("#"+key).removeAttr("notnull");
							$("#"+key).removeAttr("checkchname");
							removeNullCss($("#"+key));
					 }
		
			    }else if(v_value==""){
				 $("#"+key).attr("notnull","true");
				 $("#"+key).attr("checkchname",proprietary_map[key]);
				 setNullCss($("#"+key));
				}
		 }
	}	
}


//房产信息必输项控制
function checkHouseInfo(){
	if($("#houseHas").val() == "1") {
		 for(var key in houseInfo_map){
			    var v_value=$("#"+key).val();
				if(v_value==""){
				  $("#"+key).attr("notnull","true");
				  $("#"+key).attr("checkchname",houseInfo_map[key]);
				  setNullCss($("#"+key));
				}
		}
	}else{
		for(var key in houseInfo_map){
		    var v_value=$("#"+key).val();
			if(v_value==""){
				  $("#"+key).removeAttr("notnull");
				  $("#"+key).removeAttr("checkchname");
				  removeNullCss($("#"+key));
			}
	   }	
	}	
}

//信审表页面初始化必输项控制

function initInputRequired(){
	debugger;
	if($("#workMode").val() == "01") {
		 for(var key in hire_map){
			    var v_value=$("#"+key).val();
				if(v_value==""){
				  $("#"+key).attr("notnull","true");
				  $("#"+key).attr("checkchname",hire_map[key]);
				  setNullCss($("#"+key));
				}
		}	
	}else if($("#workMode").val() == "02"){
		  for(var key in proprietary_map){
			     var v_value=$("#"+key).val();
			     if(key=="holdRate"){
			    	 if($(":radio[name='borrowerIsOwner']:checked").val()=="1"){
					        if(v_value==''){
					        	$("#"+key).attr("notnull","true");
						    	$("#"+key).attr("checkchname","股权比例(%)");	
						    	setNullCss($("#"+key));
					        }   	
					 }else if($(":radio[name='borrowerIsOwner']:checked").val()=="0"){
					    	$("#"+key).removeAttr("notnull");
							$("#"+key).removeAttr("checkchname");
							removeNullCss($("#"+key));
					 }
		
			    }else if(v_value==""){
				 $("#"+key).attr("notnull","true");
				 $("#"+key).attr("checkchname",proprietary_map[key]);
				 setNullCss($("#"+key));
				}
		 }	
	}	
}

function clearDiv(divName){
	  /**文本框清空&单选框取消选中*/ 
	  var txts = document.getElementById(divName).getElementsByTagName("input"); 
	  if(txts){
		  for (var i = 0; i < txts.length; i++) {
			  if(txts[i].type=="text"){ 
			     txts[i].value="";  // 文本框清空
			  }else if(txts[i].type=="radio"){
				 txts[i].checked=false; //单选框取消选中
			  }
	      }  
	 }
	  /**下拉框设置为"请选择"*/  
	  var selects =  document.getElementById(divName).getElementsByTagName("select"); 
	  if(selects){
		  for (var i = 0; i < selects.length; i++) {
			  selects[i].options[0].selected = true;;  //下拉框设置为"请选择"
	      }  
	  } 
	  
	  /** 文本域清空*/   
	  var textareas = document.getElementById(divName).getElementsByTagName("textarea"); 
	  if(textareas){
		  for (var i = 0; i < textareas.length; i++) {
			  textareas [i].value="";  // 文本域清空
	      }  
	  }   
 }
