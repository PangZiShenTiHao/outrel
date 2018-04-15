package com.jy.modules.externalplatform.interfacerest.service;

import java.io.Serializable;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.api.sysconfig.SysConfigAPI;
import com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.dto.LbtIntoFilterRuleMapDTO;
import com.jy.modules.common.servlet.AppContextBean;
import com.jy.modules.extbiz.in.shzx.utils.MD5EncodeUtil;
import com.jy.modules.externalplatform.application.extfunctioninterfaceref.dto.ExtFunctionInterfaceRefDTO;
import com.jy.modules.externalplatform.application.extfunctioninterfaceref.service.ExtFunctionInterfaceRefService;
import com.jy.modules.externalplatform.application.extinterfaceparamsref.dto.ExtInterfaceParamsRefDTO;
import com.jy.modules.externalplatform.application.extinterfaceparamsref.service.ExtInterfaceParamsRefService;
import com.jy.modules.externalplatform.application.extinvokefilterrule.dto.ExtInvokeFilterRuleDTO;
import com.jy.modules.externalplatform.application.extinvokefilterrule.service.ExtInvokeFilterRuleService;
import com.jy.modules.externalplatform.application.extinvokefilterrulemap.dto.ExtInvokeFilterRuleMapDTO;
import com.jy.modules.externalplatform.application.extinvokefilterrulemap.service.ExtInvokeFilterRuleMapService;
import com.jy.modules.externalplatform.drools.InputParam;
import com.jy.modules.externalplatform.drools.compute.impl.IRuleCompute;
import com.jy.modules.externalplatform.interfacerest.dao.ExtInterfaceDao;
import com.jy.modules.externalplatform.interfacerest.dao.ExtSaveMessageDao;
import com.jy.modules.externalplatform.interfacerest.dto.ExtInterfaceLogDTO;
import com.jy.modules.externalplatform.interfacerest.dto.RequestBodyDTO;
import com.jy.modules.externalplatform.interfacerest.dto.RequestBodyDTO2;
import com.jy.modules.externalplatform.interfacerest.dto.RequestBodyDTO3;
import com.jy.modules.externalplatform.interfacerest.dto.ResponseBodyDTO;
import com.jy.modules.externalplatform.interfacerest.dto.ResponseBodyDTO2;
import com.jy.modules.externalplatform.interfacerest.dto.ResponseBodyDTO3;
import com.jy.modules.externalplatform.interfacerest.utils.ExtConstant;
import com.jy.modules.externalplatform.interfacerest.utils.ExtHttpStatus;
import com.jy.modules.externalplatform.interfacerest.utils.InterfaceEnum;
import com.jy.modules.externalplatform.interfacerest.utils.JsonUtil;
import com.jy.modules.externalplatform.interfacerest.utils.TransferInteface;


@Service("com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceService")
public class ExtInterfaceService implements Serializable {
	private static final long serialVersionUID = 1L;
	private static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	@Autowired
	private ExtInterfaceDao dao;
	
	@Autowired
    private ExtInvokeFilterRuleService extInvokeFilterRuleService;
    @Autowired
    private ExtInvokeFilterRuleMapService extInvokeFilterRuleMapService;
    @Autowired
    private ExtFunctionInterfaceRefService extFunctionInterfaceRefService;
    @Autowired
    private ExtInterfaceParamsRefService extInterfaceParamsRefService;
    @Autowired
    public IRuleCompute iRuleCompute; 
    @Autowired
    private ExtSaveMessageDao extSaveMessageDao; 
    @Autowired
    private SysConfigAPI sysConfigAPI;
    
