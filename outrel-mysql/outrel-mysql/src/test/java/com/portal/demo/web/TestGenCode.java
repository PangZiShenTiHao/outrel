package com.portal.demo.web;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.el.FunctionMapper;

import org.apache.commons.lang.StringUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.fintech.modules.genCode.common.StringUtilTools;
import com.fintech.modules.genCode.dto.ProJspDTO;
import com.fintech.modules.genCode.dto.ProductCodeDTO;
import com.fintech.modules.genCode.service.IGenCodeService;
import com.fintech.modules.genCode.service.impl.GenCodeServiceImpl;
import com.fintech.platform.core.common.JYLoggerUtil;

/**
 * 
 * @Description 代码生成 单元测试
 * @author
 * @date 2014年9月24日 下午9:00:04
 * @version V1.0
 */

@RunWith(SpringJUnit4ClassRunner.class)
// bean的配置文件路径，这个是Test类的classpath路径，如果是Spring推荐的目录结构，应该在：项目目录/src/test/resources/里
@ContextConfiguration(locations = {
		"classpath:spring-base.xml"
		})
public class TestGenCode extends
		AbstractTransactionalJUnit4SpringContextTests {
	
	private Logger log =  LoggerFactory.getLogger(JYLoggerUtil.class);
	FunctionMapper ff = null;
	// 取得要测试的Dao类
	@Resource(name = "com.fintech.modules.genCode.service.impl.GenCodeServiceImpl")
	private IGenCodeService genCodeServiceImpl;

	@Before
	public void setUp() throws Exception {
		System.out.println("----setUP------");
	}

	@After
	public void tearDown() throws Exception {
		System.out.println("----tearDown------");
	}

	/**
	 * 测试方法
	 */
	@Test
	public void testproDTOCode() {

		String templatePath = "";//genCodeServiceImpl.getClass().getClassLoader().getResource("/").getPath();

		ClassLoader cl= TestGenCode.class.getClassLoader();
		URL url=cl.getResource("genCodeTemplate");
        String path = url.getFile()+ "/";
        
		//templatePath = "C:/apache-tomcat-6.0.20/apache-tomcat-6/webapps/demo-web/WEB-INF/classes/";
		ProductCodeDTO dto = new ProductCodeDTO();
		String tableName = "SYS_TEMPLATE";//quartz_task_group_def
		dto.setTableName(tableName);
		
		//dto.setPackageNamePrefix("com.fintech.modules.platform.sysauth");
		dto.setPackageNamePrefix("com.fintech.modules.platform");
		//dto.setActionPackageName("com.portal.loan.before.controller");
		String jspPath = "platform/";
		if (StringUtils.isNotEmpty(path)) {
			dto.setTemplatePath(path);
			
			dto.setJspTargetDir(GenCodeServiceImpl.JSP_PATH );
			dto.setJspPrefix(jspPath);
			dto.setModelName(StringUtilTools.convertName(tableName, true));
			
			dto.setJsTargetDir(GenCodeServiceImpl.JS_PATH);
		}
		
		String columnNameStr = "";
		String dataTypeStr = "";
		String dataLengthStr = "";
		String columnCommentsStr = "";
		String[] columnName = columnNameStr.split(",");

		String[] columnComments = columnCommentsStr.split(",");

		String[] dataType = dataTypeStr.split(",");
		String[] dataLength = dataLengthStr.split(",");
		// 页面显示
		// String[] myDisplay = request.getParameterValues("myDisplay");
		// 页面展示方式
		// String[] myView = request.getParameterValues("myView");
		List jspParamList = new ArrayList();
		if (columnName != null && columnName.length > 0) {
			for (int i = 0; i < columnName.length; i++) {
				ProJspDTO jspDTO = new ProJspDTO();
				jspDTO.setColumnName(String.valueOf(columnName[i]));
				if (StringUtils.isNotEmpty(columnComments[i])) {
					jspDTO.setColumnComments(columnComments[i]);
				} else {
					jspDTO.setColumnComments(columnName[i]);
				}

				jspDTO.setDataLength(dataLength[i]);
				jspDTO.setDataType(dataType[i]);
				//jspDTO.setMyDisplay(myDisplay[i]);
				jspDTO.setMyDisplay("显示");
				// jspDTO.setMyView(myView[i]);
				jspParamList.add(jspDTO);
			}
		}

		

		try {
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("productCodeDTO", dto);
			paramMap.put("jspParamList", jspParamList);
			
			dto = genCodeServiceImpl.proDTOCode(paramMap);
			
			genCodeServiceImpl.proServiceCode(paramMap);
			
			genCodeServiceImpl.proActionCode(paramMap);
			genCodeServiceImpl.proRestCode(paramMap);
			
			genCodeServiceImpl.proMapperCode(paramMap);
			
			genCodeServiceImpl.proSQLCode(paramMap);
			
			//5.生成view
			//this.proJSPCode(message);
			genCodeServiceImpl.proJSPCode(paramMap);
			
			genCodeServiceImpl.proJSCode(paramMap);
			//6.生成jsp 对应js 文件 
			//this.proJSCode(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.err.println("-------------end-------------");

	}

}
