//计算平均值与代发月收入     代发月收入 =所有账户性质是【工资流水】的均值之和
function sumFun(flag){
		var objJsons=serialTable.getAllData();
		if(objJsons.length>0){
		  //判断流水明细中是否包含账户性质为工资流水的记录
			if(!isSalaryFlow(objJsons)){
				$("#dtoinsteadMonthIncome").val('');	
			}
			var insteadMonthIncome=0;
			for(var i=0;i<objJsons.length;i++){
				var obj=objJsons[i];
				var count=0;
		    	var sum=0;
			    	 //计算平均值
			    	 for(var j=1;j<=showMonthCount;j++){
			    			if((obj["accMonSer"+j]===0||obj["accMonSer"+j]!="")&&obj["accMonSer"+j]!=null){
									sum+=Number(obj["accMonSer"+j]);
									count++;	
							} 
					 }
			    	 if(count>0){
			    		 avg=sum/count;
			    		 obj["avgMonthIncome"]=avg.toFixed(2);
			    		 if(flag=="1"){
			    			var checkMonthIncome=getCheckMonthIncome(obj["avgMonthIncome"],obj["accType"],obj);
			    			obj["cheMonIncome"]=checkMonthIncome;
			    			if(obj["cheMonIncome"]<=0){
			    			   $("#cheMonIncome_").val('');
			    			   obj["cheMonIncome"]="";
			    			}
			    		 }
				    	 if(obj["accType"]=='5'){ 
				    		 if(obj["avgMonthIncome"]!=null&&obj["avgMonthIncome"]!=""){
					    		insteadMonthIncome+=Number(obj["avgMonthIncome"]);
					    		$("#dtoinsteadMonthIncome").val(insteadMonthIncome);
					    	}		
					    } 
			    	 }else{
			    		 if(obj["accType"]=='5'){
			    			 if(obj["avgMonthIncome"]!=null&&obj["avgMonthIncome"]!=""){
						    		insteadMonthIncome+=Number(obj["avgMonthIncome"]);
						    		$("#dtoinsteadMonthIncome").val(insteadMonthIncome);
						     }	
			    		 }
			    	 }
			    } 
		}else{
			 $("#dtoinsteadMonthIncome").val('');
		}
		 serialTable.flush();
		 setStartFromMonthSelect();
	}

//信用卡总负债
function calculateUsedRate(){
	 var objJsons=creditCardTable.getAllData();
	 var usedAmountSum=0;
	 if(objJsons.length>0){
		 $("#dtoopenedCount").val(objJsons.length);
		 for(var i=0;i<objJsons.length;i++){
			 var obj=objJsons[i];
			 if(creditCardTable.datas){
				 if(undefined!=obj["usedAmount"]){
					 //已使用总额度
					 usedAmountSum+=Number(obj["usedAmount"]);  
				 }
				
			 }	
		 }
		   if(usedAmountSum==0){
			   $("#dtocardSumDebt").val(''); 
		   }else{//信用卡总负债 = 已使用总额度/10
			   $("#dtocardSumDebt").val(usedAmountSum/10);
		   }
	 }
	 else{
		  //信用卡总负债 = 已使用总额度/10
		  $("#dtocardSumDebt").val(''); 
	 }
	   creditCardTable.flush();
}

