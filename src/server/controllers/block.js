let { RpcClient } = require("tendermint");
let client = RpcClient("wss://komodo.forest.network:443");
var _ = require("lodash");
const axios = require('axios');
var userController = require("./userController.js");
const { encode, sign, decode } = require("../../client/helpers/lib/tx/index");

// request a block
var result = [];
let user = {
  publicKey: "",
  name: "",
  post: null,
  picture: "",
  following: null,
  payment: null,
  sequence: '',
};
exports.SyncDatabase = async (req, res) => {
  const params = req.body ? req.body : req.query;
  //Loop from #1 to #lastest Block 
  res.send("Running .. .. .. ");
  console.log('hello');
  for (let i = 1; i < 11000; i++) {
    await client.block({ height: i }).then(res => {
        if(i === 10999)
        console.log('done');
      let txs = res.block.data.txs;
      console.log(i);
      if (txs) {
        for(let j=0; j<txs.length; j++)
        {
          let blockData = decode(Buffer.from(txs[j], "base64"));
          console.log(blockData.operation);
          console.log(i);
          console.log("------------")
          if (blockData.operation === "create_account") {
            resetUser();
            console.log( blockData.params.address);
            user.publicKey = blockData.params.address;
             userController.updateFromBlock(user).then(()=>{
             }); 
          }
          result.push(blockData);
        }
      }
    }).catch(err=>{
      console.log(err);
    });
  }
};

exports.getAndUpdateUser = async (req, res) => {
  resetUser();
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


exports.showBlock = async (req, res) => {
  const params = req.body ? req.body : req.query;
  res.send(result);
};

exports.decode = async (req, res) => {
  const params = req.body ? req.body : req.query;
  const tx = req.body.tx;
  if (tx) {
    const decodeData = decode(Buffer.from(tx, "base64"));
    res.send(decodeData);
  } else {
    res.send("error");
  }
};

/// reset Object
function resetUser() {
  user = {
    publicKey: "",
    name: "",
    post: null,
    picture: "",
    following: null,
    payment: null
  };
}
