package com.jy.modules.externalplatform.domain.basicinfo.controller;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.fintech.platform.restservice.exception.AbaboonException;
import com.fintech.platform.restservice.web.base.BaseController;


/**
 * @classname: ExtBasicInfoQueryController
 * @description: 定义  外联平台基本信息查询 控制层
 * @author:  dell
 */
@Controller
@Scope("prototype")
@RequestMapping("/extBasicInfoQuery")
public class ExtBasicInfoQueryController extends BaseController{
	
	
	/**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
    	ModelAndView model = new ModelAndView();
    	if("addOrgTree".equals(operate)){//跳转至  机构选择页面
        	model.setViewName("externalplatform/basicinfo/addOrgTree");
        }
    	return model;
    }
}
