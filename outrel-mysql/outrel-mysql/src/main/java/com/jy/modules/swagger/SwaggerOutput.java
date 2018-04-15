package com.jy.modules.swagger;

import io.swagger.annotations.ApiModelProperty;


public class SwaggerOutput {
    @ApiModelProperty("姓名")
    private String name ;
    @ApiModelProperty("用户密码")
    private String pwd;
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getPwd() {
        return pwd;
    }
    
    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
    
}
