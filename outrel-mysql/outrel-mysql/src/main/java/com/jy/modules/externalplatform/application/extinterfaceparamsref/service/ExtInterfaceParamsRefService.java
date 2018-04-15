package com.jy.modules.externalplatform.application.extinterfaceparamsref.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.application.extinterfaceparamsref.dao.ExtInterfaceParamsRefDao;
import com.jy.modules.externalplatform.application.extinterfaceparamsref.dto.ExtInterfaceParamsRefDTO;

/**
 * @classname: ExtInterfaceParamsRefService
 * @description: 定义  接口参数映射表 实现类
 * @author:  Administrator
 */
@Service("com.jy.modules.externalplatform.application.extinterfaceparamsref.service.ExtInterfaceParamsRefService")
public class ExtInterfaceParamsRefService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ExtInterfaceParamsRefDao dao;

	/**
     * @author Administrator
     * @description: 分页查询 接口参数映射表列表
     * @date 2017-05-16 15:10:22
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<ExtInterfaceParamsRefDTO> searchExtInterfaceParamsRefByPaging(Map<String,Object> searchParams) throws Exception {
		List<ExtInterfaceParamsRefDTO> dataList =  dao.searchExtInterfaceParamsRefByPaging(searchParams);
		return dataList;
	}
	/**
     * @author Administrator
     * @description: 按条件查询接口参数映射表列表
     * @date 2017-05-16 15:10:22
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtInterfaceParamsRefDTO> searchExtInterfaceParamsRef(Map<String,Object> searchParams) throws Exception {
	    List<ExtInterfaceParamsRefDTO> dataList = dao.searchExtInterfaceParamsRef(searchParams);
        return dataList;
    }
	/**
     * @author Administrator
     * @description: 查询接口参数映射表对象
     * @date 2017-05-16 15:10:22
     * @param id
     * @return
     * @throws
     */ 
	public ExtInterfaceParamsRefDTO queryExtInterfaceParamsRefByPrimaryKey(String id) throws Exception {
		
		ExtInterfaceParamsRefDTO dto = dao.findExtInterfaceParamsRefByPrimaryKey(id);
		
		if(dto == null) dto = new ExtInterfaceParamsRefDTO();
		
		return dto;
		
	}

	/**
     * @title: insertExtInterfaceParamsRef
     * @author Administrator
     * @description: 新增 接口参数映射表对象
     * @date 2017-05-16 15:10:22
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtInterfaceParamsRef(ExtInterfaceParamsRefDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setCreateBy(String.valueOf(dto.getOpUserId()));
		paramMap.put("dto", dto);
		int count = dao.insertExtInterfaceParamsRef(paramMap);
		ExtInterfaceParamsRefDTO resultDto = (ExtInterfaceParamsRefDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateExtInterfaceParamsRef
     * @author Administrator
     * @description: 修改 接口参数映射表对象
     * @date 2017-05-16 15:10:22
     * @param paramMap
     * @return
     * @throws
     */
	public void updateExtInterfaceParamsRef(ExtInterfaceParamsRefDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setModifyBy(String.valueOf(dto.getOpUserId()));
		paramMap.put("dto", dto);
		
		dao.updateExtInterfaceParamsRef(paramMap);
	}
	/**
     * @title: deleteExtInterfaceParamsRefByID
     * @author Administrator
     * @description: 删除 接口参数映射表,按主键
     * @date 2017-05-16 15:10:22
     * @param paramMap
     * @throws
     */ 
	public void deleteExtInterfaceParamsRefByID(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtInterfaceParamsRefByID(paramMap);
	}
	/**
     * @title: deleteExtInterfaceParamsRefByID
     * @author Administrator
     * @description: 删除 接口参数映射表,按主键
     * @date 2017-05-16 15:10:22
     * @param paramMap
     * @throws
     */ 
	public void deleteExtInterfaceParamsRefByInterfaceNo(String interfaceNo) throws Exception {
		if(StringUtils.isEmpty(interfaceNo)) throw new Exception("删除失败！传入的参数为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("interfaceNo", interfaceNo);
		dao.deleteExtInterfaceParamsRefByInterfaceNo(paramMap);
	}

}

