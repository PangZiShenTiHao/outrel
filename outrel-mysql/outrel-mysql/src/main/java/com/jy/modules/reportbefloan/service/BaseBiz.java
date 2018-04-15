package com.jy.modules.reportbefloan.service;

import java.io.Serializable;
/**
 * 多线程报表统计 service 基类
 * @author chengang
 *
 */
public interface BaseBiz extends Serializable{

	public void execute(int curPage,String batchMinId,String batchMaxId) throws Exception;

}
