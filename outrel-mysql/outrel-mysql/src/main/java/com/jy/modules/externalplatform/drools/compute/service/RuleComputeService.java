package com.jy.modules.externalplatform.drools.compute.service;

import java.io.*;
import java.sql.Blob;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.jy.modules.externalplatform.application.extinterfaceinfo.dto.ExtInterfaceInfoDTO;
import com.jy.modules.externalplatform.application.extinterfaceinfo.service.ExtInterfaceInfoService;
import com.jy.modules.externalplatform.drools.InputParam;
import com.jy.modules.externalplatform.drools.RulesEngine;
import com.jy.modules.externalplatform.drools.compute.impl.IRuleCompute;
import com.jy.modules.externalplatform.drools.sysrulelist.dto.SysRuleListDTO;
import com.jy.modules.externalplatform.drools.sysrulelist.enumdef.RuleTypeEnum;
import com.jy.modules.externalplatform.drools.sysrulelist.service.SysRuleListService;
import com.jy.modules.externalplatform.drools.util.entity.DroolsResultDTO;

import freemarker.cache.StringTemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;

@Service("com.jy.modules.externalplatform.drools.compute.service.RuleComputeService")
public class RuleComputeService implements IRuleCompute, Serializable {

	private static final long serialVersionUID = 1L;
	private static final Logger logger =  LoggerFactory.getLogger(RuleComputeService.class);
    
    Configuration cfg = new Configuration();
    StringTemplateLoader stringLoader = new StringTemplateLoader();
	
	@Autowired
	private RulesEngine engine;//引入规则引擎
	
    @Autowired
	private SysRuleListService sysRuleListService;
    
    @Autowired
    private ExtInterfaceInfoService interfaceInfoService;


	/**
	* @title: isHitRule
	* @author:陈东栋
	* @description: 是否命中定义的规则
	* @param ruleCode 规则编码
	* @param version  规则版本号
	* @param inputParam 指标参数
	* @return
	*/
	@Override
	public boolean isHitRule(String ruleCode,String version, InputParam inputParam) {
		/** 步骤1：组装传入参数 */
		boolean feedback = false;
		/** 步骤2：设置返回参数 */
		Map<String, Object> resultMap = new HashMap<String, Object>();
		DroolsResultDTO droolsResultDTO = new DroolsResultDTO();
		resultMap.put("droolsResultDTO", droolsResultDTO);
		try {
			/** 步骤3：调用规则引擎 */
				engine.execute(ruleCode,version,RuleTypeEnum.RULE.getKey(),inputParam,resultMap);
		} catch (Exception e) {
			droolsResultDTO.setRetStatus(false);
			logger.error("执行规则[" + ruleCode + "]引擎调用异常,指标参数:"+ "\r\n"+JSON.toJSONString(inputParam, true), e);
		}
		/** 步骤4：返回规则命中结果 */
		Boolean retStatus = droolsResultDTO.getRetStatus();
		if (retStatus != null && retStatus) {
			feedback = true;
		}
		return feedback;
	}
	
