package com.jy.modules.befloan.productconf.lbtproductconf.dto;

import java.math.BigDecimal;

import com.fintech.platform.core.common.BaseDTO;

/**
 * @Description:产品基础信息表
 * @author dou
 * @version 1.0,
 * @date 2014-11-03 15:08:55
 */
public class LbTProductConfDTO extends BaseDTO {

	private static final long serialVersionUID = 1L;

	/** ID N VARCHAR2(20) N 主键ID */
	private java.lang.String id;

	/** PRODUCT_NAME N VARCHAR2(50) Y 产品名 */
	private java.lang.String productName;

	/** PRODUCT_CODE N VARCHAR2(50) Y 产品编号 */
	private java.lang.String productCode;

	/** MAX_TERM N VARCHAR2(50) Y 最大期限 */
	private java.lang.String maxTerm;

	/** MIN_TERM N VARCHAR2(50) Y 最小期限 */
	private java.lang.String minTerm;

	/** YEAR_RATE N NUMBER(19,6) Y 年利率 */
	private java.lang.Double yearRate;

	/** DAY_PENALTY_INTEREST N NUMBER(19,6) Y 日罚息 */
	private java.lang.Double dayPenaltyInterest;

	/** COMPREHENSIVE_RATE N NUMBER(19,6) Y 综合费率 */
	private BigDecimal comprehensiveRate;

	/** REFUND_MAX_TERM N NUMBER(3) Y 退费最大期数 */
	private java.lang.Long refundMaxTerm;

	/** VALIDATE_STATE N VARCHAR2(2) Y 数据有效性（1：有效、0：无效） */
	private java.lang.String validateState;

	/** PRODUCT_TYPE N VARCHAR2(5) Y 产品类型 */
	private String productType;
	/** LOAN_RATE N NUMBER(20,6) Y 贷款利率 */
	private BigDecimal loanRate; 
	/**SERVICE_RATE N NUMBER(20,6)服务费率**/
	private BigDecimal serviceRate;

	/** START_DATE N TIMESTAMP(6) Y 生效日期 */
	/** END_DATE N TIMESTAMP(6) Y 失效日期 */
	/** INSTRUCTION N VARCHAR2(4000) Y 说明 */
	/** MONEY_TYPE N NUMBER(5) Y 货币类型 */
	
	/** SERVICE_RATE N NUMBER(20,6) Y 服务费率 */
	/** PENALTY N NUMBER(20,6) Y 违约金 */
	/** INTEREST_TYPE N NUMBER(5) Y 计息方式 */
	/** OPEN_RATE N NUMBER(20,6) Y 费率优惠 */
	/** DUE_TIME_TYPE N NUMBER(5) Y 期限类型 */
	/** LOAN_PERIODS N NUMBER(5) Y 贷款期数 */
	/** REFUND_MIN_PERIODS N NUMBER(19) Y 退费最小期数 */
	/** LOAN_LIMIT N NUMBER(19) Y 贷款额度 */
	/** REPAYMENT_WAY N NUMBER(5) Y 还款方式 */
	/** REPAYMENT_RATE N VARCHAR2(10) Y 还款频率 */
	/** GUARANTEE_WAY N NUMBER(5) Y 担保方式 */
	/** GRACE_PERIOD N NUMBER(5) Y 宽限期 */
	/** ADVANCE_SETTLE N NUMBER(5) Y 是否提前结清 */
	/** ADVANCE_SETTLE_PERIODS N NUMBER(5) Y 提前结清最小期数 */
	/** DELAY N NUMBER(5) Y 是否延展期 */
	/** RELOAN N NUMBER(5) Y 是否循环贷 */

	/** VERSION N NUMBER(5) Y 版本 */
	private String version;

	/** PRODUCT_STATE N NUMBER(5) Y 产品状态 产品状态1:新建, 2:审批中, 3:已发布, 4:暂停销售 */
	private String productState;

	/** CREATE_TIME N TIMESTAMP(6) Y 创建时间 */
	/** CREATOR N VARCHAR2(50) Y 创建人 */
	/** URGENT_RATE N VARCHAR2(50) Y 加急费率 */

	/** PARENT_ID N NUMBER(18) Y 父产品id */
	private java.lang.Long parentId;

	/** PRODUCT_ID N NUMBER(19) Y 核心产品ID */
	private java.lang.Long productId;

	/** SORTNUM N NUMBER(5) Y 顺序 */
	private java.lang.Long sortnum;

	/**
	 * 方法: 获得id
	 * 
	 * @return: java.lang.Long id
	 */
	public java.lang.String getId() {
		return this.id;
	}

	/**
	 * 方法: 设置id
	 * 
	 * @param: java.lang.Long id
	 */
	public void setId(java.lang.String id) {
		this.id = id;
	}

