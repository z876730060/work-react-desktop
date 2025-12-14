import { Button, Form, Input, InputNumber, Divider, Switch, Select } from 'antd';
import { useNavigate } from 'react-router';
import { addMenuApi } from '@/api/menu';
import { message } from 'antd';
import { useState, useEffect } from 'react';
import { getMicroAppSelectApi } from '@/api/microApp';
import Border from '@/components/Border';

export default function AddMenu() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [showMicroApp, setShowMicroApp] = useState(false);
    const [microAppSelect, setMicroAppSelect] = useState([]);

    const onOtherChange = (checked) => {
        setShowMicroApp(checked);
        form.setFieldValue('microApp', '');
    }

    const submit = async (values) => {
        try {
            await addMenuApi(values);
            message.success('添加成功');
            navigate(-1);
        } catch (error) {
            message.error(error.message);
        }
    }

    useEffect(() => {
        getMicroAppSelectApi().then((res) => {
            setMicroAppSelect(res.data);
        });
    }, []);

    return (
        <>
            <Border>
            <Button type="primary" onClick={() => navigate('/menu')}>返回</Button>
            <Divider dashed />
            <Form
                title='添加菜单'
                form={form}
                layout="vertical"
                style={{ maxWidth: 600}}
                variant='underlined'
                onFinish={submit}
            >
                <Form.Item name="label" label="菜单名称">
                    <Input />
                </Form.Item>
                <Form.Item name="key" label="Key">
                    <Input />
                </Form.Item>
                <Form.Item name="path" label="路由">
                    <Input />
                </Form.Item>
                <Form.Item name="other" label="是否微应用">
                    <Switch onChange={onOtherChange} />
                </Form.Item>
                <Form.Item name="microApp" label="微应用" hidden={!showMicroApp}>
                    <Select options={microAppSelect} />
                </Form.Item>
                <Form.Item name="component" label="组件路径">
                    <Input />
                </Form.Item>
                <Form.Item name="orderId" label="排序">
                    <InputNumber type="number" />
                </Form.Item>
                <Form.Item name="hidden" label="隐藏">
                    <Switch />
                </Form.Item>
                <Form.Item name="parentKey" label="父菜单Key">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">添加</Button>
                </Form.Item>
            </Form>
            </Border>
        </>
    )
}