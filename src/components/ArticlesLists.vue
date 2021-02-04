<template>
  <div>
    <!-- <h2>{{ userNameClicked }} </h2> -->
    <div
      class="article-preview"
      v-for="(article, key) in listArticles"
      :key="key"
    >
      <div class="article-meta">
        <router-link :to="`/profile/${article.author.username}`">
          <img :src="article.author.image"
        /></router-link>
        <div class="info">
          <router-link
            :to="`/profile/${article.author.username}`"
            class="author"
            >{{ article.author.username }}</router-link
          >
          <span class="date">{{ article.createdAt }}</span>
        </div>
        <!-- <app-favorite-button
          [slug]="article.slug"
          [favoritesCount]="article.favoritesCount"
          [favorited]="article.favorited"
          (toggleFavorite)="onFavorite($event, article)"
          class="pull-xs-right"
        >
        </app-favorite-button> -->
      </div>
      <router-link class="preview-link" :to="`/article/${article.slug}`">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <div class="d-flex justify-content-between">
          <span>Read more...</span>
          <ul class="tag-list float-right">
            <li
              class="tag-default tag-pill tag-outline"
              v-for="(tag, key) in article.tagList"
              :key="key"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </router-link>
    </div>
    <ul class="pagination">
      <li
        class="page-item"
        v-for="index in numPage"
        :key="index"
        style="cursor: pointer;"
        :class="numClicked == index ? 'active' : ''"
      >
        <a class="page-link" @click="clickPage(index)">{{ index + 1 }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { httpArticle } from "../services/article-api";
export default {
  name: "app-articles-lists",
  props: {
    checkFeed: Number,
    checkArticles: Number,
    userNameClicked: String,
    tag: String
  },
  data() {
    return {
      limit: 10,
      listArticles: [],
      numPage: 0,
      numClicked: 0,
      favoritesCount: 0
    };
  },
  watch: {
    checkFeed(val) {
      this.getListArticles();
    },
    checkArticles(val) {
      console.log(val)
      this.getListArticles();
    }
  },
  created() {
    // console.log(this.checkArticles)
    this.getListArticles();
  },
  methods: {
    getListArticles(offset = 0) {
      if (this.checkFeed == 1) {
        httpArticle
          .getArticles("feed", "", "", "", this.limit, offset)
          .then(res => {
            // console.log("feed", res);
            this.showList(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
      if (this.checkFeed == 2) {
        httpArticle
          .getArticles("", "", "", "", this.limit, offset)
          .then(res => {
            // console.log("global", res);
            this.showList(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
      if (this.checkFeed == 3) {
        httpArticle
          .getArticles("", this.tag, "", "", this.limit, offset)
          .then(res => {
            // console.log(res);
            this.showList(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
      if (this.checkArticles == 1) {
        httpArticle
          .getArticles("", "", this.userNameClicked, "", this.limit, offset)
          .then(res => {
            console.log(res);
            this.showList(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
      if (this.checkArticles == 2) {
        httpArticle
          .getArticles("", "", "", this.userNameClicked, this.limit, offset)
          .then(res => {
            console.log(res);
            this.showList(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    showList(result) {
      this.listArticles = result.data.articles;
      this.numPage = Math.ceil(result.data.articlesCount / this.limit);
      this.numPage = Array(this.numPage)
        .fill(0)
        .map((x, i) => i);
    },
    clickPage(index) {
      this.numClicked = index;
      this.getListArticles(index * this.limit);
    }
  }
};
</script>

<style scoped></style>
