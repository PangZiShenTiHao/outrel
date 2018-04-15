package com.jy.modules.externalplatform.application.extindexmoduletype.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:指标模型
 *@author dell
 *@version 1.0,
 *@date 2017-05-17 09:55:44
 */
public class ExtIndexModuleTypeDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**主键*/
	private java.lang.Long id;

	/**模块类型*/
	private java.lang.String moduleType;

	/**模块类型唯一编码*/
	private java.lang.String moduleTypeCode;

	/**模块类型中文描述*/
	private java.lang.String moduleTypeName;

	/**父节点ID*/
	private java.lang.Long parentId;

	/**有效性状态，1有效，0无效*/
	private java.lang.String validateState;

	/**同级别的展示顺序*/
	private java.lang.Long showOrder;

	/**模块类型级别*/
	private java.lang.Long typeLevel;

	/**创建时间*/
	private java.sql.Timestamp createTime;
	
	/**创建人*/
	private java.lang.Long createBy;

	/**修改时间*/
	private java.sql.Timestamp modifyTime;

	/**修改人*/
	private java.lang.Long modifyBy;

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
	 *方法: 获得moduleType
	 *@return: java.lang.String  moduleType
	 */
	public java.lang.String getModuleType(){
		return this.moduleType;
	}

	/**
	 *方法: 设置moduleType
	 *@param: java.lang.String  moduleType
	 */
	public void setModuleType(java.lang.String moduleType){
		this.moduleType = moduleType;
	}

	/**
	 *方法: 获得moduleTypeCode
	 *@return: java.lang.String  moduleTypeCode
	 */
	public java.lang.String getModuleTypeCode(){
		return this.moduleTypeCode;
	}

	/**
	 *方法: 设置moduleTypeCode
	 *@param: java.lang.String  moduleTypeCode
	 */
	public void setModuleTypeCode(java.lang.String moduleTypeCode){
		this.moduleTypeCode = moduleTypeCode;
	}

	/**
	 *方法: 获得moduleTypeName
	 *@return: java.lang.String  moduleTypeName
	 */
	public java.lang.String getModuleTypeName(){
		return this.moduleTypeName;
	}

	/**
	 *方法: 设置moduleTypeName
	 *@param: java.lang.String  moduleTypeName
	 */
	public void setModuleTypeName(java.lang.String moduleTypeName){
		this.moduleTypeName = moduleTypeName;
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

	public java.lang.Long getCreateBy() {
		return createBy;
	}

	public void setCreateBy(java.lang.Long createBy) {
		this.createBy = createBy;
	}

	public java.sql.Timestamp getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(java.sql.Timestamp modifyTime) {
		this.modifyTime = modifyTime;
	}

	public java.lang.Long getModifyBy() {
		return modifyBy;
	}

	public void setModifyBy(java.lang.Long modifyBy) {
		this.modifyBy = modifyBy;
	}

	
    
}