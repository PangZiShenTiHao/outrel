/**
 *填加伸缩事件
 **/
function expandToggle(){
	$("#formSwap1").bind("click",function(ev){
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
 *添加字段必填项校验事件
 **/
function setCheckColumn(confId,checkInitFun){
	var url=contextRootPath+'/lbTNeedRequiredInfo/queryValidNeedRequiredListByProdId';
	var params={fkProConfId:confId,bizNo:"10000"};
	jyAjax(
		url,
		params,
		function(msg){debugger;
			if(msg.data){
				for(var i=0;i<msg.data.length;i++){
					var d=msg.data[i];
					var element=$("#"+d["checkName"]);
					switch(d["checkType"]){
						case "100":
							element.attr("notNull","true");
							break;	
						case "200":
							
						case "300":
							element.attr("checktype",d["checkOther"]);
							break;
						case "400":
							element.attr("regexp",d["checkOther"]);
							break;
						case "500":
							element.attr("checkfun",d["checkOther"]);
							break;
						case "600":
							var funStr=d["checkOther"];
							var fun=eval("("+funStr+")");
							fun(d);
					}
					if(d["maxLength"]){
						element.attr("maxLength",d["maxLength"]);
					}
				}
				
				if(checkInitFun) {
					checkInitFun();
				}
			}
		}
	);
}

function loadFun(loadIndex,loadMap,loadEndFun){
	var me=arguments.callee;
	var loadObj=loadMap[loadIndex];
	if(loadObj){
		$("#"+loadObj[0]).load(loadObj[1],function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success"){
				loadIndex+=1;
				if(loadIndex<loadMap.length){
					me(loadIndex, loadMap,loadEndFun);
				}else{
					loadEndFun();
					
				}
			}
		});
	}
}