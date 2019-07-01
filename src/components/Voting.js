import React, { Component } from "react";
import { patchSingleComment, patchSingleArticle } from "../api";
import Button from "@material-ui/core/Button";

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
        <Button
          variant="contained"
          size="small"
          className="voteUpButton"
          disabled={voteChange === 1 || !loggedInUser}
          onClick={() => {
            this.handleVote(id, 1);
          }}
        >
          Vote up
        </Button>
        <Button
          variant="contained"
          size="small"
          className="voteDownButton"
          disabled={voteChange === -1 || !loggedInUser}
          onClick={() => {
            this.handleVote(id, -1);
          }}
        >
          Vote down
        </Button>
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
