# README

201250203 张若皓

## 概述

此次，登陆注册功能实现，我使用了以下内容：

1. nodejs中express框架
2. mysql数据库
3. sha256加密方法
4. express-session鉴权方法

### 实现方案：

#### 登陆、注册、登出：

利用express框架构建web服务器，使用mysql存取用户信息数据，使用session来鉴别用户当前登陆状态。

首先创建数据库并建表（具体代码将放在安装内）之后，在express框架中链接数据库。随后创建路由，在应用中创建注册和登录路由，并使用表单提交的数据进行数据库操作。

此外，我还添加了**登出**操作，当用户**点击右上角的邮箱**（即用户信息），服务器将会将session进行destroy操作，随后显示跳转到登陆界面。

![image-20221224110453183](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221224110453image-20221224110453183.png)

![image-20221224112703282](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221224112703image-20221224112703282.png)

如果用户在不登陆的情况下直接进入上述homepage页面，则会显示“未登陆，访客状态”。此时，如果点击“未登陆，访客状态”，则会显示以下信息，并跳转到登陆界面。

![image-20221224112500306](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221224112500image-20221224112500306.png)

![image-20221224112640055](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221224112640image-20221224112640055.png)

#### 加密：

注册中，在每一次注册的时候，生成一个随机的salt字符串，然后用sha256的加密方法生成一个密码，将加密过后的密码和salt一同存在数据库中。

登陆中，根据账户的用户名在数据库中找到对应的salt，将用户输入的密码用对应的salt加密之后与数据库存的加密的数据进行比对。如果相同，则允许登陆，否则则显示帐号密码错误。

#### 鉴权方法：

在登陆的时候，如果用户的用户密码正确（也就是能够正确登陆的话），则在express-session中存取用户当前的用户名以及其他信息，以确保其他页面也能够获得用户的登录信息。大致框架如下（实际实现中，分散在不同路由下）：

```js
app.post('/login', (req, res) => {
  // 查询数据库并验证用户名密码
  // 省略...

  // 登录成功，设置session
  req.session.user = {
    username: username
  };
  res.send({ success: true, message: '登录成功！' });
});

// 获取用户信息路由
app.get('/user', (req, res) => {
  if (req.session.user) {
    res.send({ success: true, user: req.session.user });
  } else {
    res.send({ success: false, message: '用户未登录！' });
  }
});

// 退出登录路由
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send({ success: true, message: '退出登录成功！' });
  });
});
```

#### 密码规则（使用正则表达式实现）：

我使用的方法是首先要求长度为6-20位，密码中的内容只能使用**下划线**，**数字**，**字母**。如果其中只包含数字，则强度位低；包含其中两个，则强度为中；全部包含，则强度为高。

#### 验证码：

随机生成4个数字或字母（大小写均有可能），并为它们每个字符生成不同的角度和颜色，将其生成在一个canvas上，形成一个图片。每当点击“注册”按钮的时候会进行验证，如果验证码错误，则不允许进行注册。

> 大致实现框架如上，中间有太多细小繁杂的东西要实现，就不一一说明。（中间也碰到了很多问题。

## 安装：

1. 安装nodejs中所需依赖

```sh
//cd进目标文件夹
npm install
```

2. 启动数据库并创建对应用户信息表,并添加信息。（邮箱为:**1@q.com**,密码为:**111111**) 可直接使用这些信息登陆。

```sql
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
```

3. 修改项目中链接数据库的密码和对应database（对应文件在/routes/actions/sql.js 路径下)

```js
//这里是我的数据库信息
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Czy026110',
  database: 'homework'
});
```

4. 启动web服务器

```sh
npm start
```

5. 进入网站(默认情况下应该是http://localhost:3001)即可。

## 运行过程以及可能的界面截图：

### 登陆界面

![image-20221223195734965](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221223195735image-20221223195734965.png)

### 登陆失败即密码错误

![image-20221223195834442](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221223195834image-20221223195834442.png)

### 注册页面

![image-20221223195950969](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221223195951image-20221223195950969.png)

### 注册中验证码错误

![image-20221223200030704](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221223200030image-20221223200030704.png)

### 注册中信息错误（只要求Email和密码）

![image-20221223200049384](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221223200049image-20221223200049384.png)

### 主页面（右上角为用户的邮箱）（子页面与之一致，省略了）

![image-20221223200208740](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221223200208image-20221223200208740.png)

## 参考文献

主要参考了网上别人写的这一篇博客（但它实现的太过简单了）：

https://www.cnblogs.com/wuyepeng/p/9995375.html