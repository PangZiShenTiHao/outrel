package com.jy.modules.externalplatform.interfacerest.dto;

public class ResponseBodyDTO3 {

	private String sysCode;
	private String funcType;
	private String funcPointType;
	private Boolean feedBack;//是否通过配置的规则    ture:通过   false:未通过
	private String retTime;//返回时间
	private String retCode;//返回编码
	private String retMsg;//返回信息
	private String hitDetail;// 命中详情
	private String frontTransNo;//交易流水号
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
	public Boolean getFeedBack() {
		return feedBack;
	}
	public void setFeedBack(Boolean feedBack) {
		this.feedBack = feedBack;
	}
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
	public String getHitDetail() {
		return hitDetail;
	}
	public void setHitDetail(String hitDetail) {
		this.hitDetail = hitDetail;
	}
	public String getFrontTransNo() {
		return frontTransNo;
	}
	public void setFrontTransNo(String frontTransNo) {
		this.frontTransNo = frontTransNo;
	}
	
	public ResponseBodyDTO3() {
		super();
	}
	public ResponseBodyDTO3(RequestBodyDTO3 req) {
		this.sysCode = req.getSysCode();
		this.funcType = req.getFuncType();
		this.funcPointType = req.getFuncPointType();
		this.frontTransNo = req.getFrontTransNo();
	}
}
