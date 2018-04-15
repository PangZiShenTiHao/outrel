package com.jy.modules.eshttputil;

import com.alibaba.fastjson.JSON;
import com.jy.modules.externalplatform.interfacerest.dao.ExtSaveMessageDao;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.protocol.HttpContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.net.ssl.SSLException;
import java.io.IOException;
import java.io.InterruptedIOException;
import java.net.UnknownHostException;
import java.util.Map;

@Service("com.jy.modules.eshttputil.OutrelLogServiceImpl")
public class OutrelLogServiceImpl implements OutrelLogService, ExtSaveMessageDao {
    private static final Logger logger = LoggerFactory.getLogger(OutrelLogServiceImpl.class);

//    private HttpClient httpClient;
    private String hostNames;
    private RoundRobinList serversList;
    
    
    public synchronized RoundRobinList getServersList() {
        if(serversList == null){
            serversList = new RoundRobinList(hostNames);
        }
        
        return serversList;
    }


    private static RequestConfig config = null;
    private static PoolingHttpClientConnectionManager cm = null;
    
    private static int connectTimeout = 60;
    private static int connectionRequestTimeout = 60;
    private static int socketTimeout = 60;
    private static int maxTotalConnections = 100;
    private static int maxConnectionsPerRoute = 30;
    
    
    static {
        cm = new PoolingHttpClientConnectionManager();

        cm.setMaxTotal(maxTotalConnections);
        cm.setDefaultMaxPerRoute(maxConnectionsPerRoute);
        
        config = RequestConfig.custom()
                .setConnectTimeout(connectTimeout * 1000)
                .setConnectionRequestTimeout(connectionRequestTimeout * 1000)
                .setSocketTimeout(socketTimeout * 1000).build();
    }
    
    public String getHostNames() {
        return hostNames;
    }
    public void setHostNames(String hostNames) {
        this.hostNames = hostNames;
    }

    public OutrelLogServiceImpl(){
//        serversList = new RoundRobinList(hostNames);
//        httpClient = new DefaultHttpClient();
    }
    
    
    private static HttpRequestRetryHandler myRetryHandler = new HttpRequestRetryHandler() {
        public boolean retryRequest(
                IOException exception,
                int executionCount,
                HttpContext context) {
            if (executionCount >= 3) {
                // Do not retry if over max retry count
                return false;
            }
            if (exception instanceof InterruptedIOException) {
                // Timeout
                return false;
            }
            if (exception instanceof UnknownHostException) {
                // Unknown host
                return false;
            }
            if (exception instanceof ConnectTimeoutException) {
                // Connection refused
                return false;
            }
            if (exception instanceof SSLException) {
                // SSL handshake exception
                return false;
            }
            HttpClientContext clientContext = HttpClientContext.adapt(context);
            HttpRequest request = clientContext.getRequest();
            boolean idempotent = !(request instanceof HttpEntityEnclosingRequest);
            if (idempotent) {
                // Retry if the request is considered idempotent
                return true;
            }
            return false;
        }
    };
    
    
    public CloseableHttpClient getHttpClient(){
        CloseableHttpClient httpClient = HttpClients.custom()
               .setConnectionManager(cm)
               .setRetryHandler(myRetryHandler)
               .setDefaultRequestConfig(config)
               .build();
        return httpClient;
    }
    
    
    
    
    public boolean saveOutrelLog(OutrelLog log) {
        CloseableHttpClient httpClient = getHttpClient();
        HttpResponse response = null;
        int statusCode = 0;
        boolean resultFlag = false;
        try {
            String host = getServersList().get();
            String url = "http://" + host + "/" + "outrel_test06" + "/" + "test06_type";
            
            String entity = JSON.toJSONString(log);
            HttpPost httpRequest = new HttpPost(url);
            httpRequest.setEntity(new StringEntity(entity, "UTF-8"));
            
            response = httpClient.execute(httpRequest);
            statusCode = response.getStatusLine().getStatusCode();
            logger.info("statusCode===" + statusCode);
            
            
            if(statusCode>=200 && statusCode<300){
                resultFlag = true;
            }
        }
        catch(Exception e){
            logger.error("", e);
        }
        
        return resultFlag;
    }

    /**
     * @methodName: saveMessage
     * @param: [map]
     * @describe: 数据保存到 ES
     * @auther: huangxianchao
     * @date: 2018/4/14
     * @time: 18:06
     **/
    @Override
    public void saveMessage(Map<String, Object> map) {
        EshttpUtil eshttpUtil = new EshttpUtil();
        eshttpUtil.savelog(map);

    }
}
