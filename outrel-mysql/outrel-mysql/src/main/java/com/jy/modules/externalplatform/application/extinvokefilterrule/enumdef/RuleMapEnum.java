package com.jy.modules.externalplatform.application.extinvokefilterrule.enumdef;

import org.apache.commons.lang3.StringUtils;

/**
* @classname: RuleMapEnum
* @description: 外联调用挡板规则-映射表 枚举类
*/ 
public enum RuleMapEnum {
	MAP_TYPE_PROD("prodList","prod"),   //产品类型
	MAP_TYPE_ORG("orgList","org"),      //适用门店
	MAP_TYPE_FUNC("funcList","func");   //功能类型

	private String key;
	private String value;

	private RuleMapEnum(String key, String value) {
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

		for (RuleMapEnum s : values()) {
			if (s.getKey().equals(key)) {
				value = s.getValue();
				break;
			}
		}

		return value;
	}
}
