package com.jy.modules.externalplatform.drools.sysrulelist.dao;

import java.util.Map;
import java.util.Set;

/**
 *  @description：  该抽象类提供规则编译的各个方法
 *  .drl规则文件格式如下：
 *  |-- package  package-name
        imports  实体类引入
        globals  定义全局变量
    |-- rules规则部分
       rule "name"	 //规则名称
         attributes	 //属性部分
       when			
	     LHS	//left hand sid条件部分
	   then
	     RHS	//right hand sid结果部分
	   End
 */
public abstract class RulesCompile{
	
   
	
	public abstract Set<String> installDrlImportEntity(String ruleCode);
	
	
	/**
	 * 组装Drools文件when条件
	 * @param ruleCode
	 * @return
	 */
	public abstract Map<String, Object> installRuleWhen(String ruleCode);
	
	
	
	
}
