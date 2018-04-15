package com.jy.modules.demo;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONObject;
import com.fintech.platform.api.org.UserInfo;

public class Test {
	private static final Logger logger =  LoggerFactory.getLogger(Test.class);

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		UserInfo dto = new UserInfo();
		dto.setLoginName("10006495");
		Map temp = new HashMap<String,Object>();
		temp.put("dto", dto);
	
		System.out.println("================");
		logger.info("===创建时间:{},请求参数DTO：{},返回参数:{}",new Date(),JSONObject.toJSONString(dto),JSONObject.toJSON(temp));
		splitStr();
	}

	public static void splitStr(){
		String str1="2017-09-04 10:53:54.429 [http-bio-8080-exec-5] DEBUG c.j.m.p.s.d.S.searchSysRoleGroup - ==>  Preparing: select t1.id , t1.role_group_name , t1.role_group_code , t1.role_group_type , t1.app_id , t1.validate_state , t1.version from sys_role_group t1 where 1=1 ";
		String[] ss = str1.split(" ",6);
		int cunt =ss.length;
		for(int i = 0;i < cunt;i ++){
			System.out.println("===="+ss[i]);
		}
	}
}
