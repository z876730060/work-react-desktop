import { Form,Button, Input,Divider } from 'antd';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import { addUserApi } from '@/api/user';
import Border from '@/components/Border';

export default function AddUser() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const submit = (values) => {
        console.log(values);
        addUserApi(values).then(res => {
            if (res.code === 200) {
                message.success('添加成功');
                setTimeout(() => {
                    navigate('/user');
                }, 1000);
            } else {
                message.error(res.msg || '添加失败');
            }
        });
    }

    return (
        <>
        <Border>
        <Button type="primary" onClick={() => navigate('/user')}>返回</Button>
        <Divider dashed />
        <Form
            title='添加用户'
            form={form}
            layout="vertical"
            style={{ maxWidth: 600}}
            variant='underlined'
            onFinish={submit}
        >
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
                    添加
                </Button>
            </Form.Item>
        </Form>
        </Border>
        </>
    )
}