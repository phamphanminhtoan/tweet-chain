import React from "react";
const Followings = props => {
  const { followings } = props;
  return (
    <div>
      {followings ? (  followings.map((e,pos)=>(
        <div className="post-content" key={pos}>
        <div className="post-container">
          <img
            src={e.picture ? e.picture : "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg"}
            alt="user"
            className="profile-photo-md pull-left"
          />
          <div className="post-detail">
            <div className="user-info">
              <h5>
                <a
                  href={"/profile/"+e.publicKey}
                  className="profile-link"
                  style={{ fontSize: 20 }}
                >
                  {e.name ? e.name : "NoName"}
                </a>
              </h5>
              <p className="text-muted">{e.publicKey}</p>
            </div>
            <div className="reaction">
              <a href="/" className="btn text-red">
                <i className="fa fa-thumbs-down" /> Unfollow
              </a>
            </div>
          </div>
        </div>
      </div>
      )) 
      ) : (
        <div />
      )}
    </div>
  );
};

export default Followings;
