import React, { Component } from "react";
import { Link } from "@reach/router";
import { getArticles, sortArticles } from "../../api";
// import Sorting from "./Sorting";
import "../../App.css";

class ArticlesList extends Component {
  state = {
    listOfArticles: []
  };

  handleSort(query) {
    sortArticles(query).then(articles => {
      this.setState({ listOfArticles: articles });
    });
  }

  render() {
    return (
      <div>
        <div className="sort">
          <h3>Sort By:</h3>
          <button
            className="sortbyDateButton"
            onClick={() => this.handleSort("?sort_by=created_at")}
          >
            Date
          </button>
          <button
            className="sortbyCommentCountButton"
            onClick={() => this.handleSort("?sort_by=comment_count")}
          >
            Number Of Comments
          </button>
          <button
            className="sortbyVoteCountButton"
            onClick={() => this.handleSort("?sort_by=votes")}
          >
            Votes
          </button>
        </div>
        <ul className="articlesList" key="articles">
          {this.state.listOfArticles &&
            this.state.listOfArticles.map(article => {
              return (
                <div>
                  <Link
                    key={article.article_id}
                    to={`/articles/${article.article_id}`}
                  >
                    <li className="articleCard">
                      <h1>{article.title}</h1>
                    </li>
                  </Link>
                  <h2>Written By: {article.author}</h2>
                  <h3>Topic: {article.topic}</h3>
                  <h4>Votes: {article.votes}</h4>
                  <h4>Comments: {article.comment_count}</h4>
                </div>
              );
            })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const query = { topic: this.props.topic };
    getArticles(query).then(articles => {
      this.setState({ listOfArticles: articles });
    });
  }
}

export default ArticlesList;
