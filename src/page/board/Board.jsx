import { Card, Row, Col, Typography, Statistic, Progress, Divider } from 'antd';
import { UserOutlined, ProjectOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Board.css';

const { Title, Text } = Typography;

// 图表数据
const lineData = [
  { name: '周一', value: 400 },
  { name: '周二', value: 600 },
  { name: '周三', value: 800 },
  { name: '周四', value: 500 },
  { name: '周五', value: 900 },
  { name: '周六', value: 700 },
  { name: '周日', value: 1000 },
];

const barData = [
  { name: '项目A', value: 4000 },
  { name: '项目B', value: 3000 },
  { name: '项目C', value: 2000 },
  { name: '项目D', value: 2780 },
  { name: '项目E', value: 1890 },
];

const pieData = [
  { name: '完成', value: 400 },
  { name: '进行中', value: 300 },
  { name: '未开始', value: 300 },
  { name: '已取消', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Board() {
  const [progressData] = useState([
    { name: '前端开发', value: 85 },
    { name: '后端开发', value: 70 },
    { name: '测试', value: 45 },
    { name: '部署', value: 20 },
  ]);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>系统概览</Title>
      
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="用户总数"
              value={1286}
              prefix={<UserOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="项目数量"
              value={58}
              prefix={<ProjectOutlined />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="完成率"
              value={85}
              prefix={<CheckCircleOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="系统状态"
              value="正常"
              prefix={<WarningOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
      </Row>
      
      <Divider />
      
      {/* 图表展示 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <Card title="用户增长趋势">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="项目统计">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <Card title="项目状态分布">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="项目进度">
            {progressData.map((item, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Text>{item.name}</Text>
                  <Text>{item.value}%</Text>
                </div>
                <Progress percent={item.value} status={item.value === 100 ? 'success' : 'normal'} />
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
}