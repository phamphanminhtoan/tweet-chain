//This is Template for Controller
exports.getListPost = async (req, res) => {
  const params = req.body ? req.body : req.query;
  try {
    //TODO
    const Post = Parse.Object.extend("Post");
    const User = Parse.Object.extend("Users");
    const Interact = Parse.Object.extend("Interact");
    let finalresult = {};

    const queryPost = new Parse.Query(Post);
    const queryUser = new Parse.Query(User);

    const userPointer = new User();

    queryUser.equalTo("publicKey", req.params.publicKey);
    await queryUser
      .first()
      .then(async user => {
        if (!user) throw new Error("Cannot find this user");

        userPointer.id = user.id;
        queryPost.equalTo("user", userPointer);
        queryPost.descending('createTime');
        queryPost.include("user");

        await queryPost
          .find()
          .then(async result => {
            let promise = [];
            if (result.length === 0) {
              throw new Error("No Posts");
            }
            
            result.forEach(post=>{  
              let postJSON = post.toJSON();

              const queryComment = new Parse.Query(Interact);
              const queryReaction = new Parse.Query(Interact);

              queryComment.equalTo('type' ,1);
              queryComment.equalTo('object' , postJSON.hashCode);
              queryComment.include('user');
              queryComment.ascending('createTime');
              promise.push(queryComment.find());

              queryReaction.equalTo('type', 2);
              queryReaction.equalTo('object' , postJSON.hashCode);
              queryReaction.include('user');
              promise.push(queryReaction.find());

            });

            await Promise.all(promise).then(interact=>{
              let pos = 0;
              let final = result.map(post=>{
                let postJSON = post.toJSON();
                postJSON.comment = interact[pos]; 
                postJSON.reaction = interact[pos+1];
                pos = pos + 2;
                return postJSON;
              });
              res.send(final); 
            }).catch(err=>{
              throw new Error(err.message);
            });
          })
          .catch(err => {
            throw new Error(err.message);
          });
      })
      .catch(err => {
        throw new Error(err.message);
      });
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
};