	/**
	* @title: isHitRuleGroup
	* @author:陈东栋
	* @description: 是否命中定义的规则集
	* @param ruleGroupCode 规则集编码
	* @param inputParam 指标参数
	* @return
	*/
	public boolean isHitRuleGroup(String ruleGroupCode, InputParam inputParam) {
		boolean feedback = true;
	    List<SysRuleListDTO> sysRuleList = sysRuleListService.searchRuleDefinition(ruleGroupCode+"%",RuleTypeEnum.RULE.getKey());
		if(CollectionUtils.isNotEmpty(sysRuleList)){
			for (SysRuleListDTO sysRuleListDTO : sysRuleList) {
				 String ruleCode = sysRuleListDTO.getRuleCode();
				 String version = String.valueOf(sysRuleListDTO.getVersion());
			     if(!isHitRule(ruleCode,version,inputParam)){//若有一条规则没有命中，不能命中定义的规则集
					 feedback = false; 
					 break;
				 } 		
			}
		}else{
			feedback = false; //规则集下没有配置规则，不能命中定义的规则集
		}
		return feedback;
	}
	
	
	/**
	* @title: dealHitRuleGroup
	* @author:陈东栋
	* @description: 处理命中定义的规则集
	* @date 2017年6月24日 下午4:41:28
	* @param ruleGroupCode
	* @param inputParam
	* @return
	* @throws 
	*/ 
	public Map<String,Object> dealHitRuleGroup(String ruleGroupCode, InputParam inputParam){
		boolean feedback = true;
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<SysRuleListDTO> sysRuleList = sysRuleListService.searchRuleDefinition(ruleGroupCode+"%",RuleTypeEnum.RULE.getKey());
		if(CollectionUtils.isNotEmpty(sysRuleList)){
			for (SysRuleListDTO sysRuleListDTO : sysRuleList) {
				if(!feedback){
					break;
				}
				 String ruleCode = sysRuleListDTO.getRuleCode();//规则编码
				 String ruleDesc = sysRuleListDTO.getRemark();//规则描述
				 String version = String.valueOf(sysRuleListDTO.getVersion());
				 String ruleResource = sysRuleListDTO.getRuleResource();
					for(String key :inputParam.keySet()){
						if(!feedback){
							break;
						}
						Object o = inputParam.get(key);
						//判断股则中是否存在key
						if(ruleResource.contains(key)){
							if(o instanceof List){
								for(Object map : (List)o){
									Map inputMap = new HashMap();
									inputMap.put(key, map);
									InputParam input =new InputParam();
									input.putAll(inputMap);
									 if(isHitRule(ruleCode,version,input)){//但凡有一条规则命中，则命中定义的规则集
										 feedback = false; 
										 resultMap.put("ruleCode", ruleCode);
										 resultMap.put("ruleDesc", ruleDesc);
										 resultMap.put("hitDetail",ruleCode+"-"+ruleDesc);
										 break;
									 }

								}
							}else{
								Map inputMap = new HashMap();
								inputMap.put(key, o);
								InputParam input =new InputParam();
								input.putAll(inputMap);
								 if(isHitRule(ruleCode,version,input)){//但凡有一条规则命中，则命中定义的规则集
									 feedback = false; 
									 resultMap.put("ruleCode", ruleCode);
									 resultMap.put("ruleDesc", ruleDesc);
									 resultMap.put("hitDetail",ruleCode+"-"+ruleDesc);
									 break;
								 }

							}
						}
					}
				
			}
		}//规则集下没有配置规则，不进行拦截处理
		resultMap.put("hitStatus", feedback);
		return resultMap;	
	}

	/**
	* @title: getContent
	* @author:陈东栋
	* @description: 填充ftl模版，获取接口请求报文
	* @date 2017年5月25日 上午9:42:57
	* @param interfaceNo
	* @param param
	* @return
	* @throws 
	*/ 
	@Override
	public String getContent(String interfaceNo, Map<String, Object> param) {
		String resultStr = null;
		ByteArrayOutputStream baos = null;
		try {
			ExtInterfaceInfoDTO interfaceInfoDTO = interfaceInfoService.queryExtInferfaceTemplateContent(interfaceNo);
			/*byte[] blobContent = (byte[]) interfaceInfoDTO.getTemplateContent();
			*//*InputStream ins = blobContent.getBinaryStream();*//*
			InputStream ins = new ByteArrayInputStream(blobContent);
			baos = new ByteArrayOutputStream();
			int i = -1;
			while ((i = ins.read()) != -1) {
				baos.write(i);
			}
			String content = baos.toString("UTF-8");*/
			String content = interfaceInfoDTO.getTemplateContent().toString();
			stringLoader.putTemplate(interfaceNo, content);
			cfg.setTemplateLoader(stringLoader);
			Template temp = cfg.getTemplate(interfaceNo, "UTF-8");
			Writer out = new StringWriter(2048);
			temp.process(param, out);
			resultStr = out.toString();
		} catch (Exception e) {
			logger.error("执行方法RuleComputeService.getContent()异常：", e);
		} finally {
			if (baos != null) {
				try {
					baos.close();// 关闭
				} catch (Exception e) {
					logger.error("RuleComputeService.getContent() ByteArrayOutputStream.close()异常",e);
				}
			}
		}
		return resultStr;
	}
}
