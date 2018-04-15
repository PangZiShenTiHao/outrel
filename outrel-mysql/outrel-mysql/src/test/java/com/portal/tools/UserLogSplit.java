package com.portal.tools;

import java.io.File;
import java.io.IOException;

import jodd.io.FileUtil;

public class UserLogSplit {

	public static void main(String[] args) {
		//主数据系统生成用户初始化密码文件
		String file = "D:/tmp/vm05-ap012015-04-25_pwd.log";
		//生成文件目录
		String destBase = "D:/tmp/";
		int orgFileNum = 0;
		try {
			String[] results = FileUtil.readLines(file,"UTF-8");
			System.out.println("总用户数量:"+results.length);
			for (int i = 0; i < results.length; i++) {
				String line = results[i];
				if(line.trim().equals("")){
					continue;
				}
				String[] columns = line.split(",");
					
				String filename = destBase+columns[0]+"-"+columns[1]+".txt";
				File orgfile = new File(filename);
				if(!orgfile.exists()){
					
					//不存在文件则创建
					boolean createNewFile = orgfile.createNewFile();
					if(!createNewFile){
						System.out.println("创建失败:"+filename);
					}
					orgFileNum++;
					FileUtil.appendString(orgfile,"机构编码,机构名称,用户编码,用户姓名,用户登录名,用户密码\r\n");
				}
				//开始写入文件
				FileUtil.appendString(orgfile, line+"\r\n");
					
				
				
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("生成文件完成,生成文件数量:"+orgFileNum);
	}
}
