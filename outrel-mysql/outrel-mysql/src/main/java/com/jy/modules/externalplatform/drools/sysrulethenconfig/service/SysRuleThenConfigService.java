package com.jy.modules.externalplatform.drools.sysrulethenconfig.service;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jy.modules.externalplatform.drools.sysrulewhenconfig.dto.SysRuleWhenConfigDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.drools.sysrulelist.service.SysRuleListService;
import com.jy.modules.externalplatform.drools.sysrulethenconfig.dao.SysRuleThenConfigDao;
import com.jy.modules.externalplatform.drools.sysrulethenconfig.dto.SysRuleThenConfigDTO;

@Service("com.jy.modules.externalplatform.drools.sysrulethenconfig.service.SysRuleThenConfigService")
public class SysRuleThenConfigService implements Serializable {
	private static final long serialVersionUID = 1L;
	@Autowired
	private SysRuleThenConfigDao dao;
	@Autowired
	private SysRuleListService rService;

	public SysRuleThenConfigService() {
	}
	public List<SysRuleWhenConfigDTO> searchSysRuleWhenConfig(Map<String, Object> searchParams)
	{
		List<SysRuleWhenConfigDTO> dataList = this.dao.searchSysRuleWhenConfig(searchParams);

		return dataList;
	}

	public List<SysRuleThenConfigDTO> searchSysRuleThenConfigByPaging(Map<String, Object> searchParams) {
		List<SysRuleThenConfigDTO> dataList = this.dao
				.searchSysRuleThenConfigByPaging(searchParams);
		return dataList;
	}

	public List<SysRuleThenConfigDTO> searchSysRuleThenConfig(Map<String, Object> searchParams) {
		List<SysRuleThenConfigDTO> dataList = this.dao.searchSysRuleThenConfig(searchParams);
		return dataList;
	}

	public SysRuleThenConfigDTO querySysRuleThenConfigByPrimaryKey(String id)throws Exception {
		SysRuleThenConfigDTO dto = this.dao.findSysRuleThenConfigByPrimaryKey(id);
		if (dto == null) {
			dto = new SysRuleThenConfigDTO();
		}
		return dto;
	}

	public Long insertSysRuleThenConfig(SysRuleThenConfigDTO dto) {
		if (dto.getId() == null) {
			Map<String, Object> paramMap = new HashMap<String, Object>();
			dto.setHelp("11111111111");
			dto.setCreateUser(String.valueOf(dto.getOpUserId()));
			paramMap.put("dto", dto);
			this.dao.insertSysRuleThenConfig(paramMap);
			this.rService.updateSysRuleListByCode(dto.getRuleCode());
			dto = (SysRuleThenConfigDTO) paramMap.get("dto");
		} else {
			updateSysRuleThenConfig(dto);
		}
		return dto.getId();
	}

	public void updateSysRuleThenConfig(SysRuleThenConfigDTO dto) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setUpdateUser(String.valueOf(dto.getOpUserId()));
		paramMap.put("dto", dto);
		this.dao.updateSysRuleThenConfig(paramMap);
	}

	public void deleteSysRuleThenConfigByPrimaryKey(BaseDTO baseDto, String ids)
			throws Exception {
		if (StringUtils.isEmpty(ids)) {
			throw new Exception("删除失败！传入的参数主键为null");
		}
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		this.dao.deleteSysRuleThenConfigByPrimaryKey(paramMap);
	}

	public SysRuleThenConfigDTO findSysRuleThenConfigDTOByCode(String code) {
		return this.dao.findSysRuleThenConfigDTOByCode(code);
	}
}