package com.jy.modules.befloan.interfacelog.lbttransferlog.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.fintech.platform.core.common.JYLoggerUtil;
import com.fintech.platform.core.message.PageParameter;
import com.jy.modules.befloan.interfacelog.lbttransferlog.dao.LbTTransferLogDao;
import com.jy.modules.befloan.interfacelog.lbttransferlog.dto.LbTTransferLogDTO;

/**
 * @classname: LbTTransferLogService
 * @description: 定义  调用接口日志表 实现类
 * @author:  dou
 */
@Service("com.jy.modules.befloan.interfacelog.lbttransferlog.service.LbTTransferLogService")
public class LbTTransferLogService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private LbTTransferLogDao dao;

	/**
     * @author dou
     * @description: 分页查询 调用接口日志表列表
     * @date 2015-01-05 15:09:41
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<LbTTransferLogDTO> searchLbTTransferLogByPaging(Map<String,Object> searchParams) throws Exception {
		
		JYLoggerUtil.logCurrentTime("key0ne", true, this.getClass());
		
		PageParameter page = (PageParameter)searchParams.get("page");
		String beginrow = String.valueOf((page.getCurrentPage() - 1) * page.getPageSize());
        String endrow = String.valueOf(page.getCurrentPage() * page.getPageSize());
        searchParams.put("beginrow", beginrow);
        searchParams.put("endrow", endrow);
        
        List<LbTTransferLogDTO> dataList =  dao.searchLbTTransferLogByPage(searchParams);
        
        JYLoggerUtil.logCurrentTime("key0ne", false, this.getClass());
		
		return dataList;
	}
	/**
     * @author dou
     * @description: 按条件查询调用接口日志表列表
     * @date 2015-01-05 15:09:41
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<LbTTransferLogDTO> searchLbTTransferLog(Map<String,Object> searchParams) throws Exception {
	    List<LbTTransferLogDTO> dataList = dao.searchLbTTransferLog(searchParams);
        return dataList;
    }
	/**
     * @author dou
     * @description: 查询调用接口日志表对象
     * @date 2015-01-05 15:09:41
     * @param id
     * @return
     * @throws
     */ 
	public LbTTransferLogDTO queryLbTTransferLogByPrimaryKey(String id) throws Exception {
		
		LbTTransferLogDTO dto = dao.findLbTTransferLogByPrimaryKey(id);
		
		if(dto == null) dto = new LbTTransferLogDTO();
		
		return dto;
		
	}

	/**
     * @title: insertLbTTransferLog
     * @author dou
     * @description: 新增 调用接口日志表对象 开启 新事务控制
     * @date 2015-01-05 15:09:41
     * @param dto
     * @return
     * @throws
     */
	@Transactional(propagation=Propagation.REQUIRES_NEW,rollbackFor=Exception.class)
	public Long insertLbTTransferLog(LbTTransferLogDTO dto) throws Exception {
		if(StringUtils.isNotEmpty(dto.getReqBody()) && dto.getReqBody().length() > 1333){//控制 截取1000
			dto.setReqBody(dto.getReqBody().substring(0,1333));
		}
		if(StringUtils.isNotEmpty(dto.getRetBody()) && dto.getRetBody().length() >1333){//控制 截取1000
			dto.setRetBody(dto.getRetBody().substring(0,1333));
		}
		if(StringUtils.isNotEmpty(dto.getRetMsg()) && dto.getRetMsg().length() > 1333){//控制 截取1000
			dto.setRetMsg(dto.getRetMsg().substring(0,1333));
		}
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		int count = dao.insertLbTTransferLog(paramMap);
		
		LbTTransferLogDTO resultDto = (LbTTransferLogDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateLbTTransferLog
     * @author dou
     * @description: 修改 调用接口日志表对象
     * @date 2015-01-05 15:09:41
     * @param paramMap
     * @return
     * @throws
     */
	public void updateLbTTransferLog(LbTTransferLogDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		dao.updateLbTTransferLog(paramMap);
	}
	/**
     * @title: deleteLbTTransferLogByPrimaryKey
     * @author dou
     * @description: 删除 调用接口日志表,按主键
     * @date 2015-01-05 15:09:41
     * @param paramMap
     * @throws
     */ 
	public void truncateTableBySql() throws Exception {
		dao.truncateTableBySql();
	}

}

