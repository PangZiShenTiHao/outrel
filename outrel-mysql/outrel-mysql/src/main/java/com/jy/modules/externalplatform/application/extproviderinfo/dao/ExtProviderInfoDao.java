package com.jy.modules.externalplatform.application.extproviderinfo.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.extproviderinfo.dto.ExtProviderInfoDTO;
/**
 * @classname: ExtProviderInfoDao
 * @description: 定义  提供商配置表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  Administrator
 */
@MyBatisRepository
public interface ExtProviderInfoDao {
    
    /**
     * @author Administrator
     * @description: 分页查询提供商配置表
     * @date 2017-05-12 14:14:06
     * @param searchParams
     * @return
     */
    public List<ExtProviderInfoDTO> searchExtProviderInfoByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author Administrator
     * @description:查询对象提供商配置表
     * @date 2017-05-12 14:14:06
     * @param searchParams
     * @return
     */
    public List<ExtProviderInfoDTO> searchExtProviderInfo(Map<String,Object> searchParams);

    /**
     * @author Administrator
     * @description:查询对象提供商配置表
     * @date 2017-05-12 14:14:06
     * @param id
     * @return
     */
    public ExtProviderInfoDTO findExtProviderInfoByPrimaryKey(String id);
    
    /**
     * @author Administrator
     * @description: 新增对象提供商配置表
     * @date 2017-05-12 14:14:06
     * @param paramMap
     * @return
     */
    public int insertExtProviderInfo(Map<String, Object> paramMap);
    
    /**
     * @author Administrator
     * @description: 更新对象提供商配置表
     * @date 2017-05-12 14:14:06
     * @param paramMap
     */
    public void updateExtProviderInfo(Map<String, Object> paramMap);
     
    /**
     * @author Administrator
     * @description: 按主键删除提供商配置表
     * @date 2017-05-12 14:14:06
     * @param ids
     * @return
     */ 
    public void deleteExtProviderInfoByID(Map<String, Object> paramMap);
    
    
}
