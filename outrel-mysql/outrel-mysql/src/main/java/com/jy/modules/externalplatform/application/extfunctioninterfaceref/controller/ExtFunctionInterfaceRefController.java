package com.jy.modules.externalplatform.application.extfunctioninterfaceref.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
import com.jy.modules.externalplatform.application.extfunctioninterfaceref.dto.ExtFunctionInterfaceRefDTO;
import com.jy.modules.externalplatform.application.extfunctioninterfaceref.service.ExtFunctionInterfaceRefService;
import com.jy.modules.externalplatform.application.extfunctiontype.dto.ExtFunctionTypeDTO;
import com.jy.modules.externalplatform.application.extfunctiontype.service.ExtFunctionTypeService;
import com.jy.modules.externalplatform.application.extinterfaceinfo.dto.ExtInterfaceInfoDTO;
import com.jy.modules.externalplatform.application.extinterfaceinfo.service.ExtInterfaceInfoService;
import com.jy.modules.externalplatform.application.extsysmanagement.dto.ExtSysManagementDTO;
import com.jy.modules.externalplatform.application.extsysmanagement.service.ExtSysManagementService;
import com.jy.modules.externalplatform.drools.sysrulelist.dto.SysRuleListDTO;
import com.jy.modules.externalplatform.drools.sysrulelist.enumdef.RuleTypeEnum;
import com.jy.modules.externalplatform.drools.sysrulelist.service.SysRuleListService;
import com.jy.modules.externalplatform.interfacerest.utils.InterfaceEnum;

/**
 * @classname: ExtFunctionInterfaceRefController
 * @description: 定义  功能接口映射表 控制层
 * @author:  dell
 */
