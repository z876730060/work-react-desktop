import { Form, Input, Button, Divider, Card, Typography, Row, Col } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { loginApi, logoutApi } from '@/api/login';

const { Title, Text } = Typography;

export default function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleLogin = (values) => {
        console.log('登录信息:', values);
        // 这里可以添加登录逻辑
        loginApi(values).then(res => {
            console.log('登录成功', res)
            var token = res.data
            localStorage.setItem('token', token)
            location.href = '/'
        }).catch(err => {
            console.log('登录失败', err)
        })
    };

    const handleReset = () => {
        form.resetFields();
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <Row gutter={24} style={{ width: '100%', maxWidth: '1200px' }}>
                {/* 左侧宣传区域 */}
                <Col xs={0} md={12} lg={14}>
                    <div style={{
                        color: 'white',
                        padding: '40px',
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <Title style={{ color: 'white', fontSize: '36px', marginBottom: '20px' }}>
                            欢迎使用管理系统
                        </Title>
                        <Text style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
                            一个功能强大、安全可靠的后台管理系统
                        </Text>
                        <div style={{ 
                            marginTop: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px'
                        }}>
                            <div style={{ 
                                backgroundColor: 'rgba(255,255,255,0.1)', 
                                padding: '20px', 
                                borderRadius: '10px',
                                textAlign: 'center',
                                width: '120px'
                            }}>
                                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔒</div>
                                <Text style={{ color: 'white' }}>安全可靠</Text>
                            </div>
                            <div style={{ 
                                backgroundColor: 'rgba(255,255,255,0.1)', 
                                padding: '20px', 
                                borderRadius: '10px',
                                textAlign: 'center',
                                width: '120px'
                            }}>
                                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
                                <Text style={{ color: 'white' }}>高效便捷</Text>
                            </div>
                            <div style={{ 
                                backgroundColor: 'rgba(255,255,255,0.1)', 
                                padding: '20px', 
                                borderRadius: '10px',
                                textAlign: 'center',
                                width: '120px'
                            }}>
                                <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
                                <Text style={{ color: 'white' }}>数据驱动</Text>
                            </div>
                        </div>
                    </div>
                </Col>
                
                {/* 右侧登录表单 */}
                <Col xs={24} md={12} lg={10}>
                    <Card 
                        style={{ 
                            borderRadius: '10px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            border: 'none'
                        }}
                        styles={{ body: { padding: '40px 30px' } }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: '#667eea',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 15px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }}>
                                <LockOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </div>
                            <Title level={3} style={{ marginBottom: '5px' }}>用户登录</Title>
                            <Text type="secondary">请输入您的账号和密码</Text>
                        </div>
                        
                        <Form 
                            form={form} 
                            layout="vertical" 
                            variant='underlined'
                            onFinish={handleLogin}
                        >
                            <Form.Item 
                                name="username" 
                                label="用户名" 
                                rules={[{ required: true, message: '请输入用户名' }]}
                            >
                                <Input 
                                    prefix={<UserOutlined />} 
                                    placeholder="请输入用户名" 
                                    size="large"
                                />
                            </Form.Item>
                            
                            <Form.Item 
                                name="password" 
                                label="密码" 
                                rules={[
                                    { required: true, message: '请输入密码' },
                                    { min: 6, message: '密码长度不能小于6位' },
                                    { max: 16, message: '密码长度不能大于16位' }
                                ]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />} 
                                    placeholder="请输入密码" 
                                    size="large"
                                />
                            </Form.Item>
                            
                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    size="large" 
                                    style={{ width: '100%' }}
                                >
                                    登录
                                </Button>
                            </Form.Item>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <Button type="link" onClick={handleReset}>
                                    清空
                                </Button>
                                {/* <Button type="link">
                                    忘记密码？
                                </Button> */}
                            </div>
                            
                            {/* <div style={{ textAlign: 'center' }}>
                                <Text type="secondary">还没有账号？</Text>
                                <Button type="link" style={{ padding: '0 5px' }} onClick={() => navigate('/register')}>
                                    立即注册
                                </Button>
                            </div> */}
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}