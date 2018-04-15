package com.fintech.modules.test;

import java.io.File;

import javax.annotation.Resource;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.fintech.modules.sqluldr2.TaskInfo;
import com.fintech.modules.sqluldr2.source.DefaultOracleSourceDataGetter;

/**
 * 
 * @Description  单元测试
 * @author
 * @version V1.0
 */

@RunWith(SpringJUnit4ClassRunner.class)
// bean的配置文件路径，这个是Test类的classpath路径，如果是Spring推荐的目录结构，应该在：项目目录/src/test/resources/里
@ContextConfiguration(locations = {
		"classpath:spring-base.xml"
		})
public class TestFastDB extends AbstractTransactionalJUnit4SpringContextTests {
	
	private Logger logger =  LoggerFactory.getLogger(TestFastDB.class);
	// 取得要测试的Dao类
	@Resource(name = "com.fintech.modules.sqluldr2.source.DefaultOracleSourceDataGetter")
	private DefaultOracleSourceDataGetter biz;

	@Before
	public void setUp() throws Exception {
	    System.out.println("----setUP------");
	}

	@After
	public void tearDown() throws Exception {
		System.out.println("----tearDown------");
	}

	 public static void collectionContenToMysql(DefaultOracleSourceDataGetter oralce) throws Exception{
	        TaskInfo taskInfo = new TaskInfo();
	        taskInfo.setId("1");
	        
	        taskInfo.setSrcdbconn("user=ptuser/ptuser@172.18.100.86:1521/testdb");
	        taskInfo.setExpdb("sys_app_error_info.sql");
	        taskInfo.setTagtable("sys_app_error_info");
	        taskInfo.setToolsPath("F:/cgJYwork/fintech/src/main/webapp/component/tools/");
	        taskInfo.setLogFile(new File("F:/cgJYwork/fintech/src/main/webapp/component/tools/sqlunloader_logs.log"));
	        taskInfo.setLogCmdFile(new File("F:/cgJYwork/fintech/src/main/webapp/component/tools/log/exe_log.log"));
	        
	        
	        taskInfo.setExecmode("APPEND");
	        taskInfo.setTagdbcols("ID ,NODE_NAME,APP_FLAG ,CREATE_TIME,CONCENT,FILE_NAME,LOG_LEVEL,LEVEL_SETUP_ID ,MATCHED_FLAG ");
	        
	        taskInfo.setSrcSql("select ID ,NODE_NAME,APP_FLAG ,CREATE_TIME,CONCENT,FILE_NAME,LOG_LEVEL,LEVEL_SETUP_ID ,MATCHED_FLAG  from sys_app_error_info");
	        oralce.collectionValueToMysql(taskInfo);
	    }
	 
	/**
	 * 测试方法
	 */
	@Test
	public void testproDTOCode() {
	    try{
    
    		collectionContenToMysql(biz);
            logger.info("=========good==========");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.err.println("-------------end-------------");

	}

}
