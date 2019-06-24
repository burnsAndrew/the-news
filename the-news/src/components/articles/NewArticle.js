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
        <input
          onChange={this.handleChange}
          type="text"
          name="title"
          id="titleinput"
        />
        <input
          onChange={this.handleChange}
          type="text"
          name="body"
          id="bodyinput"
        />
        <input
          onChange={this.handleChange}
          type="text"
          name="topic"
          id="topicinput"
        />
        <button className="submitArticle" disabled={!this.state.body}>
          Submit article
        </button>
      </form>
    );
  }
}

export default AddArticleForm;
