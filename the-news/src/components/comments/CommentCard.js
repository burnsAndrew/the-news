// import React from "react";
// import Voting from "../Voting";

// const CommentCard = () => {
//   const { comment, loggedInUser } = this.props;
//   return (
//     <div>
//       <li className="commentCard" key={comment.comment_id}>
//         <h4 className="author">Comment By: {comment.author}</h4>
//         <h5>{comment.body}</h5>
//         <div className="voting">
//           <Voting
//             votes={comment.votes}
//             id={comment.comment_id}
//             loggedInUser={loggedInUser}
//             type={"comment"}
//           />
//           {loggedInUser === comment.author && (
//             <button
//               id="comment.comment_id"
//               className="deleteButton"
//               onClick={() => {
//                 this.handleDelete(comment.comment_id);
//               }}
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       </li>
//     </div>
//   );
// };

// export default CommentCard;
