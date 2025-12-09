import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

export default function NotFound() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        location.href='/'
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            backgroundColor: '#f0f2f5'
        }}>
            <Result
                status="404"
                title="404"
                subTitle="抱歉，您访问的页面不存在。"
                extra={
                    <Button type="primary" onClick={handleGoHome}>
                        返回首页
                    </Button>
                }
            />
        </div>
    );
}