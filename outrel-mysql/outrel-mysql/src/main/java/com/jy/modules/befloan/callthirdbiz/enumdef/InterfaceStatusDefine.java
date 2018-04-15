package com.jy.modules.befloan.callthirdbiz.enumdef;

/**
 * @description 贷前对外提供接口定义处理的结果状态
 * @author 豆永亮
 * @date 2015-01-30
 *
 */
public enum InterfaceStatusDefine {
	SUCCESS_STATUS("10000", "成功"),
	FAILURE_STATUS("20000", "失败"),
	CONTRACT_NOEXIST_STATUS("10001", "合同号不存在"),
	CONTRACT_ISNULL_STATUS("10002", "请求的参数合同号为空"),
	
	GURANO_NOEXIST_STATUS("20001", "押品编号不存在"),
	GURANO_ISNULL_STATUS("20002", "请求的押品编号为空"),
	
	DATA_FORMAT_VERIFICATION_FAILED("30001", "数据格式校验失败"),
	DATA_DUPLICATION("30002", "数据重复，不能再次写入"),
	OUT_OF_MAXROW("30003", "超出最大行数限制"),
	SYS_EXCEPTION("30009", "系统异常") ,
	
	COL_RES_SUCCESS_CODE("0000","交易成功") ;	//押品系统交易成功相应

	private String key;
	private String value;
	
	private InterfaceStatusDefine(String key, String value) {
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
}
