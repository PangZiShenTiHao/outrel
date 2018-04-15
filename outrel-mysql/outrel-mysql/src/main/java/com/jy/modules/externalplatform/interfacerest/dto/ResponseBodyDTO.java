package com.jy.modules.externalplatform.interfacerest.dto;


public class ResponseBodyDTO {
	private String retTime;
	private String retCode;
	private String retMsg;
	private String interfaceData;
	private String frontTransNo;
	private String interfaceNo;
	private String busiCode;

	public String getRetTime() {
		return retTime;
	}

	public void setRetTime(String retTime) {
		this.retTime = retTime;
	}

	public String getRetCode() {
		return retCode;
	}

	public void setRetCode(String retCode) {
		this.retCode = retCode;
	}

	public String getRetMsg() {
		return retMsg;
	}

	public void setRetMsg(String retMsg) {
		this.retMsg = retMsg;
	}

	public String getInterfaceData() {
		return interfaceData;
	}

	public void setInterfaceData(String interfaceData) {
		this.interfaceData = interfaceData;
	}

	public String getFrontTransNo() {
		return frontTransNo;
	}

	public void setFrontTransNo(String frontTransNo) {
		this.frontTransNo = frontTransNo;
	}

	public String getInterfaceNo() {
		return interfaceNo;
	}

	public void setInterfaceNo(String interfaceNo) {
		this.interfaceNo = interfaceNo;
	}

	public String getBusiCode() {
		return busiCode;
	}

	public void setBusiCode(String busiCode) {
		this.busiCode = busiCode;
	}

}
