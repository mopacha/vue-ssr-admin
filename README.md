# 基于Vue SSR 的工程化实践


### 简介

本项目是一套基于`NodeJS、Koa2`的`Vue SSR`解决方案，对提高首屏渲染速度、SEO优化等有明显提升。

我希望此项目能孕育出更多上层框架，帮助开发团队和开发人员降低开发和维护成本。

如果对你有所帮助，[欢迎star](https://github.com/mopacha/vue-ssr-admin)


### 主要技术栈

- NodeJS
- Koa2 
- Vue, Vuex, Vue-router
- element-ui
- Webpack4
- axios
- babel7
- eslint
- css、scss、postcss
- pm2
- log4j

### 开始使用

1. 安装 node/npm  Node: >=8
2. 启动

	```
	npm install
	npm start 
	```

### 部署 

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

### 文档地址

    https://mopacha.github.io/vue-ssr-doc/