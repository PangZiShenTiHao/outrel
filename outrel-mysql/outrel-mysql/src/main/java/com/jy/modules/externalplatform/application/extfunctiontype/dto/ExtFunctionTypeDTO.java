package com.jy.modules.externalplatform.application.extfunctiontype.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:外联平台功能类型表
 *@author dell
 *@version 1.0,
 *@date 2017-04-06 14:24:35
 */
public class ExtFunctionTypeDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**主键*/
	private java.lang.Long id;

	/**功能类型*/
	private java.lang.String funcType;

	/**功能类型唯一编码*/
	private java.lang.String funcTypeCode;

	/**功能类型中文描述*/
	private java.lang.String funcTypeName;

	/**父节点ID*/
	private java.lang.Long parentId;

	/**有效性状态，1有效，0无效*/
	private java.lang.String validateState;

	/**同级别的展示顺序*/
	private java.lang.Long showOrder;

	/**功能类型级别*/
	private java.lang.Long typeLevel;
	
	/**系统编码*/
	private java.lang.String sysCode;
	
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
	 *方法: 获得funcType
	 *@return: java.lang.String  funcType
	 */
	public java.lang.String getFuncType(){
		return this.funcType;
	}

	/**
	 *方法: 设置funcType
	 *@param: java.lang.String  funcType
	 */
	public void setFuncType(java.lang.String funcType){
		this.funcType = funcType;
	}

	/**
	 *方法: 获得funcTypeCode
	 *@return: java.lang.String  funcTypeCode
	 */
	public java.lang.String getFuncTypeCode(){
		return this.funcTypeCode;
	}

	/**
	 *方法: 设置funcTypeCode
	 *@param: java.lang.String  funcTypeCode
	 */
	public void setFuncTypeCode(java.lang.String funcTypeCode){
		this.funcTypeCode = funcTypeCode;
	}

	/**
	 *方法: 获得funcTypeName
	 *@return: java.lang.String  funcTypeName
	 */
	public java.lang.String getFuncTypeName(){
		return this.funcTypeName;
	}

	/**
	 *方法: 设置funcTypeName
	 *@param: java.lang.String  funcTypeName
	 */
	public void setFuncTypeName(java.lang.String funcTypeName){
		this.funcTypeName = funcTypeName;
	}

	/**
	 *方法: 获得parentId
	 *@return: java.lang.Long  parentId
	 */
	public java.lang.Long getParentId(){
		return this.parentId;
	}

	/**
	 *方法: 设置parentId
	 *@param: java.lang.Long  parentId
	 */
	public void setParentId(java.lang.Long parentId){
		this.parentId = parentId;
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
	 *方法: 获得showOrder
	 *@return: java.lang.Long  showOrder
	 */
	public java.lang.Long getShowOrder(){
		return this.showOrder;
	}

	/**
	 *方法: 设置showOrder
	 *@param: java.lang.Long  showOrder
	 */
	public void setShowOrder(java.lang.Long showOrder){
		this.showOrder = showOrder;
	}

	/**
	 *方法: 获得typeLevel
	 *@return: java.lang.Long  typeLevel
	 */
	public java.lang.Long getTypeLevel(){
		return this.typeLevel;
	}

	/**
	 *方法: 设置typeLevel
	 *@param: java.lang.Long  typeLevel
	 */
	public void setTypeLevel(java.lang.Long typeLevel){
		this.typeLevel = typeLevel;
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

	public java.lang.String getSysCode() {
		return sysCode;
	}

	public void setSysCode(java.lang.String sysCode) {
		this.sysCode = sysCode;
	}

	public java.lang.Long getCreateBy() {
		return createBy;
	}

	public void setCreateBy(java.lang.Long createBy) {
		this.createBy = createBy;
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