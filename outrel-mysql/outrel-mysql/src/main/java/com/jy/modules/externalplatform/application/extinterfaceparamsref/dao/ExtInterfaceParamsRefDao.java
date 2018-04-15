package com.jy.modules.externalplatform.application.extinterfaceparamsref.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.extinterfaceparamsref.dto.ExtInterfaceParamsRefDTO;
/**
 * @classname: ExtInterfaceParamsRefDao
 * @description: 定义  接口参数映射表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  Administrator
 */
@MyBatisRepository
public interface ExtInterfaceParamsRefDao {
    
    /**
     * @author Administrator
     * @description: 分页查询接口参数映射表
     * @date 2017-05-16 15:10:22
     * @param searchParams
     * @return
     */
    public List<ExtInterfaceParamsRefDTO> searchExtInterfaceParamsRefByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author Administrator
     * @description:查询对象接口参数映射表
     * @date 2017-05-16 15:10:22
     * @param searchParams
     * @return
     */
    public List<ExtInterfaceParamsRefDTO> searchExtInterfaceParamsRef(Map<String,Object> searchParams);

    /**
     * @author Administrator
     * @description:查询对象接口参数映射表
     * @date 2017-05-16 15:10:22
     * @param id
     * @return
     */
    public ExtInterfaceParamsRefDTO findExtInterfaceParamsRefByPrimaryKey(String id);
    
    /**
     * @author Administrator
     * @description: 新增对象接口参数映射表
     * @date 2017-05-16 15:10:22
     * @param paramMap
     * @return
     */
    public int insertExtInterfaceParamsRef(Map<String, Object> paramMap);
    
    /**
     * @author Administrator
     * @description: 更新对象接口参数映射表
     * @date 2017-05-16 15:10:22
     * @param paramMap
     */
    public void updateExtInterfaceParamsRef(Map<String, Object> paramMap);
     
    /**
     * @author Administrator
     * @description: 按主键删除接口参数映射表
     * @date 2017-05-16 15:10:22
     * @param ids
     * @return
     */ 
    public void deleteExtInterfaceParamsRefByID(Map<String, Object> paramMap);
    
    /**
     * @author Administrator
     * @description: 按主键删除接口参数映射表
     * @date 2017-05-16 15:10:22
     * @param ids
     * @return
     */ 
    public void deleteExtInterfaceParamsRefByInterfaceNo(Map<String, Object> paramMap);
    
}
