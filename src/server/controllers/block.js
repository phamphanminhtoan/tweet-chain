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
    const Post = Parse.Object.extend('Post');
    const querySystem = new Parse.Query(System);
    querySystem.equalTo('objectId', 'f0CJqh5TLf');
    await querySystem.first().then(async system => {
    //Loop from #1 block to #lastest Block
    console.log('hello');
    systemJSON = system.toJSON();
    console.log(systemJSON.currentBlock);
    console.log(systemJSON.lastestBlock);
    for (let i = systemJSON.currentBlock; i <= systemJSON.lastestBlock; i++) {
      await client.block({ height: i }).then(async res => {
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
              await newUsers.save().then(
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
                await queryUsers.first().then(async (user) => {
                  user.set('name', blockData.params.value.toString('utf-8'));
                  await user.save().then((response) => {
                    console.log(response);
                  })
                }, (error) => {
                  throw new Error(err);
                });
              }
              if(blockData.params.key === "picture")
              {
                queryUsers.equalTo("publicKey", blockData.account );
                await queryUsers.first().then(async (user) => {
                  let dataImage = 'data:image/jpeg;base64,' + blockData.params.value.toString('base64');
                  user.set('picture', dataImage);
                  await user.save().then((response) => {
                    console.log(response);
                  })
                }, (error) => {
                  throw new Error(err);
                });
              }
            } // end update_account
            if(blockData.operation === "post"){
              let content =  JSON.parse(blockData.params.content.toString('utf-8'));
              if(content.type === 1)
              { 
                const userPointer = new Users();
                const post = new Post();
                const queryUsers = new Parse.Query(Users);
                queryUsers.equalTo("publicKey", blockData.account);
                await queryUsers.first().then(async result=>{
                  userPointer.id = result.id;
                  post.set('user', userPointer);
                  post.set('text', content.text);
                  post.set('type', content.type)
                  await post.save().then(result=>{
                    console.log(result);
                  })
                });
              }
            }//end post
            //Check last block and update currentBlock
          }// end Loop
        }
      }).catch(err=>{
        throw new Error(err);
      });
      if(i === system.lastestBlock)
      {
          system.set('currentBlock' ,i);
          await system.save().then((system)=>{
            console.log(system);
          }).catch(err=>{
              throw new Error(err);
          });
        await console.log('Done');
      }
    }
  });
  }catch(error){
    res.status(500).send(error);
  }
};

exports.decode = async (req, res) => {
  const params = req.body ? req.body : req.query;
  const tx = req.body.tx;
  if (tx) {
    const decodeData = decode(Buffer.from(tx, "base64"));
    if(decodeData.operation === "post")
    {
      let text = decodeData.params.content.toString('utf-8');
      res.send(text);
    }
  
  } else {
    res.send("error");
  }
};

exports.getLastestBlock = async (req, res) => {
  const params = req.body ? req.body : req.query;
  try {
     const System = Parse.Object.extend('System');
    const querySystem = new Parse.Query(System);
    querySystem.equalTo('objectId', 'f0CJqh5TLf'); 
    res.send('running .. .. ..');
    client.subscribe({  
      query: "tm.event='NewBlock'",
      jsonrpc: "2.0"
    }, async (result) => {
      if(result)
      {
        await querySystem.first().then(async system => {
          system.set('lastestBlock' ,parseInt(result.block.header.height));
          await system.save().then((system)=>{
          }).catch(err=>{
              throw new Error(err);
          })
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};



