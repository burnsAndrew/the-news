import React, { Component } from "react";
import { navigate } from "@reach/router";
import { postNewArticle } from "../../api";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
          <form className="newArticleForm">
            <h3>Write an article</h3>

            <TextField
              id="standard-name"
              label="Topic"
              name="topic"
              value={topic}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              helperText="'coding', 'cooking' or 'football'"
            />
            <TextField
              id="standard-name"
              label="Title"
              name="title"
              value={title}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Your story"
              name="body"
              value={body}
              onChange={this.handleChange}
              style={{ margin: 6 }}
              placeholder="Share your story here..."
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />

            <Button
              size="small"
              variant="contained"
              onClick={this.handleSubmit}
              className="submitButton"
              disabled={!body || !title || !topic}
            >
              Submit
            </Button>
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
    postNewArticle(loggedInUser, title, body, topic).then(article => {
      this.setState({
        title: "",
        body: "",
        topic: ""
      });
      navigate(`/articles/${article.article_id}`);
    });
  };
}

export default PostArticle;
