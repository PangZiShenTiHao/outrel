package com.jy.modules.externalplatform.application.extproviderinterfaceref.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.application.extproviderinterfaceref.dao.ExtProviderInterfaceRefDao;
import com.jy.modules.externalplatform.application.extproviderinterfaceref.dto.ExtProviderInterfaceRefDTO;

/**
 * @classname: ExtProviderInterfaceRefService
 * @description: 定义  提供商和接口映射表 实现类
 * @author:  Administrator
 */
@Service("com.jy.modules.externalplatform.application.extproviderinterfaceref.service.ExtProviderInterfaceRefService")
public class ExtProviderInterfaceRefService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ExtProviderInterfaceRefDao dao;

	/**
     * @author Administrator
     * @description: 分页查询 提供商和接口映射表列表
     * @date 2017-05-12 16:41:52
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<ExtProviderInterfaceRefDTO> searchExtProviderInterfaceRefByPaging(Map<String,Object> searchParams) throws Exception {
		List<ExtProviderInterfaceRefDTO> dataList =  dao.searchExtProviderInterfaceRefByPaging(searchParams);
		return dataList;
	}
	/**
     * @author Administrator
     * @description: 按条件查询提供商和接口映射表列表
     * @date 2017-05-12 16:41:52
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtProviderInterfaceRefDTO> searchExtProviderInterfaceRef(Map<String,Object> searchParams) throws Exception {
	    List<ExtProviderInterfaceRefDTO> dataList = dao.searchExtProviderInterfaceRef(searchParams);
        return dataList;
    }
	
	/**
     * @author Administrator
     * @description: 按条件查询提供商和接口映射表列表(多接口名称)
     * @date 2017-05-12 16:41:52
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtProviderInterfaceRefDTO> searchExtProviderAllInterfaceRef(Map<String,Object> searchParams) throws Exception {
	    List<ExtProviderInterfaceRefDTO> dataList = dao.searchExtProviderAllInterfaceRef(searchParams);
        return dataList;
    }
	
	/**
     * @author Administrator
     * @description: 查询提供商和接口映射表对象
     * @date 2017-05-12 16:41:52
     * @param id
     * @return
     * @throws
     */ 
	public ExtProviderInterfaceRefDTO queryExtProviderInterfaceRefByPrimaryKey(String id) throws Exception {
		
		ExtProviderInterfaceRefDTO dto = dao.findExtProviderInterfaceRefByPrimaryKey(id);
		
		if(dto == null) dto = new ExtProviderInterfaceRefDTO();
		
		return dto;
		
	}

	/**
     * @title: insertExtProviderInterfaceRef
     * @author Administrator
     * @description: 新增 提供商和接口映射表对象
     * @date 2017-05-12 16:41:52
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtProviderInterfaceRef(ExtProviderInterfaceRefDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setCreateBy(String.valueOf(dto.getOpUserId()));
		paramMap.put("dto", dto);
		int count = dao.insertExtProviderInterfaceRef(paramMap);
		ExtProviderInterfaceRefDTO resultDto = (ExtProviderInterfaceRefDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateExtProviderInterfaceRef
     * @author Administrator
     * @description: 修改 提供商和接口映射表对象
     * @date 2017-05-12 16:41:52
     * @param paramMap
     * @return
     * @throws
     */
	public void updateExtProviderInterfaceRef(ExtProviderInterfaceRefDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setModifyBy(String.valueOf(dto.getOpUserId()));
		paramMap.put("dto", dto);
		dao.updateExtProviderInterfaceRef(paramMap);
	}
	/**
     * @title: deleteExtProviderInterfaceRefByID
     * @author Administrator
     * @description: 删除 提供商和接口映射表,按主键
     * @date 2017-05-12 16:41:52
     * @param paramMap
     * @throws
     */ 
	public void deleteExtProviderInterfaceRefByID(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtProviderInterfaceRefByID(paramMap);
	}
	/**
     * @title: deleteExtProviderInterfaceRefByProviderCode
     * @author Administrator
     * @description: 删除 提供商和接口映射表,按提供商编码
     * @date 2017-05-12 16:41:52
     * @param paramMap
     * @throws
     */ 
	public void deleteExtProviderInterfaceRefByProviderCode(String providerCode) throws Exception {
		if(StringUtils.isEmpty(providerCode)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("providerCode", providerCode);
		dao.deleteExtProviderInterfaceRefByProviderCode(paramMap);
	}
	/**
	* @title: batchInsertExtProviderInterfaceRef
	* @author:相立鹏
	* @description: 批量保存数据
	* @date 2017年5月15日 下午1:59:20
	* @param optUser 
	* @param providerCode
	* @param interfaceList
	* @throws Exception
	* @throws 
	*/ 
    public void batchInsertExtProviderInterfaceRef(String providerCode, List<String> interfaceList, String optUser) throws Exception {
    	Map<String, Object> paramMap = new HashMap<String, Object>();
    	paramMap.put("createBy", optUser);
    	paramMap.put("providerCode", providerCode);
    	paramMap.put("list", interfaceList);
    	dao.batchInsertExtProviderInterfaceRef(paramMap);
    }
}

