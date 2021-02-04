let isAuth = false;

if (localStorage.getItem("api_token")) {
  this.isAuth = true;
}

export const Auth = {
  logIn() {
    isAuth = true;
    return isAuth;
  },

  logOut() {
    isAuth = false;
    return isAuth;
  }
};
