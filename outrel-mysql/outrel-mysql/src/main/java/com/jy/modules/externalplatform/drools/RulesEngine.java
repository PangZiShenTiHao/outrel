package com.jy.modules.externalplatform.drools;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.drools.KnowledgeBase;
import org.drools.KnowledgeBaseFactory;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderError;
import org.drools.builder.KnowledgeBuilderErrors;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.runtime.StatefulKnowledgeSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import redis.clients.jedis.ShardedJedis;

import com.fintech.modules.common.util.ObtainPropertiesInfo;
import com.fintech.platform.core.redis.JedisSentinelPool;
import com.jy.modules.externalplatform.drools.sysrulelist.dto.SysRuleListDTO;
import com.jy.modules.externalplatform.drools.sysrulelist.service.SysRuleListService;

@Service("com.jy.modules.externalplatform.drools.RulesEngine")
public class RulesEngine {
	private static final Logger logger = LoggerFactory.getLogger(RulesEngine.class);
	@Autowired
	private SysRuleListService sysRuleListService;
	@Autowired
	private JedisSentinelPool jedisSentinelPool;
	private static final String versionKey = ObtainPropertiesInfo.getValByKey("app.code") + ":" + "ruleDefVersion";

	private Map<String, KnowledgeBase> knowledgeBaseCache = new HashMap<String, KnowledgeBase>();

	private Map<String, String> versionCache = new HashMap<String, String>();

	public RulesEngine() {

	}

	public void execute(String ruleCode,String version,String ruleType, List<Object> input,Map<String, Object> global) throws Exception {
		KnowledgeBase kbase = loadKnowledgeBase(ruleCode,version,ruleType);
		StatefulKnowledgeSession kSession = kbase.newStatefulKnowledgeSession();

		if (input != null) {
			for (Iterator<Object> localIterator1 = input.iterator(); localIterator1.hasNext();) {
				Object o = localIterator1.next();
				kSession.insert(o);
			}

		}

		if (global != null) {
			Iterator<Entry<String, Object>> it = global.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry<String, Object> entry = (Map.Entry<String, Object>) it.next();
				kSession.setGlobal((String) entry.getKey(), entry.getValue());
			}
		}

		kSession.fireAllRules();
		kSession.dispose();
	}

	public void execute(String ruleCode,String version,String ruleType, InputParam inputParam,Map<String, Object> global) throws Exception {
		List<Object> list = new ArrayList<Object>();
		list.add(inputParam);
		execute(ruleCode,version,ruleType,list, global);
	}

	private synchronized KnowledgeBase loadKnowledgeBase(String ruleCode ,String versionNum, String ruleType)throws Exception {
		String ruleVersionKey = ruleCode.concat(versionNum);
		KnowledgeBase kbase = (KnowledgeBase) this.knowledgeBaseCache.get(ruleVersionKey);
		if ((kbase == null) || (!cacheValidate(ruleVersionKey))) {
			KnowledgeBuilder kbuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();

			String version = loadRules(kbuilder, ruleCode, ruleType);
			KnowledgeBuilderErrors errors = kbuilder.getErrors();
			if (errors.size() > 0) {
				for (KnowledgeBuilderError error : errors) {
					logger.error("解析规则异常：", error.toString());
				}
				throw new IllegalArgumentException("解析规则异常：" + ruleCode);
			}
			kbase = KnowledgeBaseFactory.newKnowledgeBase();
			kbase.addKnowledgePackages(kbuilder.getKnowledgePackages());

			this.knowledgeBaseCache.put(ruleVersionKey, kbase);
			this.versionCache.put(ruleVersionKey, version);

			if (this.jedisSentinelPool != null) {
				try {
					ShardedJedis jedis = (ShardedJedis) this.jedisSentinelPool.getResource();
					jedis.hset(versionKey, ruleVersionKey, version);
					this.jedisSentinelPool.returnResource(jedis);
				} catch (Exception e) {
					logger.warn("redis设置规则版本号缓存异常：" + e.getMessage());
				}
			}
		}
		return kbase;
	}

	private boolean cacheValidate(String ruleVersionKey) {
		String localVersion = (String) this.versionCache.get(ruleVersionKey);
		String factVersion = null;
		if (this.jedisSentinelPool == null)
			return false;
		try {
			ShardedJedis jedis = (ShardedJedis) this.jedisSentinelPool.getResource();
			factVersion = jedis.hget(versionKey, ruleVersionKey);
			this.jedisSentinelPool.returnResource(jedis);
		} catch (Exception e) {
			logger.warn("redis获取缓存的规则版本号异常：" + e.getMessage());
		}

		return localVersion.equals(factVersion);
	}

	private String loadRules(KnowledgeBuilder kBuilder, String ruleCode,String ruleType)throws Exception {
		List<SysRuleListDTO> ruleList = this.sysRuleListService.searchRuleDefinition(ruleCode,ruleType);
		if ((ruleList == null) || (ruleList.isEmpty())) {
			throw new RuntimeException("没有查询到" + ruleCode + "对应的规则定义");
		}

		StringBuilder sb = new StringBuilder();
		for (SysRuleListDTO dto : ruleList) {
			sb.append(dto.getRuleCode()).append(dto.getVersion());
			if (dto.getRuleResource() == null) {
				continue;
			}
			if ("DRL".indexOf(dto.getResourceType()) < 0) {
				continue;
			}
			kBuilder.add(ResourceFactory.newByteArrayResource(dto.getRuleResource().getBytes()), parseResourceType(dto.getResourceType()));
		}
		return sb.toString();
	}

	private ResourceType parseResourceType(String name) {
		return ResourceType.getResourceType(name);
	}

	public void setJedisSentinelPool(JedisSentinelPool jedisSentinelPool) {
		this.jedisSentinelPool = jedisSentinelPool;
	}
}