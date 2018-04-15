package com.jy.modules.biz.bizasynjob;

import java.io.Serializable;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.SchedulerContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;



/**
 * @className: SimpleRecoveryJobA
 * @package: com.jy.modules.biz.bizasynjob
 * @describe: demo
 * @auther: chengang
 * @date: 2018/2/28
 * @time: 17:33
 **/
@Component("com.jy.modules.biz.bizasynjob.SimpleRecoveryJobA")
public class SimpleRecoveryJobA implements Serializable,Job{
    private static final long serialVersionUID = -6454052586425359125L;
    private static final Logger logger = LoggerFactory.getLogger(SimpleRecoveryJobA.class);
	private static boolean isNext = true;
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		
		if(!isNext){
			logger.info("--------进入方法---SimpleRecoveryJobA- execute----------");
			return;
		}
		isNext = false;
		try {
			SchedulerContext con = context.getScheduler().getContext();
			ApplicationContext  appCtx = (ApplicationContext) con.get("applicationContextKey");
			//LaTAccflowSmsService laTAccflowSmsService = (LaTAccflowSmsService)appCtx.getBean("com.jy.modules.aftloan.repayment.lataccflowsms.service.LaTAccflowSmsService");
			//laTAccflowSmsService.insertLaTAccflowSmsBach();

			//这个作业只是简单的打印出作业名字和此作业运行的时间
	        String jobName = context.getJobDetail().getDescription();
	        logger.info("JOB 1111111111111111111 SimpleRecoveryJobA says: " + jobName + " executing at ");
	        
		} catch (Exception e) {
			logger.error("定时任务:SimpleRecoveryJobB信息异常", e);
			throw new JobExecutionException("定时任务:SimpleRecoveryJobB信息异常！");
		}finally{
			isNext= true;
		}
		
	}

}
