package com.jy.modules.externalplatform.interfacerest.dao;

import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.interfacerest.dto.ResponseBodyDTO;
/**
 * @classname: ExtInterfaceLogDao
 * @description: 定义  调用接口日志表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  Administrator
 */
@MyBatisRepository
public interface ExtInterfaceDao {
	public ResponseBodyDTO searchInterfaceMsg(Map<String, Object> rstObj,ResponseBodyDTO responseBody);
}
