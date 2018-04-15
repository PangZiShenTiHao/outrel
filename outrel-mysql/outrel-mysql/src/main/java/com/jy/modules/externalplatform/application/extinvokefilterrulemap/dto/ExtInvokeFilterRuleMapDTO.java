package com.jy.modules.externalplatform.application.extinvokefilterrulemap.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:外联调用挡板规则-映射表
 *@author dell
 *@version 1.0,
 *@date 2017-04-26 09:11:08
 */
public class ExtInvokeFilterRuleMapDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**ID*/
	private java.lang.Long id;

	/**规则ID*/
	private java.lang.Long ruleId;

	/**映射类型(PROD-产品;ORG-门店;FUNC-功能；GROUP-规则组)*/
	private java.lang.String mapType;

	/**映射编码*/
	private java.lang.String mapCode;
	
	/** 创建时间 */
	private java.sql.Timestamp createTime;
	
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
	 *方法: 获得ruleId
	 *@return: java.lang.Long  ruleId
	 */
	public java.lang.Long getRuleId(){
		return this.ruleId;
	}

	/**
	 *方法: 设置ruleId
	 *@param: java.lang.Long  ruleId
	 */
	public void setRuleId(java.lang.Long ruleId){
		this.ruleId = ruleId;
	}

	/**
	 *方法: 获得mapType
	 *@return: java.lang.String  mapType
	 */
	public java.lang.String getMapType(){
		return this.mapType;
	}

	/**
	 *方法: 设置mapType
	 *@param: java.lang.String  mapType
	 */
	public void setMapType(java.lang.String mapType){
		this.mapType = mapType;
	}

	/**
	 *方法: 获得mapCode
	 *@return: java.lang.String  mapCode
	 */
	public java.lang.String getMapCode(){
		return this.mapCode;
	}

	/**
	 *方法: 设置mapCode
	 *@param: java.lang.String  mapCode
	 */
	public void setMapCode(java.lang.String mapCode){
		this.mapCode = mapCode;
	}

	public java.sql.Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(java.sql.Timestamp createTime) {
		this.createTime = createTime;
	}

	public java.sql.Timestamp getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(java.sql.Timestamp modifyTime) {
		this.modifyTime = modifyTime;
	}

}