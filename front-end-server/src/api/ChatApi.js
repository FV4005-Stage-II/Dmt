const AUTH_SERVICE = "http://localhost:8080";
const CHAT_SERVICE = "http://localhost:8080";



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
    console.log("здесь восемь вызовов вовововоововововово????")
    return fetch(options.url, options).then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
  };
  

  export function getCurrentUser() {
    if (!localStorage.getItem("accessToken")) {
      return Promise.reject("No access token set.");
    }
  
    return request({
      url: AUTH_SERVICE + "/get-self-id",
      method: "GET",
    });
  }

  export function getUsers() {
    if (!localStorage.getItem("accessToken")) {
      return Promise.reject("No access token set.");
    }
    console.log("расскажи как ты сейчас восемь раз вызовишься, реакт я устал от твоих приколов, 3 часа ночи дядь я устал мне что хуки что пропсы попсы додсы отстань а ")
    return request({
      url: AUTH_SERVICE + "/users/summaries",
      method: "GET",
    });
  }
  
  export function countNewMessages(senderId, recipientId) {
    if (!localStorage.getItem("accessToken")) {
      return Promise.reject("No access token set.");
    }
  
    return request({
      url: CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId + "/count",
      method: "GET",
    });
  }
  
  export function findChatMessages(senderId, recipientId) {
    if (!localStorage.getItem("accessToken")) {
      return Promise.reject("No access token set.");
    }
  
    return request({
      url: CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId,
      method: "GET",
    });
  }
  
  export function findChatMessage(id) {
    if (!localStorage.getItem("accessToken")) {
      return Promise.reject("No access token set.");
    }
  
    return request({
      url: CHAT_SERVICE + "/messages/" + id,
      method: "GET",
    });
  }