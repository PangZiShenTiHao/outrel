package com.jy.modules.biz.bizjob;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.SchedulerContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.fintech.modules.platform.sysconfig.impl.SysConfigAPImpl;
import com.fintech.modules.quartzJob.core.service.IBaseJob;
import com.fintech.platform.api.sysconfig.SysConfigAPI;

/**
 * 贷后项目日终任务列表  11
 * @description: 批处理结束后，备份数据
 * @author
 */
@Component("com.jy.modules.biz.bizJob.AftloanDBBackupAfter")
public class AftloanDBBackupAfter implements IBaseJob{
    private static final long serialVersionUID = 9163900699678738342L;
    private static final Logger logger = LoggerFactory.getLogger(AftloanDBBackupAfter.class);
	private SysConfigAPI sysConfigAPI;
	
	@Override
	public void execute(JobExecutionContext context, String keyID)
			throws JobExecutionException {
		Long start=System.currentTimeMillis();
		Process process;
		SchedulerContext cont = null;
		try{
			cont = context.getScheduler().getContext();
            ApplicationContext appCtx = (ApplicationContext) cont.get("applicationContextKey");
            sysConfigAPI=(SysConfigAPI)appCtx.getBean(SysConfigAPImpl.class);
            String dpshPath = sysConfigAPI.getValue("afloan_dbback_scrpath");
            String date=sysConfigAPI.getValue("sys_date");
            if("yes".equals(sysConfigAPI.getValue("afloan_dbback_switch"))){
				String command1 = "chmod 777" + dpshPath;
				process = Runtime.getRuntime().exec(command1);
				process.waitFor();
				
				String command2 = "." + dpshPath+" end "+date;
				process = Runtime.getRuntime().exec(command2);
				process.waitFor();
            }
		} catch (Exception ex) {
			String message="日终后备份数据错误"+ex.getMessage();
            logger.error(message);
            throw new JobExecutionException("贷款任务异常捕获日终-aftloan011-" + ex.getMessage());
		}finally{
        	Long end = System.currentTimeMillis();
			logger.info("贷后日终任务列表aftloan011:批处理结束后，备份数据 执行耗时:"+(end-start)/1000f+" 秒 ");
        }
	}
	
	public void rollback(JobExecutionContext context,String keyID) throws JobExecutionException{
    	
    }
}
