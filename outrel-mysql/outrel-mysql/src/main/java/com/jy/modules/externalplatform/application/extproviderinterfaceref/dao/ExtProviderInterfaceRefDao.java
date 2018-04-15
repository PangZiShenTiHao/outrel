package com.jy.modules.externalplatform.application.extproviderinterfaceref.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.extproviderinterfaceref.dto.ExtProviderInterfaceRefDTO;
/**
 * @classname: ExtProviderInterfaceRefDao
 * @description: 定义  提供商和接口映射表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  Administrator
 */
@MyBatisRepository
public interface ExtProviderInterfaceRefDao {
    
    /**
     * @author Administrator
     * @description: 分页查询提供商和接口映射表
     * @date 2017-05-12 16:41:52
     * @param searchParams
     * @return
     */
    public List<ExtProviderInterfaceRefDTO> searchExtProviderInterfaceRefByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author Administrator
     * @description:查询对象提供商和接口映射表
     * @date 2017-05-12 16:41:52
     * @param searchParams
     * @return
     */
    public List<ExtProviderInterfaceRefDTO> searchExtProviderAllInterfaceRef(Map<String,Object> searchParams);

    /**
     * @author Administrator
     * @description:查询对象提供商和接口映射表
     * @date 2017-05-12 16:41:52
     * @param searchParams
     * @return
     */
    public List<ExtProviderInterfaceRefDTO> searchExtProviderInterfaceRef(Map<String,Object> searchParams);

    
    /**
     * @author Administrator
     * @description:查询对象提供商和接口映射表
     * @date 2017-05-12 16:41:52
     * @param id
     * @return
     */
    public ExtProviderInterfaceRefDTO findExtProviderInterfaceRefByPrimaryKey(String id);
    
    /**
     * @author Administrator
     * @description: 新增对象提供商和接口映射表
     * @date 2017-05-12 16:41:52
     * @param paramMap
     * @return
     */
    public int insertExtProviderInterfaceRef(Map<String, Object> paramMap);
    
    /**
     * @author Administrator
     * @description: 更新对象提供商和接口映射表
     * @date 2017-05-12 16:41:52
     * @param paramMap
     */
    public void updateExtProviderInterfaceRef(Map<String, Object> paramMap);
     
    /**
     * @author Administrator
     * @description: 按主键删除提供商和接口映射表
     * @date 2017-05-12 16:41:52
     * @param ids
     * @return
     */ 
    public void deleteExtProviderInterfaceRefByID(Map<String, Object> paramMap);
    
    /**
     * @author Administrator
     * @description: 按提供商编码删除提供商和接口映射表
     * @date 2017-05-12 16:41:52
     * @param ids
     * @return
     */ 
    
    public void deleteExtProviderInterfaceRefByProviderCode(Map<String, Object> paramMap);
    
	/**
	* @title: batchInsertExtProviderInterfaceRef
	* @author:相立鹏
	* @description: 批量保存数据
	* @date 2017年5月15日 下午1:58:55
	* @param paramMap
	* @throws 
	*/ 
	public void batchInsertExtProviderInterfaceRef(Map<String, Object> paramMap); 
    
}