	@SuppressWarnings("unchecked")
	public ResponseBodyDTO searchInterfaceMsg(RequestBodyDTO requestBody,ResponseBodyDTO responseBody) throws Exception {
		// TODO Auto-generated method stub
		String errorMsg="";//返回的错误信息
		String ruleMsg="false";//挡板规则是否通过
		boolean moduleMsg=false;//指标和规则集是否命中
		String paramsMsg="";//参数是否完整
		String retCode="";//返回编码
		Map<String,String> resultsMap=new HashMap<String,String>();//接口返回结果集
		JSONObject jsonObject =new JSONObject();
		String sysCode=requestBody.getSysCode();//系统编码
		//返回信息
		responseBody.setBusiCode(requestBody.getBusiCode());//入参业务编码
		responseBody.setFrontTransNo(requestBody.getFrontTransNo());//入参交易流水编号
		responseBody.setInterfaceNo(requestBody.getInterfaceNo());//入参接口编
		//日志信息
		ExtInterfaceLogDTO interfaceLogDto=new ExtInterfaceLogDTO();
		interfaceLogDto.setParentId(InterfaceEnum.VALIDATE_TRUE.getKey());
		interfaceLogDto.setReqOrgCode(requestBody.getOrg());//机构编码
		interfaceLogDto.setReqProCode(requestBody.getProd());//产品编码
		interfaceLogDto.setReqFuncCode(requestBody.getFuncPointType());//功能点编码
		interfaceLogDto.setReqCardId(requestBody.getCustCardId());//证件号
		interfaceLogDto.setReqTransNo(requestBody.getFrontTransNo());//交易流水号
		interfaceLogDto.setExt1(requestBody.getSysCode());
		if(StringUtils.isNotEmpty(requestBody.getSysCode()) && requestBody.getSysCode().equals("bigData")){
            interfaceLogDto.setReqOrgCode("depBigData");//大数据，默认设置机构为这个，便于数据统计
        }
		//接口和参数信息
		/*Map<String, Object> interfaceMap=JsonUtil.fromJson(requestBody.getInterfaceData().toString(), Map.class); //接口编码和入参*/
		Map<String, Object> interfaceMap=JsonUtil.fromJson(JSONObject.fromObject(requestBody.getInterfaceData()).toString(), Map.class);

		//指标信息
		Map<String, Object> moduleMap= JsonUtil.fromJson(requestBody.getModuleData().toString(), Map.class);//指标
						
		//1、根据系统编码查询出挡板规则编码
		List<ExtInvokeFilterRuleDTO> ruleList=this.getInvokeFilterRuleBySysCode(sysCode);
		
		//2、根据挡板规则、产品、机构、功能点、系统时间去和数据库对比，是否符合挡板规则
		Map<String, Object> ruleMsgMap=this.isInvokeFilterRule(errorMsg,ruleMsg,ruleList,interfaceLogDto);	
		if(InterfaceEnum.TRUE.getKey().equals(ruleMsgMap.get("ruleMsg"))){
			//3、根据功能点查询出接口信息
			List<ExtFunctionInterfaceRefDTO> interfaceList=this.getInterfaceByFuncCode(sysCode,interfaceLogDto.getReqFuncCode(),InterfaceEnum.CONF_TYPE_1.getKey());
			if (CollectionUtils.isNotEmpty(interfaceList)) {
				for(ExtFunctionInterfaceRefDTO  interDto :interfaceList){
					//4、解析入参指标+ （功能点和接口-》获取规则规则集）=true/false
					InputParam inputParam =new InputParam();
					inputParam.putAll(moduleMap);
					if(StringUtils.isNotEmpty(interDto.getRuleGroupCode())){
						moduleMsg=iRuleCompute.isHitRuleGroup(interDto.getRuleGroupCode(),inputParam);
						if(moduleMsg){
							//接口信息放入日志表
							interfaceLogDto.setInterfaceNo(interDto.getInterfaceNo());//接口编码
							interfaceLogDto.setBusinessCode(interDto.getBusinessCode());//业务编码
							
							//5、根据接口获取参数,并且解析入参（接口：参数）和数据库中该接口参数对比校验参数是否齐全，不全返回提示参数缺失或者有空信息
							Map<String, Object> paramsMap = (Map<String, Object>)interfaceMap.get(interDto.getInterfaceNo());//解析入参对应接口所有对应参数
							if(null!=paramsMap){
							    //如果入参中isInvoking为1的话则调用接口，为0的话则不调用接口
								String isInvoking = "";
								if (null != paramsMap.get("isInvoking")) {
									isInvoking = String.valueOf(paramsMap.get("isInvoking"));
								}
							    if(InterfaceEnum.IS_INVOKING_1.getKey().equals(isInvoking)){
    								paramsMsg =this.getInterfaceParamsByInterfaceNo(interDto,paramsMap,paramsMsg);							
    								if("".equals(paramsMsg)){
    									//6、根据接口中调用方式（POST/GET）和参数类型（JSON/XML）拼接入参和判断要调用的方法
    									Date date = new Date();
    									String result =this.getResult(interDto.getInterfaceParamsType(),interDto.getInterfaceSendType(),
    											interDto.getInterfaceUrl(),paramsMap,interfaceLogDto,responseBody);									
    									
    					            	resultsMap.put(interDto.getInterfaceNo(), result);	
    						            if("viewMsg".equals(result)){
    						            	resultsMap.put(interDto.getInterfaceNo(), "");
    						    			errorMsg+="接口["+interfaceLogDto.getInterfaceNo()+"]调用失败，没有配置模板或模板有问题！";
    						            	retCode=ExtHttpStatus.RET_CODE_FAIL4;
    						            }else{
    						            	//接口数据落地保存
    										Map<String,Object> map=new HashMap<String,Object>();//映射类方法参数
    										map.put("prod", requestBody.getProd());
    										map.put("org", requestBody.getOrg());
    										map.put("sysCode", sysCode);
    										map.put("className", interDto.getClassName());
    										map.put("result", result);
    										interfaceLogDto.setReqTime(Timestamp.valueOf(format.format(date)));
    										map.put("interfaceLogDto", interfaceLogDto);
    										map.putAll(paramsMap);
    										try {
                                                this.saveResultMessage(map);
                                            }
                                            catch (Exception e) {
                                                e.printStackTrace();
                                            }
    						            }
    						            if(StringUtils.isEmpty(result)){
    						            	retCode=ExtHttpStatus.RET_CODE_ERROR;
    						            	errorMsg+="接口["+interfaceLogDto.getInterfaceNo()+"]调用失败，返回为空！";
    						            }else if(StringUtils.isNotEmpty(result) && result.contains("Read timed out")){
                                            retCode=ExtHttpStatus.RET_CODE_ERROR;
                                            errorMsg+="接口["+interfaceLogDto.getInterfaceNo()+"]调用失败，接口超时！";
                                        }else if(!"viewMsg".equals(result)){
    										errorMsg+="接口["+interDto.getInterfaceNo()+"]调用成功！";
    										retCode=ExtHttpStatus.RET_CODE_SUC;
    						            }
    								}else{
    									retCode=ExtHttpStatus.RET_CODE_FAIL1;
    									errorMsg+=paramsMsg;
    								}
							    }
							}else{
								errorMsg+="接口["+interDto.getInterfaceNo()+"]没有在功能点["+interfaceLogDto.getReqFuncCode()+"]中配置 或者 没有在入参中传入！";
				            	retCode=ExtHttpStatus.RET_CODE_FAIL5;
							}
						}else{
			            	errorMsg+="接口["+interDto.getInterfaceNo()+"]没有命中规则集！";
			            	retCode=ExtHttpStatus.RET_CODE_FAIL3;
			            }
					}else{
						errorMsg+="接口["+interDto.getInterfaceNo()+"]没有分配规则集！";
		            	retCode=ExtHttpStatus.RET_CODE_FAIL7;
					}
				}
			}else{
				errorMsg+="功能点["+interfaceLogDto.getReqFuncCode()+"]没有配置对应接口！";
				retCode=ExtHttpStatus.RET_CODE_FAIL5;
			}
		}else{
			errorMsg+="系统没有通过挡板规则:"+ ruleMsgMap.get("errorMsg");
			retCode=ExtHttpStatus.RET_CODE_FAIL2;
		}
		responseBody.setRetCode(retCode);
		responseBody.setRetMsg(errorMsg);
		responseBody.setRetTime(format.format(new Date()));
		jsonObject.putAll(resultsMap);
		responseBody.setInterfaceData(jsonObject.toString());
		return responseBody;
	}

