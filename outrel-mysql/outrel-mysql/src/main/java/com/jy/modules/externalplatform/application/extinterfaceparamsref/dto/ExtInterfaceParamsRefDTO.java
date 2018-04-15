package com.jy.modules.externalplatform.application.extinterfaceparamsref.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:接口参数映射表
 *@author Administrator
 *@version 1.0,
 *@date 2017-05-16 15:10:22
 */
public class ExtInterfaceParamsRefDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**ID*/
	private java.lang.Long id;

	/**接口编码*/
	private java.lang.String interfaceNo;

	/**参数名称*/
	private java.lang.String paramsName;

	/**参数编码*/
	private java.lang.String paramsCode;

	/**父参数编码*/
	private java.lang.String parentParams;

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
	 *方法: 获得interfaceNo
	 *@return: java.lang.String  interfaceNo
	 */
	public java.lang.String getInterfaceNo(){
		return this.interfaceNo;
	}

	/**
	 *方法: 设置interfaceNo
	 *@param: java.lang.String  interfaceNo
	 */
	public void setInterfaceNo(java.lang.String interfaceNo){
		this.interfaceNo = interfaceNo;
	}

	/**
	 *方法: 获得paramsName
	 *@return: java.lang.String  paramsName
	 */
	public java.lang.String getParamsName(){
		return this.paramsName;
	}

	/**
	 *方法: 设置paramsName
	 *@param: java.lang.String  paramsName
	 */
	public void setParamsName(java.lang.String paramsName){
		this.paramsName = paramsName;
	}

	/**
	 *方法: 获得paramsCode
	 *@return: java.lang.String  paramsCode
	 */
	public java.lang.String getParamsCode(){
		return this.paramsCode;
	}

	/**
	 *方法: 设置paramsCode
	 *@param: java.lang.String  paramsCode
	 */
	public void setParamsCode(java.lang.String paramsCode){
		this.paramsCode = paramsCode;
	}

	/**
	 *方法: 获得parentParams
	 *@return: java.lang.String  parentParams
	 */
	public java.lang.String getParentParams(){
		return this.parentParams;
	}

	/**
	 *方法: 设置parentParams
	 *@param: java.lang.String  parentParams
	 */
	public void setParentParams(java.lang.String parentParams){
		this.parentParams = parentParams;
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
}