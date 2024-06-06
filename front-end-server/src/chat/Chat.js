import Header from "../componets/header/Header.js";
import Sidebar from "../componets/sidebar/Sidebar.js"
import { getFriendsWithProfiles, getChatMessages, findChatMessage } from '../api/ChatApi';

import React, { useState, useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { loggedInUser } from '../atom/GlobalState';

import './Chat.css';

let stompClient = null;

const Chat = () => {
  const currentUser = useRecoilValue(loggedInUser);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (currentUser?.id) {
      loadFriendsWithProfiles(currentUser.id);
      connectWebSocket();
    }
    // Подписываемся на обновления WebSocket
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [currentUser]);

  const connectWebSocket = () => {
    const socket = new SockJS('http://localhost:8092/ws');
    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    // Подписываемся на очередь пользователя
    stompClient.subscribe(`/user/${currentUser.id}/queue/messages`, onMessageReceived);
  };

  const onError = (err) => {
    console.error('Error connecting to WebSocket:', err);
  };

  // const onMessageReceived = (msg) => {
  //   const message = JSON.parse(msg.body);
  //   console.log('Received message:', message);
  //   if (message.senderId === selectedFriend?.id || message.recipientId === selectedFriend?.id) {
  //     setMessages(prevMessages => [...prevMessages, message]);
  //   }
  // };
  const onMessageReceived = async (msg) => {
    const notification = JSON.parse(msg.body);
    console.log('Received message:', notification);

    // Запрашиваем полное сообщение по его ID
    const message = await findChatMessage(notification.id);

    if (message.senderId === selectedFriend?.id || message.recipientId === selectedFriend?.id) {
      setMessages(prevMessages => [...prevMessages, message]);
    }
  };
  const loadFriendsWithProfiles = async (userId) => {
    try {
      const response = await getFriendsWithProfiles(userId);
      setFriends(response);
    } catch (error) {
      console.error('Ошибка при загрузке друзей:', error);
    }
  };

  const loadMessages = async (friendId) => {
    try {
      const response = await getChatMessages(currentUser.id, friendId);
      setMessages(response);
    } catch (error) {
      console.error('Ошибка при загрузке сообщений:', error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      senderId: currentUser.id,
      recipientId: selectedFriend.id,
      senderName: currentUser.username,
      recipientName: selectedFriend.username,
      content: newMessage,
      timestamp: new Date(),
    };

    stompClient.send('/app/chat', {}, JSON.stringify(message));

    // Добавление сообщения в список сообщений сразу после отправки
    setMessages(prevMessages => [...prevMessages, message]);
    setNewMessage("");
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    loadMessages(friend.id);
  };

  return (
    <div>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="chat-container">
          <div className="friends-list">
            <h3>Друзья</h3>
            <ul>
              {friends.map(friend => (
                <li key={friend.id} onClick={() => handleSelectFriend(friend)}>
                  <Link to={`/profile/${friend.id}`} className="username">{friend.username}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-window">
            {selectedFriend ? (
              <>
                <div className="chat-header">
                  <h3>Чат с {selectedFriend.username}</h3>
                </div>
                <div className="chat-messages">
                  {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.senderId === currentUser.id ? 'sent' : 'received'}`}>
                      <p>{msg.content}</p>
                      <small>{new Date(msg.timestamp).toLocaleString()}</small>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение"
                  />
                  <button onClick={handleSendMessage}>Отправить</button>
                </div>
              </>
            ) : (
              <div className="no-chat-selected">
                <p>Выберите чат или создайте новый</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
