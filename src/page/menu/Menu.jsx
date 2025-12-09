import FormTable from '@/components/FormTable';
import { Button, Divider, Popconfirm, message } from 'antd';
import { getMenuListApi } from '@/api/menu';
import { delMenuApi } from '@/api/menu';
import { useNavigate } from 'react-router';

function Menu() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const addBtnClick = () => {
        navigate('/menu/add');  
    }

    const microAppBtnClick = () => {
        navigate('/menu/micro-app');  
    }

    const buttons = () => {
        return (
            <>
                <Button type="primary" onClick={addBtnClick}>添加菜单</Button>
                <Divider type="vertical" />
                <Button type="primary" onClick={microAppBtnClick}>微应用管理</Button>
                <Divider dashed />
            </>
        )
    }

    const table = FormTable({getTableDataApi: getMenuListApi, buttons});
    const delMenu = async (id) => {
        try {
            await delMenuApi(id);
            messageApi.success('删除成功');
            table.fresh();
        } catch (error) {
            console.error(error);
            messageApi.error(error.message);
        }
    }
    const editMenu = (id) => {
        navigate({
            pathname: '/menu/edit',
            search: `?id=${id}`
        });
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: '菜单名称',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '是否微应用',
            dataIndex: 'other',
            key: 'other',
            searchHidden: true,
            render: (text, record) => record.other ? '是' : '否',
        },
        {
            title: '微应用',
            dataIndex: 'microApp',
            key: 'microApp',
            render: (text, record) => record.microAppBean ? record.microAppBean.name : '-',
        },
        {
            title: '路由',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: '组件路径',
            dataIndex: 'component',
            key: 'component',
        },
        {
            title: '排序',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: '更新时间',
            dataIndex: 'UpdatedAt',
            key: 'UpdatedAt',
            searchHidden: true,
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
                <Button type="link" onClick={() => editMenu(record.ID)}>编辑</Button>
                <Divider type="vertical" />
                <Popconfirm
                    title="删除菜单"
                    description={`确认删除菜单 ${record.label} 吗？`}
                    onConfirm={() => delMenu(record.ID)}
                    onCancel={() => console.log('Cancel')}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button type="link">删除</Button>
                </Popconfirm>
                </>
            ),
        }
    ]
    table.init(columns);

    return (
        <>
            {contextHolder}
            {table.render()}
        </>
    )
}
export default Menu;