@Controller
@Scope("prototype")
@RequestMapping("/extFunctionInterfaceRef")
public class ExtFunctionInterfaceRefController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtFunctionInterfaceRefController.class);
    private static final String NO="no";
    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extfunctioninterfaceref.service.ExtFunctionInterfaceRefService")
    private ExtFunctionInterfaceRefService service;
    
    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extsysmanagement.service.ExtSysManagementService")
    private ExtSysManagementService sysManagementService;
    
    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extinterfaceinfo.service.ExtInterfaceInfoService")
    private ExtInterfaceInfoService interfaceInfoService;
    
    @Autowired
    @Qualifier("com.jy.modules.externalplatform.drools.sysrulelist.service.SysRuleListService")
    private SysRuleListService sysRuleListService;


    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extfunctiontype.service.ExtFunctionTypeService")
    private ExtFunctionTypeService functionTypeService;
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     * @throws Exception 
     */
	@RequestMapping(value = "/prepareExecute/{operate}")
    public @ResponseBody ModelAndView execute(@PathVariable("operate") String operate,@ModelAttribute DataMsg dataMsg) throws Exception {
        ModelAndView model = new ModelAndView();
        
        if("toQueryFuncInterfaceRef".equals(operate)){//跳转至 功能点接口管理页面
        	model.setViewName("externalplatform/application/extfunctioninterfaceref/queryExtFunctionInterfaceRef");
        }else if("toQueryFuncRuleGroupRef".equals(operate)){//跳转至 功能点规则管理页面
        	model.setViewName("externalplatform/application/extfunctioninterfaceref/queryExtFunctionRuleGroupRef");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	//配置类型（1-接口分配规则集  2-调用点分配规则集）
        	String confType = this.getParameterString("confType");
        	//查询系统类型
        	List<ExtSysManagementDTO> plist = sysManagementService.searchExtValidSysManagement();
        	model.addObject("plist", plist);
        	if(InterfaceEnum.CONF_TYPE_1.getKey().equals(confType)){
        		//查询接口类型
            	model.addObject("ilist", queryListExtInterfaceInfo(dataMsg).getData());
            	model.setViewName("externalplatform/application/extfunctioninterfaceref/addExtFunctionInterfaceRef");
        	}else if(InterfaceEnum.CONF_TYPE_2.getKey().equals(confType)){
        		model.setViewName("externalplatform/application/extfunctioninterfaceref/addExtFunctionRuleGroupRef");
        	}
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extfunctioninterfaceref/updateExtFunctionInterfaceRef");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extfunctioninterfaceref/viewExtFunctionInterfaceRef");
        }else if("toDistribute".equals(operate)){//跳转至 规则组分配页
			String id = this.getParameterString("id");
			String sysCode = this.getParameterString("sysCode");// 系统编码
			String confType = this.getParameterString("confType");// 配置类型
			String interfaceNo = InterfaceEnum.CONF_TYPE_1.getKey().equals(confType)?getParameterString("interfaceNo"):"";//接口编码
			//查询系统所有的规则集
			List<SysRuleListDTO> ruleGroupList = sysRuleListService.searchSysRuleGroupListBySysCode(RuleTypeEnum.RULE_BASE_NAME.getKey()+sysCode);
			model.addObject("ruleGroupList", ruleGroupList);
			//按"功能点编码+接口编码+配置类型"查询功能接口映射表列表
			List<ExtFunctionInterfaceRefDTO> funcInterfaceList = service.searchExtFunctionInterfaceRef(getParameterString("funcTypeCode"),interfaceNo,confType);
			if (CollectionUtils.isNotEmpty(funcInterfaceList)) {
			   model.addObject("ruleMap", funcInterfaceList.get(0));
			}
			model.addObject("id", id);
			model.setViewName("externalplatform/application/extfunctioninterfaceref/distributeRuleGroup");
		}else if("extFuncPointRefIndex".equals(operate)){
			model.setViewName("externalplatform/application/extfunctioninterfaceref/extFuncPointRefIndex");
		}
        return model;
    }
    
    /**
     * @author dell
     * @description:查询分页列表
     * @date 2017-05-12 16:39:43
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtFunctionInterfaceRef")
    @ResponseBody
    public DataMsg queryListExtFunctionInterfaceRef(HttpServletRequest request, ExtFunctionInterfaceRefDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtFunctionInterfaceRefDTO> list = service.searchExtFunctionInterfaceRefByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    
    /**
     * @author dell
     * @description:查询列表
     * @date 2017-05-12 16:39:43
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/searchListExtFunctionInterfaceRef")
    @ResponseBody
    public DataMsg searchListExtFunctionInterfaceRef(HttpServletRequest request, ExtFunctionInterfaceRefDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	dto.setValidateState("1");
    	searchParams.put("dto", dto);
		
        List<ExtFunctionInterfaceRefDTO> list = service.searchExtFunctionInterfaceRef(searchParams);       
        dataMsg.setData(list);
        return dataMsg;
    }
    
    /**
	* @title: queryListExtInterfaceInfo
	* @author:陈东栋
	* @description:提供调用点管理新增页面-接口信息展示
	* @date 2017年5月13日 下午3:46:02
	* @param dataMsg
	* @return
	* @throws Exception
	* @throws 
	*/ 
    @RequestMapping(value = "/queryListExtInterfaceInfo")
    @ResponseBody
    public DataMsg  queryListExtInterfaceInfo(@ModelAttribute DataMsg dataMsg) throws Exception{
    	Map<String, Object>  searchParams = new HashMap<String, Object>();
    	ExtInterfaceInfoDTO  interfaceInfoDTO = new ExtInterfaceInfoDTO();
    	interfaceInfoDTO.setValidateState("1");
    	searchParams.put("dto", interfaceInfoDTO);
    	List<ExtInterfaceInfoDTO> interfaceList = interfaceInfoService.searchExtInterfaceInfo(searchParams);
    	dataMsg.setData(interfaceList);
    	return dataMsg;
    }
    
    /**
     * @author dell
     * @description:新增
     * @date 2017-05-12 16:39:43
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value = "/insertExtFunctionInterfaceRef")
    @ResponseBody
    public DataMsg insertExtFunctionInterfaceRef(HttpServletRequest request, ExtFunctionInterfaceRefDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtFunctionInterfaceRefDTO)super.initDto(dto);
        	String funcPointStr  = this.getParameterString("funcPointStr");
        	String interfaceInfoStr  = this.getParameterString("interfaceInfoStr");
        	String confType = dto.getConfType();//配置类型（1-接口分配规则集  2-调用点分配规则集）
        	if(InterfaceEnum.CONF_TYPE_2.getKey().equals(confType)||(InterfaceEnum.CONF_TYPE_1.getKey().equals(confType)&& StringUtils.isNotEmpty(interfaceInfoStr) && !"[]".equals(interfaceInfoStr))){
        		JSONArray interfaceInfoJson = JSONArray.fromObject(interfaceInfoStr);
        		List<ExtFunctionInterfaceRefDTO> interfaceInfoList =JSONArray.toList(interfaceInfoJson,ExtFunctionInterfaceRefDTO.class);	
        		if(StringUtils.isNotEmpty(funcPointStr)){
                	String[] funcPointArr = funcPointStr.split(",");
                	for (int i = 0; i < funcPointArr.length; i++) {
                		String  funcTypePoint = funcPointArr[i];
                		//通过功能点类型删除功能接口映射表 
                		service.deleteExtFuncInterfaceRefByFuncCode(funcTypePoint,confType);
						if (InterfaceEnum.CONF_TYPE_1.getKey().equals(confType)) {
							//调用批量添加功能接口映射表
							service.batchInsertExtFuncInterfaceRef(funcTypePoint, confType, interfaceInfoList);
						} else if (InterfaceEnum.CONF_TYPE_2.getKey().equals(confType)) {
							//保存系统功能点信息
							ExtFunctionInterfaceRefDTO  funcRuleGroupDTO = new ExtFunctionInterfaceRefDTO();
							funcRuleGroupDTO.setFuncTypeCode(funcTypePoint);
							funcRuleGroupDTO.setCreateBy(String.valueOf(dto.getOpUserId()));
							funcRuleGroupDTO.setConfType(confType);
							service.insertExtFunctionInterfaceRef(funcRuleGroupDTO);
						}
    				}
                }
        	}
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("新增成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertExtFunctionInterfaceRef异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author dell
     * @description:编辑
     * @date 2017-05-12 16:39:43
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateExtFunctionInterfaceRef")
    @ResponseBody
    public DataMsg updateExtFunctionInterfaceRef(HttpServletRequest request, ExtFunctionInterfaceRefDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtFunctionInterfaceRefDTO)super.initDto(dto);
           
            service.updateExtFunctionInterfaceRef(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateExtFunctionInterfaceRef异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author dell
     * @description:删除
     * @date 2017-05-12 16:39:43
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteExtFunctionInterfaceRef")
    @ResponseBody
    public DataMsg deleteExtFunctionInterfaceRef(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.deleteExtFunctionInterfaceRefByPrimaryKey(dto,ids);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtFunctionInterfaceRef异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author dell
     * @description:通过主键查询 其明细信息
     * @date 2017-05-12 16:39:43
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        try{
        	ExtFunctionInterfaceRefDTO dto = service.queryExtFunctionInterfaceRefByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	logger.error("执行方法queryOneDTO异常：", e);
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
    
    /**
   	 * 唯一校验
   	 * 
   	 * @param request
   	 * @param dataMsg
   	 * @return
   	 */
   	@RequestMapping(value = "/checkUnique")
   	@ResponseBody
   	public DataMsg checkUnique(HttpServletRequest request,ExtFunctionInterfaceRefDTO dto,@ModelAttribute DataMsg dataMsg) {
   		try {
   			dataMsg = super.initDataMsg(dataMsg);
   			//获取功能点编码
			String functionId=this.getParameterString("functionId");
			if(StringUtils.isNotEmpty(functionId)){
				ExtFunctionTypeDTO functionTypeDTO = functionTypeService.queryExtFunctionTypeByPrimaryKey(functionId);
	   			dto.setFuncTypeCode(functionTypeDTO.getFuncTypeCode());
			}
			//获取接口编码
			String interfaceNo=this.getParameterString("interfaceNo");
			if(StringUtils.isNotEmpty(interfaceNo)){
				dto.setInterfaceNo(interfaceNo);
			}
   			dto.setValidateState("1");
			Map<String, Object> searchParams = new HashMap<String, Object>();
   			searchParams.put("dto", dto);
   			List<ExtFunctionInterfaceRefDTO> resultList = service.searchExtFunctionInterfaceRef(searchParams);
   			if (CollectionUtils.isNotEmpty(resultList) && StringUtils.isNotEmpty(functionId)) {
   				dataMsg.setMsg("该系统下还有有效功能配置，请先删除该系统下有效功能后再删除该系统！");
   				dataMsg.setStatus(NO);
   			}else if (CollectionUtils.isNotEmpty(resultList) && StringUtils.isNotEmpty(interfaceNo)) {
   				dataMsg.setMsg("该接口下还有有效功能使用，请先删除使用该接口的功能后后再删除该接口！");
   				dataMsg.setStatus(NO);
   			}
   		} catch (Exception e) {
   			logger.error(e.getMessage());
   			dataMsg.failed(e.getMessage());
   		}
   		return dataMsg;
   	}
}
