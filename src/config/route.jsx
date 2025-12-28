import axiosInstance from './axios';
import { lazy, Suspense } from 'react';
import MyLayout from "@/page/common/Layout";
import { createBrowserRouter } from 'react-router';
import NotFound from "@/page/404/NotFound";
import Login from "@/page/login/Login";
import Register from "@/page/login/Register";
import MAppPage from "@/components/MicroApp";
import BadRequest from "@/page/500/BadRequest";

export async function loadRouter() {
let res = await axiosInstance.get("/route").catch((err) => {
  console.error(err)
});
let routerData = []
if (res != undefined) {
res.data.forEach(item => {
  console.log('item', item)
  let path = item.path
  if (item.microApp != "") {
    path = `/${item.microApp}${path}`
  }
  routerData.push({
    path: path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        {lazyLoadComponent(item.component, item.other, item.microApp, item.path)}
      </Suspense>
    ),
  })
})
}

const router = createBrowserRouter([{
    path: "/",
    element: <MyLayout />,
    middleware: [loggingMiddleware],
    children: routerData,
    errorElement: <NotFound />,
  }, {
      path: "/404",
      Component: NotFound,
      middleware: [loggingMiddleware],
  }, {
      path: "/500",
      Component: BadRequest,
      middleware: [loggingMiddleware],
  }, {
      path: "/login",
      Component: Login,
      middleware: [loggingMiddleware],
  }]);
  return router;
}

const lazyLoadComponent = (componentPath, other, microApp, path) => {
  console.log('componentPath', other)
  if (other) { 
    return <MAppPage microApp={microApp} path={path} />
  }
  
  // 使用静态导入映射替代动态模板字符串
   const componentMap = {
     // 用户管理页面
     'page/user/User': () => import('@/page/user/User'),
     'page/user/AddUser': () => import('@/page/user/AddUser'),
     'page/user/EditUser': () => import('@/page/user/EditUser'),
     'page/user/UserRole': () => import('@/page/user/UserRole'),
     
     // 角色管理页面
     'page/role/Role': () => import('@/page/role/Role'),
     'page/role/AddRole': () => import('@/page/role/AddRole'),
     'page/role/EditRole': () => import('@/page/role/EditRole'),
     
     // 菜单管理页面
     'page/menu/Menu': () => import('@/page/menu/Menu'),
     'page/menu/AddMenu': () => import('@/page/menu/AddMenu'),
     'page/menu/EditMenu': () => import('@/page/menu/EditMenu'),
     'page/menu/microApp/MicroApp': () => import('@/page/menu/microApp/MicroApp'),
     'page/menu/microApp/AddMicroApp': () => import('@/page/menu/microApp/AddMicroApp'),
     'page/menu/microApp/EditMicroApp': () => import('@/page/menu/microApp/EditMicroApp'),
     
     // 登录相关页面
     'page/login/Login': () => import('@/page/login/Login'),
     'page/login/Register': () => import('@/page/login/Register'),

     // me
     'page/me/Me': () => import('@/page/me/Me'),

     // 其他页面
     'page/board/Board': () => import('@/page/board/Board'),
   };
  
  // 检查组件路径是否在映射中
  if (componentMap[componentPath]) {
    const LazyComponent = lazy(componentMap[componentPath]);
    return <LazyComponent />;
  }
  
  // 默认返回404页面
  const LazyComponent = lazy(() => import('./../page/404/NotFound'));
  return <LazyComponent />;
}

const loggingMiddleware = async (
  { request, context },
  next,
) => {
  await next();
  // 异步记录日志，不阻塞主流程
  // logApi({url: request.url}).catch(error => {
  //   console.error('日志记录失败:', error);
  // });

  // 还可以进行权限校验
}

export const myRouter = await loadRouter();
