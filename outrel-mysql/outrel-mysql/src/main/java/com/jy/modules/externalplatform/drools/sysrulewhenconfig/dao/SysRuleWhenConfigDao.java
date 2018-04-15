package com.jy.modules.externalplatform.drools.sysrulewhenconfig.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.drools.sysrulewhenconfig.dto.SysRuleWhenConfigDTO;

@MyBatisRepository
public abstract interface SysRuleWhenConfigDao
{
  public abstract List<SysRuleWhenConfigDTO> searchSysRuleWhenConfig(Map<String, Object> paramMap);
  
  public abstract SysRuleWhenConfigDTO findSysRuleWhenConfigByPrimaryKey(String paramString);
  
  public abstract void deleteSysRuleWhenConfigByListKey(String paramString);
  
  public abstract void insertSysRuleWhenConfigBith(Map<String, Object> paramMap);
}
