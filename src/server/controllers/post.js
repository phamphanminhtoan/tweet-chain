//This is Template for Controller
exports.getListPost = async (req, res) => {
    const params = req.body ? req.body : req.query;
    try {
      //TODO
      const Post = Parse.Object.extend("Post");
      const queryPost = new Parse.Query(Post);
      queryPost.equalTo('publicKey', req.params.publicKey);
      queryPost.first().then((result)=>{
          res.send(result.toJSON());
      }).catch(err =>{
          throw new Error(err);
      })
    } catch (error) {
        console.log(error);
      res.status(500).send(error);
    }
};