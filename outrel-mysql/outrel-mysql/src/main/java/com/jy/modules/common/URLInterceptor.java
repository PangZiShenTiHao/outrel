package com.jy.modules.common;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.fintech.platform.api.org.SessionAPI;
import com.fintech.platform.api.org.UserInfo;

/**
 * 1、监控URL访问日志及访问时效统计 2、todo 防止用户 对应同URL 频繁点击
 * 
 * @author chengang
 * 
 */
public class URLInterceptor implements HandlerInterceptor {
	private static final String REQ_STA_TIME = "REQ_STA_TIME";
	private static final Logger logger = LoggerFactory.getLogger(URLInterceptor.class);
	private boolean logURL = false;

	/**
	 * 在业务处理器处理请求之前被调用 如果返回false 从当前的拦截器往回执行所有拦截器的afterCompletion(),再退出拦截器链
	 * 如果返回true 执行下一个拦截器,直到所有的拦截器都执行完毕 再执行被拦截的Controller 然后进入拦截器链,
	 * 从最后一个拦截器往回执行所有的postHandle() 接着再从最后一个拦截器往回执行所有的afterCompletion()
	 */
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		String url = request.getRequestURI() != null ? request.getRequestURI().replace(request.getContextPath(), "") : "";
		
		StringBuilder sb = new StringBuilder();
		
		if(handler instanceof HandlerMethod){
			HandlerMethod hand = (HandlerMethod) handler;
			
			Class<?> clazz = hand.getMethod().getDeclaringClass();
			String clazzName = clazz.getName();
			String methodName = hand.getMethod().getName();
			if (clazzName.endsWith("Controller")) {
				// 判断请求的都是Controller
				WebApplicationContext webApplicationContext = ContextLoader
						.getCurrentWebApplicationContext();
				ServletContext servletContext = webApplicationContext
						.getServletContext();
				ApplicationContext context = WebApplicationContextUtils
						.getWebApplicationContext(servletContext);
				SessionAPI sessionAPI = (SessionAPI) context.getBean("sessionAPI");
				UserInfo userInfo = sessionAPI.getCurrentUserInfo();
				Long userId = -1L;
				if (userInfo != null) {
					userId = userInfo.getUserId();

				}
				sb.append("        耗时：").append("").append("        用户：").append(userId)
						.append("        URL：").append(url);//.append(".").append(methodName);
				logger.info(sb.toString());
			} else if (clazzName.endsWith("Rest")) {
				// 是rest请求
				/*sb.append("        耗时：").append("").append("        用户：").append("-1")
						.append("        URL：").append(url);
				logger.info(sb.toString());*/
			}
		}
		
		long startTime = System.currentTimeMillis();
		
		request.setAttribute(REQ_STA_TIME, startTime);
		return true;
	}

	/**
	 * 在业务处理器处理请求执行完成后,生成视图之前执行的动作
	 */
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

		if (logURL && handler instanceof HandlerMethod) {
			dealURL(request, response, handler);
		}

	}

	/**
	 * 在DispatcherServlet完全处理完请求后被调用
	 */
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}

	private void dealURL(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception{
		String url = request.getRequestURI() != null ? request.getRequestURI().replace(request.getContextPath(), "") : "";
		
		StringBuilder sb = new StringBuilder();
		// 判断是否方法handler
		long startTime = (Long) request.getAttribute(REQ_STA_TIME);
		long endTime = System.currentTimeMillis();
		request.removeAttribute(REQ_STA_TIME);
		
		HandlerMethod hand = (HandlerMethod) handler;
		Class<?> clazz = hand.getMethod().getDeclaringClass();
		//String clazzName = clazz.getSimpleName();
		String clazzName = clazz.getName();
		String methodName = hand.getMethod().getName();
		if (clazzName.endsWith("Controller")) {
			// 判断请求的都是Controller
			WebApplicationContext webApplicationContext = ContextLoader
					.getCurrentWebApplicationContext();
			ServletContext servletContext = webApplicationContext
					.getServletContext();
			ApplicationContext context = WebApplicationContextUtils
					.getWebApplicationContext(servletContext);
			SessionAPI sessionAPI = (SessionAPI) context.getBean("sessionAPI");
			UserInfo userInfo = sessionAPI.getCurrentUserInfo();
			Long userId = -1L;
			if (userInfo != null) {
				userId = userInfo.getUserId();

			}
			Long curTime = endTime - startTime;
			sb.append("        耗时：").append(curTime).append("        用户：").append(userId)
					.append("        URL：").append(url);//.append(".").append(methodName);
			
		} else if (clazzName.endsWith("Rest")) {
			// 是rest请求
			Long curTime = endTime - startTime;
			sb.append("        耗时：").append(curTime).append("        用户：").append("-1")
					.append("        URL：").append(url);//.append(".").append(methodName);
		}
		
		logger.info(sb.toString());
	}
	public boolean isLogURL() {
		return logURL;
	}

	public void setLogURL(boolean logURL) {
		this.logURL = logURL;
	}
	
}
