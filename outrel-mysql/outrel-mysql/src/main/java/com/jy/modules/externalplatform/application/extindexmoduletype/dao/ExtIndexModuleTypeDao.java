package com.jy.modules.externalplatform.application.extindexmoduletype.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.extindexmoduletype.dto.ExtIndexModuleTypeDTO;
/**
 * @classname: ExtIndexModuleTypeDao
 * @description: 定义  指标模型 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  dell
 */
@MyBatisRepository
public interface ExtIndexModuleTypeDao {
    
    /**
     * @author dell
     * @description: 分页查询指标模型
     * @date 2017-05-17 09:55:45
     * @param searchParams
     * @return
     */
    public List<ExtIndexModuleTypeDTO> searchExtIndexModuleTypeByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author dell
     * @description:查询对象指标模型
     * @date 2017-05-17 09:55:45
     * @param searchParams
     * @return
     */
    public List<ExtIndexModuleTypeDTO> searchExtIndexModuleType(Map<String,Object> searchParams);

    /**
     * 查询对象反欺诈模块类型表
     * @return
     */
    public List<ExtIndexModuleTypeDTO> searchExtIndexModuleTypeAllList();
    
    
    /**
     * @author dell
     * @description:查询对象指标模型
     * @date 2017-05-17 09:55:45
     * @param id
     * @return
     */
    public ExtIndexModuleTypeDTO findExtIndexModuleTypeByPrimaryKey(String id);
    
    /**
     * @author dell
     * @description: 新增对象指标模型
     * @date 2017-05-17 09:55:45
     * @param paramMap
     * @return
     */
    public int insertExtIndexModuleType(Map<String, Object> paramMap);
    
    /**
     * @author dell
     * @description: 更新对象指标模型
     * @date 2017-05-17 09:55:45
     * @param paramMap
     */
    public void updateExtIndexModuleType(Map<String, Object> paramMap);
     
    /**
     * @author dell
     * @description: 按主键删除指标模型
     * @date 2017-05-17 09:55:45
     * @param ids
     * @return
     */ 
    public void deleteExtIndexModuleTypeByPrimaryKey(Map<String, Object> paramMap);
    
    /**
     * 下拉框：查询对象指标模型类型列表
     * @param paramMap
     * @return
     */
    public List<ExtIndexModuleTypeDTO> searchExtIndexModuleTypeByCondition(Map<String, Object> paramMap);
    
    /**
     * 下拉框：通过模块类型唯一编码查询指标模型类型
     * @param paramMap
     * @return
     */
    public ExtIndexModuleTypeDTO searchExtIndexModuleTypeByCode(Map<String, Object> paramMap);
    
    
}
