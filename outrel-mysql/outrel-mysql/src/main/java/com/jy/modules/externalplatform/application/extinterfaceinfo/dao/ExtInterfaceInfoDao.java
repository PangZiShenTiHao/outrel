package com.jy.modules.externalplatform.application.extinterfaceinfo.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.extinterfaceinfo.dto.ExtInterfaceInfoDTO;
/**
 * @classname: ExtInterfaceInfoDao
 * @description: 定义  接口配置表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  Administrator
 */
@MyBatisRepository
public interface ExtInterfaceInfoDao {
    
    /**
     * @author Administrator
     * @description: 分页查询接口配置表
     * @date 2017-05-11 14:04:25
     * @param searchParams
     * @return
     */
    public List<ExtInterfaceInfoDTO> searchExtInterfaceInfoByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author Administrator
     * @description:查询对象接口配置表
     * @date 2017-05-11 14:04:25
     * @param searchParams
     * @return
     */
    public List<ExtInterfaceInfoDTO> searchExtInterfaceInfo(Map<String,Object> searchParams);

    /**
     * @author Administrator
     * @description:查询对象接口配置表
     * @date 2017-05-11 14:04:25
     * @param id
     * @return
     */
    public ExtInterfaceInfoDTO findExtInterfaceInfoByPrimaryKey(String id);
    
    
    
	/**
	* @title: findExtInterfaceInfoByPrimaryKeyForUpdate
	* @author:陈东栋
	* @description: 为了更新templatecontent字段，需要锁定该行数据,慎用
	* @date 2017年5月24日 上午9:29:18
	* @param id
	* @return
	* @throws 
	*/ 
    public ExtInterfaceInfoDTO findExtInterfaceInfoByPrimaryKeyForUpdate(String id);

    /**
     * @methodName: findExtInterfaceInfoByInterfaceNoForUpdate
     * @param: [id]
     * @describe: 查找数据
     * @auther: huangxianchao
     * @date: 2018/4/14
     * @time: 10:46
     **/
	public ExtInterfaceInfoDTO findExtInterfaceInfoByInterfaceNoForUpdate(String interfaceNo);
    
    /**
     * @author Administrator
     * @description: 新增对象接口配置表
     * @date 2017-05-11 14:04:25
     * @param paramMap
     * @return
     */
    public int insertExtInterfaceInfo(Map<String, Object> paramMap);
    
    /**
     * @author Administrator
     * @description: 更新对象接口配置表
     * @date 2017-05-11 14:04:25
     * @param paramMap
     */
    public void updateExtInterfaceInfo(Map<String, Object> paramMap);
     
    /**
     * @author Administrator
     * @description: 按主键删除接口配置表（真删除）
     * @date 2017-05-11 14:04:25
     * @param ids
     * @return
     */ 
    public void deleteExtInterfaceInfoByID(Map<String, Object> paramMap);

	
	/**
	* @title: queryExtInferfaceTemplateContent
	* @author:陈东栋
	* @description: 按接口编码查询（请求报文）模板内容
	* @date 2017年5月25日 下午4:41:56
	* @param interfaceNo
	* @return
	* @throws 
	*/ 
	public ExtInterfaceInfoDTO queryExtInferfaceTemplateContent(String interfaceNo);

	/**
	 * 清空模板数据
	 * @param paramMap
	 */
    public void updateTemplateContent(Map<String, Object> paramMap);

}
