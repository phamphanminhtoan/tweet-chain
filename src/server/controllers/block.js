let { RpcClient } = require('tendermint');
let client = RpcClient('wss://komodo.forest.network:443');
var _ = require('lodash');
var userController = require('./userController.js');
const {encode, sign, decode} = require('../../client/helpers/lib/tx/index');


// request a block
var result = [];
let user = {
    publicKey: '',
    name: '',
    post: [],
    picture: '',
    following: [],
    paymemt: []
};
exports.getBlock = async (req, res) => {
    const params = req.body ? req.body : req.query;
    for(let i = 1; i<10; i++){
        client.block({ height: i })
        .then((res) => {
         let txs = res.block.data.txs;
         txs.forEach(element => {
           let blockData = decode(Buffer.from(element, 'base64'));
            if(blockData.operation === "create_account"){
                resetUser();
                console.log(user.publicKey);
                user.publicKey = blockData.params.address;
                userController.updateFromBlock(user);
            }
           result.push(blockData);
         });
        });       
    }
        res.send('Running .. .. .. ');
};

exports.showBlock = async (req, res) => {
    const params = req.body ? req.body : req.query;
        res.send(result);
};

exports.decode = async (req, res) => {
    const params = req.body ? req.body : req.query;
    const tx = req.body.tx;
    if(tx)
    {
        const decodeData = decode(Buffer.from(tx, 'base64'));
        res.send(decodeData);
    }
    else
    {
        res.send("error");
    }
};

/// reset Object
function resetUser (){
    user = {
        publicKey: '',
        name: '',
        post: [],
        picture: '',
        following: [],
        payment: []
    };
}