//贷款情况：计算折算负债
function getDiscountLiability(obj,code,rowData){
	    var repaymentFrequency =$("#repaymentFrequency_").val();
	    var cmRepaymentAmount =$("#cmRepaymentAmount_").val(); 
	    var liabilityRate =$("#liabilityRate_").val();
	     if(code=="repaymentFrequency"){
		    repaymentFrequency =obj.val();
	     }else if(code=="liabilityRate"){
		    liabilityRate =obj.val();
	     }else if(code=="cmRepaymentAmount"){
	    	cmRepaymentAmount =obj.val(); 
	     }
	     var  discountLiability =0;  
	     if(cmRepaymentAmount>0&&liabilityRate>0){
			 if(repaymentFrequency=="3"){// 还款频率 :3-月度
				 discountLiability =(Number(cmRepaymentAmount))*(Number(liabilityRate)/100);
			 }else if(repaymentFrequency=="4"){ //还款频率 :4-季度
				 discountLiability =(Number(cmRepaymentAmount))*(Number(liabilityRate)*3/100);
			 }else if(repaymentFrequency=="5"){ //还款频率 :5-半年
				 discountLiability =(Number(cmRepaymentAmount))*(Number(liabilityRate)*6/100);
			 }else if(repaymentFrequency=="6"){ //还款频率 :6-年度
				 discountLiability =(Number(cmRepaymentAmount))*(Number(liabilityRate)*12/100); 
			 }
			  $("#discountLiability_").val((discountLiability/1000*1000).toFixed(2));
			  if(rowData){
				  rowData["discountLiability"]=(discountLiability/1000*1000).toFixed(2);
			  }
			 
		 }else{
			 $("#discountLiability_").val("0"); 
			 if(rowData){
				  rowData["discountLiability"]="0";
			 }
		 }
} 

//计算总负债
function calculateDebtSum(){
	
	 var objJsons=loanTable.getAllData();
	 var discountLiabilitySum=0;
	 var dtocardSumDebt=$("#dtocardSumDebt").val()!=null?Number($("#dtocardSumDebt").val()):0;
	 for (var i = 0; i < objJsons.length; i++) {
		 var obj=objJsons[i];
		  if(undefined!=obj["discountLiability"]){
			//折算负债= 本月还款金额*（计入负债比例和/100）         计入负债比例和=计入负债比例*相应阶段的月数
			  discountLiabilitySum+=Number(obj["discountLiability"]); 
		  }
		 
	}
	 //总负债= 折算总负债+信用卡总负债
	   if(discountLiabilitySum+dtocardSumDebt==0){
		   $("#dtodebtSum").val('');
	   }else{
		   $("#dtodebtSum").val(discountLiabilitySum+dtocardSumDebt);
	   }
	   calculateIncomeDebtRatio();
	   loanTable.flush();
}

//计算收入负债比

    //计算收入负债比=总负债/核算月收入
function calculateIncomeDebtRatio() {
	var debtSum = $("#dtodebtSum").val();
	var cheMonIncome = $("#dtocheMonIncome").val();
	var incomeDebtRatio = null;
    if (debtSum != "" && cheMonIncome != null && cheMonIncome != 0) {
		$("#dtocheMonIncome").removeAttr("notnull");
		removeNullCss($("#dtocheMonIncome"));
		incomeDebtRatio = (Number(debtSum) / Number(cheMonIncome) * 100 / 100)
				.toFixed(2);
	}
	$("#dtoincomeDebtRatio").val(incomeDebtRatio);
}

//校验数值:只能输入0~100以内的有效数字
function checkNum(obj) {
	var dtoshareholdRatio = $(obj).val();
	if (!(/^(\d*(\.\d+)?)$/.test(dtoshareholdRatio)) || eval(dtoshareholdRatio) > 100) {
		return '请输入100以内的有效数字';
	}
	return '';
}

//校验数值:只能输入大于0的有效数字
function checkNum2(obj) {
	var v_value = $(obj).val();
	if(v_value==""||v_value==null){
		$(obj).attr("notnull","true");
		setNullCss($(obj));
	}else if (!(/^(\d*(\.\d+)?)$/.test(v_value)) || eval(v_value)<= 0) {
		return '输入大于0的有效数字';
	}  
	return '';
}

//校验数值:请输入大于或等于0的有效数
function checkNum3(obj) {
	var v_value = $(obj).val();
	if(v_value==""||v_value==null){
		$(obj).attr("notnull","true");
		setNullCss($(obj));
	}else if (!(/^(\d*(\.\d+)?)$/.test(v_value)) || eval(v_value)< 0) {
		return '请输入大于或等于0的有效数字';
	}  
	return '';
}

