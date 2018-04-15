package com.jy.modules.reportbefloan.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.api.org.OrgAPI;
import com.fintech.platform.api.org.OrgInfo;
import com.fintech.platform.api.org.UserInfo;
import com.fintech.platform.api.sysdict.SysDictAPI;
import com.fintech.platform.api.sysdict.SysDictDetailVo;
import com.fintech.platform.core.common.JYLoggerUtil;
import com.jy.modules.common.MyBatisPageInfoExt;
import com.jy.modules.reportbefloan.dao.IntoInfoReportDao;
/**
 * @description: 进件基本信息报表生成服务类
 * @author xujunqi
 * @date: 2015年4月28日 下午4:27:20
 */
@Service("com.jy.modules.reportbefloan.service.IntoInfoReportService")
public class IntoInfoReportService implements BaseBiz {
	private static final long serialVersionUID = -6938011775967113851L;
	private int pageSize = 100;
	private int POOL_SIZE = 5;
	private ExecutorService ctp ;
	
	@Autowired
	private IntoInfoReportDao intoInfoRepDao;
	
	@Autowired
	private OrgAPI orgAPI;

	@Autowired
	private SysDictAPI dictAPI;
	
	/**
	 * @author xujunqi
	 * @description: 生成进件基本信息的报表
	 * @date 2015年4月28日 下午4:26:25
	 * @throws Exception
	 */
	public void generateIntoInfoReport(String batchMinId,String batchMaxId) throws Exception {
		int cpuNums = Runtime.getRuntime().availableProcessors();
		ctp = Executors.newFixedThreadPool(cpuNums * POOL_SIZE* 10);//Executors.newCachedThreadPool();
		
		//删除所有数据
		intoInfoRepDao.deleteAll();

		int curPage = 1;
		int totalPage = 0;
		Map<String,Object> searchParm = new HashMap<String,Object>();
		int beginrow = pageSize*(curPage - 1);
		int endrow = pageSize * curPage;
        searchParm.put("beginrow", beginrow);
        searchParm.put("endrow", endrow);
        searchParm.put("page", "page");//
        searchParm.put("minId", batchMinId);//此批次的最小ID
        searchParm.put("maxId", batchMaxId);//此批次的最大ID
		//调用分页 接口 获取进件信息
		List<Map<String,String>> intoList = intoInfoRepDao.queryIntoInfoListByPage(searchParm);
		if(intoList.size() >0){
			this.makeupExtInfo(intoList);
			//将生成的进件审批时效数据保存至数据库表中
			this.batchInsertIntoInfoReport(intoList);
		}
		
		int totalCount = MyBatisPageInfoExt.getTotalCountOfListByPage(intoList);
		
		//分页查询处理
		if(totalCount > pageSize) totalPage = totalCount/pageSize +1;
		
		if(totalPage >0) {
			//获取线程池
			ExecutorService cachedThreadPool = Executors.newFixedThreadPool(cpuNums * POOL_SIZE);//根据系统资源情况灵活定义线程池大小
			
			//线程计数器
			CountDownLatch countDown = new CountDownLatch(totalPage);
			for (int i = 1; i < totalPage; i++) {
				int tcurPage = i +1;
				//多线程 查询补充其他信息
				MultIntoApprovalTimeCommand command = new MultIntoApprovalTimeCommand(this,tcurPage,batchMinId,batchMaxId,countDown);
				cachedThreadPool.execute(command);
			}
			
			//等待子线程都执行完了再执行主线程剩下的动作
			countDown.await();
		}
	}
	
	/**
	 * @author xujunqi
	 * @description: 组装进件的其他数据信息
	 * @date 2015年4月28日 下午8:52:38
	 * @param intoList
	 * @return
	 */
	private void makeupExtInfo(List<Map<String, String>> intoList) throws Exception {
		int count = 0; 
		if(intoList!= null)count = intoList.size();
		final IntoInfoReportService rptService = this;
		
		final CountDownLatch cd = new CountDownLatch(count);//线程计数器
		
		for(final Map<String, String> data:intoList) {
			ctp.execute(new Runnable() {
				@Override
				public void run() {
					try {
						Map<String,Object> param = new HashMap<String,Object>();
						//转换:数据字典
						data.put("CARD_TYPE", rptService.getDictNameByDictValue("IDTYPE", data.get("CARD_TYPE")));
						data.put("LOAN_PURPOSE", rptService.getDictNameByDictValue("LOANPURPOSE", data.get("LOAN_PURPOSE")));
						data.put("LOAN_BANK", rptService.getDictNameByDictValue("BANKCODE", data.get("LOAN_BANK")));
						data.put("RECEIVE_BANK", rptService.getDictNameByDictValue("BANKCODE", data.get("RECEIVE_BANK")));
						//转换:用户/机构
						data.put("CUSTOMER_SERVICE", rptService.getUserNameByUserId(data.get("CUSTOMER_SERVICE")));
						data.put("CUSTOMER_MANAGER", rptService.getUserNameByUserId(data.get("CUSTOMER_MANAGER")));
						data.put("ACCEPT_STORE", rptService.getOrgNameByOrgId(data.get("ACCEPT_STORE")));
						param.put("intoCustRefId", data.get("INTO_CUST_REF_ID"));
						//设置"单位所属行业"
						data.put("INDUSTRY_NAME", intoInfoRepDao.findCreditAuditByIntoCustRefId(param).get("INDUSTRY_NAME"));
						//设置"上海资信信息"
						data.put("HAS_PERSONAL_REPORT", intoInfoRepDao.findPersonalReportByIntoCustRefId(param).get("HAS_PERSONAL_REPORT"));
						data.put("LOAN_COUNT", intoInfoRepDao.findPersonalReportByIntoCustRefId(param).get("LOAN_COUNT"));
						//设置"百融信息"
						data.put("HAS_BR_REPORT", intoInfoRepDao.findBrReportByIntoCustRefId(param).get("HAS_BR_REPORT"));
					} catch (Exception e) {
						JYLoggerUtil.error(this.getClass(), e.getMessage(),e);
					}
					
					cd.countDown();//减一
				}
			});
		}
		
		cd.await();
	}
	
