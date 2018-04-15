function loadIcon(prodTabs,required,isfinish,custID,custCode,fun){
	
	var params="prodId="+prodId +"&custId="+custID+"&intoId="+intoID+"&custCode="+custCode;
	var url=contextRootPath+'/lbTTransConf/getRequiredTransConf';
	jyAjax(url,params,function(msg){
		if(msg.data!=null){
			var result = msg.data;
			for (var i = 0; i < result.length; i++) {
				var i_code = result[i].transCode;
				var process = result[i].isDuel;
				for (var j = 0; j < prodTabs.length; j++) {
					j_code = prodTabs[j].code;
					if(j_code==i_code && process=="1" ){
						prodTabs[j]["icon"]="isfinish";
					}else if(j_code==i_code){
						prodTabs[j]["icon"]="required";
					}
				}
			}
			fun();
			if(msg.msg=="att"){
				tabs.changeTitleStyleByName("回退清单",{"color":"red"});
			}else if(msg.msg=="his"){
				tabs.changeTitleStyleByName("历史借贷",{"color":"red"});
			}else if(msg.msg=="all"){
				tabs.changeTitleStyleByName("历史借贷",{"color":"red"});
				tabs.changeTitleStyleByName("回退清单",{"color":"red"});
				tabs.changeTitleStyleByName("汇法网",{"color":"red"});
			}else if(msg.msg=="law"){
				tabs.changeTitleStyleByName("汇法网",{"color":"red"});
			}else if(msg.msg=="attAndLaw"){
				tabs.changeTitleStyleByName("回退清单",{"color":"red"});
				tabs.changeTitleStyleByName("汇法网",{"color":"red"});
			}else if(msg.msg=="hisAndLaw"){
				tabs.changeTitleStyleByName("历史借贷",{"color":"red"});
				tabs.changeTitleStyleByName("汇法网",{"color":"red"});
			}else if(msg.msg=="attAndHis"){
				tabs.changeTitleStyleByName("回退清单",{"color":"red"});
				tabs.changeTitleStyleByName("历史借贷",{"color":"red"});
			}
		}else{
			$("").newMsg({"waitTime":4000}).show("该产品没有进项相关事务配置!");
		}
	});
}



/**循环遍历button**/
function loadBtn(btns ,btnresult){
	 for(var i=0;i<btns.length;i++){
		 if(btns[i].val()=="关闭" || btns[i].val()=="提交" || btns[i].val()=="调查命中" 
			 || btns[i].val()=="调查通过" || btns[i].val()=="客户放弃" || btns[i].val()=="拒绝并加入黑名单"){
			 btns[i].show();
			 if(btns[i].val()=="调查命中"){
				 btns[i].css("background","#ff0000");
			 }
			 if(btns[i].val()=="客户放弃"){
				 btns[i].css("color","#ff0000");
			 }
		 }else{
			 btns[i].hide(); 
		 }
	 }
}



