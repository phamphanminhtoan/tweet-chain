import React from 'react';
import moment from 'moment';
import PostComment from '../PostComment';

const PostContent = (props) => {
    const { post } = props;
    let like = 0;
    let love = 0; 
    let haha = 0;
    let wow = 0;
    let sad = 0;
    let angry = 0;
    post.reaction.forEach(e=>{
      if(e.reaction === 1)
      like++;
      if(e.reaction === 2)
      love++;
      if(e.reaction === 3)
      haha++;
      if(e.reaction === 4)
      wow++;
      if(e.reaction === 5)
      wow++;
      if(e.reaction === 6)
      angry++;  
    });
    const user = JSON.parse(window.localStorage.getItem('User'));
    return ( 
        <div className="post-content">
        <div className="post-container">
          <img
            src={post.user.picture ? post.user.picture : "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg" }
            alt="user"
            className="profile-photo-md pull-left"
          />
          <div className="post-detail">
            <div className="user-info">
              <h5>
                <a href={"/profile/"+post.user.publicKey} className="profile-link">
                  {post.user.name ? post.user.name : "NoName"}
                </a>
              </h5>
              <p className="text-muted">
                {moment(post.createTime.iso).fromNow()}
              </p>
            </div>
            <div className="reaction">
              <a href="/" className="btn text-green">
                <i className="fa fa-thumbs-up" /> {like}
              </a>
              <a href="/" className="btn text-green">
                <i className="fa fa-heart" /> {love}
              </a>
              <a href="/" className="btn text-green">
                <i className="fa fa-smile" /> {haha}
              </a>
              <a href="/" className="btn text-green">
                <i className="fa fa-laugh" /> {wow}
              </a>
              <a href="/" className="btn text-green">
                <i className="fa fa-sad-tear" /> {sad}
              </a>
              <a href="/" className="btn text-green">
                <i className="fa fa-angry" /> {angry}
              </a>

            </div>
            <div className="line-divider" />
            <div className="post-text">
              <p>
                {post.text}
              </p>
            </div>
            <div className="line-divider" />
             {post.comment.map((data, index)=>(
                <PostComment comment={data} key={index} />
            ))} 
            <div className="post-comment">
              <img
                src={user.picture}
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