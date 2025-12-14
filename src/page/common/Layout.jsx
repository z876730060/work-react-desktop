import {Layout, Breadcrumb, Row, Col, Button, Avatar} from 'antd';
import './layout.css';
import TopMenu from './TopMenu';
import { useLocation, useNavigate } from 'react-router';
import { Outlet } from 'react-router';
const { Header, Content, Footer } = Layout;
import { getBreadcrumbApi } from "@/api/menu";
import { useState, useEffect } from 'react';
import { healthApi } from '../../api/health';

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
      console.error('Failed to fetch breadcrumb data:', error);
      try {
        await healthApi();
        navigate("/login")
      } catch (error) {
        console.error('Failed to fetch health data:', error);
        navigate("/500")
      }
    }
  };
  
  const showExitBtn = localStorage.getItem("token") !== null

  const handleExit = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <>
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Row>
        <Col span={20}><TopMenu /></Col>
        <Col span={2}><Avatar style={{ backgroundColor: '#1677ff' }} size={40}>User</Avatar>{showExitBtn &&
            <Button type="link" onClick={handleExit} >退出登录</Button>
        }</Col>
      </Row>
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