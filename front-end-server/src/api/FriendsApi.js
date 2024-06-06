const MAIN_PAGE_SERVICE = "http://localhost:8080/main-page";
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

export const getAllProfiles = () => {
    return request({
        url: `${MAIN_PAGE_SERVICE}/profiles`,
        method: "GET",
    });
};

export const searchProfilesByUsername = (username) => {
    return request({
        url: `${MAIN_PAGE_SERVICE}/profiles/search?username=${username}`,
        method: "GET",
    });
};

export const getFriends = (userId) => {
    return request({
        url: `${FRIENDS_SERVICE}?userId=${userId}`,
        method: "GET",
    });
};

export const getFriendRequests = (userId) => {
    return request({
        url: `${FRIENDS_SERVICE}/requests?receiverId=${userId}`,
        method: "GET",
    });
};

export const sendFriendRequest = (senderId, receiverId) => {
    return request({
        url: `${FRIENDS_SERVICE}/request?senderId=${senderId}&receiverId=${receiverId}`,
        method: "POST",
    });
};

export const acceptFriendRequest = (requestId) => {
    return request({
        url: `${FRIENDS_SERVICE}/request/${requestId}/accept`,
        method: "POST",
    });
};

export const declineFriendRequest = (requestId) => {
    return request({
        url: `${FRIENDS_SERVICE}/request/${requestId}/decline`,
        method: "POST",
    });
};

export const getProfileById = (id) => {
    return request({
      url: `${MAIN_PAGE_SERVICE}/profiles/${id}`,
      method: "GET",
    });
  };
  

export const getFriendsWithProfiles = (userId) => {
    return request({
        url: `${FRIENDS_SERVICE}/friends-with-profiles?userId=${userId}`,
        method: "GET",
    });
};