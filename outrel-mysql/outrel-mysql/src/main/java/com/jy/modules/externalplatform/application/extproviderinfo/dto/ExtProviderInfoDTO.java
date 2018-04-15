package com.jy.modules.externalplatform.application.extproviderinfo.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:提供商配置表
 *@author Administrator
 *@version 1.0,
 *@date 2017-05-12 14:14:06
 */
public class ExtProviderInfoDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**ID*/
	private java.lang.Long id;

	/**提供商名称*/
	private java.lang.String providerName;

	/**提供商编码*/
	private java.lang.String providerCode;

	/**是否有效   1：有效 0：无效*/
	private java.lang.String validateState;

	/**创建时间*/
	private java.sql.Timestamp createTime;

	/**创建人*/
	private java.lang.String createBy;

	/**MODIFY_TIME*/
	private java.sql.Timestamp modifyTime;

	/**MODIFY_NO*/
	private java.lang.String modifyBy;

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
	 *方法: 获得providerName
	 *@return: java.lang.String  providerName
	 */
	public java.lang.String getProviderName(){
		return this.providerName;
	}

	/**
	 *方法: 设置providerName
	 *@param: java.lang.String  providerName
	 */
	public void setProviderName(java.lang.String providerName){
		this.providerName = providerName;
	}

	/**
	 *方法: 获得providerCode
	 *@return: java.lang.String  providerCode
	 */
	public java.lang.String getProviderCode(){
		return this.providerCode;
	}

	/**
	 *方法: 设置providerCode
	 *@param: java.lang.String  providerCode
	 */
	public void setProviderCode(java.lang.String providerCode){
		this.providerCode = providerCode;
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

	/**
	 *方法: 获得createTime
	 *@return: java.sql.Timestamp  createTime
	 */
	public java.sql.Timestamp getCreateTime(){
		return this.createTime;
	}

	/**
	 *方法: 设置createTime
	 *@param: java.sql.Timestamp  createTime
	 */
	public void setCreateTime(java.sql.Timestamp createTime){
		this.createTime = createTime;
	}

	/**
	 *方法: 获得createBy
	 *@return: java.lang.String  createBy
	 */
	public java.lang.String getCreateBy(){
		return this.createBy;
	}

	/**
	 *方法: 设置createBy
	 *@param: java.lang.String  createBy
	 */
	public void setCreateBy(java.lang.String createBy){
		this.createBy = createBy;
	}

	/**
	 *方法: 获得modifyTime
	 *@return: java.sql.Timestamp  modifyTime
	 */
	public java.sql.Timestamp getModifyTime(){
		return this.modifyTime;
	}

	/**
	 *方法: 设置modifyTime
	 *@param: java.sql.Timestamp  modifyTime
	 */
	public void setModifyTime(java.sql.Timestamp modifyTime){
		this.modifyTime = modifyTime;
	}

	/**
	 *方法: 获得modifyBy
	 *@return: java.lang.String  modifyBy
	 */
	public java.lang.String getModifyBy(){
		return this.modifyBy;
	}

	/**
	 *方法: 设置modifyBy
	 *@param: java.lang.String  modifyBy
	 */
	public void setModifyBy(java.lang.String modifyBy){
		this.modifyBy = modifyBy;
	}

}