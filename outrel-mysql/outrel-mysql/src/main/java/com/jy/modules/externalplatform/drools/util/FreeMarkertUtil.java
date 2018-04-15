package com.jy.modules.externalplatform.drools.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;

public class FreeMarkertUtil {
	private static final Logger logger = LoggerFactory.getLogger(FreeMarkertUtil.class);

	public FreeMarkertUtil() {
	}

	public static String  generateDrl(String templateName, String fileName,Map<?, ?> root) throws Exception{
		Writer out = null;
		String fileContent = null;
		FileReader fileReader = null;
		try {
			Configuration config = new Configuration();
			File file = new File(FreeMarkertUtil.class.getResource("/").getPath()+ "templates");
			config.setDirectoryForTemplateLoading(file);
			config.setObjectWrapper(new DefaultObjectWrapper());
			Template template = config.getTemplate(templateName, "utf-8");
			File drlFile = new File(FreeMarkertUtil.class.getResource("/").getPath() + "drools/" + fileName);
			logger.info(FreeMarkertUtil.class.getResource("/").getPath()+ "drools/" + fileName);
			if (drlFile.exists()) {
				logger.info("文件存在");
			} else {
				logger.info("文件不存在");
			}
			out = new OutputStreamWriter(new FileOutputStream(drlFile),"utf-8");
			template.process(root, out);
			//读取规则文件
			StringBuffer stringBuffer = new StringBuffer();
			fileContent = null;
			fileReader = new FileReader(drlFile);       
			//定义一个字符数组。用于存储读到字符。  
			//该read(char[])返回的是读到字符个数。  
			char[] buf = new char[1024];  
			int num = 0;  
			while((num=fileReader.read(buf))!=-1)  
			{  
				stringBuffer.append(new String(buf,0,num));
			}
			fileContent = stringBuffer.toString();
		} catch (Exception e) {
			logger.error("执行方法FreeMarkertUtil.generateDrl()异常：", e);
			throw new Exception("请检查业务模型模块中实体类或业务模型的属性是否配置正确！");
		}finally{
			try {
				fileReader.close();
				out.flush();
				out.close();
			} catch (IOException e) {
				logger.error("FreeMarkertUtil.generateDrl().close()异常", e);
			}  
		}
        
		return fileContent;
	}
}
