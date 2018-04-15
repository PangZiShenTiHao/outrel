package com.jy.modules.externalplatform.application.extinvokefilterrule.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.extinvokefilterrule.dto.ExtInvokeFilterRuleDTO;
/**
 * @classname: ExtInvokeFilterRuleDao
 * @description: 定义  外联调用挡板规则表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  dell
 */
@MyBatisRepository
public interface ExtInvokeFilterRuleDao {
    
    /**
     * @author dell
     * @description: 分页查询外联调用挡板规则表
     * @date 2017-04-26 09:10:36
     * @param searchParams
     * @return
     */
    public List<ExtInvokeFilterRuleDTO> searchExtInvokeFilterRuleByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author dell
     * @description:查询对象外联调用挡板规则表
     * @date 2017-04-26 09:10:36
     * @param searchParams
     * @return
     */
    public List<ExtInvokeFilterRuleDTO> searchExtInvokeFilterRule(Map<String,Object> searchParams);

    /**
     * @author dell
     * @description:查询对象外联调用挡板规则表
     * @date 2017-04-26 09:10:36
     * @param id
     * @return
     */
    public ExtInvokeFilterRuleDTO findExtInvokeFilterRuleByPrimaryKey(String id);
    
    /**
     * @author dell
     * @description: 新增对象外联调用挡板规则表
     * @date 2017-04-26 09:10:36
     * @param paramMap
     * @return
     */
    public int insertExtInvokeFilterRule(Map<String, Object> paramMap);
    
    /**
     * @author dell
     * @description: 更新对象外联调用挡板规则表
     * @date 2017-04-26 09:10:36
     * @param paramMap
     */
    public void updateExtInvokeFilterRule(Map<String, Object> paramMap);
     
    /**
     * @author dell
     * @description: 按主键删除外联调用挡板规则表
     * @date 2017-04-26 09:10:36
     * @param ids
     * @return
     */ 
    public void deleteExtInvokeFilterRuleByID(Map<String, Object> paramMap);
    
    
}
