package com.jy.modules.externalplatform.drools.sysrulewhenconfig.dto;

import com.fintech.platform.core.common.BaseDTO;

public class SysRuleWhenConfigDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**主键ID*/
	private java.lang.Long id;

	/**编码*/
	private java.lang.String ruleCode;

	/**中文规则名*/
	private java.lang.String ruleNameCh;

	/**英文规则名*/
	private java.lang.String ruleNameEn;

	/**序号*/
	private java.lang.Long sequence;
	
	/**规则配置类型  1-字段比较   2-字段运算*/
	private java.lang.String ruleConfType;

	/**前括号*/
	private java.lang.String preBrackets;

	/**条件属性*/
	private java.lang.String conditionAttrEn;

	/**条件属性中文*/
	private java.lang.String conditionAttrCh;

	/**算术运算符*/
	private java.lang.String arithmeticOperator;
	
	/**关系运算符*/
	private java.lang.String operator;

	/**比较值*/
	private java.lang.String compareValueEn;

	/**比较值中文*/
	private java.lang.String compareValueCh;

	/**后括号*/
	private java.lang.String afterBrackets;

	/**逻辑操作符*/
	private java.lang.String logicalOperator;

	/**手输规则*/
	private java.lang.String manualRule;

	/**编译结果*/
	private java.lang.String compilationResult;

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
	 *方法: 获得ruleNameCh
	 *@return: java.lang.String  ruleNameCh
	 */
	public java.lang.String getRuleNameCh(){
		return this.ruleNameCh;
	}

	/**
	 *方法: 设置ruleNameCh
	 *@param: java.lang.String  ruleNameCh
	 */
	public void setRuleNameCh(java.lang.String ruleNameCh){
		this.ruleNameCh = ruleNameCh;
	}

	/**
	 *方法: 获得ruleNameEn
	 *@return: java.lang.String  ruleNameEn
	 */
	public java.lang.String getRuleNameEn(){
		return this.ruleNameEn;
	}

	/**
	 *方法: 设置ruleNameEn
	 *@param: java.lang.String  ruleNameEn
	 */
	public void setRuleNameEn(java.lang.String ruleNameEn){
		this.ruleNameEn = ruleNameEn;
	}

	/**
	 *方法: 获得sequence
	 *@return: java.lang.Long  sequence
	 */
	public java.lang.Long getSequence(){
		return this.sequence;
	}
	
	public java.lang.String getRuleConfType() {
		return ruleConfType;
	}

	public void setRuleConfType(java.lang.String ruleConfType) {
		this.ruleConfType = ruleConfType;
	}

	/**
	 *方法: 设置sequence
	 *@param: java.lang.Long  sequence
	 */
	public void setSequence(java.lang.Long sequence){
		this.sequence = sequence;
	}

	/**
	 *方法: 获得preBrackets
	 *@return: java.lang.String  preBrackets
	 */
	public java.lang.String getPreBrackets(){
		return this.preBrackets;
	}

	/**
	 *方法: 设置preBrackets
	 *@param: java.lang.String  preBrackets
	 */
	public void setPreBrackets(java.lang.String preBrackets){
		this.preBrackets = preBrackets;
	}

	/**
	 *方法: 获得conditionAttrEn
	 *@return: java.lang.String  conditionAttrEn
	 */
	public java.lang.String getConditionAttrEn(){
		return this.conditionAttrEn;
	}

	/**
	 *方法: 设置conditionAttrEn
	 *@param: java.lang.String  conditionAttrEn
	 */
	public void setConditionAttrEn(java.lang.String conditionAttrEn){
		this.conditionAttrEn = conditionAttrEn;
	}

	/**
	 *方法: 获得conditionAttrCh
	 *@return: java.lang.String  conditionAttrCh
	 */
	public java.lang.String getConditionAttrCh(){
		return this.conditionAttrCh;
	}

	/**
	 *方法: 设置conditionAttrCh
	 *@param: java.lang.String  conditionAttrCh
	 */
	public void setConditionAttrCh(java.lang.String conditionAttrCh){
		this.conditionAttrCh = conditionAttrCh;
	}
	
	public java.lang.String getArithmeticOperator() {
		return arithmeticOperator;
	}

	public void setArithmeticOperator(java.lang.String arithmeticOperator) {
		this.arithmeticOperator = arithmeticOperator;
	}

	/**
	 *方法: 获得operator
	 *@return: java.lang.String  operator
	 */
	public java.lang.String getOperator(){
		return this.operator;
	}

	/**
	 *方法: 设置operator
	 *@param: java.lang.String  operator
	 */
	public void setOperator(java.lang.String operator){
		this.operator = operator;
	}

	/**
	 *方法: 获得compareValueEn
	 *@return: java.lang.String  compareValueEn
	 */
	public java.lang.String getCompareValueEn(){
		return this.compareValueEn;
	}

	/**
	 *方法: 设置compareValueEn
	 *@param: java.lang.String  compareValueEn
	 */
	public void setCompareValueEn(java.lang.String compareValueEn){
		this.compareValueEn = compareValueEn;
	}

	/**
	 *方法: 获得compareValueCh
	 *@return: java.lang.String  compareValueCh
	 */
	public java.lang.String getCompareValueCh(){
		return this.compareValueCh;
	}

	/**
	 *方法: 设置compareValueCh
	 *@param: java.lang.String  compareValueCh
	 */
	public void setCompareValueCh(java.lang.String compareValueCh){
		this.compareValueCh = compareValueCh;
	}

	/**
	 *方法: 获得afterBrackets
	 *@return: java.lang.String  afterBrackets
	 */
	public java.lang.String getAfterBrackets(){
		return this.afterBrackets;
	}

	/**
	 *方法: 设置afterBrackets
	 *@param: java.lang.String  afterBrackets
	 */
	public void setAfterBrackets(java.lang.String afterBrackets){
		this.afterBrackets = afterBrackets;
	}

	/**
	 *方法: 获得logicalOperator
	 *@return: java.lang.String  logicalOperator
	 */
	public java.lang.String getLogicalOperator(){
		return this.logicalOperator;
	}

	/**
	 *方法: 设置logicalOperator
	 *@param: java.lang.String  logicalOperator
	 */
	public void setLogicalOperator(java.lang.String logicalOperator){
		this.logicalOperator = logicalOperator;
	}

	/**
	 *方法: 获得manualRule
	 *@return: java.lang.String  manualRule
	 */
	public java.lang.String getManualRule(){
		return this.manualRule;
	}

	/**
	 *方法: 设置manualRule
	 *@param: java.lang.String  manualRule
	 */
	public void setManualRule(java.lang.String manualRule){
		this.manualRule = manualRule;
	}

	/**
	 *方法: 获得compilationResult
	 *@return: java.lang.String  compilationResult
	 */
	public java.lang.String getCompilationResult(){
		return this.compilationResult;
	}

	/**
	 *方法: 设置compilationResult
	 *@param: java.lang.String  compilationResult
	 */
	public void setCompilationResult(java.lang.String compilationResult){
		this.compilationResult = compilationResult;
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