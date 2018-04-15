package com.jy.modules.reportbefloan.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;

@MyBatisRepository
public interface IntoInfoReportDao {

	/**
	 * @author xujunqi
	 * @description: 查询进件基本信息
	 * @date 2015年4月28日 下午4:58:47
	 * @param searchParm
	 * @return
	 */
	public List<Map<String, String>> queryIntoInfoListByPage(Map<String, Object> searchParm);

	/**
	 * @author xujunqi
	 * @description: 根据进件-客户ID获取[上海资信]的报告查询信息
	 * @date 2015年4月28日 下午4:59:58
	 * @param searchParm
	 * @return
	 */
	public Map<String, String> findPersonalReportByIntoCustRefId(Map<String, Object> searchParm);
	
	/**
	 * @author xujunqi
	 * @description: 根据进件-客户ID获取[百融]的报告查询信息
	 * @date 2015年4月28日 下午5:00:21
	 * @param searchParm
	 * @return
	 */
	public Map<String, String> findBrReportByIntoCustRefId(Map<String, Object> searchParm);
	
	/**
	 * @author xujunqi
	 * @description: 根据进件-客户ID获取[信审表]的信息
	 * @date 2015年4月28日 下午5:00:26
	 * @param searchParm
	 * @return
	 */
	public Map<String, String> findCreditAuditByIntoCustRefId(Map<String, Object> searchParm);
	
	/**
	 * @author xujunqi
	 * @description: 批量插入进件基本信息报表数据
	 * @date 2015年4月28日 下午5:01:07
	 * @param parm
	 */
	public void batchInsertIntoInfoReport(Map<String, Object> paramMap);
	
	public void deleteAll();
	
	public void deleteRptIntoInfoByRptDate(String reportDate);
}
