/* exports.test = async (req, res) => {
    const params = req.body ? req.body : req.query;
    try {
      const result = await login(params);
      res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
}; */


// request a block
exports.test = async (req, res) => {
    const params = req.body ? req.body : req.query;
   res.send("Hello This is server of TweetChain");
};


