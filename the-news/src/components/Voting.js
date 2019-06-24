import React, { Component } from "react";
import { patchSingleComment, patchSingleArticle } from "../api";

class Voting extends Component {
  state = {
    vote: 0
  };

  render() {
    return (
      <div className="voting">
        <h4>Votes: {this.state.vote + this.props.votes}</h4>
        <button
          className="voteButtonUp"
          disabled={this.state.vote === 1 || !this.props.loggedInUser}
          onClick={() => {
            this.handleVote(this.props.id, 1);
          }}
        >
          Vote up
        </button>
        <button
          className="voteButtonDown"
          disabled={this.state.vote === -1 || !this.props.loggedInUser}
          onClick={() => {
            this.handleVote(this.props.id, -1);
          }}
        >
          Vote down
        </button>
      </div>
    );
  }

  handleVote = (id, directionOfVote) => {
    if (this.props.type === "article") {
      patchSingleArticle(id, { inc_votes: directionOfVote });
    } else if (this.props.type === "comment") {
      patchSingleComment(id, { inc_votes: directionOfVote });
    }
    this.setState({ vote: this.state.vote + directionOfVote });
  };
}

export default Voting;