	/**
	 * 接口返回数据解析落地保存映射
	 *
	 * @throws Exception 
	 */
	private void saveResultMessage(Map<String,Object> map) throws Exception {
		// TODO Auto-generated method stub
		ExtSaveMessageDao service= (ExtSaveMessageDao)AppContextBean.getApplicationContext().getBean(String.valueOf(map.get("className")));
		service.getClass().getMethod("saveMessage",Map.class).invoke(service, map);			
	}

	/**
	 * 根据接口中调用方式（POST/GET）和参数类型（JSON/XML）拼接入参和判断要调用的方法
	 * @param interfaceParamsType
	 * @param interfaceSendType
	 * @param url
	 * @param paramsMap
	 * @param interfaceLogDto
	 * @param responseBody 
	 * @return
	 */
	private String getResult(String interfaceParamsType,String interfaceSendType, String url, Map<String, Object> paramsMap, 
			ExtInterfaceLogDTO interfaceLogDto, ResponseBodyDTO responseBody) {
		// TODO Auto-generated method stub
		String result="";
		if(InterfaceEnum.GET.getKey().equals(interfaceSendType)){
			if(InterfaceEnum.JSON.getKey().equals(interfaceParamsType)){
		    	if(paramsMap != null && !paramsMap.isEmpty()) {
					url += "?";
					Set<Entry<String, Object>> set = paramsMap.entrySet();
					List<Entry<String, Object>> list = new ArrayList<Entry<String, Object>>();
					list.addAll(set);
					for(int i = 0; i < list.size(); i++) {
						Entry<String, Object> en = list.get(i);
						if(i == list.size() - 1) {
							url += en.getKey()+"="+en.getValue();
						} else {
							url += en.getKey()+"="+en.getValue()+"&";
						}
					}
				}
				interfaceLogDto.setReqBody(" 请求参数："+url);
				result = TransferInteface.executeHttpGet(url, paramsMap, interfaceLogDto);
			}
		}else{
			String viewMsg = iRuleCompute.getContent(interfaceLogDto.getInterfaceNo(), paramsMap);
			if(StringUtils.isNotEmpty(viewMsg)){
		    	 if(viewMsg.indexOf("{")>-1){
		    		 viewMsg=viewMsg.substring(viewMsg.indexOf("{"),viewMsg.lastIndexOf("}")+1);
		    	 }
		    	 interfaceLogDto.setReqBody(" 请求参数："+viewMsg);
				if(InterfaceEnum.JSON.getKey().equals(interfaceParamsType) && InterfaceEnum.POST.getKey().equals(interfaceSendType)){
					result = TransferInteface.executeHttpPost(url, viewMsg, interfaceLogDto);
				}else if(InterfaceEnum.XML.getKey().equals(interfaceParamsType) && InterfaceEnum.POST.getKey().equals(interfaceSendType)){
					result =TransferInteface.executeHttpPostEsbByXml(url, viewMsg, interfaceLogDto);
				}
			}else{
				result="viewMsg";
			}			
		}

		return result;
	}

