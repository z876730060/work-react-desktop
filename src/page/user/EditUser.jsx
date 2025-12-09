import { useNavigate, useLocation } from 'react-router';
import { Button, Divider, Form, Input, message } from 'antd';
import { updateUserApi, getUserDetailApi } from '../../api/user';
import { useEffect } from 'react';
import Border from '../../components/Border';

export default function EditUser() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [form] = Form.useForm();

    const submit = (values) => {
        updateUserApi(values).then((res) => {
            if (res.code === 200) {
                message.success('更新成功');
                navigate('/user');
            } else {
                message.error(res.message);
            }
        });
    }

    useEffect(() => {
        if (id) {
            getUserDetailApi(id).then((res) => {
                form.setFieldsValue(res.data);
            });
        }
    }, [id]);

    return (
        <>
        <Border>
        <Button type="primary" onClick={() => navigate('/user')}>返回</Button>
        <Divider dashed />
        <Form
            title='更新用户'
            form={form}
            layout="vertical"
            style={{ maxWidth: 600}}
            variant='underlined'
            onFinish={submit}
        >
            <Form.Item name="ID" label="ID" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="fullname" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="username" label="账号" rules={[{ required: true, message: '请输入账号' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="phone" label="电话" rules={[{ required: true, message: '请输入电话' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    更新
                </Button>
            </Form.Item>
        </Form>
        </Border>
        </>
    )
}