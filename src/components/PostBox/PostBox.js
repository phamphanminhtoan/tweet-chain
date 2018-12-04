import React, { Fragment } from "react";

const PostBox = props => {
  return (
    <Fragment>
      <div className="create-post">
        <div className="row">
          <div className="col-md-7 col-sm-7">
            <div className="form-group">
              <img
                src={props.user.avatarUrl}
                alt=""
                className="profile-photo-md"
              />
              <textarea
                name="texts"
                id="exampleTextarea"
                cols={30}
                rows={1}
                className="form-control"
                placeholder="Write what you wish"
                defaultValue={""}
              />
            </div>
          </div>
          <div className="col-md-5 col-sm-5">
            <div className="tools">
              <ul className="publishing-tools list-inline">
                <li>
                  <a href="/">
                    <i className="ion-compose" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="ion-images" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="ion-ios-videocam" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="ion-map" />
                  </a>
                </li>
              </ul>
              <button className="btn btn-primary pull-right">Publish</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostBox;
