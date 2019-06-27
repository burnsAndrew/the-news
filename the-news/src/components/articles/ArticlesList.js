import React, { Component } from "react";
import { Link } from "@reach/router";
import { getArticles } from "../../api";
import "../../App.css";
import PostArticle from "./PostArticle";

class ArticlesList extends Component {
  state = {
    articles: [],
    sort_by: null,
    order_by: "desc",
    page: 1
  };

  setSortBy = event => {
    this.setState({ sort_by: event.currentTarget.value });
  };

  setOrderBy = event => {
    this.setState({ order_by: event.currentTarget.value });
  };

  articleAdder = newArticle => {
    this.setState(prevState => {
      return { articles: [newArticle, ...prevState.articles] };
    });
  };

  render() {
    const { articles } = this.state;
    const { loggedInUser } = this.props;
    return (
      <div>
        <div className="sort">
          <h3>Sort By:</h3>
          <button
            className="sortbyDateButton"
            onClick={this.setSortBy}
            value={"created_at"}
          >
            Date
          </button>
          <button
            className="sortbyCommentCountButton"
            onClick={this.setSortBy}
            value={"comment_count"}
          >
            Number Of Comments
          </button>
          <button
            className="sortbyVoteCountButton"
            onClick={this.setSortBy}
            value={"votes"}
          >
            Votes
          </button>
          <button
            className="sortbyAuthorButton"
            onClick={this.setSortBy}
            value={"author"}
          >
            Author
          </button>
          <button
            className="orderbyAscendingButton"
            onClick={this.setOrderBy}
            value={"asc"}
          >
            Asc
          </button>
          <button
            className="orderbyDescendingButton"
            onClick={this.setOrderBy}
            value={"desc"}
          >
            Desc
          </button>
        </div>
        <div className="addArticleHeader">
          <PostArticle loggedInUser={loggedInUser} />
        </div>
        <ul className="articlesList" key="articles">
          {articles &&
            articles.map(article => {
              return (
                <div className="articleCard">
                  <Link
                    key={article.article_id}
                    to={`/articles/${article.article_id}`}
                  >
                    <li className="articleCardHeader">
                      <h2>{article.title}</h2>
                    </li>
                  </Link>
                  <h3>Written By: {article.author}</h3>
                  <h4>Topic: {article.topic}</h4>
                  <h5>Votes: {article.votes}</h5>
                  <h5>Comments: {article.comment_count}</h5>
                </div>
              );
            })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const { topic } = this.props;
    const query = { topic };
    getArticles(query).then(articles => {
      this.setState({ articles: articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sort_by, order_by, page } = this.state;
    const query = { sort_by, topic, order_by, page };

    (sort_by !== prevState.sort_by ||
      topic !== prevProps.topic ||
      order_by !== prevState.order_by ||
      page !== prevState.page) &&
      getArticles(query).then(articles => {
        this.setState({ articles: articles });
      });
  }
}

export default ArticlesList;

//what i need to do later:
// create buttons for pagination and a function:
// <button onClick={() => {this.changePage(-1)}}></button>
//   <button onClick={() => { this.changePage(1) }}></button>

//   changePage = (direction) => {
// this.setState((prevState) => ({page: prevState.page + direction}))
//   }
