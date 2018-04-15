package com.jy.modules.externalplatform.application.extfunctioninterfaceref.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.extfunctioninterfaceref.dto.ExtFunctionInterfaceRefDTO;
/**
 * @classname: ExtFunctionInterfaceRefDao
 * @description: 定义  功能接口映射表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  dell
 */
@MyBatisRepository
public interface ExtFunctionInterfaceRefDao {
    
    /**
     * @author dell
     * @description: 分页查询功能接口映射表
     * @date 2017-05-12 16:39:43
     * @param searchParams
     * @return
     */
    public List<ExtFunctionInterfaceRefDTO> searchExtFunctionInterfaceRefByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author dell
     * @description:查询对象功能接口映射表
     * @date 2017-05-12 16:39:43
     * @param searchParams
     * @return
     */
    public List<ExtFunctionInterfaceRefDTO> searchExtFunctionInterfaceRef(Map<String,Object> searchParams);

    /**
     * @author dell
     * @description:查询对象功能接口映射表
     * @date 2017-05-12 16:39:43
     * @param id
     * @return
     */
    public ExtFunctionInterfaceRefDTO findExtFunctionInterfaceRefByPrimaryKey(String id);
    
    /**
     * @author dell
     * @description: 新增对象功能接口映射表
     * @date 2017-05-12 16:39:43
     * @param paramMap
     * @return
     */
    public int insertExtFunctionInterfaceRef(Map<String, Object> paramMap);
    
    /**
     * @author dell
     * @description: 更新对象功能接口映射表
     * @date 2017-05-12 16:39:43
     * @param paramMap
     */
    public void updateExtFunctionInterfaceRef(Map<String, Object> paramMap);
     
    /**
     * @author dell
     * @description: 按主键删除功能接口映射表
     * @date 2017-05-12 16:39:43
     * @param ids
     * @return
     */ 
    public void deleteExtFunctionInterfaceRefByPrimaryKey(Map<String, Object> paramMap);

	
	/**
	* @title: batchInsertExtFuncInterfaceRef
	* @author:陈东栋
	* @description: 批量添加功能接口映射表
	* @date 2017年5月13日 下午5:46:51
	* @param paramMap
	* @throws 
	*/ 
	public void batchInsertExtFuncInterfaceRef(Map<String, Object> paramMap);

	
	/**
	* @title: deleteExtFuncInterfaceRefByFuncCode
	* @author:陈东栋
	* @description: 通过功能点类型删除功能接口映射
	* @date 2017年5月13日 下午7:49:43
	* @param paramMap
	* @throws 
	*/ 
	public void deleteExtFuncInterfaceRefByFuncCode(Map<String, Object> paramMap);
}
