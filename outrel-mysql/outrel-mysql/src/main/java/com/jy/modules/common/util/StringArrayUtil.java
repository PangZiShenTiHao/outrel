package com.jy.modules.common.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.StringUtils;

public class StringArrayUtil {
	/**
	 * 判断一个字符串数组中包含某个字符或字符串
	 * 此方法有两个参数，第一个是要查找的字符串数组，第二个是要查找的字符或字符串   
	 * * */
	public static boolean isHave(String[] strs,String s){
		
		for(int i=0;i<strs.length;i++){   
			if(strs[i].indexOf(s)!=-1){
				//循环查找字符串数组中的每个字符串中是否包含所有查找的内容   
				return true;//查找到了就返回真，不在继续查询   }  }
			}
		}
		return false;
	}
	
	
	public static void main(String[] args) {
		
		String[] strs={"aaa","bbbb","cccc","dddd"};//定义字符串数组
		   if(isHave(strs,"kk")){
			   //调用自己定义的函数isHave，如果包含则返回true,否则返回false    
			   System.out.println("包含");//打印结果  
		    }
			else{  
			  System.out.println("不包含");//打印结果 
			}
	}
	
	/**
	 * @param str    字符串
	 * @param separator  分隔符
	 * @return
	 */
	public static List<String>  convertStringToList(String str,String separator){
	   
	   List<String> list = new ArrayList<String>();
	   if(StringUtils.isNotEmpty(str) && StringUtils.isNotEmpty(separator)){
		   String[] arr=str.split(separator);
		   list = Arrays.asList(arr);
	   }
	   return  list;
    }
	
	
	/**
	* 字符串特殊拼接
	* @param originalStr 原始字符串
	* @param inputStr  传入字符串
	* @param separator 分隔符
	* @return
	* @throws 
	*/ 
	public static String splitJoinStr(String originalStr,String inputStr,String separator){
		String resultStr = "";
		if(StringUtils.isNotEmpty(originalStr) && StringUtils.isNotEmpty(inputStr)){
			//以分隔符拆分原始字符串为字符串数组
			String[] originalStrArr = originalStr.split(separator);
			//原始字符串数组中不包含传入字符串，进行拼接；反之，不进行拼接。
			if(!StringArrayUtil.isHave(originalStrArr,inputStr)){
				resultStr = originalStr.concat(separator).concat(inputStr);
			}else{
				resultStr = originalStr;
			}
		}else{
			resultStr = inputStr;
		}
		return resultStr;
	}	
}