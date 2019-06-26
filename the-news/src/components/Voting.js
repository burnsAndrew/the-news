import React, { Component } from "react";
import { patchSingleComment, patchSingleArticle } from "../api";

class Voting extends Component {
  state = {
    vote: 0
  };

  render() {
    const { vote } = this.state;
    const { votes, loggedInUser, id } = this.props;
    return (
      <div className="voting">
        <h5>Votes: {vote + votes}</h5>
        <button
          className="voteUpButton"
          disabled={vote === 1 || !loggedInUser}
          onClick={() => {
            this.handleVote(id, 1);
          }}
        >
          Vote up
        </button>
        <button
          className="voteDownButton"
          disabled={vote === -1 || !loggedInUser}
          onClick={() => {
            this.handleVote(id, -1);
          }}
        >
          Vote down
        </button>
      </div>
    );
  }

  handleVote = (id, directionOfVote) => {
    const { type } = this.props;
    const { vote } = this.state;
    if (type === "article") {
      patchSingleArticle(id, { inc_votes: directionOfVote });
    } else if (type === "comment") {
      patchSingleComment(id, { inc_votes: directionOfVote });
    }
    this.setState({ vote: vote + directionOfVote });
  };
}

export default Voting;
