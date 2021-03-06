import axios from "axios";
const baseUrl = "https://ab-nc-news.herokuapp.com/api/";

export const getArticles = ({ topic, sort_by, order_by }) => {
  return axios
    .get(`${baseUrl}articles`, {
      params: { topic, sort_by, order: order_by }
    })
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

export const getCommentsByArticle = article_id => {
  return axios
    .get(`${baseUrl}articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const patchSingleArticle = (article_id, directionOfVote) => {
  return axios
    .patch(`${baseUrl}articles/${article_id}`, directionOfVote)
    .then(article => {
      return article;
    });
};

export const patchSingleComment = (comment_id, directionOfVote) => {
  return axios
    .patch(`${baseUrl}comments/${comment_id}`, directionOfVote)
    .then(comment => {
      return comment;
    });
};

export const postNewComment = (article_id, body) => {
  return axios
    .post(`${baseUrl}articles/${article_id}/comments`, body)
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const deleteComment = comment_id => {
  return axios
    .delete(`${baseUrl}comments/${comment_id}`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const postNewArticle = (username, title, body, topic) => {
  const topicName = topic.toLowerCase();
  return axios
    .post(`${baseUrl}articles/`, {
      author: username,
      title,
      body,
      topic: topicName
    })
    .then(({ data: { article } }) => {
      return article;
    });
};

export const deleteArticle = article_id => {
  return axios
    .delete(`${baseUrl}articles/${article_id}`)
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getAllUsers = query => {
  return axios
    .get(`${baseUrl}users`, {
      params: query
    })
    .then(({ data: { users } }) => {
      return users;
    });
};
