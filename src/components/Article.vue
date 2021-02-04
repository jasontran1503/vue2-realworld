<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <!-- <pre style="color: white;">{{ articleContent }}</pre>
        <pre style="color: white;">{{ comments }}</pre> -->
        <h1>{{ articleContent.title }}</h1>
        <div class="article-meta">
          <router-link :to="`/profile/${userClicked}`"
            ><img :src="articleContent.author.image"
          /></router-link>
          <div class="info">
            <router-link :to="`/profile/${userClicked}`" class="author">{{
              articleContent.author.username
            }}</router-link>
            <span class="date">{{ articleContent.updatedAt }}</span>
          </div>
          <!-- <app-follow-button
            [userClicked]="userClicked"
            [following]="following"
            (toggleFollow)="onFollow($event)"
            *ngIf="(articleContent?.author?.username !== currentUserName)"
          ></app-follow-button>
          &nbsp;&nbsp;
          <app-favorite-button
            [slug]="slug"
            [favorited]="favorited"
            [favoritesCount]="favoritesCount"
            (toggleFavorite)="onFavorite($event)"
            *ngIf="(articleContent?.author?.username !== currentUserName)"
          >
            {{ favorited == false ? "Favorite Post" : "Unfavorite Post" }}
          </app-favorite-button> -->

          <router-link
            tag="button"
            class="btn btn-sm btn-outline-secondary"
            v-if="articleContent.author.username === currentUserName"
            :to="`/editor/${articleContent.slug}`"
          >
            <i class="ion-edit"></i>
            &nbsp;Edit Article <span class="counter"></span>
          </router-link>
          &nbsp;&nbsp;

          <button
            class="btn btn-sm btn-outline-danger"
            v-if="articleContent.author.username === currentUserName"
            @click="deleteArticle"
          >
            <i class="ion-trash-a"></i>
            &nbsp; Delete Article <span class="counter"></span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{ articleContent.body }}</p>
        </div>
        <div class="tag-list">
          <span
            class="tag-default tag-pill tag-outline"
            v-for="(tag, key) in tagList"
            :key="key"
            >{{ tag }}</span
          >
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <div class="article-meta">
          <router-link :to="`/profile/${userClicked}`"
            ><img :src="articleContent.author.image"
          /></router-link>
          <div class="info">
            <router-link :to="`/profile/${userClicked}`" class="author">{{
              articleContent.author.username
            }}</router-link>
            <span class="date">{{ articleContent.updatedAt }}</span>
          </div>
          <!-- <app-follow-button
            [userClicked]="userClicked"
            [following]="following"
            (toggleFollow)="onFollow($event)"
            *ngIf="(articleContent?.author?.username !== currentUserName)"
          ></app-follow-button>
          &nbsp;&nbsp;
          <app-favorite-button
            [slug]="slug"
            [favorited]="favorited"
            [favoritesCount]="favoritesCount"
            (toggleFavorite)="onFavorite($event)"
            *ngIf="(articleContent?.author?.username !== currentUserName)"
          >
            {{ favorited == false ? "Favorite Post" : "Unfavorite Post" }}
          </app-favorite-button> -->

          <router-link
            tag="button"
            class="btn btn-sm btn-outline-secondary"
            v-if="articleContent.author.username === currentUserName"
            :to="`/editor/${articleContent.slug}`"
          >
            <i class="ion-edit"></i>
            &nbsp;Edit Article <span class="counter"></span>
          </router-link>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-danger"
            v-if="articleContent.author.username === currentUserName"
            @click="deleteArticle"
          >
            <i class="ion-trash-a"></i>
            &nbsp; Delete Article <span class="counter"></span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form" v-if="token">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="comment"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="currentUserImg" class="comment-author-img" />
              <button class="btn btn-sm btn-primary" @click="addComments">
                Post Comment
              </button>
            </div>
          </form>

          <p v-if="!token">
            <router-link to="/login">Sign in</router-link>
            or
            <router-link to="/register">sign up</router-link>
            to add comments on this article.
          </p>

          <div class="card" v-for="(comment, index) in comments" :key="index">
            <div class="card-block">
              <p class="card-text">{{ comment.body }}</p>
            </div>
            <div class="card-footer">
              <router-link
                :to="`/profile/${userClicked}`"
                class="comment-author"
              >
                <img :src="comment.author.image" class="comment-author-img" />
              </router-link>
              &nbsp;
              <router-link
                :to="`/profile/${userClicked}`"
                class="comment-author"
              >
                {{ comment.author.username }}</router-link
              >
              <span class="date-posted">{{ comment.createdAt }}</span>
              <span
                class="mod-options"
                v-if="token && comment.author.username === currentUserName"
                @click="deleteComment(index)"
              >
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
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
      articleContent: {},
      articleClicked: "",
      userClicked: "",
      currentUserName: "",
      currentUserImg: "",
      comment: "",
      comments: [],
      token: "",
      favorited: false,
      favoritesCount: 0,
      tagList: [],
      following: false,
      slug: ""
    };
  },
  created() {
    this.token = localStorage.getItem("api_token");
    this.getCurrentUser();
    this.articleClicked = this.$route.params.slug;
    this.getArticle();
    this.getComments();
  },
  methods: {
    getArticle() {
      httpArticle
        .getArticle(this.articleClicked)
        .then(res => {
          // console.log(res.data)
          this.articleContent = res.data.article;
          this.tagList = this.articleContent.tagList;
          this.userClicked = this.articleContent.author.username;
          this.slug = this.articleContent.slug;
          this.following = this.articleContent.author.following;
          this.favorited = this.articleContent.favorited;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getComments() {
      httpArticle
        .getComments(this.articleClicked)
        .then(res => {
          this.comments = res.data.comments;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getCurrentUser() {
      httpUser.getCurrentUser().then(res => {
        console.log(res.data);
        this.currentUserName = res.data.user.username;
        this.currentUserImg = res.data.user.image;
      });
    },
    deleteArticle() {
      httpArticle.deleteArticle(this.articleClicked).then(res => {
        this.$router.push("/home");
      });
    },
    addComments() {
      httpArticle
        .addComments(this.articleClicked, this.comment)
        .then(res => {
          this.getComments();
          this.comment = "";
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteComment(index) {
      let idComment = this.comments[index]["id"];
      httpArticle
        .deleteComment(this.articleClicked, idComment)
        .then(res => {
          console.log(res);
          this.getComments();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped></style>
