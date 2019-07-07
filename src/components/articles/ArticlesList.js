import React, { Component } from "react";
// import { Link } from "@reach/router";
import { getArticles, deleteArticle } from "../../api";
import "../../App.css";
import PostArticle from "./PostArticle";
import Loader from "../Loader";
import { navigate } from "@reach/router/lib/history";
import Button from "@material-ui/core/Button";
import ArticlesCard from "./ArticlesCard";

class ArticlesList extends Component {
  state = {
    articles: [],
    sort_by: null,
    order_by: "desc",
    page: 1,
    isLoading: true
  };

  handleDelete = article_id => {
    const { articles } = this.state;
    deleteArticle(article_id)
      .then(() => {
        const filteredArticles = articles.filter(article => {
          return article.article_id !== article_id;
        });
        this.setState({ articles: filteredArticles });
      })
      .catch(err =>
        navigate("/error", {
          state: {
            displayerror: "That article doesn't exist"
          }
        })
      );
  };

  setSortBy = event => {
    this.setState({ sort_by: event.currentTarget.value, isLoading: false });
  };

  setOrderBy = event => {
    this.setState({ order_by: event.currentTarget.value, isLoading: false });
  };

  render() {
    const { articles, isLoading } = this.state;
    const { loggedInUser } = this.props;
    if (isLoading) return <Loader />;
    return (
      <div>
        <div className="addArticleHeader">
          <PostArticle loggedInUser={loggedInUser} />
        </div>
        <div className="sort">
          <h3>Sort articles:</h3>
          <Button
            size="small"
            variant="contained"
            className="sortbyDateButton"
            onClick={this.setSortBy}
            value={"created_at"}
          >
            Date
          </Button>
          <Button
            size="small"
            variant="contained"
            className="sortbyCommentCountButton"
            onClick={this.setSortBy}
            value={"comment_count"}
          >
            Number Of Comments
          </Button>
          <Button
            size="small"
            variant="contained"
            className="sortbyVoteCountButton"
            onClick={this.setSortBy}
            value={"votes"}
          >
            Votes
          </Button>
          <Button
            size="small"
            variant="contained"
            className="sortbyAuthorButton"
            onClick={this.setSortBy}
            value={"author"}
          >
            Author
          </Button>
          <Button
            size="small"
            variant="contained"
            className="orderbyAscendingButton"
            onClick={this.setOrderBy}
            value={"asc"}
          >
            Asc
          </Button>
          <Button
            size="small"
            variant="contained"
            className="orderbyDescendingButton"
            onClick={this.setOrderBy}
            value={"desc"}
          >
            Desc
          </Button>
        </div>
        <ArticlesCard loggedInUser={loggedInUser} articles={articles} />
      </div>
    );
  }

  componentDidMount() {
    const { topic } = this.props;
    const query = { topic };
    getArticles(query)
      .then(articles => {
        this.setState({ articles: articles, isLoading: false });
      })
      .catch(err =>
        navigate("/error", {
          state: {
            displayerror: "That article doesn't exist"
          }
        })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sort_by, order_by, page } = this.state;
    const query = { sort_by, topic, order_by, page };

    (sort_by !== prevState.sort_by ||
      topic !== prevProps.topic ||
      order_by !== prevState.order_by ||
      page !== prevState.page) &&
      getArticles(query)
        .then(articles => {
          this.setState({ articles: articles, isLoading: false });
        })
        .catch(err =>
          navigate("/error", {
            state: {
              displayerror: "That article doesn't exist"
            }
          })
        );
  }
}

export default ArticlesList;
