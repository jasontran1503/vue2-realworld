<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/login">Have an account?</router-link>
          </p>
          <!-- <ul class="error-messages" *ngIf="errors">
            <li *ngFor="let key of objectKeys(errors)">
              {{ key + " " + errors[key] }}
            </li>
          </ul> -->
          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="username"
              />
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
              @click="register"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { httpUser } from "../services/user-api.js";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      httpUser
        .register(this.username, this.email, this.password)
        .then(data => {
          console.log(data);
          this.$router.push('./login')
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style scoped></style>
