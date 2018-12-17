/* exports.test = async (req, res) => {
    const params = req.body ? req.body : req.query;
    try {
      const result = await login(params);
      res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
}; */
let { RpcClient } = require('tendermint');
let client = RpcClient('wss://komodo.forest.network:443');


// request a block
exports.test = async (req, res) => {
    const params = req.body ? req.body : req.query;
    client.subscribe({
      query: "tm.event='NewBlock'"
    }, (err, event) => {
      console.log(err);
      console.log(event);
    });
};

