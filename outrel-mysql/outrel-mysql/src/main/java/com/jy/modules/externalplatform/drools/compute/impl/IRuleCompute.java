package com.jy.modules.externalplatform.drools.compute.impl;

import java.util.Map;

import com.jy.modules.externalplatform.drools.InputParam;

public interface IRuleCompute {

	/**
	* @title: isHitRule
	* @author：陈东栋
	* @description: 是否命中定义的规则
	* @date 2017年4月19日 上午9:57:49
	* @param ruleCode 规则编码
	* @param version  规则版本号
	* @param paramsMap 模板参数
	* @return
	* @throws 
	*/ 
	public boolean isHitRule(String ruleCode,String version,InputParam params);
	
	
	
	
	/**
	* @title: isHitRuleGroup
	* @author:陈东栋
	* @description: 是否命中指定的规则集
	* @date 2017年5月24日 上午11:59:35
	* @param ruleGroupCode
	* @param inputParam
	* @return
	* @throws 
	*/ 
	public boolean isHitRuleGroup(String ruleGroupCode, InputParam inputParam);
	
	
	
	
	/**
	* @title: dealHitRuleGroup
	* @author:陈东栋
	* @description: 处理命中定义的规则集
	* @date 2017年6月24日 下午4:44:53
	* @param ruleGroupCode
	* @param inputParam
	* @return
	* @throws 
	*/ 
	public Map<String,Object> dealHitRuleGroup(String ruleGroupCode, InputParam inputParam);
	
	
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
	public String getContent(String interfaceNo, Map<String, Object> param);
		
}
