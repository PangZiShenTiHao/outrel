package com.jy.modules.externalplatform.application.extinvokefilterrulemap.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.extinvokefilterrulemap.dto.ExtInvokeFilterRuleMapDTO;
/**
 * @classname: ExtInvokeFilterRuleMapDao
 * @description: 定义  外联调用挡板规则-映射表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  dell
 */
@MyBatisRepository
public interface ExtInvokeFilterRuleMapDao {
    
    /**
     * @author dell
     * @description:查询对象外联调用挡板规则-映射表
     * @date 2017-04-26 09:11:08
     * @param searchParams
     * @return
     */
    public List<ExtInvokeFilterRuleMapDTO> searchExtInvokeFilterRuleMap(Map<String,Object> searchParams);

    
    /**
     * @author dell
     * @description: 新增对象外联调用挡板规则-映射表
     * @date 2017-04-26 09:11:08
     * @param paramMap
     * @return
     */
    public int insertExtInvokeFilterRuleMap(Map<String, Object> paramMap);
    
	/**
	* @title: batchInsertRuleMap
	* @author:陈东栋
	* @description: 批量保存数据
	* @date 2017年4月26日 下午1:58:55
	* @param paramMap
	* @throws 
	*/ 
	public void batchInsertRuleMap(Map<String, Object> paramMap);

	
	/**
	* @title: queryOrgListByRuleId
	* @author:陈东栋
	* @description: 查询 外联调用挡板规则-使用产品映射表,按规则ID
	* @date 2017年4月27日 下午4:16:49
	* @param searchParams
	* @return
	* @throws 
	*/ 
	public List<ExtInvokeFilterRuleMapDTO> queryOrgListByRuleId(Map<String, Object> searchParams);

	
	/**
	* @title: queryFuncListByRuleId
	* @author:陈东栋
	* @description: 查询 外联调用挡板规则-使用功能映射表,按规则ID
	* @date 2017年4月27日 下午5:01:04
	* @param searchParams
	* @return
	* @throws 
	*/ 
	public List<ExtInvokeFilterRuleMapDTO> queryFuncListByRuleId(Map<String, Object> searchParams);

	
	/**
	* @title: deleteExtInvokeFilterRuleMapByRuleId
	* @author:陈东栋
	* @description: 删除外联调用挡板规则-映射表,按规则ID
	* @date 2017年4月27日 下午6:10:26
	* @param paramMap
	* @throws 
	*/ 
	public void deleteExtInvokeFilterRuleMapByRuleId(Map<String, Object> paramMap);
	
	 /**
     * @author:陈东栋
     * @description: 按主键删除外联调用挡板规则-映射表
     * @date 2017-04-26 09:11:08
     * @param ids
     * @return
     */ 
     public void deleteExtInvokeFilterRuleMapByID(Map<String, Object> paramMap);
     
}
