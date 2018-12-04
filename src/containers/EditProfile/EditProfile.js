import React from "react";

class EditProfile extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>User Information</h2>
          <form className="form-horizontal">
            <fieldset>
              {/* Form Name */}
              {/* Text input*/}
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="textinput">
                  Email
                </label>
                <div className="col-md-4">
                  <input
                    id="textinput"
                    name="textinput"
                    placeholder="input your email"
                    className="form-control input-md"
                    required
                    type="text"
                  />
                </div>
              </div>
              {/* Text input*/}
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="textinput">
                  Surname
                </label>
                <div className="col-md-4">
                  <input
                    id="textinput"
                    name="textinput"
                    placeholder="input your surname"
                    className="form-control input-md"
                    required
                    type="text"
                  />
                </div>
              </div>
              {/* Text input*/}
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="textinput">
                  Name
                </label>
                <div className="col-md-4">
                  <input
                    id="textinput"
                    name="textinput"
                    placeholder="input your name"
                    className="form-control input-md"
                    required
                    type="text"
                  />
                </div>
              </div>
              {/* Select Basic */}
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="selectbasic">
                  Position
                </label>
                <div className="col-md-4">
                  <select
                    id="selectbasic"
                    name="selectbasic"
                    className="form-control"
                  >
                    <option value={1}>Senior Java Developer</option>
                    <option value={2}>Project Manager</option>
                  </select>
                </div>
              </div>
              {/* File Button */}
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="uploadPhoto">
                  Upload photo
                </label>
                <div className="col-md-4">
                  <input
                    id="uploadPhoto"
                    name="uploadPhoto"
                    className="input-file"
                    type="file"
                  />
                </div>
              </div>
              {/* Button (Double) */}
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="save" />
                <div className="col-md-8">
                  <button id="save" name="save" className="btn btn-success">
                    Save
                  </button>
                  <button id="cancel" name="cancel" className="btn btn-danger">
                    Cancel
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
