package com.jy.modules.befloan.customer.lbtintoinfo.enumdef;

import org.apache.commons.lang3.StringUtils;

public enum MoveDataObj {
	MOVE_DATA_1("1", "客户"),
	MOVE_DATA_2("2", "进件"),
	MOVE_DATA_3("3", "合同");
	
	private String key;
	private String value;
	private MoveDataObj(String key, String value) {
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
	
	public static String getValueByKey(String key) {
		String value = null;
		
		if(StringUtils.isEmpty(key)) {
			return value;
		}
		
		for(MoveDataObj s:values()){
			if(s.getKey().equals(key)){
				value = s.getValue();
				break;
			}
		}
		
		return value;
	}
}
