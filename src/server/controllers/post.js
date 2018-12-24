//This is Template for Controller
exports.getListPost = async (req, res) => {
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
        if (!user) throw new Error("Cannot find this user");

        userPointer.id = user.id;
        queryPost.equalTo("user", userPointer);
        queryPost.descending('createTime');
        queryPost.include("user");

        await queryPost
          .find()
          .then(result => {
            if (result.length === 0) {
              throw new Error("No Posts");
            }
            res.send(result);
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
