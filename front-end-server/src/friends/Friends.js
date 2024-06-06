
import Header from "../componets/header/Header.js";
import Sidebar from "../componets/sidebar/Sidebar.js"
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

import './Friends.css';
import { loggedInUser } from "../atom/GlobalState.js";
import { getFriendsWithProfiles, getFriendRequests, getAllProfiles, searchProfilesByUsername, sendFriendRequest, acceptFriendRequest, declineFriendRequest } from '../api/FriendsApi.js';

const Friends = () => {
  const currentUser = useRecoilValue(loggedInUser);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);

  useEffect(() => {
    if (currentUser?.id) {
      loadFriendsWithProfiles(currentUser.id);
      loadFriendRequests(currentUser.id);
    }
  }, [currentUser]);

  const loadFriendsWithProfiles = async (userId) => {
    try {
      const response = await getFriendsWithProfiles(userId);
      setFriends(response);
      loadAllProfiles(response); // Передаем список друзей для фильтрации
    } catch (error) {
      console.error('Ошибка при загрузке друзей:', error);
    }
  };

  const loadFriendRequests = async (userId) => {
    try {
      const response = await getFriendRequests(userId);
      setFriendRequests(response);
    } catch (error) {
      console.error('Ошибка при загрузке заявок в друзья:', error);
    }
  };

  const loadAllProfiles = async (friendsList = []) => {
    try {
      const response = await getAllProfiles();
      const friendIds = friendsList.map(friend => friend.id);
      const filteredResults = response.filter(user => user.id !== currentUser.id && !friendIds.includes(user.id));
      setAllProfiles(filteredResults);
      setSearchResults(filteredResults); // Показать всех пользователей по умолчанию
    } catch (error) {
      console.error('Ошибка при загрузке профилей:', error);
    }
  };

  const handleSearch = async (query) => {
    if (query === "") {
      setSearchResults(allProfiles); // Показать всех пользователей, если строка поиска пуста
      return;
    }

    try {
      const response = await searchProfilesByUsername(query);
      const friendIds = friends.map(friend => friend.friendId);
      const filteredResults = response.filter(user => user.id !== currentUser.id && !friendIds.includes(user.id));
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Ошибка при поиске друзей:', error);
    }
  };


  const handleSendFriendRequest = async (receiverId) => {
    try {
      await sendFriendRequest(currentUser.id, receiverId, currentUser.username);
      setSearchResults(prevResults => prevResults.filter(result => result.id !== receiverId)); // Удалить пользователя из результатов поиска
      loadFriendRequests(currentUser.id); // Обновить список заявок
    } catch (error) {
      console.error('Ошибка при отправке заявки в друзья:', error);
    }
  };

  const handleAcceptFriendRequest = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      setFriendRequests(prevRequests => prevRequests.filter(request => request.id !== requestId)); // Удалить заявку из списка
      loadFriendsWithProfiles(currentUser.id); // Обновить список друзей
    } catch (error) {
      console.error('Ошибка при принятии заявки в друзья:', error);
    }
  };

  const handleDeclineFriendRequest = async (requestId) => {
    try {
      await declineFriendRequest(requestId);
      setFriendRequests(prevRequests => prevRequests.filter(request => request.id !== requestId)); // Удалить заявку из списка
    } catch (error) {
      console.error('Ошибка при отклонении заявки в друзья:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="friends-container">
          <h1>Друзья</h1>
          <div className="friends-columns">
            <div className="friends-column friends-column-my-friends">
              <h2>Мои друзья</h2>
              <ul>
                {friends.map(friend => (
                  <li key={friend.id}>
                    <Link to={`/profile/${friend.id}`} className="username">{friend.username}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="friends-column friends-column-friend-requests">
              <h2>Заявки в друзья</h2>
              <ul>
                {friendRequests.map(request => (
                  <li key={request.id}>
                    <Link to={`/profile/${request.senderId}`} className="username">{request.senderName}</Link>
                    <div className="friend-request-buttons">
                      <button className="accept-button" onClick={() => handleAcceptFriendRequest(request.id)}>Принять</button>
                      <button className="decline-button" onClick={() => handleDeclineFriendRequest(request.id)}>Отклонить</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="friends-column friends-column-search-friends dynamic-height">
              <h2>Поиск друзей</h2>
              <input type="text" placeholder="Введите имя" onChange={(e) => handleSearch(e.target.value)} />
              <ul>
                {searchResults.map(result => (
                  <li key={result.id} className="search-result-item">
                    <Link to={`/profile/${result.id}`} className="username">{result.username}</Link>
                    <button className="add-friend-button" onClick={() => handleSendFriendRequest(result.id)}>Добавить в друзья</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friends;
