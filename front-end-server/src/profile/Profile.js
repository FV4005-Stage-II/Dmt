import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../atom/GlobalState.js";
import { LogoutOutlined } from "@ant-design/icons";
import { getCurrentUser, getProfileUser } from "../api/ProfileApi.js";
import "./Profile.css";
import Header from "../componets/header/Header.js";
import Sidebar from "../componets/sidebar/Sidebar.js"

const { Meta } = Card;

const Profile = (props) => {
  const [currentUser, setLoggedInUser] = useRecoilState(loggedInUser);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      props.history.push("/sign-in");
    } else {
      loadCurrentUser();
    }
  }, []);

  const loadCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      setLoggedInUser(response);
      const profileResponse = await getProfileUser(response.id);
      setUserProfile(profileResponse);
      console.log("User Profile:", profileResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    props.history.push("/sign-in");
  };

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
                  src={currentUser.profilePicture}
                  className="user-avatar-circle"
                />
              }
              title={currentUser.name}
              description={"@" + currentUser.name}
            />
          </Card>
          {userProfile && (
            <Card className="profile-details-card">
              <div className="profile-details">
                <p><strong>Имя:</strong> {userProfile.firstName}</p>
                <p><strong>Фамилия:</strong> {userProfile.lastName}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Пол:</strong> {userProfile.gender}</p>
                <p><strong>Дата рождения:</strong> {userProfile.dateOfBirth}</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;

