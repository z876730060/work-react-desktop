import { Button, Divider, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router';
import { addMicroAppApi } from '@/api/microApp';
import Border from '@/components/Border';

export default function AddMicroApp() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const submit = (values) => {
        console.log(values);
        addMicroAppApi(values).then(res => {
            if (res.code === 200) {
                messageApi.success('添加成功');
                navigate('/menu/micro-app');
            } else {
                messageApi.error(res.msg);
            }
        })
    }

    return (
        <>
        {contextHolder}
        <Border>
        <Button type="primary" onClick={() => navigate('/menu/micro-app')}>返回</Button>
        <Divider dashed />
        <Form
                title='添加微应用'
                form={form}
                layout="vertical"
                style={{ maxWidth: 600}}
                variant='underlined'
                onFinish={submit}
            >
                <Form.Item
                    label='微应用名称'
                    name='name'
                    rules={[{ required: true, message: '请输入微应用名称' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='微应用Key'
                    name='key'
                    rules={[{ required: true, message: '请输入微应用Key' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='微应用BaseUrl'
                    name='baseUrl'
                    rules={[{ required: true, message: '请输入微应用BaseUrl' }]}
                >
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