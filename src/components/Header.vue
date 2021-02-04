<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link to="/home" class="navbar-brand">conduit</router-link>

      <ul class="nav navbar-nav pull-xs-right" v-if="!token">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Sign in</router-link>
        </li>
      </ul>

      <ul class="nav navbar-nav pull-xs-right" v-if="token">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/editor" class="nav-link">
            <i class="ion-compose"></i>&nbsp;New Post
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/settings" class="nav-link">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <img class="user-pic" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { Auth } from '../services/auth.js'
 
export default {
  name: "app-header",
  data() {
    return {
      token: localStorage.getItem("api_token")
    };
  },
  watch: {
    token(val) {
      console.log(val)
    }
  },
  created() {
    // this.token = localStorage.getItem("api_token");
    // console.log(this.token)
  }
};
</script>

<style scoped></style>
