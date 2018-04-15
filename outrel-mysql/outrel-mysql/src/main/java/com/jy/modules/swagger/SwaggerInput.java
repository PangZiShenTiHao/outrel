package com.jy.modules.swagger;

import io.swagger.annotations.ApiModelProperty;

import java.util.Date;


public class SwaggerInput {
    @ApiModelProperty("主键ID")
    private String id;
    @ApiModelProperty(value = "时间戳", required = true,dataType = "Date")
    private Date now;
    
    public String getId() {
        return id;
    }

    
    public void setId(String id) {
        this.id = id;
    }

    
    public Date getNow() {
        return now;
    }

    
    public void setNow(Date now) {
        this.now = now;
    }
   
}
