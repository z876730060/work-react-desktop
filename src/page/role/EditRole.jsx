import { useLocation } from 'react-router';
import { getRoleDetailApi, updateRoleApi } from '@/api/role';
import { getTreeMenuApi } from '@/api/menu';
import { Button, Form, Divider, Input, Tree, message } from 'antd';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Border from '@/components/Border';

export default function EditRole() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [menuList, setMenuList] = useState([]);
    const [form] = Form.useForm();
    const [selectedKeys, setSelectedKeys] = useState([]);

    const submit = (values) => {
        console.log(values);
        values.menuPermission = selectedKeys;
        updateRoleApi({
            ID: id,
            name: values.name,
            menuPermission: selectedKeys,
        }).then(res => {
            if (res.code === 200) {
                message.success('更新成功');
                navigate('/role');
            } else {
                message.error(res.message || '更新失败');
            }
        });
    }

    const onMenuTreeSelect = (selectKey) => {
        console.log('selectKey', selectKey);
        setSelectedKeys(selectKey);
    };
    
    useEffect(() => {
        getTreeMenuApi().then(res => {
            setMenuList(res.data);
        });
        getRoleDetailApi(id).then(res => {
            form.setFieldsValue(res.data.role);
            setSelectedKeys(res.data.menuPermission || []);
        });
    }, [id]);

    return (
        <>
        <Border>
        <Button type="primary" onClick={() => navigate('/role')}>返回</Button>
        <Divider  dashed />
        <Form
            title='编辑角色'
            form={form}
            layout="vertical"
            style={{ maxWidth: 600}}
            variant='underlined'
            onFinish={submit}
        >
            <Form.Item
                name='ID'
                label='ID'
                hidden
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='name'
                label='角色名称'
                rules={[{ required: true, message: '请输入角色名称' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='menuPermission'
                label='菜单权限'
            >
                <Tree 
                    checkable
                    showLine
                    treeData={menuList}
                    checkedKeys={selectedKeys}
                    onCheck={onMenuTreeSelect}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">更新</Button>
            </Form.Item>
        </Form>
        </Border>
        </>
    )
}