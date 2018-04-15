package com.jy.modules.reportbefloan.service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fintech.platform.api.sysdict.SysDictAPI;
import com.fintech.platform.core.common.JYLoggerUtil;
import com.fintech.platform.core.message.ResponseMsg;
import com.fintech.platform.restclient.http.RestClient;
import com.jy.modules.common.MyBatisPageInfoExt;
import com.jy.modules.reportbefloan.dao.IntoAppTimeDao;

/**
 * 组装进件审批时效报表信息
 * @author chengang
 *
 */
@Service("com.jy.modules.reportbefloan.service.IntoApprovalTimeService")
public class IntoApprovalTimeService implements BaseBiz{
	private static long nh = 1000 * 60 * 60;// 一小时的毫秒数  
	private static long nm = 1000 * 60 ;// 一分钟的毫秒数
	
	private String jyptAppId = "jypt";
	private int chuShenCun = 5;//初审用时个数5次
	private int buChongCun = 4;//补充资料用时个数4次
	private int lastAuditCun = 2;//终审 用时 个数
	private int pageSize = 3000;
	private static int POOL_SIZE = 2;
	private static int cpuNums = Runtime.getRuntime().availableProcessors();
	private static ExecutorService makeupCtpPool = Executors.newFixedThreadPool(cpuNums * POOL_SIZE * 5);
	private static ExecutorService batchInserExePool = Executors.newFixedThreadPool(cpuNums * POOL_SIZE * 5);
	private static ExecutorService exePool = Executors.newFixedThreadPool(cpuNums * POOL_SIZE *5);
	private static final long serialVersionUID = 4906387692204953690L;
	//@Autowired
	/*@Qualifier("com.jy.platform.jbpm4.service.impl.BizCalendarService")
	private BizCalendarService calen;*/
	@Autowired
	private SysDictAPI sysDictAPI;
	@Autowired
	private IntoAppTimeDao dao;
	/**
	 * 获取进件 审批时效报表信息
	 * @return
	 * @throws Exception
	 */
	public Map<String,Object> obtainIntoInfoReport(String batchMinId,String batchMaxId) throws Exception{
		
		int curPage = 1;
		int totalPage = 0;
		Map<String,Object> searchParm = new HashMap<String,Object>();
		int beginrow = pageSize*(curPage - 1);
		int endrow = pageSize * curPage;
        searchParm.put("beginrow", beginrow);
        searchParm.put("endrow", endrow);
        searchParm.put("page", "page");//
        
        searchParm.put("tranName", "");
        searchParm.put("intoId", "");
        searchParm.put("minId", batchMinId);//此批次的最小ID
        searchParm.put("maxId", batchMaxId);//此批次的最大ID
		//调用分页 接口 获取进件信息
		List<Map<String,Object>> intoList = dao.queryIntoInfoListByPage(searchParm);
		if(intoList.size() >0){
			intoList = this.makeupExtInfo(intoList);
			//将生成的进件审批时效数据保存至数据库表中
			this.insertIntoAppTimeListInfo(intoList);
		}
		
		int totalCount = MyBatisPageInfoExt.getTotalCountOfListByPage(intoList);
		
		//分页查询处理
		if(totalCount > pageSize) totalPage = totalCount/pageSize +1;
		
		if(totalPage <=1) return null;
		
		CountDownLatch countDown = new CountDownLatch(totalPage);//线程计数器
		for (int i = 1; i < totalPage +1; i++) {
			int tcurPage = i +1;
			//多线程 查询补充其他信息
			MultIntoApprovalTimeCommand command = new MultIntoApprovalTimeCommand(this,tcurPage,batchMinId,batchMaxId,countDown);
			exePool.execute(command);
		}
		
		countDown.await();//等待子线程都执行完了再执行主线程剩下的动作
		
		return null;
	}
	/**
	 * 批量处理第 curPage页数据
	 * @throws Exception 
	 */
	public void execute(int curPage,String batchMinId,String batchMaxId) throws Exception {
		if(curPage < 1) return ;
		
		Map<String,Object> tmp = new HashMap<String,Object>();
		tmp.put("beginrow", pageSize*(curPage - 1));
		tmp.put("endrow", pageSize * curPage);
		tmp.put("page", "page");//
		tmp.put("minId", batchMinId);//此批次的最小ID
		tmp.put("maxId", batchMaxId);//此批次的最大ID
		List<Map<String,Object>> dataList = dao.queryIntoInfoListByPage(tmp);
		
		if(dataList == null || dataList.size() == 0) return ;
		dataList = this.makeupExtInfo(dataList);
		//将生成的进件审批时效数据保存至数据库表中
		this.insertIntoAppTimeListInfo(dataList);
		
	}
	/**
	 * 批量保存数据
	 * @param intoList
	 */
	//@Transactional(rollbackFor=Exception.class)
	public void insertIntoAppTimeListInfo(List<Map<String, Object>> intoList) throws Exception{
		if(intoList == null || intoList.size() == 0) return ;
		//JYLoggerUtil.logCurrentTime("insertRPT", true, this.getClass());
		
		Map<String,Object> parm = new HashMap<String,Object>();
		parm.put("dataList", intoList);
		//dao.batchInsertIntoAppTimeInfo(parm);
		
		//for循环插入
		for(final Map<String,Object> dto : intoList){
			final String key = String.valueOf((BigDecimal) dto.get("ID"));
			//防止 并发操作
			/*if(!ThreadTool.INTO_TIME_THREAD_MAP.containsKey(key)){
				ThreadTool.INTO_TIME_THREAD_MAP.put(key, key);*/
				batchInserExePool.execute(new Runnable() {
					public void run() {
						try {
							Map<String,Object> temParm = new HashMap<String,Object>();
							temParm.put("dto", dto);
							dao.insertIntoAppTimeInfo(temParm);
						} catch (Exception e) {
							JYLoggerUtil.error(this.getClass(), "==dao.insertIntoAppTimeInfo==error=ID:"+key,e);
							//e.printStackTrace();
						}
						//ThreadTool.INTO_TIME_THREAD_MAP.remove(key);
					}
				});
			//}
			
		}
		
		//JYLoggerUtil.logCurrentTime("insertRPT", false, this.getClass());
	}
	/**
	 * 清空表数据 rpt_into_app_time
	 * @throws Exception
	 */
	public void truncateRptIntoAppTimeTable() throws Exception{
		dao.truncateRptIntoAppTimeTable();
	}
	
