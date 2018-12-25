import React, { Fragment } from "react";

const PostBox = props => {
  const user = JSON.parse(window.localStorage.getItem("User"));
  return (
    <Fragment>
      <div className="create-post">
        <div className="row">
          <div className="col-md-10 col-sm-10">
            <div className="form-group">
              <img
                src={user.picture}
                alt=""
                className="profile-photo-md"
              />
              <textarea
                name="texts"
                id="exampleTextarea"
                cols={100}
                rows={1}
                className="form-control"
                placeholder="Write what you wish"
                defaultValue={""}
              />
            </div>
          </div>
          <div className="col-md-2 col-sm-2">
            <div className="tools">
              <button className="btn btn-primary pull-right">Publish</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostBox;
