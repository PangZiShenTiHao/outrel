package com.jy.modules.eshttputil;/*
package com.jy.modules.eshttputil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jy.platform.restservice.web.base.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/api/outrelLog")
public class OutrelLogController extends BaseController {
	private static final Logger logger = LoggerFactory.getLogger(OutrelLogController.class);
	
	@Autowired
	private OutrelLogService outrelLogService;
	
	@RequestMapping(value = "/savelog")
	@ResponseBody
	public String savelog(HttpServletRequest request) {
	    String result = "失败";
		try {
		    
		    OutrelLog log = createOutrelLog();
		    
		    boolean flag = outrelLogService.saveOutrelLog(log);
		    
		    if(flag){
		        result = "成功";
		    }
		    
		} 
		catch (Exception e) {
			logger.error("失败",e);
		}
		
		return result;
	}
	
	
	private OutrelLog createOutrelLog(){
	    DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
	    
	    OutrelLog log = new OutrelLog();
        log.setSysCode("bigData");
        log.setFuncType("shuMei");
        log.setFuncPointType("SHUMEI01_8009");
        log.setFrontTransTime(df.format(new Date()));
        try{
            JSONObject requestJsonObject = JSON.parseObject("{\"name\":\"lily\",\"age\":12}");
            log.setRequestData(requestJsonObject);
        }
        catch(Exception e){
            //requestData是String类型
        }
        log.setResponseCode("200");
        try{
            JSONObject responseJsonObject = JSON.parseObject("{\"res_name\":\"res_lily\",\"res_age\":12}");
            log.setResponseData(responseJsonObject);
        }
        catch(Exception e){
            //responseData是String类型
        }
        
        return log;
	}
	
	
}
*/
