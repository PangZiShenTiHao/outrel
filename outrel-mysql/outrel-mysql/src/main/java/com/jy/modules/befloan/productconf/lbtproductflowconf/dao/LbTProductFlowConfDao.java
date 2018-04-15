package com.jy.modules.befloan.productconf.lbtproductflowconf.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.befloan.productconf.lbtproductflowconf.dto.LbTProductFlowConfDTO;
/**
 * @classname: LbTProductFlowConfDao
 * @description: 定义  产品流程配置表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  JY-IT-D001
 */
@MyBatisRepository
public interface LbTProductFlowConfDao {
    
    /**
     * @author JY-IT-D001
     * @description: 分页查询产品流程配置表
     * @date 2014-12-23 10:19:23
     * @param searchParams
     * @return
     */
    public List<LbTProductFlowConfDTO> searchLbTProductFlowConfByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author JY-IT-D001
     * @description:查询对象产品流程配置表
     * @date 2014-12-23 10:19:23
     * @param searchParams
     * @return
     */
    public List<LbTProductFlowConfDTO> searchLbTProductFlowConf(Map<String,Object> searchParams);

    /**
     * @author JY-IT-D001
     * @description:查询对象产品流程配置表
     * @date 2014-12-23 10:19:23
     * @param id
     * @return
     */
    public LbTProductFlowConfDTO findLbTProductFlowConfByPrimaryKey(String id);
    
    /**
     * @author 豆永亮
     * @description:查询对象根据产品编号
     * @date 2014-12-24
     * @param fkProConfId 产品编号
     * @return
     */
    public LbTProductFlowConfDTO findLbTProductFlowConfByFkProConfId(String fkProConfId);
    
    /**
     * @author JY-IT-D001
     * @description: 新增对象产品流程配置表
     * @date 2014-12-23 10:19:23
     * @param paramMap
     * @return
     */
    public int insertLbTProductFlowConf(Map<String, Object> paramMap);
    
    /**
     * @author JY-IT-D001
     * @description: 更新对象产品流程配置表
     * @date 2014-12-23 10:19:23
     * @param paramMap
     */
    public void updateLbTProductFlowConf(Map<String, Object> paramMap);
     
    /**
     * @author JY-IT-D001
     * @description: 按主键删除产品流程配置表
     * @date 2014-12-23 10:19:23
     * @param ids
     * @return
     */ 
    public void deleteLbTProductFlowConfByPrimaryKey(Map<String, Object> paramMap);
    
    /**
     * @author xujunqi
     * @description: 物理删除产品流程配置表指定数据
     * @date 2015年2月10日 下午6:00:32
     * @param paramMap
     */
    public void deleteLbTProductFlowConfByID(Map<String, Object> paramMap);
}
