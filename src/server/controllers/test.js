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
    const params =   req.body ? req.body : req.query;
    res.send('ok');
    setInterval(function(){ console.log('test'); }, 3000);

};

exports.test1 = async (req, res) => {
  const params =   req.body ? req.body : req.query;
  res.send('dc roi ne');
};