	/**
	 * 根据接口编码查询接口参数
	 * @param
	 * @return
	 * @throws Exception
	 */
	private String getInterfaceParamsByInterfaceNo(ExtFunctionInterfaceRefDTO interDto,Map<String, Object> paramsMap,String paramsMsg) throws Exception {
		//特殊接口参数值处理
	    //算话征信人行信用报告 SHZXPRC_9002 需要设置 orgcode以及hash值
	    if(StringUtils.isNotEmpty(interDto.getInterfaceNo()) && interDto.getInterfaceNo().equals(ExtConstant.SHZX_INTERFACE_NO)){
	        String orgcode = sysConfigAPI.getValue("SHZX_ORG_CODE");//机构号
	        String orgkey = sysConfigAPI.getValue("SHZX_ORG_KEY");//机构私钥
	        Map<String, String> param = new TreeMap<String, String>();
	        param.put("orgcode", orgcode);
	        param.put("name", (String) paramsMap.get("name"));
	        param.put("idCard", (String) paramsMap.get("idCard"));
	        MD5EncodeUtil.hash(param, orgkey);

            paramsMap.put("orgcode", orgcode);
	        paramsMap.put("hash", param.get("hash"));
	    }else if(StringUtils.isNotEmpty(interDto.getInterfaceNo()) && interDto.getInterfaceNo().equals(ExtConstant.SHGX_INTERFACE_NO)){
	        String orgcode = sysConfigAPI.getValue("SHZX_ORG_CODE");//机构号
	        paramsMap.put("sorgcode", orgcode);
	    }
	    
		Map<String, Object> searchParams5 = new HashMap<String, Object>();
		ExtInterfaceParamsRefDTO dto5=new ExtInterfaceParamsRefDTO();
		dto5.setInterfaceNo(interDto.getInterfaceNo());//接口编码
		dto5.setValidateState(InterfaceEnum.VALIDATE_TRUE.getKey());
		searchParams5.put("dto", dto5);
		List<ExtInterfaceParamsRefDTO> paramsList = extInterfaceParamsRefService.searchExtInterfaceParamsRef(searchParams5);//表中接口参数信息
		String params="";
		if(CollectionUtils.isNotEmpty(paramsList)){
			for(ExtInterfaceParamsRefDTO  paramsDto :paramsList){//表中获取的参数								
				if(!paramsMap.containsKey(String.valueOf(paramsDto.getParamsCode()))){//从入参中解析到的参数的值	
					params+=paramsDto.getParamsCode()+",";														
				}
			}
			if(StringUtils.isNotEmpty(params)){
				paramsMsg="接口["+interDto.getInterfaceNo()+"]的参数["+params+"]缺失或者参数值为空，不符合调用接口要求！";	
			}
		}
		return paramsMsg;
	}

