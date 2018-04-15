package com.jy.modules.externalplatform.application.extfunctiontype.controller;

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
import com.jy.modules.externalplatform.application.extfunctiontype.dto.ExtFunctionTypeDTO;
import com.jy.modules.externalplatform.application.extfunctiontype.service.ExtFunctionTypeService;

/**
 * @classname: ExtFunctionTypeController
 * @description: 定义  外联平台功能类型表 控制层
 * @author:  dell
 */
@Controller
@Scope("prototype")
@RequestMapping("/extFunctionType")
public class ExtFunctionTypeController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtFunctionTypeController.class);
    private static final String NO="no";
    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extfunctiontype.service.ExtFunctionTypeService")
    private ExtFunctionTypeService service;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        String sysCode = this.getParameterString("sysCode");//获取系统编码
        model.addObject("sysCode", sysCode);
        if("toQueryPage".equals(operate)){//跳转至  业务功能管理页面
        	model.setViewName("externalplatform/application/extfunctiontype/treeFunctionTypeInfo");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	String id = this.getParameterString("pid");
			model = this.queryOneDTO(id,model);
        	model.setViewName("externalplatform/application/extfunctiontype/addExtFunctionType");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id,model);
        	model.setViewName("externalplatform/application/extfunctiontype/updateExtFunctionType");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id,model);
        	model.setViewName("externalplatform/application/extfunctiontype/viewExtFunctionType");
        }
        return model;
    }
    
    
    /**
   	 * 下拉框：查询功能类型
   	 * @param dataMsg
   	 * @param moduleTypeCode
   	 * @return
   	 * @throws Exception
   	 */
   	@RequestMapping(value = "/queryExtFunctionTypeList")
   	@ResponseBody
   	public DataMsg queryExtFunctionTypeList(@ModelAttribute DataMsg dataMsg,String sysCode,String funcTypeCode) throws Exception{
   		String parentId = "0";
   		if(StringUtils.isNotEmpty(funcTypeCode)){
   			ExtFunctionTypeDTO extFunctionTypeDTO = service.findExtFunctionTypeByFuncType(funcTypeCode);
   			if(extFunctionTypeDTO!=null){
   				parentId = String.valueOf(extFunctionTypeDTO.getId());
   			}
   		}
   		List<ExtFunctionTypeDTO> list=new ArrayList<ExtFunctionTypeDTO>();
   		list = service.searchExtFunctionTypeBySysCode(sysCode,parentId);

   		dataMsg.setData(list);
   		return dataMsg;
   	} 
    
    
	/**
	 * @description:查询 外联平台功能类型表列表
	 * @param request  queryTreeFunctionTypeInfo
	 * @param dataMsg
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/queryTreeFunctionTypeInfo")
	@ResponseBody
	public List<Map<String, String>> queryTreeAttachTypeInfo(HttpServletRequest request, @ModelAttribute DataMsg dataMsg) throws Exception {
		Map<String, Object> searchParams = new HashMap<String, Object>();
		ExtFunctionTypeDTO dto = new ExtFunctionTypeDTO();
		String sysCode = this.getParameterString("sysCode");//获取系统编码
		dto.setSysCode(sysCode);
    	searchParams.put("dto", dto);
		List<ExtFunctionTypeDTO> list = service.searchExtFunctionType(searchParams);
		return treeData(list);// 转换成树节点集合
	}
	
	/**
	* @title: queryTreeInfoBySysCode
	* @author:陈东栋
	* @description: 查询分配于系统的功能类型
	* @date 2017年4月25日 下午4:17:24
	* @param request
	* @param dataMsg
	* @return
	* @throws Exception
	* @throws 
	*/ 
	@RequestMapping(value = "/queryTreeInfoBySysCode")
	@ResponseBody
	public List<Map<String, String>> queryTreeInfoBySysCode(HttpServletRequest request, @ModelAttribute DataMsg dataMsg)throws Exception {
		String sysCode = this.getParameterString("sysCode");//获取系统编码
		Map<String, Object> searchParams = new HashMap<String, Object>();
		ExtFunctionTypeDTO dto = new ExtFunctionTypeDTO();
		dto.setSysCode(sysCode);
    	searchParams.put("dto", dto);
		List<ExtFunctionTypeDTO> funcList = service.searchExtFunctionTypeBySysCode(sysCode,"");
		return treeData2(funcList);
	}
	
	/**
	* @title: treeData
	* @author:陈东栋
	* @description: 转换成树节点集合匹配系统类型
	* @date 2017年4月25日 下午4:11:26
	* @param allList
	* @param funcList
	* @return
	* @throws 
	*/ 
	private List<Map<String, String>> treeData2(List<ExtFunctionTypeDTO> funcList) {
		List<Map<String, String>> maps = new ArrayList<Map<String, String>>();

		Map<String, String>  map = new HashMap<String, String>();
		map.put("ID", "0");
		map.put("NAME","功能类型");
		map.put("PID", "-1");
		map.put("CODE","ROOT");
		map.put("checked", "");
		maps.add(map);
		
		if(funcList!=null && funcList.size()>0){
			for(ExtFunctionTypeDTO funcType: funcList){
				Map<String, String>  map1 = new HashMap<String, String>();
				map1.put("ID", String.valueOf(funcType.getId()));
				map1.put("NAME",funcType.getFuncTypeName());
				map1.put("PID", String.valueOf(funcType.getParentId()));
				map1.put("CODE",funcType.getFuncTypeCode());
				map1.put("checked", "");
				maps.add(map1);
			}
		}
		return maps;
	}

	/**Description: 转换成树节点集合
	 * @param data
	 * @return
	 */
	private List<Map<String, String>> treeData(List<ExtFunctionTypeDTO> data) {
		List<Map<String, String>> maps = new ArrayList<Map<String, String>>();

		Map<String, String>  map = new HashMap<String, String>();
		map.put("ID", "0");
		map.put("NAME","功能类型");
		map.put("PID", "-1");
		maps.add(map);
		if(data!=null && data.size()>0){
			for(ExtFunctionTypeDTO funcType: data){
				Map<String, String>  map1 = new HashMap<String, String>();
				map1.put("ID", String.valueOf(funcType.getId()));
				map1.put("NAME", funcType.getFuncTypeName());
				map1.put("PID", String.valueOf(funcType.getParentId()));
				maps.add(map1);
			}
		}
		return maps;
	}
	
    /**
     * @author dell
     * @description:查询分页列表
     * @date 2017-04-06 14:24:35
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtFunctionType")
    @ResponseBody
    public DataMsg queryListExtFunctionType(HttpServletRequest request, ExtFunctionTypeDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtFunctionTypeDTO> list = service.searchExtFunctionTypeByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    

    /**
     * @author dell
     * @description:新增
     * @date 2017-04-06 14:24:35
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insertExtFunctionType")
    @ResponseBody
    public DataMsg insertExtFunctionType(HttpServletRequest request, ExtFunctionTypeDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtFunctionTypeDTO)super.initDto(dto);
            Long keyId = service.insertExtFunctionType(dto);
            dataMsg = super.initDataMsg(dataMsg);
			if(keyId > 0) {
				dataMsg.setMsg("新增成功");
				dataMsg.setData(treeNode(dto));
			} else {
				dataMsg.setMsg("新增失败");
			}
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertExtFunctionType异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author dell
     * @description:编辑
     * @date 2017-04-06 14:24:35
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateExtFunctionType")
    @ResponseBody
    public DataMsg updateExtFunctionType(HttpServletRequest request, ExtFunctionTypeDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	if("ROOT".equals(dto.getFuncTypeCode())){//初始化根节点，sysCode值置空
        		dto.setSysCode("");
        	}
        	dto = (ExtFunctionTypeDTO)super.initDto(dto);
            service.updateExtFunctionType(dto);
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(treeNode(dto));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateExtFunctionType异常：", e);
        }
        return dataMsg;
    }
    
    
	/**Description: 转换成树节点
	 * @param data
	 * @return
	 */
	private Map<String, String> treeNode(ExtFunctionTypeDTO dto){
		Map<String, String>  map = new HashMap<String, String>();
		map.put("ID", String.valueOf(dto.getId()));
		map.put("NAME", dto.getFuncTypeName());
		map.put("PID", String.valueOf(dto.getParentId()));
		map.put("validateState", dto.getValidateState());
		return map;
	}

    

    /**
     * @author dell
     * @description:删除
     * @date 2017-04-06 14:24:35
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteExtFunctionType")
    @ResponseBody
    public DataMsg deleteExtFunctionType(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.deleteExtFunctionTypeByID(dto,ids);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtFunctionType异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author dell
     * @description:通过主键查询 其明细信息
     * @date 2017-04-06 14:24:35
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id,ModelAndView model) throws AbaboonException {
        try{
        	ExtFunctionTypeDTO dto = service.queryExtFunctionTypeByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
        	if(null==dto.getId()){//默认为ROOT根节点
        	   dto.setFuncTypeCode("ROOT");
        	}
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
	public DataMsg checkUnique(HttpServletRequest request,ExtFunctionTypeDTO dto,@ModelAttribute DataMsg dataMsg) {
		try {
			Map<String, Object> searchParams = new HashMap<String, Object>();
			searchParams.put("dto", dto);
			String sysNo=this.getParameterString("sysNo");
			if(StringUtils.isNotEmpty(sysNo)){
				searchParams.put("sysNo", sysNo);
			}
			List<ExtFunctionTypeDTO> resultList = service.searchExtFunctionType(searchParams);
			if (CollectionUtils.isNotEmpty(resultList)) {
				if(StringUtils.isNotEmpty(sysNo)){//系统配置管理
					dataMsg.setMsg("该系统下还有有效功能配置，请先删除该系统下有效功能后再删除该系统！");
					dataMsg.setStatus(NO);
				}else{
					dataMsg.failed("数据唯一校验失败！");
				}
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			dataMsg.failed(e.getMessage());
		}
		return dataMsg;
	}
    
}
