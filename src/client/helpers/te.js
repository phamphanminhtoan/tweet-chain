//import * as config from './../config/account'


const transaction = require('./lib/tx');
const v1 = require('./lib/tx/v1');
const base32 = require('base32.js');
const { RpcClient } = require('tendermint');
const axios = require('axios');
const acc = require('./handle/create_account');


var p = acc.createPublicKey();
var s = acc.createSecretKey();

var sc = acc.encodeCreateAccountTransaction('GC25E5EAF7BVHT7CLN5YPFAPTUUWZOKCAKQTHTRE6N4J6BGGLMSHFHBR'
, 'SDW6S4Q6Q5MTIT3R5C43QADD47OLXB2MEPYJ6WGBEOGLL57PJ3GA6HGE', p, 12);
console.log(sc)