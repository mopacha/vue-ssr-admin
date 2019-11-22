# vue-ssr-admin

VUE-SSR 、Node.js Web 框架

## 开始使用

1. 安装 node/npm  Node: >=8
2. 启动

	```
	npm install
	npm start 
	```

## 部署 

1. 安装 node/npm  Node: >=8
2. 安装pm2
   
	```bash
	npm i -g pm2 
	```
3. 安装pm2-intercom;

	```bash
	pm2 install pm2-intercom
	```

4. 构建生产代码
	```bash
	npm i
	npm run build
	```
5. pm2启动服务
	```npm
	pm2 start pm2.config.js --env production
	```

6. 服务停止
   
	```npm
	pm2 delete vue-ssr-admin
	```
  	