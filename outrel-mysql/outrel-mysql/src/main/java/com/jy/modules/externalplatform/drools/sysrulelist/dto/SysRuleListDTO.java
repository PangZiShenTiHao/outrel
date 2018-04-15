package com.jy.modules.externalplatform.drools.sysrulelist.dto;

import java.util.List;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.drools.sysrulethenconfig.dto.SysRuleThenConfigDTO;
import com.jy.modules.externalplatform.drools.sysrulewhenconfig.dto.SysRuleWhenConfigDTO;
/**
 *@Description:规则集
 *@author dell
 *@version 1.0,
 *@date 2017-04-07 10:58:42
 */
public class SysRuleListDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**ID*/
	private java.lang.Long id;

	/**类型：1 规则库  2规则集 3规则包 4规则*/
	private java.lang.String ruleType;

	/**中文名*/
	private java.lang.String chName;

	/**英文名：如果是规则库或规则包不需要设置英文名，规则集对应drl文件名*/
	private java.lang.String enName;

	/**生效时间，只有规则集才需要设置此值*/
	private java.util.Date eftectTime;

	/**有效状态*/
	private java.lang.String validateState;

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

	/**此版本是否修改：1 是 0否 ，默认值为0*/
	private java.lang.Long newVersionIsUpdate;

	/**EXPIRES_TIME*/
	private java.util.Date expiresTime;
	
	private List<SysRuleWhenConfigDTO> whenConfigs;
	
	private SysRuleThenConfigDTO thenConfig;

	private List<SysRuleListDTO> rulePackages;
	
	/**规则定义*/
	private String ruleResource;
	
	/**定义类型 DRL*/
    private String resourceType;
    
    /**乐观锁*/
    private Long version;
    /**为了查询添加字段*/
    /**规则库名称*/
    private java.lang.String ruleBaseName;
    
    /**规则库编码*/
    private java.lang.String ruleBaseCode;
    
    /**规则集名称*/
    private java.lang.String ruleGroupName;
    
    /**规则集编码*/
    private java.lang.String ruleGroupCode;
    
    /**规则名称*/
    private java.lang.String ruleName;

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
	 *方法: 获得ruleType
	 *@return: java.lang.String  ruleType
	 */
	public java.lang.String getRuleType(){
		return this.ruleType;
	}

	/**
	 *方法: 设置ruleType
	 *@param: java.lang.String  ruleType
	 */
	public void setRuleType(java.lang.String ruleType){
		this.ruleType = ruleType;
	}

	/**
	 *方法: 获得chName
	 *@return: java.lang.String  chName
	 */
	public java.lang.String getChName(){
		return this.chName;
	}

	/**
	 *方法: 设置chName
	 *@param: java.lang.String  chName
	 */
	public void setChName(java.lang.String chName){
		this.chName = chName;
	}

	/**
	 *方法: 获得enName
	 *@return: java.lang.String  enName
	 */
	public java.lang.String getEnName(){
		return this.enName;
	}

	/**
	 *方法: 设置enName
	 *@param: java.lang.String  enName
	 */
	public void setEnName(java.lang.String enName){
		this.enName = enName;
	}

	/**
	 *方法: 获得eftectTime
	 *@return: java.util.Date  eftectTime
	 */
	public java.util.Date getEftectTime(){
		return this.eftectTime;
	}

	/**
	 *方法: 设置eftectTime
	 *@param: java.util.Date  eftectTime
	 */
	public void setEftectTime(java.util.Date eftectTime){
		this.eftectTime = eftectTime;
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
	 *方法: 获得expiresTime
	 *@return: java.util.Date  expiresTime
	 */
	public java.util.Date getExpiresTime(){
		return this.expiresTime;
	}

	/**
	 *方法: 设置expiresTime
	 *@param: java.util.Date  expiresTime
	 */
	public void setExpiresTime(java.util.Date expiresTime){
		this.expiresTime = expiresTime;
	}

	public List<SysRuleWhenConfigDTO> getWhenConfigs() {
		return whenConfigs;
	}

	public void setWhenConfigs(List<SysRuleWhenConfigDTO> whenConfigs) {
		this.whenConfigs = whenConfigs;
	}

	public SysRuleThenConfigDTO getThenConfig() {
		return thenConfig;
	}

	public void setThenConfig(SysRuleThenConfigDTO thenConfig) {
		this.thenConfig = thenConfig;
	}

	public List<SysRuleListDTO> getRulePackages() {
		return rulePackages;
	}

	public void setRulePackages(List<SysRuleListDTO> rulePackages) {
		this.rulePackages = rulePackages;
	}

	public String getRuleResource() {
		return ruleResource;
	}

	public void setRuleResource(String ruleResource) {
		this.ruleResource = ruleResource;
	}

	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	public java.lang.String getRuleBaseName() {
		return ruleBaseName;
	}

	public void setRuleBaseName(java.lang.String ruleBaseName) {
		this.ruleBaseName = ruleBaseName;
	}

	public java.lang.String getRuleBaseCode() {
		return ruleBaseCode;
	}

	public void setRuleBaseCode(java.lang.String ruleBaseCode) {
		this.ruleBaseCode = ruleBaseCode;
	}

	public java.lang.String getRuleGroupName() {
		return ruleGroupName;
	}

	public void setRuleGroupName(java.lang.String ruleGroupName) {
		this.ruleGroupName = ruleGroupName;
	}

	public java.lang.String getRuleGroupCode() {
		return ruleGroupCode;
	}

	public void setRuleGroupCode(java.lang.String ruleGroupCode) {
		this.ruleGroupCode = ruleGroupCode;
	}

	public java.lang.String getRuleName() {
		return ruleName;
	}

	public void setRuleName(java.lang.String ruleName) {
		this.ruleName = ruleName;
	}
	
}