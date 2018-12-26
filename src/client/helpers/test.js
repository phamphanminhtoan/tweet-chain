const {encode, sign, decode, hash} = require('./lib/tx/index');
const {encodePostTransaction} = require('./handle/post');
const {encodePaymentTransaction} = require('./handle/payment');
const {encodeUpdateNameTransaction, encodeUpdatePictureTransaction} = require('./handle/update');

var fs = require('fs');
const axios = require('axios');
const vstruct = require('varstruct');

let { RpcClient } = require('tendermint');
let client = RpcClient('https://komodo.forest.network:443');


// const tx = {
//     version: 1,
//     account: 'GBVHFBAB6A225WXXT2BGM7REANIGJ5WXV3MU3OWZNYZ7WGUNXSYLTYIK',
//     sequence: 3,
//     memo: Buffer.alloc(0),
//     operation: 'payment',
//     params: {
//         address: 'GCJ25GYPMW2SIOI75WELDG3JNF2L4W4OIBOQW5SDSGIQGACPW6IKXWF2',
//         amount: 10
//     }
// };


// const tx = {
//     version: 1,
//     account: 'GCJ25GYPMW2SIOI75WELDG3JNF2L4W4OIBOQW5SDSGIQGACPW6IKXWF2',
//     sequence: 1,
//     memo: Buffer.alloc(0),
//     operation: 'update_account',
//     params: {
//         "key": "name",
//         "value":Buffer.from("Dat Nguyen",'utf-8')
//     }
// };

/* let buff = fs.readFileSync('./test.jpg');  

// let base64data = buff.toString('base64');
console.log(buff);
console.log(typeof(buff));
const tx = {
    version: 1,
    account: 'GBVHFBAB6A225WXXT2BGM7REANIGJ5WXV3MU3OWZNYZ7WGUNXSYLTYIK',
    sequence: 5,
    memo: Buffer.alloc(0),
    operation: 'update_account',
    params: {
        "key": "picture",
        "value": buff
    }
};
 */
let test = Buffer.from('ATAdxPY3gelauaEcMyjMIuaJsiFe9bIO5kZTCil6jcMzJAwoAAAAAAAAAKIQQ1RUNTIyLUNRMjAxNS8zMgEAIzBqcoQB8DWu2veegmZ+JANQZPbXrtlNutluM/sajbywueEKgDPvHHi7gES6PzCVHvl9RW0cajkm1Pm37rng6EiGDDwqM7tINtUdWrB7I95C1OhXblA1qVUFY/rqKdwyiyHGCA==', "base64");
const post = encodePostTransaction('GBVHFBAB6A225WXXT2BGM7REANIGJ5WXV3MU3OWZNYZ7WGUNXSYLTYIK', 'SCMWHUST4FME7CMWRGGWJTQCSKCDP3WAPV422BIGNKRGSRT77EHOZELH', 'Comment đầu', 6);
console.log(test.length);
const payment = encodePaymentTransaction('GBVHFBAB6A225WXXT2BGM7REANIGJ5WXV3MU3OWZNYZ7WGUNXSYLTYIK', 'SCMWHUST4FME7CMWRGGWJTQCSKCDP3WAPV422BIGNKRGSRT77EHOZELH','GC25E5EAF7BVHT7CLN5YPFAPTUUWZOKCAKQTHTRE6N4J6BGGLMSHFHBR' ,10, 7);
const update = encodeUpdateNameTransaction('GBVHFBAB6A225WXXT2BGM7REANIGJ5WXV3MU3OWZNYZ7WGUNXSYLTYIK', 'SCMWHUST4FME7CMWRGGWJTQCSKCDP3WAPV422BIGNKRGSRT77EHOZELH','Dang Khoa' ,8);
/* axios.get('https://komodo.forest.network/broadcast_tx_commit?tx=' + update)
.then(response => {
console.log(response);
 console.log(response.data.explanation);
})
.catch(error => {
  console.log(error);
});
 */
/* sign(tx, 'SCMWHUST4FME7CMWRGGWJTQCSKCDP3WAPV422BIGNKRGSRT77EHOZELH');

 const etx = encode(tx).toString('hex');

 const test = decode(Buffer.from('ATA8i2kusx/LGR5eAZ/7L2FhJIL8wtK3QdYou1L0XkGbXSLfAAAAAAAAAAEAAQAjMB3E9jeB6Vq5oRwzKMwi5omyIV71sg7mRlMKKXqNwzMkDCjZtz7CjPZuCL8TmGDO2fjIH8UcLxNYBM2KkRb/l89C7vMg3wITL2dmGwQXihie7bgL20r1i5yu+6PO//p89GUJ', 'base64'));


 */
/* 
let data2 = encode(tx).toString('hex');

    client.broadcastTxCommit({tx: '0x' + data2})
        .then(succ => console.log(succ))
        .catch(err => console.log(err)); */
