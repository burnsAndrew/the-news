import React, { Component } from "react";
import { Link } from "@reach/router";
import { getArticles, deleteArticle } from "../../api";
import "../../App.css";
import PostArticle from "./PostArticle";
import Loader from "../Loader";
import { navigate } from "@reach/router/lib/history";
import Button from "@material-ui/core/Button";
// import Sorting from "../Sorting";

class ArticlesList extends Component {
  state = {
    articles: [],
    sort_by: null,
    order_by: "desc",
    page: 1,
    isLoading: true
  };

  articleAdder = newArticle => {
    this.setState(prevState => {
      return {
        articles: [newArticle, ...prevState.articles],
        isLoading: false
      };
    });
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
        {/* <Sorting /> */}
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

        <ul className="articlesList" key="articles">
          {articles &&
            articles.map(article => {
              return (
                <div className="articleCard" key={article.article_id}>
                  <Link to={`/articles/${article.article_id}`}>
                    <li className="articleCardHeader">
                      <h2>{article.title}</h2>
                    </li>
                  </Link>
                  <h3>Written By: {article.author}</h3>
                  <h4>Topic: {article.topic}</h4>
                  <h5>Votes: {article.votes}</h5>
                  <h5>Comments: {article.comment_count}</h5>
                  {loggedInUser === article.author && (
                    <Button
                      size="small"
                      variant="contained"
                      id="article.article_id"
                      className="deleteButton"
                      onClick={() => {
                        this.handleDelete(article.article_id);
                      }}
                    >
                      Delete your article
                    </Button>
                  )}
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
      this.setState({ articles: articles, isLoading: false });
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
        this.setState({ articles: articles, isLoading: false });
      });
  }
}

export default ArticlesList;
