package com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.dao.LbtIntoFilterRuleMapDao;
import com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.dto.LbtIntoFilterRuleMapDTO;

/**
 * @classname: LbtIntoFilterRuleMapService
 * @description: 定义  进件筛选规则-映射表 实现类
 * @author:  JY-IT-D001
 */
@Service("com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.service.LbtIntoFilterRuleMapService")
public class LbtIntoFilterRuleMapService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private LbtIntoFilterRuleMapDao dao;

	/**
     * @author JY-IT-D001
     * @description: 分页查询 进件筛选规则-映射表列表
     * @date 2016-01-07 11:21:19
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<LbtIntoFilterRuleMapDTO> searchLbtIntoFilterRuleMapByPaging(Map<String,Object> searchParams) throws Exception {
		List<LbtIntoFilterRuleMapDTO> dataList =  dao.searchLbtIntoFilterRuleMapByPaging(searchParams);
		return dataList;
	}
	/**
     * @author JY-IT-D001
     * @description: 按条件查询进件筛选规则-映射表列表
     * @date 2016-01-07 11:21:19
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<LbtIntoFilterRuleMapDTO> searchLbtIntoFilterRuleMap(Map<String,Object> searchParams) throws Exception {
	    List<LbtIntoFilterRuleMapDTO> dataList = dao.searchLbtIntoFilterRuleMap(searchParams);
        return dataList;
    }
	/**
     * @author JY-IT-D001
     * @description: 查询进件筛选规则-映射表对象
     * @date 2016-01-07 11:21:19
     * @param id
     * @return
     * @throws
     */ 
	public LbtIntoFilterRuleMapDTO queryLbtIntoFilterRuleMapByPrimaryKey(String id) throws Exception {
		
		LbtIntoFilterRuleMapDTO dto = dao.findLbtIntoFilterRuleMapByPrimaryKey(id);
		
		if(dto == null) dto = new LbtIntoFilterRuleMapDTO();
		
		return dto;
		
	}

	/**
     * @title: insertLbtIntoFilterRuleMap
     * @author JY-IT-D001
     * @description: 新增 进件筛选规则-映射表对象
     * @date 2016-01-07 11:21:19
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertLbtIntoFilterRuleMap(LbtIntoFilterRuleMapDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		int count = dao.insertLbtIntoFilterRuleMap(paramMap);
		
		LbtIntoFilterRuleMapDTO resultDto = (LbtIntoFilterRuleMapDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateLbtIntoFilterRuleMap
     * @author JY-IT-D001
     * @description: 修改 进件筛选规则-映射表对象
     * @date 2016-01-07 11:21:19
     * @param paramMap
     * @return
     * @throws
     */
	public void updateLbtIntoFilterRuleMap(LbtIntoFilterRuleMapDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		dao.updateLbtIntoFilterRuleMap(paramMap);
	}
	/**
     * @title: deleteLbtIntoFilterRuleMapByPrimaryKey
     * @author JY-IT-D001
     * @description: 删除 进件筛选规则-映射表,按主键
     * @date 2016-01-07 11:21:19
     * @param paramMap
     * @throws
     */ 
	public void deleteLbtIntoFilterRuleMapByPrimaryKey(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteLbtIntoFilterRuleMapByPrimaryKey(paramMap);
	}
    
    /**
     * @author xujunqi
     * @description: 批量保存数据
     * @date 2016年1月12日 下午5:01:37
     * @param paramMap
     * @return
     */
    public void batchInsertRuleMap(Long ruleId, String mapType, List<String> mapCodeList) throws Exception {
    	Map<String, Object> paramMap = new HashMap<String, Object>();
    	paramMap.put("ruleId", ruleId);
    	paramMap.put("mapType", mapType);
    	paramMap.put("list", mapCodeList);
    	dao.batchInsertRuleMap(paramMap);
    }
    
    /**
     * @author xujunqi
     * @description: 获取指定规则的机构信息
     * @date 2016年1月12日 下午8:31:54
     * @param searchParams
     * @return
     */
    public List<LbtIntoFilterRuleMapDTO> queryOrgListByRuleId(Long ruleId) throws Exception {
    	Map<String,Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("ruleId", ruleId);
    	
    	return dao.queryOrgListByRuleId(searchParams);
    }
    
    /**
     * @author xujunqi
     * @description: 根据规则ID删除映射信息
     * @date 2016年1月13日 上午10:15:30
     * @param paramMap
     */
    public void deleteLbtIntoFilterRuleMapByRuleId(Long ruleId) throws Exception {
    	Map<String,Object> paramMap = new HashMap<String, Object>();
    	paramMap.put("ruleId", ruleId);
    	
    	dao.deleteLbtIntoFilterRuleMapByRuleId(paramMap);
    }
    
    /**
     * @author xujunqi
     * @description: 获取指定规则的单位地址信息
     * @date 2016年5月30日 下午6:21:57
     * @param ruleId
     * @return
     */
	public List<LbtIntoFilterRuleMapDTO> queryJobAddrListByRuleId(Long ruleId) {
		Map<String,Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("ruleId", ruleId);
    	
    	return dao.queryJobAddrListByRuleId(searchParams);
	}

}

