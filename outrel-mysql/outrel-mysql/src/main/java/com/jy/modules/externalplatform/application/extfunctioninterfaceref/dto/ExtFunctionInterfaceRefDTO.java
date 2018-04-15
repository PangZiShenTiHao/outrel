package com.jy.modules.externalplatform.application.extfunctioninterfaceref.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:功能接口映射表
 *@author dell
 *@version 1.0,
 *@date 2017-05-12 16:39:43
 */
public class ExtFunctionInterfaceRefDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**ID*/
	private java.lang.Long id;
	
	/**系统编码*/
	private java.lang.String sysCode;

	/**系统名称*/
	private java.lang.String sysName;
	
	/**功能模块编码*/
	private java.lang.String funcModuleType;
	
	/**功能模块名称*/
	private java.lang.String funcModuleName;

	/**功能编码*/
	private java.lang.String funcTypeCode;
	
	/**功能名称*/
	private java.lang.String funcTypeName;

	/**接口编码*/
	private java.lang.String interfaceNo;
	
	/**接口名称*/
	private java.lang.String interfaceName;
	
	/**配置类型（1-接口分配规则集  2-调用点分配规则集）*/
	private java.lang.String confType;
	
	/**是否有效 1：有效 0：无效*/
	private java.lang.String validateState;

	/**创建时间*/
	private java.sql.Timestamp createTime;

	/**创建人*/
	private java.lang.String createBy;
	
	/**修改时间*/
	private java.sql.Timestamp modifyTime;

	/**修改人*/
	private java.lang.String modifyBy;

	/**PRIORITY*/
	private java.lang.String priority;
	
	/**接口URL*/
	private java.lang.String interfaceUrl;
	
	/**交易流水编码*/
	private java.lang.String interfaceCode;

	/**业务编码*/
	private java.lang.String businessCode;

	/**接口调用方式 例如：post、get*/
	private java.lang.String interfaceSendType;

	/**接口参数类型  例如：xml、json*/
	private java.lang.String interfaceParamsType;
	
	/**规则集编码*/
	private java.lang.String ruleGroupCode;
	
	/**规则集名称*/
	private java.lang.String ruleGroupName;
	
	/**映射类名称*/
	private java.lang.String className;
	
	
	public java.lang.Long getId() {
		return id;
	}

	public java.lang.String getSysCode() {
		return sysCode;
	}


	public void setSysCode(java.lang.String sysCode) {
		this.sysCode = sysCode;
	}


	public void setId(java.lang.Long id) {
		this.id = id;
	}

	public java.lang.String getSysName() {
		return sysName;
	}

	public void setSysName(java.lang.String sysName) {
		this.sysName = sysName;
	}

	public java.lang.String getFuncModuleType() {
		return funcModuleType;
	}

	public void setFuncModuleType(java.lang.String funcModuleType) {
		this.funcModuleType = funcModuleType;
	}

	public java.lang.String getFuncModuleName() {
		return funcModuleName;
	}

	public void setFuncModuleName(java.lang.String funcModuleName) {
		this.funcModuleName = funcModuleName;
	}

	public java.lang.String getFuncTypeCode() {
		return funcTypeCode;
	}

	public void setFuncTypeCode(java.lang.String funcTypeCode) {
		this.funcTypeCode = funcTypeCode;
	}

	public java.lang.String getFuncTypeName() {
		return funcTypeName;
	}

	public void setFuncTypeName(java.lang.String funcTypeName) {
		this.funcTypeName = funcTypeName;
	}

	public java.lang.String getInterfaceNo() {
		return interfaceNo;
	}

	public void setInterfaceNo(java.lang.String interfaceNo) {
		this.interfaceNo = interfaceNo;
	}

	public java.lang.String getInterfaceName() {
		return interfaceName;
	}

	public void setInterfaceName(java.lang.String interfaceName) {
		this.interfaceName = interfaceName;
	}
	
	public java.lang.String getConfType() {
		return confType;
	}

	public void setConfType(java.lang.String confType) {
		this.confType = confType;
	}

	public java.lang.String getValidateState() {
		return validateState;
	}

	public void setValidateState(java.lang.String validateState) {
		this.validateState = validateState;
	}

	public java.sql.Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(java.sql.Timestamp createTime) {
		this.createTime = createTime;
	}

	public java.lang.String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(java.lang.String createBy) {
		this.createBy = createBy;
	}

	public java.sql.Timestamp getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(java.sql.Timestamp modifyTime) {
		this.modifyTime = modifyTime;
	}

	public java.lang.String getModifyBy() {
		return modifyBy;
	}

	public void setModifyBy(java.lang.String modifyBy) {
		this.modifyBy = modifyBy;
	}

	public java.lang.String getPriority() {
		return priority;
	}

	public void setPriority(java.lang.String priority) {
		this.priority = priority;
	}

	public java.lang.String getInterfaceUrl() {
		return interfaceUrl;
	}

	public void setInterfaceUrl(java.lang.String interfaceUrl) {
		this.interfaceUrl = interfaceUrl;
	}

	public java.lang.String getInterfaceCode() {
		return interfaceCode;
	}

	public void setInterfaceCode(java.lang.String interfaceCode) {
		this.interfaceCode = interfaceCode;
	}

	public java.lang.String getBusinessCode() {
		return businessCode;
	}

	public void setBusinessCode(java.lang.String businessCode) {
		this.businessCode = businessCode;
	}

	public java.lang.String getInterfaceSendType() {
		return interfaceSendType;
	}

	public void setInterfaceSendType(java.lang.String interfaceSendType) {
		this.interfaceSendType = interfaceSendType;
	}

	public java.lang.String getInterfaceParamsType() {
		return interfaceParamsType;
	}

	public void setInterfaceParamsType(java.lang.String interfaceParamsType) {
		this.interfaceParamsType = interfaceParamsType;
	}

	public java.lang.String getRuleGroupCode() {
		return ruleGroupCode;
	}

	public void setRuleGroupCode(java.lang.String ruleGroupCode) {
		this.ruleGroupCode = ruleGroupCode;
	}

	public java.lang.String getRuleGroupName() {
		return ruleGroupName;
	}

	public void setRuleGroupName(java.lang.String ruleGroupName) {
		this.ruleGroupName = ruleGroupName;
	}

	public java.lang.String getClassName() {
		return className;
	}

	public void setClassName(java.lang.String className) {
		this.className = className;
	}

}