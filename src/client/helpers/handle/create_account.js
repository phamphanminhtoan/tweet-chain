const v1 = require('./../lib/tx/v1');
const hdlTransaction = require('./../lib/tx/index');

const { Keypair } = require('stellar-base');
const { createHash } = require('crypto')

const key = Keypair.random();

function createPublicKey() {
    return key.publicKey();
}

function createSecretKey() {
    return key.secret();
}

// console.log('Secret key (base64):', key._secretKey.toString('base64'));
// console.log('Public key (base64):', key._publicKey.toString('base64'));
// console.log('Tenermint address:', createHash('sha256')
//   .update(key._publicKey)
//   .digest().slice(0, 20)
//   .toString('hex')
//   .toUpperCase());

function encodeCreateAccountTransaction(publicKey, privateKey, address, sequence) {

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
    return txEncode;

}

module.exports = {
    createPublicKey,
    createSecretKey,
    encodeCreateAccountTransaction
}