	/**
	 * 方法: 获得productName
	 * 
	 * @return: java.lang.String productName
	 */
	public java.lang.String getProductName() {
		return this.productName;
	}

	/**
	 * 方法: 设置productName
	 * 
	 * @param: java.lang.String productName
	 */
	public void setProductName(java.lang.String productName) {
		this.productName = productName;
	}

	/**
	 * 方法: 获得maxTerm
	 * 
	 * @return: java.lang.String maxTerm
	 */
	public java.lang.String getMaxTerm() {
		return this.maxTerm;
	}

	/**
	 * 方法: 设置maxTerm
	 * 
	 * @param: java.lang.String maxTerm
	 */
	public void setMaxTerm(java.lang.String maxTerm) {
		this.maxTerm = maxTerm;
	}

	/**
	 * 方法: 获得minTerm
	 * 
	 * @return: java.lang.String minTerm
	 */
	public java.lang.String getMinTerm() {
		return this.minTerm;
	}

	/**
	 * 方法: 设置minTerm
	 * 
	 * @param: java.lang.String minTerm
	 */
	public void setMinTerm(java.lang.String minTerm) {
		this.minTerm = minTerm;
	}

	/**
	 * 方法: 获得yearRate
	 * 
	 * @return: java.lang.Long yearRate
	 */
	public java.lang.Double getYearRate() {
		return this.yearRate;
	}

	/**
	 * 方法: 设置yearRate
	 * 
	 * @param: java.lang.Long yearRate
	 */
	public void setYearRate(java.lang.Double yearRate) {
		this.yearRate = yearRate;
	}

	/**
	 * 方法: 获得dayPenaltyInterest
	 * 
	 * @return: java.lang.Long dayPenaltyInterest
	 */
	public java.lang.Double getDayPenaltyInterest() {
		return this.dayPenaltyInterest;
	}

	/**
	 * 方法: 设置dayPenaltyInterest
	 * 
	 * @param: java.lang.Long dayPenaltyInterest
	 */
	public void setDayPenaltyInterest(java.lang.Double dayPenaltyInterest) {
		this.dayPenaltyInterest = dayPenaltyInterest;
	}

	/**
	 * 方法: 获得comprehensiveRate
	 * 
	 * @return: java.lang.Long comprehensiveRate
	 */
	public BigDecimal getComprehensiveRate() {
		return this.comprehensiveRate;
	}

	/**
	 * 方法: 设置comprehensiveRate
	 * 
	 * @param: java.lang.Long comprehensiveRate
	 */
	public void setComprehensiveRate(BigDecimal comprehensiveRate) {
		this.comprehensiveRate = comprehensiveRate;
	}

	/**
	 * 方法: 获得refundMaxTerm
	 * 
	 * @return: java.lang.Long refundMaxTerm
	 */
	public java.lang.Long getRefundMaxTerm() {
		return this.refundMaxTerm;
	}

	/**
	 * 方法: 设置refundMaxTerm
	 * 
	 * @param: java.lang.Long refundMaxTerm
	 */
	public void setRefundMaxTerm(java.lang.Long refundMaxTerm) {
		this.refundMaxTerm = refundMaxTerm;
	}

	/**
	 * 方法: 获得validateState
	 * 
	 * @return: java.lang.String validateState
	 */
	public java.lang.String getValidateState() {
		return this.validateState;
	}

	/**
	 * 方法: 设置validateState
	 * 
	 * @param: java.lang.String validateState
	 */
	public void setValidateState(java.lang.String validateState) {
		this.validateState = validateState;
	}

	public java.lang.Long getParentId() {
		return parentId;
	}

	public void setParentId(java.lang.Long parentId) {
		this.parentId = parentId;
	}

	public java.lang.String getProductCode() {
		return productCode;
	}

	public void setProductCode(java.lang.String productCode) {
		this.productCode = productCode;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getProductState() {
		return productState;
	}

	public void setProductState(String productState) {
		this.productState = productState;
	}

	public java.lang.Long getProductId() {
		return productId;
	}

	public void setProductId(java.lang.Long productId) {
		this.productId = productId;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public BigDecimal getLoanRate() {
		return loanRate;
	}

	public void setLoanRate(BigDecimal loanRate) {
		this.loanRate = loanRate;
	}

	public BigDecimal getServiceRate() {
		return serviceRate;
	}

	public void setServiceRate(BigDecimal serviceRate) {
		this.serviceRate = serviceRate;
	}

	public java.lang.Long getSortnum() {
		return sortnum;
	}

	public void setSortnum(java.lang.Long sortnum) {
		this.sortnum = sortnum;
	}
}