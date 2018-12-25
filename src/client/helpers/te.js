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




var sc = up.encodeUpdateNameTransaction('GC25E5EAF7BVHT7CLN5YPFAPTUUWZOKCAKQTHTRE6N4J6BGGLMSHFHBR'
, 'SDW6S4Q6Q5MTIT3R5C43QADD47OLXB2MEPYJ6WGBEOGLL57PJ3GA6HGE', 'Toan', 12);

console.log(sc)