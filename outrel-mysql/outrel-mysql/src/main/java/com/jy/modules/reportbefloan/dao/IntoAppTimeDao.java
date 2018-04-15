package com.jy.modules.reportbefloan.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;

@MyBatisRepository
public interface IntoAppTimeDao {
	/**
	 * 进件编号
	 * 审批产品
	 * 审批额度
	 * 审批期限
	 * 进件状态
	 * @param searchParm
	 * @return
	 */
	public List<Map<String, Object>> queryIntoInfoListByPage(Map<String, Object> searchParm);
    /**
     * 通过进件ID获取
     * 审批结论
     * 产品客群分类
     * 最后一次审批通过码
     * @param searchParm
     * @return
     */
	public Map<String, Object> queryIntoInfoExt1(Map<String, Object> searchParm);
	/**
     * 通过进件ID获取
     * 补充材料次数
     * 补充资料用时（4）
     * @param searchParm
     * @return
     */
	public List<Map<String, Object>> queryIntoInfoExt2(Map<String, Object> searchParm);
	/**
	 * 初审用时（5）  
	 * 补充调查用时（2）
	 * @param searchParm
	 * @return
	 */
	public List<Map<String, Object>> queryIntoInfoExt2_1(Map<String, Object> searchParm);
	/**
	 * 终审用时（4）
	 * @param searchParm
	 * @return
	 */
	public List<Map<String, Object>> queryIntoInfoExt2_2(Map<String, Object> searchParm);
	
	/**
	 * 查询进件的  流程节点信息
	 * @param searchParm
	 * @return
	 */
	public List<Map<String, Object>> queryIntoInfoActNameInfo(Map<String, Object> searchParm);
	/**
     * 通过进件ID获取
     * 审批结束时间
     * 审批结束日期
     * @param searchParm
     * @return
     */
	public Map<String, Object> queryIntoProInfo(Map<String, Object> searchParm);
	/**
     * 通过进件ID获取
     * 当前环节
     * 当前办理人
     * @param searchParm
     * @return
     */
	public Map<String, Object> queryIntoProInfoExt1(Map<String, Object> searchParm);
   
	/**
     * 通过进件ID获取
     * 办理初审人员
     * 办理终审人员
     * 办理信审室
     * 办理复议终审人员
     * @param searchParm
     * @return
     */
	public List<Map<String, Object>> queryIntoAuditPersonOrgInfo(Map<String, Object> searchParm);
	
	public void batchInsertIntoAppTimeInfo(Map<String, Object> parm);
	
	public void insertIntoAppTimeInfo(Map<String, Object> parm);
	/**
	 * 清空 rpt_into_app_time表数据
	 */
	public void truncateRptIntoAppTimeTable();
	
	public Map<String, String> obtainBizDataMaxIdAndMinId();
	
	public List<Map<String,String>> queryVmdataPriv(Map<String, Object> searchParams);
	
	public List<Map<String, Object>> queryAuditResulInfo(Map<String, Object> param);
}