	/**
	 * 组装进件的其他数据信息
	 * @param intoList
	 * @return
	 * @throws Exception 
	 */
	private List<Map<String, Object>> makeupExtInfo(List<Map<String, Object>> intoList) throws Exception {
		int count = 0; 
		if(intoList!= null)count = intoList.size();
		
		final CountDownLatch cd = new CountDownLatch(count);//线程计数器
		
		for (int i = 0; i < count; i++) {
			final Map<String,Object> temp = intoList.get(i);
			final String isReaudit = (String) temp.get("IS_REAUDIT");//是否发起客户复议(0.正常进件1.复议）
			final String auditeState =  (String) temp.get("AUDITE_STATE");//进件状态
			//进行审批之后才可以进行后续的统计信息
			if(Integer.parseInt(auditeState) <= 2000){
				cd.countDown();
				//继续下一个进件
				 continue;
			}
			MultMakeupIntoExtInfoCommand command = new MultMakeupIntoExtInfoCommand(temp,auditeState,isReaudit,this,dao,cd);
			makeupCtpPool.execute(command);
		}
		
		cd.await();//等待子线程都执行完了再执行主线程剩下的动作
		
		return intoList;
	}
	/**
	 * 办理初审人员  办理终审人员 办理信审室 办理复议终审人员
	 * @param temp
	 * @param param
	 */
	public void makeupIntoAuditPersonOrgInfo(Map<String, Object> temp,Map<String, Object> param) {
		List<Map<String, Object>> dataList = dao.queryIntoAuditPersonOrgInfo(param);
		for (int i = 0; i < dataList.size(); i++) {
			Map<String,Object> tmp = dataList.get(i);
			String myType = (String) tmp.get("MY_TYPE");
			
			String userId = (String) tmp.get("CREATE_BY");
			if("信审初审".equals(myType)){
				temp.put("CRE_ORG_ID", tmp.get("ORG_ID"));//信审专员所在机构部门
				temp.put("CRE_FISRT_USER", userId);//信审专员
			}
			if("信审终审".equals(myType)){
				temp.put("CRE_LAST_USER", userId);//信审终审
			}
			if("复议终审".equals(myType)){
				temp.put("REC_AUDIT_USER", userId);//复议终审
			}
			
		}
	}

