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

        let promise = [];

        if (result.toJSON().followings !== undefined) {
          let followings = result.toJSON().followings;
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
              throw new Error(err.message);
            });
        } else
        {
          throw new Error("No Followings");
        }
      })
      .catch(err => {
        throw new Error(err.message);
      });
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
};
