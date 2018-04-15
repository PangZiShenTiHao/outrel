package com.jy.modules.externalplatform.application.extinvokefilterrulemap.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jy.modules.externalplatform.application.extinvokefilterrule.enumdef.RuleMapEnum;
import com.jy.modules.externalplatform.application.extinvokefilterrulemap.dao.ExtInvokeFilterRuleMapDao;
import com.jy.modules.externalplatform.application.extinvokefilterrulemap.dto.ExtInvokeFilterRuleMapDTO;

/**
 * @classname: ExtInvokeFilterRuleMapService
 * @description: 定义  外联调用挡板规则-映射表 实现类
 * @author:  dell
 */
@Service("com.jy.modules.externalplatform.application.extinvokefilterrulemap.service.ExtInvokeFilterRuleMapService")
public class ExtInvokeFilterRuleMapService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ExtInvokeFilterRuleMapDao dao;

	/**
     * @author dell
     * @description: 按条件查询外联调用挡板规则-映射表列表
     * @date 2017-04-26 09:11:08
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtInvokeFilterRuleMapDTO> searchExtInvokeFilterRuleMap(Map<String,Object> searchParams) throws Exception {
	    List<ExtInvokeFilterRuleMapDTO> dataList = dao.searchExtInvokeFilterRuleMap(searchParams);
        return dataList;
    }

	/**
     * @title: insertExtInvokeFilterRuleMap
     * @author dell
     * @description: 新增 外联调用挡板规则-映射表对象
     * @date 2017-04-26 09:11:08
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtInvokeFilterRuleMap(ExtInvokeFilterRuleMapDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		int count = dao.insertExtInvokeFilterRuleMap(paramMap);
		
		ExtInvokeFilterRuleMapDTO resultDto = (ExtInvokeFilterRuleMapDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	
	/**
	* @title: batchInsertRuleMap
	* @author:陈东栋
	* @description: 批量保存数据
	* @date 2017年4月26日 下午1:59:20
	* @param ruleId
	* @param mapType
	* @param mapCodeList
	* @throws Exception
	* @throws 
	*/ 
    public void batchInsertRuleMap(Long ruleId, String mapType, List<String> mapCodeList) throws Exception {
    	Map<String, Object> paramMap = new HashMap<String, Object>();
    	/*paramMap.put("ruleId", ruleId);
    	paramMap.put("mapType", mapType);
    	paramMap.put("list", mapCodeList);
    	//dao.batchInsertRuleMap(paramMap);
		for (int i = 0; i < mapCodeList.size(); i++) {
			dao.insertExtInvokeFilterRuleMap(paramMap);
		}*/

		//
        ExtInvokeFilterRuleMapDTO dto = new ExtInvokeFilterRuleMapDTO();
		dto.setRuleId(ruleId);
		dto.setMapType(mapType);
        for (int i = 0; i < mapCodeList.size(); i++) {
            dto.setMapCode(mapCodeList.get(i));
            paramMap.put("dto",dto);
            dao.insertExtInvokeFilterRuleMap(paramMap);
        }

	}
    
	
	/**
	* @title: queryOrgListByRuleId
	* @author:陈东栋
	* @description: 查询 外联调用挡板规则-使用产品映射表,按规则ID
	* @date 2017年4月27日 下午4:14:34
	* @param ruleId
	* @return
	* @throws 
	*/ 
	public List<ExtInvokeFilterRuleMapDTO> queryOrgListByRuleId(Long ruleId) {
		Map<String,Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("ruleId", ruleId);
    	searchParams.put("mapType", RuleMapEnum.MAP_TYPE_ORG.getValue());
    	return dao.queryOrgListByRuleId(searchParams);
	}
	
	/**
	* @title: queryFuncListByRuleId
	* @author:陈东栋
	* @description: 查询 外联调用挡板规则-使用功能映射表,按规则ID
	* @date 2017年4月27日 下午4:59:47
	* @param ruleId
	* @return
	* @throws 
	*/ 
	public List<ExtInvokeFilterRuleMapDTO> queryFuncListByRuleId(Long ruleId) {
		Map<String,Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("ruleId", ruleId);
    	searchParams.put("mapType", RuleMapEnum.MAP_TYPE_FUNC.getValue());
    	return dao.queryFuncListByRuleId(searchParams);
	}
	
	/**
	* @title: deleteExtInvokeFilterRuleMapByRuleId
	* @author:陈东栋
	* @description: 删除 外联调用挡板规则-映射表,按规则ID
	* @date 2017年4月27日 下午6:08:39
	* @param ruleId
	* @throws 
	*/ 
	public void deleteExtInvokeFilterRuleMapByRuleId(String ruleId ,String mapType) {
		Map<String,Object> paramMap = new HashMap<String, Object>();
    	paramMap.put("ruleId", ruleId);
    	paramMap.put("mapType", mapType);
    	dao.deleteExtInvokeFilterRuleMapByRuleId(paramMap);
	}
	
	/**
	* @title: deleteExtInvokeFilterRuleMapByRuleId
	* @author:陈东栋
	* @description: 按主键删除外联调用挡板规则-映射表
	* @date 2017年4月27日 下午6:08:39
	* @param
	* @throws 
	*/ 
	public void deleteExtInvokeFilterRuleMapByID(String ids) {
		Map<String,Object> paramMap = new HashMap<String, Object>();
    	paramMap.put("ids", ids);
    	dao.deleteExtInvokeFilterRuleMapByID(paramMap);
	}
}
