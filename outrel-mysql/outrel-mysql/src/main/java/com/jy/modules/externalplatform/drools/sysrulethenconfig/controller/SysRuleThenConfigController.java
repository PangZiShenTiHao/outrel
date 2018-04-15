 package com.jy.modules.externalplatform.drools.sysrulethenconfig.controller;

 import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

 import com.jy.modules.externalplatform.drools.sysrulelist.enumdef.RuleTypeEnum;
 import com.jy.modules.externalplatform.drools.sysrulewhenconfig.dto.SysRuleWhenConfigDTO;
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

import com.fintech.platform.core.common.BaseDTO;
import com.fintech.platform.core.message.DataMsg;
import com.fintech.platform.core.message.PageParameter;
import com.fintech.platform.core.message.PageUtil;
import com.fintech.platform.core.message.QueryReqBean;
import com.fintech.platform.restservice.exception.AbaboonException;
import com.fintech.platform.restservice.web.base.BaseController;
import com.jy.modules.externalplatform.drools.sysrulethenconfig.dto.SysRuleThenConfigDTO;
import com.jy.modules.externalplatform.drools.sysrulethenconfig.service.SysRuleThenConfigService;



 @Controller
 @Scope("prototype")
 @RequestMapping({"/sysRuleThenConfig"})
 public class SysRuleThenConfigController
   extends BaseController
 {
   private static final Logger logger = LoggerFactory.getLogger(SysRuleThenConfigController.class);

   @Autowired
   private SysRuleThenConfigService service;


   public SysRuleThenConfigController() {}

   @RequestMapping({"/prepareExecute/{operate}"})
   public ModelAndView execute(@PathVariable("operate") String operate)
     throws AbaboonException
   {
     ModelAndView model = new ModelAndView();

     if ("toQueryPage".equals(operate)) {
       model.setViewName("externalplatform/drools/sysrulethenconfig/querySysRuleThenConfig");
     } else if ("toAdd".equals(operate)) {
       model.setViewName("externalplatform/drools/sysrulethenconfig/addSysRuleThenConfig");
     } else if ("toUpdate".equals(operate)) {
       String id = getParameterString("id");
       model = queryOneDTO(id);
       model.setViewName("externalplatform/drools/sysrulethenconfig/updateSysRuleThenConfig");
     } else if ("toView".equals(operate)) {
       String id = getParameterString("id");
       model = queryOneDTO(id);
       model.setViewName("externalplatform/drools/sysrulethenconfig/viewSysRuleThenConfig");
     }

     return model;
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




   @RequestMapping({"/queryListSysRuleThenConfig"})
   @ResponseBody
   public DataMsg queryListSysRuleThenConfig(HttpServletRequest request, SysRuleThenConfigDTO dto, @ModelAttribute DataMsg dataMsg)
     throws Exception
   {
     Map<String, Object> searchParams = new HashMap<String, Object>();
     searchParams.put("dto", dto);
     QueryReqBean params = new QueryReqBean();
     params.setSearchParams(searchParams);
     PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
     params.setPageParameter(pageInfo);

     List<SysRuleThenConfigDTO> list = this.service.searchSysRuleThenConfigByPaging(params.getSearchParams());


     dataMsg.setData(list);
     dataMsg.setTotalRows(pageInfo.getTotalCount());
     return dataMsg;
   }

   @RequestMapping({"/queryThenListByCode"})
   public ModelAndView queryThenListByCode(HttpServletRequest request, String code)
   {
     ModelAndView model = new ModelAndView();
     if ((code != null) && (code.length() > 0)) {
       SysRuleThenConfigDTO dto = this.service.findSysRuleThenConfigDTOByCode(code);

       model.addObject("thenDto", dto);
     }
     model.setViewName("externalplatform/drools/sysrulethenconfig/addRuleThen");
     return model;
   }



   @RequestMapping({"/insertSysRuleThenConfig"})
   @ResponseBody
   public DataMsg insertSysRuleThenConfig(HttpServletRequest request, SysRuleThenConfigDTO dto, @ModelAttribute DataMsg dataMsg)
   {
     try
     {
       dto = (SysRuleThenConfigDTO)super.initDto(dto);
       this.service.insertSysRuleThenConfig(dto);
       dataMsg = super.initDataMsg(dataMsg);
       dataMsg.setMsg("报错成功");
       dataMsg.setData(makeJSONData(dto.getId()));
     } catch (Exception e) {
       dataMsg.failed(e.getMessage());
       logger.error("执行方法insertSysResource异常：", e);
     }
     return dataMsg;
   }



   @RequestMapping({"/updateSysRuleThenConfig"})
   @ResponseBody
   public DataMsg updateSysRuleThenConfig(HttpServletRequest request, SysRuleThenConfigDTO dto, @ModelAttribute DataMsg dataMsg)
   {
     try
     {
       dto = (SysRuleThenConfigDTO)super.initDto(dto);

       this.service.updateSysRuleThenConfig(dto);

       dataMsg = super.initDataMsg(dataMsg);
       dataMsg.setMsg("修改成功");
       dataMsg.setData(makeJSONData(dto.getId()));
     } catch (Exception e) {
       dataMsg.failed(e.getMessage());
       logger.error("执行方法updateSysResource异常：", e);
     }
     return dataMsg;
   }


   @RequestMapping({"/deleteSysRuleThenConfig"})
   @ResponseBody
   public DataMsg deleteSysRuleThenConfig(HttpServletRequest request, @ModelAttribute DataMsg dataMsg)
   {
     BaseDTO dto = super.initDto(null);
     String ids = (String)getParameter("ids");
     dataMsg = super.initDataMsg(dataMsg);
     try {
       this.service.deleteSysRuleThenConfigByPrimaryKey(dto, ids);
       dataMsg.setMsg("删除成功");
     } catch (Exception e) {
       dataMsg.failed(e.getMessage());
       logger.error("执行方法deleteSysResource异常：", e);
     }


     return dataMsg;
   }



   private ModelAndView queryOneDTO(String id)
     throws AbaboonException
   {
     ModelAndView model = new ModelAndView();
     try {
       SysRuleThenConfigDTO dto = this.service.querySysRuleThenConfigByPrimaryKey(id);


       model.addObject("dto", dto);
     } catch (Exception e) {
       throw new AbaboonException("执行queryOneDTO异常：", e);
     }
     return model;
   }
 }