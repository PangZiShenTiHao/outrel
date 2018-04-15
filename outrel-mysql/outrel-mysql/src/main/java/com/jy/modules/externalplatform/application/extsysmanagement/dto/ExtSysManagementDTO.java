package com.jy.modules.externalplatform.application.extsysmanagement.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:外联平台系统管理表
 *@author dell
 *@version 1.0,
 *@date 2017-04-06 13:10:18
 */
public class ExtSysManagementDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**主键ID*/
	private java.lang.Long id;

	/**系统编号*/
	private java.lang.String sysCode;

	/**系统名称*/
	private java.lang.String sysName;

	/**数据有效性（1-有效；0-无效）*/
	private java.lang.String validateState;
	
	/** 创建人 */
	private java.lang.Long createBy;
	
	/** 创建时间 */
	private java.sql.Timestamp createTime;
	
	/** 修改人 */
	private java.lang.Long modifyBy;

	/** 修改时间 */
	private java.sql.Timestamp modifyTime;
	
	/**
	 *方法: 获得id
	 *@return: java.lang.Long  id
	 */
	public java.lang.Long getId(){
		return this.id;
	}

	/**
	 *方法: 设置id
	 *@param: java.lang.Long  id
	 */
	public void setId(java.lang.Long id){
		this.id = id;
	}

	/**
	 *方法: 获得sysCode
	 *@return: java.lang.String  sysCode
	 */
	public java.lang.String getSysCode(){
		return this.sysCode;
	}

	/**
	 *方法: 设置sysCode
	 *@param: java.lang.String  sysCode
	 */
	public void setSysCode(java.lang.String sysCode){
		this.sysCode = sysCode;
	}

	/**
	 *方法: 获得sysName
	 *@return: java.lang.String  sysName
	 */
	public java.lang.String getSysName(){
		return this.sysName;
	}

	/**
	 *方法: 设置sysName
	 *@param: java.lang.String  sysName
	 */
	public void setSysName(java.lang.String sysName){
		this.sysName = sysName;
	}

	/**
	 *方法: 获得validateState
	 *@return: java.lang.String  validateState
	 */
	public java.lang.String getValidateState(){
		return this.validateState;
	}

	/**
	 *方法: 设置validateState
	 *@param: java.lang.String  validateState
	 */
	public void setValidateState(java.lang.String validateState){
		this.validateState = validateState;
	}

	public java.lang.Long getCreateBy() {
		return createBy;
	}

	public void setCreateBy(java.lang.Long createBy) {
		this.createBy = createBy;
	}

	public java.sql.Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(java.sql.Timestamp createTime) {
		this.createTime = createTime;
	}

	public java.lang.Long getModifyBy() {
		return modifyBy;
	}

	public void setModifyBy(java.lang.Long modifyBy) {
		this.modifyBy = modifyBy;
	}

	public java.sql.Timestamp getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(java.sql.Timestamp modifyTime) {
		this.modifyTime = modifyTime;
	}
}