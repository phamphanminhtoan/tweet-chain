let { RpcClient } = require("tendermint");
let client = RpcClient("wss://komodo.forest.network:443");
const axios = require("axios");

//This is Template for Controller
exports.Template = async (req, res) => {
  const params = req.body ? req.body : req.query;
  try {
    //TODO
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUser = async (req, res) => {
  const params = req.body ? req.body : req.query;
  try {
    const User = Parse.Object.extend("Users");
    const queryUser = new Parse.Query(User);
    queryUser.equalTo("publicKey", req.params.publicKey);
    queryUser.first().then(
      user => {
          if(user)
        res.send(user);
        else
        throw new Error("User is not defined");
      },
      error => {
          throw new Error(error);
      }
    );
  } catch (error) {
    res.send(error);
  }
};

exports.syncUser = async (req, res) => {
    const params = req.body ? req.body : req.query;
    try {
      const User = Parse.Object.extend("Users");
      const queryUser = new Parse.Query(User);
      queryUser.equalTo("publicKey", req.params.publicKey);
      queryUser.first().then(
        user => {
          res.send(user);
        },
        error => {
          console.error(error);
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
