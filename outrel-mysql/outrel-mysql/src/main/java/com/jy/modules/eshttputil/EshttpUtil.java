package com.jy.modules.eshttputil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jy.modules.externalplatform.interfacerest.dto.ExtInterfaceLogDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class EshttpUtil {

    private static final Logger logger = LoggerFactory.getLogger(EshttpUtil.class);


    private OutrelLogServiceImpl outrelLogService = new OutrelLogServiceImpl();

    @RequestMapping(value = "/savelog")
    @ResponseBody
    public String savelog(Map<String, Object> map) {
        String result = "失败";
        try {

            OutrelLog log = createOutrelLog(map);

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


    private OutrelLog createOutrelLog(Map<String, Object> map){
        //
        ExtInterfaceLogDTO interfaceLogDto = (ExtInterfaceLogDTO) map.get("interfaceLogDto");
        String results = (String)map.get("result");

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");

        OutrelLog log = new OutrelLog();
        log.setSysCode(map.get("sysCode").toString());
        log.setFuncType(interfaceLogDto.getReqFuncCode());
        log.setFuncPointType(interfaceLogDto.getInterfaceNo());
        log.setFrontTransTime(df.format(new Date()));




        try{
            /*String reqBody = interfaceLogDto.getReqBody();
            JSONObject requestJsonObject = JSON.parseObject(reqBody.substring(4,reqBody.length()));
            log.setRequestData(requestJsonObject);*/
            String reqBody = interfaceLogDto.getReqBody();
            log.setRequestData(reqBody);
        }
        catch(Exception e){
            //requestData是String类型
        }
        log.setResponseCode("200");
        try{
            JSONObject responseJsonObject = JSON.parseObject(results);
            log.setResponseData(responseJsonObject);
        }
        catch(Exception e){
            //responseData是String类型
        }

        return log;
    }
}
