let { RpcClient } = require("tendermint");
let client = RpcClient("wss://komodo.forest.network:443");
const axios = require("axios");
var _ = require("lodash");
var moment = require("moment");
var http = require("http-https");

const { encode, sign, decode } = require("../../client/helpers/lib/tx/index");
const { decodeFollow, decodePost } = require("../../client/helpers/lib/tx/v1");
const { calculateEnergy } = require("../../client/helpers/lib/energy");
const base32 = require("base32.js");

exports.SyncDatabase = async (req, res) => {
  const params = req.body ? req.body : req.query;
  //Loop from #1 to #lastest Block
  try {
    res.send("Running .. .. .. ");
    //Define ParseObject
    const Users = Parse.Object.extend("Users");
    const System = Parse.Object.extend("System");
    const Post = Parse.Object.extend("Post");
    const querySystem = new Parse.Query(System);
    querySystem.equalTo("objectId", "grAZBFQi8n");
    await querySystem.first().then(async system => {
      //Loop from #1 block to #lastest Block
      console.log("run");
      systemJSON = system.toJSON();
      console.log(systemJSON.currentBlock);
      console.log(systemJSON.lastestBlock);
      for (let i = 7541; i <= 16294; i++) {
        await client
          .block({ height: i })
          .then(async res => {
            let txs = res.block.data.txs;
            console.log(i);
            if (txs) {
              for (let j = 0; j < txs.length; j++) {
                let blockData = decode(Buffer.from(txs[j], "base64"));
                console.log(blockData.operation);
                console.log("------------");
                if (blockData.operation === "create_account") {
                  const newUsers = new Users();
                  newUsers.publicKey = blockData.params.address;
                  newUsers.set("publicKey", blockData.params.address);
                  newUsers.set("balance", 0);
                  newUsers.set("sequence", 0);
                  newUsers.set("createTime", new Date(res.block.header.time));
                  //Save New user
                  await newUsers.save().then(
                    result => {
                      console.log("done create");
                    },
                    error => {
                      console.log(error);
                    }
                  );
                } //end create_account
                if (blockData.operation === "update_account") {
                  const queryUsers = new Parse.Query(Users);
                  if (blockData.params.key === "name") {
                    queryUsers.equalTo("publicKey", blockData.account);
                    await queryUsers.first().then(
                      async user => {
                        user.set(
                          "name",
                          blockData.params.value.toString("utf-8")
                        );
                        user.set("sequence", blockData.sequence);
                        user.set("lastTransaction", new Date(res.block.header.time));
                        await user.save().then(response => {
                          console.log("done update name");
                        });
                      },
                      error => {
                        console.log(error);
                      }
                    );
                  }
                  if (blockData.params.key === "picture") {
                    queryUsers.equalTo("publicKey", blockData.account);
                    await queryUsers.first().then(
                      async user => {
                        let dataImage =
                          "data:image/jpeg;base64," +
                          blockData.params.value.toString("base64");
                        user.set("picture", dataImage);
                        user.set("sequence", blockData.sequence);
                        user.set("lastTransaction", new Date(res.block.header.time));
                        await user.save().then(response => {
                          console.log("done update picture");
                        });
                      },
                      error => {
                        console.log(error);
                      }
                    );
                  }
                  if (blockData.params.key === "followings") {
                    let result = [];
                    try {
                      let addresses = decodeFollow(blockData.params.value)
                        .addresses;
                      for (let i = 0; i < addresses.length; i++) {
                        result.push(base32.encode(addresses[i]));
                      }
                      queryUsers.equalTo("publicKey", blockData.account);
                      await queryUsers.first().then(
                        async user => {
                          user.set("followings", result);
                          user.set("sequence", blockData.sequence);
                          user.set("lastTransaction", new Date(res.block.header.time));
                          await user.save().then(response => {
                            console.log("done update followings");
                          });
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  }
                } // end update_account
                if (blockData.operation === "post") {
                  try {
                    let content = decodePost(blockData.params.content);
                    const userPointer = new Users();
                    const post = new Post();
                    const queryUsers = new Parse.Query(Users);
                    queryUsers.equalTo("publicKey", blockData.account);
                    await queryUsers.first().then(async result => {
                      userPointer.id = result.id;
                      post.set("user", userPointer);
                      post.set("text", content.text);
                      post.set("type", parseInt(content.type));
                      post.set("createTime", new Date(res.block.header.time));
                      await post.save().then(async result => {
                        const ownerUser = new Parse.Query(Users);
                        ownerUser.equalTo("publicKey", blockData.account);
                        await ownerUser.first().then(async owner => {
                          owner.set("sequence", blockData.sequence);
                          owner.set("lastTransaction", new Date(res.block.header.time));
                          await owner.save().then(() => {
                            console.log("done post");
                          });
                        });
                      });
                    });
                  } catch (err) {
                    console.log(err);
                  }
                } //end post
                if (blockData.operation === "payment") {
                  const ownerUser = new Parse.Query(Users);
                  ownerUser.equalTo("publicKey", blockData.account);
                  await ownerUser.first().then(async owner => {
                    if (
                      blockData.account !==
                      "GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7"
                    ) {
                      let ownerBalance =
                        parseInt(owner.toJSON().balance) -
                        parseInt(blockData.params.amount);
                      owner.set("balance", ownerBalance);
                    }
                    owner.set("sequence", parseInt(blockData.sequence));
                    owner.set("lastTransaction", new Date(res.block.header.time));
                    await owner.save().then(async result1 => {
                      const targetUser = new Parse.Query(Users);
                      targetUser.equalTo("publicKey", blockData.params.address);
                      await targetUser.first().then(async target => {
                        let targetBalance =
                          parseInt(target.toJSON().balance) +
                          parseInt(blockData.params.amount);
                        target.set("balance", targetBalance);
                        await target.save().then(result2 => {
                          console.log("done payment");
                        });
                      });
                    });
                  });
                } //end payment
                ////////////////////////////Energy
                /*             if(blockData.account !== "GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7")
            {
            let base64Txs = Buffer.from(res.block.data.txs[0], 'base64')
            let currentBlockTime = res.block_meta.header.time;
            const engeryUser = new Parse.Query(Users);
            engeryUser.equalTo("publicKey", blockData.account);
            await engeryUser.first().then(async (user) => {
              user.set('energy', calculateEnergy(user.toJSON(), currentBlockTime, base64Txs.length));
              user.set('bandwidth', currentBlockTime);
              user.save().then(()=>{
                console.log('done energy');
              }).catch(err => {
                throw new Error(err);
              })
            });
          } */
                ////////////////////////////End Energy
              } // end Loop
            }
          })
          .catch(err => {
            throw new Error(err);
          });
        //Update Current Block
        //await http.get('https://tweet-update-system.glitch.me/update/'+ i);
      } //end Loop container
    });
  } catch (error) {
    console.log(error);
  }
};

exports.decode = async (req, res) => {
  const params = req.body ? req.body : req.query;
  const tx = req.body.tx;
  let result = {};
  if (tx) {
    const decodeData = decode(Buffer.from(tx, "base64"));
    if (decodeData.operation === "update_account") {
      if (decodeData.params.key === "followings") {
        let result = [];
        try {
          let addresses = decodeFollow(decodeData.params.value).addresses;
          /*      console.log(addresses.length);
      for(let i = 0; i< addresses.length; i++ ){
        result.push(base32.encode(addresses[i]));
      }  */
          /*       let test = decodeData.params.value.toString('utf-8'); */
          res.send(addresses);
        } catch (error) {
          console.log("vao");
        }
      }
    }
    if (decodeData.operation === "post") {
      let result;
      try {
        console.log("hello");
        result = decodePost(decodeData.params.content);
        console.log("hell2");
        res.send(result);
      } catch (err) {
        console.log("Loi");
        result = decodeData.params.content.toString("utf-8");
        res.send(result);
      }

      /*      {
        "type": 1,
        "text": "Việt Nam vô địch AFF Cup 2018!!! 🇻🇳🇻🇳🇻🇳"
    } */
    }
  } else {
    res.send("error");
  }
};

exports.getLastestBlock = async (req, res) => {
  const params = req.body ? req.body : req.query;
  try {
    const System = Parse.Object.extend("System");
    const querySystem = new Parse.Query(System);
    querySystem.equalTo("objectId", "f0CJqh5TLf");
    res.send("running .. .. ..");
    client.subscribe(
      {
        query: "tm.event='NewBlock'",
        jsonrpc: "2.0"
      },
      async result => {
        if (result) {
          await querySystem.first().then(async system => {
            system.set("lastestBlock", parseInt(result.block.header.height));
            await system
              .save()
              .then(system => {})
              .catch(err => {
                throw new Error(err);
              });
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
