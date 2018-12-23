//This is Template for Controller
exports.getListTrans = async (req, res) => {
    const params = req.body ? req.body : req.query;
    try {
      //TODO
      const Trans = Parse.Object.extend("Transaction");
      const queryTrans = new Parse.Query(Trans);
      queryTrans.equalTo('publicKey', req.params.publicKey);
      queryTrans.first().then((result)=>{
          res.send(result.toJSON());
      }).catch(err =>{
          throw new Error(err);
      })
    } catch (error) {
        console.log(error);
      res.status(500).send(error);
    }
};