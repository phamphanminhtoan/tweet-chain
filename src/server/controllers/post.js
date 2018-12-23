//This is Template for Controller
exports.getListPost = async (req, res) => {
  console.log("voa");
  const params = req.body ? req.body : req.query;
  try {
    //TODO
    const Post = Parse.Object.extend("Post");
    const User = Parse.Object.extend("Users");

    const queryPost = new Parse.Query(Post);
    const queryUser = new Parse.Query(User);

    const userPointer = new User();

    queryUser.equalTo("publicKey", req.params.publicKey);
    await queryUser
      .first()
      .then(async user => {
        if (!user) throw new Error("User is undefined");

        userPointer.id = user.id;
        queryPost.equalTo("user", userPointer);
        queryPost.descending('createTime');
        queryPost.include("user");

        await queryPost
          .find()
          .then(result => {
            if (!result) throw new Error("Posts is undefined");

            res.send(result);
          })
          .catch(err => {
            throw new Error(err);
          });
      })
      .catch(err => {
        throw new Error(err);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
