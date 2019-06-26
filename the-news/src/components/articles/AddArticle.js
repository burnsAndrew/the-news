import React, { Component } from "react";
import { postNewArticle } from "../../api";

class AddArticleForm extends Component {
  state = {
    body: "",
    title: "",
    topics: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.eventDefault();
    this.setState({ body: "", title: "", topics: "" });

    const post = {
      username: this.props.username,
      title: this.state.title,
      topics: this.state.topics,
      body: this.state.body
    };

    postNewArticle(this.props.id, post).then(article => {
      return article;
    });
  };

  render() {
    const { loggedInUser } = this.props;
    const { body, title } = this.state;
    return (
      <div className="newArticle">
        {loggedInUser ? (
          <form
            onSubmit={this.handleSubmit}
            id="ArticleForm"
            className="articleForm"
          >
            <h2>Write an article</h2>
            <label>Topic: </label>
            <select onChange={this.handleChange} name="topic" id="topicSelect">
              <option value="Coding">Coding</option>
              <option value="Cooking">Cooking</option>
              <option value="Football">Football</option>
            </select>{" "}
            <label>Title: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="title"
              id="titleinput"
              placeholder="What is your article called?"
            />{" "}
            <label>Your story: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="body"
              id="bodyinput"
              placeholder="Your article here..."
              size="100"
            />{" "}
            <button className="submitArticle" disabled={!body || !title}>
              Submit article
            </button>
          </form>
        ) : (
          <h6>
            (if you would like to add a story, please log in / create an
            account)
          </h6>
        )}
      </div>
    );
  }
}

export default AddArticleForm;
