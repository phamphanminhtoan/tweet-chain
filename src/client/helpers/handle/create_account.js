const v1 = require('./../lib/tx/v1');
const hdlTransaction = require('./../lib/tx/index');

function encodeCreateAccountTransaction(publicKey, privateKey, address, sequence) {
    return new Promise((resolve, reject) => {
        const tx = {
            version: 1,
            operation: "create_account",
            params: {
                address
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
    encodeCreateAccountTransaction
}