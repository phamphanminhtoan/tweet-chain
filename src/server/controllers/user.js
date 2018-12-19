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


 exports.fetchUser = async (req, res) => {
  const params = req.body ? req.body : req.query;
  let sequence;
  //Set PublicKey
  user.publicKey = req.params.publicKey;
  let url = `https://komodo.forest.network/tx_search?query="account='${req.params.publicKey}'"`;
  await axios.get(url)
  .then(async function (response) {
    if(response.data.result)
    {
      let txs =response.data.result.txs;
      for(let i=0; i<txs.length; i++)
      {
        let transData = decode(Buffer.from(txs[i].tx, "base64"));
        if(transData.operation === "update_account"){
          if(transData.params.key === "name")
          {
            user.name = transData.params.value.toString('utf-8');
          }
        } 
        if(transData.account === req.params.publicKey)
          user.sequence = transData.sequence;
      }
      await userController.updateFromBlock(user);
    }
    console.log("------------------");
    let test = await userController.getUserByPublicKey(req.params.publicKey);
    await console.log(test);
    if(test)
   res.send(test);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
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
  
