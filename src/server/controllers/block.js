let { RpcClient } = require("tendermint");
let client = RpcClient("wss://komodo.forest.network:443");
const axios = require("axios");
var _ = require("lodash");
var moment = require("moment");
var http = require("http-https");

const {
  encode,
  sign,
  decode,
  hash,
  decodeForExcept
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
let current = 10316;
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
    const Interact = Parse.Object.extend("Interact");
    const querySystem = new Parse.Query(System);
    querySystem.equalTo("objectId", "1C1Jap5GaI");
    await querySystem.first().then(async system => {
      //Loop from #1 block to #lastest Block
      console.log("run");
      systemJSON = system.toJSON();
      console.log(systemJSON.currentBlock);
      console.log(systemJSON.lastestBlock);
      if(!systemJSON.isRunning)
      {
      await http.get('https://tweet-update-system.glitch.me/toggle/');
      for (let i = systemJSON.currentBlock+1; i <= systemJSON.lastestBlock; i++) {
        current = i;
        let contentNotif = "This is Block " + i;
        await client
          .block({ height: i })
          .then(async res => {
            let txs = res.block.data.txs;
            let timeBlock = res.block.header.time;
            console.log(i);
            if (txs) {
              console.log("------------");
              for (let j = 0; j < txs.length; j++) {
                let promise = [];
                let blockData;
                let errorPost = false;
                try {
                  blockData = decode(Buffer.from(txs[j], "base64"));
                } catch (err) {
                  console.log("Error Decode");
                  contentNotif = contentNotif + ". Error Decode";
                  errorPost = true;
                  blockData = decodeForExcept(Buffer.from(txs[j], "base64"));
                }
                let hashCode = "";
                try {
                  hashCode = hash(blockData);
                } catch (err) {
                  console.log("Error Hash");
                  hashCode = "Error at block " + i;
                }
                console.log(blockData.operation);

                ///////////////////////////////////////////
                try {
                  //Update Sequence
                  const sequenceUser = new Parse.Query(Users);
                  sequenceUser.equalTo("publicKey", blockData.account);
                  await sequenceUser.first().then(async owner => {
                    owner.set("sequence", blockData.sequence);
                    owner.set("lastTransaction", new Date(timeBlock));
                    console.log("update Sequence");
                    promise.push(owner);
                  });
                  //End update Sequence
                  if (blockData.operation === "create_account") {
                    const newUsers = new Users();
                    newUsers.publicKey = blockData.params.address;
                    newUsers.set("publicKey", blockData.params.address);
                    newUsers.set("balance", 0);
                    newUsers.set("sequence", 0);
                    newUsers.set("block", i);
                    newUsers.set("createTime", new Date(timeBlock));
                    //Save New user
                    promise.push(newUsers);
                    contentNotif = "create user";
                    console.log("done create");
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
                          console.log("done update name");
                          contentNotif = "update name";
                          promise.push(user);
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
                          contentNotif = "update Avatar";
                          console.log("done update picture");
                          promise.push(user);
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
                            contentNotif = "update Followings";
                            console.log("done update followings");
                            promise.push(user);
                          })
                          .catch(error => {
                            console.log(error);
                          });
                      } catch (error) {
                        contentNotif = "fail to update Followings";
                        console.log(error);
                      }
                    }
                  } // end update_account
                  ///////////////////////////////////////////
                  if (blockData.operation === "post") {
                    if (!errorPost) {
                      const userPointer = new Users();
                      const post = new Post();
                      const queryUsers = new Parse.Query(Users);
                      queryUsers.equalTo("publicKey", blockData.account);
                      await queryUsers.first().then(async result => {
                        userPointer.id = result.id;
                        post.set("user", userPointer);
                        post.set("text", blockData.params.content.text);
                        post.set(
                          "type",
                          parseInt(blockData.params.content.type)
                        );
                        post.set("createTime", new Date(timeBlock));
                        post.set("hashCode", hashCode);
                        post.set("block", i);
                        promise.push(post);
                        contentNotif = "has a post";
                        console.log("done post");
                      });
                    }else{
                      contentNotif = "fail to post";
                    }
                  } //end post
                  ///////////////////////////////////////////
                  if (blockData.operation === "payment") {
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
                      promise.push(owner);
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
                          promise.push(target);
                          const newTrans = new Transaction();
                          newTrans.set(
                            "amount",
                            parseInt(blockData.params.amount)
                          );
                          newTrans.set("createTime", new Date(timeBlock));
                          newTrans.set("block", i);
                          const senderPointer = new Users();
                          const receiverPointer = new Users();
                          senderPointer.id = ownerUserId;
                          receiverPointer.id = targetUserId;
                          newTrans.set("sender", senderPointer);
                          newTrans.set("receiver", receiverPointer);
                          newTrans.set("hashCode", hashCode);
                          promise.push(newTrans);
                          contentNotif = "has a payment";
                          console.log("done payment");
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    });
                  } //end payment
                  if (blockData.operation === "interact") {
                    if (!errorPost) {
                      const newInteract = new Interact();
                      newInteract.set("block", i);
                      newInteract.set("object", blockData.params.object);
                      newInteract.set("hashCode", hashCode);
                      newInteract.set("createTime", timeBlock);
                      newInteract.set("type", blockData.params.content.type);
                      if (blockData.params.content.type === 1) {
                        newInteract.set("text", blockData.params.content.text);
                        contentNotif = "comment in a post";
                      }
                      if (blockData.params.content.type === 2) {
                        newInteract.set(
                          "reaction",
                          parseInt(blockData.params.content.reaction)
                        );
                        contentNotif = "reaction in a post";
                      }
                      const queryUsers = new Parse.Query(Users);
                      queryUsers.equalTo("publicKey", blockData.account);
                      await queryUsers
                        .first()
                        .then(user => {
                          const ownerPointer = new Users();
                          ownerPointer.id = user.id;
                          newInteract.set("user", ownerPointer);
                          promise.push(newInteract);
                          console.log("done interact");
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }else{
                      contentNotif = "fail to interact";
                    }
                  } // end interact
                  ///////////////////////////////////////////
                  //create Notification
                  const newNotif = new Notification();
                  newNotif.set("content", contentNotif);
                  newNotif.set("hashCode", hashCode);
                  newNotif.set("createTime", new Date(timeBlock));
                  newNotif.set("block", i);
                  const ownerUser = new Parse.Query(Users);
                  ownerUser.equalTo("publicKey", blockData.account);
                  await ownerUser
                    .first()
                    .then(async user => {
                      const onwerPointer = new Users();
                      onwerPointer.id = user.id;
                      newNotif.set("user", onwerPointer);
                      console.log("Done create Notification");
                      promise.push(newNotif);
                    })
                    .catch(err => {
                      console.log(err);
                    }); //End create Notification
                  ///////////////////////////////////////////
                } catch (err) {
                  throw new Error("Error Parse");
                }
                await Parse.Object.saveAll(promise, { useMasterKey: true })
                  .then(() => {
                    console.log("Save All done");
                    console.log("----------------");
                  })
                  .catch(err => {
                    console.log(err);
                    throw new Error("Error Parse Save ALL");
                  });
              } // end Loop
            }
          })
          .catch(err => {
            console.log(err);
            throw new Error(err.message);
          });
        //Update Current Block
        await http.get('https://tweet-update-system.glitch.me/update/'+ i);
        if(i === systemJSON.lastestBlock)
        {
          await http.get('https://tweet-update-system.glitch.me/toggle/');
        }
      } //end Loop container
    }
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
    console.log(decodeData);
    try {
      const hashCode = hash(decodeData);
    } catch (err) {
      console.log(err);
    }

    if (decodeData.operation === "update_account") {
      if (decodeData.params.key === "followings") {
        let result = [];
        try {
          let addresses = decodeFollow(decodeData.params.value).addresses;
          res.send(addresses);
          /*      console.log(addresses.length);
      for(let i = 0; i< addresses.length; i++ ){
        result.push(base32.encode(addresses[i]));
      }  */
          /*       let test = decodeData.params.value.toString('utf-8'); */
          res.send(addresses);
        } catch (error) {
          console.log(error);
          console.log("vao");
        }
      }
    }
    if (decodeData.operation === "post") {
      let result;
      try {
        console.log("hello");

        res.send(decodeData.params.content);
      } catch (err) {
        console.log("Loi");
        console.log(err);
      }
    }
    if (decodeData.operation === "interact") {
      let result;
      try {
        console.log("hello");
        res.send(decodeData.params.content);
      } catch (err) {
        console.log("Loi");
        console.log(err);
      }
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
    querySystem.equalTo("objectId", "1C1Jap5GaI");
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
