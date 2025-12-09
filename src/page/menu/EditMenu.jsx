import { Button, Divider,Form,Input,Switch,Select, InputNumber } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { updateMenuApi, getMenuDetailApi } from '@/api/menu';
import { message } from 'antd';
import { useState } from 'react';
import { getMicroAppSelectApi } from '@/api/microApp';
import Border from '@/components/Border';

export default function EditMenu() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [showMicroApp, setShowMicroApp] = useState(false);
    const [microAppSelect, setMicroAppSelect] = useState([]);

    const onOtherChange = (checked) => {
        setShowMicroApp(checked);
        form.setFieldValue('microApp', '');
    }

    const submit = (values) => {
        if (id) {
            updateMenuApi(values).then((res) => {
                navigate('/menu');
            });
        }
    }

    useEffect(() => {
        getMenuDetailApi(id).then((res) => {
            form.setFieldsValue(res.data);
            setShowMicroApp(res.data.other);
        });
        getMicroAppSelectApi().then((res) => {
            setMicroAppSelect(res.data);
        });
    }, [id]);


    return (
        <>
        <Border>
        <Button type="primary" onClick={() => navigate('/menu')}>返回</Button>
        <Divider dashed/>
        <Form
                title='编辑菜单'
                form={form}
                layout="vertical"
                style={{ maxWidth: 600}}
                variant='underlined'
                onFinish={submit}
            >   
                <Form.Item name="ID" label="ID" hidden>
                    <Input />
                </Form.Item>
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
                    <InputNumber />
                </Form.Item>
                <Form.Item name="parentKey" label="父菜单Key">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">更新</Button>
                </Form.Item>
            </Form>
            </Border>
        </>
    )
}