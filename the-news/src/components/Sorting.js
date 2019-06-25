import React from "react";

//sort isn't working at the moment - need to look at state or props situation as it is undefined

const Sorting = () => {
  return (
    <div className="sort">
      <h3>Sort By:</h3>
      <button
        className="sortbyDateButton"
        onClick={() => this.handleSort("?sort_by=created_at")}
      >
        Date
      </button>
      <button
        className="sortbyCommentCountButton"
        onClick={() => this.handleSort("?sort_by=comment_count")}
      >
        Number Of Comments
      </button>
      <button
        className="sortbyVoteCountButton"
        onClick={() => this.handleSort("?sort_by=votes")}
      >
        Votes
      </button>
    </div>
  );
};

export default Sorting;
