package com.jy.modules.externalplatform.application.extsysmanagement.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.extsysmanagement.dto.ExtSysManagementDTO;
/**
 * @classname: ExtSysManagementDao
 * @description: 定义  外联平台系统管理表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  dell
 */
@MyBatisRepository
public interface ExtSysManagementDao {
    
    /**
     * @author dell
     * @description: 分页查询外联平台系统管理表
     * @date 2017-04-06 13:10:18
     * @param searchParams
     * @return
     */
    public List<ExtSysManagementDTO> searchExtSysManagementByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author dell
     * @description:查询对象外联平台系统管理表
     * @date 2017-04-06 13:10:18
     * @param searchParams
     * @return
     */
    public List<ExtSysManagementDTO> searchExtSysManagement(Map<String,Object> searchParams);

    /**
	* @title: searchExtValidSysManagement
	* @author:陈东栋
	* @description: 查询处于有效状态的系统类型
	* @date 2017年5月13日 上午10:37:24
	* @return
	* @throws 
	*/ 
    public List<ExtSysManagementDTO> searchExtValidSysManagement();
    
    /**
     * @author dell
     * @description:查询对象外联平台系统管理表
     * @date 2017-04-06 13:10:18
     * @param id
     * @return
     */
    public ExtSysManagementDTO findExtSysManagementByPrimaryKey(String id);
    
    /**
     * @author dell
     * @description: 新增对象外联平台系统管理表
     * @date 2017-04-06 13:10:18
     * @param paramMap
     * @return
     */
    public int insertExtSysManagement(Map<String, Object> paramMap);
    
    /**
     * @author dell
     * @description: 更新对象外联平台系统管理表
     * @date 2017-04-06 13:10:18
     * @param paramMap
     */
    public void updateExtSysManagement(Map<String, Object> paramMap);
     
    /**
     * @author dell
     * @description: 按主键删除外联平台系统管理表
     * @date 2017-04-06 13:10:18
     * @param ids
     * @return
     */ 
    public void deleteExtSysManagementByPrimaryKey(Map<String, Object> paramMap);
    
    /**
     * @author dell
     * @description: 按主键删除外联平台系统管理表（真删除）
     * @date 2017-04-06 13:10:18
     * @param ids
     * @return
     */ 
    public void deleteExtSysManagementByID(Map<String, Object> paramMap);
}
