import React, { useState } from 'react';
import './Me.css';

export default function Me() {
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '138****8888',
    department: '技术部',
    position: '高级工程师',
    joinDate: '2022-03-15'
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    alert('保存成功！');
  };

  const tabs = [
    { id: 'profile', label: '个人信息' },
    { id: 'security', label: '安全设置' },
    { id: 'account', label: '账户设置' }
  ];

  return (
    <div className="me-container">
      <div className="me-header">
        <h1>个人中心</h1>
        <p>管理您的个人信息和账户设置</p>
      </div>

      <div className="me-content">
        {/* 侧边栏 */}
        <div className="me-sidebar">
          <div className="user-profile">
            <div className="avatar">
              <img src="https://via.placeholder.com/80x80" alt="用户头像" />
            </div>
            <div className="user-info">
              <h3>{userInfo.name}</h3>
              <p>{userInfo.department} · {userInfo.position}</p>
            </div>
          </div>

          <nav className="me-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* 主内容区 */}
        <div className="me-main">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>基本信息</h2>
              <div className="form-group">
                <label>姓名</label>
                <input 
                  type="text" 
                  value={userInfo.name} 
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})} 
                />
              </div>
              
              <div className="form-group">
                <label>邮箱</label>
                <input 
                  type="email" 
                  value={userInfo.email} 
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})} 
                />
              </div>
              
              <div className="form-group">
                <label>手机号</label>
                <input 
                  type="tel" 
                  value={userInfo.phone} 
                  onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})} 
                />
              </div>
              
              <div className="form-group">
                <label>部门</label>
                <input 
                  type="text" 
                  value={userInfo.department} 
                  readOnly 
                />
              </div>
              
              <div className="form-group">
                <label>职位</label>
                <input 
                  type="text" 
                  value={userInfo.position} 
                  readOnly 
                />
              </div>
              
              <div className="form-group">
                <label>入职日期</label>
                <input 
                  type="text" 
                  value={userInfo.joinDate} 
                  readOnly 
                />
              </div>
              
              <button className="save-btn" onClick={handleSave}>保存信息</button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="security-section">
              <h2>安全设置</h2>
              <div className="security-item">
                <div className="security-label">
                  <h3>修改密码</h3>
                  <p>定期更换密码可以提高账户安全性</p>
                </div>
                <button className="change-btn">修改</button>
              </div>
              
              <div className="security-item">
                <div className="security-label">
                  <h3>登录验证</h3>
                  <p>开启双重验证可以提高账户安全性</p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="security-item">
                <div className="security-label">
                  <h3>登录历史</h3>
                  <p>查看最近的登录记录</p>
                </div>
                <button className="view-btn">查看</button>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="account-section">
              <h2>账户设置</h2>
              <div className="account-item">
                <div className="account-label">
                  <h3>消息通知</h3>
                  <p>设置接收哪些类型的消息通知</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="account-item">
                <div className="account-label">
                  <h3>邮件订阅</h3>
                  <p>订阅产品更新和活动信息</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="account-item">
                <div className="account-label">
                  <h3>隐私设置</h3>
                  <p>管理您的隐私偏好设置</p>
                </div>
                <button className="manage-btn">管理</button>
              </div>
              
              <div className="danger-zone">
                <h3>危险操作</h3>
                <p>这些操作不可逆，请谨慎操作</p>
                <button className="delete-btn">注销账户</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}