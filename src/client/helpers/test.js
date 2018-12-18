const {encode, sign, decode, hash} = require('./lib/tx/index');
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

let buff = fs.readFileSync('./a3.jpg');  
// let base64data = buff.toString('base64');

const tx = {
    version: 1,
    account: 'GCJ25GYPMW2SIOI75WELDG3JNF2L4W4OIBOQW5SDSGIQGACPW6IKXWF2',
    sequence: 4,
    memo: Buffer.alloc(0),
    operation: 'update_account',
    params: {
        "key": "picture",
        "value": buff
    }
};


sign(tx, 'SB752FNT66THFPQGK5QSACTLOT5PQIXHHLMUG2BXHBFD4PGS2E47ED4A');

// const etx = encode(tx).toString('hex');

 const test = decode(Buffer.from('ATA8i2kusx/LGR5eAZ/7L2FhJIL8wtK3QdYou1L0XkGbXSLfAAAAAAAAAAEAAQAjMB3E9jeB6Vq5oRwzKMwi5omyIV71sg7mRlMKKXqNwzMkDCjZtz7CjPZuCL8TmGDO2fjIH8UcLxNYBM2KkRb/l89C7vMg3wITL2dmGwQXihie7bgL20r1i5yu+6PO//p89GUJ', 'base64'));

// axios.get('https://komodo.forest.network/broadcast_tx_commit?tx='+'0x' + etx)
//   .then(response => {
//     // console.log(response);
//     // console.log(response.data.explanation);
//   })
//   .catch(error => {
//     console.log(error);
//   });

/* 
let data2 = encode(tx).toString('hex');

    client.broadcastTxCommit({tx: '0x' + data2})
        .then(succ => console.log(succ))
        .catch(err => console.log(err)); */

console.log(test);