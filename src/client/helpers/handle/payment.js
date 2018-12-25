const v1 = require('./../lib/tx/v1');
const hdlTransaction = require('./../lib/tx/index');

function encodePaymentTransaction(publicKey, privateKey, address, amount, sequence) {
    const tx = {
        version: 1,
        operation: "payment",
        params: {
            address,
            amount
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
    encodePaymentTransaction
}