package com.jy.modules.externalplatform.application.extinvokefilterrule.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:外联调用挡板规则表
 *@author dell
 *@version 1.0,
 *@date 2017-04-26 09:10:36
 */
public class ExtInvokeFilterRuleDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**ID*/
	private java.lang.Long id;

	/**系统类型*/
	private java.lang.String sysCode;

	/**是否启用产品限制（0-启用 1-禁用）*/
	private java.lang.String isProLimit;

	/**是否启用门店限制（0-启用 1-禁用）*/
	private java.lang.String isStoreLimit;

	/**有效期开始日期*/
	private java.util.Date validTermStartdate;

	/**有效期结束日期*/
	private java.util.Date validTermEnddate;

	/**数据有效性(1：有效，0：无效)*/
	private java.lang.String validateState;

	/**备注*/
	private java.lang.String remark;
	
	/**有效期日期*/
	private java.util.Date validTermdate;
	
	/** 创建人 */
	private java.lang.Long createBy;
	
	/** 创建时间 */
	private java.sql.Timestamp createTime;
	
	/** 修改人 */
	private java.lang.Long modifyBy;

	/** 修改时间 */
	private java.sql.Timestamp modifyTime;
	
	
	public java.util.Date getValidTermdate() {
		return validTermdate;
	}

	public void setValidTermdate(java.util.Date validTermdate) {
		this.validTermdate = validTermdate;
	}

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
	 *方法: 获得isProLimit
	 *@return: java.lang.String  isProLimit
	 */
	public java.lang.String getIsProLimit(){
		return this.isProLimit;
	}

	/**
	 *方法: 设置isProLimit
	 *@param: java.lang.String  isProLimit
	 */
	public void setIsProLimit(java.lang.String isProLimit){
		this.isProLimit = isProLimit;
	}

	/**
	 *方法: 获得isStoreLimit
	 *@return: java.lang.String  isStoreLimit
	 */
	public java.lang.String getIsStoreLimit(){
		return this.isStoreLimit;
	}

	/**
	 *方法: 设置isStoreLimit
	 *@param: java.lang.String  isStoreLimit
	 */
	public void setIsStoreLimit(java.lang.String isStoreLimit){
		this.isStoreLimit = isStoreLimit;
	}

	/**
	 *方法: 获得validTermStartdate
	 *@return: java.util.Date  validTermStartdate
	 */
	public java.util.Date getValidTermStartdate(){
		return this.validTermStartdate;
	}

	/**
	 *方法: 设置validTermStartdate
	 *@param: java.util.Date  validTermStartdate
	 */
	public void setValidTermStartdate(java.util.Date validTermStartdate){
		this.validTermStartdate = validTermStartdate;
	}

	/**
	 *方法: 获得validTermEnddate
	 *@return: java.util.Date  validTermEnddate
	 */
	public java.util.Date getValidTermEnddate(){
		return this.validTermEnddate;
	}

	/**
	 *方法: 设置validTermEnddate
	 *@param: java.util.Date  validTermEnddate
	 */
	public void setValidTermEnddate(java.util.Date validTermEnddate){
		this.validTermEnddate = validTermEnddate;
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
	 *方法: 获得remark
	 *@return: java.lang.String  remark
	 */
	public java.lang.String getRemark(){
		return this.remark;
	}

	/**
	 *方法: 设置remark
	 *@param: java.lang.String  remark
	 */
	public void setRemark(java.lang.String remark){
		this.remark = remark;
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