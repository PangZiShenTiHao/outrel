package com.jy.modules.externalplatform.application.extproviderinfo.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.application.extproviderinfo.dao.ExtProviderInfoDao;
import com.jy.modules.externalplatform.application.extproviderinfo.dto.ExtProviderInfoDTO;

/**
 * @classname: ExtProviderInfoService
 * @description: 定义  提供商配置表 实现类
 * @author:  Administrator
 */
@Service("com.jy.modules.externalplatform.application.extproviderinfo.service.ExtProviderInfoService")
public class ExtProviderInfoService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ExtProviderInfoDao dao;

	/**
     * @author Administrator
     * @description: 分页查询 提供商配置表列表
     * @date 2017-05-12 14:14:06
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<ExtProviderInfoDTO> searchExtProviderInfoByPaging(Map<String,Object> searchParams) throws Exception {
		List<ExtProviderInfoDTO> dataList =  dao.searchExtProviderInfoByPaging(searchParams);
		return dataList;
	}
	/**
     * @author Administrator
     * @description: 按条件查询提供商配置表列表
     * @date 2017-05-12 14:14:06
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtProviderInfoDTO> searchExtProviderInfo(Map<String,Object> searchParams) throws Exception {
	    List<ExtProviderInfoDTO> dataList = dao.searchExtProviderInfo(searchParams);
        return dataList;
    }
	/**
     * @author Administrator
     * @description: 查询提供商配置表对象
     * @date 2017-05-12 14:14:06
     * @param id
     * @return
     * @throws
     */ 
	public ExtProviderInfoDTO queryExtProviderInfoByPrimaryKey(String id) throws Exception {
		
		ExtProviderInfoDTO dto = dao.findExtProviderInfoByPrimaryKey(id);
		
		if(dto == null) dto = new ExtProviderInfoDTO();
		
		return dto;
		
	}

	/**
     * @title: insertExtProviderInfo
     * @author Administrator
     * @description: 新增 提供商配置表对象
     * @date 2017-05-12 14:14:06
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtProviderInfo(ExtProviderInfoDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setCreateBy(dto.getOpUserId().toString());
		paramMap.put("dto", dto);
		
		int count = dao.insertExtProviderInfo(paramMap);
		
		ExtProviderInfoDTO resultDto = (ExtProviderInfoDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateExtProviderInfo
     * @author Administrator
     * @description: 修改 提供商配置表对象
     * @date 2017-05-12 14:14:06
     * @param paramMap
     * @return
     * @throws
     */
	public void updateExtProviderInfo(ExtProviderInfoDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setModifyBy(dto.getOpUserId().toString());
		paramMap.put("dto", dto);
		
		dao.updateExtProviderInfo(paramMap);
	}
	/**
     * @title: deleteExtProviderInfoById
     * @author Administrator
     * @description: 删除 提供商配置表,按主键
     * @date 2017-05-12 14:14:06
     * @param paramMap
     * @throws
     */ 
	public void deleteExtProviderInfoById(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtProviderInfoByID(paramMap);
	}

}

