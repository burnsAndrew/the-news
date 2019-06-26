import React, { Component } from "react";
import { Link } from "@reach/router";
import { getArticles } from "../../api";
import "../../App.css";
import AddArticleForm from "./AddArticle";

class ArticlesList extends Component {
  state = {
    listOfArticles: [],
    sortBy: null
  };

  setSortBy = event => {
    this.setState({ sortBy: event.currentTarget.value });
  };

  render() {
    const { listOfArticles } = this.state;
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
        </div>
        <div className="addArticleHeader">
          <AddArticleForm loggedInUser={this.props.loggedInUser} />
        </div>
        <ul className="articlesList" key="articles">
          {listOfArticles &&
            listOfArticles.map(article => {
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
    const query = { topic: topic };
    getArticles(query).then(articles => {
      this.setState({ listOfArticles: articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sortBy } = this.state;
    const query = { sort_by: sortBy, topic: topic };
    (sortBy !== prevState.sortBy || topic !== prevProps.topic) &&
      getArticles(query).then(articles => {
        this.setState({ listOfArticles: articles });
      });
  }
}

export default ArticlesList;
