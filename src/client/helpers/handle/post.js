const v1 = require('./../lib/tx/v1');
const hdlTransaction = require('./../lib/tx/index');

function encodePostTransaction(publicKey, privateKey, content, sequence) {
    return new Promise((resolve, reject) => {
        const tx = {
            version: 1,
            operation: "post",
            params: {
                keys: [],
                content: content,
            },
            account: publicKey,
            sequence,
            memo: Buffer.alloc(0),
        }
        hdlTransaction.sign(tx, privateKey);
        const txEncode = "0x" + hdlTransaction.encode(tx).toString('hex');
        resolve(txEncode);
    }, err => {
        reject(err);
    });
}

module.exports = {
    encodePostTransaction
}