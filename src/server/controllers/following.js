//This is Template for Controller
exports.getListFollow = async (req, res) => {
  const params = req.body ? req.body : req.query;
  try {
    //TODO
    const User = Parse.Object.extend("Users");

    const queryUser = new Parse.Query(User);

    queryUser.equalTo("publicKey", req.params.publicKey);

    await queryUser
      .first()
      .then(async result => {
        if (!result) throw new Error("User is undefined");
        let finalResult = [];
        let promise = [];
        let userJSON = result.toJSON();
        if (userJSON.followings !== undefined) {
          let followings = result.toJSON().followings;
          
          followings.forEach(async (element, index) => {
            const queryUserFollow = new Parse.Query(User);
            queryUserFollow.equalTo("publicKey", element.toString());
            await queryUserFollow.first().then((user)=>{

              finalResult.push(user.toJSON());
              if(index === (followings.length)-1)
              res.send(finalResult);
            });
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
