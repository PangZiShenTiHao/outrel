 package com.jy.modules.externalplatform.drools.sysrulethenconfig.dto;

import com.fintech.platform.core.common.BaseDTO;
 
 /**
 *@Description:规则执行表
 *@author dell
 *@version 1.0,
 *@date 2017-03-27 17:07:48
 */
public class SysRuleThenConfigDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**主键ID*/
	private java.lang.Long id;

	/**执行代码*/
	private java.lang.String excutionCode;

	/**编码*/
	private java.lang.String ruleCode;

	/**备注*/
	private java.lang.String remark;

	/**创建人*/
	private java.lang.String createUser;

	/**创建时间*/
	private java.util.Date createDate;

	/**修改人*/
	private java.lang.String updateUser;

	/**修改时间*/
	private java.util.Date updateDate;

	/**版本号*/
	private java.lang.String versionNum;

	/**此版本是否修改：1 是 0否 ，默认值为0*/
	private java.lang.Long newVersionIsUpdate;

	/**帮助信息，保存一条规则时，自动生成帮助信息*/
	private java.lang.String help;

	/**有效性状态，1有效，0无效，默认1*/
	private java.lang.String validateState;

	/**规则表的规则编码*/
	private java.lang.String parentCode;

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
	 *方法: 获得excutionCode
	 *@return: java.lang.String  excutionCode
	 */
	public java.lang.String getExcutionCode(){
		return this.excutionCode;
	}

	/**
	 *方法: 设置excutionCode
	 *@param: java.lang.String  excutionCode
	 */
	public void setExcutionCode(java.lang.String excutionCode){
		this.excutionCode = excutionCode;
	}

	/**
	 *方法: 获得ruleCode
	 *@return: java.lang.String  ruleCode
	 */
	public java.lang.String getRuleCode(){
		return this.ruleCode;
	}

	/**
	 *方法: 设置ruleCode
	 *@param: java.lang.String  ruleCode
	 */
	public void setRuleCode(java.lang.String ruleCode){
		this.ruleCode = ruleCode;
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

	/**
	 *方法: 获得createUser
	 *@return: java.lang.String  createUser
	 */
	public java.lang.String getCreateUser(){
		return this.createUser;
	}

	/**
	 *方法: 设置createUser
	 *@param: java.lang.String  createUser
	 */
	public void setCreateUser(java.lang.String createUser){
		this.createUser = createUser;
	}

	/**
	 *方法: 获得createDate
	 *@return: java.util.Date  createDate
	 */
	public java.util.Date getCreateDate(){
		return this.createDate;
	}

	/**
	 *方法: 设置createDate
	 *@param: java.util.Date  createDate
	 */
	public void setCreateDate(java.util.Date createDate){
		this.createDate = createDate;
	}

	/**
	 *方法: 获得updateUser
	 *@return: java.lang.String  updateUser
	 */
	public java.lang.String getUpdateUser(){
		return this.updateUser;
	}

	/**
	 *方法: 设置updateUser
	 *@param: java.lang.String  updateUser
	 */
	public void setUpdateUser(java.lang.String updateUser){
		this.updateUser = updateUser;
	}

	/**
	 *方法: 获得updateDate
	 *@return: java.util.Date  updateDate
	 */
	public java.util.Date getUpdateDate(){
		return this.updateDate;
	}

	/**
	 *方法: 设置updateDate
	 *@param: java.util.Date  updateDate
	 */
	public void setUpdateDate(java.util.Date updateDate){
		this.updateDate = updateDate;
	}

	/**
	 *方法: 获得versionNum
	 *@return: java.lang.String  versionNum
	 */
	public java.lang.String getVersionNum(){
		return this.versionNum;
	}

	/**
	 *方法: 设置versionNum
	 *@param: java.lang.String  versionNum
	 */
	public void setVersionNum(java.lang.String versionNum){
		this.versionNum = versionNum;
	}

	/**
	 *方法: 获得newVersionIsUpdate
	 *@return: java.lang.Long  newVersionIsUpdate
	 */
	public java.lang.Long getNewVersionIsUpdate(){
		return this.newVersionIsUpdate;
	}

	/**
	 *方法: 设置newVersionIsUpdate
	 *@param: java.lang.Long  newVersionIsUpdate
	 */
	public void setNewVersionIsUpdate(java.lang.Long newVersionIsUpdate){
		this.newVersionIsUpdate = newVersionIsUpdate;
	}

	/**
	 *方法: 获得help
	 *@return: java.lang.String  help
	 */
	public java.lang.String getHelp(){
		return this.help;
	}

	/**
	 *方法: 设置help
	 *@param: java.lang.String  help
	 */
	public void setHelp(java.lang.String help){
		this.help = help;
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
	 *方法: 获得parentCode
	 *@return: java.lang.String  parentCode
	 */
	public java.lang.String getParentCode(){
		return this.parentCode;
	}

	/**
	 *方法: 设置parentCode
	 *@param: java.lang.String  parentCode
	 */
	public void setParentCode(java.lang.String parentCode){
		this.parentCode = parentCode;
	}

}