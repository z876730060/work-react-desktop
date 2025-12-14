import { getUserListApi, delUserApi } from '@/api/user';
import FormTable from '@/components/FormTable';
import {Button, Divider, Popconfirm, message, Avatar} from 'antd';
import { useNavigate } from 'react-router';

export default function User() {
    const navigate = useNavigate();
    const onAdd = () => {
        navigate('/user/add');
    };

    function buttons() {
        return (
            <>
                <Button type="primary" onClick={onAdd}>添加用户</Button>
                <Divider dashed />
            </>
        )
    }

    const table = FormTable({getTableDataApi: getUserListApi, buttons: buttons});

    const deleteUser = (id) => {
        delUserApi(id).then((res) => {
            if (res.code === 200) {
                message.success('删除成功');
                table.fresh();
            } else {
                message.error(res.message);
            }
        });
    }

    const columns = [
    {
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID',
        validator: (value) => {
            // 判断value是否可以转换为数值类型
            const num = Number(value);
            if (isNaN(num)) {
                return Promise.reject('ID必须是数字');
            }
            return Promise.resolve();
        },
    },
    {
        title: '头像',
        dataIndex: 'pic',
        key: 'pic',
        render: (text, record) => {
            if (text) {
                return (
                    <>
                        <Avatar size={40} src={text}></Avatar>
                    </>
                )
            }

            return (
                <>
                    <Avatar style={{ backgroundColor: '#1677ff' }} size={40}>{record.fullname}</Avatar>
                </>
            )
        }
    },
    {
        title: '姓名',
        dataIndex: 'fullname',
        key: 'fullname',
        validator: (value) => {
            // 判断value是否为空
            if (!value.trim()) {
                return Promise.reject('姓名不能为空');
            }
            if (value.length > 10) {
                return Promise.reject('姓名不能超过10个字符');
            }
            return Promise.resolve();
        },
    },
    {
        title: '账号',
        dataIndex: 'username',
        key: 'username',
        validator: (value) => {
            // 判断value是否为空
            if (!value.trim()) {
                return Promise.reject('账号不能为空');
            }
            if (value.length > 10) {
                return Promise.reject('账号不能超过10个字符');
            }
            return Promise.resolve();
        },
    },
    {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
        searchHidden: true,
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        validator: (value) => {
            // 判断value是否为空
            if (!value.trim()) {
                return Promise.reject('邮箱不能为空');
            }
            if (value.length > 20) {
                return Promise.reject('邮箱不能超过20个字符');
            }
            return Promise.resolve();
        },
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        validator: (value) => {
            // 判断value是否为空
            if (!value.trim()) {
                return Promise.reject('手机号不能为空');
            }
            if (value.length > 11) {
                return Promise.reject('手机号不能超过11个字符');
            }
            return Promise.resolve();
        },
    },
    {
        title: '更新时间',
        dataIndex: 'UpdatedAt',
        key: 'UpdatedAt',
        render: (text, record) => {
            record.UpdatedAt = record.UpdatedAt ? record.UpdatedAt.replace('T', ' ') : '-';
            record.UpdatedAt = record.UpdatedAt.split('.')[0];
            return record.UpdatedAt;
        },
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        searchHidden: true,
        render: (text, record) => (
            <>
                <Button type="link" ghost onClick={() => navigate(`/user/edit?id=${record.ID}`)}>编辑</Button>
                <Divider type="vertical" />
                <Button type="link" ghost onClick={() => navigate(`/user/role?id=${record.ID}`)}>角色</Button>
                <Divider type="vertical" />
                <Button type="link" ghost>上传头像</Button>
                <Divider type="vertical" />
                <Popconfirm
                    title="删除用户"
                    description={`确认删除用户 ${record.fullname} 吗？`}
                    onConfirm={() => deleteUser(record.ID)}
                    onCancel={() => console.log('Cancel')}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button type="link" >删除</Button>
                </Popconfirm>
            </>
        ),
    }
];
    table.init(columns);
    return table.render();
};