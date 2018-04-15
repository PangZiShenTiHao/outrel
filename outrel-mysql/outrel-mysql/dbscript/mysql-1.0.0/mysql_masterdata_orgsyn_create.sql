/*
Navicat MySQL Data Transfer

Source Server         : 172.18.100.102root
Source Server Version : 50636
Source Host           : 172.18.100.102:3306
Source Database       : crmdb

Target Server Type    : MYSQL
Target Server Version : 50636
File Encoding         : 65001

Date: 2018-02-28 18:34:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_org_syn
-- ----------------------------
DROP TABLE IF EXISTS `sys_org_syn`;
CREATE TABLE `sys_org_syn` (
  `ID` bigint(18) NOT NULL,
  `ORG_CODE` varchar(100) DEFAULT NULL,
  `ORG_NAME` varchar(100) NOT NULL,
  `ORG_TYPE` varchar(10) NOT NULL,
  `PARENT_ID` varchar(100) NOT NULL,
  `PARENT_IDS` varchar(1000) DEFAULT NULL,
  `ORDER_BY` varchar(50) DEFAULT NULL,
  `VALIDATE_STATE` varchar(2) NOT NULL,
  `IS_VIRTUAL` varchar(1) NOT NULL,
  `VERSION` bigint(16) DEFAULT NULL,
  `APP_FLAG` varchar(20) DEFAULT NULL,
  `CREATE_DATE` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ORG_ID` bigint(18) DEFAULT NULL,
  `SYN_STATUS` varchar(2) DEFAULT NULL,
  `IS_LEEF` varchar(1) DEFAULT NULL,
  `AREA_CODES` varchar(50) DEFAULT NULL,
  `AREA_ADRESS` varchar(300) DEFAULT NULL,
  `ORG_LEVEL` varchar(10) DEFAULT NULL,
  `EFFECTIVE_DATE` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_org_user_syn
-- ----------------------------
DROP TABLE IF EXISTS `sys_org_user_syn`;
CREATE TABLE `sys_org_user_syn` (
  `ID` bigint(18) NOT NULL,
  `ORG_ID` bigint(18) NOT NULL,
  `USER_ID` bigint(18) NOT NULL,
  `POSITION_ID` bigint(18) DEFAULT NULL,
  `IS_MAIN_ORG` varchar(1) NOT NULL,
  `VALIDATE_STATE` varchar(2) NOT NULL,
  `VERSION` bigint(16) DEFAULT NULL,
  `CREATE_DATE` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ORG_USER_ID` bigint(18) DEFAULT NULL,
  `SYN_STATUS` varchar(2) DEFAULT NULL,
  `ORG_NAME` varchar(100) DEFAULT NULL,
  `USER_NAME` varchar(100) DEFAULT NULL,
  `POSITION_NAME` varchar(100) DEFAULT NULL,
  `POSITION_CODE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_position_syn
-- ----------------------------
DROP TABLE IF EXISTS `sys_position_syn`;
CREATE TABLE `sys_position_syn` (
  `ID` bigint(18) NOT NULL,
  `POSITION_NAME` varchar(50) NOT NULL,
  `POSITION_CODE` varchar(50) DEFAULT NULL,
  `ORDER_BY` varchar(50) DEFAULT NULL,
  `VALIDATE_STATE` varchar(2) NOT NULL,
  `VERSION` bigint(16) DEFAULT NULL,
  `CREATE_DATE` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `POSITION_ID` bigint(18) DEFAULT NULL,
  `SYN_STATUS` varchar(2) DEFAULT NULL,
  `ORG_CODE` varchar(20) DEFAULT NULL,
  `IS_RESPONSIBLE` varchar(10) DEFAULT NULL,
  `POSITION_SEQUENCE` varchar(10) DEFAULT NULL,
  `POST` varchar(50) DEFAULT NULL,
  `EFFECTIVE_DATE` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `PARENT_ID` varchar(19) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_user_syn
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_syn`;
CREATE TABLE `sys_user_syn` (
  `ID` bigint(18) NOT NULL,
  `USER_NAME` varchar(50) NOT NULL,
  `USER_NO` varchar(50) DEFAULT NULL,
  `LOGIN_NAME` varchar(50) DEFAULT NULL,
  `PASSWORD` varchar(50) DEFAULT NULL,
  `SALT` varchar(50) DEFAULT NULL,
  `MOBILE` varchar(50) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `USER_IMAGE` varchar(100) DEFAULT NULL,
  `SEX` varchar(50) DEFAULT NULL,
  `BIRTHDAY` varchar(50) DEFAULT NULL,
  `NATIONALITY` varchar(50) DEFAULT NULL,
  `EDUCATION` varchar(50) DEFAULT NULL,
  `JOB` varchar(100) DEFAULT NULL,
  `HOME_ADDRESS` varchar(100) DEFAULT NULL,
  `HOME_ZIPCODE` varchar(50) DEFAULT NULL,
  `HOME_TEL` varchar(50) DEFAULT NULL,
  `OFFICE_TEL` varchar(50) DEFAULT NULL,
  `OFFICE_ADDRESS` varchar(100) DEFAULT NULL,
  `ORDER_BY` varchar(50) DEFAULT NULL,
  `VALIDATE_STATE` varchar(2) NOT NULL,
  `IS_LOCKED` varchar(2) DEFAULT NULL,
  `VERSION` bigint(16) DEFAULT NULL,
  `CREATE_DATE` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `USER_ID` bigint(18) DEFAULT NULL,
  `SYN_STATUS` varchar(2) DEFAULT NULL,
  `CARD_NO` varchar(20) DEFAULT NULL,
  `PROBATION_PERIOD` int(2) DEFAULT NULL,
  `ENTRY_DATE` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `QUIT_DATE` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `WORK_DATE` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `POLITICAL_STATUS` varchar(20) DEFAULT NULL,
  `USER_RELATION` varchar(20) DEFAULT NULL,
  `ANNUAL_LEAVE` int(2) DEFAULT NULL,
  `JXZJ` varchar(10) DEFAULT NULL,
  `NJQSRQ` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
