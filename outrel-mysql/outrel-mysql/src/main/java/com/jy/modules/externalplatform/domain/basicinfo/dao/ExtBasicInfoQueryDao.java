package com.jy.modules.externalplatform.domain.basicinfo.dao;

import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;


@MyBatisRepository
public interface ExtBasicInfoQueryDao {
	
	 /**
	 * 查询 虚拟树 门店
	 * @param searchParams
	 * @return
	 */
	public Map<String,Object> queryLbtVmtreeOrgInfo(Map<String, Object> searchParams);
	

}
