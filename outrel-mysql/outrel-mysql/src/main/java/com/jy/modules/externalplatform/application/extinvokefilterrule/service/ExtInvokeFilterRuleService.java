package com.jy.modules.externalplatform.application.extinvokefilterrule.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.application.extinvokefilterrule.dao.ExtInvokeFilterRuleDao;
import com.jy.modules.externalplatform.application.extinvokefilterrule.dto.ExtInvokeFilterRuleDTO;
import com.jy.modules.externalplatform.application.extinvokefilterrule.enumdef.RuleMapEnum;
import com.jy.modules.externalplatform.application.extinvokefilterrulemap.service.ExtInvokeFilterRuleMapService;

/**
 * @classname: ExtInvokeFilterRuleService
 * @description: 定义  外联调用挡板规则表 实现类
 * @author:  dell
 */
@Service("com.jy.modules.externalplatform.application.extinvokefilterrule.service.ExtInvokeFilterRuleService")
public class ExtInvokeFilterRuleService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ExtInvokeFilterRuleDao dao;
	
    @Autowired
    private ExtInvokeFilterRuleMapService ruleMapService;

	/**
     * @author dell
     * @description: 分页查询 外联调用挡板规则表列表
     * @date 2017-04-26 09:10:36
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<ExtInvokeFilterRuleDTO> searchExtInvokeFilterRuleByPaging(Map<String,Object> searchParams) throws Exception {
		List<ExtInvokeFilterRuleDTO> dataList =  dao.searchExtInvokeFilterRuleByPaging(searchParams);
		return dataList;
	}
	/**
     * @author dell
     * @description: 按条件查询外联调用挡板规则表列表
     * @date 2017-04-26 09:10:36
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtInvokeFilterRuleDTO> searchExtInvokeFilterRule(Map<String,Object> searchParams) throws Exception {
	    List<ExtInvokeFilterRuleDTO> dataList = dao.searchExtInvokeFilterRule(searchParams);
        return dataList;
    }
	/**
     * @author dell
     * @description: 查询外联调用挡板规则表对象
     * @date 2017-04-26 09:10:36
     * @param id
     * @return
     * @throws
     */ 
	public ExtInvokeFilterRuleDTO queryExtInvokeFilterRuleByPrimaryKey(String id) throws Exception {
		
		ExtInvokeFilterRuleDTO dto = dao.findExtInvokeFilterRuleByPrimaryKey(id);
		
		if(dto == null) dto = new ExtInvokeFilterRuleDTO();
		
		return dto;
		
	}

	/**
     * @title: insertExtInvokeFilterRule
     * @author dell
     * @description: 新增 外联调用挡板规则表对象
     * @date 2017-04-26 09:10:36
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtInvokeFilterRule(ExtInvokeFilterRuleDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setCreateBy(dto.getOpUserId());
		paramMap.put("dto", dto);
		int count = dao.insertExtInvokeFilterRule(paramMap);
		ExtInvokeFilterRuleDTO resultDto = (ExtInvokeFilterRuleDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateExtInvokeFilterRule
     * @author dell
     * @description: 修改 外联调用挡板规则表对象
     * @date 2017-04-26 09:10:36
     * @param paramMap
     * @return
     * @throws
     */
	public void updateExtInvokeFilterRule(ExtInvokeFilterRuleDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setModifyBy(dto.getOpUserId());
		paramMap.put("dto", dto);
		dao.updateExtInvokeFilterRule(paramMap);
	}
	
	
	/**
	* @title: saveOrUpdateExtInvokeFilterRule
	* @author:陈东栋
	* @description: 新增或修改 外联调用挡板规则主信息（保存映射配置信息）
	* @date 2017年4月28日 下午2:37:59
	* @param dto
	* @param map
	* @param ruleMapType
	* @throws Exception
	* @throws 
	*/ 
	public void  saveOrUpdateExtInvokeFilterRule(ExtInvokeFilterRuleDTO dto,Map<String, List<String>> map , String ruleMapType) throws Exception{
		Long ruleId = dto.getId();
		String isStoreLimit = dto.getIsStoreLimit();
		if(ruleId==null){
	    	//新增 外联调用挡板规则主信息
		    ruleId = this.insertExtInvokeFilterRule(dto);
	    }else{
	    	//修改 外联调用挡板规则主信息
	    	this.updateExtInvokeFilterRule(dto);
	    	if("0".equals(isStoreLimit)){//是否启用门店限制为否时，删除使用门店信息
	    		ruleMapService.deleteExtInvokeFilterRuleMapByRuleId(String.valueOf(ruleId), RuleMapEnum.MAP_TYPE_ORG.getValue());
	    	}
	    	//删除映射配置信息
			ruleMapService.deleteExtInvokeFilterRuleMapByRuleId(String.valueOf(ruleId), ruleMapType);
	    }
	    if (!map.isEmpty()) {
			for(Iterator<String> iter = map.keySet().iterator();iter.hasNext();){
				String key = iter.next();
				String mapType = RuleMapEnum.getValueByKey(key);
				List<String> mapCodeList = map.get(key);
				//保存映射配置信息
				ruleMapService.batchInsertRuleMap(ruleId, mapType,mapCodeList);
			}
		}
	}
	
	
	/**
     * @title: deleteExtInvokeFilterRuleByPrimaryKey
     * @author dell
     * @description: 删除 外联调用挡板规则表,按主键
     * @date 2017-04-26 09:10:36
     * @param paramMap
     * @throws
     */ 
	public void deleteExtInvokeFilterRuleByPrimaryKey(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtInvokeFilterRuleByID(paramMap);
	}	
}

