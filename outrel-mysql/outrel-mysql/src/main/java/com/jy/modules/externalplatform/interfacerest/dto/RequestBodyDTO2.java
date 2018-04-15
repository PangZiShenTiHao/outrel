package com.jy.modules.externalplatform.interfacerest.dto;

import org.hibernate.validator.constraints.NotBlank;

import com.fintech.platform.core.common.BaseDTO;

public class RequestBodyDTO2 extends BaseDTO{
	private static final long serialVersionUID = 1L;
	@NotBlank(message = "系统编码sysCode不能为空")
	private String sysCode;//系统编码
	@NotBlank(message = "功能模块funcType不能为空")
	private String funcType;//功能模块
	@NotBlank(message = "功能点funcPointType不能为空")
	private String funcPointType;//功能点
	@NotBlank(message = "交易流水号frontTransNo不能为空")
	private String frontTransNo;//交易流水号
	@NotBlank(message = "交易时间frontTransTime不能为空")
	private String frontTransTime;//交易时间
	@NotBlank(message = "接口编码interfaceNo不能为空")
	private String interfaceNo;//接口编码
	@NotBlank(message = "业务编码businessCode不能为空")
	private String businessCode;//业务编码
	public String getSysCode() {
		return sysCode;
	}
	public void setSysCode(String sysCode) {
		this.sysCode = sysCode;
	}
	public String getFuncType() {
		return funcType;
	}
	public void setFuncType(String funcType) {
		this.funcType = funcType;
	}
	public String getFuncPointType() {
		return funcPointType;
	}
	public void setFuncPointType(String funcPointType) {
		this.funcPointType = funcPointType;
	}
	public String getFrontTransNo() {
		return frontTransNo;
	}
	public void setFrontTransNo(String frontTransNo) {
		this.frontTransNo = frontTransNo;
	}
	public String getFrontTransTime() {
		return frontTransTime;
	}
	public void setFrontTransTime(String frontTransTime) {
		this.frontTransTime = frontTransTime;
	}
	public String getInterfaceNo() {
		return interfaceNo;
	}
	public void setInterfaceNo(String interfaceNo) {
		this.interfaceNo = interfaceNo;
	}
	public String getBusinessCode() {
		return businessCode;
	}
	public void setBusinessCode(String businessCode) {
		this.businessCode = businessCode;
	}
	
	
}
