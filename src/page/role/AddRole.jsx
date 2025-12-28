import { Button, Divider, Form, Input, Tree } from 'antd';
import { useNavigate } from "react-router";
import { addRoleApi } from "@/api/role";
import { getTreeMenuApi } from "@/api/menu";
import { useState, useEffect } from 'react';
import { message } from 'antd';
import Border from '@/components/Border';

export default function AddRole() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [menuList, setMenuList] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const submit = async (values) => {
        console.log(values, selectedKeys);
        values.menuPermission = selectedKeys;
        try {
            const res = await addRoleApi({
                name: values.name,
                key: values.key,
                menuPermission: selectedKeys,
            });
            if (res.code === 200) {
                message.success('添加成功');
                navigate('/role');
            } else {
                message.error(res.msg || '添加失败');
            }
        } catch (error) {
            message.error('添加失败');
        }
    };

    const onMenuTreeSelect = (selectKey) => {
        console.log('selectKey', selectKey);
        setSelectedKeys(selectKey);
    };

    useEffect(() => {
        getTreeMenuApi().then(res => {
            setMenuList(res.data);
        });
    }, []);

    return (
        <>
        <Border>
        <Button type="primary" onClick={() => navigate('/role')}>返回</Button>
        <Divider dashed />
        <Form
            title='添加角色'
            form={form}
            layout="vertical"
            style={{ maxWidth: 600}}
            variant='underlined'
            onFinish={submit}
        >
            <Form.Item name="name" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="key" label="Key" rules={[{ required: true, message: '请输入Key' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name='comment'
                label='备注'
            >
                <Input />
            </Form.Item>
            <Form.Item name="menuPermission" label="菜单权限">
                <Tree 
                    checkable
                    showLine
                    treeData={menuList}
                    checkedKeys={selectedKeys}
                    onCheck={onMenuTreeSelect}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">添加</Button>
            </Form.Item>
        </Form>
        </Border>
        </>
    )
}