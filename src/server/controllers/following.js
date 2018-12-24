//This is Template for Controller
exports.getListFollow = async (req, res) => {
  const params = req.body ? req.body : req.query;
  try {
    //TODO
    const User = Parse.Object.extend("Users");

    const queryUser = new Parse.Query(User);

    queryUser.equalTo("publicKey", req.params.publicKey);

    queryUser
      .first()
      .then(result => {
        if (!result) throw new Error("User is undefined");

        let followings = result.toJSON().followings;
        let promise = [];

        followings.forEach(element => {
          const queryUserFollow = new Parse.Query(User);
          queryUser.equalTo("publicKey", element);
          promise.push(queryUser.first());
        });

        Promise.all(promise)
          .then(follows => {
            res.send(follows);
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
