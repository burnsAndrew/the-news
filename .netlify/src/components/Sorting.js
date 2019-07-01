import React, { Component } from "react";

class Sorting extends Component {
  render() {
    return (
      <div className="sort">
        <h3>Sort By:</h3>
        <button
          className="sortbyDateButton"
          onClick={this.setSortBy}
          value={"created_at"}
        >
          Date
        </button>
        <button
          className="sortbyCommentCountButton"
          onClick={this.setSortBy}
          value={"comment_count"}
        >
          Number Of Comments
        </button>
        <button
          className="sortbyVoteCountButton"
          onClick={this.setSortBy}
          value={"votes"}
        >
          Votes
        </button>
        <button
          className="sortbyAuthorButton"
          onClick={this.setSortBy}
          value={"author"}
        >
          Author
        </button>
        <button
          className="orderbyAscendingButton"
          onClick={this.setOrderBy}
          value={"asc"}
        >
          Asc
        </button>
        <button
          className="orderbyDescendingButton"
          onClick={this.setOrderBy}
          value={"desc"}
        >
          Desc
        </button>
      </div>
    );
  }

  setSortBy = event => {
    this.setState({ sort_by: event.currentTarget.value, isLoading: false });
  };

  setOrderBy = event => {
    this.setState({ order_by: event.currentTarget.value, isLoading: false });
  };
}

export default Sorting;
