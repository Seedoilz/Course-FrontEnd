create table userinfo (
 id int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
 name   varchar(64) DEFAULT NULL COMMENT '昵称',
 usrname varchar(64) DEFAULT NUll COMMENT '用户名',
 email  varchar(64) UNIQUE NOT NUll COMMENT '邮箱',
 mobile  char(11)  DEFAULT NULL COMMENT '手机号码',
 password char(100) DEFAULT (NOT NULL) COMMENT '密码',
 salt char(100) DEFAULT NULL COMMENT '加密'
);
INSERT INTO userinfo(email,password,usrname,name,mobile,salt) VALUES('1@q.com','866e3796030a772a29e3541973a945f3e93ac3ac22c78557a7543338d19b558c','','','','{ko?J,7N0Jrv@!u')