	/**
	 * @author xujunqi
	 * @description: 批量插入进件基本信息报表数据
	 * @date 2015年4月28日 下午4:33:03
	 * @param intoInfoList
	 * @throws Exception
	 */
	private void batchInsertIntoInfoReport(List<Map<String,String>> intoInfoList) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dataList", intoInfoList);
		intoInfoRepDao.batchInsertIntoInfoReport(paramMap);
	}
	
	/**
	 * @author xujunqi
	 * @description: 根据进件-客户ID获取[上海资信]的报告查询信息
	 * @date 2015年4月28日 下午4:44:36
	 * @param intoCustomerRefId
	 * @return	是否从上海资信查询到征信报告
	 * 			上海资信记录贷款次数
	 * @throws Exception
	 */
	private Map<String,String> queryPersonalReportByIntoCustRefId(String intoCustRefId) throws Exception {
		Map<String, Object> searchParm = new HashMap<String, Object>();
		searchParm.put("intoCustRefId", intoCustRefId);
		Map<String,String> result = intoInfoRepDao.findPersonalReportByIntoCustRefId(searchParm);
		if(result == null) {
			result = new HashMap<String, String>();
		}
		
		return result;
	}
	
	/**
	 * @author xujunqi
	 * @description: 根据进件-客户ID获取[百融]的报告查询信息
	 * @date 2015年4月28日 下午4:53:06
	 * @param intoCustRefId
	 * @return	是否从百融查询到报告
	 * @throws Exception
	 */
	private Map<String,String> queryBrReportByIntoCustRefId(String intoCustRefId) throws Exception {
		Map<String, Object> searchParm = new HashMap<String, Object>();
		searchParm.put("intoCustRefId", intoCustRefId);
		Map<String,String> result = intoInfoRepDao.findBrReportByIntoCustRefId(searchParm);
		if(result == null) {
			result = new HashMap<String, String>();
		}
		
		return result;
	}
	
	/**
	 * @author xujunqi
	 * @description: 根据进件-客户ID获取[信审表]的信息
	 * @date 2015年4月28日 下午4:53:58
	 * @param intoCustRefId
	 * @return 单位所属行业
	 * @throws Exception
	 */
	private Map<String,String> queryCreditAuditByIntoCustRefId(String intoCustRefId) throws Exception {
		Map<String, Object> searchParm = new HashMap<String, Object>();
		searchParm.put("intoCustRefId", intoCustRefId);
		Map<String,String> result = intoInfoRepDao.findCreditAuditByIntoCustRefId(searchParm);
		if(result == null) {
			result = new HashMap<String, String>();
		}
		
		return result;
	}
	
	/**
	 * @author xujunqi
	 * @description: 转换用户
	 * @date 2015年4月29日 下午2:30:39
	 * @param userId
	 * @return
	 */
	private String getUserNameByUserId(String userId) {
		String userName = "";
		UserInfo user = orgAPI.getUserInfoDetail(userId);
		if (user != null) {
			userName = user.getUserName();
		}

		return userName;
	}
	
	/**
	 * @author xujunqi
	 * @description: 转换机构
	 * @date 2015年4月29日 下午2:32:16
	 * @param orgId
	 * @return
	 */
	private String getOrgNameByOrgId(String orgId) {
		String orgName = "";
		OrgInfo org = orgAPI.getOrgInfo(orgId);
		if (org != null) {
			orgName = org.getOrgName();
		}

		return orgName;
	}
	
	/**
	 * @author xujunqi
	 * @description: 转换数据字典
	 * @date 2015年4月29日 下午2:38:55
	 * @param dictCode 字典编码
	 * @param dictValue 字典值
	 * @return
	 */
	private String getDictNameByDictValue(String dictCode, String dictValue) {
		String dictName = "";
		if(dictValue==null) {
			return dictName;
		}
		
		SysDictDetailVo dictDetail = dictAPI.queryDetailByDictCodeAndDeatailValue(dictCode, dictValue);
		if(dictDetail != null) {
			dictName = dictDetail.getDictDetailName();
		}
		
		return dictName;
	}

	@Override
	public void execute(int curPage,String batchMinId,String batchMaxId) throws Exception {
		Map<String,Object> tmp = new HashMap<String,Object>();
		
		tmp.put("beginrow", pageSize*(curPage - 1));
		tmp.put("endrow", pageSize * curPage);
		tmp.put("page", "page");//
		tmp.put("minId", batchMinId);//此批次的最小ID
		tmp.put("maxId", batchMaxId);//此批次的最大ID
		List<Map<String,String>> dataList = intoInfoRepDao.queryIntoInfoListByPage(tmp);
		this.makeupExtInfo(dataList);
		//将生成的进件审批时效数据保存至数据库表中
		this.batchInsertIntoInfoReport(dataList);
	}
}
