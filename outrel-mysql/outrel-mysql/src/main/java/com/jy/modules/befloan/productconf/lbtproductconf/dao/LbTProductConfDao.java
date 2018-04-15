package com.jy.modules.befloan.productconf.lbtproductconf.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.befloan.productconf.lbtproductconf.dto.LbTProductConfDTO;
/**
 * @classname: LbTProductConfDao
 * @description: 定义  产品基础信息表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  dou
 */
@MyBatisRepository
public interface LbTProductConfDao {
    
    /**
     * @author dou
     * @description: 分页查询产品基础信息表
     * @date 2014-11-03 15:08:56
     * @param searchParams
     * @return
     */
    public List<LbTProductConfDTO> searchLbTProductConfByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author dou
     * @description:查询对象产品基础信息表
     * @date 2014-11-03 15:08:56
     * @param searchParams
     * @return
     */
    
    public List<LbTProductConfDTO> searchLbTProductConf(Map<String,Object> searchParams);
    /**
     * @description:通过产品编号查询 lb_t_product_conf的综合费率
     * @param searchParams
     * @return
     */
    public List<LbTProductConfDTO> searchProductConf(Map<String,Object> searchParams);

    /**
     * @author dou
     * @description:查询对象产品基础信息表
     * @date 2014-11-03 15:08:56
     * @param id
     * @return
     */
    public LbTProductConfDTO findLbTProductConfByPrimaryKey(String id);
    
    /**
     * @author dou
     * @description: 新增对象产品基础信息表
     * @date 2014-11-03 15:08:56
     * @param paramMap
     * @return
     */
    public int insertLbTProductConf(Map<String, Object> paramMap);
    
    /**
     * @author dou
     * @description: 更新对象产品基础信息表
     * @date 2014-11-03 15:08:56
     * @param paramMap
     */
    public void updateLbTProductConf(Map<String, Object> paramMap);
     
    /**
     * @author dou
     * @description: 按主键删除产品基础信息表
     * @date 2014-11-03 15:08:56
     * @param ids
     * @return
     */ 
    public void deleteLbTProductConfByPrimaryKey(Map<String, Object> paramMap);
    
    /**
     * @author xujunqi
     * @description: 根据核心产品编码获取产品集合
     * @date 2015年1月10日 上午10:59:45
     * @param productCode 核心产品编码
     * @return List<LbTProductConfDTO>
     */
    public List<LbTProductConfDTO> findLbTProductConfByCoreProductCode(String productCode);

    /**
     * @author xujunqi
     * @description: 根据核心产品ID获取本地产品明细
     * @date 2015年1月10日 上午11:00:36
     * @param productId 核心产品ID
     * @return LbTProductConfDTO
     */
    public LbTProductConfDTO findLbTProductConfByCoreProductId(String productId);
    
    /**
     * @author xujunqi
     * @description: 根据核心产品ID更新本地产品明细
     * @date 2015年1月10日 上午11:16:38
     * @param paramMap
     */
    public void updateLbTProductByCoreProductId(Map<String, Object> paramMap);
    
    /**
     * 查询超时提前提醒的流程列表
        * @title: queryRemindProcessList
        * @author
        * @description:
        * @date 2015年1月22日 下午1:52:29
        * @param param
        * @return
        * @throws
     */
    public List<Map<String, Object>> queryRemindProcessList(Map<String, Object> param);
    
    /**
     * 查询超时的流程列表
        * @title: queryOvertimeProcessList
        * @author
        * @description:
        * @date 2015年1月22日 下午1:52:29
        * @param param
        * @return
        * @throws
     */
    public List<Map<String, Object>> queryOvertimeProcessList(Map<String, Object> param);
    
    /**
     * 查询需要计算超时时间和提醒时间的流程实例
    	* @title: queryNeedCalOverTimeProcesses
    	* @author
    	* @description:
    	* @date 2015年1月29日 下午7:56:07
    	* @param searchParams
    	* @return
    	* @throws
     */
    public List<Map<String, Object>> queryNeedCalOverTimeProcesses(Map<String, Object> searchParams);
    /**
     * 查询 需要 系统结束 的流程信息 及业务信息
     * @param param
     * @return
     */
	public List<Map<String, Object>> queryNeedSysEndBizProInfo(Map<String, Object> param);
	
	/*
	 * 查询贷款产品编码对应产品名称
	 */
	public List<Map<String, Object>> queryQutoProInfo();

	public List<Map<String, Object>> queryNeedSysEndAuditBizProInfo(Map<String, Object> param);

	
	/**
	 * 修改产品类型排序
	 * @param param
	*/ 
    public void updateProductSortNum(Map<String, Object> paramMap);
}
