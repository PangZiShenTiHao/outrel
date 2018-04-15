package com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.dto.LbtIntoFilterRuleMapDTO;
/**
 * @classname: LbtIntoFilterRuleMapDao
 * @description: 定义  进件筛选规则-映射表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  JY-IT-D001
 */
@MyBatisRepository
public interface LbtIntoFilterRuleMapDao {
    
    /**
     * @author JY-IT-D001
     * @description: 分页查询进件筛选规则-映射表
     * @date 2016-01-07 11:21:19
     * @param searchParams
     * @return
     */
    public List<LbtIntoFilterRuleMapDTO> searchLbtIntoFilterRuleMapByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author JY-IT-D001
     * @description:查询对象进件筛选规则-映射表
     * @date 2016-01-07 11:21:19
     * @param searchParams
     * @return
     */
    public List<LbtIntoFilterRuleMapDTO> searchLbtIntoFilterRuleMap(Map<String,Object> searchParams);

    /**
     * @author JY-IT-D001
     * @description:查询对象进件筛选规则-映射表
     * @date 2016-01-07 11:21:19
     * @param id
     * @return
     */
    public LbtIntoFilterRuleMapDTO findLbtIntoFilterRuleMapByPrimaryKey(String id);
    
    /**
     * @author JY-IT-D001
     * @description: 新增对象进件筛选规则-映射表
     * @date 2016-01-07 11:21:19
     * @param paramMap
     * @return
     */
    public int insertLbtIntoFilterRuleMap(Map<String, Object> paramMap);
    
    /**
     * @author JY-IT-D001
     * @description: 更新对象进件筛选规则-映射表
     * @date 2016-01-07 11:21:19
     * @param paramMap
     */
    public void updateLbtIntoFilterRuleMap(Map<String, Object> paramMap);
     
    /**
     * @author JY-IT-D001
     * @description: 按主键删除进件筛选规则-映射表
     * @date 2016-01-07 11:21:19
     * @param ids
     * @return
     */ 
    public void deleteLbtIntoFilterRuleMapByPrimaryKey(Map<String, Object> paramMap);
    
    /**
     * @author xujunqi
     * @description: 批量保存数据
     * @date 2016年1月12日 下午5:01:37
     * @param paramMap
     * @return
     */
    public void batchInsertRuleMap(Map<String, Object> paramMap);
    
    /**
     * @author xujunqi
     * @description: 获取指定规则的机构信息
     * @date 2016年1月12日 下午8:31:54
     * @param searchParams
     * @return
     */
    public List<LbtIntoFilterRuleMapDTO> queryOrgListByRuleId(Map<String,Object> searchParams);
    
    /**
     * @author xujunqi
     * @description: 根据规则ID删除映射信息
     * @date 2016年1月13日 上午10:15:30
     * @param paramMap
     */
    public void deleteLbtIntoFilterRuleMapByRuleId(Map<String, Object> paramMap);

    /**
     * @author xujunqi
     * @description: 获取指定规则的单位地址信息
     * @date 2016年5月30日 下午6:22:45
     * @param searchParams
     * @return
     */
	public List<LbtIntoFilterRuleMapDTO> queryJobAddrListByRuleId(Map<String, Object> searchParams);
}
