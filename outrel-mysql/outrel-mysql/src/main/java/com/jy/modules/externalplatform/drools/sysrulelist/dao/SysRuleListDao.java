package com.jy.modules.externalplatform.drools.sysrulelist.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.drools.sysrulelist.dto.SysRuleListDTO;
/**
 * @classname: SysRuleListDao
 * @description: 定义  规则集 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  dell
 */
@MyBatisRepository
public interface SysRuleListDao {

	  public abstract List<SysRuleListDTO> searchSysRuleList(Map<String, Object> searchParams);
	  
	  public abstract List<SysRuleListDTO> searchChildRuleListByRuleCode(String paramString1, String paramString2);
	  
	  public abstract SysRuleListDTO findSysRuleListByPrimaryKey(String paramString);
	  
	  public abstract SysRuleListDTO findSysRuleListByCode(String paramString);
	  
	  public abstract int insertSysRuleList(Map<String, Object> paramMap);
	  
	  public abstract void updateSysRuleList(Map<String, Object> paramMap);
	  
	  public abstract void deleteSysRuleListByID(Map<String, Object> paramMap);
	  
	  public abstract String queryMaxCodeByParentCode(Map<String, Object> paramMap);
	  
	  public abstract void updateSysRuleListByCode(Map<String, Object> paramMap);

	  public abstract List<SysRuleListDTO> querySysRuleListByPaging(Map<String, Object> searchParams);
	  
	  public abstract List<SysRuleListDTO> querySysRuleGroupList(Map<String, Object> searchParams);

}
