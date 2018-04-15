package com.jy.modules.externalplatform.interfacerest.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.interfacerest.dto.ExtInterfaceLogDTO;
/**
 * @classname: ExtInterfaceLogDao
 * @description: 定义  调用接口日志表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  Administrator
 */
@MyBatisRepository
public interface ExtInterfaceLogDao {
    
    /**
     * @author Administrator
     * @description: 分页查询调用接口日志表
     * @date 2017-05-17 17:59:40
     * @param searchParams
     * @return
     */
    public List<ExtInterfaceLogDTO> searchExtInterfaceLogByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author Administrator
     * @description:查询对象调用接口日志表
     * @date 2017-05-17 17:59:40
     * @param searchParams
     * @return
     */
    public List<ExtInterfaceLogDTO> searchExtInterfaceLog(Map<String,Object> searchParams);

    /**
     * @author Administrator
     * @description:查询对象调用接口日志表
     * @date 2017-05-17 17:59:40
     * @param id
     * @return
     */
    public ExtInterfaceLogDTO findExtInterfaceLogByPrimaryKey(String id);
    
    /**
     * @author Administrator
     * @description: 新增对象调用接口日志表
     * @date 2017-05-17 17:59:40
     * @param paramMap
     * @return
     */
    public int insertExtInterfaceLog(Map<String, Object> paramMap);
    
    /**
     * @author Administrator
     * @description: 更新对象调用接口日志表
     * @date 2017-05-17 17:59:40
     * @param paramMap
     */
    public void updateExtInterfaceLog(Map<String, Object> paramMap);
     
    /**
     * @author Administrator
     * @description: 按主键删除调用接口日志表
     * @date 2017-05-17 17:59:40
     * @param ids
     * @return
     */ 
    public void deleteExtInterfaceLogByPrimaryKey(Map<String, Object> paramMap);
    /**
     * @author Administrator
     * @description: 查询接口使用次数
     * @date 2017-05-17 17:59:40
     * @param ids
     * @return
     */ 
	public List<ExtInterfaceLogDTO> queryExtInterfaceLogNum(Map<String, Object> searchParams);

	/**
     * @author Administrator
     * @description: 查询接口使用次数
     * @date 2017-05-17 17:59:40
     * @param ids
     * @return
     */ 
	public List<ExtInterfaceLogDTO> queryExtInterfaceLogStatus(Map<String, Object> searchParams);
    
    
}
