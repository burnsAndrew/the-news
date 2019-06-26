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

  setSortBy = sortBy => {
    this.setState({ sortBy });
  };

  render() {
    const { listOfArticles } = this.state;

    return (
      <div>
        <div className="sort">
          <h3>Sort By:</h3>
          <button
            className="sortbyDateButton"
            onClick={() => this.setSortBy("created_at")}
          >
            Date
          </button>
          <button
            className="sortbyCommentCountButton"
            onClick={() => this.setSortBy("comment_count")}
          >
            Number Of Comments
          </button>
          <button
            className="sortbyVoteCountButton"
            onClick={() => this.setSortBy("votes")}
          >
            Votes
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
    const query = { sort_by: this.props.sort_by };
    getArticles(query).then(articles => {
      this.setState({ listOfArticles: articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const sort_byChange = prevProps.sort_by !== this.props.sort_by;
    if (sort_byChange) {
      this.getArticles().then(articles => {
        this.setState({ listOfArticles: articles });
      });
    }
  }
}

export default ArticlesList;
