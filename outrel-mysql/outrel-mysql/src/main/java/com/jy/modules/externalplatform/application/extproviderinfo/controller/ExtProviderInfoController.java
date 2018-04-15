package com.jy.modules.externalplatform.application.extproviderinfo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
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
import com.jy.modules.externalplatform.application.extproviderinfo.dto.ExtProviderInfoDTO;
import com.jy.modules.externalplatform.application.extproviderinfo.service.ExtProviderInfoService;
import com.jy.modules.externalplatform.application.extproviderinterfaceref.service.ExtProviderInterfaceRefService;

/**
 * @classname: ExtProviderInfoController
 * @description: 定义  提供商配置表 控制层
 * @author:  Administrator
 */
@Controller
@Scope("prototype")
@RequestMapping("/extProviderInfo")
public class ExtProviderInfoController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtProviderInfoController.class);

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extproviderinfo.service.ExtProviderInfoService")
    private ExtProviderInfoService service;
    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extproviderinterfaceref.service.ExtProviderInterfaceRefService")
    private ExtProviderInterfaceRefService extProviderInterfaceRefService;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("externalplatform/application/extproviderinfo/queryExtProviderInfo");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	model.setViewName("externalplatform/application/extproviderinfo/addExtProviderInfo");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extproviderinfo/updateExtProviderInfo");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extproviderinfo/viewExtProviderInfo");
        }
        
        return model;
    }
    
    /**
     * @author Administrator
     * @description:查询分页列表
     * @date 2017-05-12 14:14:06
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtProviderInfo")
    @ResponseBody
    public DataMsg queryListExtProviderInfo(HttpServletRequest request, ExtProviderInfoDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtProviderInfoDTO> list = service.searchExtProviderInfoByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    

    /**
     * @author Administrator
     * @description:新增
     * @date 2017-05-12 14:14:06
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insertExtProviderInfo")
    @ResponseBody
    public DataMsg insertExtProviderInfo(HttpServletRequest request, ExtProviderInfoDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtProviderInfoDTO)super.initDto(dto);

            service.insertExtProviderInfo(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("新增成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertExtProviderInfo异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author Administrator
     * @description:编辑
     * @date 2017-05-12 14:14:06
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateExtProviderInfo")
    @ResponseBody
    public DataMsg updateExtProviderInfo(HttpServletRequest request, ExtProviderInfoDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtProviderInfoDTO)super.initDto(dto);
           
            service.updateExtProviderInfo(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateExtProviderInfo异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author Administrator
     * @description:删除
     * @date 2017-05-12 14:14:06
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteExtProviderInfo")
    @ResponseBody
    public DataMsg deleteExtProviderInfo(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	String providerCode = (String) this.getParameter("providerCode");
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.deleteExtProviderInfoById(dto,ids);
			 extProviderInterfaceRefService.deleteExtProviderInterfaceRefByProviderCode(providerCode);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtProviderInfo异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author Administrator
     * @description:通过主键查询 其明细信息
     * @date 2017-05-12 14:14:06
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        try{
        	ExtProviderInfoDTO dto = service.queryExtProviderInfoByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	logger.error("执行方法queryOneDTO异常：", e);
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
    /**
	 * 系统编号唯一校验
	 * 
	 * @param request
	 * @param dataMsg
	 * @return
	 */
	@RequestMapping(value = "/checkUnique")
	@ResponseBody
	public DataMsg checkUnique(HttpServletRequest request,ExtProviderInfoDTO dto,@ModelAttribute DataMsg dataMsg) {
		try {
			Map<String, Object> searchParams = new HashMap<String, Object>();
			searchParams.put("dto", dto);
			List<ExtProviderInfoDTO> resultList = service.searchExtProviderInfo(searchParams);
			if (CollectionUtils.isNotEmpty(resultList)) {
				dataMsg.failed("数据唯一校验失败！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			dataMsg.failed(e.getMessage());
		}
		return dataMsg;
	}
}
