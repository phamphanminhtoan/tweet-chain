const v1 = require('./../lib/tx/v1');
const hdlTransaction = require('./../lib/tx/index');
const fs = require('fs');

function encodeCommentTransaction(publicKey, privateKey, object, content, sequence) {
    const tx = {
        version: 1,
        operation: "interact",
        params: {
            object,
            content: {
                type: 1,
                text: content
            }
        },
        account: publicKey,
        sequence,
        memo: Buffer.alloc(0),
    }
    hdlTransaction.sign(tx, privateKey);
    const txEncode = "0x" + hdlTransaction.encode(tx).toString('hex');
    return txEncode;

}

function encodeInteractTransaction(publicKey, privateKey, object, reactValue, sequence) {
    const tx = {
        version: 1,
        operation: "interact",
        params: {
            object,
            content: {
                type: 2,
                reaction: reactValue
            }
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
    encodeCommentTransaction,
    encodeInteractTransaction
}