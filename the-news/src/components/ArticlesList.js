import React, { Component } from "react";
import { Link } from "@reach/router";
import { getArticles, sortArticles } from "../api";
import Sorting from "./Sorting";
import "../App.css";

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
        <Sorting handleSort={this.handleSort} />
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
