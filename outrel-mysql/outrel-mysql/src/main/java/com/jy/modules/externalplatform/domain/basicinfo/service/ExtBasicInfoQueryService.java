package com.jy.modules.externalplatform.domain.basicinfo.service;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jy.modules.externalplatform.domain.basicinfo.dao.ExtBasicInfoQueryDao;

@Service("com.jy.modules.externalplatform.domain.basicinfo.service.ExtBasicInfoQueryService")
public class ExtBasicInfoQueryService implements Serializable {
	
	 private static final long serialVersionUID = 1L;
	 
	 @Autowired
	 private  ExtBasicInfoQueryDao  dao;
	 
    /**
	 * 通过查询条件查询虚拟树 门店
	 * @param orgId
	 * @return
	 */
	public String queryLbtVmtreeOrgInfo(String orgId){

		String ogrIds = "";
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("orgId", orgId);
		Map<String,Object> param = dao.queryLbtVmtreeOrgInfo(map);

		if(param != null){
			ogrIds =  param.get("ORG_ID").toString();
		}
		return ogrIds;
	}
}
