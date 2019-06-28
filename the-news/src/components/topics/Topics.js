import React, { Component } from "react";
import { getTopics } from "../../api.js";
import { Link } from "@reach/router";
import ArticlesList from "../articles/ArticlesList";
import Loader from "../Loader";

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true
  };

  render() {
    const { topics, isLoading } = this.state;
    const { loggedInUser } = this.props;
    if (isLoading) return <Loader />;
    return (
      <div className="topics">
        <h2>Click on a topic below:</h2>
        <ul>
          {topics &&
            topics.map(topic => {
              return (
                <li key={topic.slug} className="topic">
                  <Link to={`/articles/topic/${topic.slug}`}>
                    <h4>{topic.slug} </h4>
                  </Link>
                </li>
              );
            })}
        </ul>
        <ArticlesList loggedInUser={loggedInUser} />
      </div>
    );
  }

  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ topics: topics, isLoading: false });
    });
  }
}

export default Topics;
