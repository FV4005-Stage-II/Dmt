const CHAT_SERVICE = "http://localhost:8092";
const AUTH_SERVICE = "http://localhost:8080/authentication-server";
const FRIENDS_SERVICE = "http://localhost:8080/friends-service";


const request = (options) => {
  const headers = new Headers();
  if (options.setContentType !== false) {
    headers.append("Content-Type", "application/json");
  }
  if (localStorage.getItem("accessToken")) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getFriends(userId) {
  return request({
    url: `${AUTH_SERVICE}/friends?userId=${userId}`,
    method: "GET",
  });
}

export function getChatMessages(senderId, recipientId) {
  return request({
    url: `${CHAT_SERVICE}/messages/${senderId}/${recipientId}`,
    method: "GET",
  });
}

export function sendMessage(chatMessage) {
  return request({
    url: `${CHAT_SERVICE}/messages`,
    method: "POST",
    body: JSON.stringify(chatMessage),
  });
}


export const getFriendsWithProfiles = (userId) => {
  return request({
      url: `${FRIENDS_SERVICE}/friends-with-profiles?userId=${userId}`,
      method: "GET",
  });
};

export function findChatMessage(id) {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + id,
    method: "GET",
  });
}
