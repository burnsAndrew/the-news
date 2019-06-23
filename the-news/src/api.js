import axios from "axios";
const baseUrl = "https://ab-nc-news.herokuapp.com/api/";

export const getArticles = query => {
  return axios
    .get(`${baseUrl}articles`, { params: query })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getSingleArticle = article_id => {
  return axios
    .get(`${baseUrl}articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const getTopics = query => {
  return axios
    .get(`${baseUrl}topics`, {
      params: query
    })
    .then(({ data: { topics } }) => {
      return topics;
    });
};

export const getUser = username => {
  return axios.get(`${baseUrl}users/${username}`).then(({ data: { user } }) => {
    return user;
  });
};

export const sortArticles = query => {
  return axios
    .get(`${baseUrl}articles${query}`, { params: query })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getCommentsByArticle = article_id => {
  return axios
    .get(`${baseUrl}articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};
