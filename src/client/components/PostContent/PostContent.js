import React from 'react';
import moment from 'moment';
import axios from 'axios';
import PostComment from '../PostComment';
import { toastr } from "react-redux-toastr";
const { encodeCommentTransaction, encodeInteractTransaction } = require('../../helpers/handle/interact');

class PostContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      comment: ''
     }
  }
  handleSubmit = async () =>{
    const privateKey = window.localStorage.getItem("PrivateKey");
   const user = JSON.parse(window.localStorage.getItem("User"));
   let finalCode = encodeCommentTransaction(user.publicKey, privateKey, this.props.post.hashCode, this.state.comment, user.sequence+1);
   await axios.get('https://komodo.forest.network/broadcast_tx_commit?tx=' + finalCode)
   .then(response => {
     console.log(response);
     if( response.data.result.check_tx.code === 1 )
     toastr.error("Tweetchain", response.data.result.check_tx.log);
     else
     toastr.success("Tweetchain", "Success");
   })
   .catch(error => {
     toastr.error("Tweetchain", error.message);
     console.log(error);
   });  
   await this.props.getUpdateUser();
 }

 handleChange = (e) => {
   this.setState({comment: e.target.value});
 }

 handleChangeReact = async (value)=>{
  const privateKey = window.localStorage.getItem("PrivateKey");
  const user = JSON.parse(window.localStorage.getItem("User"));
  let finalCode = encodeInteractTransaction(user.publicKey, privateKey, this.props.post.hashCode, value, user.sequence+1);
  await axios.get('https://komodo.forest.network/broadcast_tx_commit?tx=' + finalCode)
  .then(response => {
    console.log(response);
    if( response.data.result.check_tx.code === 1 )
    toastr.error("Tweetchain", response.data.result.check_tx.log);
    else
    toastr.success("Tweetchain", "Success");
  })
  .catch(error => {
    toastr.error("Tweetchain", error.message);
    console.log(error);
  });  
  await this.props.getUpdateUser();
 }
  render() { 
    const { post } = this.props;
    const user = JSON.parse(window.localStorage.getItem('User'));
    let like = 0;
    let love = 0; 
    let haha = 0;
    let wow = 0;
    let sad = 0;
    let angry = 0;
    let ownerReact = 0;
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
      if(e.user.publicKey === user.publicKey)
      ownerReact = e.reaction;
    });
   
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
            {1 !== ownerReact ? (<a onClick={() => this.handleChangeReact(1)} className="btn text-green">
              <i className="fa fa-thumbs-up" /> {like}
            </a>): (<a onClick={() => this.handleChangeReact(0)} className="btn text-red">
              <i className="fa fa-thumbs-up" /> {like}
            </a>)}
            {2 !== ownerReact ? <a onClick={() => this.handleChangeReact(2)} className="btn text-green">
              <i className="fa fa-heart" /> {love}
            </a>: <a onClick={() => this.handleChangeReact(0)} className="btn text-red">
              <i className="fa fa-heart" /> {love}
            </a>}
            {3 !== ownerReact ? <a onClick={() => this.handleChangeReact(3)} className="btn text-green">
              <i className="fa fa-smile" /> {haha}
            </a>: <a onClick={() => this.handleChangeReact(0)} className="btn text-red">
              <i className="fa fa-smile" /> {haha}
            </a>}
            {4 !== ownerReact ? <a onClick={() => this.handleChangeReact(4)} className="btn text-green">
              <i className="fa fa-laugh" /> {wow}
            </a>: <a onClick={() => this.handleChangeReact(0)} className="btn text-red">
              <i className="fa fa-laugh" /> {wow}
            </a>}
            {5 !== ownerReact ?  <a onClick={() => this.handleChangeReact(5)} className="btn text-green">
              <i className="fa fa-sad-tear" /> {sad}
            </a>:  <a onClick={() => this.handleChangeReact(0)} className="btn text-red">
              <i className="fa fa-sad-tear" /> {sad}
            </a>}
            {6 !== ownerReact ? <a onClick={() => this.handleChangeReact(6)} className="btn text-green">
              <i className="fa fa-angry" /> {angry}
            </a>: <a onClick={() => this.handleChangeReact(0)} className="btn text-red">
              <i className="fa fa-angry" /> {angry}
            </a>}

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
              onChange={this.handleChange}
            />
            <button className={"btn btn-default"} style={{borderRadius: "50%"}} onClick={this.handleSubmit} > <i className="fa fa-arrow-right" /></button>
          </div>
        </div>
      </div>
    </div>
   );
  }
}
 
export default PostContent;