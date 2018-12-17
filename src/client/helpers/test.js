const {encode, sign, decode} = require('./lib/tx/index');
const tx = {
    version: 1,
    account: 'GBVHFBAB6A225WXXT2BGM7REANIGJ5WXV3MU3OWZNYZ7WGUNXSYLTYIK',
    sequence: 3,
    memo: Buffer.alloc(0),
    operation: 'payment',
    params: {
        address: 'GCJ25GYPMW2SIOI75WELDG3JNF2L4W4OIBOQW5SDSGIQGACPW6IKXWF2',
        amount: 10
    }
};

sign(tx, 'SCMWHUST4FME7CMWRGGWJTQCSKCDP3WAPV422BIGNKRGSRT77EHOZELH');

// encode(tx)
console.log(tx);