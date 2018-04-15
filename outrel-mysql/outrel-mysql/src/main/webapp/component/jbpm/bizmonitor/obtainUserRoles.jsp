<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="com.jy.platform.api.org.UserInfo,com.jy.platform.api.org.SessionAPI,org.springframework.web.context.support.WebApplicationContextUtils,org.springframework.web.context.WebApplicationContext,org.springframework.web.context.ContextLoader,org.springframework.context.ApplicationContext" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="sysrole" uri="/sysrole" %>
<%@ taglib uri="/sysuser" prefix="sysuser"%>
	<!-- 获取当前登录用户信息 -->
	<sysuser:search var="curUser" scope="request" />
	<%-- 定义业务类型--%>
	<c:set var="setbizType" value="" scope="session"></c:set>
	<sysrole:role var="roles" userId="${curUser.userId}"/>
	<%-- 信审审批--%>
	<c:if test="${fn:contains(roles, 'wfdk_002') or fn:contains(roles, 'wfdk_002_1') 
			or fn:contains(roles, 'wfdk_003') or fn:contains(roles, 'wfdk_003_1')
			or fn:contains(roles, 'wfdk_004') or fn:contains(roles, 'wfdk_005')
			}">
		<c:set var="setbizType" value="${setbizType},1000" scope="session"></c:set>
	</c:if>
	<%-- 客户复议审批 --%>
	<c:if test="${fn:contains(roles, 'wfdk_011')
			or fn:contains(roles, 'wfdk_012') or fn:contains(roles, 'wfdk_013')
			}">
		<c:set var="setbizType" value="${setbizType},1001" scope="session"></c:set>
	</c:if>
	<%-- 线上稽核审批 --%>
	<c:if test="${fn:contains(roles, 'wfdk_007') or fn:contains(roles, 'wfdk_008')
			or fn:contains(roles, 'wfdk_009') 
			}">
		<c:set var="setbizType" value="${setbizType},1002" scope="session"></c:set>
	</c:if>
	<%-- 车贷审批 --%>
	<c:if test="${fn:contains(roles, 'wfdk_002_10') or fn:contains(roles, 'wfdk_004_10') 
			or fn:contains(roles, 'wfdk_005_10')
			}">
		<c:set var="setbizType" value="${setbizType},1012" scope="session"></c:set>
	</c:if>
	<%-- 房贷审批 --%>
	<c:if test="${fn:contains(roles, 'wfdk_002_11') or fn:contains(roles, 'wfdk_005_11')
			or fn:contains(roles, 'wfdk_004_11')
			}">
		<c:set var="setbizType" value="${setbizType},1015" scope="session"></c:set>
	</c:if>
	<%-- 管理员角色 --%>
	<c:if test="${fn:contains(roles, 'admin') }">
		<c:set var="setbizType" value="${setbizType},1000,1001,1002,1012,1015" scope="session"></c:set>
	</c:if>
