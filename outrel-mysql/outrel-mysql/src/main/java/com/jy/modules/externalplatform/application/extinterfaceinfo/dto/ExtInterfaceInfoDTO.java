package com.jy.modules.externalplatform.application.extinterfaceinfo.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:接口配置表
 *@author Administrator
 *@version 1.0,
 *@date 2017-05-11 14:04:24
 */
public class ExtInterfaceInfoDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**ID*/
	private java.lang.Long id;

	/**接口名称*/
	private java.lang.String interfaceName;

	/**接口编码*/
	private java.lang.String interfaceNo;

	/**接口URL*/
	private java.lang.String interfaceUrl;

	/**接口描述*/
	private java.lang.String interfaceDes;

	/**交易流水编码*/
	private java.lang.String interfaceCode;

	/**业务编码*/
	private java.lang.String businessCode;

	/**接口调用方式 例如：post、get*/
	private java.lang.String interfaceSendType;

	/**接口参数类型  例如：xml、json*/
	private java.lang.String interfaceParamsType;
	
	/**模板内容*/
	private java.lang.Object templateContent;

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

	/**EXT1*/
	private java.lang.String ext1;

	/**EXT2*/
	private java.lang.String ext2;

	/**EXT3*/
	private java.lang.String ext3;
	
	/**映射类名称*/
	private java.lang.String className;
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
	 *方法: 获得interfaceName
	 *@return: java.lang.String  interfaceName
	 */
	public java.lang.String getInterfaceName(){
		return this.interfaceName;
	}

	/**
	 *方法: 设置interfaceName
	 *@param: java.lang.String  interfaceName
	 */
	public void setInterfaceName(java.lang.String interfaceName){
		this.interfaceName = interfaceName;
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
	 *方法: 获得interfaceUrl
	 *@return: java.lang.String  interfaceUrl
	 */
	public java.lang.String getInterfaceUrl(){
		return this.interfaceUrl;
	}

	/**
	 *方法: 设置interfaceUrl
	 *@param: java.lang.String  interfaceUrl
	 */
	public void setInterfaceUrl(java.lang.String interfaceUrl){
		this.interfaceUrl = interfaceUrl;
	}

	/**
	 *方法: 获得interfaceDes
	 *@return: java.lang.String  interfaceDes
	 */
	public java.lang.String getInterfaceDes(){
		return this.interfaceDes;
	}

	/**
	 *方法: 设置interfaceDes
	 *@param: java.lang.String  interfaceDes
	 */
	public void setInterfaceDes(java.lang.String interfaceDes){
		this.interfaceDes = interfaceDes;
	}

	/**
	 *方法: 获得interfaceCode
	 *@return: java.lang.String  interfaceCode
	 */
	public java.lang.String getInterfaceCode(){
		return this.interfaceCode;
	}

	/**
	 *方法: 设置interfaceCode
	 *@param: java.lang.String  interfaceCode
	 */
	public void setInterfaceCode(java.lang.String interfaceCode){
		this.interfaceCode = interfaceCode;
	}

	/**
	 *方法: 获得businessCode
	 *@return: java.lang.String  businessCode
	 */
	public java.lang.String getBusinessCode(){
		return this.businessCode;
	}

	/**
	 *方法: 设置businessCode
	 *@param: java.lang.String  businessCode
	 */
	public void setBusinessCode(java.lang.String businessCode){
		this.businessCode = businessCode;
	}

	/**
	 *方法: 获得interfaceSendType
	 *@return: java.lang.String  interfaceSendType
	 */
	public java.lang.String getInterfaceSendType(){
		return this.interfaceSendType;
	}

	/**
	 *方法: 设置interfaceSendType
	 *@param: java.lang.String  interfaceSendType
	 */
	public void setInterfaceSendType(java.lang.String interfaceSendType){
		this.interfaceSendType = interfaceSendType;
	}

	/**
	 *方法: 获得interfaceParamsType
	 *@return: java.lang.String  interfaceParamsType
	 */
	public java.lang.String getInterfaceParamsType(){
		return this.interfaceParamsType;
	}

	/**
	 *方法: 设置interfaceParamsType
	 *@param: java.lang.String  interfaceParamsType
	 */
	public void setInterfaceParamsType(java.lang.String interfaceParamsType){
		this.interfaceParamsType = interfaceParamsType;
	}
	
	public java.lang.Object getTemplateContent() {
		return templateContent;
	}

	public void setTemplateContent(java.lang.Object templateContent) {
		this.templateContent = templateContent;
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

	

	public java.sql.Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(java.sql.Timestamp createTime) {
		this.createTime = createTime;
	}

	public java.lang.String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(java.lang.String createBy) {
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

	/**
	 *方法: 获得ext1
	 *@return: java.lang.String  ext1
	 */
	public java.lang.String getExt1(){
		return this.ext1;
	}

	/**
	 *方法: 设置ext1
	 *@param: java.lang.String  ext1
	 */
	public void setExt1(java.lang.String ext1){
		this.ext1 = ext1;
	}

	/**
	 *方法: 获得ext2
	 *@return: java.lang.String  ext2
	 */
	public java.lang.String getExt2(){
		return this.ext2;
	}

	/**
	 *方法: 设置ext2
	 *@param: java.lang.String  ext2
	 */
	public void setExt2(java.lang.String ext2){
		this.ext2 = ext2;
	}

	/**
	 *方法: 获得ext3
	 *@return: java.lang.String  ext3
	 */
	public java.lang.String getExt3(){
		return this.ext3;
	}

	/**
	 *方法: 设置ext3
	 *@param: java.lang.String  ext3
	 */
	public void setExt3(java.lang.String ext3){
		this.ext3 = ext3;
	}

	public java.lang.String getClassName() {
		return className;
	}

	public void setClassName(java.lang.String className) {
		this.className = className;
	}
	
}