//This is Template for Controller
exports.getListNotification = async (req, res) => {
  const params = req.body ? req.body : req.query;
  try {
    //TODO
    const Notif = Parse.Object.extend("Notification");
    const User = Parse.Object.extend("Users");

    const queryNotif = new Parse.Query(Notif);
    const queryUser = new Parse.Query(User);

    const userPointer = new User();

    queryUser.equalTo("publicKey", req.params.publicKey);
    await queryUser
      .first()
      .then(async user => {
        if (!user) throw new Error("User is undefined");

        userPointer.id = user.id;

        queryNotif.equalTo("user", userPointer);
        queryNotif.descending("createTime");
        queryNotif.include('user');
        queryNotif.limit(5);

        await queryNotif
          .find()
          .then(result => {
            if (result.length === 0) throw new Error("No notification");
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
    res.status(500).send(error.message);
  }
};
