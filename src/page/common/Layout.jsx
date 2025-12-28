import {Layout, Breadcrumb, Row, Col, Button, Avatar} from 'antd';
import './layout.css';
import TopMenu from './TopMenu';
import { useLocation, useNavigate } from 'react-router';
import { Outlet } from 'react-router';
const { Header, Content, Footer } = Layout;
import { getBreadcrumbApi } from "@/api/menu";
import { useState, useEffect } from 'react';

function MyLayout() {
  const local = useLocation();
  const [breadcrumb, setBreadcrumb] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    try {
      getBreadcrumbData(encodeURI(location.href));
    } catch (error) {
      console.error('Failed to fetch breadcrumb data:', error);
    }
  }, [local]);

  const getBreadcrumbData = async (path) => {
    try {
      const res = await getBreadcrumbApi(path);
      setBreadcrumb(res.data);
    } catch (error) {
      console.warn('Failed to fetch breadcrumb data:', error);
      // 不中断页面渲染，只是不显示面包屑
      setBreadcrumb([]);
    }
  };
  
  const showExitBtn = localStorage.getItem("token") !== null

  const handleExit = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const toMe = () => {
      navigate("/me")
  }

  return (
    <>
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <p style={{margin: 0, width: '100%'}}>
        <div style={{display: 'inline-block'}}><TopMenu /></div>
        <div style={{display: 'inline-block', minWidth: 130, position: 'absolute', right: '100px'}}>{showExitBtn &&
          <p style={{margin: 0}}><Avatar style={{ backgroundColor: '#1677ff' }} size={40} onClick={toMe}>User</Avatar><Button type="link" onClick={handleExit} >退出登录</Button></p>
        }</div>
      </p>
    </Header>
    <Content style={{ padding: '0' }}>
      <Breadcrumb style={{ margin: '5px 16px' }}>
        {breadcrumb.map((item, index) => (
          <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 0}}>
        <Outlet />
      </div>
    </Content>
    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
  </Layout>
    </>
  )
}
export default MyLayout;