package com.jy.modules.befloan.interfacelog.lbttransferlog.dto;

import com.jy.modules.common.MyBatisPageInfoExt;
/**
 *@Description:调用接口日志表
 *@author dou
 *@version 1.0,
 *@date 2015-01-05 15:09:41
 */
public class LbTTransferLogDTO extends MyBatisPageInfoExt{

	private static final long serialVersionUID = 1L;

	/**主键*/
	private java.lang.Long id;

	/**请求交易流水号*/
	private java.lang.String reqTransNo;

	/**接口编码*/
	private java.lang.String interfaceNo;

	/**业务编码*/
	private java.lang.String businessCode;

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
	//请求参数信息
	private String reqBody;
	//返回报文信息
	private String retBody;
	
	public String getReqBody() {
		return reqBody;
	}

	public void setReqBody(String reqBody) {
		this.reqBody = reqBody;
	}

	public String getRetBody() {
		return retBody;
	}

	public void setRetBody(String retBody) {
		this.retBody = retBody;
	}

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

}