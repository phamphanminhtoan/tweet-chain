const v1 = require('./../lib/tx/v1');
const hdlTransaction = require('./../lib/tx/index');
const fs = require('fs');

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
    return new Promise((resolve, reject) => {
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
        resolve(txEncode);
    }, err => {
        reject(err);
    });
}

module.exports = {
    encodeUpdateNameTransaction,
    encodeUpdatePictureTransaction
}