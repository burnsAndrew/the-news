import axios from "axios";

const baseUrl = "https://ab-nc-news.herokuapp.com/api/";

export const getArticles = query => {
  return axios
    .get(`${baseUrl}articles`, { params: query })
    .then(({ data: { articles } }) => {
      return articles;
    });
};
