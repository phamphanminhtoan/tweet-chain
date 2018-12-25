//import * as config from './../config/account'


const transaction = require('./lib/tx');
const v1 = require('./lib/tx/v1');
const base32 = require('base32.js');
const { RpcClient } = require('tendermint');
const axios = require('axios');
const acc = require('./handle/create_account');
const pay = require('./handle/payment');
const post = require('./handle/post')
const up = require('./handle/update')
const int = require('./handle/interact')


const publicKeyToan = 'GC25E5EAF7BVHT7CLN5YPFAPTUUWZOKCAKQTHTRE6N4J6BGGLMSHFHBR';
const secretKeyToan = 'SDW6S4Q6Q5MTIT3R5C43QADD47OLXB2MEPYJ6WGBEOGLL57PJ3GA6HGE';

// var tx = 'ATC10nSAL8NTz+Jbe4eUD50pbLlCAqEzziTzeJ8ExlskcpwxAAAAAAAAABQABQAkGxcK6JOx+jeq80d4D1n+J0sc4t5N/otdQRX9aavkuTcAAgIFCTZGuEBbTEANuRk6rmnba/gNRUimqGgTJyPVh3SPdhTP4CqLzCC4M9ptSIPmzuPfEIvmTaTyGy9BKRNP2JJYAg=='
// tx = v1.decode(Buffer.from(tx, 'base64'))

// var txR = 'ATCPdJHz39lUC70lFF7xTg0RMt6XXvAZYqbjiK+lXYEBWHhzAAAAAAAAAJ8ABQAkmM9F48J3as+eaVWaq/wYGaz1iR6ep8ls+bnkzMLMimEAAgIF8pW/ctMTyl32+8U6W+CAMxKAC49venhjRm1XhWrL3f2jDGL1muumsah6Sj+2ZXa0fBO54bBM3sJ5/75ErH1NCA=='
// txR = v1.decode(Buffer.from(txR, 'base64'))
// console.log(tx);

// const Rtx = {
//         version: 1,
//         operation: "interact",
//         params: {
//             object: '1B170AE893B1FA37AAF347780F59FE274B1CE2DE4DFE8B5D4115FD69ABE4B937',
//             content: {
//                 type: 1,
//                 text: "Ngo "
//             },
//         },
//         account: publicKeyToan,
//         sequence: 20,
//         memo: Buffer.alloc(0),
//     }
//     transaction.sign(Rtx, secretKeyToan);
//     const txEncode = "0x" + transaction.encode(Rtx).toString('hex');

//     console.log(txEncode)

console.log(int.encodeInteractTransaction(publicKeyToan, secretKeyToan, '1B170AE893B1FA37AAF347780F59FE274B1CE2DE4DFE8B5D4115FD69ABE4B937',4, 22))