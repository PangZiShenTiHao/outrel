package com.jy.modules.externalplatform.interfacerest.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:调用接口日志表
 *@author Administrator
 *@version 1.0,
 *@date 2017-05-17 17:59:40
 */
public class ExtInterfaceLogDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**主键*/
	private java.lang.Long id;
	
	/**机构编码*/
	private java.lang.String reqOrgCode;
	
	/**产品编码*/
	private java.lang.String reqProCode;
	
	/**功能点*/
	private java.lang.String reqFuncCode;
	
	/**证件号*/
	private java.lang.String reqCardId;

	/**请求交易流水号*/
	private java.lang.String reqTransNo;

	/**接口编码*/
	private java.lang.String interfaceNo;

	/**业务编码*/
	private java.lang.String businessCode;

	/**请求时间*/
	private java.sql.Timestamp reqTime;
	/**请求时间*/
	private java.sql.Timestamp reqStartTime;
	/**请求时间*/
	private java.sql.Timestamp reqEndTime;

	/**返回码*/
	private java.lang.String retCode;

	/**返回信息*/
	private java.lang.String retMsg;

	/**返回时间*/
	private java.sql.Timestamp retTime;

	/**请求报文体*/
	private java.lang.String reqBody;

	/**返回报文体*/
	private java.lang.String retBody;
	
	/**父ID*/
	private java.lang.String parentId;

	/**EXT1*/
	private java.lang.String ext1;

	/**EXT2*/
	private java.lang.String ext2;

	/**EXT3*/
	private java.lang.String ext3;

	/**EXT4*/
	private java.lang.String ext4;

	/**EXT5*/
	private java.lang.String ext5;

	/**EXT6*/
	private java.lang.String ext6;

	/**EXT7*/
	private java.lang.String ext7;

	/**EXT8*/
	private java.lang.String ext8;

	/**EXT9*/
	private java.lang.String ext9;

	/**EXT10*/
	private java.lang.String ext10;
	
	/**机构名称*/
	private java.lang.String orgName;
	
	/**产品名称*/
	private java.lang.String productName;
	
	/**系统名称*/
	private java.lang.String sysName;
	
	/**系统编码*/
	private java.lang.String sysCode;
	
	/**功能模块名称*/
	private java.lang.String funcTypeName;
	
	/**功能模块*/
	private java.lang.String funcTypeCode;
	
	/**功能点名称*/
	private java.lang.String reqFuncTypeName;
	//报表统计使用字段
	/**成功次数*/
	private java.lang.String successNum;
	
	/**失败次数*/
	private java.lang.String failNum;
	
	/**总数*/
	private java.lang.String total;
	
	/**故障次数*/
	private java.lang.String errorNum;
	
	/**成功返回次数*/
	private java.lang.String successRelNum;
	
	/**成功次数字典编码*/
	private java.lang.String successCode;
	
	/**失败次数自点编码*/
	private java.lang.String failCode;
	
	/**成功返回次数字典编码*/
	private java.lang.String successRelCode;
	
	/**成功状态字典编码*/
	private java.lang.String successStatus;
	
	/**失败状态自点编码*/
	private java.lang.String failStatus;
	
	/**故障状态字典编码*/
	private java.lang.String errorStatus;

	/**成功返回状态字典编码*/
	private java.lang.String successRelStatus;
	/**创建时间*/
	private java.sql.Timestamp createTime;	
	/**修改时间*/
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

	public java.lang.String getReqOrgCode() {
		return reqOrgCode;
	}

	public void setReqOrgCode(java.lang.String reqOrgCode) {
		this.reqOrgCode = reqOrgCode;
	}

	public java.lang.String getReqProCode() {
		return reqProCode;
	}

	public void setReqProCode(java.lang.String reqProCode) {
		this.reqProCode = reqProCode;
	}
	
	public java.lang.String getReqFuncCode() {
		return reqFuncCode;
	}

	public void setReqFuncCode(java.lang.String reqFuncCode) {
		this.reqFuncCode = reqFuncCode;
	}

	public java.lang.String getReqCardId() {
		return reqCardId;
	}

	public void setReqCardId(java.lang.String reqCardId) {
		this.reqCardId = reqCardId;
	}

	/**
	 *方法: 获得reqTransNo
	 *@return: java.lang.String  reqTransNo
	 */
	public java.lang.String getReqTransNo(){
		return this.reqTransNo;
	}

	/**
	 *方法: 设置reqTransNo
	 *@param: java.lang.String  reqTransNo
	 */
	public void setReqTransNo(java.lang.String reqTransNo){
		this.reqTransNo = reqTransNo;
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
	 *方法: 获得reqTime
	 *@return: java.sql.Timestamp  reqTime
	 */
	public java.sql.Timestamp getReqTime(){
		return this.reqTime;
	}

	/**
	 *方法: 设置reqTime
	 *@param: java.sql.Timestamp  reqTime
	 */
	public void setReqTime(java.sql.Timestamp reqTime){
		this.reqTime = reqTime;
	}

	public java.sql.Timestamp getReqStartTime() {
		return reqStartTime;
	}

	public void setReqStartTime(java.sql.Timestamp reqStartTime) {
		this.reqStartTime = reqStartTime;
	}

	public java.sql.Timestamp getReqEndTime() {
		return reqEndTime;
	}

	public void setReqEndTime(java.sql.Timestamp reqEndTime) {
		this.reqEndTime = reqEndTime;
	}

	/**
	 *方法: 获得retCode
	 *@return: java.lang.String  retCode
	 */
	public java.lang.String getRetCode(){
		return this.retCode;
	}

	/**
	 *方法: 设置retCode
	 *@param: java.lang.String  retCode
	 */
	public void setRetCode(java.lang.String retCode){
		this.retCode = retCode;
	}

	/**
	 *方法: 获得retMsg
	 *@return: java.lang.String  retMsg
	 */
	public java.lang.String getRetMsg(){
		return this.retMsg;
	}

	/**
	 *方法: 设置retMsg
	 *@param: java.lang.String  retMsg
	 */
	public void setRetMsg(java.lang.String retMsg){
		this.retMsg = retMsg;
	}

	/**
	 *方法: 获得retTime
	 *@return: java.sql.Timestamp  retTime
	 */
	public java.sql.Timestamp getRetTime(){
		return this.retTime;
	}

	/**
	 *方法: 设置retTime
	 *@param: java.sql.Timestamp  retTime
	 */
	public void setRetTime(java.sql.Timestamp retTime){
		this.retTime = retTime;
	}

	/**
	 *方法: 获得reqBody
	 *@return: java.lang.String  reqBody
	 */
	public java.lang.String getReqBody(){
		return this.reqBody;
	}

	/**
	 *方法: 设置reqBody
	 *@param: java.lang.String  reqBody
	 */
	public void setReqBody(java.lang.String reqBody){
		this.reqBody = reqBody;
	}

	/**
	 *方法: 获得retBody
	 *@return: java.lang.String  retBody
	 */
	public java.lang.String getRetBody(){
		return this.retBody;
	}

	/**
	 *方法: 设置retBody
	 *@param: java.lang.String  retBody
	 */
	public void setRetBody(java.lang.String retBody){
		this.retBody = retBody;
	}

	public java.lang.String getParentId() {
		return parentId;
	}

	public void setParentId(java.lang.String parentId) {
		this.parentId = parentId;
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

	/**
	 *方法: 获得ext5
	 *@return: java.lang.String  ext5
	 */
	public java.lang.String getExt5(){
		return this.ext5;
	}

	/**
	 *方法: 设置ext5
	 *@param: java.lang.String  ext5
	 */
	public void setExt5(java.lang.String ext5){
		this.ext5 = ext5;
	}

	/**
	 *方法: 获得ext6
	 *@return: java.lang.String  ext6
	 */
	public java.lang.String getExt6(){
		return this.ext6;
	}

	/**
	 *方法: 设置ext6
	 *@param: java.lang.String  ext6
	 */
	public void setExt6(java.lang.String ext6){
		this.ext6 = ext6;
	}

	/**
	 *方法: 获得ext7
	 *@return: java.lang.String  ext7
	 */
	public java.lang.String getExt7(){
		return this.ext7;
	}

	/**
	 *方法: 设置ext7
	 *@param: java.lang.String  ext7
	 */
	public void setExt7(java.lang.String ext7){
		this.ext7 = ext7;
	}

	/**
	 *方法: 获得ext8
	 *@return: java.lang.String  ext8
	 */
	public java.lang.String getExt8(){
		return this.ext8;
	}

	/**
	 *方法: 设置ext8
	 *@param: java.lang.String  ext8
	 */
	public void setExt8(java.lang.String ext8){
		this.ext8 = ext8;
	}

	/**
	 *方法: 获得ext9
	 *@return: java.lang.String  ext9
	 */
	public java.lang.String getExt9(){
		return this.ext9;
	}

	/**
	 *方法: 设置ext9
	 *@param: java.lang.String  ext9
	 */
	public void setExt9(java.lang.String ext9){
		this.ext9 = ext9;
	}

	/**
	 *方法: 获得ext10
	 *@return: java.lang.String  ext10
	 */
	public java.lang.String getExt10(){
		return this.ext10;
	}

	/**
	 *方法: 设置ext10
	 *@param: java.lang.String  ext10
	 */
	public void setExt10(java.lang.String ext10){
		this.ext10 = ext10;
	}

	public java.lang.String getOrgName() {
		return orgName;
	}

	public void setOrgName(java.lang.String orgName) {
		this.orgName = orgName;
	}

	public java.lang.String getProductName() {
		return productName;
	}

	public void setProductName(java.lang.String productName) {
		this.productName = productName;
	}

	public java.lang.String getSysName() {
		return sysName;
	}

	public void setSysName(java.lang.String sysName) {
		this.sysName = sysName;
	}

	public java.lang.String getSysCode() {
		return sysCode;
	}

	public void setSysCode(java.lang.String sysCode) {
		this.sysCode = sysCode;
	}

	public java.lang.String getFuncTypeName() {
		return funcTypeName;
	}

	public void setFuncTypeName(java.lang.String funcTypeName) {
		this.funcTypeName = funcTypeName;
	}

	public java.lang.String getFuncTypeCode() {
		return funcTypeCode;
	}

	public void setFuncTypeCode(java.lang.String funcTypeCode) {
		this.funcTypeCode = funcTypeCode;
	}

	public java.lang.String getReqFuncTypeName() {
		return reqFuncTypeName;
	}

	public void setReqFuncTypeName(java.lang.String reqFuncTypeName) {
		this.reqFuncTypeName = reqFuncTypeName;
	}

	public java.lang.String getSuccessNum() {
		return successNum;
	}

	public void setSuccessNum(java.lang.String successNum) {
		this.successNum = successNum;
	}

	public java.lang.String getFailNum() {
		return failNum;
	}

	public void setFailNum(java.lang.String failNum) {
		this.failNum = failNum;
	}

	public java.lang.String getTotal() {
		return total;
	}

	public void setTotal(java.lang.String total) {
		this.total = total;
	}

	public java.lang.String getErrorNum() {
		return errorNum;
	}

	public void setErrorNum(java.lang.String errorNum) {
		this.errorNum = errorNum;
	}

	public java.lang.String getSuccessRelNum() {
		return successRelNum;
	}

	public void setSuccessRelNum(java.lang.String successRelNum) {
		this.successRelNum = successRelNum;
	}

	public java.lang.String getSuccessCode() {
		return successCode;
	}

	public void setSuccessCode(java.lang.String successCode) {
		this.successCode = successCode;
	}

	public java.lang.String getFailCode() {
		return failCode;
	}

	public void setFailCode(java.lang.String failCode) {
		this.failCode = failCode;
	}

	public java.lang.String getSuccessRelCode() {
		return successRelCode;
	}

	public void setSuccessRelCode(java.lang.String successRelCode) {
		this.successRelCode = successRelCode;
	}

	public java.lang.String getSuccessStatus() {
		return successStatus;
	}

	public void setSuccessStatus(java.lang.String successStatus) {
		this.successStatus = successStatus;
	}

	public java.lang.String getFailStatus() {
		return failStatus;
	}

	public void setFailStatus(java.lang.String failStatus) {
		this.failStatus = failStatus;
	}

	public java.lang.String getErrorStatus() {
		return errorStatus;
	}

	public void setErrorStatus(java.lang.String errorStatus) {
		this.errorStatus = errorStatus;
	}

	public java.lang.String getSuccessRelStatus() {
		return successRelStatus;
	}

	public void setSuccessRelStatus(java.lang.String successRelStatus) {
		this.successRelStatus = successRelStatus;
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