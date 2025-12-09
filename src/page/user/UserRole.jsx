import { Button, Divider, Form, Input, message, Tree } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRoleTreeApi } from '../../api/role';
import { useState } from 'react';
import { bindRoleApi, getRoleApi } from '../../api/user';
import Border from '../../components/Border';

export default function UserRole() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [roleTree, setRoleTree] = useState([]);

    const [form] = Form.useForm();
    form.setFieldsValue({
        ID: id
    });
    const [selectedKeys, setSelectedKeys] = useState([]);
    const onMenuTreeSelect = (checkedKeys) => {
        setSelectedKeys(checkedKeys);
    };

    const submit = (values) => {
        console.log(values);
        bindRoleApi({
            ID: values.ID,
            roleKeys: selectedKeys
        }).then(res => {
            if (res.code === 200) {
                message.success('绑定成功');
                setTimeout(() => {
                    navigate('/user');
                }, 1000);
            } else {
                message.error(res.msg || '绑定失败');
            }
        });
    }

    useEffect(() => {
        getRoleTreeApi().then(res => {
            if (res.code === 200) {
                setRoleTree(res.data);
            }
        });
        getRoleApi(id).then(res => {
            if (res.code === 200) {
                setSelectedKeys(res.data);
            }
        });
    }, []);

    return (
        <>
        <Border>
        <Button type="primary" onClick={() => navigate(`/user`)}>返回</Button>
        <Divider dashed />
        <Form
            title='更新用户'
            form={form}
            layout="vertical"
            style={{ maxWidth: 600}}
            variant='underlined'
            onFinish={submit}
        >
            <Form.Item name="ID" label="用户ID" hidden>
                <Input />
            </Form.Item>
            <Form.Item label="角色">
                <Tree 
                    checkable
                    showLine
                    treeData={roleTree}
                    checkedKeys={selectedKeys}
                    onCheck={onMenuTreeSelect}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    绑定
                </Button>
            </Form.Item>
        </Form>
        </Border>
        </>
    );
}