# Work Platform

这是一个基于微前端架构的工作平台项目。

## 项目结构

```
work/
├── src/                 # 源代码目录
├── public/              # 静态资源
├── package.json         # 项目依赖和脚本
└── vite.config.js       # 构建配置
```

## 微应用集成说明

### Vue微应用配置

如果子应用是基于Vue开发的，需要进行以下配置：

#### 1. 注册卸载函数

在Vue应用的入口文件`main.js`中添加应用卸载函数：

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

// 卸载应用
window.unmount = () => {
  app.unmount()
}
```

#### 2. 设置 publicPath

##### 步骤1: 创建public-path.js文件

在`src`目录下创建`public-path.js`文件，并添加如下内容：

```javascript
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
```

##### 步骤2: 引入public-path.js

在子应用入口文件的最顶部引入`public-path.js`：

```javascript
// entry
import './public-path.js'
import { createApp } from 'vue'
import App from './App.vue'
// ...其他导入
```

### React微应用配置

如果子应用是基于React开发的，需要进行以下配置：

#### 1. 注册卸载函数

子应用卸载时会自动执行`window.unmount`，在此可以进行卸载相关操作：

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// 卸载应用
window.unmount = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}
```

#### 2. 设置 publicPath

如果子应用出现静态资源地址404（js、css、图片），建议设置`publicPath`来尝试解决这个问题。

> 注意：`publicPath`是webpack提供的功能，vite应用是不支持的。它可以补全静态资源的地址。

##### 步骤1: 创建public-path.js文件

在`src`目录下创建`public-path.js`文件，并添加如下内容：

```javascript
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
```

##### 步骤2: 引入public-path.js

在子应用入口文件的最顶部引入`public-path.js`：

```javascript
// entry
import './public-path.js'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// ...其他导入
```

## 开发环境

- Node.js >= 16.x
- npm >= 8.x 或 yarn >= 1.22.x

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 技术栈

- React 18
- Vite 5
- Ant Design
- Micro App (微前端框架)
- React Router v6

## 目录说明

```
src/
├── api/          # 接口请求
├── assets/       # 静态资源
├── components/   # 公共组件
├── config/       # 配置文件
├── page/         # 页面组件
└── store/        # 状态管理
```

## 微前端配置

项目使用[micro-app](https://micro-zoe.github.io/micro-app/)作为微前端解决方案。

### 主应用配置

主应用通过路由来加载不同的微应用。

### 子应用配置

子应用需要根据微前端框架的要求进行适配。