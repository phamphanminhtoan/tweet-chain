import React from 'react';
import PostComment from '../PostComment';

const PostContent = (props) => {
    const Post = Object.assign({},props.post)['post'];
    return ( 
        <div className="post-content">
        {/*Post Date*/}
        <div className="post-date hidden-xs hidden-sm">
          <h5>{Post.user.fullName}</h5>
          <p className="text-grey">{Post.createTime}</p>
        </div>
        {/*Post Date End*/} 
        <img
          src={Post.image}
          alt=""
          className="img-responsive post-image"
        />
        <div className="post-container">
          <img
            src={Post.user.avatarUrl}
            alt="user"
            className="profile-photo-md pull-left"
          />
          <div className="post-detail">
            <div className="user-info">
              <h5>
                <a href="timeline.html" className="profile-link">
                  {Post.user.fullName}
                </a>
              </h5>
              <p className="text-muted">
                Published post about 15 mins ago
              </p>
            </div>
            <div className="reaction">
              <a href="/" className="btn text-green">
                <i className="fa fa-thumbs-up" /> {Post.like}
              </a>
              <a href="/" className="btn text-red">
                <i className="fa fa-thumbs-down" /> {Post.dislike}
              </a>
            </div>
            <div className="line-divider" />
            <div className="post-text">
              <p>
                {Post.content}
              </p>
            </div>
            <div className="line-divider" />
            {Post.comments.map((comment, index)=>(
                <PostComment comment={comment} key={index} />
            ))}
            <div className="post-comment">
              <img
                src={Post.user.avatarUrl}
                alt=""
                className="profile-photo-sm"
              />
              <input
                type="text"
                className="form-control"
                placeholder="Post a comment"
              />
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default PostContent;