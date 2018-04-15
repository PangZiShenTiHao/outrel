package com.jy.modules.eshttputil;

import java.io.Serializable;


public class OutrelLog implements Serializable {
    private String sysCode;
    private String funcType;
    private String funcPointType;
    private String frontTransTime;
    private Object requestData;
    private String responseCode;
    private Object responseData;
    
    
    public String getSysCode() {
        return sysCode;
    }
    public void setSysCode(String sysCode) {
        this.sysCode = sysCode;
    }
    public String getFuncType() {
        return funcType;
    }
    public void setFuncType(String funcType) {
        this.funcType = funcType;
    }
    public String getFuncPointType() {
        return funcPointType;
    }
    public void setFuncPointType(String funcPointType) {
        this.funcPointType = funcPointType;
    }
    public String getFrontTransTime() {
        return frontTransTime;
    }
    public void setFrontTransTime(String frontTransTime) {
        this.frontTransTime = frontTransTime;
    }
    public Object getRequestData() {
        return requestData;
    }
    public void setRequestData(Object requestData) {
        this.requestData = requestData;
    }
    public String getResponseCode() {
        return responseCode;
    }
    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }
    public Object getResponseData() {
        return responseData;
    }
    public void setResponseData(Object responseData) {
        this.responseData = responseData;
    }
    
    
    
}
