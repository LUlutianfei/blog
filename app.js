
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');
var fs = require('fs');
var accessLog = fs.createWriteStream('access.log',{flags:'a'});
var errorLog = fs.createWriteStream('error.log',{flags:'a'});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
//设置端口
app.set('views', path.join(__dirname, 'views'));
//设置视图文件目录
app.set('view engine', 'ejs');
//设置模板引擎
app.use(flash());
app.use(express.favicon(__dirname+'/public/images/icon.png'));
//设置图标
app.use(express.logger('dev'));
//connect内建的中间件，在开发环境下使用，在终端显示简单的日志
app.use(express.logger({stream:accessLog}));
//日志存在文件里
// app.use(express.json());
// app.use(express.urlencoded());
app.use(express.bodyParser({keepExtensions:true,uploadDir:'./public/images'}));
//connect内建的中间件，解析请求体{保留文件后缀名，上传目录为}
app.use(express.methodOverride());
//connect内建的中间件，协助处理post请求，伪装put、delete和其他http方法
app.use(express.cookieParser());
//Cookie解析的中间件
app.use(express.session({
	secret: settings.cookieSecret,//防止篡改Cookie
	key: settings.db,//cookie name
	cookie: {maxAge: 1000*60*60*24*30},//生存期30 days
	store: new MongoStore({
		db: settings.db,
		url: 'mongodb://localhost/blog'
	})//把会话信息存储到数据库中
}));
//提供会话支持
app.use(app.router);
//调用路由解析的规则
app.use(express.static(path.join(__dirname, 'public')));
//connect内建的中间件，将public设置为存放images、CSS、js等静态文件的目录
app.use(function(err,req,res,next) {
	var meta = '['+new Date() +']'+req.url+'\n';
	errorLog.write(meta+err.stack+'\n');
	next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//配置开发环境下的错误处理，输出错误信息

// app.get('/', routes.index);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
//创建http服务器并监听3000端口

routes(app)