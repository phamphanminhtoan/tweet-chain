import React from "react";

const PostComment = props => {
  return (
    <div className="post-comment">
      <img src={props.comment.avatarUrl} alt="" className="profile-photo-sm" />
      <p>
        <a href="timeline.html" className="profile-link">
        {props.comment.username}
        </a>
        {props.comment.content}
      </p>
    </div>
  );
};

export default PostComment;
