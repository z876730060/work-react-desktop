import { Button, Divider, Form, Input, message } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { updateMicroAppApi, getMicroAppDetailApi } from '@/api/microApp';
import { useEffect } from 'react';
import Border from '@/components/Border';

export default function EditMicroApp() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const submit = (values) => {
        console.log(values);
        updateMicroAppApi(values).then(res => {
            if (res.code === 200) {
                message.success('更新成功');    
                navigate('/menu/micro-app');
            } else {
                message.error(res.msg);
            }
        })
    }

    useEffect(() => {
        getMicroAppDetailApi(id).then(res => {
            if (res.code === 200) {
                form.setFieldsValue(res.data);
            } else {
                message.error(res.msg);
            }
        })
    }, [id])

    return (
        <>
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
                    label='微应用ID'
                    name='ID'
                    hidden={true}
                >
                    <Input />
                </Form.Item>
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
                        更新
                    </Button>
                </Form.Item>
            </Form>
        </Border>
        </>
    )
}