	/**
	 * 根据功能点获取接口信息
	 * @param reqFuncCode
	 * @return
	 * @throws Exception
	 */
	private List<ExtFunctionInterfaceRefDTO> getInterfaceByFuncCode(String sysCode, String reqFuncCode,String confType) throws Exception {
		// TODO Auto-generated method stub
		Map<String, Object> searchParams = new HashMap<String, Object>();
		ExtFunctionInterfaceRefDTO dto=new ExtFunctionInterfaceRefDTO();
		dto.setSysCode(sysCode);
		dto.setFuncTypeCode(reqFuncCode);//功能点编码
		dto.setConfType(confType);//配置类型(1-接口分配规则集  2-调用点分配规则集)
		dto.setValidateState(InterfaceEnum.VALIDATE_TRUE.getKey());
		searchParams.put("dto", dto);
		List<ExtFunctionInterfaceRefDTO> interfaceList = extFunctionInterfaceRefService.searchExtFunctionInterfaceRef(searchParams);//接口信息
	    return interfaceList;
	}

	/**
	 * 根据挡板规则、产品、机构、功能点、系统时间去和数据库对比，符合挡板规则 则根据功能点查询出接口信息，否则返回规则不符合不能调用接口
	 * @param errorMsg
	 * @param ruleMsg
	 * @param ruleList
	 * @param interfaceLogDto
	 * @return ruleMsg
	 * @throws Exception
	 */
	private Map<String, Object> isInvokeFilterRule(String errorMsg, String ruleMsg,
			List<ExtInvokeFilterRuleDTO> ruleList, ExtInterfaceLogDTO interfaceLogDto) throws Exception {
		// TODO Auto-generated method stub
		if(CollectionUtils.isNotEmpty(ruleList)){
			for(ExtInvokeFilterRuleDTO ruleDto :ruleList){
				
				Map<String, Object> searchParams = new HashMap<String, Object>();
				ExtInvokeFilterRuleDTO dto =new ExtInvokeFilterRuleDTO();
				dto.setId(ruleDto.getId());//挡板规则ID
				dto.setValidTermdate(new Date());//系统时间
				dto.setValidateState(InterfaceEnum.VALIDATE_TRUE.getKey());
		    	searchParams.put("dto", dto);
				List<ExtInvokeFilterRuleDTO> filterRuleList= extInvokeFilterRuleService.searchExtInvokeFilterRule(searchParams);
				
				Map<String, Object> searchParams1 = new HashMap<String, Object>();
				LbtIntoFilterRuleMapDTO dto1=new LbtIntoFilterRuleMapDTO();
				dto1.setRuleId(ruleDto.getId());//挡板规则ID
				dto1.setMapType(InterfaceEnum.PROD.getKey());
				dto1.setMapCode(interfaceLogDto.getReqProCode());//产品
				searchParams1.put("dto", dto1);
				List<ExtInvokeFilterRuleMapDTO> filterRuleMap1List = extInvokeFilterRuleMapService.searchExtInvokeFilterRuleMap(searchParams1);
				
				Map<String, Object> searchParams2 = new HashMap<String, Object>();
				LbtIntoFilterRuleMapDTO dto2=new LbtIntoFilterRuleMapDTO();
				dto2.setRuleId(ruleDto.getId());//挡板规则ID
				dto2.setMapType(InterfaceEnum.ORG.getKey());
				dto2.setMapCode(interfaceLogDto.getReqOrgCode());//机构
				searchParams2.put("dto", dto2);
				List<ExtInvokeFilterRuleMapDTO> filterRuleMap2List = extInvokeFilterRuleMapService.searchExtInvokeFilterRuleMap(searchParams2);
				
				Map<String, Object> searchParams3 = new HashMap<String, Object>();
				LbtIntoFilterRuleMapDTO dto3=new LbtIntoFilterRuleMapDTO();
				dto3.setRuleId(ruleDto.getId());//挡板规则ID
				dto3.setMapType(InterfaceEnum.FUNC.getKey());
				dto3.setMapCode(interfaceLogDto.getReqFuncCode());//功能点
				searchParams3.put("dto", dto3);
				List<ExtInvokeFilterRuleMapDTO> filterRuleMap3List = extInvokeFilterRuleMapService.searchExtInvokeFilterRuleMap(searchParams3);
				
				if(null!=filterRuleList && filterRuleList.size()>0){
					if((InterfaceEnum.VALIDATE_TRUE.getKey().equals(filterRuleList.get(0).getIsProLimit()) && null!=filterRuleMap1List && filterRuleMap1List.size()>0)
							|| InterfaceEnum.VALIDATE_FALSE.getKey().equals(filterRuleList.get(0).getIsProLimit())){
						if((InterfaceEnum.VALIDATE_TRUE.getKey().equals(filterRuleList.get(0).getIsStoreLimit()) && null!=filterRuleMap2List && filterRuleMap2List.size()>0)
								|| InterfaceEnum.VALIDATE_FALSE.getKey().equals(filterRuleList.get(0).getIsStoreLimit())){
							if(null!=filterRuleMap3List && filterRuleMap3List.size()>0){
								ruleMsg="true";
								break;
							}else{
								ruleMsg="false";
								errorMsg+=InterfaceEnum.FUNC_MSG.getValue();
							}
						}else{
							ruleMsg="false";
							errorMsg+=InterfaceEnum.ORG_MSG.getValue();
						}
					}else{
						ruleMsg="false";
						errorMsg+=InterfaceEnum.PROD_MSG.getValue();
					}
				}else{
					ruleMsg="false";
					errorMsg+=InterfaceEnum.VALIDATE_MSG.getValue();
				}
			}
		}
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("ruleMsg", ruleMsg);
		map.put("errorMsg", errorMsg);
		return map;
	}

