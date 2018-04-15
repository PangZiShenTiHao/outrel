package com.jy.modules.externalplatform.interfacerest.utils;

import org.apache.commons.lang3.StringUtils;

public enum InterfaceEnum {
	VALIDATE_TRUE("1","有效或ID"),      
	VALIDATE_FALSE("0","无效"),   
	POST("post","接口调用方式POST"),    
	GET("get","接口调用方式GET"), 
	JSON("application/json","接口入参类型JSON"),
	XML("application/xml","接口入参类型XML"),
	PROD("prod","产品"),
	ORG("org","机构"),
	FUNC("func","功能点"),
	PROD_MSG("prod_msg","调用的接口的产品没有权限！"),
	ORG_MSG("org_msg","调用的接口的机构没有权限！"),
	FUNC_MSG("func_msg","调用的接口的功能点没有权限！"),
	VALIDATE_MSG("validate_msg","调用的接口不在有效时间内"),
	SUCCESS_CODE("successCode","HTTP_SUCESS_NUM"),
	FAIL_CODE("failCode","HTTP_FAIL_NUM"),
	SUCCESS_REL_CODE("successRelCode","HTTP_SUCESS_REL_NUM"),
	SUCCESS_STATUS("successStatus","HTTP_TRUE_STATUS"),
	FAIL_STATUS("failStatus","HTTP_FALSE_STATUS"),
	ERROR_STATUS("errorStatus","HTTP_ERROR_STATUS"),
	SUCCESS_REL_STATUS("successRelStatus","HTTP_TRUE_RES_STATUS"),
	
	RET_CODE_1("1","查有"),
	RET_CODE_2("2","查无"),
	RET_CODE_3("3","调用接口报错"),
	RET_CODE_4("4","解析回参出错"),
	RET_CODE_5("5","返回错误信息"),
	RET_CODE_6("6","ESB总线转换异常"),
	RET_MSG("Y","是否有子表数据"),
	
	type_01("01", "信用相关交易统计"),
	type_02("02", "消费大类分布信息"),
	type_03("03", "消费地域分布信息"),
	type_04("04", "每月消费状况信息"),
	
	//配置类型（1-接口分配规则集  2-调用点分配规则集）
	CONF_TYPE_1("1","接口分配规则集"),
	CONF_TYPE_2("2","调用点分配规则集"),
	
	//是否调用接口（0-不调用接口  1-调用接口）
	IS_INVOKING_0("0","不调用接口"),
	IS_INVOKING_1("1","调用接口"),
	
	TRUE("true","成功"),      
	FALSE("false","失败");
	private String key;
	private String value;

	private InterfaceEnum(String key, String value) {
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
	* @author:相立鹏
	* @description: 根据key获取对应的value
	* @date 2017年5月25日 下午2:17:37
	* @param key
	* @return
	* @throws 
	*/ 
	public static String getValueByKey(String key) {
		String value = null;

		if (StringUtils.isEmpty(key)) {
			return value;
		}

		for (InterfaceEnum s : values()) {
			if (s.getKey().equals(key)) {
				value = s.getValue();
				break;
			}
		}
		return value;
	}
}
