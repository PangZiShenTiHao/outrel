
/**
 * Copyright (C) 2006-2014 版权所有者为北京捷越联合信息咨询有限公司。本系统是商用软件,未经授权擅自复制或传播本程序的部分或全部将是非法的。 
 * @title: DateUtil.java
 * @package com.jy.demo.web.utils
 * @author liangjl
 * @date 2014年8月28日 下午3:28:20
 * @version v1.00
 * @description: (用一句话描述该文件做什么)
 */ 
package com.jy.modules.externalplatform.interfacerest.utils;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @classname: DateUtil
 * @description: (这里用一句话描述这个类的作用)
 */
public class DateUtil {

	private static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	private static SimpleDateFormat dateForm = new SimpleDateFormat("yyyyMMdd");
	private static SimpleDateFormat dateMat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static SimpleDateFormat sdFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	private static SimpleDateFormat sdssFormat = new SimpleDateFormat("HHmmssSSS");

	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-hh-mm-ss");
	
	private static SimpleDateFormat sdfm = new SimpleDateFormat("yyyy-MM");
	private static SimpleDateFormat sdft = new SimpleDateFormat("HH:mm");

	/** yyyy-MM-dd HH:mm:ss */
	private static String FORMAT_1 = "yyyy-MM-dd HH:mm:ss";
	private static String FORMAT_2 = "yyyy-MM-dd";

	private static SimpleDateFormat sdf_1 = new SimpleDateFormat(FORMAT_1);

	/***
	 * 把字符串格式的日期转换为date型
	 * @param dateString
	 * @return
	 */
	public static synchronized Date getDateFromString(String dateString) {
		try {
			if (dateString.length() == 8) {
				return dateForm.parse(dateString);
			} else if (dateString.length() == 10) {
				return dateFormat.parse(dateString);
			} else if (dateString.length() == 19) {
				return sdf.parse(dateString);
			}
		} catch (Exception e) {
			System.err.println(e.getMessage() + "日期转换异常！");
		}
		return null;
	}

	/***
	 * 把字符串格式的日期转换为date型
	 * @param dateString
	 * @return
	 */
	public static synchronized Date getDateFromString_1(String dateString) {
		try {
				return dateMat.parse(dateString);
		} catch (Exception e) {
			System.err.println(e.getMessage() + "日期转换异常！");
		}
		return null;
	}
	
	/***
	 * 把Date转化成String类型的日期格式
	 * @param date
	 * @return
	 */
	public static synchronized String getStringDateFromDate(Date date) {
		return dateFormat.format(date);
	}
	
	/***
	 * 把Date转化成String类型的日期格式
	 * @param date
	 * @return
	 */
	public static synchronized String getStringDate(Date date) {
		return sdfm.format(date);
	}


	/***
	 * 把Date转化成String类型的日期格式
	 * @param date
	 * @param pattern (返回的时间格式)
	 * @return
	 */
	public static synchronized String getStringDateFromDate(Date date,String pattern) {
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		return sdf.format(date);
	}

	/***
	 * 把Date转化成String类型的日期格式 yyyyMMdd
	 * @param date 
	 * @return
	 */
	public static synchronized String getDateToString(Date date) {
		return dateForm.format(date);
	}
	
	/***
	 * 把Date转化成String类型的日期格式 yyyyMMddhhmmssSSS
	 * @param date 
	 * @return
	 */
	public static synchronized String getDateToStringSS(Date date) {
		return sdFormat.format(date);
	}
	
	/***
	 * 把Date转化成String类型的日期格式 hhmmssSSS
	 * @param date 
	 * @return
	 */
	public static synchronized String getDateToStringHMSS(Date date) {
		return sdssFormat.format(date);
	}
	/***
	 * 把Date转化成String类型的日期格式 yyyy-MM-dd-hh-mm-ss
	 * @param date 
	 * @return
	 */
	public static synchronized String getDateToStringLog(Date date) {
		return sdf.format(date);
	}

	public static synchronized String getDateToStringLog_1(Date date) {
		return sdf_1.format(date);
	}

	public static synchronized String getDateToStringInfo(Date date) {
		return dateMat.format(date);
	}

	/**
	 * 将时间戳转换成日期格式
	 * @param date
	 * @return
	 */
	public static synchronized String getDateToStringByLong(Long longValue) {
		return dateMat.format(new Date(longValue));
	}


