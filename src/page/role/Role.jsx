import FormTable from '@/components/FormTable';
import { getRoleListApi, deleteRoleApi } from '@/api/role';
import { Button, Divider, message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router';

export default function Role() {
    const navigate = useNavigate();

    function navigateToAddRole() {
        navigate('/role/add');
    }

    function navigateToEditRole(id) {
        navigate(`/role/edit?id=${id}`);
    }

    function buttons() {
        return (
            <>
            <Button type="primary" onClick={navigateToAddRole}>添加角色</Button>
            <Divider dashed/>
            </>
        )
    }

    const table = FormTable({getTableDataApi: getRoleListApi, buttons});

    function deleteRole(id) {
        deleteRoleApi(id).then(res => {
            if (res.code === 200) {
                message.success('删除成功');
                table.fresh();
            } else {
                message.error(res.message || '删除失败');
            }
        });
    }

    const columns = [{
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID',
        searchHidden: true,
    }, {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        validator: (value) => {
            // 判断value是否为空
            if (!value.trim()) {
                return Promise.reject('角色名称不能为空');
            }
            if (value.length > 10) {
                return Promise.reject('角色名称不能超过10个字符');
            }
            return Promise.resolve();
        },
    }, {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment'
    }, {
            title: '更新时间',
            dataIndex: 'UpdatedAt',
            key: 'UpdatedAt',
            render: (text, record) => {
                record.UpdatedAt = record.UpdatedAt ? record.UpdatedAt.replace('T', ' ') : '-';
                record.UpdatedAt = record.UpdatedAt.split('.')[0];
                return record.UpdatedAt;
            },
    }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        searchHidden: true,
        render: (text, record) => (
            <>
            <Button type="link"  onClick={() => navigateToEditRole(record.ID)} ghost>编辑</Button>
            <Divider type="vertical" />
            <Popconfirm
                title="删除角色"
                description={`确认删除角色 ${record.name} 吗？`}
                onConfirm={() => deleteRole(record.ID)}
                onCancel={() => console.log('Cancel')}
                okText="确认"
                cancelText="取消"
            >
                <Button type="link" >删除</Button>
            </Popconfirm>
            </>
        ),
    }]
    table.init(columns);

    return table.render();
}