const AUTH_SERVICE = "http://localhost:8080/authentication-server";



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
  

  export function getCurrentUser() {
    if (!localStorage.getItem("accessToken")) {
      return Promise.reject("No access token set.");
    }
  
    return request({
      url: AUTH_SERVICE + "/get-self-id",
      method: "GET",
    });
  }