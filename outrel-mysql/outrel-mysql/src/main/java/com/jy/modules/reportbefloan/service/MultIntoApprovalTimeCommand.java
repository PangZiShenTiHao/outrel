package com.jy.modules.reportbefloan.service;

import java.util.concurrent.CountDownLatch;

import com.fintech.platform.core.common.JYLoggerUtil;

/**
 * 查询  多线程处理执行类 补充 工作件 excel 导出的字段信息
 * @author chengang
 *
 */
public class MultIntoApprovalTimeCommand implements Runnable{
	private BaseBiz baseBiz;
	private int curPage=0;
	private CountDownLatch countDown=null;
	private String batchMinId;
	private String batchMaxId;
	public MultIntoApprovalTimeCommand(BaseBiz baseBiz,int curPage,String batchMinId,String batchMaxId,CountDownLatch countDown){
		this.countDown=countDown;
		this.baseBiz = baseBiz;
		this.curPage = curPage;
		this.batchMinId = batchMinId;
		this.batchMaxId = batchMaxId;
	}
	public void run() {
		try {
			baseBiz.execute(curPage,this.batchMinId,this.batchMaxId);
		} catch (Exception e) {
			JYLoggerUtil.error(this.getClass(), "====MultIntoApprovalTimeCommand=====error:"+curPage, e);
		}

		//计数器 减一
		countDown.countDown();
	}
	
}
