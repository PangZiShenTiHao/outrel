/*package com.jy.modules.befloan.productconf.lbtproductconf.service;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fintech.platform.api.sysconfig.SysConfigAPI;
import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.befloan.callthirdbiz.CodeConstant;
import com.jy.modules.befloan.callthirdbiz.EsbCallService;
import com.jy.modules.befloan.productconf.lbtproductconf.dao.LbTProductConfDao;
import com.jy.modules.befloan.productconf.lbtproductconf.dto.LbTProductConfDTO;

*//**
 * @classname: LbTProductConfService
 * @description: 定义  产品基础信息表 实现类
 * @author:  dou
 *//*
@Service("com.jy.modules.befloan.productconf.lbtproductconf.service.LbTProductConfService")
public class LbTProductConfService implements Serializable {
	private static final Logger logger = LoggerFactory.getLogger(LbTProductConfService.class);

    private static final long serialVersionUID = 1L;
    
    private static final int PRODUCT_STATE = 3;
    @Autowired
	private SysConfigAPI sysConfigAPI;
	@Autowired
	private LbTProductConfDao dao;
    @Autowired
    @Qualifier("com.jy.modules.befloan.callthirdbiz.EsbCallService")
    private EsbCallService esbCallService;

	*//**
     * @author dou
     * @description: 分页查询 产品基础信息表列表
     * @date 2014-11-03 15:08:55
     * @param searchParams 条件
     * @return
     * @throws
     *//* 
	public List<LbTProductConfDTO> searchLbTProductConfByPaging(Map<String,Object> searchParams) throws Exception {
		List<LbTProductConfDTO> dataList =  dao.searchLbTProductConfByPaging(searchParams);
		return dataList;
	}
	*//**
     * @author dou
     * @description: 按条件查询产品基础信息表列表
     * @date 2014-11-03 15:08:55
     * @param searchParams 条件
     * @return
     * @throws
     *//*
	public List<LbTProductConfDTO> searchLbTProductConf(Map<String,Object> searchParams) throws Exception {
	    List<LbTProductConfDTO> dataList = dao.searchLbTProductConf(searchParams);
        return dataList;
    }
	
	 *//**
     * @description:通过产品编号查询 lb_t_product_conf的综合费率
     * @param searchParams
     * @return
     *//*
    public List<LbTProductConfDTO> searchProductConf(Map<String,Object> searchParams){
    	
    	 List<LbTProductConfDTO> dataList = dao.searchProductConf(searchParams);
         return dataList;
    }
	*//**
     * @author dou
     * @description: 查询产品基础信息表对象
     * @date 2014-11-03 15:08:55
     * @param id
     * @return
     * @throws
     *//* 
	public LbTProductConfDTO queryLbTProductConfByPrimaryKey(String id) throws Exception {
		
		LbTProductConfDTO dto = dao.findLbTProductConfByPrimaryKey(id);
		
		if(dto == null) dto = new LbTProductConfDTO();
		
		return dto;
		
	}
	
	*//**
	 * @author xujunqi
	 * @description: 根据主键获取产品信息, 如果不存在, 不进行初始化
	 * @date 2015年1月21日 上午10:46:08
	 * @param id
	 * @return
	 * @throws Exception
	 *//*
	public LbTProductConfDTO queryLbTProductConfByPrimaryKeyNonInit(String id) throws Exception {
		
		return dao.findLbTProductConfByPrimaryKey(id);
	}

	*//**
     * @title: insertLbTProductConf
     * @author dou
     * @description: 新增 产品基础信息表对象
     * @date 2014-11-03 15:08:55
     * @param dto
     * @return
     * @throws
     *//*
	@SuppressWarnings("all")
	public String insertLbTProductConf(LbTProductConfDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		int count = dao.insertLbTProductConf(paramMap);
		
		LbTProductConfDTO resultDto = (LbTProductConfDTO) paramMap.get("dto");
		String keyId = resultDto.getId();
		return keyId;
	}
	*//**
     * @title: updateLbTProductConf
     * @author dou
     * @description: 修改 产品基础信息表对象
     * @date 2014-11-03 15:08:55
     * @param paramMap
     * @return
     * @throws
     *//*
	public void updateLbTProductConf(LbTProductConfDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		dao.updateLbTProductConf(paramMap);
	}
	*//**
     * @title: deleteLbTProductConfByPrimaryKey
     * @author dou
     * @description: 删除 产品基础信息表,按主键
     * @date 2014-11-03 15:08:55
     * @param paramMap
     * @throws
     *//* 
	public void deleteLbTProductConfByPrimaryKey(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteLbTProductConfByPrimaryKey(paramMap);
	}
	
	*//**
	 * @author xujunqi
	 * @description: 根据查询条件, 从核心主数据获取最新的产品集合信息
	 * @date 2015年1月9日 下午2:01:05
	 * @param searchParams
	 * @return
	 * @return List<LbTProductConfDTO>
	 *//*
	@SuppressWarnings("unchecked")
	public List<LbTProductConfDTO> syncQueryProductFromCore(Map<String, String> params) throws Exception {
		params.put("type", "loan");
		params.put("productType", "01");
		String url = sysConfigAPI.getValue("productquery_url");
		Object esbObj = esbCallService.get(url, params, CodeConstant.PROD_BR_CODE, CodeConstant.PROD_INTER_CODE);
		
		List<LbTProductConfDTO> resultList = null;
		//交易成功
		if(esbObj == null) {
			logger.error("同步获取核心主数据产品列表, 请求异常, 交易业务编码: " + CodeConstant.PROD_INTER_CODE);
			throw new Exception("同步获取核心主数据产品列表, 请求异常");
		} else {
			Map<String, Object> esbMap = (Map<String, Object>)esbObj;
			List<Map<String, Object>> loanList = (List<Map<String, Object>>)esbMap.get("loans");
			LbTProductConfDTO prodInfo = null;
			resultList = new ArrayList<LbTProductConfDTO>();
			
			if(loanList!=null&&loanList.size()>0) {
				for(Map<String, Object> loan: loanList) {
					//如果当前日期小于产品的开始日期, 产品尚未开始使用, 不做同步
					if(PRODUCT_STATE != new BigDecimal(String.valueOf(loan.get("productState"))).intValue() || new Date().compareTo(new Date((Long)loan.get("startDate"))) < 0) {
						continue;
					}
					
					prodInfo = new LbTProductConfDTO();
					prodInfo.setId(String.valueOf(loan.get("code")));
					prodInfo.setProductType(String.valueOf(loan.get("productType")));
					prodInfo.setProductId(new BigDecimal(String.valueOf(loan.get("id"))).longValue());
					prodInfo.setProductCode(String.valueOf(loan.get("code")));
					prodInfo.setProductName(String.valueOf(loan.get("name")));
					prodInfo.setVersion(String.valueOf(loan.get("version")));
					prodInfo.setProductState(String.valueOf(loan.get("productState")));
					prodInfo.setValidateState(String.valueOf(loan.get("validateState")));
					//服务费率
					if(loan.get("serviceRateDefaultValue")!=null && !"".equals(loan.get("serviceRateDefaultValue"))){
						prodInfo.setServiceRate(new BigDecimal(String.valueOf(loan.get("serviceRateDefaultValue"))));
					}
					//月综合费率
					if(loan.get("serviceRateDefaultValue")!=null && !"".equals(loan.get("serviceRateDefaultValue"))){
						prodInfo.setComprehensiveRate(new BigDecimal(String.valueOf(loan.get("serviceRateDefaultValue"))));
					}
					//贷款利率
					if(loan.get("loanRateDefaultValue")!=null && !"".equals(loan.get("loanRateDefaultValue"))){
						prodInfo.setLoanRate(new BigDecimal(String.valueOf(loan.get("loanRateDefaultValue"))));
					}
					// refer LbTIntoProductInfoService.setProductInfo
//advanceSettle=null,
//advanceSettlePeriods=null,
//baseExt2=null,
//baseExt3=null,
//baseExt4=null,
//baseExt5=null,
//baseExt6=null,
//baseExt7=null,
//code=PTL160700204,
//costItem=F001,
//createOrgNameExt=null,
//createTime=1469602473922,
//createUserNameExt=null,
//creator=1,
//creatorNameShow=null,
//dayDefaultInterest=1,
//delay=null,
//dueTimeType=null,
//endDate=1501138465000,
//endDates=null,
//expireState=产品有效,
//gracePeriod=null,
//guaranteeWay=1,
//id=564,
//instruction=null,
//interestCalculation=MONTH,
//interestType=null,
//loanLimit=null,
//loanPeriods=1,
//loanRate=null,
//modifyTime=null,
//moneyType=CNY,
//name=阿打发地方,
//opUserId=null,
//openRate=null,
//penalty=1,
//penaltyCalculation=01,
//productScopeDTO=null,
//productState=4,
//productType=01,
//punitiveCalculation=01,
					
//refundMinPeriods=null,
//reloan=null,
//repaydateCalculation=A10116,
//repaymentRate=1,
//repaymentType=RT01,
//repaymentWay=AC10001,
//serviceRate=null,
//startDate=14696024630
					prodInfo.setParentId(0L);
					resultList.add(prodInfo);
				}
			}
		}
		return resultList;
	}
	
	
	
	*//**
	 * @description: 根据查询条件, 从核心主数据获取最新的产品集合信息调用查询接口v2
	 * @date 2015年1月9日 下午2:01:05
	 * @param searchParams
	 * @return
	 * @return List<LbTProductConfDTO>
	 *//*
	@SuppressWarnings("unchecked")
	public List<LbTProductConfDTO> syncQueryProductFromCoreV2(Map<String, String> params) throws Exception {
		params.put("type", "loan");
		params.put("productType", "01");
		String url = sysConfigAPI.getValue("productquery_url_v2");
		Object esbObj = esbCallService.get(url, params, CodeConstant.PROD_BR_CODE, CodeConstant.PROD_INTER_CODE);
		
		List<LbTProductConfDTO> resultList = null;
		//交易成功
		if(esbObj == null) {
			logger.error("同步获取核心主数据产品列表, 请求异常, 交易业务编码: " + CodeConstant.PROD_INTER_CODE);
			throw new Exception("同步获取核心主数据产品列表, 请求异常");
		} else {
			Map<String, Object> esbMap = (Map<String, Object>)esbObj;
			List<Map<String, Object>> loanList = (List<Map<String, Object>>)esbMap.get("loans");
			LbTProductConfDTO prodInfo = null;
			resultList = new ArrayList<LbTProductConfDTO>();
			
			if(loanList!=null&&loanList.size()>0) {
				for(Map<String, Object> loan: loanList) {
					//如果当前日期小于产品的开始日期, 产品尚未开始使用, 不做同步
					if(PRODUCT_STATE > new BigDecimal(String.valueOf(loan.get("productState"))).intValue() || new Date().compareTo(new Date((Long)loan.get("startDate"))) < 0) {
						continue;
					}
					
					prodInfo = new LbTProductConfDTO();
					prodInfo.setId(String.valueOf(loan.get("code")));
					prodInfo.setProductType(String.valueOf(loan.get("productType")));
					prodInfo.setProductId(new BigDecimal(String.valueOf(loan.get("id"))).longValue());
					prodInfo.setProductCode(String.valueOf(loan.get("code")));
					prodInfo.setProductName(String.valueOf(loan.get("name")));
					prodInfo.setVersion(String.valueOf(loan.get("version")));
					prodInfo.setProductState(String.valueOf(loan.get("productState")));
					prodInfo.setValidateState(String.valueOf(loan.get("validateState")));
					//服务费率
					if(loan.get("serviceRateDefaultValue")!=null && !"".equals(loan.get("serviceRateDefaultValue"))){
						prodInfo.setServiceRate(new BigDecimal(String.valueOf(loan.get("serviceRateDefaultValue"))));
					}
					//月综合费率
					if(loan.get("serviceRateDefaultValue")!=null && !"".equals(loan.get("serviceRateDefaultValue"))){
						prodInfo.setComprehensiveRate(new BigDecimal(String.valueOf(loan.get("serviceRateDefaultValue"))));
					}
					//贷款利率
					if(loan.get("loanRateDefaultValue")!=null && !"".equals(loan.get("loanRateDefaultValue"))){
						prodInfo.setLoanRate(new BigDecimal(String.valueOf(loan.get("loanRateDefaultValue"))));
					}

					prodInfo.setParentId(0L);
					resultList.add(prodInfo);
				}
			}
		}
		return resultList;
	}
    
    *//**
     * @author xujunqi
     * @description: 根据核心产品编码获取产品集合
     * @date 2015年1月10日 上午10:59:45
     * @param productCode 核心产品编码
     * @return List<LbTProductConfDTO>
     *//*
    public List<LbTProductConfDTO> queryLbTProductConfByCoreProductCode(String productCode) {
        return dao.findLbTProductConfByCoreProductCode(productCode);
    }

    *//**
     * @author xujunqi
     * @description: 根据核心产品ID获取本地产品明细
     * @date 2015年1月10日 上午11:00:36
     * @param productId 核心产品ID
     * @return LbTProductConfDTO
     *//*
    public LbTProductConfDTO queryLbTProductConfByCoreProductId(Long productId) {
		
		return dao.findLbTProductConfByCoreProductId(String.valueOf(productId));
    }
    
    *//**
     * @author xujunqi
     * @description: 根据核心产品ID更新本地产品明细
     * @date 2015年1月10日 上午11:16:38
     * @param paramMap
     *//*
    public void updateLbTProductByCoreProductId(LbTProductConfDTO dto) {
    	Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		dao.updateLbTProductByCoreProductId(paramMap);
    }
    
    *//**
     * 查询超时提前提醒的流程列表
        * @title: queryRemindProcessList
        * @author
        * @description:
        * @date 2015年1月22日 上午11:56:24
        * @param searchParams
        * @return
        * @throws
     *//*
    public List<Map<String, Object>> queryRemindProcessList(Map<String, Object> searchParams){
        List<Map<String, Object>> remindProcessList = dao.queryRemindProcessList(searchParams);
        return remindProcessList;
    }
    
    *//**
     * 查询超时流程列表
        * @title: queryOvertimeProcessList
        * @author
        * @description:
        * @date 2015年1月22日 上午11:58:11
        * @param searchParams
        * @return
        * @throws
     *//*
    public List<Map<String, Object>> queryOvertimeProcessList(Map<String, Object> searchParams){
        List<Map<String, Object>> overTimeProcessList = dao.queryOvertimeProcessList(searchParams);
        return overTimeProcessList;
    }
    *//**
     * 查询需要计算超时时间和提醒时间的流程实例
    	* @title: queryNeedCalOverTimeProcesses
    	* @author
    	* @description:
    	* @date 2015年1月29日 下午7:55:15
    	* @param searchParams
    	* @return
    	* @throws
     *//*
    public List<Map<String, Object>> queryNeedCalOverTimeProcesses(Map<String, Object> searchParams){
        List<Map<String, Object>> overTimeProcessList = dao.queryNeedCalOverTimeProcesses(searchParams);
        return overTimeProcessList;
    }
    *//**
     * 查询 需要 系统结束 的流程信息 及业务信息
     * @param param
     * @return
     *//*
	public List<Map<String, Object>> queryNeedSysEndBizProInfo(Map<String, Object> param) {
		List<Map<String, Object>> dataList = dao.queryNeedSysEndBizProInfo(param);
		
        return dataList;
	}
	  *//**
     * 查询 需要 系统结束 的流程信息 及业务信息 处于稽核审批的流程
     * @param param
     * @return
     *//*
	public List<Map<String, Object>> queryNeedSysEndAuditBizProInfo(Map<String, Object> param) {
		List<Map<String, Object>> dataList = dao.queryNeedSysEndAuditBizProInfo(param);
		
        return dataList;
	}
	public List<Map<String, Object>> queryQutoProInfo() {
		List<Map<String, Object>> dataList = dao.queryQutoProInfo();
        return dataList;
	}
	
	*//**
	* @description: 修改产品类型排序
	* @param productInfoList
	* @throws Exception
	* @throws 
	*//* 
	public void updateProductSortNum(List<LbTProductConfDTO> productInfoList) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dtoList", productInfoList);
		dao.updateProductSortNum(paramMap);
	}
}

*/