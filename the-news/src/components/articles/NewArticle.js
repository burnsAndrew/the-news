import React, { Component } from "react";
import { postNewArticle } from "../../api";

//not finished this yet - stopped before lecture at 11.30am on Monday.  Use newcomment function as a guide.

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
    return (
      <form onSubmit={this.handleSubmit} id="ArticleForm">
        <label>Title: </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="title"
          id="titleinput"
          placeholder="What is your article called?"
        />{" "}
        <label>Body: </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="body"
          id="bodyinput"
          placeholder="Your article here..."
        />{" "}
        <label>Topic: </label>
        <select onChange={this.handleChange} name="topic" id="topicSelect">
          <option value="Coding">Coding</option>
          <option value="Cooking">Cooking</option>
          <option value="Football">Football</option>
        </select>{" "}
        <button
          className="submitArticle"
          disabled={!this.state.body || !this.state.topic || !this.state.title}
        >
          Submit article
        </button>
      </form>
    );
  }
}

export default AddArticleForm;
