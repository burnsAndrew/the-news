import React, { Component } from "react";
import { navigate } from "@reach/router";
import { postNewArticle } from "../../api";

class PostArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: ""
  };

  render() {
    const { title, body, topic } = this.state;
    const { loggedInUser } = this.props;
    return (
      <div className="newArticle">
        {loggedInUser ? (
          <form className="newArticleForm" onSubmit={this.handleSubmit}>
            <h3>Write an article</h3>
            <label>Topic: </label>
            <select onChange={this.handleChange} name="topic" id="topicSelect">
              <option value="" />
              <option value="Coding">Coding</option>
              <option value="Cooking">Cooking</option>
              <option value="Football">Football</option>
            </select>{" "}
            <label>Title: </label>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="What is your article called?"
              onChange={this.handleChange}
            />{" "}
            <br />
            <label>Your story: </label>
            <input
              type="text"
              name="body"
              value={body}
              onChange={this.handleChange}
              placeholder="Your article here..."
              size="100"
            />{" "}
            <button
              className="submitButton"
              disabled={!body || !title || !topic}
            >
              Submit
            </button>
          </form>
        ) : (
          <h5>
            (If you would like to add a story, please log in / create an
            account)
          </h5>
        )}
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, topic } = this.state;
    const { loggedInUser } = this.props;
    postNewArticle(loggedInUser, title, body, topic)
      .then(article => {
        this.setState({
          title: "",
          body: "",
          topic: ""
        });
        navigate(`/articles/${article.article_id}`);
      })
  };
}

export default PostArticle;
