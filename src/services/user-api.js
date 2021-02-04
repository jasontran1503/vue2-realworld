import axios from "axios";

const link = "https://conduit.productionready.io/api/";

export const httpUser = {
  logIn(email, password) {
    return axios.post(`${link}users/login`, {
      user: {
        email: email,
        password: password
      }
    });
  },

  register(username, email, password) {
    return axios.post(`${link}users`, {
      user: {
        username: username,
        email: email,
        password: password
      }
    });
  },

  getCurrentUser() {
    return axios.get(`${link}user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("api_token")
      }
    });
  },

  updateUser(imgURL, userName, bio, email, password) {
    return axios.put(
      `${link}user`,
      {
        user: {
          email: email,
          bio: bio,
          image: imgURL,
          username: userName,
          password: password
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("api_token")
        }
      }
    );
  },

  getProfile(userName) {
    if (localStorage.getItem('api_token')) {
      return axios.get(`${link}profiles/${userName}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      }
      );
    }
    return axios.get(`${link}profiles/${userName}`);
  },



};
