<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <!-- <ul class="error-messages" *ngIf="errors">
            <li *ngFor="let errorTitle of errorsTitle">
              title {{ " " + errorTitle }}
            </li>
            <li *ngFor="let errorBody of errorsBody">
              body {{ " " + errorBody }}
            </li>
            <li *ngFor="let errorDes of errorsDes">
              description {{ " " + errorDes }}
            </li>
          </ul> -->
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="articleTitle"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="articleAbout"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="articleContent"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  formControlName="tags"
                  @keyup.enter="enterTag"
                  v-model="tags"
                />
                <div class="tag-list" v-if="slug">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, key) in articleBySlugTags"
                    :key="key"
                  >
                    <i class="ion-close-round" @click="deleteTag(key)"></i>
                    {{ tag }}</span
                  >
                </div>
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, key) in tagList"
                    :key="key"
                  >
                    <i class="ion-close-round" @click="deleteTag(key)"></i>
                    {{ tag }}</span
                  >
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onEdit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { httpArticle } from "../services/article-api";
export default {
  data() {
    return {
      articleTitle: null,
      articleAbout: null,
      articleContent: null,
      tags: null,
      slug: null,
      articleBySlug: null,
      tagList: [],
      articleBySlugTags: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.slug = to.params.slug;
    next();
    console.log(this.slug);
  },
  created() {
    this.slug = this.$route.params.slug;
    if (this.slug == undefined) {
      this.slug = "";
    }
  },
  methods: {
    onEdit() {
      if (this.slug) {
        this.updateArticle();
      } else {
        this.createArticle();
      }
    },
    createArticle() {
      let articleTitle = this.articleTitle;
      let articleAbout = this.articleAbout;
      let articleContent = this.articleContent;
      let tags = this.tagList;
      httpArticle
        .createArticle(articleTitle, articleAbout, articleContent, tags)
        .then(res => {
          console.log(res);
          this.$router.push("/home");
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateArticle() {
      let articleTitle = this.articleTitle;
      let articleAbout = this.articleAbout;
      let articleContent = this.articleContent;
      let articleTags = this.articleBySlugTags;
      httpArticle
        .updateArticle(
          articleTitle,
          articleAbout,
          articleContent,
          articleTags,
          this.slug
        )
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
      this.$router.push(`/article/${this.slug}`);
    },
    enterTag(event) {
      let tag = event.target.value;
      if (!this.slug) {
        this.tagList.push(tag);
      }
      if (this.slug) {
        this.articleBySlugTags.push(tag);
      }
      event.target.value = "";
    },
    deleteTag(index) {
      if (!this.slug) {
        this.tagList.splice(index, 1);
      } else {
        this.articleBySlugTags.splice(index, 1);
      }
    },
    getArticle() {
      httpArticle
        .getArticle(this.slug)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped></style>
