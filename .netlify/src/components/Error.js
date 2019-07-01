import React from "react";

const Error = props => {
  return (
    <div>
      <h4>Ooops! {props.location.state.displayerror}</h4>
    </div>
  );
};

export default Error;
