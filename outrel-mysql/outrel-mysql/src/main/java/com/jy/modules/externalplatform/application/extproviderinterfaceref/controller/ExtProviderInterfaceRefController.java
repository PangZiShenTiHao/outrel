package com.jy.modules.externalplatform.application.extproviderinterfaceref.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
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
import com.jy.modules.externalplatform.application.extinterfaceinfo.dto.ExtInterfaceInfoDTO;
import com.jy.modules.externalplatform.application.extinterfaceinfo.service.ExtInterfaceInfoService;
import com.jy.modules.externalplatform.application.extproviderinterfaceref.dto.ExtProviderInterfaceRefDTO;
import com.jy.modules.externalplatform.application.extproviderinterfaceref.service.ExtProviderInterfaceRefService;

/**
 * @classname: ExtProviderInterfaceRefController
 * @description: 定义  提供商和接口映射表 控制层
 * @author:  Administrator
 */
@Controller
@Scope("prototype")
@RequestMapping("/extProviderInterfaceRef")
public class ExtProviderInterfaceRefController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtProviderInterfaceRefController.class);

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extproviderinterfaceref.service.ExtProviderInterfaceRefService")
    private ExtProviderInterfaceRefService service;
    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extinterfaceinfo.service.ExtInterfaceInfoService")
    private ExtInterfaceInfoService interfaceService;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();

    	String providerCode = this.getParameterString("providerCode");
		if (providerCode != null && providerCode.length() > 0){
			model.addObject("providerCode", providerCode);
		}
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("externalplatform/application/extproviderinterfaceref/queryExtProviderInterfaceRef");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	model.setViewName("externalplatform/application/extproviderinterfaceref/addExtProviderInterfaceRef");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extproviderinterfaceref/updateExtProviderInterfaceRef");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extproviderinterfaceref/viewExtProviderInterfaceRef");
        }else if("providerInterfaceMain".equals(operate)){ //跳转至 主页面
        	model.setViewName("externalplatform/application/extproviderinterfaceref/providerInterfaceMain");
        }
        
        return model;
    }
    
    /**
     * @author Administrator
     * @description:查询分页列表
     * @date 2017-05-12 16:41:52
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtProviderInterfaceRef")
    @ResponseBody
    public DataMsg queryListExtProviderInterfaceRef(HttpServletRequest request, ExtProviderInterfaceRefDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	String providerCode = this.getParameterString("providerCode");
		if (providerCode != null && providerCode.length() > 0){
			dto.setProviderCode(providerCode);
		}
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtProviderInterfaceRefDTO> list = service.searchExtProviderInterfaceRefByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    

    /**
     * @author Administrator
     * @description:新增
     * @date 2017-05-12 16:41:52
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insertExtProviderInterfaceRef")
    @ResponseBody
    public DataMsg insertExtProviderInterfaceRef(HttpServletRequest request, ExtProviderInterfaceRefDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtProviderInterfaceRefDTO)super.initDto(dto);
        	String providerCode=this.getParameterString("providerCode");//提供商编码
        	//删除该提供商下接口
        	service.deleteExtProviderInterfaceRefByProviderCode(providerCode);
        	String interfaceTabStr=this.getParameterString("interfaceTabStr");//接口串
        	//保存提供商和接口关系
        	List<String> interfaceList = null;
        	if(StringUtils.isNotEmpty(interfaceTabStr)) {
        		interfaceList = Arrays.asList(interfaceTabStr.split(","));
    			service.batchInsertExtProviderInterfaceRef(providerCode,interfaceList,String.valueOf(dto.getOpUserId()));
    		}
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("新增成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertExtProviderInterfaceRef异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author Administrator
     * @description:编辑
     * @date 2017-05-12 16:41:52
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateExtProviderInterfaceRef")
    @ResponseBody
    public DataMsg updateExtProviderInterfaceRef(HttpServletRequest request, ExtProviderInterfaceRefDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtProviderInterfaceRefDTO)super.initDto(dto);
           
            service.updateExtProviderInterfaceRef(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateExtProviderInterfaceRef异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author Administrator
     * @description:删除
     * @date 2017-05-12 16:41:52
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteExtProviderInterfaceRef")
    @ResponseBody
    public DataMsg deleteExtProviderInterfaceRef(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.deleteExtProviderInterfaceRefByID(dto,ids);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtProviderInterfaceRef异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author Administrator
     * @description:通过主键查询 其明细信息
     * @date 2017-05-12 16:41:52
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        try{
        	ExtProviderInterfaceRefDTO dto = service.queryExtProviderInterfaceRefByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	logger.error("执行方法queryOneDTO异常：", e);
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
    
	/**
	* @title: queryTreeInfoByProviderCode
	* @author:相立鹏
	* @description: 查询提供商提供的接口
	* @date 2017年5月15日 下午4:17:24
	* @param request
	* @param dataMsg
	* @return
	* @throws Exception
	* @throws 
	*/ 
	@RequestMapping(value = "/queryTreeInfoByProviderCode")
	@ResponseBody
	public List<Map<String, String>> queryTreeInfoByProviderCode(HttpServletRequest request, @ModelAttribute DataMsg dataMsg)throws Exception {

		Map<String, Object> searchParams = new HashMap<String, Object>();
		ExtInterfaceInfoDTO dto = new ExtInterfaceInfoDTO();
		dto.setValidateState("1");
    	searchParams.put("dto", dto);
		List<ExtInterfaceInfoDTO> allList = interfaceService.searchExtInterfaceInfo(searchParams);
		return treeData(allList);
	}
	
	/**
	* @title: treeData
	* @author:相立鹏
	* @description: 转换成树节点集合匹配系统类型
	* @date 2017年5月15日 下午4:11:26
	* @param allList
	* @param funcList
	* @return
	* @throws 
	*/ 
	private List<Map<String, String>> treeData(List<ExtInterfaceInfoDTO> allList) {
		List<Map<String, String>> maps = new ArrayList<Map<String, String>>();
		if(allList!=null && allList.size()>0){
			for(ExtInterfaceInfoDTO interfaceRef: allList){
				Map<String, String>  map = new HashMap<String, String>();
				map.put("ID", String.valueOf(interfaceRef.getId()));
				map.put("NAME",interfaceRef.getInterfaceName());
				map.put("PID", "-1");
				map.put("CODE",interfaceRef.getInterfaceNo());
				map.put("checked", "");
				maps.add(map);
			}
			return maps;
		}else{
			Map<String, String>  map = new HashMap<String, String>();
			map.put("ID", "");
			map.put("NAME","");
			map.put("PID", "");
			map.put("CODE","");
			map.put("checked", "");
			maps.add(map);
			return null;
		}
	}
}
