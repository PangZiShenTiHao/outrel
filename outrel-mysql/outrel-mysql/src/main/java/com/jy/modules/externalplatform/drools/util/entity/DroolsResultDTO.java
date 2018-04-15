package com.jy.modules.externalplatform.drools.util.entity;

import java.io.Serializable;

public class DroolsResultDTO implements Serializable{
	
	private static final long serialVersionUID = 2958326533797953782L;
	/*** 返回标识   true 成功 ；空值为 失败*/
	private Boolean retStatus;
	/*** 规则编码*/
	private String ruleCode;
	/*** 备注信息*/
	private String remark;

	public Boolean getRetStatus() {
		return retStatus;
	}

	public void setRetStatus(Boolean retStatus) {
		this.retStatus = retStatus;
	}

	public String getRuleCode() {
		return ruleCode;
	}

	public void setRuleCode(String ruleCode) {
		this.ruleCode = ruleCode;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
