import { takeLatest,call, put,fork, all } from "redux-saga/effects";
import { fetchMessage }  from '../containers/Test/actions';
const axios = require("axios");

const handleNewMessage = function* handleNewMessage(params) {
  try {
    const data = yield call(axios.get("https://tweet-chain-server.glitch.me/getData"));
    yield put({ type: "FETCH_MESSAGE", payload: data });
  } catch (e) {
    yield put({ type: "FETCH_MESSAGE", payload: e.message });
  }
};



export default function* root() {
    yield all([
      fork(handleNewMessage),
      takeLatest('FETCH_MESSAGE', fetchMessage)
    ])
  }

