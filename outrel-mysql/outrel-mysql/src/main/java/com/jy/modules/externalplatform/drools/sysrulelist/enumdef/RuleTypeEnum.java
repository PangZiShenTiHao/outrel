package com.jy.modules.externalplatform.drools.sysrulelist.enumdef;

import org.apache.commons.lang3.StringUtils;

/**
* @classname: RuleTypeEnum
* @description: 规则类型枚举类
*/ 
public enum RuleTypeEnum {
	RULE_BASE_NAME("rule.","规则库命名前缀"),
	RULE_BASE("1","规则库"),      
	RULE_GROUP("2","规则集"),   
	RULE_PACKAGE("3","规则包"),    
	RULE("4","规则"),
	FILED_COMPARE("1","字段比较"),
	FILED_OPERATOR("2","字段运算"); 

	private String key;
	private String value;

	private RuleTypeEnum(String key, String value) {
		this.key = key;
		this.value = value;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	/**
	* @title: getValueByKey
	* @author:陈东栋
	* @description: 根据key获取对应的value
	* @date 2017年4月26日 下午2:17:37
	* @param key
	* @return
	* @throws 
	*/ 
	public static String getValueByKey(String key) {
		String value = null;

		if (StringUtils.isEmpty(key)) {
			return value;
		}

		for (RuleTypeEnum s : values()) {
			if (s.getKey().equals(key)) {
				value = s.getValue();
				break;
			}
		}
		return value;
	}
}
