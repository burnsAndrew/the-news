import React, { Component } from "react";
import { patchSingleComment, patchSingleArticle } from "../api";

class Voting extends Component {
  state = {
    voteChange: 0
  };

  render() {
    const { voteChange } = this.state;
    const { votes, loggedInUser, id } = this.props;

    return (
      <div className="voting">
        <h5>Votes: {voteChange + votes}</h5>
        <button
          className="voteUpButton"
          disabled={voteChange === 1 || !loggedInUser}
          onClick={() => {
            this.handleVote(id, 1);
          }}
        >
          Vote up
        </button>
        <button
          className="voteDownButton"
          disabled={voteChange === -1 || !loggedInUser}
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
    const { voteChange } = this.state;
    this.setState({
      voteChange: voteChange + directionOfVote
    });
    if (type === "article") {
      patchSingleArticle(id, { inc_votes: directionOfVote });
    } else if (type === "comment") {
      patchSingleComment(id, { inc_votes: directionOfVote });
    }
  };
}

export default Voting;
