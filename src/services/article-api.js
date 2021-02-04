import axios from "axios";

const link = "https://conduit.productionready.io/api/";

export const httpArticle = {
  getTags() {
    return axios.get(`${link}tags`);
  },

  getArticle(slug) {
    if (localStorage.getItem("api_token")) {
      return axios.get(`${link}articles/${slug}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("api_token")
        }
      });
    }
    return axios.get(`${link}articles/${slug}`);
  },

  createArticle(title, description, body, tagList) {
    return axios.post(
      `${link}articles`,
      {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagList
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("api_token")
        }
      }
    );
  },

  updateArticle(title, description, body, tagList, slug) {
    return axios.put(
      `${link}articles/${slug}`,
      {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagList
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("api_token")
        }
      }
    );
  },

  getArticles(type, tag, author, favorited, limit, offset) {
    if (localStorage.getItem("api_token")) {
      return axios.get(
        `${link}articles/${type}?tag=${tag}&author=${author}&favorited=${favorited}&limit=${limit}&offset=${offset}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("api_token")
          }
        }
      );
    }
    return axios.get(
      `${link}articles/${type}?tag=${tag}&author=${author}&favorited=${favorited}&limit=${limit}&offset=${offset}`
    );
  },

  getArticle(slug) {
    if (localStorage.getItem("api_token")) {
      return axios.get(`${link}articles/${slug}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("api_token")
        }
      });
    }
    return axios.get(`${link}articles/${slug}`);
  },

  getComments(slug) {
    return axios.get(`${link}articles/${slug}/comments`, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': 'Token ' + localStorage.getItem('api_token')
      // }
    });
  },

  addComments(slug, body) {
    return axios.post(
      `${link}articles/${slug}/comments`,
      {
        comment: {
          body: body
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("api_token")
        }
      }
    );
  },

  deleteComment(slug, id) {
    return axios.delete(`${link}articles/${slug}/comments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    });
  },

  deleteArticle(slug) {
    return axios.delete(`${link}articles/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("api_token")
      }
    });
  },

  favoriteArticle(slug) {
    if (localStorage.getItem('api_token')) {
      return axios.post(`${link}articles/${slug}/favorite`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      });
    }
    return axios.post(`${link}articles/${slug}/favorite`, {});
  },

  unfavoriteArticle(slug) {
    if (localStorage.getItem('api_token')) {
      return axios.delete(`${link}articles/${slug}/favorite`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      });
    }
    return axios.delete(`${link}articles/${slug}/favorite`);
  }
};
