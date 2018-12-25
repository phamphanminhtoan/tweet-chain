const v1 = require('./../lib/tx/v1');
const hdlTransaction = require('./../lib/tx/index');

function encodePostTransaction(publicKey, privateKey, content, sequence) {

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
    return txEncode;

}

module.exports = {
    encodePostTransaction
}