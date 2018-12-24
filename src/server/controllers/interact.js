//This is Template for Controller
exports.getInteract = async (req, res) => {
  const params = req.body ? req.body : req.query;
  try {
    //TODO
    let result = {
      comment: [],
      reaction: []
    };
    let promise = [];
    const Interact = Parse.Object.extend("Interact");

    //Query comment
    const queryComment = new Parse.Query(Interact);
    queryComment.equalTo("object", req.params.hashPost);
    queryComment.equalTo("type", 1);
    queryComment.ascending("createTime");
    promise.push(queryComment.find());

    //Query reaction
    const queryReaction = new Parse.Query(Interact);
    queryReaction.equalTo("object", req.params.hashPost);
    queryReaction.equalTo("type", 2);
    queryReaction.ascending("createTime");
    promise.push(queryReaction.find());

    //Final Query
    Promise.all(promise).then((interact)=>{
        if(interact[0].length > 0)
        result.comment = interact[0];
        if(interact[1].length > 0)
        result.reaction = interact[1];
        res.send(result);
    }).catch(err=>{
        throw new Error(err.message);
    });

  } catch (error) {
    console.log(err.message);
    res.status(404).send(error.message);
  }
};
