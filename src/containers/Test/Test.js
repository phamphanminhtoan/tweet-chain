import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {fetchMessage} from './actions';


const Test = (props) => {
    const test = ()=>{
        props.fetchMessage();
        alert('done');
    }
    return ( 
        <div>
            <h1>{props.message.name}</h1>
            <button onClick={test} >Test nè</button>
        </div>
     );
}

const mapStateToProps = state => ({
    message: state.Test,
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchMessage: (data) => dispatch(fetchMessage(data)), 
  });
 
export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Test)
  );