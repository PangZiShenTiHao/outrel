package com.jy.modules.externalplatform.application.exttransferlog.dto;

import com.fintech.platform.core.common.BaseDTO;
/**
 *@Description:EXT_TRANSFER_LOG
 *@author dell
 *@version 1.0,
 *@date 2016-02-23 15:22:21
 */
public class ExtTransferLogDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**主键*/
	private java.lang.Long id;

	/**请求交易流水号*/
	private java.lang.String reqTransNo;

	/**接口类型*/
	private java.lang.String interfaceType;

	/**接口编码*/
	private java.lang.String interfaceCode;

	/**请求时间*/
	private java.sql.Timestamp reqTime;

	/**返回交易流水号*/
	private java.lang.String retTransNo;

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

	/**冗余字段1*/
	private java.lang.String ext01;

	/**冗余字段2*/
	private java.lang.String ext02;

	/**冗余字段2*/
	private java.lang.String ext03;

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
	 *方法: 获得interfaceType
	 *@return: java.lang.String  interfaceType
	 */
	public java.lang.String getInterfaceType(){
		return this.interfaceType;
	}

	/**
	 *方法: 设置interfaceType
	 *@param: java.lang.String  interfaceType
	 */
	public void setInterfaceType(java.lang.String interfaceType){
		this.interfaceType = interfaceType;
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

	/**
	 *方法: 获得retTransNo
	 *@return: java.lang.String  retTransNo
	 */
	public java.lang.String getRetTransNo(){
		return this.retTransNo;
	}

	/**
	 *方法: 设置retTransNo
	 *@param: java.lang.String  retTransNo
	 */
	public void setRetTransNo(java.lang.String retTransNo){
		this.retTransNo = retTransNo;
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

	/**
	 *方法: 获得ext01
	 *@return: java.lang.String  ext01
	 */
	public java.lang.String getExt01(){
		return this.ext01;
	}

	/**
	 *方法: 设置ext01
	 *@param: java.lang.String  ext01
	 */
	public void setExt01(java.lang.String ext01){
		this.ext01 = ext01;
	}

	/**
	 *方法: 获得ext02
	 *@return: java.lang.String  ext02
	 */
	public java.lang.String getExt02(){
		return this.ext02;
	}

	/**
	 *方法: 设置ext02
	 *@param: java.lang.String  ext02
	 */
	public void setExt02(java.lang.String ext02){
		this.ext02 = ext02;
	}

	/**
	 *方法: 获得ext03
	 *@return: java.lang.String  ext03
	 */
	public java.lang.String getExt03(){
		return this.ext03;
	}

	/**
	 *方法: 设置ext03
	 *@param: java.lang.String  ext03
	 */
	public void setExt03(java.lang.String ext03){
		this.ext03 = ext03;
	}

}