let { RpcClient } = require("tendermint");
let client = RpcClient("wss://komodo.forest.network:443");
const axios = require('axios');
var _ = require("lodash");

const { encode, sign, decode } = require("../../client/helpers/lib/tx/index");


exports.SyncDatabase = async (req, res) => {
  const params = req.body ? req.body : req.query;
  //Loop from #1 to #lastest Block 
  try {
    res.send("Running .. .. .. ");
    //Define ParseObject
    const Users = Parse.Object.extend('Users');
    const System = Parse.Object.extend('System');
    const querySystem = new Parse.Query(System);
    querySystem.equalTo('objectId', 'f0CJqh5TLf');
    //Loop from #1 block to #lastest Block
    console.log('hello');
    for (let i = 1; i < 11000; i++) {
      await client.block({ height: i }).then(res => {
        let txs = res.block.data.txs;
        console.log(i);
        if (txs) {
          for(let j=0; j<txs.length; j++)
          {
            let blockData = decode(Buffer.from(txs[j], "base64"));
            console.log(blockData.operation);
            console.log("------------")
            if (blockData.operation === "create_account") {
              const newUsers = new Users();
              console.log( blockData.params.address);
              newUsers.publicKey = blockData.params.address;
              newUsers.set('publicKey', blockData.params.address);
              //Save New user
              newUsers.save().then(
                (result) => {
                  console.log(result);
                },
                (error) => {
                  throw new Error(err);
                }
              );
            }//end create_account
            if(blockData.operation === "update_account"){
              const queryUsers = new Parse.Query(Users);
              if(blockData.params.key === "name")
              {
                queryUsers.equalTo("publicKey", blockData.account );
                queryUsers.first().then((user) => {
                  user.set('name', blockData.params.value.toString('utf-8'));
                  user.save().then((response) => {
                    console.log(response);
                  })
                }, (error) => {
                  throw new Error(err);
                });
              }
              if(blockData.params.key === "picture")
              {
                queryUsers.equalTo("publicKey", blockData.account );
                queryUsers.first().then((user) => {
                  let dataImage = 'data:image/jpeg;base64,' + blockData.params.value.toString('base64');
                  user.set('picture', dataImage);
                  user.save().then((response) => {
                    console.log(response);
                  })
                }, (error) => {
                  throw new Error(err);
                });
              }
            } // end update_account
            //Check last block and update currentBlock
            if(i === 10999)
            {
                querySystem.first().then(system => {
                system.set('currentBlock' ,i);
                system.save().then(()=>{
                }).catch(err=>{
                    throw new Error(err);
                })
              })
            }
          }// end Loop
        }
      }).catch(err=>{
        throw new Error(err);
      });
    }
  }catch(error){
    res.status(500).send(error);
  }
};

/* exports.getAndUpdateUser = async (req, res) => {
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
 */



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