	/**
	 * 根据系统编码查询出挡板规则编码
	 * @param sysCode
	 * @return ruleList
	 * @throws Exception
	 */
	private List<ExtInvokeFilterRuleDTO> getInvokeFilterRuleBySysCode(
			String sysCode) throws Exception {
		// TODO Auto-generated method stub
		Map<String, Object> searchParams = new HashMap<String, Object>();
		ExtInvokeFilterRuleDTO dto =new ExtInvokeFilterRuleDTO();
		dto.setSysCode(sysCode);//系统编码
		dto.setValidateState(InterfaceEnum.VALIDATE_TRUE.getKey());
    	searchParams.put("dto", dto);
		List<ExtInvokeFilterRuleDTO> ruleList= extInvokeFilterRuleService.searchExtInvokeFilterRule(searchParams);
		return ruleList;
	}
	/**
	 * 根据系统编码和功能点编码查询接口编码
	 * @param rstObj
	 * @param responseBody
	 * @return
	 * @throws Exception
	 */
	public ResponseBodyDTO2 queryInterfaceNo(RequestBodyDTO2 requestBody,ResponseBodyDTO2 responseBody) throws Exception {
		// TODO Auto-generated method stub
		String errorMsg="";//返回的错误信息
		String retCode="";//返回编码
		List<Map<String,String>> list=new ArrayList<Map<String,String>>();//接口返回结果集
		JSONArray jsonArray =new JSONArray();
		String sysCode=requestBody.getSysCode();//系统编码
		String funcType=requestBody.getFuncType();//功能类型编码
		String funcPointType=requestBody.getFuncPointType();//功能点编码
		//返回信息
		responseBody.setFrontTransNo(requestBody.getFrontTransNo());//入参交易流水编号
		responseBody.setSysCode(sysCode);
		responseBody.setFuncType(funcType);
		responseBody.setFuncPointType(funcPointType);
		
		List<ExtFunctionInterfaceRefDTO> interfaceList=this.getInterfaceByFuncCode(sysCode,funcPointType ,InterfaceEnum.CONF_TYPE_1.getKey());
		if(CollectionUtils.isNotEmpty(interfaceList)){
			for(ExtFunctionInterfaceRefDTO  interDto :interfaceList){
				Map<String,String> resultsMap=new HashMap<String,String>();
				resultsMap.put("interfaceCode", interDto.getInterfaceNo());
				resultsMap.put("interfaceName", interDto.getInterfaceName());
				list.add(resultsMap);
			}
			retCode=ExtHttpStatus.RET_CODE_SUC;
			errorMsg="调用成功！";
		}else{
			retCode=ExtHttpStatus.RET_CODE_SUC;
			errorMsg="查询结果为空！";
		}

		jsonArray.addAll(list);
		responseBody.setInterfaceList(jsonArray.toString());
		responseBody.setRetCode(retCode);
		responseBody.setRetMsg(errorMsg);
		responseBody.setRetTime(format.format(new Date()));
		return responseBody;
	}

	
	/**
	* @title: queryHitDetail
	* @author:陈东栋
	* @description: 查询调用点命中规则集详情
	* @date 2017年6月26日 下午6:46:32
	* @param requestBody
	* @param responseBody
	* @return
	* @throws Exception
	* @throws 
	*/ 
	@SuppressWarnings("unchecked")
	public ResponseBodyDTO3 queryHitDetail(RequestBodyDTO3 requestBody,ResponseBodyDTO3 responseBody) throws Exception {
		boolean feedBack = true;
		String retCode = ExtConstant.RET_CODE_SUC;
		String errorMsg = "";// 返回的错误信息
		String sysCode=requestBody.getSysCode();//系统编码
		String funcType=requestBody.getFuncType();//功能类型编码
		String funcPointType=requestBody.getFuncPointType();//功能点编码
		//返回信息
		responseBody.setFrontTransNo(requestBody.getFrontTransNo());//入参交易流水编号
		responseBody.setSysCode(sysCode);
		responseBody.setFuncType(funcType);
		responseBody.setFuncPointType(funcPointType);
		//判断调用点是否命中配置的规则集			
		List<ExtFunctionInterfaceRefDTO> funcRuleGroupList=this.getInterfaceByFuncCode(sysCode,funcPointType,InterfaceEnum.CONF_TYPE_2.getKey());
		if(CollectionUtils.isNotEmpty(funcRuleGroupList)){
			String ruleGroupCode = funcRuleGroupList.get(0).getRuleGroupCode();
			if(StringUtils.isNotEmpty(ruleGroupCode)){
				//指标信息
				Map<String, Object> moduleMap= JsonUtil.fromJson(requestBody.getModuleData(), Map.class);//指标
				InputParam inputParam =new InputParam();
			    inputParam.putAll(moduleMap);
				Map<String, Object> hitRuleGroupMap = iRuleCompute.dealHitRuleGroup(ruleGroupCode, inputParam);
				feedBack = (Boolean) hitRuleGroupMap.get("hitStatus");
				if(!feedBack){
					String hitDetail = String.valueOf(hitRuleGroupMap.get("hitDetail"));
					responseBody.setHitDetail(hitDetail);
				}
			}
		}
		responseBody.setFeedBack(feedBack);
		responseBody.setRetCode(retCode);
		responseBody.setRetMsg(errorMsg);
		return responseBody;
	}
}
