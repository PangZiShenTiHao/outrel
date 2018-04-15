package com.jy.modules.externalplatform.interfacerest.test;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import net.sf.json.JSONObject;
import net.sf.json.xml.XMLSerializer;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class TestApi {

    final static private String apiURL = "http://localhost:8080/loan/api/externalplatform/interfaceRest/extInterface/v1";
    private static String charset = "utf-8";
    private static final String STR_JSON = "{\r\n      \"sysCode\":\"loan\",\r\n      \"funcType\":\"intoCheckModule\",\r\n      \"funcPointType\":\"intoInitCheck\", \r\n      \"custCardId\":\"13344444444444\",\r\n      \"prod\":\"PTL150400012\",\r\n      \"org\":\"10100000001\",\r\n       \"moduleData\": {\r\n\t        \"custInfo\": {\r\n\t            \"custName\": \"zhangsan\", \r\n\t            \"cardType\": 1\r\n\t        }, \r\n\t        \"contactList\": {\r\n\t            \"contract1\": {\r\n\t                \"custName1\": \"zhangsan\", \r\n\t                \"cardType1\": 1\r\n\t            }, \r\n\t            \"contract2\": {\r\n\t                \"custName2\": \"zhangsan\", \r\n\t                \"cardType2\": 1\r\n\t            }\r\n\t        }\r\n\t    }, \r\n       \"interfaceData\":{\r\n                \"JXL01_8004_01\": { \"juliqiang1\":\"张三\", \"juliqiang2\":1}\r\n       },\r\n       \"frontTransNo\":\"r67485934515ss25477\",\r\n       \"frontTransTime\":\"2015-12-28 10:40:00\",\r\n       \"interfaceNo\":\"3013\",\r\n       \"busiCode\":\"LCC13\"  \r\n   }";
    
    public static void main(String[] args)throws Throwable {
//    	String jsons="{\"sysCode\":\"loan\",\"funcType\":\"intoCheckModule\",\"funcPointType\":\"intoInitCheck\",\"custCardId\":\"13344444444444\",\"prod\":\"PTL150400012\",\"org\":\"10100000001\",\"moduleData\":{\"custInfo\":{\"custName\":\"张三\",\"cardType\":1},\"contactList\":{\"contract1 \":{\"custName1\":\"张三\",\"cardType1\":1},\"contract2 \":{\"custName2\":\"张三\",\"cardType2\":1}}},\"interfaceData\":{\"ZSIC01_8003\":{\"canshu1\":\"张三\",\"canshu2\":1},\"JXL01_8004_01\":{\"juliqiang1\":\"张三\",\"juliqiang2\":1}},\"frontTransNo\":\"r67485934515ss25477\",\"frontTransTime\":\"2015-12-28 10:40:00\",\"interfaceNo\":\"3013\",\"busiCode\":\"LCC13\"}";
    	
//    	System.out.println(JsonUtil.delSpecialCharacter(STR_JSON));   
//    	String xmlParams=JsonUtil.json2xml(JsonUtil.delSpecialCharacter(STR_JSON));   	
//    	System.out.println(xmlParams);
    	System.out.println(testPbccrcQ());
//    	String xml = json2XML(STR_JSON);
//        System.out.println("xml = "+xml);
    }
     
    public static String json2XML(String json){
        JSONObject jobj = JSONObject.fromObject(json);
        String xml =  new XMLSerializer().write(jobj);
        return xml;
    }

    public  static String testPbccrcQ() {
        String url = apiURL;
        String json="{\"sysCode\":\"loan\",\"funcType\":\"intoCheckModule\",\"funcPointType\":\"intoInitCheck\",\"custCardId\":\"110101198811107359\",\"prod\":\"PTL150400001\",\"org\":\"301000603\",\"moduleData\":{\"custInfo\":{\"custName\":\"张三\",\"age\":28},\"contactList\":{\"contact1\":{\"custName1\":\"李四\",\"age1\":25},\"contact2\":{\"custName2\":\"王五\",\"age2\":28}}},\"interfaceData\":{\"ZSIC01_8003\":{\"gmsfhm\":\"110101198811107359\",\"xm\":\"兆龙\"},\"HFW01_7001_02\": {\"n\": \"北京捷越联合信息咨询公司\"}},\"frontTransNo\":\"r67485934515ss25477\",\"frontTransTime\":\"2015-12-28 10:40:00\",\"interfaceNo\":\"3013\",\"busiCode\":\"LCC13\"}";
        
        System.out.println(url);
        System.out.println(json);
        String result = executeHttpPost(url,json);
        return result;
    }
    public static String executeHttpPost(String url, String json) { 
    	String result = "";
    	String retCode = "";
    	String errorDesc = "";
    	Date date = new Date();
    	try{
            HttpClient client = HttpClients.createDefault(); 
            HttpPost httpPost = new HttpPost(url);  
            httpPost.setHeader("Content-type", "application/json; charset=utf-8");
    		httpPost.setEntity(new StringEntity(json, "utf-8"));  
            HttpResponse response = client.execute(httpPost);  
            HttpEntity entity = response.getEntity();
            result = EntityUtils.toString(entity, "utf-8");
            if(result != null) {
	            JSONObject resultJson = JSONObject.fromObject(result);
	            retCode = resultJson.getString("retCode");
				errorDesc = resultJson.getString("errorDesc");
            }
    	} catch(Exception e) {
    		//插入请求失败信息
			retCode = "400";
			errorDesc = "接口请求异常："+e.getMessage();
			e.printStackTrace();
    	}
        return result;
    }

    public static String buildParams(Map<String, String> param, String charset) {
        if (param != null && !param.isEmpty()) {
            StringBuffer buffer = new StringBuffer();
            for (Map.Entry<String, String> entry : param.entrySet()) {
                try {
                    buffer.append(entry.getKey()).append("=")
                            .append(URLEncoder.encode(entry.getValue(), charset))
                            .append("&");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            }
            return buffer.deleteCharAt(buffer.length() - 1).toString();
        } else {
            return null;
        }
    }

    public static String sendPost(String url, Map<String, String> param, String charset) {
        OutputStream out = null;
        BufferedReader in = null;
        String result = "";
        try {
            URL realUrl = new URL(url);
            URLConnection conn = getConnection(realUrl);
            
            Map<String, String> defaultHeaders = new LinkedHashMap<String, String>();
            defaultHeaders.put("accept", "*/*");
            defaultHeaders.put("connection", "Keep-Alive");
            defaultHeaders.put("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流
            out = conn.getOutputStream();
            String p = buildParams(param, charset);
            if(p != null) {
                // 发送请求参数
                out.write(p.getBytes());
                // flush输出流的缓冲
                out.flush();
            }
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(
                    conn.getInputStream(), charset));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return result;
    }

    static public byte[] download(String url, Map<String, String> param, String savePath) {
        OutputStream out = null;
        InputStream in = null;
        String result = "";
        try {
            URL realUrl = new URL(url);
            URLConnection conn = getConnection(realUrl);

            Map<String, String> defaultHeaders = new LinkedHashMap<String, String>();
            defaultHeaders.put("accept", "*/*");
            defaultHeaders.put("connection", "Keep-Alive");
            defaultHeaders.put("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流
            out = conn.getOutputStream();

            String p = buildParams(param, charset);
            if (p != null) {
                // 发送请求参数
                out.write(p.getBytes());
                // flush输出流的缓冲
                out.flush();
            }
            //读取响应数据
            in = conn.getInputStream();
            byte[] buff = new byte[1024];
            ByteArrayOutputStream baot = new ByteArrayOutputStream();
            int len;
            while ((len = in.read(buff)) != -1) {
                baot.write(buff, 0, len);
            }
            if (savePath != null) {//保存文件
                FileOutputStream fo = new FileOutputStream(savePath);
                fo.write(baot.toByteArray());
                fo.close();
            }
            return baot.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }

    static public HttpURLConnection getConnection(URL url) {
        HttpURLConnection connection = null;
        try{
            if(url.getProtocol().toUpperCase().startsWith("HTTPS")) {
                SSLContext ctx = SSLContext.getInstance("SSL");
                ctx.init(new KeyManager[0], new TrustManager[] {new X509TrustManager() {

                    @Override
                    public void checkClientTrusted(X509Certificate[] arg0,
                                                   String arg1) throws CertificateException {
                    }

                    @Override
                    public void checkServerTrusted(X509Certificate[] arg0,
                                                   String arg1) throws CertificateException {
                    }

                    @Override
                    public X509Certificate[] getAcceptedIssuers() {
                        return null;
                    }

                }}, new SecureRandom());


                HttpsURLConnection conn = (HttpsURLConnection)url.openConnection();
                conn.setSSLSocketFactory(ctx.getSocketFactory());
                conn.setConnectTimeout(10000);
                conn.setReadTimeout(10000);

                conn.setHostnameVerifier(new HostnameVerifier() {
                    @Override
                    public boolean verify(String hostname, SSLSession session) {
                        return true;
                    }
                });

                connection = conn;
            } else {
                connection = (HttpURLConnection) url.openConnection();
            }


        } catch(Exception e){
            e.printStackTrace();
        }

        return connection;
    }

}
