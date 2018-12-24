let { RpcClient } = require("tendermint");
let client = RpcClient("wss://zebra.forest.network:443");
const axios = require("axios");
var _ = require("lodash");
var moment = require("moment");
var http = require("http-https");

const {
  encode,
  sign,
  decode,
  hash
} = require("../../client/helpers/lib/tx/index");
const { decodeFollow, decodePost } = require("../../client/helpers/lib/tx/v1");
const { calculateEnergy } = require("../../client/helpers/lib/energy");
const base32 = require("base32.js");

let serverBlockUrl = [
  "https://komodo.forest.network/",
  "https://zebra.forest.network/",
  "https://dragonfly.forest.network/",
  "https://gorilla.forest.network/",
  "https://fox.forest.network/"
];
let current = 12184;
exports.SyncDatabase = async (req, res) => {
  const params = req.body ? req.body : req.query;
  //Loop from #1 to #lastest Block
  try {
    res.send("Running .. .. .. ");
    //Define ParseObject
    const Users = Parse.Object.extend("Users");
    const System = Parse.Object.extend("System");
    const Post = Parse.Object.extend("Post");
    const Transaction = Parse.Object.extend("Transaction");
    const Notification = Parse.Object.extend("Notification");
    const querySystem = new Parse.Query(System);
    let contentNotif = "";
    querySystem.equalTo("objectId", "1C1Jap5GaI");
    await querySystem.first().then(async system => {
      //Loop from #1 block to #lastest Block
      console.log("run");
      systemJSON = system.toJSON();
      console.log(systemJSON.currentBlock);
      console.log(systemJSON.lastestBlock);
      for (let i = current; i <= 14000; i++) {
        current = i;
        await client
          .block({ height: i })
          .then(async res => {
            let txs = res.block.data.txs;
            let timeBlock = res.block.header.time;
            console.log(i);
            if (txs) {
              for (let j = 0; j < txs.length; j++) {
                let promise = [];
                let blockData = decode(Buffer.from(txs[j], "base64"));
                let hashCode = '';
                try{
                  hashCode = hash(blockData);
                }catch(err){
                  console.log('Error Hash');
                  hashCode = '';
                }
                console.log(blockData.operation);
                console.log("------------");
                ///////////////////////////////////////////
                if (blockData.operation === "create_account") {
                  let promise = [];
                  const newUsers = new Users();
                  newUsers.publicKey = blockData.params.address;
                  newUsers.set("publicKey", blockData.params.address);
                  newUsers.set("balance", 0);
                  newUsers.set("sequence", 0);
                  newUsers.set("createTime", new Date(timeBlock));
                  //Save New user
                  promise.push(newUsers.save());
                  const owerUser = new Parse.Query(Users);
                  owerUser.equalTo("publicKey", blockData.account);
                  await owerUser
                    .first()
                    .then(async user => {
                      user.set("sequence", blockData.sequence);
                      user.set("lastTransaction", new Date(timeBlock));
                      promise.push(user.save());
                      contentNotif = "Create user";
                      console.log("done create");
                    })
                    .catch(err => {
                      console.log(err);
                    });
                } //end create_account
                ///////////////////////////////////////////
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
                        user.set("lastTransaction", new Date(timeBlock));
                        console.log("done update name");
                        contentNotif = "Update name";
                        promise.push(user.save());
                      },
                      error => {
                        console.log(error);
                      }
                    );
                  }
                  if (blockData.params.key === "picture") {
                    queryUsers.equalTo("publicKey", blockData.account);
                    await queryUsers
                      .first()
                      .then(async user => {
                        let dataImage =
                          "data:image/jpeg;base64," +
                          blockData.params.value.toString("base64");
                        user.set("picture", dataImage);
                        user.set("sequence", blockData.sequence);
                        user.set("lastTransaction", new Date(timeBlock));
                        contentNotif = "Update Avatar";
                        console.log("done update picture");
                        promise.push(user.save());
                      })
                      .catch(error => {
                        console.log(error);
                      });
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
                      await queryUsers
                        .first()
                        .then(async user => {
                          user.set("followings", result);
                          user.set("sequence", blockData.sequence);
                          user.set("lastTransaction", new Date(timeBlock));
                          contentNotif = "Update Followings";
                          console.log("done update followings");
                          promise.push(user.save());
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    } catch (error) {
                      console.log(error);
                      const ownerUser = new Parse.Query(Users);
                      ownerUser.equalTo("publicKey", blockData.account);
                      await ownerUser.first().then(async owner => {
                        owner.set("sequence", blockData.sequence);
                        owner.set("lastTransaction", new Date(timeBlock));
                        console.log("done update Sequence");
                        promise.push(owner.save());
                      });
                    }
                  }
                } // end update_account
                ///////////////////////////////////////////
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
                      post.set("createTime", new Date(timeBlock));
                      post.set("hashCode", hashCode);
                      promise.push(post.save());
                      const ownerUser = new Parse.Query(Users);
                      ownerUser.equalTo("publicKey", blockData.account);
                      await ownerUser.first().then(async owner => {
                        owner.set("sequence", blockData.sequence);
                        owner.set("lastTransaction", new Date(timeBlock));
                        promise.push(owner.save());
                        contentNotif = "Post content";
                        console.log("done post");
                      });
                    });
                  } catch (err) {
                    console.log(err);
                    const ownerUser = new Parse.Query(Users);
                    ownerUser.equalTo("publicKey", blockData.account);
                    await ownerUser.first().then(async owner => {
                      owner.set("sequence", blockData.sequence);
                      owner.set("lastTransaction", new Date(timeBlock));
                      console.log("done update Sequence");
                      promise.push(owner.save());
                    });
                  }
                } //end post
                ///////////////////////////////////////////
                if (blockData.operation === "payment") {
                  let promise = [];
                  let ownerUserId, targetUserId;
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
                    ownerUserId = owner.toJSON().objectId;
                    owner.set("sequence", parseInt(blockData.sequence));
                    owner.set("lastTransaction", new Date(timeBlock));
                    promise.push(owner.save());
                    const targetUser = new Parse.Query(Users);
                    targetUser.equalTo("publicKey", blockData.params.address);
                    await targetUser
                      .first()
                      .then(async target => {
                        let targetBalance =
                          parseInt(target.toJSON().balance) +
                          parseInt(blockData.params.amount);
                        targetUserId = target.toJSON().objectId;
                        target.set("balance", targetBalance);
                        promise.push(target.save());
                        const newTrans = new Transaction();
                        newTrans.set(
                          "amount",
                          parseInt(blockData.params.amount)
                        );
                        newTrans.set("createTime", new Date(timeBlock));
                        const senderPointer = new Users();
                        const receiverPointer = new Users();
                        senderPointer.id = ownerUserId;
                        receiverPointer.id = targetUserId;
                        newTrans.set("sender", senderPointer);
                        newTrans.set("receiver", receiverPointer);
                        newTrans.set("hashCode", hashCode);
                        promise.push(newTrans.save());
                        contentNotif = "handle payment";
                        console.log("done payment");
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  });
                } //end payment
                if(blockData.operation === "interact"){
                  await http.get('https://tweet-update-system.glitch.me/update/'+ i);
                }
                ///////////////////////////////////////////
                //create Notification
                const newNotif = new Notification();
                newNotif.set("content", contentNotif);
                newNotif.set("hashCode", hashCode);
                newNotif.set("createTime", new Date(timeBlock));
                const ownerUser = new Parse.Query(Users);
                ownerUser.equalTo("publicKey", blockData.account);
                await ownerUser
                  .first()
                  .then(async user => {
                    const onwerPointer = new Users();
                    onwerPointer.id = user.id;
                    newNotif.set("user", onwerPointer);
                    console.log("Done create Notification");
                    promise.push(newNotif.save());
                  })
                  .catch(err => {
                    console.log(err);
                  }); //End create Notification
                ///////////////////////////////////////////
                await Promise.all(promise)
                  .then(() => {
                    console.log("Promise Done");
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } // end Loop
            }
          })
          .catch(err => {
            throw new Error(err);
          });
        indexServerUrl++;
        if (indexServerUrl === 5) indexServerUrl = 0;
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
    let test = hash(decodeData.params);
    res.send(test);
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
