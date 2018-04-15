package com.jy.modules.externalplatform.application.extinvokefilterrulemap.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fintech.platform.core.message.DataMsg;
import com.fintech.platform.restservice.web.base.BaseController;
import com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.dto.LbtIntoFilterRuleMapDTO;
import com.jy.modules.externalplatform.application.extinvokefilterrule.enumdef.RuleMapEnum;
import com.jy.modules.externalplatform.application.extinvokefilterrulemap.dto.ExtInvokeFilterRuleMapDTO;
import com.jy.modules.externalplatform.application.extinvokefilterrulemap.service.ExtInvokeFilterRuleMapService;

/**
 * @classname: ExtInvokeFilterRuleMapController
 * @description: 定义  外联调用挡板规则-映射表 控制层
 * @author:  dell
 */
@Controller
@Scope("prototype")
@RequestMapping("/extInvokeFilterRuleMap")
public class ExtInvokeFilterRuleMapController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtInvokeFilterRuleMapController.class);

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extinvokefilterrulemap.service.ExtInvokeFilterRuleMapService")
    private ExtInvokeFilterRuleMapService service;

	/**
	* @title: queryOrgListByRuleId
	* @author:陈东栋
	* @description: 查询适用门店信息
	* @date 2017年4月27日 下午4:57:35
	* @param request
	* @param dto
	* @param dataMsg
	* @return
	* @throws Exception
	* @throws 
	*/ 
    @RequestMapping(value = "/queryOrgListByRuleId")
    @ResponseBody
    public DataMsg queryOrgListByRuleId(HttpServletRequest request, LbtIntoFilterRuleMapDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        List<ExtInvokeFilterRuleMapDTO> list = service.queryOrgListByRuleId(dto.getRuleId());
        dataMsg.setData(list);
        return dataMsg;
    }
    
    
    @RequestMapping(value = "/queryFuncListByRuleId")
    @ResponseBody
    public DataMsg queryFuncListByRuleId(HttpServletRequest request, LbtIntoFilterRuleMapDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        List<ExtInvokeFilterRuleMapDTO> list = service.queryFuncListByRuleId(dto.getRuleId());
        dataMsg.setData(list);
        return dataMsg;
    }
    
	/**
	* @title: saveExtInvokeRuleMap
	* @author:陈东栋
	* @description: 新增 外联调用挡板规则-映射,按规则ID
	* @date 2017年4月28日 下午3:15:46
	* @param request
	* @param dto
	* @param dataMsg
	* @return
	* @throws 
	*/ 
	@RequestMapping(value = "/saveExtInvokeRuleMap")
	@ResponseBody
	public DataMsg saveExtInvokeRuleMap(HttpServletRequest request, ExtInvokeFilterRuleMapDTO dto, @ModelAttribute DataMsg dataMsg){
		try {
			Long ruleId = dto.getRuleId();//规则ID
			String mapType = this.getParameterString("mapType");
			if(RuleMapEnum.MAP_TYPE_FUNC.getValue().equals(mapType)){
				//删除 外联调用挡板规则-功能映射,按规则ID
				service.deleteExtInvokeFilterRuleMapByRuleId(String.valueOf(ruleId),RuleMapEnum.MAP_TYPE_FUNC.getValue());
			    String funcTabStr  = this.getParameterString("funcTabStr");
	    		List<String> funcList = null;
	    		if(StringUtils.isNotEmpty(funcTabStr)) {
	    			funcList = Arrays.asList(funcTabStr.split(","));
	    			service.batchInsertRuleMap(ruleId, RuleMapEnum.MAP_TYPE_FUNC.getValue(), funcList);
	    		}
			}else if(RuleMapEnum.MAP_TYPE_ORG.getValue().equals(mapType)){
				//删除 外联调用挡板规则-门店映射,按规则ID
				service.deleteExtInvokeFilterRuleMapByRuleId(String.valueOf(ruleId),RuleMapEnum.MAP_TYPE_ORG.getValue());
				String orgTabStr  = this.getParameterString("orgTabStr");
	    		List<String> orgList = null;
	    		if(StringUtils.isNotEmpty(orgTabStr)) {
	    			orgList = Arrays.asList(orgTabStr.split(","));
	    			service.batchInsertRuleMap(ruleId, RuleMapEnum.MAP_TYPE_ORG.getValue(), orgList);
	    		}
			}
			dataMsg = super.initDataMsg(dataMsg);
			dataMsg.setMsg("新增成功");
			dataMsg.setData(this.makeJSONData(dto.getId()));
		}catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法saveExtInvokeRuleFunMap异常：", e);
		}
		return dataMsg;
	}
	
	


    
	/**
	* @title: deleteExtInvokeFilterRuleMap
	* @author:陈东栋
	* @description:  删除 外联调用挡板规则-映射表,按主键ID
	* @date 2017年5月2日 上午10:08:00
	* @param request
	* @param dataMsg
	* @return
	* @throws 
	*/ 
    @RequestMapping(value = "/deleteExtInvokeFilterRuleMap")
    @ResponseBody
    public DataMsg deleteExtInvokeFilterRuleMap(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 //删除外联调用挡板规则-映射表,按主键
			 service.deleteExtInvokeFilterRuleMapByID(ids); 
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtInvokeFilterRuleMap异常：", e);
		}
        return dataMsg;
    }
}