	/**
	 * 当前时间前一个月
	 * 
	 * @return
	 */
	public static synchronized String getPreDate() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -1);
		return dateFormat.format(calendar.getTime());
	}
	
	
	/**
	 * 当前时间前多少个月 返回年月
	 * 
	 * @return
	 */
	public static synchronized String getBeforeDate(int Months) {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -Months);
		return sdfm.format(calendar.getTime());
	}



	/**
	 * 获取当前日期时间的开始
	 * 
	 * @return 返回时间类型 yyyy-MM-dd HH:mm:ss
	 */
	public static Date getNowBeginDate() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat(FORMAT_2);
		String dateString = formatter.format(currentTime);
		dateString += "00:00:00";
		ParsePosition pos = new ParsePosition(8);
		Date currentTime_2 = formatter.parse(dateString, pos);
		return currentTime_2;
	}


	/**
	 * 获取当前日期时间的结束
	 * 
	 * @return 返回时间类型 yyyy-MM-dd HH:mm:ss
	 */
	public static Date getNowEndDate() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat(FORMAT_2);
		String dateString = formatter.format(currentTime);
		dateString += "23:59:59";
		ParsePosition pos = new ParsePosition(8);
		Date currentTime_2 = formatter.parse(dateString, pos);
		return currentTime_2;
	}


	/***
	 * 当前时间到天
	 * @param date 
	 * @return
	 * @throws ParseException 
	 */
	public static synchronized Date getPreDay(Date date) throws ParseException {
		return dateForm.parse(dateForm.format(date));
	}
	
	/***
	 * 获取当前日期
	 * @param date 
	 * @return
	 * @throws ParseException 
	 */
	public static synchronized Date getNowDate(Date date) throws ParseException {
		return sdf_1.parse(sdf_1.format(date));
	}

	/***
	 * 当前时间到天
	 * @param date 
	 * @return
	 * @throws ParseException 
	 */
	public static synchronized Date getPreDay_1(Date date) throws ParseException {
		return dateFormat.parse(dateFormat.format(date));
	}

	/**
	 * 两个日期相差天数
	 * 
	 * @param bigTime  
	 * @param smallTime
	 * @return
	 */
	public static long daysOfTwo(String bigTime, String smallTime) {
		long quot = 0;
		try {
			Date date1 = dateFormat.parse(bigTime);
			Date date2 = dateFormat.parse(smallTime);
			if(date1.after(date2)){
				quot = date1.getTime() - date2.getTime();
			}else{
				quot = date2.getTime() - date1.getTime();
			}
			quot = quot / 1000 / 60 / 60 / 24;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return quot;
	}


	
	/**
	 * 评分：计算年龄
	 * 公式：  年龄 = 进件申请年份 －  出生年份
	 * @param birthDay 出生日期
	 * @param intoAppTime 进件时间
	 * @return
	 * @throws Exception
	 */
	public static int getAge(Date birthDay,Timestamp intoAppTime){
		int age = 0;
		try {
			SimpleDateFormat format_y = new SimpleDateFormat("yyyy");
			String birth_year = format_y.format(birthDay);
			String into_year = format_y.format(intoAppTime);
			age = Integer.parseInt(into_year) - Integer.parseInt(birth_year);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return age; 	
	}
	

	/***
	 * 当前时间的年和月份
	 * @param date 
	 * @return
	 * @throws ParseException 
	 */
	public static synchronized String getCurrMonth() throws ParseException {
		String currDate = getStringDateFromDate(new Date());
		return currDate.substring(0, 8);
	}


	/***
	 * 计算两个日期相差的小时数
	 * @param startTime
	 * @param endTime
	 * @param str
	 * @return
	 */
	public static Long dateDiff(String startTime, String endTime, String str) {
		// 按照传入的格式生成一个simpledateformate对象  
		SimpleDateFormat sd = new SimpleDateFormat(FORMAT_1);  
		long nd = 1000 * 24 * 60 * 60;// 一天的毫秒数  
		long nh = 1000 * 60 * 60;// 一小时的毫秒数  
		long nm = 1000 * 60;// 一分钟的毫秒数  
		long ns = 1000;// 一秒钟的毫秒数  
		long diff;  
		long day = 0;  
		long hour = 0;  
		long min = 0;  
		long sec = 0;  
		// 获得两个时间的毫秒时间差异  
		try {
			diff = sd.parse(endTime).getTime() - sd.parse(startTime).getTime();  
			day = diff / nd;// 计算差多少天  
			hour = diff % nd / nh + day * 24;// 计算差多少小时  
			min = diff % nd % nh / nm + day * 24 * 60;// 计算差多少分钟  
			sec = diff % nd % nh % nm / ns;// 计算差多少秒  
			// 输出结果  
			if (str.equalsIgnoreCase("h")) {  
				return hour;  
			} else {  
				return min;  
			}
		} catch (ParseException e) {
		}
		return day;  
	}
	
	/***
	 * 计算两个日期相差秒数
	 * @param startTime
	 * @param endTime
	 * @param str
	 * @return
	 */
	public static Long dateDiff_1(String startTime, String endTime) {
		SimpleDateFormat sd = new SimpleDateFormat(FORMAT_1);
		long diff;
		long day = 0;
		// 获得两个时间的毫秒时间差异
		try {
			diff = sd.parse(endTime).getTime() - sd.parse(startTime).getTime();
			return diff / 1000;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return day;
	}

	/***
	 * 计算两个日期相差毫秒数
	 * @param beginDate
	 * @param endDate
	 * @return 毫秒数
	 */
	public static String dateDiffMiss(Date beginDate, Date endDate) {
		if (beginDate != null && endDate != null) {
			long diff = endDate.getTime() - beginDate.getTime();
			return String.valueOf(diff);
		} else {
			return "0";
		}
	}

	/***
	 * 转换日期
	 * @param date 
	 * @return
	 * @throws ParseException 
	 */
	public static synchronized String getTimestampChangeString(Timestamp ts) {
		DateFormat sdf = new SimpleDateFormat(FORMAT_1);  
        String tsStr = "";   
        try {   
            tsStr = sdf.format(ts);   
        } catch (Exception e) {   
            e.printStackTrace();   
        }  
        return tsStr;
	}
	
	/***
	 * 把Date转化成String类型的日期格式 yyyyMMddhhmmssSSS
	 * @param date 
	 * @return
	 */
	public static synchronized String getTimeToString(Date date) {
		return sdft.format(date);
	}
}
