import { Form, Input, Button, Divider, Card, Typography, Row, Col } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

export default function Register() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleRegister = (values) => {
        console.log('注册信息:', values);
        // 这里可以添加注册逻辑
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
                            欢迎加入我们
                        </Title>
                        <Text style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
                            创建账户以享受我们的完整服务
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
                
                {/* 右侧注册表单 */}
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
                                <UserOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </div>
                            <Title level={3} style={{ marginBottom: '5px' }}>用户注册</Title>
                            <Text type="secondary">请填写以下信息创建账户</Text>
                        </div>
                        
                        <Form 
                            form={form} 
                            layout="vertical"
                            variant="underlined"
                            onFinish={handleRegister}
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
                                name="email" 
                                label="邮箱" 
                                rules={[
                                    { required: true, message: '请输入邮箱' },
                                    { type: 'email', message: '请输入有效的邮箱地址' }
                                ]}
                            >
                                <Input 
                                    prefix={<MailOutlined />} 
                                    placeholder="请输入邮箱" 
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
                            
                            <Form.Item 
                                name="confirmPassword" 
                                label="确认密码" 
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: '请确认密码' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('两次输入的密码不一致'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />} 
                                    placeholder="请再次输入密码" 
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
                                    注册
                                </Button>
                            </Form.Item>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <Button type="link" onClick={handleReset}>
                                    清空
                                </Button>
                                <Button type="link" onClick={() => navigate('/login')}>
                                    已有账户？立即登录
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}