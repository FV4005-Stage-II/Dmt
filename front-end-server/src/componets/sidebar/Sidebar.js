import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, MessageOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';
import './Sidebar.css';
import { Link, useHistory } from 'react-router-dom';

const Sidebar = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    history.push("/sign-in");
  };

  return (
    <div className="sidebar">
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/profile">Моя страница</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<MessageOutlined />}>
          <Link to="/chat">Сообщения</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          <Link to="/friends">Друзья</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
          Выйти
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Sidebar;
