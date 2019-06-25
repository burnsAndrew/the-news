import React, { Component } from "react";
import { Link } from "@reach/router";
import { getArticles, sortArticles } from "../../api";
import "../../App.css";
import AddArticleForm from "./NewArticle";

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
    const { listOfArticles } = this.state;
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
        <div>
          <AddArticleForm loggedInUser={this.props.loggedInUser} />
        </div>
        <ul className="articlesList" key="articles">
          {listOfArticles &&
            listOfArticles.map(article => {
              return (
                <div>
                  <Link
                    key={article.article_id}
                    to={`/articles/${article.article_id}`}
                  >
                    <li className="articleCard">
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
    const query = { topic: this.props.topic };
    getArticles(query).then(articles => {
      this.setState({ listOfArticles: articles });
    });
  }
}

export default ArticlesList;
