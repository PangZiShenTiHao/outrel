package com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:进件筛选规则-映射表
 *@author JY-IT-D001
 *@version 1.0,
 *@date 2016-01-07 11:21:19
 */
public class LbtIntoFilterRuleMapDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**ID*/
	private java.lang.Long id;

	/**规则ID*/
	private java.lang.Long ruleId;

	/**映射类型*/
	private java.lang.String mapType;

	/**映射编码*/
	private java.lang.String mapCode;

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

}