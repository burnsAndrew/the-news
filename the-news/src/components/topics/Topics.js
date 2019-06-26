import React, { Component } from "react";
import { getTopics } from "../../api.js";
import { Link } from "@reach/router";
import ArticlesList from "../articles/ArticlesList";

class Topics extends Component {
  state = {
    topics: []
  };

  render() {
    return (
      <div className="topics">
        <h2>Click on a topic below:</h2>
        <ul>
          {this.state.topics &&
            this.state.topics.map(topic => {
              return (
                <li key={topic.slug} className="topic">
                  <Link to={`/articles/topic/${topic.slug}`}>
                    <h4>{topic.slug} </h4>
                  </Link>
                </li>
              );
            })}
        </ul>
        <ArticlesList loggedInUser={this.props.loggedInUser} />
      </div>
    );
  }

  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ topics: topics });
    });
  }

  componentDidUpdate() {}
}

export default Topics;
