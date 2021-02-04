<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfile.image" class="user-img" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>

            <router-link
              tag="button"
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
              v-if="userProfile.username === currentUserName"
            >
              <i class="ion-gear-a"></i>
              &nbsp;Edit Profile Settings
            </router-link>

            <!-- <app-follow-button
              [userClicked]="userNameClicked"
              [following]="following"
              class="pull-xs-right"
              (toggleFollow)="onFollow($event)"
              *ngIf="userProfile?.username !== currentUserName"
            >
            </app-follow-button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" style="cursor: pointer;">
                <a
                  class="nav-link "
                  @click="showMyArticles"
                  :class="checkArticles == 1 ? 'active' : ''"
                  >My Articles</a
                >
              </li>
              <li class="nav-item" style="cursor: pointer;">
                <a
                  class="nav-link"
                  @click="showFavoritedArticles"
                  :class="checkArticles == 2 ? 'active' : ''"
                  >Favorited Articles</a
                >
              </li>
            </ul>
          </div>
          <!-- my articles -->
          <div v-if="checkArticles == 1">
            <app-articles-lists
              :checkArticles="checkArticles"
              :userNameClicked="userNameClicked"
            ></app-articles-lists>
          </div>

          <!-- favorited articles -->
          <div v-if="checkArticles == 2">
            <app-articles-lists
              :checkArticles="checkArticles"
              :userNameClicked="userNameClicked"
            ></app-articles-lists>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appArticlesLists from "./ArticlesLists.vue";
import { httpUser } from "../services/user-api";

export default {
  components: {
    appArticlesLists
  },
  data() {
    return {
      currentUserName: "",
      userProfile: {},
      userNameClicked: "",
      following: false,
      checkArticles: 2
    };
  },
  created() {
    this.userNameClicked = this.$route.params.name;
    this.getProfile();
  },
  methods: {
    showMyArticles() {
      this.checkArticles = 1;
    },

    showFavoritedArticles() {
      this.checkArticles = 2;
    },

    getProfile() {
      httpUser
        .getProfile(this.userNameClicked)
        .then(res => {
          this.userProfile = res.data.profile;
          this.following = res.data.profile.following;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped></style>