//校验数值：输入大于或等于0的数字，并清除表格中的其他项
function clearOtherColumn(obj,column){
	var v_value= obj.val();
	if(!(/^(\d*(\.\d+)?)$/.test(v_value)) || eval(v_value) < 0){
		$("").newMsg({}).show("请输入大于或等于0的数字！");
		obj.val('');
		obj.focus();
	}
	$("#"+column).val('');
	$("#"+column).focus();
	//obj.focus();
}

/**
 * 用来填充客户征信查询记录表信息
 */
function initData(){
	var fullObjs=[
	  			{"url":contextRootPath+"/lbTLiability/queryListLbTLiability","form":"lbTLiability","idInput":"lbTLiabilityId"},
	  			{"url":contextRootPath+"/lbTSerialInfo/queryListLbTSerialInfo","form":"serialInfo","idInput":"serialInfoId"}];
	  			var params="fkIntoCustRefId="+intoCustRefId;
	  			for(var i=0;i<fullObjs.length;i++){
	  				var obj=fullObjs[i];
	  				(function(url,formName,idInput){
	  					jyAjax(url,params,function(msg){
	  						if(msg.data&&msg.data.length){
	  						   $("#"+idInput).val(msg.data[0].id);
	  							fillInForm(msg.data[0],formName);
	  							removeRequiredCss("dtoaccQCount");
	  							setPageFormRead(formName);
	  						}else{
	  							 $("#dtorescindRatio").val(100);//代发系数
	  							 $("#dtocashRatio").val(40);//网薪系数/现金系数
	  							 $("#dtosharesRatio").val(100);//占股比例
	  							 $("#dtoindustryProfitRate").val(100);//行业利润率 
	  						}
	  					});
	  				})(obj.url,obj.form,obj.idInput);
	}
}

//流水明细:计算每条记录的平均值
function getAvgValue(obj,n,rowData){
	//得到行的记录数
	var rowNum =serialTable.getRowsCount();
	var avg=0;
	var sum=0;
	var count=0;
	var value =obj.val();
		if(!(/^(\d*(\.\d+)?)$/.test(value)) || eval(value) < 0){
			$("").newMsg({}).show("请输入大于或等于0的数字！");
			obj.val('');
			obj.focus();
			return false;
		}
		if(rowNum>0){
			    for (var i =1; i <=showMonthCount; i++) {
					if((value===0||value!="")&&i==n){
						sum+=Number(value);
						count++;
					}else if(i!=n&&($("#accMonSer"+i+"_").val()!=""||$("#accMonSer"+i+"_").val()===0)){
						sum+=Number($("#accMonSer"+i+"_").val());
					    count++;
					}
				}
				if(count>0){
					avg=(sum/count).toFixed(2);
					$("#avgMonthIncome_").val(avg);
					if(rowData){
						rowData["avgMonthIncome"]=avg;
					}
					serialTable.changeValByColCode("avgMonthIncome",avg)
					//计算核算月收入
					getCheckMonthIncome(avg,$("#accType_").val(),rowData);
				}else{
					if(rowData){
						rowData["avgMonthIncome"]="0";
						$("#avgMonthIncome_").val("0");
						serialTable.changeValByColCode("avgMonthIncome","0");
						$("#cheMonIncome_").val('');
						rowData["cheMonIncome"]="";
						cheMonIncomeInputCheck(rowData["cheMonIncome"],rowData);
					}
				}	
		 }
	
}


