import React from 'react';
import moment from 'moment';
import PostComment from '../PostComment';

const PostContent = (props) => {
    const { post, user} = props;
    return ( 
        <div className="post-content">
        {/*Post Date*/}
        <div className="post-date hidden-xs hidden-sm">
          <h5>{user.name}</h5>
          <p className="text-grey">{moment(post.createTime).format('LL')}</p>
        </div>
        {/*Post Date End*/} 
        <div className="post-container">
          <img
            src={user.picture}
            alt="user"
            className="profile-photo-md pull-left"
          />
          <div className="post-detail">
            <div className="user-info">
              <h5>
                <a href="timeline.html" className="profile-link">
                  {user.name}
                </a>
              </h5>
              <p className="text-muted">
                {moment(post.createTime).fromNow()}
              </p>
            </div>
            <div className="reaction">
              <a href="/" className="btn text-green">
                <i className="fa fa-thumbs-up" /> 1
              </a>
              <a href="/" className="btn text-red">
                <i className="fa fa-thumbs-down" /> 1
              </a>
            </div>
            <div className="line-divider" />
            <div className="post-text">
              <p>
                {post.text}
              </p>
            </div>
            <div className="line-divider" />
{/*             {Post.comments.map((comment, index)=>(
                <PostComment comment={comment} key={index} />
            ))} */}
            <div className="post-comment">
              <img
                src={user.name}
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