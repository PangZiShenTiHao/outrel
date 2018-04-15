package com.jy.modules.common;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.fintech.platform.api.sysdict.SysDictAPI;
public class PreductType {
	
	@Autowired
	private SysDictAPI sysDictAPI;
	/**
	 * 根据产品编号判断该产品是否属于车贷产品
	 * @param pro_type
	 * @return
	 */
	public boolean  ifCheckContInfoByProType(String pro_type) {
		  boolean ifNeedCheck = false;
		  List<Map> sysDictDefList = sysDictAPI.getDictByKey("DQ_PAWN_LOAN_PROD_CODE_LIST");
		  for(Map dictMap:sysDictDefList) {
			  if(dictMap.get("DICVALUE") != null  && !!"".equals(dictMap.get("DICVALUE").toString()) && pro_type.equals(dictMap.get("DICVALUE").toString())){
				  ifNeedCheck = true;
				  break;			  
			  }
		   }
		  return ifNeedCheck;
	  }
}
