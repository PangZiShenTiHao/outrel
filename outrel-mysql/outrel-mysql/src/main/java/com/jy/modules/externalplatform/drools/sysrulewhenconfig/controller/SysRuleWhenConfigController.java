package com.jy.modules.externalplatform.drools.sysrulewhenconfig.controller;
 
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fintech.platform.core.message.DataMsg;
import com.fintech.platform.restservice.exception.AbaboonException;
import com.fintech.platform.restservice.web.base.BaseController;
import com.jy.modules.externalplatform.drools.sysrulelist.dto.SysRuleListDTO;
import com.jy.modules.externalplatform.drools.sysrulelist.enumdef.RuleTypeEnum;
import com.jy.modules.externalplatform.drools.sysrulethenconfig.service.SysRuleThenConfigService;
import com.jy.modules.externalplatform.drools.sysrulewhenconfig.dto.SysRuleWhenConfigDTO;
import com.jy.modules.externalplatform.drools.sysrulewhenconfig.service.SysRuleWhenConfigService;
 
 /**
  * @classname: SysRuleWhenConfigController
  * @description: 定义  规则条件设置控制层
  */
@Controller
 @Scope("prototype")
 @RequestMapping({"/sysRuleWhenConfig"})
 public class SysRuleWhenConfigController extends BaseController
 {
   private static final Logger logger = LoggerFactory.getLogger(SysRuleWhenConfigController.class);
   
   @Autowired
   private SysRuleWhenConfigService service;

   @Autowired
   private SysRuleThenConfigService tService;
   
   public SysRuleWhenConfigController() {}
   
   @RequestMapping({"/prepareExecute/{operate}"})
   public ModelAndView execute(@PathVariable("operate") String operate)
     throws AbaboonException
   {
     ModelAndView model = new ModelAndView();
     
     if ("toTreeSelect".equals(operate)) {
       model.setViewName("externalplatform/drools/sysrulewhenconfig/treeSelectModelList");
     }
     
     return model;
   }
   
   @RequestMapping({"/queryListSysRuleWhenConfig"})
   @ResponseBody
   public DataMsg queryListSysRuleWhenConfig(HttpServletRequest request, SysRuleWhenConfigDTO dto, @ModelAttribute DataMsg dataMsg)
     throws Exception
   {
     Map<String, Object> searchParams = new HashMap<String, Object>();
     searchParams.put("dto", dto);
     List<SysRuleWhenConfigDTO> list = this.service.searchSysRuleWhenConfig(searchParams);
     
     dataMsg.setData(list);
     return dataMsg;
   }
   
   @RequestMapping({"/queryWhenListByCode"})
   public ModelAndView queryWhenListByCode(HttpServletRequest request, String code, String ruleType) throws Exception
   {
     ModelAndView model = new ModelAndView();
     if ((code != null) && (code.length() > 0)) {
       Map<String, Object> searchParams = new HashMap<String, Object>();
       SysRuleWhenConfigDTO searchDTO = new SysRuleWhenConfigDTO();
       searchDTO.setRuleCode(code);
       searchParams.put("dto", searchDTO);
       List<SysRuleWhenConfigDTO> whenDtos = this.service.searchSysRuleWhenConfig(searchParams);
       String ruleConfType = RuleTypeEnum.FILED_COMPARE.getKey();//规则配置类型
       if (RuleTypeEnum.RULE.getKey().equals(ruleType) && CollectionUtils.isNotEmpty(whenDtos)){
		   String ruleConf = whenDtos.get(0).getRuleConfType();
		   ruleConfType = StringUtils.isNotEmpty(ruleConf) ? ruleConf: ruleConfType;
    	   model.addObject("whenDtos", whenDtos);
    	   
       }
       model.addObject("ruleConfType", ruleConfType);
     }
     model.setViewName("externalplatform/drools/sysrulewhenconfig/addRuleWhenList");
     return model;
   }
   
 /**保存并更新规则条件设置
 * @param request
 * @param dto
 * @param dataMsg
 * @return
 */
@RequestMapping({"/saveOrUpdateSysRuleWhenConfig"})
   @ResponseBody
   public DataMsg saveOrUpdateSysRuleModelAttrConfig(HttpServletRequest request, SysRuleListDTO dto, @ModelAttribute DataMsg dataMsg)
   {
     try
     {
       String ruleConfType = this.getParameterString("ruleConfType");
       dto = (SysRuleListDTO)super.initDto(dto);
       if (CollectionUtils.isNotEmpty(dto.getWhenConfigs())) {
         if (RuleTypeEnum.RULE.getKey().equals(dto.getRuleType())) {
             String result = getValidationRuleWhen(dto ,ruleConfType);
             if (StringUtils.isEmpty(result)) {
				service.saveOrUpdateWhenConfigs(dto ,ruleConfType);
                dataMsg = super.initDataMsg(dataMsg);
                dataMsg.setMsg("保存成功");
                dataMsg.setData(makeJSONData(dto.getId()));
             } else {
                dataMsg.setMsg(result);
             }
         } 
       } else {
         dataMsg.setMsg("没有添加判断条件，保存失败");
       }
     } catch (Exception e) {
        dataMsg.failed(e.getMessage());
        logger.error("执行方法saveOrUpdateSysRuleModelAttrConfig异常：", e);
     }
     return dataMsg;
   }
   

/**
* @title: getValidationRuleWhen
* @author:陈东栋
* @description: 规则条件校验
* @date 2017年7月22日 下午7:19:08
* @param dto
* @param ruleConfType
* @return
* @throws 
*/ 
public String getValidationRuleWhen(SysRuleListDTO dto ,String ruleConfType) {
     Map<String, String> map = new HashMap<String, String>();
     String conditionAttOrPreBrackets="conditionAttOrPreBrackets";
     String operator = "operator";
     String logicalOperator = "logicalOperator";
     String arithmeticOperators = "arithmeticOperator";
     String afterBracket = "afterBracket";
     String compareAttrOrAfterBrackets = "compareAttrOrAfterBrackets";
     String result = null;
     List<SysRuleWhenConfigDTO> list = dto.getWhenConfigs();
     if(CollectionUtils.isNotEmpty(list)){
    	for (int i = 0; i < list.size(); i++) {
    	       SysRuleWhenConfigDTO sysRuleWhenConfigDTO = list.get(i);
    		   //1.逻辑表达式校验原则：页面"逻辑操作"不能为空值(序号最大的不需校验)
       		   String logicalOperatorVal = sysRuleWhenConfigDTO.getLogicalOperator();//逻辑操作符
       		   if(!map.containsKey(logicalOperator) && (i < list.size() - 1) && StringUtils.isEmpty(logicalOperatorVal)){
       			   map.put(logicalOperator, "逻辑操作"); 
       		   }
       		   //2.字段1校验原则：页面"字段1或第一个输入"不能为空值
       		   String conditionAttrEn = sysRuleWhenConfigDTO.getConditionAttrEn();//字段1
       		   String preBrackets = sysRuleWhenConfigDTO.getPreBrackets();//前括号(第一个输入)
       		   if((!map.containsKey(conditionAttOrPreBrackets)) && StringUtils.isEmpty(conditionAttrEn)){
       			   if(RuleTypeEnum.FILED_COMPARE.getKey().equals(ruleConfType) && StringUtils.isEmpty(preBrackets)){
       				   map.put(conditionAttOrPreBrackets, "字段1或第一个输入"); 
       			   }else if(RuleTypeEnum.FILED_OPERATOR.getKey().equals(ruleConfType)){
       				   map.put(conditionAttOrPreBrackets, "字段1"); 
       			   }
       		   }
       		   //3.算术运算符校验原则：页面"算术运算符"不能为空值
       		   String arithmeticOperator = sysRuleWhenConfigDTO.getArithmeticOperator();
       		   if(RuleTypeEnum.FILED_OPERATOR.getKey().equals(ruleConfType) && (!map.containsKey(arithmeticOperators))&& StringUtils.isEmpty(arithmeticOperator)){
       			    map.put(arithmeticOperators, "算术运算符"); 
       		   }
       		   //4.输入校验原则:页面"比较属性或第二个输入"不能为空值
       		   String compareValueEn = sysRuleWhenConfigDTO.getCompareValueEn();
       		   String afterBrackets = sysRuleWhenConfigDTO.getAfterBrackets();//后括号（第二个输入）
    		   if((!map.containsKey(compareAttrOrAfterBrackets))&& StringUtils.isEmpty(compareValueEn)){
    			   if(RuleTypeEnum.FILED_COMPARE.getKey().equals(ruleConfType) && StringUtils.isEmpty(afterBrackets)){
    				   map.put(compareAttrOrAfterBrackets,"字段2或第二个输入");
    			   }else if(RuleTypeEnum.FILED_OPERATOR.getKey().equals(ruleConfType) && StringUtils.isEmpty(preBrackets)){
       				   map.put(conditionAttOrPreBrackets, "字段2或输入"); 
       			   }	 
    		   }
    		   
    		   //5.值校验原则：页面"值"不能为空值
    		   if(RuleTypeEnum.FILED_OPERATOR.getKey().equals(ruleConfType) && (!map.containsKey(afterBracket))&& StringUtils.isEmpty(afterBrackets)){
      			    map.put(afterBracket, "值"); 
      		   }
    		   
       		   //6.运算符校验原则:页面"运算符"不能为空值
       		   String operatorVal = sysRuleWhenConfigDTO.getOperator();
       		   if(!map.containsKey(operator)&& StringUtils.isEmpty(operatorVal)){
       			   map.put(operator, "关系运算符");
       		   }
       		  
       		   //7.序号最大的不允许选择逻辑操作
       		   if(i == list.size() - 1 && StringUtils.isNotEmpty(logicalOperatorVal)){
     			   result = "序号最大的不允许选择逻辑操作"; 
     			   return result;
    		   }   
    	   } 
    	 } 
     if (!map.isEmpty()) {
         result = "页面输入缺少以下信息：";
         for (String p : map.keySet()) {
           result = result + (String)map.get(p) + ";";
         }
     }
     return result;
   }
 }