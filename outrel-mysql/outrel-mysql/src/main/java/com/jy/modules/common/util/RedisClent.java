package com.jy.modules.common.util;

import java.util.List;

import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSONArray;
import com.fintech.platform.core.redis.JedisSentinelPool;

public class RedisClent {

	/*** redis 监听器连接池 **/
	private JedisSentinelPool jedisSentinelPool;
	private ShardedJedis redis = null;

	/**
	 * @Title: getJedis
	 * @Description: 得到redis管理类
	 * @return ShardedJedis 返回类型
	 * @throws
	 */
	public ShardedJedis getRedis() {
		try {
			redis = getJedisSentinelPool().getResource();
		} catch (Exception e) {
			throw new JedisConnectionException(e);
		}
		return redis;
	}

	public JedisSentinelPool getJedisSentinelPool() {
		return jedisSentinelPool;
	}

	public void setJedisSentinelPool(JedisSentinelPool jedisSentinelPool) {
		this.jedisSentinelPool = jedisSentinelPool;
	}
	
	public static <T> List<T>  getRedisList(String reidsValue,Class<T> clasz){
		return JSONArray.parseArray(reidsValue,  clasz);
	}
	
	
}
