import React from "react";
import { Link } from "@reach/router";
import Button from "@material-ui/core/Button";

const ArticlesCard = props => {
  const { articles, loggedInUser } = props;
  return (
    <div>
      <ul className="articlesList" key="articles">
        {articles &&
          articles.map(article => {
            return (
              <div className="articleCard" key={article.article_id}>
                <Link
                  to={`/articles/${article.article_id}`}
                  style={{ textDecoration: "none" }}
                >
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
};

export default ArticlesCard;
