package com.jy.modules.swagger;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fintech.platform.restservice.web.base.BaseRest;


@Controller
@RequestMapping(value = "/api/swagger")  
public class SwaggerController extends BaseRest{

    @ResponseBody
    @RequestMapping(value = "/helloworld", method = RequestMethod.GET)
    @ApiOperation(nickname = "swagger-helloworld", value = "交易登记结果单笔查询", notes = "测试HelloWorld")
    public String helloWorld(@ApiParam(value = "昵称") @RequestParam String nickname) {
        return "Hello world, " + nickname;
    }
       
    @ResponseBody
    @RequestMapping(value = "/objectio", method = RequestMethod.POST)
    @ApiOperation(nickname = "swagger-objectio", value = "Swagger的ObjectIO", notes = "测试对象输入输出")  
    public SwaggerOutput objectIo(@ApiParam(value = "输入") @RequestBody SwaggerInput input) {
        SwaggerOutput output = new SwaggerOutput();
        output.setPwd(input.getId());
        output.setName("Swagger");  
        return output;
    }  
}  
