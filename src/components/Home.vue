<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" style="cursor: pointer;" v-if="token">
                <a
                  class="nav-link"
                  @click="showYourFeed"
                  :class="checkFeed == 1 ? 'active' : ''"
                  >Your Feed</a
                >
              </li>
              <li class="nav-item" style="cursor: pointer;">
                <a
                  class="nav-link "
                  @click="showGlobalFeed"
                  :class="checkFeed == 2 ? 'active' : ''"
                  >Global Feed</a
                >
              </li>
              <li
                class="nav-item"
                style="cursor: pointer;"
                v-if="checkFeed == 3"
              >
                <a class="nav-link" :class="checkFeed == 3 ? 'active' : ''"
                  ># {{ tag }}</a
                >
              </li>
            </ul>
          </div>
          <!-- your feed -->
          <div v-if="checkFeed == 1">
            <app-articles-lists :checkFeed="checkFeed"></app-articles-lists>
          </div>
          <!-- global feed -->
          <div v-if="checkFeed == 2">
            <app-articles-lists :checkFeed="checkFeed"></app-articles-lists>
          </div>
          <!-- tag feed -->
          <div v-if="checkFeed == 3">
            <app-articles-lists
              :checkFeed="checkFeed"
              :tag="tag"
            ></app-articles-lists>
          </div>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <a
                class="tag-pill tag-default"
                style="cursor: pointer;"
                v-for="(tag, key) in tagList"
                :key="key"
                @click="showTagFeed(tag)"
                >{{ tag }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appArticlesLists from "./ArticlesLists.vue";
import { httpArticle } from "../services/article-api.js";

export default {
  components: {
    appArticlesLists
  },
  data() {
    return {
      token: null,
      checkFeed: 2,
      tagList: [],
      tag: null,
      tagArticles: []
    };
  },
  created() {
    this.token = localStorage.getItem("api_token");
    this.getTags();
  },
  methods: {
    getTags() {
      httpArticle
        .getTags()
        .then(res => {
          this.tagList = res.data.tags;
        })
        .catch(e => console.log(e));
    },

    showYourFeed() {
      this.checkFeed = 1;
    },

    showGlobalFeed() {
      this.checkFeed = 2;
    },
    showTagFeed(tag) {
      this.checkFeed = 3;
      this.tag = tag;
    }
  }
};
</script>

<style scoped></style>
