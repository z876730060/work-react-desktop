import React from 'react';
import { Button, Result, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { healthApi } from '../../api/health';

export default function ServerErrorPage() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleRetry = () => {
    // 尝试重新加载当前页面
    healthApi().then(() => {
      messageApi.success("重试成功, 3秒后将自动跳转首页");
      setTimeout(() => {
        location.href='/'
      }, 3000);
    }).catch(() => {
      messageApi.error("重试失败");
    })
  };

  const handleGoHome = () => {
    location.href='/'
  };

  return (
    <>
    {contextHolder}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="500"
        title="500"
        subTitle="抱歉，服务器似乎出现了问题，请检查后端服务状态。"
        extra={
          <Space>
            <Button type="primary" onClick={handleRetry}>
              重试
            </Button>
            <Button onClick={handleGoHome}>
              返回首页
            </Button>
          </Space>
        }
      />
    </div>
    </>
  );
};