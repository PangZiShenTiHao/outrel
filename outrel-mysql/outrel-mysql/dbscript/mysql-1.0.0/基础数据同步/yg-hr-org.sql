/*
Navicat MySQL Data Transfer

Source Server         : dev
Source Server Version : 50542
Source Host           : localhost:3306
Source Database       : ptdev

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2017-01-18 10:08:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for yg_hr
-- ----------------------------
DROP TABLE IF EXISTS `yg_hr`;
CREATE TABLE `yg_hr` (
  `nbase` varchar(100) DEFAULT NULL,
  `nbase0` varchar(100) DEFAULT NULL,
  `uniqueId` varchar(100) DEFAULT NULL,
  `a0100` varchar(100) DEFAULT NULL,
  `b01100` varchar(100) DEFAULT NULL,
  `e01220` varchar(100) DEFAULT NULL,
  `e01a10` varchar(100) DEFAULT NULL,
  `b0110Code` varchar(100) DEFAULT NULL,
  `e0122Code` varchar(100) DEFAULT NULL,
  `e01a1Code` varchar(100) DEFAULT NULL,
  `a0101` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `userpassword` varchar(100) DEFAULT NULL,
  `sdate` varchar(100) DEFAULT NULL,
  `flag` varchar(100) DEFAULT NULL,
  `sysFlag` varchar(100) DEFAULT NULL,
  `a0000` varchar(100) DEFAULT NULL,
  `c0104` varchar(100) DEFAULT NULL,
  `h01um` varchar(100) DEFAULT NULL,
  `h01ub` varchar(100) DEFAULT NULL,
  `a0111` varchar(100) DEFAULT NULL,
  `c0183` varchar(100) DEFAULT NULL,
  `b0110` varchar(100) DEFAULT NULL,
  `h01ua` varchar(100) DEFAULT NULL,
  `a0107` varchar(100) DEFAULT NULL,
  `e01a1` varchar(100) DEFAULT NULL,
  `e0127` varchar(100) DEFAULT NULL,
  `oa` varchar(100) DEFAULT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `fullpath` varchar(500) DEFAULT NULL,
  `sealDate` varchar(100) DEFAULT NULL,
  `isDelete` varchar(100) DEFAULT NULL,
  `idCardNumber` varchar(100) DEFAULT NULL,
  `maritalStatus` varchar(100) DEFAULT NULL,
  `national` varchar(100) DEFAULT NULL,
  `political` varchar(100) DEFAULT NULL,
  `degree` varchar(100) DEFAULT NULL,
  `nativePlace` varchar(100) DEFAULT NULL,
  `domicilePlace` varchar(100) DEFAULT NULL,
  `workDate` varchar(100) DEFAULT NULL,
  `emergencyContact` varchar(100) DEFAULT NULL,
  `emergencyContactPhone` varchar(100) DEFAULT NULL,
  `leader` varchar(100) DEFAULT NULL,
  `regular` varchar(100) DEFAULT NULL,
  `age` varchar(100) DEFAULT NULL,
  `level` varchar(100) DEFAULT NULL,
  `regularDate` varchar(100) DEFAULT NULL,
  `workAge` varchar(100) DEFAULT NULL,
  `belongAddress` varchar(100) DEFAULT NULL,
  `workStatus` varchar(100) DEFAULT NULL,
  `orderNo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*
Navicat MySQL Data Transfer

Source Server         : dev
Source Server Version : 50542
Source Host           : localhost:3306
Source Database       : ptdev

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2017-01-18 10:08:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for yg_org
-- ----------------------------
DROP TABLE IF EXISTS `yg_org`;
CREATE TABLE `yg_org` (
  `b01100` varchar(100) DEFAULT NULL,
  `uniqueId` varchar(100) DEFAULT NULL,
  `codesetid` varchar(100) DEFAULT NULL,
  `codeitemdesc` varchar(100) DEFAULT NULL,
  `parentid` varchar(100) DEFAULT NULL,
  `parentdesc` varchar(100) DEFAULT NULL,
  `grade` varchar(100) DEFAULT NULL,
  `sdate` varchar(100) DEFAULT NULL,
  `flag` varchar(100) DEFAULT NULL,
  `sysFlag` varchar(100) DEFAULT NULL,
  `a0000` varchar(100) DEFAULT NULL,
  `corcode` varchar(100) DEFAULT NULL,
  `b0110` varchar(100) DEFAULT NULL,
  `oa` varchar(100) DEFAULT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `fullpath` varchar(500) DEFAULT NULL,
  `sealDate` varchar(100) DEFAULT NULL,
  `isDelete` varchar(100) DEFAULT NULL,
  `leader` varchar(100) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `orderno` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `sys_user` ADD COLUMN `UUID`  varchar(100) NULL COMMENT 'UUID' ;
ALTER TABLE `sys_org` ADD COLUMN `UUID`  varchar(100) NULL COMMENT 'UUID' ;
ALTER TABLE `sys_org` ADD COLUMN `remark`  varchar(100) NULL COMMENT '备注' ;