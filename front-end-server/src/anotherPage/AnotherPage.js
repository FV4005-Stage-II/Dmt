import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import Header from "../componets/header/Header.js";
import Sidebar from "../componets/sidebar/Sidebar.js"
import { getProfileById } from '../api/FriendsApi';
import { LogoutOutlined } from "@ant-design/icons";
import "../profile/Profile.css";

const { Meta } = Card;

const AnotherPage = (props) => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfileById(id);
        setProfile(response);
      } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
      }
    };

    loadProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="profile-container">
          <Card
            style={{ width: 420, border: "1px solid #e1e0e0" }}
          >
            <Meta
              avatar={
                <Avatar
                  src={profile.avatarUrl}
                  className="user-avatar-circle"
                />
              }
              title={profile.username}
              description={"@" + profile.username}
            />
          </Card>
          {profile && (
            <Card className="profile-details-card">
              <div className="profile-details">
                <p><strong>Имя:</strong> {profile.firstName}</p>
                <p><strong>Фамилия:</strong> {profile.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Пол:</strong> {profile.gender}</p>
                <p><strong>Дата рождения:</strong> {profile.dateOfBirth}</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnotherPage;
