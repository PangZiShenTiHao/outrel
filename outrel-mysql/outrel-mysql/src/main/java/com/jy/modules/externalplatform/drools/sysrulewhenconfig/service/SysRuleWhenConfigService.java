package com.jy.modules.externalplatform.drools.sysrulewhenconfig.service;
 
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jy.modules.externalplatform.drools.sysrulelist.dto.SysRuleListDTO;
import com.jy.modules.externalplatform.drools.sysrulelist.enumdef.RuleTypeEnum;
import com.jy.modules.externalplatform.drools.sysrulelist.service.SysRuleListService;
import com.jy.modules.externalplatform.drools.sysrulethenconfig.service.SysRuleThenConfigService;
import com.jy.modules.externalplatform.drools.sysrulewhenconfig.dao.SysRuleWhenConfigDao;
import com.jy.modules.externalplatform.drools.sysrulewhenconfig.dto.SysRuleWhenConfigDTO;
import com.jy.modules.externalplatform.drools.util.ModelUtil;
 
 
 @Service("com.jy.modules.externalplatform.drools.sysrulewhenconfig.service.SysRuleWhenConfigService")
 public class SysRuleWhenConfigService
   implements Serializable
 {
   private static final long serialVersionUID = 1L;
   @Autowired
   private SysRuleWhenConfigDao dao;
   @Autowired
   private SysRuleListService rService;
   @Autowired
   private SysRuleThenConfigService tService;
   
   public SysRuleWhenConfigService() {}
   
   public List<SysRuleWhenConfigDTO> searchSysRuleWhenConfig(Map<String, Object> searchParams)
   {
     List<SysRuleWhenConfigDTO> dataList = this.dao.searchSysRuleWhenConfig(searchParams);
     
     return dataList;
   }
   
 
   public SysRuleWhenConfigDTO querySysRuleWhenConfigByPrimaryKey(String id)
     throws Exception
   {
     SysRuleWhenConfigDTO dto = this.dao.findSysRuleWhenConfigByPrimaryKey(id);
     if (dto == null)
       dto = new SysRuleWhenConfigDTO();
     return dto;
   }
   
 
   public void saveOrUpdateWhenConfigs(SysRuleListDTO dto, String ruleConfType)
   {
     this.dao.deleteSysRuleWhenConfigByListKey(dto.getRuleCode());
     List<SysRuleWhenConfigDTO> whenList = dto.getWhenConfigs();
     if ((whenList != null) && (whenList.size() > 0)) {
       int i = 1;
       for (SysRuleWhenConfigDTO wDto : whenList) {
         String conditionAttrCh = wDto.getConditionAttrCh();
         if (conditionAttrCh.indexOf(".") < 0) {
           wDto.setConditionAttrEn(conditionAttrCh.trim());
         }
         wDto.setRuleConfType(ruleConfType);
         wDto.setManualRule("");
         wDto.setRuleCode(dto.getRuleCode() + "00" + i);
		 wDto.setCompilationResult(compilationResult(wDto, ruleConfType));
       }
       //批量插入规则条件设置
       this.insertSysRuleWhenConfigBith(whenList,String.valueOf(dto.getOpUserId()));
       if ((dto.getThenConfig() != null) && (dto.getThenConfig().getExcutionCode() != null)){
           this.tService.insertSysRuleThenConfig(dto.getThenConfig());
           this.rService.updateSysRuleListByCode(dto.getRuleCode());
        }
      }
   }
   
 
 
 
   public void deleteWhenConfigByRuleCode(String rCode)
   {
     this.dao.deleteSysRuleWhenConfigByListKey(rCode);
   }
   
   
	/**
	 * 批量插入规则条件设置
	 * @param whenList
	 * @param optUser 操作用户
	 */
	public void insertSysRuleWhenConfigBith(List<SysRuleWhenConfigDTO> whenList, String optUser) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("optUser", optUser);
		paramMap.put("dtoList", whenList);
		dao.insertSysRuleWhenConfigBith(paramMap);
	}
 
 
 
 
   
/**
* @title: compilationResult
* @author:陈东栋
* @description: 重组执行规则条件
* @date 2017年7月22日 下午4:22:07
* @param dto
* @param ruleConfType
* @return
* @throws 
*/ 
private String compilationResult(SysRuleWhenConfigDTO dto, String ruleConfType)
   {
     StringBuffer sb = new StringBuffer("");
        //若手动输入规则，则以输入为准；反之，进行执行规则重新组合。
		if ((dto.getManualRule() != null) && (dto.getManualRule().trim().length() > 0)) {
			sb.append(dto.getPreBrackets());
		} else {
			if (StringUtils.isNotEmpty(dto.getConditionAttrEn())) {
				String getMothod = ModelUtil.converterToModelAttr(dto.getConditionAttrEn());
				if (getMothod != null) {
					sb.append(getMothod);
				} else {
					sb.append(dto.getConditionAttrEn());
				}
			} else if (RuleTypeEnum.FILED_COMPARE.getKey().equals(ruleConfType)&&(dto.getPreBrackets() != null) && (dto.getPreBrackets().trim().length() > 0)) {
				sb.append(dto.getPreBrackets());
			}
			//算术运算符
			String arithmeticOperator = dto.getArithmeticOperator();
			if(RuleTypeEnum.FILED_OPERATOR.getKey().equals(ruleConfType) && StringUtils.isNotEmpty(arithmeticOperator)){
			    sb.append(" ").append(arithmeticOperator).append(" ");
			    if (StringUtils.isNotEmpty(dto.getCompareValueEn())) {
					sb.append(dto.getCompareValueEn());
				} else if ((dto.getPreBrackets() != null) && (dto.getPreBrackets().trim().length() > 0)) {
					sb.append(dto.getPreBrackets());
				}
			}
			if (StringUtils.isNotEmpty(dto.getOperator())) {
				sb.append(" ").append(dto.getOperator()).append(" ");
			}
			if (RuleTypeEnum.FILED_COMPARE.getKey().equals(ruleConfType) && StringUtils.isNotEmpty(dto.getCompareValueEn())) {
				sb.append(dto.getCompareValueEn());
			} else if ((dto.getAfterBrackets() != null) && (dto.getAfterBrackets().trim().length() > 0)) {
				sb.append(dto.getAfterBrackets());
			}
			if ((dto.getLogicalOperator() != null) && (dto.getLogicalOperator().trim().length() > 0)) {
				sb.append(" ");
				sb.append(dto.getLogicalOperator());
				sb.append(" ");
			}
		}
     return sb.toString();
   }
 }