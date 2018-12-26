const v1 = require('./../lib/tx/v1');
const hdlTransaction = require('./../lib/tx/index');
const fs = require('fs');
const base32 = require('base32.js');
const vstruct = require('varstruct');

const Followings = vstruct([
    { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
]);

function encodeUpdateNameTransaction(publicKey, privateKey, name, sequence) {
    const tx = {
        version: 1,
        operation: "update_account",
        params: {
            key: "name",
            value: Buffer.from(name, 'utf-8')
        },
        account: publicKey,
        sequence,
        memo: Buffer.alloc(0),
    }
    hdlTransaction.sign(tx, privateKey);
    const txEncode = "0x" + hdlTransaction.encode(tx).toString('hex');
    return txEncode;

}

function encodeUpdatePictureTransaction(publicKey, privateKey, picturePath, sequence) {
    const tx = {
        version: 1,
        operation: "update_account",
        params: {
            key: "picture",
            value: fs.readFileSync(picturePath)
        },
        account: publicKey,
        sequence,
        memo: Buffer.alloc(0),
    }
    hdlTransaction.sign(tx, privateKey);
    const txEncode = "0x" + hdlTransaction.encode(tx).toString('hex');
    return txEncode;
}

function encodeUpdateFollowingsTransaction(publicKey, privateKey, addresses, sequence) {
    var following = {
        addresses: []
    }
    addresses.forEach(element => {
        following.addresses.push(base32.decode(element))
    });
    var followParams = Buffer.from(Followings.encode(following));
    const tx = {
        version: 1,
        operation: "update_account",
        params: {
            key: "followings",
            value: followParams
        },
        account: publicKey,
        sequence,
        memo: Buffer.alloc(0),
    }
    hdlTransaction.sign(tx, privateKey);
    const txEncode = "0x" + hdlTransaction.encode(tx).toString('hex');
    return txEncode;

}

module.exports = {
    encodeUpdateNameTransaction,
    encodeUpdatePictureTransaction,
    encodeUpdateFollowingsTransaction
}