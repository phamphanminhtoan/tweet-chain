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
const vstruct = require('varstruct');

const publicKeyToan = 'GC25E5EAF7BVHT7CLN5YPFAPTUUWZOKCAKQTHTRE6N4J6BGGLMSHFHBR';
const secretKeyToan = 'SDW6S4Q6Q5MTIT3R5C43QADD47OLXB2MEPYJ6WGBEOGLL57PJ3GA6HGE';

var tx = 'ATDWu4CH2zGdowQnEtrh97wGDp8eSyq6foVuU1x8Q6ipEpB7AAAAAAAAAHYABAFKCmZvbGxvd2luZ3MBPQAJMNo/ZGPHZmIkYzWx9dAXloXqb+hLIXZX/DtfayT/IVICtxkwPItpLrMfyxkeXgGf+y9hYSSC/MLSt0HWKLtS9F5Bm10i3zAdxPY3gelauaEcMyjMIuaJsiFe9bIO5kZTCil6jcMzJAwoMI90kfPf2VQLvSUUXvFODREy3pde8BlipuOIr6VdgQFYeHMwSd+DwYbJNJiRLkoum8CABCim8FeDGydd4A0Tia3QG3ggSzBQN5uBLKaZR3PD0m5LkdMJm/qeKruE1QYfMp2ubOB6iXIhMC9V4TTDR+gox1cKZnOXVun/qTjvKzolqHRwCTqOPZ3tw/AwFXqhe+iX+EQlQC4sMcCvEqHuA7GjhMWSs2KbX/Ff9eQBxTClkGdXvfF7QIQRu0eTeLFJKJtRZ88FLBBW6xW7H1EzTYtbOCiz3fkF5mAwg/3Z0TyC7kwA5TWAZlTgdiJ1NTYU56kqZwEygUM2nPLZ77UPNQarkbEMvArLf5b1xcLx94+lCA=='
tx = v1.decode(Buffer.from(tx, 'base64'))

var txR = 'ATCPdJHz39lUC70lFF7xTg0RMt6XXvAZYqbjiK+lXYEBWHhzAAAAAAAAAJ8ABQAkmM9F48J3as+eaVWaq/wYGaz1iR6ep8ls+bnkzMLMimEAAgIF8pW/ctMTyl32+8U6W+CAMxKAC49venhjRm1XhWrL3f2jDGL1muumsah6Sj+2ZXa0fBO54bBM3sJ5/75ErH1NCA=='
txR = v1.decode(Buffer.from(txR, 'base64'))
//console.log(tx.params.value.toString());
// const Followings = vstruct([
//     { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
// ]);

// var f = 'GBVHFBAB6A225WXXT2BGM7REANIGJ5WXV3MU3OWZNYZ7WGUNXSYLTYIK'
// var following = {
//     addresses: [base32.decode(f)]
// }
// var updateParams = Buffer.from(Followings.encode(following));
// const rtx = {
//     version: 1,
//     operation: "update_account",
//     params: {
//         key: "followings",
//         value: updateParams
//     },
//     account: publicKeyToan,
//     sequence: 22,
//     memo: Buffer.alloc(0),
// }

// transaction.sign(rtx, secretKeyToan);
// const txEncode = "0x" + transaction.encode(rtx).toString('hex');

//console.log(txEncode)

console.log(up.encodeUpdateFollowingsTransaction(publicKeyToan, secretKeyToan, f, 23))