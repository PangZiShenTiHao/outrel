package com.jy.modules.externalplatform.application.extfunctiontype.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.extfunctiontype.dto.ExtFunctionTypeDTO;
/**
 * @classname: ExtFunctionTypeDao
 * @description: 定义  外联平台功能类型表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  dell
 */
@MyBatisRepository
public interface ExtFunctionTypeDao {
    
    /**
     * @author dell
     * @description: 分页查询外联平台功能类型表
     * @date 2017-04-06 14:24:35
     * @param searchParams
     * @return
     */
    public List<ExtFunctionTypeDTO> searchExtFunctionTypeByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author dell
     * @description:查询对象外联平台功能类型表
     * @date 2017-04-06 14:24:35
     * @param searchParams
     * @return
     */
    public List<ExtFunctionTypeDTO> searchExtFunctionType(Map<String,Object> searchParams);
    
    
    /**
     * @description: 查询对象外联平台功能类型表
     * @return
     */
    public List<ExtFunctionTypeDTO> searchExtFunctionTypeInfoAllList();

    /**
     * @author dell
     * @description:查询对象外联平台功能类型表
     * @date 2017-04-06 14:24:35
     * @param id
     * @return
     */
    public ExtFunctionTypeDTO findExtFunctionTypeByPrimaryKey(String id);
    
    /**
     * @author dell
     * @description: 新增对象外联平台功能类型表
     * @date 2017-04-06 14:24:35
     * @param paramMap
     * @return
     */
    public int insertExtFunctionType(Map<String, Object> paramMap);
    
    /**
     * @author dell
     * @description: 更新对象外联平台功能类型表
     * @date 2017-04-06 14:24:35
     * @param paramMap
     */
    public void updateExtFunctionType(Map<String, Object> paramMap);
     
    /**
     * @author dell
     * @description: 按主键删除外联平台功能类型表
     * @date 2017-04-06 14:24:35
     * @param ids
     * @return
     */ 
    public void deleteExtFunctionTypeByID(Map<String, Object> paramMap);

	
	/**
	* @title: searchExtFunctionTypeBySysCode
	* @author:陈东栋
	* @description: 查询分配于系统的功能类型
	* @date 2017年4月25日 下午4:21:09
	* @param paramMap
	* @return
	* @throws 
	*/ 
	public List<ExtFunctionTypeDTO> searchExtFunctionTypeBySysCode(Map<String, Object> paramMap);
	
        
    /**
	* @title: findExtFunctionTypeByFuncType
	* @author:陈东栋
	* @description: 按功能类型编码查询功能类型
	* @date 2017年5月13日 上午11:39:54
	* @param funcTypeCode
	* @return
	* @throws 
	*/ 
	public ExtFunctionTypeDTO findExtFunctionTypeByFuncType(String funcTypeCode); 
}
