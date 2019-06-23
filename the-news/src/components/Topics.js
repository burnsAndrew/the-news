import React, { Component } from "react";
import { getTopics } from "../api.js";
import { Link } from "@reach/router";
import ArticlesList from "./ArticlesList";

class Topics extends Component {
  state = {
    topics: []
  };

  render() {
    return (
      <div className="topics">
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
        <ArticlesList />
      </div>
    );
  }

  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ topics: topics });
    });
  }
}

export default Topics;