	/**
	 * 终审 用时
	 * @param temp
	 * @param param
	 */
	public void makeupLastAudit(Map<String, Object> temp,Map<String, Object> param) {
		List<Map<String, Object>> ext2_2 = dao.queryIntoInfoExt2_2(param);
		for (int i = 0; i < ext2_2.size(); i++) {
			if(i > lastAuditCun -1) break;
			Map<String,Object> ext2_2Map = ext2_2.get(i);
			String startTime = (String) ext2_2Map.get("START_TIME");
			String endTime = (String) ext2_2Map.get("END_TIME");
			String assignee = (String) ext2_2Map.get("ASSIGNEE");//终审人员
			String key = "LAST_AUDIT_"+(i+1);
			String value = this.calendarWorkTime(startTime,endTime);//"1";//startTime - endTime;
			temp.put(key, value);
			temp.put("ST_"+key, startTime);
			temp.put("ET_"+key, endTime);
			temp.put("ET_"+key, endTime);
			if(i < 2){//只保留 一级 二级 终审人员ID
				temp.put("NAME_"+key, assignee);
			}
		}
	}

	/**
	 * 补充调查用时
	 * @param temp
	 * @param param
	 */
	public void makeupBuChongExamen(Map<String, Object> temp, Map<String, Object> param) {
		Map<String, Object> pm = new HashMap<String,Object>();
		pm.putAll(param);
		pm.put("tranName","提交");//信审专员 提交说明是 补充调查操作
		List<Map<String, Object>> ext2_1 = dao.queryIntoInfoExt2_1(pm);
		for (int i = 0; i < ext2_1.size(); i++) {
			if(i > chuShenCun -1) break;//暂时只最多保留4次的  补充资料用时
			Map<String,Object> ext2_1Map = ext2_1.get(i);
			String startTime = (String) ext2_1Map.get("START_TIME");
			String endTime = (String) ext2_1Map.get("END_TIME");
			
			String key = "EXAMEN_"+(i+1);
			
			String value = this.calendarWorkTime(startTime,endTime);//"1";//startTime - endTime;
			temp.put(key, value);
			temp.put("ST_"+key, startTime);
			temp.put("ET_"+key, endTime);
		}
		
	}
	/**
	 * 
	 * @param startTime 2014-11-01 09:30:00
	 * @param endTime 2016-02-01 10:00:00
	 * @return 2632.30 （小时)
	 */
	private String calendarWorkTime(String startTime, String endTime) {
		//startTime = "2015-05-11 12:44:12";
		//endTime ="2015-05-11 13:35:03";
		if(StringUtils.isEmpty(startTime) || StringUtils.isEmpty(endTime) 
		   ||"null".equals(startTime) ||"null".equals(endTime)
		   ||"".equals(startTime) ||"".equals(endTime)) return "0";
		String value = "0";
		long worktime = 0L;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
			//worktime = calen.getWorkTime(sdf.parse(startTime).getTime(), sdf.parse(endTime).getTime());
		} catch (Exception e) {
			worktime = 0L;
			JYLoggerUtil.error(this.getClass(), "=startTime:"+startTime+",endTime:"+endTime,e);
			//e.printStackTrace();
		}
		/*float dd = Float.parseFloat(String.valueOf(worktime/nh)) +Float.parseFloat(String.valueOf(((worktime%nh)/nm)))/60f;
		NumberFormat nf = NumberFormat.getInstance();
		nf.setRoundingMode(RoundingMode.HALF_UP);//设置四舍五入
        nf.setMinimumFractionDigits(2);//设置最小保留几位小数
        nf.setMaximumFractionDigits(2);//设置最大保留几位小数
        value = nf.format(dd);*/
		value = String.valueOf(worktime/nm);
		//if("0.00".equals(value)) value = "0";
		return value;
	}
	/**
	 * 初审用时
	 * @param temp
	 * @param param
	 */
	public void makeupChuShen(Map<String, Object> temp, Map<String, Object> param) {
		List<Map<String, Object>> ext2_1 = dao.queryIntoInfoExt2_1(param);
		for (int i = 0; i < ext2_1.size(); i++) {
			if(i > chuShenCun -1) break;//暂时只最多保留4次的  补充资料用时
			Map<String,Object> ext2_1Map = ext2_1.get(i);
			String startTime = (String) ext2_1Map.get("START_TIME");
			String endTime = (String) ext2_1Map.get("END_TIME");
			
			String key = "FIRST_AUDIT_"+(i+1);
			String value = this.calendarWorkTime(startTime,endTime);//"1";//startTime - endTime;
			temp.put(key, value);
			temp.put("ST_"+key, startTime);
			temp.put("ET_"+key, endTime);
		}
		boolean flag = true;
		String oldAssignee = null;
		for (int i = 0; i < ext2_1.size(); i++) {
			Map<String,Object> ext2_1Map = ext2_1.get(i);
			String assignee = (String) ext2_1Map.get("ASSIGNEE");
			if(StringUtils.isEmpty(oldAssignee)){
				oldAssignee = assignee;
			}else{
				//信审初审是否同一人完成
				if(!oldAssignee.equals(assignee)){
					flag = false;
					break;
				}
					
			}
			
		}
		if(flag){
			temp.put("EXT3", "是");//信审初审是否同一人完成
		}else{
			temp.put("EXT3", "否");
		}
		
	}

	/**
	 * 补充资料数量 及 补充资料用时
	 * @param temp
	 * @param param
	 */
	public void makeupBuChongZiLiao(Map<String, Object> temp, Map<String, Object> param) {
		List<Map<String, Object>> ext2 = dao.queryIntoInfoExt2(param);
		temp.put("ATTACH_NUMBER", ext2.size());//补充材料次数
		for (int j = 0; j < ext2.size(); j++) {
			if(j >buChongCun -1) break;//暂时只最多保留4次的  补充资料用时
			Map<String,Object> ext2Map = ext2.get(j);
			String startTime = (String) ext2Map.get("START_TIME");
			String endTime = (String) ext2Map.get("END_TIME");
			
			String key = "ATT_NUM_"+(j+1);
			String value = this.calendarWorkTime(startTime,endTime);//"1";//startTime - endTime;
			temp.put(key, value);
			
			temp.put("ST_"+key, startTime);
			temp.put("ET_"+key, endTime);
		}
		
	}
	/**
	 * 获取反欺诈 相关信息
	 * @param temp
	 * @param param
	 */
	public void makeupAntifraudInfo(Map<String, Object> temp, Map<String, Object> param){
		Map<String, Object> pm = new HashMap<String,Object>();
		pm.putAll(param);
		pm.put("actName", "反欺诈");
		//pm.put("tranName","提交");
		List<Map<String, Object>> ext2 = dao.queryIntoInfoActNameInfo(pm);
		if(ext2.size() >0){
			Map<String,Object> ext2Map = ext2.get(0);
			String startTime = (String) ext2Map.get("START_TIME");
			String endTime = (String) ext2Map.get("END_TIME");
			String assignee = (String) ext2Map.get("ASSIGNEE");//反欺诈人员ID
			String keys = "ST_ANTIFRAUD";
			String keye = "ET_ANTIFRAUD";
			String key = "ANTIFRAUD_TIME";
			String value = this.calendarWorkTime(startTime,endTime);//"1";//startTime - endTime;
			temp.put(key, value);
			temp.put(keys, startTime);
			temp.put(keye, endTime);
			temp.put("EXT1", assignee);//反欺诈人员ID
		}
		
	}
	/**
	 * 组装 进件 的 稽核流程信息
	 * @param temp
	 * @param param
	 */
	public void makeupOnlineInfo(Map<String,Object> temp, Map<String,Object> param){
		
		Map<String, Object> pm = new HashMap<String,Object>();
		pm.putAll(param);
		pm.put("actName", "稽核");
		List<Map<String, Object>> dataList = dao.queryIntoInfoActNameInfo(pm);
		if(dataList.size() >0){
			boolean fistFlag = false;
			boolean lastFlag = false;
			for(Map<String,Object> dataMap :dataList){
				String an = (String) dataMap.get("ACTIVITY_NAME_");
				String startTime = (String) dataMap.get("START_TIME");
				String endTime = (String) dataMap.get("END_TIME");
				String assignee = (String) dataMap.get("ASSIGNEE");//稽核专员人员ID
				if("稽核专员初审".equals(an)){
					if(fistFlag) continue;
					String value = this.calendarWorkTime(startTime,endTime);//"1";//startTime - endTime;
					temp.put("ONLINE_TIME", value);
					temp.put("ST_ONLINE", startTime);
					temp.put("ET_ONLINE", endTime);
					temp.put("EXT2", assignee);//稽核专员人员ID
					fistFlag = true; 
				}else{
					if(lastFlag) continue;
					//稽核主管 、 稽核经理.... 稽核终审
					String value = this.calendarWorkTime(startTime,endTime);
					temp.put("TIME_ONLINE_LAST_1", value);
					temp.put("ST_ONLINE_LAST_1", startTime);
					temp.put("ET_ONLINE_LAST_1", endTime);
					temp.put("ONLINE_LAST_1", assignee);//稽核终审1人员ID
					lastFlag = true;
				}
				//稽核专员 稽核终审 都有值后 不在循环
				if(lastFlag && fistFlag) break;
			}
			
		}
	}
	
	/**
	 * 组装 进件 的 复议流程信息
	 * @param temp
	 * @param param
	 */
	public void makeupReconsiderFlowInfo(Map<String,Object> temp, Map<String,Object> param){
		
		Map<String, Object> pm = new HashMap<String,Object>();
		pm.putAll(param);
		pm.put("actName", "复议");
		List<Map<String, Object>> dataList = dao.queryIntoInfoActNameInfo(pm);
		if(dataList.size() >0){
			boolean fistFlag = false;
			boolean lastFlag = false;
			for(Map<String,Object> dataMap :dataList){
				String an = (String) dataMap.get("ACTIVITY_NAME_");
				String startTime = (String) dataMap.get("START_TIME");
				String endTime = (String) dataMap.get("END_TIME");
				String assignee = (String) dataMap.get("ASSIGNEE");//复议专员人员ID
				if("复议专员".equals(an)){
					if(fistFlag) continue;
					String value = this.calendarWorkTime(startTime,endTime);//"1";//startTime - endTime;
					temp.put("REC_AUDIT_FIRST_USER_TIME", value);
					temp.put("ST_REC_AUDIT_FIRST_USER", startTime);
					temp.put("ET_REC_AUDIT_FIRST_USER", endTime);
					temp.put("REC_AUDIT_FIRST_USER", assignee);//复议专员人员ID
					fistFlag = true; 
				}else{
					if(lastFlag) continue;
					//复议 终审
					String value = this.calendarWorkTime(startTime,endTime);
					temp.put("REC_AUDIT_USER_TIME", value);
					temp.put("ST_REC_AUDIT_USER", startTime);
					temp.put("ET_REC_AUDIT_USER", endTime);
					//temp.put("ONLINE_LAST_1", assignee);//复议终审1人员ID
					lastFlag = true;
				}
				//复议专员 复议经理 都有值后 不在循环
				if(lastFlag && fistFlag) break;
			}
			
		}
	}
	/**
	 * 将待汇总的总数据信息
	 * 按集群机器进行平均分配
	 * 如总共40w,则A:10W,B:10W,C:10W,D:10W
	 * @throws Exception 
	 */
	public void distributedCalReprot() throws Exception{
		
		Map<String,String> data = dao.obtainBizDataMaxIdAndMinId();
		if(data == null) return ;
		Long minId = Long.parseLong(data.get("MIN_ID"));
		Long maxId = Long.parseLong(data.get("MAX_ID"));
		Long totalRow = Long.parseLong(data.get("TOTAL_ROW"));
		//分页查询处理
		int totalPage = (int) (totalRow/pageSize +1L);
		
		//获取字典表配置的集群环境信息地址
		List<Map> allList = sysDictAPI.getDictByKey("DIST_RST_URL");
		if(allList != null && allList.size() >0){
			distDealwith(minId,maxId,totalRow,allList);
			//distDealwith(totalPage,allList);
		}else{
			this.obtainIntoInfoReport(null,null);
		}
	}
	
	/**
	 * 分布式计算 处理调用
	 * @param minId
	 * @param maxId
	 * @param allList
	 * @throws Exception 
	 */
	private void distDealwith(Long minId, Long maxId,Long totalRow, List<Map> allList) throws Exception {
		int cunt = allList.size();
		//计算每台机器需要处理的数据量信息
		Long avgCun = totalRow/cunt;
		
		ExecutorService tpool = Executors.newFixedThreadPool(cunt);//根据系统资源情况灵活定义线程池大小//Executors.newCachedThreadPool();
		final CountDownLatch countDown = new CountDownLatch(cunt);//线程计数器
		//开始进行分布式任务分配及调用
		Long nextMaxId = 0L;
		for (int i = 0; i < cunt; i++) {
			Map sysCode = allList.get(i);
			String url = (String) sysCode.get("DICVALUE")+"/api/befloan/intoAppTimeRPT/dictCalReprot/v1/";
			if(i == 0){
				url+="/"+minId;
			}else{
				url+="/"+nextMaxId;
			}
			Long batchNum= avgCun*(i+1);
			Map<String,Object> search = new HashMap<String,Object>();
			search.put("cuntNum",batchNum);
			List<Map<String, Object>> maxIdList = dao.queryIntoInfoListByPage(search);
			if(maxIdList != null && maxIdList.size() >0){
				BigDecimal bd = (BigDecimal) maxIdList.get(0).get("ID");
				nextMaxId = Long.parseLong(bd.toString());
			}
			
			if(i == (cunt -1)){
				//如果是最后一台机器 则取 maxId
				url+="/"+maxId+1;
			}else{
				url+="/"+nextMaxId;
			}
			
			final String finalURI = url;
			JYLoggerUtil.info(this.getClass(), "==finalURI============"+finalURI);
			//多线程 查询补充其他信息
			tpool.execute(new Runnable() {
				public void run() {
					try{
						ResponseMsg<Void> responseMsg = RestClient.doGet(jyptAppId,finalURI, new TypeReference<ResponseMsg<Void>>() {});
					}catch (Exception e) {
						JYLoggerUtil.error(this.getClass(), e.getMessage(),e);
					}
					countDown.countDown();
				}
			});
			//暂时不用考虑
			//countDown.await();//等待所有子线程处理完
		}
		
	}
	/**
	 *  添加  信审流程审批结论 信审流程审批额度(元) 信审流程审批期限 只取信审 1000
	 * @param temp
	 * @param param
	 */
	public void makeupCreditInfo(Map<String, Object> temp, Map<String, Object> param) {
		
		Map<String, Object> pm = new HashMap<String,Object>();
		pm.putAll(param);
		pm.put("bizType", "1000"); //信审流程
		
		List<Map<String, Object>> ext2 = dao.queryAuditResulInfo(pm);
		if(ext2 != null && ext2.size()>0){
			Map<String,Object> ext2_2Map = ext2.get(0);
			temp.put("ONE_AUDIT_CONCLUSION",ext2_2Map.get("AUDIT_CONCLUSION"));//信审流程审批结论
			temp.put("ONE_APPR_AMOUNT",ext2_2Map.get("AUDIT_AMOUNT"));//信审流程审批额度(元)
			temp.put("ONE_APPR_PERIOD",ext2_2Map.get("LOAN_PERIOD"));//信审流程审批期限
		}
		
	}
	
	/**
	 *  添加  复议审批结论 、复议审批额度(元)、复议审批期限
	 * @param temp Reconsider
	 * @param param
	 */
	public void makeupReconsiderInfo(Map<String, Object> temp, Map<String, Object> param) {
		
		Map<String, Object> pm = new HashMap<String,Object>();
		pm.putAll(param);
		pm.put("bizType", "1001"); //复议流程
		
		List<Map<String, Object>> ext2 = dao.queryAuditResulInfo(pm);
		if(ext2 != null && ext2.size()>0){
			Map<String,Object> ext2_2Map = ext2.get(0);
			temp.put("REC_AUDIT_CONCLUSION",ext2_2Map.get("AUDIT_CONCLUSION"));//复议审批结论
			temp.put("REC_APPR_AMOUNT",ext2_2Map.get("AUDIT_AMOUNT"));//复议审批额度(元)
			temp.put("REC_APPR_PERIOD",ext2_2Map.get("LOAN_PERIOD"));//复议审批期限
		}
		
		
	}
}
