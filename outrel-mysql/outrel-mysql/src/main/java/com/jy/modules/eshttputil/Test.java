package com.jy.modules.eshttputil;

public class Test {
    public static void main(String[] args) {
        
        
//        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
//        
//        JSONObject requestJsonObject = JSON.parseObject("{\"name\":\"lily\",\"age\":12}");
//        JSONObject responseJsonObject = JSON.parseObject("{\"res_name\":\"res_lily\",\"res_age\":12}");
//        
//        
//        OutrelLog log = new OutrelLog();
//        log.setSysCode("bigData");
//        log.setFuncType("shuMei");
//        log.setFuncPointType("SHUMEI01_8009");
//        log.setFrontTransTime(df.format(new Date()));
//        log.setRequestData(requestJsonObject);
//        log.setResponseCode("200");
//        log.setResponseData(responseJsonObject);
//        
//        
//        System.out.println(JSON.toJSONString(log));
        
        String hostNames = "172.18.100.11:9200";
        System.out.println(hostNames.split(",").length);
        
        
    }
}
