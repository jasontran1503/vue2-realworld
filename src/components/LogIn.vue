<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign in</h1>
            <p class="text-xs-center">
              <router-link to="/register">Need an account?</router-link>
            </p>
            <ul class="error-messages">
              <!-- <li *ngFor="let key of objectKeys(errors)">
                {{ key + " " + errors[key] }}
              </li> -->
            </ul>
            <form>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  @change="setEmail($event.target.value)"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  @change="setPassword($event.target.value)"
                />
              </fieldset>
              <button
                type="button"
                class="btn btn-lg btn-primary pull-xs-right"
                @click="logIn"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <router-view /> -->
</template>

<script>
import { httpUser } from "../services/user-api.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: ""
    };
  },
  methods: {
    setEmail(value) {
      this.email = value;
    },
    setPassword(value) {
      this.password = value;
    },
    logIn() {
      console.log(this.email, this.password);
      httpUser
        .logIn(this.email, this.password)
        .then(data => {
          localStorage.setItem("api_token", data.data.user.token);
          this.$router.push('./home')
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped></style>
