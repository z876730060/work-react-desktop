import { Button, Divider, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import FormTable from '@/components/FormTable';
import { getMicroAppListApi, delMicroAppApi } from '@/api/microApp';

export default function MicroApp() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    function buttons() {
        return (
            <>
                <Button type="primary" onClick={() => navigate('/menu/micro-app/add')}>添加微应用</Button>
                <Divider dashed />
            </>
        )
    }

    const table = FormTable({getTableDataApi: getMicroAppListApi, buttons: buttons})

    const delMicroApp = (id) => {
        delMicroAppApi(id).then(res => {
            if (res.code === 200) {
                messageApi.success('删除成功');
                table.fresh();
            } else {
                messageApi.error(res.msg);
            }
        })
    }

    const editMicroApp = (id) => {
        navigate(`/menu/micro-app/edit?id=${id}`);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '地址',
            dataIndex: 'baseUrl',
            key: 'baseUrl',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            searchHidden: true,
            render: (text, record) => (
                <>
                <Button type="link" onClick={() => editMicroApp(record.ID)} ghost>编辑</Button>
                <Divider type="vertical" />
                <Popconfirm
                    title="删除微应用"
                    description={`确认删除微应用 ${record.name} 吗？`}
                    onConfirm={() => delMicroApp(record.ID)}
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
            <Button type="primary" onClick={() => navigate('/menu')}>返回</Button>
            <Divider dashed />
            {table.render()}
        </>
    )
}