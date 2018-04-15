package com.jy.modules.common.servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class AppContextBean implements ServletContextListener
{
	  private static WebApplicationContext appContext;
	    
	    public AppContextBean() {
	        super();
	    }
	    public void contextInitialized(ServletContextEvent event) {
	    	appContext = WebApplicationContextUtils.getWebApplicationContext(event.getServletContext());
	    }

	    public void contextDestroyed(ServletContextEvent event) {
	    }
	    
	    public static ApplicationContext getApplicationContext() {
	        return appContext;
	    }
}
