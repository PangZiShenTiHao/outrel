package com.jy.modules.externalplatform.interfacerest.utils;

public class ExtHttpStatus {

	public static final String RET_CODE_SUC    = "200";//200:调用成功
	public static final String RET_CODE_ERROR4 = "202";//202:接受并处理，但处理未完成
	public static final String RET_CODE_ERROR  = "204";//204:收到请求，但返回信息为空
	public static final String RET_CODE_FAIL1  = "400";//400:参数异常
	public static final String RET_CODE_FAIL2  = "401";//401:没有通过挡板规则
	public static final String RET_CODE_FAIL3  = "402";//402:指标没有命中规则
	public static final String RET_CODE_FAIL4  = "405";//405:没有配置模板或模板有问题
	public static final String RET_CODE_FAIL5  = "406";//406:功能点没有配置对应接口
	public static final String RET_CODE_ERROR1 = "403";//403:禁止访问，服务器收到请求，但拒绝提供服务
	public static final String RET_CODE_ERROR2 = "404";//404:请求资源不存在
	public static final String RET_CODE_ERROR3 = "408";//408:超时
	public static final String RET_CODE_FAIL6  = "500";//500:ESB总线转换异常
	public static final String RET_CODE_FAIL7  = "407";//407:接口没有分配规则集
	public static final String RET_CODE_FAIL8  = "999";//999:调用点没有命中该规则集
}
