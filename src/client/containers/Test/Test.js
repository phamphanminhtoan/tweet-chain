import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchMessage } from "./actions";

const Test = props => {
  const test = () => {
    props.fetchMessage();
  };
  console.log(props.isFetching);
  return (
    <div>
      <center>
        {props.isFetching ? <div class="loader" /> : <div />}
        {props.error ? <h1>Something went wrong. </h1> : <div />}
        <h1>{props.content}</h1>
        <button onClick={test}>Fetch Message from Server</button>
      </center>
    </div>
  );
};

const mapStateToProps = state => ({
  content: state.Test.content,
  isFetching: state.Test.isFetching,
  error: state.Test.error
});

const mapDispatchToProps = dispatch => ({
  fetchMessage: () => dispatch(fetchMessage())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Test)
);
