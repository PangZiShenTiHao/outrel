
//【添加补件类型】计算操作人与操作时间

   function calculateRemark(){
	  var objJsons =remarkTable.getAllData();
	  var createBy =$("#userName").val();
	  var v_obj = remarkTable.getColumnByCode("unqualifyReason");
	  //如果补件原因选择为[其他]，则[不合格原因]字段必输。
	  if(identifyFieldMustInput(objJsons,"patchReason","unqualifyReason","R999")){
		  v_obj.notNull = true;
	  }else{
		  delete v_obj.notNull;
	  }
	  for (var i = 0; i < objJsons.length; i++) {
		  if(remarkTable.datas){
			 remarkTable.datas[i]["createTime"]=getNowFormatDate();
			 remarkTable.datas[i]["createBy"]=createBy;
		  }
	  } 
	    remarkTable.flush();
   }
   
   
//【需确认信息】计算操作员与操作时间
   
   function calculateConfirm(){
	   
		  var objJsons =confirmTable.getAllData();
		  var operatorName =$("#userName").val();
		   for (var i = 0; i < objJsons.length; i++) {
			  if(confirmTable.datas){
				 confirmTable.datas[i]["operateTime"]=getNowFormatDate();
				 confirmTable.datas[i]["operatorName"]=operatorName;
			  }
		  } 
		    confirmTable.flush();
	   }
   
//【需确认信息】计算操作员与操作时间
   
   function calculateVisitPoint(){
	   
	   var objJsons =visitPointTable.getAllData();
	   for (var i = 0; i < objJsons.length; i++) {
		   if(visitPointTable.datas){
			   visitPointTable.datas[i]["operateTime"]=getNowFormatDate();
		   }
	   } 
	   visitPointTable.flush();
   }
   
	/**
	 * 如果"关联字段"选择为"特定值"时，判定"必输字段"字段是否为空值。
	 * @associateFCode  关联字段编码
	 * @needFCode  必输字段编码
	 * @specialValue 特定值
	 */
	function identifyFieldMustInput(objJsons,associateFCode,needFCode,specialValue) {
		var i = objJsons.length;
		while (i--) {
			if (objJsons[i][associateFCode] == specialValue && (!objJsons[i][needFCode])) {
				return true;
			}
		}
		return false;
	}