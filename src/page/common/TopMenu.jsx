import { Menu } from 'antd';
import { useState, useEffect } from 'react';
import { getMenuApi } from '@/api/menu';
import { useNavigate } from 'react-router';

function TopMenu() {
    const [items1, setItems1] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        function getMenuFunc() {
            getMenuApi().then((res) => setItems1(res.data));
        }
        
        getMenuFunc();
    }, []);

    const onMenuClick = ({ item, key, keyPath, domEvent }) => {
        console.log(key, keyPath);
        // 即使是当前页面也强制刷新
        navigate(key, { replace: true, state: { refresh: Date.now() } });
    };

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
            onClick={onMenuClick}
        />
    );
}

export default TopMenu;