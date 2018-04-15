package com.jy.modules.externalplatform.drools.sysrulelist.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import com.jy.modules.externalplatform.drools.sysrulelist.dto.SysRuleListDTO;
import com.jy.modules.externalplatform.drools.sysrulelist.service.SysRuleListService;

/**
 * @classname: SysRuleListController
 * @description: 定义  规则集 控制层
 * @author:  dell
 */
@Controller
@Scope("prototype")
@RequestMapping("/sysRuleList")
public class SysRuleListController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(SysRuleListController.class);

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.drools.sysrulelist.service.SysRuleListService")
    private SysRuleListService service;
    
    @RequestMapping({ "/prepareExecute/{operate}" })
	public ModelAndView execute(@PathVariable("operate") String operate)
			throws AbaboonException {
		ModelAndView model = new ModelAndView();

		if ("toQueryPage".equals(operate)) {
			model.setViewName("externalplatform/drools/sysrulelist/querySysRuleList");
		} else if ("toAdd".equals(operate)) {
			String newCode = service.queryMaxCodeByParentCode(getParameterString("pCode"));
			model.addObject("code", newCode);
			model.addObject("codeType", Integer.valueOf(newCode.length()));
			model.setViewName("externalplatform/drools/sysrulelist/addSysRuleList");
		} else if ("toUpdate".equals(operate)) {
			String code = getParameterString("code");
			model = queryOneDTO(code);
			model.setViewName("externalplatform/drools/sysrulelist/updateSysRuleList");
		} else if ("toView".equals(operate)) {
			String code = getParameterString("code");
			model = queryOneDTO(code);
			model.setViewName("externalplatform/drools/sysrulelist/viewSysRuleList");
		} else if ("toManagePage".equals(operate)) {
			model.setViewName("externalplatform/drools/sysrulelist/manageSysRuleList");
		}else if ("treeSelectModelAttr".equals(operate)) {
			String modelFlag = getParameterString("modelFlag");
			String inputId = getParameterString("inputId");
			String hiddenInputId = getParameterString("hiddenInputId");
			model.getModel().put("modelFlag", modelFlag);
			model.getModel().put("inputId", inputId);
			model.getModel().put("hiddenInputId", hiddenInputId);
			model.setViewName("externalplatform/drools/sysrulelist/treeSelectModelAttr");
		}else if("toViewContent".equals(operate)){
        	String id = this.getParameterString("id");
        	model = this.queryOneContent(id);
        	model.setViewName("externalplatform/drools/sysrulelist/viewExtRuleContent");
        } 

		return model;
	}

	@RequestMapping({ "/queryListSysRuleList" })
	@ResponseBody
	public List<Map<String, String>> queryListSysRuleList(HttpServletRequest request, SysRuleListDTO dto,@ModelAttribute DataMsg dataMsg) throws Exception {
		Map<String, Object> searchParams = new HashMap<String, Object>();
		searchParams.put("dto", dto);
		List<SysRuleListDTO> list = this.service.searchSysRuleList(searchParams);
		return treeData(list);
	}

	private List<Map<String, String>> treeData(List<SysRuleListDTO> data) {
		List<Map<String, String>> maps = new ArrayList<Map<String, String>>();
		Map<String, String> rootMap = new HashMap<String, String>();
		rootMap.put("ID", "0");
		rootMap.put("NAME", "规则库");
		rootMap.put("TYPE", "root");
		maps.add(rootMap);
		if ((data != null) && (data.size() > 0)) {
			String code = null;
			for (SysRuleListDTO rule : data) {
				Map<String, String> map = new HashMap<String, String>();
				code = rule.getRuleCode();
				map.put("ID", code);
				map.put("NAME", rule.getChName());
				map.put("TYPE", rule.getRuleType());
				if (code.length() == 3) {
					map.put("PID", "0");
				} else {
					map.put("PID",rule.getRuleCode().substring(0,rule.getRuleCode().length() - 3));
				}
				switch (Integer.parseInt(rule.getRuleType())) {
				case 1:
					map.put("icon", "../../images/compile.gif");
					break;
				case 2:
					map.put("icon", "../../images/ruleset.gif");
					break;
				case 3:
					map.put("icon", "../../images/rulePackage.gif");
					break;
				case 4:
					map.put("icon", "../../images/rule.gif");
					break;
				}

				maps.add(map);
			}
			return maps;
		}
		return maps;
	}

	@RequestMapping({ "/insertSysRuleList" })
	@ResponseBody
	public DataMsg insertSysRuleList(HttpServletRequest request,SysRuleListDTO dto, @ModelAttribute DataMsg dataMsg) {
		try {
			dto = (SysRuleListDTO) super.initDto(dto);
			this.service.insertSysRuleList(dto);
			dataMsg = super.initDataMsg(dataMsg);
			dataMsg.setMsg("新增成功");
			dataMsg.setData(makeJSONData(dto.getId()));
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法insertSysResource异常：", e);
		}
		return dataMsg;
	}

	@RequestMapping({ "/updateSysRuleList" })
	@ResponseBody
	public DataMsg updateSysRuleList(HttpServletRequest request,SysRuleListDTO dto, @ModelAttribute DataMsg dataMsg) {
		try {
			dto = (SysRuleListDTO) super.initDto(dto);
			this.service.updateSysRuleList(dto);
			dataMsg = super.initDataMsg(dataMsg);
			dataMsg.setMsg("修改成功");
			dataMsg.setData(makeJSONData(dto.getId()));
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法updateSysRuleList异常：", e);
		}
		return dataMsg;
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
	public DataMsg checkUnique(HttpServletRequest request,SysRuleListDTO dto,@ModelAttribute DataMsg dataMsg) {
		try {
			Map<String, Object> searchParams = new HashMap<String, Object>();
			searchParams.put("dto",dto);
			List<SysRuleListDTO> resultList = service.searchSysRuleList(searchParams);
			if (CollectionUtils.isNotEmpty(resultList)) {
				dataMsg.failed("数据唯一校验失败！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			dataMsg.failed(e.getMessage());
		}
		return dataMsg;
	}

	@RequestMapping({ "/deleteSysRuleList" })
	@ResponseBody
	public DataMsg deleteSysRuleList(HttpServletRequest request,@ModelAttribute DataMsg dataMsg) {
		BaseDTO dto = super.initDto(null);
		String code = (String) getParameter("code");
		dataMsg = super.initDataMsg(dataMsg);
		try {
			this.service.deleteSysRuleListByPrimaryKey(dto, code);
			dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteSysResource异常：", e);
		}

		return dataMsg;
	}

	private ModelAndView queryOneDTO(String code) throws AbaboonException {
		ModelAndView model = new ModelAndView();
		try {
			SysRuleListDTO dto = this.service.querySysRuleListByCode(code);
			model.addObject("dto", dto);
		} catch (Exception e) {
			throw new AbaboonException("执行queryOneDTO异常：", e);
		}
		return model;
	}
	private ModelAndView queryOneContent(String id)throws AbaboonException {
		ModelAndView model = new ModelAndView();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
	    InputStream  ins  =null;
		try {
			SysRuleListDTO dto = this.service.querySysRuleListByPrimaryKey(id);
			model.addObject("dto", dto);
			String ruleResource = dto.getRuleResource();
            if(StringUtils.isNotEmpty(ruleResource)){ 
            	ins = new ByteArrayInputStream(ruleResource.getBytes());
            	int i = -1;
            	while ((i= ins.read()) != -1) {
            		baos.write(i);
            	}
            	String contentStr = baos.toString();
            	contentStr = StringUtils.replace(contentStr, System.getProperty("line.separator"), "<br>");//处理页面换行问题
            	model.addObject("ruleContent",contentStr);
            }
		} catch (Exception e) {
			throw new AbaboonException("执行queryOneContent异常：", e);
		}
		return model;
	}

	/**
	 * @description：规则编译
	 *    思路：1.编译规则；
	 *        2.依据drools模板文件，生成drl规则文件；
	 *        3.将drl文件保存到规则定义表。
	 * @param request
	 * @param ruleListId  规则集ID
	 * @param dataMsg
	 * @return
	 */
	@RequestMapping({ "/compileRules" })
	@ResponseBody
	public DataMsg compileRules(HttpServletRequest request, String ruleListId,
			@ModelAttribute DataMsg dataMsg) {
		try {
			service.compileRulesToDrl(ruleListId);
			dataMsg.setMsg("编译成功！");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法compileRules异常：", e);
		}
		return dataMsg;
	}
	
    /**
   	 * 下拉框：查询规则列表
   	 * @param dataMsg
   	 * @param moduleTypeCode
   	 * @return
   	 * @throws Exception
   	 */
   	@RequestMapping(value = "/querySysRuleList")
   	@ResponseBody
   	public DataMsg querySysRuleList(HttpServletRequest request,@ModelAttribute DataMsg dataMsg,SysRuleListDTO dto){
   		try {
			Map<String, Object> searchParams = new HashMap<String, Object>();
			searchParams.put("dto",dto);
			QueryReqBean params = new QueryReqBean();
	        params.setSearchParams(searchParams);
	        PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
	        params.setPageParameter(pageInfo);
	        
			List<SysRuleListDTO> list = service.querySysRuleList(params.getSearchParams());
			
	   		dataMsg.setData(list);
            dataMsg.setTotalRows(pageInfo.getTotalCount());
		} catch (Exception e) {
			logger.error(e.getMessage());
			dataMsg.failed(e.getMessage());
		}
   		return dataMsg;
   	}
    /**
     * 下拉框：查询规则集列表
     * @param dataMsg
     * @param moduleTypeCode
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/querySysRuleGroupList")
    @ResponseBody
    public DataMsg querySysRuleGroupList(@ModelAttribute DataMsg dataMsg,SysRuleListDTO dto){
        try {
            Map<String, Object> searchParams = new HashMap<String, Object>();
            searchParams.put("dto",dto);
            List<SysRuleListDTO> list = service.querySysRuleGroupList(searchParams);
            dataMsg.setData(list);
        } catch (Exception e) {
            logger.error(e.getMessage());
            dataMsg.failed(e.getMessage());
        }
        return dataMsg;
    }
   	/**
   	 * 查询规则
   	 * @param request
   	 * @param dto
   	 * @param dataMsg
   	 * @return
   	 */
   	@RequestMapping(value = "/searchSysRuleList")
	@ResponseBody
	public DataMsg searchSysRuleList(HttpServletRequest request,String ruleType,@ModelAttribute DataMsg dataMsg) {
		try {
			Map<String, Object> searchParams = new HashMap<String, Object>();
			SysRuleListDTO dto=new SysRuleListDTO();
			dto.setRuleType(ruleType);
			searchParams.put("dto",dto);
			List<SysRuleListDTO> resultList = service.searchSysRuleList(searchParams);
			dataMsg.setData(resultList);
		} catch (Exception e) {
			logger.error(e.getMessage());
			dataMsg.failed(e.getMessage());
		}
		return dataMsg;
	}
}

