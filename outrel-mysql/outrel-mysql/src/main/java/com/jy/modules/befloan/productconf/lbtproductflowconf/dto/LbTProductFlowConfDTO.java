package com.jy.modules.befloan.productconf.lbtproductflowconf.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:产品流程配置表
 *@author JY-IT-D001
 *@version 1.0,
 *@date 2014-12-23 13:39:46
 */
public class LbTProductFlowConfDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**主键*/
	private java.lang.Long id;

	/**产品基础信息主键ID*/
	private java.lang.String fkProConfId;;

	/**信审流程编码*/
	private java.lang.String creditAuditFlowCode;

	/**复议流程编码*/
	private java.lang.String reconsiderationFlowCode;

	/**稽核流程编码*/
	private java.lang.String auditFlowCode;

	/**信审审批系统自动同意(1:是,0:否)*/
	private java.lang.String creditApproveAutoPass;

	/**信审审批系统自动拒绝(1:是,0:否)*/
	private java.lang.String creditApproveAutoReject;

	/**合同是否自动审核通过(1:是,0:否)*/
	private java.lang.String contractApproveAutoPass;

	/**EXT1*/
	private java.lang.String ext1;

	/**EXT2*/
	private java.lang.String ext2;

	/**EXT3*/
	private java.lang.String ext3;

	/**EXT4*/
	private java.lang.String ext4;
	
	/**是否允许调整签约额度期限 0否 1是*/
	private String adjustMoneyPeroid;
	
	/**信审审批是否展示保险类型与授权依据*/
	private java.lang.String ext5;
	
	/**是否允许向大调整签约额度*/
	private java.lang.String adjustLargeMoney;
	
	/**是否允许向小调整签约额度*/
	private java.lang.String adjustLittleMoney;
	
	/**是否允许向大调整签约期限*/
	private java.lang.String adjustLargePeroid;
	
	/**是否允许向小调整签约期限*/
	private java.lang.String adjustLittlePeroid;

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
	 *方法: 获得fkProConfId
	 *@return: java.lang.Long  fkProConfId
	 */
	public java.lang.String getFkProConfId(){
		return this.fkProConfId;
	}

	/**
	 *方法: 设置fkProConfId
	 *@param: java.lang.Long  fkProConfId
	 */
	public void setFkProConfId(java.lang.String fkProConfId){
		this.fkProConfId = fkProConfId;
	}

	/**
	 *方法: 获得creditAuditFlowCode
	 *@return: java.lang.String  creditAuditFlowCode
	 */
	public java.lang.String getCreditAuditFlowCode(){
		return this.creditAuditFlowCode;
	}

	/**
	 *方法: 设置creditAuditFlowCode
	 *@param: java.lang.String  creditAuditFlowCode
	 */
	public void setCreditAuditFlowCode(java.lang.String creditAuditFlowCode){
		this.creditAuditFlowCode = creditAuditFlowCode;
	}

	/**
	 *方法: 获得reconsiderationFlowCode
	 *@return: java.lang.String  reconsiderationFlowCode
	 */
	public java.lang.String getReconsiderationFlowCode(){
		return this.reconsiderationFlowCode;
	}

	/**
	 *方法: 设置reconsiderationFlowCode
	 *@param: java.lang.String  reconsiderationFlowCode
	 */
	public void setReconsiderationFlowCode(java.lang.String reconsiderationFlowCode){
		this.reconsiderationFlowCode = reconsiderationFlowCode;
	}

	/**
	 *方法: 获得auditFlowCode
	 *@return: java.lang.String  auditFlowCode
	 */
	public java.lang.String getAuditFlowCode(){
		return this.auditFlowCode;
	}

	/**
	 *方法: 设置auditFlowCode
	 *@param: java.lang.String  auditFlowCode
	 */
	public void setAuditFlowCode(java.lang.String auditFlowCode){
		this.auditFlowCode = auditFlowCode;
	}

	/**
	 *方法: 获得creditApproveAutoPass
	 *@return: java.lang.String  creditApproveAutoPass
	 */
	public java.lang.String getCreditApproveAutoPass(){
		return this.creditApproveAutoPass;
	}

	/**
	 *方法: 设置creditApproveAutoPass
	 *@param: java.lang.String  creditApproveAutoPass
	 */
	public void setCreditApproveAutoPass(java.lang.String creditApproveAutoPass){
		this.creditApproveAutoPass = creditApproveAutoPass;
	}

	/**
	 *方法: 获得creditApproveAutoReject
	 *@return: java.lang.String  creditApproveAutoReject
	 */
	public java.lang.String getCreditApproveAutoReject(){
		return this.creditApproveAutoReject;
	}

	/**
	 *方法: 设置creditApproveAutoReject
	 *@param: java.lang.String  creditApproveAutoReject
	 */
	public void setCreditApproveAutoReject(java.lang.String creditApproveAutoReject){
		this.creditApproveAutoReject = creditApproveAutoReject;
	}

	/**
	 *方法: 获得contractApproveAutoPass
	 *@return: java.lang.String  contractApproveAutoPass
	 */
	public java.lang.String getContractApproveAutoPass(){
		return this.contractApproveAutoPass;
	}

	/**
	 *方法: 设置contractApproveAutoPass
	 *@param: java.lang.String  contractApproveAutoPass
	 */
	public void setContractApproveAutoPass(java.lang.String contractApproveAutoPass){
		this.contractApproveAutoPass = contractApproveAutoPass;
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

	/**
	 *方法: 获得ext4
	 *@return: java.lang.String  ext4
	 */
	public java.lang.String getExt4(){
		return this.ext4;
	}

	/**
	 *方法: 设置ext4
	 *@param: java.lang.String  ext4
	 */
	public void setExt4(java.lang.String ext4){
		this.ext4 = ext4;
	}

	public String getAdjustMoneyPeroid() {
		return adjustMoneyPeroid;
	}

	public void setAdjustMoneyPeroid(String adjustMoneyPeroid) {
		this.adjustMoneyPeroid = adjustMoneyPeroid;
	}

	public java.lang.String getExt5() {
		return ext5;
	}

	public void setExt5(java.lang.String ext5) {
		this.ext5 = ext5;
	}

	public java.lang.String getAdjustLargeMoney() {
		return adjustLargeMoney;
	}

	public void setAdjustLargeMoney(java.lang.String adjustLargeMoney) {
		this.adjustLargeMoney = adjustLargeMoney;
	}

	public java.lang.String getAdjustLittleMoney() {
		return adjustLittleMoney;
	}

	public void setAdjustLittleMoney(java.lang.String adjustLittleMoney) {
		this.adjustLittleMoney = adjustLittleMoney;
	}

	public java.lang.String getAdjustLargePeroid() {
		return adjustLargePeroid;
	}

	public void setAdjustLargePeroid(java.lang.String adjustLargePeroid) {
		this.adjustLargePeroid = adjustLargePeroid;
	}

	public java.lang.String getAdjustLittlePeroid() {
		return adjustLittlePeroid;
	}

	public void setAdjustLittlePeroid(java.lang.String adjustLittlePeroid) {
		this.adjustLittlePeroid = adjustLittlePeroid;
	}
}