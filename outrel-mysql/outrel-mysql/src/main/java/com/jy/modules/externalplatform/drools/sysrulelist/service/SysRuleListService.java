package com.jy.modules.externalplatform.drools.sysrulelist.service;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.api.org.SessionAPI;
import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.drools.sysrulelist.dao.SysRuleListDao;
import com.jy.modules.externalplatform.drools.sysrulelist.dto.SysRuleListDTO;
import com.jy.modules.externalplatform.drools.sysrulelist.enumdef.RuleTypeEnum;
import com.jy.modules.externalplatform.drools.sysrulethenconfig.dao.SysRuleThenConfigDao;
import com.jy.modules.externalplatform.drools.sysrulethenconfig.dto.SysRuleThenConfigDTO;
import com.jy.modules.externalplatform.drools.sysrulewhenconfig.dao.SysRuleWhenConfigDao;
import com.jy.modules.externalplatform.drools.sysrulewhenconfig.dto.SysRuleWhenConfigDTO;
import com.jy.modules.externalplatform.drools.sysrulewhenconfig.service.SysRuleWhenConfigService;
import com.jy.modules.externalplatform.drools.util.DroolsUtil;
import com.jy.modules.externalplatform.drools.util.FreeMarkertUtil;
import com.jy.modules.externalplatform.drools.util.ModelUtil;
import com.jy.modules.externalplatform.drools.util.entity.ModelAttrDeclare;
import com.jy.modules.externalplatform.drools.util.entity.Rule;

/**
 * @classname: SysRuleListService
 * @description: 定义  规则集 实现类
 * @author:  dell
 */
@Service("com.jy.modules.externalplatform.drools.sysrulelist.service.SysRuleListService")
public class SysRuleListService implements Serializable {

	private static final long serialVersionUID = 1L;

	private static SimpleDateFormat df = new SimpleDateFormat("dd-MMM-yyyy",Locale.ENGLISH);
	
	private static final Logger logger = LoggerFactory.getLogger(SysRuleListService.class);
	  
	  @Autowired
	  private SysRuleListDao dao;
	  
	  @Autowired
	  private SysRuleWhenConfigDao whenDao;
	  
	  @Autowired
	  private SysRuleThenConfigDao thenDao;
	  
	  @Autowired
	  private SysRuleWhenConfigService wService;
	  
	  @Autowired
	  private SessionAPI sessionAPI;
	  

