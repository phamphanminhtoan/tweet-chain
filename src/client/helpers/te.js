const transaction = require('./lib/tx');
const v1 = require('./lib/tx/v1');
const base32 = require('base32.js');
const { RpcClient } = require('tendermint');
const axios = require('axios');

// // let client = RpcClient('https://komodo.forest.network:443');
// // client.block({ height: 212 })
// //     .then((res) => console.log(res))
// //     .catch((err) => console.log(err))
 publicKey = 'GC25E5EAF7BVHT7CLN5YPFAPTUUWZOKCAKQTHTRE6N4J6BGGLMSHFHBR'
//  var post = {
//     type: 1,
//     text: "Phu Thu"
// }
// //var content = new Buffer.from(JSON.stringify(post))
// //console.log(content)
// //var temp = JSON.parse(content.toString());

// // //console.log(temp)

let buffPicture = fs.readFileSync('./a.JPEG'); 
var buffName = Buffer.from("Toan Pham Phan Minh", 'utf-8');
console.log(buff.toString())
crawTx = {
    version: 1,
    account: publicKey,
    sequence: 11,
    memo: Buffer.alloc(0),
    operation: 'update_account',
    params: {
        key: "name", //picture
        value: Buffer.from("Toan Pham Phan Minh", 'utf-8')
    }
}

 transaction.sign(crawTx, 'SDW6S4Q6Q5MTIT3R5C43QADD47OLXB2MEPYJ6WGBEOGLL57PJ3GA6HGE');

 var res = transaction.encode(crawTx).toString('hex');
console.log(res)

// // var res2 = transaction.decode(Buffer.from('ATAdxPY3gelauaEcMyjMIuaJsiFe9bIO5kZTCil6jcMzJAwoAAAAAAAAAC8QQ1RUNTIyLUNRMjAxNS8zMgIAKzBwvd1bmTYX9+UH7/ClM9OijVUfiNNCJt7s89bHsXbP1FwWAAAAAAX14QAXKI+NeDuxq6oGCIz/LWFzLd/7Gv9IZyyK+l1IA6G0LPAOzJPdoAtFws8fcp326fNHVuO0qS6WvfT/FXyxph8D', 'base64'))
// // console.log(res2);


// // 24 hours, balane là số CEL sở hữu
// const BANDWIDTH_PERIOD = 86400;   //Chu ky bien doi 
// const INITIAL_APP_HASH = Buffer.from('forest.network by Kha Do');
// const ACCOUNT_KEY = Buffer.from('account');
// const OBJECT_KEY = Buffer.from('object');

// const MAX_BLOCK_SIZE = 22020096;  /*kich thuoc toi da*/ 
// const RESERVE_RATIO = 1;    //He so du tru
// const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;    //So cel toi da
// const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;    //Nang luong he thong


// function calculateAmount(data, public_key) {
//     let amount = 0;
//     for(const block of data)
//     {
//         if (block.tx.operation === "payment")
//         {
//             if (block.tx.account === public_key)
//                 amount -= block.tx.params.amount;
//             else 
//                 amount += block.tx.params.amount;
//         }
//     }
//     return amount;
// }
 var tx = 'ATAdxPY3gelauaEcMyjMIuaJsiFe9bIO5kZTCil6jcMzJAwoAAAAAAAAAK8ABAANBG5hbWUABktoYSBEb+inO45MmlHPDohDeU3DYmKtBnBRooYUtsFhEybhQpQhNAA7SUBxOQNYnhx3jMZv4WgpJwroflRSYygBbyUSdgE='
 tx = v1.decode(Buffer.from(tx, 'base64'))
 console.log(tx.params.value.toString());
 //console.log(tx.params.content.toString());
 //tx.params.content = v1.decode(Buffer.from(tx.params.content, 'base64'))

 
// var TransactionFromPublicNode = "https://komodo.forest.network/tx_search?query=%22account=%27GC25E5EAF7BVHT7CLN5YPFAPTUUWZOKCAKQTHTRE6N4J6BGGLMSHFHBR%27%22";
//     axios.get(TransactionFromPublicNode)
//     .then((response) => {
//         //console.log(response.header)
//         const data = response.data.result.txs.map((each) => {
//             each.tx = v1.decode(Buffer.from(each.tx, 'base64'));
            
//             each.tx.memo = each.tx.memo.toString();
//             each.tx.signature = each.tx.signature.toString('hex');
//             if (each.tx.params.content !== undefined){
//                 var t = JSON.parse(each.tx.params.content.toString());
//                 //console.log(t)
//             }
//             console.log(each)
//             return each;
//         });
        
//        var  amount= calculateAmount(data, "GC25E5EAF7BVHT7CLN5YPFAPTUUWZOKCAKQTHTRE6N4J6BGGLMSHFHBR");
//        //console.log(amount)

//     //    const account = Account.findByPk(tx.account, { transaction: dbTransaction });
//     // if (!account) {
//     //   throw Error('Account does not exists');
//     // }
//     })
//     .catch(error => {
//         console.log(error);
//     });
