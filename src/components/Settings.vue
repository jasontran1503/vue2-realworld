<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <!-- <ul class="error-messages" *ngIf="errors">
            <li *ngFor="let key of objectKeys(errors)">
              {{ key + " " + errors[key] }}
            </li>
          </ul> -->
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="imgURL"
                />
                <!-- <img alt="" /> -->
                <!-- <img [src]="currentUser?.image" alt=""> -->
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="userName"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
              </fieldset>
              <button
                type="button"
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateUser"
              >
                Update Settings
              </button>
            </fieldset>
            <hr />
            <button class="btn btn-outline-danger" @click="logOut">
              Or click here to logout.
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { httpArticle } from "../services/article-api";
import { httpUser } from "../services/user-api";

export default {
  data() {
    return {
      imgURL: null,
      userName: null,
      bio: null,
      email: null,
      password: null,
      token: null,
      currentUser: null
    };
  },
  created() {
    this.token = localStorage.getItem("api_token");
    httpUser
      .getCurrentUser()
      .then(res => {
        // console.log(res);
        this.currentUser = res.data.user;
        this.imgURL = this.currentUser.image;
        this.userName = this.currentUser.username;
        this.bio = this.currentUser.bio;
        this.email = this.currentUser.email;
      })
      .catch(e => console.log(e));
  },
  methods: {
    updateUser() {
      let imgURL = this.imgURL;
      let userName = this.userName;
      let bio = this.bio;
      let email = this.email;
      let password = this.password;
      console.log(imgURL, userName, bio, email, password);
      httpUser
        .updateUser(imgURL, userName, bio, email, password)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    logOut() {
      localStorage.removeItem("api_token");
      confirm("Are you sure you want to log out???");
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped></style>
