import { Table, Button, Divider, Form, Row, Col, Input } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Border from './Border';

const CustomForm = ({columns,getTableData}) => {
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();

    // To generate mock Form.Item
    const getFields = () => {
        const count = expand ? 10 : 6;
        const children = [];
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].searchHidden) {
                continue;
            }
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <Form.Item 
                        label={columns[i].title} 
                        name={columns[i].dataIndex}
                        rules={[
                            {
                                required: false,
                                validator: (rule, value) => {
                                    if (value === undefined || value.length === 0) {
                                        return Promise.resolve();
                                    }
                                    if (columns[i].validator !== undefined) {
                                        return columns[i].validator(value);
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input placeholder={`请输入${columns[i].title}`} />
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    }

    const handleSearch = (values) => {
        console.log('Received values of form: ', values);
        getTableData(values);
    };

    const handleReset = () => {
        form.resetFields();
    };

    const toggle = () => {
        setExpand(!expand);
    };

    return {
        render() {
            return (
                <>
                <Form 
                    form={form}
                    variant='underlined'
                    onFinish={handleSearch}
                >
                    <Row gutter={24}>{getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                                清空
                            </Button>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={toggle}>
                                {expand ? <><UpOutlined /> 折叠</> : <><DownOutlined /> 展开</>}
                            </a>
                        </Col>
                    </Row>
                </Form>
                </>
            )
        }
    }
};

const CustomTable = (getTableDataApi) => {
    let columns = [];
    const [tableData, setTableData] = useState({
        params: {},
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
            showSizeChanger: true,
            showTotal: (total, range) => `共 ${total} 条`,
        },
        loading: false,
    });

    const getUserFunc = async (params = {}) => {
        try {
            const start = performance.now();
            const res = await getTableDataApi({
                        page: params.page || tableData.pagination.current,
                        size: params.size || tableData.pagination.pageSize,
                        ...params,
                    });
            const duration = performance.now() - start;
            console.log(`API调用耗时: ${duration.toFixed(2)}ms`);
        
            setTableData({
                params: {
                    ...params,
                },
                data: res.data.records,
                pagination: {
                    ...tableData.pagination,
                    current: params.page || tableData.pagination.current,
                    pageSize: params.size || tableData.pagination.pageSize,
                    total: res.data.total,
                },
                loading: false,
            });
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setTableData(prev => ({
                ...prev,
                loading: false,
            }));
        }
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setTableData(prev => ({
            ...prev,
            pagination: {
                ...pagination,
                current: pagination.current,
                pageSize: pagination.pageSize,
            },
        }));
        getUserFunc({
            ...tableData.params,
            page: pagination.current,
            size: pagination.pageSize,
        });
    };

    useEffect(() => {
        getUserFunc({
            page: tableData.pagination.current,
            size: tableData.pagination.pageSize,
        });
    }, []);

    return {
        init(columns) {
            this.columns = columns;
        },
        getData(param) {
            getUserFunc(param);
        },
        fresh() {
            getUserFunc(tableData.params);
        },
        render() {
            return (
                <Table
                    columns={this.columns}
                    dataSource={tableData.data}
                    pagination={tableData.pagination}
                    loading={tableData.loading}
                    onChange={handleTableChange}
                />
            )
        }
    }
};

function FormTable({getTableDataApi, buttons}) {
    const table = CustomTable(getTableDataApi);
    let columns = [];

    return {
        init(columns) {
            this.columns = columns;
            table.init(columns);
        },
        fresh() {
            table.fresh();
        },
        render() {
            return (
                <>
                    <Border>
                    {CustomForm({columns: this.columns, getTableData: table.getData}).render()}
                    <Divider dashed />
                    {buttons? buttons() : null}
                    {table.render()}
                    </Border>
                </>
            )
        }
    }
};

export default FormTable;