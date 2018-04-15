package com.jy.modules.externalplatform.interfacerest.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
/**
 * 这个方法主要用来完成对字符串的压缩, 解压缩, 以及Base64编码, 解码压缩结果
 *@author anwx
 */
public final class ExtCompressStringUtil {
	private static Log log = LogFactory.getLog(ExtCompressStringUtil.class);
	
	public static String decodeToXml(String base64Str){
		String repXml = parsePyXml(base64Str);
		try {
			Base64 base64 = new Base64();
			byte [] responXml = base64.decode(repXml);  
			repXml = new ExtCompressStringUtil().decompress(responXml);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("CompressStringUtil解压异常",e);
		}
		return repXml;
	}
	

	
	public static Map<String ,String> decodeCardToXml(String base64Str){
		Map<String ,String> result = parseCardPyXml(base64Str);
		String type = result.get("type");
		if("2".equals(type)){
			return result;
		}
		try {
			String repXml = result.get("content");
			Base64 base64 = new Base64();
			byte [] responXml = base64.decode(repXml);  
			repXml = new ExtCompressStringUtil().decompress(responXml);
			result.put("xml", repXml);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("CompressStringUtil解压异常",e);
		}
		return result;
	}
	
	 public static Map<String ,String> parseCardPyXml(String base64Str){
		 Map<String ,String> msg = new HashMap<String, String>();
			try {
				Document document = DocumentHelper.parseText(base64Str);
				Element root = document.getRootElement();
				Element status = root.element("status");
				if("1".equals(status.getText())){
					Element ele = 	root.element("returnValue");
					msg.put("type", "1");
					msg.put("content", ele.getText());
				}else {
					msg.put("type", "2");
				}
			} catch (DocumentException e) {
				log.error("CompressStringUtil xml解析异常",e);
			}
			return msg;
	    }
	    
	
	/**
	 * 对鹏元传过来的xml数据进行处理，只保留加密后的报文文件
	 * @param base64Str
	 * @return
	 */
    public static String parsePyXml(String base64Str){
    	String xml = "";
		try {
			Document document = DocumentHelper.parseText(base64Str);
			Element root = document.getRootElement();
			Element status = root.element("status");
			if("1".equals(status.getText())){
				Element ele = 	root.element("returnValue");
				xml = ele.getText();
			}
		} catch (DocumentException e) {
			log.error("CompressStringUtil xml解析异常",e);
		}
		return xml;
    }
    
    
	/**
	 * 解压缩
	 * @param compressed
	 * @return
	 */
	public static final String decompress(byte[] compressed) {
		if (compressed == null)
			return null;
		ByteArrayOutputStream out = null;
		ByteArrayInputStream in = null;
		ZipInputStream zin = null;//压缩流
		String decompressed;
		try {
			out = new ByteArrayOutputStream();
			in = new ByteArrayInputStream(compressed);
			zin = new ZipInputStream(in);//
			ZipEntry entry = zin.getNextEntry();
			byte[] buffer = new byte[1024];
			int offset = -1;
			while ((offset = zin.read(buffer)) != -1) {
				out.write(buffer, 0, offset);
			}
			decompressed = out.toString("GBK");
		} catch (IOException e) {
			decompressed = null;
			throw new RuntimeException("解压缩字符串数据出错", e);
		} finally {
			if (zin != null) {
				try {
					zin.close();
				} catch (IOException e) {
					log.debug("关闭ZipInputStream", e);
				}
			}
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					log.error("关闭ByteArrayInputStream", e);
				}
			}
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					log.debug("关闭ByteArrayOutputStream", e);
				}
			}
		}
		return decompressed;
	}
}