	public String queryMaxCodeByParentCode(String pCode) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pCode", pCode);
		if ("0".equals(pCode)) {
			map.put("length", Integer.valueOf(3));
			pCode = "";
		} else {
			map.put("length", Integer.valueOf(pCode.length() + 3));
		}
		String maxCode = this.dao.queryMaxCodeByParentCode(map);
		if (maxCode != null) {
			String temp = Integer.parseInt(maxCode) + 1 + "";
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < maxCode.length() - temp.length(); i++) {
				sb.append("0");
			}
			sb.append(temp);
			return sb.toString();
		}
		return pCode + "001";
	}
			 
			 		 
	public SysRuleListDTO querySysRuleListByPrimaryKey(String id)
			throws Exception {
		SysRuleListDTO dto = this.dao.findSysRuleListByPrimaryKey(id);

		if (dto == null) {
			dto = new SysRuleListDTO();
		}
		return dto;
	}
			   		 
	public SysRuleListDTO querySysRuleListByCode(String code) {
		SysRuleListDTO dto = dao.findSysRuleListByCode(code);
		if (dto == null) {
			dto = new SysRuleListDTO();
		}
		return dto;
	}
			   
	public Long insertSysRuleList(SysRuleListDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		dto.setCreateUser(String.valueOf(dto.getOpUserId()));
		dao.insertSysRuleList(paramMap);
		SysRuleListDTO resultDto = (SysRuleListDTO) paramMap.get("dto");
		return resultDto.getId();
	}
			 
			 
	public void updateSysRuleList(SysRuleListDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		dto.setUpdateUser(String.valueOf(sessionAPI.getCurrentUserInfo().getUserId()));
		this.dao.updateSysRuleList(paramMap);
	}
			   
	  public void updateSysRuleListByCode(String code)
	  {
	    Map<String, Object> param = new HashMap<String, Object>();
	    param.put("code", code);
	    dao.updateSysRuleListByCode(param);
	  }
		 
			 
	 
	   public void deleteSysRuleListByPrimaryKey(BaseDTO baseDto, String code)throws Exception
	  {
	    if (StringUtils.isEmpty(code)) {
	      throw new Exception("删除失败！传入的参数主键为null");
	    }
	    Map<String, Object> paramMap = new HashMap<String, Object>();
	    paramMap.put("dto", baseDto);
	    paramMap.put("code", code);
	    this.dao.deleteSysRuleListByID(paramMap);
	    if (code.length() >= 9) {
	       whenDao.deleteSysRuleWhenConfigByListKey(code);
	       if (code.length() >= 12) {
	         this.thenDao.deleteSysRuleThenConfigByPrimaryKey(paramMap);
	       }
	    }
	  }
			  		   
	 /**
	 *  编译规则
	 *  @param ruleListId 规则集ID
	 *  @throws Exception
	 */
	public void compileRulesToDrl(String ruleListId)throws Exception
	{
		//1.根据主键ID查询规则集对象
	    SysRuleListDTO ruleListDTO = this.dao.findSysRuleListByPrimaryKey(ruleListId);
	    //2.根据规则集编码查询规则列表
	    List<SysRuleListDTO> ruleLists = this.dao.searchChildRuleListByRuleCode(ruleListDTO.getRuleCode() + "%", RuleTypeEnum.RULE.getKey());
	    if(CollectionUtils.isNotEmpty(ruleLists)){
	    	  for (SysRuleListDTO sysRuleListDTO : ruleLists) {
	    		 //3.编译每条规则
	    		 ruleCompile(ruleListDTO,sysRuleListDTO); 
			  }
	     }
	}
	
	 @SuppressWarnings("unchecked")
	 public void ruleCompile(SysRuleListDTO ruleListDTO,SysRuleListDTO sysRuleListDTO) throws Exception{
		   Map<String, Map<String, Object>> packageConfigs = installRulePackages(ruleListDTO.getRuleCode());
		   List<Rule> rules = new ArrayList<Rule>();
		   Set<String> fullModelSet = new HashSet<String>();
		   Rule rule = new Rule();
		   rule.setRuleName(sysRuleListDTO.getEnName());
		   String ruleCode = sysRuleListDTO.getRuleCode();
		   StringBuffer when = new StringBuffer("");
		   //组装drools规则文件when条件
		   Map<String, Object> unionPackageWhen = unionPackageWhen(ruleCode, packageConfigs);
		   Map<String, Object> installRuleWhen = installRuleWhen(ruleCode);
	       Set<String> modelSet = (Set<String>)installRuleWhen.get("model");
	       if (ruleCode.length() > 6) {
		          when.append(unionPackageWhen.get("unionConfigs"));
		          if (when.toString().trim().length() > 0) {
		             when.append("&&");
		          }
		          modelSet.addAll((Set<String>)unionPackageWhen.get("model"));
		        }
		        System.out.println("modelSet===" + modelSet);
		        rule.setModelSet(modelSet);
		        when.append("(");
		        when.append(installRuleWhen.get("unionConfigs"));
		        when.append(")");
		        rule.setWhen(when.toString());
		        System.out.println(when.toString());
		        SysRuleThenConfigDTO then = thenDao.findSysRuleThenConfigDTOByCode(ruleCode);
		        if (then != null) {
		          rule.setThen(then.getExcutionCode());
		          System.out.println(then.getExcutionCode());
		        }
		        rules.add(rule);
		        fullModelSet.addAll(modelSet);
		        System.out.println("fullModelSet===" + fullModelSet);
			    Map<String, Object> root = new HashMap<String, Object>();
			    root.put("rules", rules);
 			     if (ruleListDTO.getEftectTime() != null) {
			       root.put("dateV", df.format(ruleListDTO.getEftectTime()));
			     }
			     if ((ruleListDTO.getExpiresTime() != null) && (!"".equals(ruleListDTO.getExpiresTime())))
			     {
			    	 root.put("dateE", df.format(ruleListDTO.getExpiresTime()));
			     }
 			     root.put("fullModelSet", fullModelSet);//存放规则中涉及到业务模型主表的主键
 			     String drlContent;
			     try {
			    	  drlContent = FreeMarkertUtil.generateDrl("drools.ftl", sysRuleListDTO.getEnName() + ".drl", root);
			     } catch (Exception e) {
			          throw new Exception("请检查业务模型模块中实体类或业务模型的属性是否配置正确！");
			     }
			     String result = DroolsUtil.isErrorInfo("/drools/" +  sysRuleListDTO.getEnName() + ".drl");
			     if (result != null) {
			         throw new Exception("生成的drl文件存在以下问题：\r\n" + result);
			     }else if(StringUtils.isNotEmpty(drlContent)){
			    	 String modelIds = String.valueOf((root.get("fullModelSet")));
			    	 modelIds = modelIds.substring(1,modelIds.length()-1);
			    	 sysRuleListDTO.setResourceType("DRL");
			    	 sysRuleListDTO.setRuleResource(drlContent);
			    	//将生成的规则文件保存到规则定义文件表
			    	 try {
						this.updateSysRuleList(sysRuleListDTO);
					} catch (Exception e) {
						logger.error("执行insertRuleDefinition方法异常", e);
						throw new Exception("执行规则文件存档操作异常！");
					}
			     }
	  }
	
   /**
    * 组装规则包
    * @param ruleListCode  规则集编码
    * @return
    */
   private Map<String, Map<String, Object>> installRulePackages(String ruleListCode)
   {
	 //1.定义规则包配置Map
	 Map<String, Map<String, Object>> packageConfigs = new HashMap<String, Map<String, Object>>();
     //2.根据规则集规则编码，查询规则包
	 List<SysRuleListDTO> rulePackages = this.dao.searchChildRuleListByRuleCode(ruleListCode + "%", RuleTypeEnum.RULE_PACKAGE.getKey());
     if(CollectionUtils.isNotEmpty(rulePackages)){
    	 for (SysRuleListDTO sysRuleListDTO : rulePackages) {
    		 Map<String, Object> when = installRuleWhen(sysRuleListDTO.getRuleCode());
 	         packageConfigs.put(sysRuleListDTO.getRuleCode(), when);
		 }  
     }
     return packageConfigs;
   }

	@SuppressWarnings({ "unchecked"})
	private Map<String, Object> unionPackageWhen(String ruleCode,Map<String, Map<String, Object>> packageConfigs) {
		Map<String, Object> whenConfig = new HashMap<String, Object>();
		StringBuffer unionPackageWhen = new StringBuffer("");
		Set<String> set = new HashSet<String>();
		if (ruleCode.length() > 6) {
			String packageCode = ruleCode.substring(0, 9);
			while (packageCode.length() < ruleCode.length()) {
				boolean flag = false;
				Map<String, Object> when = (Map<String, Object>) packageConfigs.get(packageCode);
				if ((when != null)
						&& (when.get("unionConfigs").toString().trim().length() > 0)) {
					if (flag) {
						unionPackageWhen.append("&&");
					}
					unionPackageWhen.append("(");
					unionPackageWhen.append(((Map<String, Object>) packageConfigs.get(packageCode)).get("unionConfigs"));
					unionPackageWhen.append(")");
					set.addAll((Set<String>)when.get("model"));
					flag = true;
				} else {
					flag = false;
				}
				packageCode = ruleCode.substring(0, packageCode.length() + 3);
			}
		}
		whenConfig.put("unionConfigs", unionPackageWhen.toString());
		whenConfig.put("model", set);
		return whenConfig;
	}


	 /**
	  * 组装Drools文件when条件
	  */
	  public Map<String, Object> installRuleWhen(String ruleCode)
	  {
	    Map<String, Object> when = new HashMap<String, Object>();
	    Set<String> set = new HashSet<String>();
	    
	    SysRuleWhenConfigDTO dto = new SysRuleWhenConfigDTO();
	    dto.setRuleCode(ruleCode);
	    Map<String, Object> searchParams = new HashMap<String, Object>();
	    searchParams.put("dto", dto);
	    
	    List<SysRuleWhenConfigDTO> whenConfigs = whenDao.searchSysRuleWhenConfig(searchParams);
	    
	    String unionConfigs = "";
	    if ((whenConfigs != null) && (whenConfigs.size() > 0)) {
	      for (int j = 0; j < whenConfigs.size(); j++) {
	        SysRuleWhenConfigDTO config = (SysRuleWhenConfigDTO)whenConfigs.get(j);
	        unionConfigs = unionConfigs + config.getCompilationResult();
	        
	        ModelAttrDeclare preModel = ModelUtil.converterModelAndAttr(config.getConditionAttrEn());
	        if (preModel != null) {
	          set.add(preModel.getFullModelName());
	        }
	      }
	    }
	    when.put("unionConfigs", unionConfigs);
	    when.put("model", set);
	    
	    return when;
	  }

	/**
	* @title: searchRuleDefinition
	* @author:陈东栋
	* @description: 按规则ruleType+规则类型，查询规则定义信息
	* @param ruleCode 规则编码
	* @param ruleType 规则类型
	* @return
	* @throws 
	*/ 
	public List<SysRuleListDTO> searchRuleDefinition(String ruleCode,String ruleType) {
		return dao.searchChildRuleListByRuleCode(ruleCode,ruleType);
	}

	
	/**
	* @title: searchSysRuleList
	* @author:陈东栋
	* @description: 按条件查询规则集列表
	* @date 2017年5月24日 下午1:48:56
	* @param searchParams
	* @return
	* @throws 
	*/ 
	public List<SysRuleListDTO> searchSysRuleList(Map<String, Object> searchParams) {
		List<SysRuleListDTO> dataList = this.dao.searchSysRuleList(searchParams);
		return dataList;
    }
	
	
	
	/**
	* @title: searchSysRuleGroupListBySysCode
	* @author:陈东栋
	* @description: 按规则库英文名称，查询该规则库下的所有规则集
	* @param sysBaseEnName 规则库英文名称
	* @return
	* @throws 
	*/ 
	public List<SysRuleListDTO> searchSysRuleGroupListBySysCode(String ruleBaseEnName) {
		List<SysRuleListDTO>  ruleGroupList = new ArrayList<SysRuleListDTO>();
		Map<String, Object> searchParams = new HashMap<String, Object>();
    	SysRuleListDTO dto  = new SysRuleListDTO();
    	dto.setEnName(ruleBaseEnName);//规则库命名规范：rule.sysCode
    	searchParams.put("dto", dto);
    	List<SysRuleListDTO> sysRuleList = searchSysRuleList(searchParams);
    	if(CollectionUtils.isNotEmpty(sysRuleList)){
    	    String ruleBaseCode = sysRuleList.get(0).getRuleCode();//规则库编码
    	    ruleGroupList = this.searchRuleDefinition(ruleBaseCode+"%",RuleTypeEnum.RULE_GROUP.getKey());
    	}
		return ruleGroupList;
    }

	/**
	 * 查询规则列表
	 * @param searchParams
	 * @return
	 */
	public List<SysRuleListDTO> querySysRuleList(Map<String, Object> searchParams) {
		List<SysRuleListDTO> dataList = this.dao.querySysRuleListByPaging(searchParams);
		return dataList;
	}
	/**
     * 查询规则集列表
     * @param searchParams
     * @return
     */
    public List<SysRuleListDTO> querySysRuleGroupList(Map<String, Object> searchParams) {
        List<SysRuleListDTO> dataList = this.dao.querySysRuleGroupList(searchParams);
        return dataList;
    }
}