//流水明细：计算核算月收入
function getCheckMonthIncome(avg,accType,rowData){
	
	var rescindRatio=$("#dtorescindRatio").val();
	var cashRatio=$("#dtocashRatio").val();
	var industryProfitRate=$("#dtoindustryProfitRate").val();
	var sharesRatio=$("#dtosharesRatio").val();
	var checkMonIncome=0;
	if(avg==null){
		checkMonIncome=checkMonIncome;
	}
	//计算账户性质[工资流水]的核算月收入    公式：核算月收入= 代发系数/100 * 平均值
	else if(accType=='5'){
		if(rescindRatio!=null){
			checkMonIncome=(rescindRatio/100*avg).toFixed(2);
		}
	//计算账户性质[个人常用流水]的核算月收入    公式：核算月收入= (网薪系数/现金系数）/100 * 平均值
	}else if(accType=='4'){
		if(cashRatio!=null){
			checkMonIncome=(cashRatio/100*avg).toFixed(2);	
		}	
	//计算账户性质[还款流水]的核算月收入    公式：核算月收入默认为0
	}else if(accType=='3'){
		    checkMonIncome=0;
	//计算账户性质[个人经营流水]的核算月收入    公式：核算月收入= 行业利润率/100 * 平均值
	}else if(accType=='2'){
		if(industryProfitRate!=null){
		    checkMonIncome=(industryProfitRate/100*avg).toFixed(2);
		}
	//计算账户性质[对公流水 ]的核算月收入    公式：核算月收入= （行业利润率/100） * （占股比例/100） * 平均值
	}else if(accType=='1'){
		if(industryProfitRate!=null&&sharesRatio!=null){
		    checkMonIncome=((industryProfitRate/100)*(sharesRatio/100)*avg).toFixed(2);
		}
	}
	$("#cheMonIncome_").val(checkMonIncome);
	if(rowData){
		 rowData["cheMonIncome"]=checkMonIncome;
		 cheMonIncomeInputCheck(rowData["cheMonIncome"],rowData);
	}
	return checkMonIncome;
}

//判断流水明细中是否包含账户性质为工资流水的记录

function isSalaryFlow(objJsons){
	
	 var i =objJsons.length;
	 while (i--) {
         if (objJsons[i]["accType"] =="5") {
          return true;
         }   
     }  
	 return false;
}

//流水明细：新建、删除、保存操作时为月份动态下拉框赋值
function setStartFromMonthSelect(){
	if(undefined==startFromMonthSelect){
	    $("#dtostartFromMonthSelect").val(1);
		changeTitleByVal(1);	
	}else{
		$("#dtostartFromMonthSelect").val(startFromMonthSelect);
		changeTitleByVal(startFromMonthSelect);
	}	
}

/**
 * 贷款情况：随着担保方式的改变，计入负债比例(%)的默认值发生改变。
	      担保方式       默认值(%)
	      信用          100
	      房贷           50
	      其他          100
	      抵押           50
	  除房贷之外，其他非抵押类贷款的计入负债比例均默认为100%
*/

function  getDefaultLiabilityRate(value){
	  if(value==""){
		$("#liabilityRate_").val("");
	  }else if(value=="1"){
		 $("#liabilityRate_").val("100");
		 
	  }else if(value=="2"){
		 $("#liabilityRate_").val("50");   
	  }else{
		 $("#liabilityRate_").val("100");  
	  }
	    $("#discountLiability_").val('');
		$("#discountLiability_").focus();
		$("#liabilityRate_").focus();
}

//流水明细：核算月收入输入校验
function cheMonIncomeInputCheck(value,rowData){
	  if(value==null){
		   removeNullCss($("#cheMonIncome_")); 
	  }else if(!(/^(([0-9]+[\.]?[0-9]+)|[1-9])$/.test(value))||eval(value)<=0){
		   setNullCss($("#cheMonIncome_"),"核算月收入不能小于等于0");
		   $("#cheMonIncome_").val('');
		   rowData["cheMonIncome"]="";
	  }else{
		   removeNullCss($("#cheMonIncome_"));
	  } 
}

//最近6个月人行查询次数 初始化加载时，若有值去掉必输样式 

 function  removeRequiredCss(key){
	 var v_value = $("#"+key).val();
	 if(v_value!=null && v_value!=""){
		 removeNullCss($("#"+key));
	 }else{
		 setNullCss($("#"+key));
	 }
 }