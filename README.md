# 一个简单的博客 #
## 1. 工程结构 ##
- app.js : 启动文件，或者说入口文件
- package.json : 存储工程信息及模块依赖，当在dependencies中添加依赖的模块时，运行npm install ，npm 会检查当前目录下的package.json，并自动安装所有指定的模块
- node_modules : 存放package.json中安装的模块，当你在package.json中添加依赖的模块并安装后，该模块会存放这个文件夹下
- public : 存放image,css,js等文件夹
- views : 存放视图文件，或者说模板文件
> **路由规则:**<br/>
> req.query : 处理get请求，获取get请求参数<br/>
> req.params : 处理/:xxx形式的get或post请求，获取请求参数<br/>
> req.body : 处理post请求，获取post请求体<br/>
> req.param() : 处理get和post请求，但查找优先级为req.params->req.body->req.query

> **ejs标签系统：**<br/>
> <% code %> : javascript代码<br/>
> <%= code %> : 显示替换过HTML特殊字符的内容<br/>
> <%- code %> : 显示原始HTML内容<br/>
> Example :<br/>
> The Data<br/>
> `supplies:['mop','broom','duster']`<br/>
> The Template<br/>
> `<ul>`<br/>
> `<% for(var i=0;i<supplier.length;i++) {%>`<br/>
> `<li><%= supplies[i] %></li>`<br/>
> `<% } %>`<br/>
> `</ul>`<br/>
> The Result<br/>
> `<ul>`<br/>
> `<li>mop</li>`<br/>
> `<li>broom</li>`<br/>
> `<li>duster</li>`<br/>
> `</ul>`

##2.启动方式##
1. 打开mongodb数据库：win+R->mongodb.bat
2. blog目录下node app

##3.数据库数据存储结构##
- 数据库名：blog
###1.users集合 ###
- 存储用户信息：用户名name、密码password、邮箱email、头像head

###2.posts集合###
- 存储发表文章的信息

> 1.用户名name<br/>
> 2.头像信息head<br/>
> 3.发表时间time：{date,year,month,day,minute}<br/>
> 4.文章标题title<br/>
> 5.文章标签tags[]<br/>
> 6.文章内容post<br/>
> 7.评论内容comments[]<br/>
> 8.转载信息reprint_info<br/>
> 9.阅读量pv

----------
**mongodb数据库操作**

1. use 数据库名 
2. 查找：db.集合名.find();---括号里面可限制条件
3. 删除：db.集合名.remove({"name":"lu"});---括号里面必须有查找条件

##4.博客功能##
1. 多人注册，登录
2. 发表文章（markdown）
3. 上传文件
4. 文章的编辑与删除
5. 存档
6. 标签
7. 分页
8. 留言（markdown）
9. 用户个人主页
10. 文章pv统计及留言统计
11. 增加用户头像
12. 标题及关键字查询（支持有限的正则查询）
13. 友情链接
14. 404页面
15. 转载功能
16. 日志功能
