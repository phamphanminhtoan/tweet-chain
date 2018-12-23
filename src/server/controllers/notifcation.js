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
    queryUser
      .first()
      .then(async user => {
        if (!user) throw new Error("User is undefined");

        userPointer.id = user.id;

        queryNotif.equalTo("user", userPointer);
        queryNotif.descending("createTime");
        queryNotif.limit(5);

        await queryNotif
          .find()
          .then(result => {
            if (!result) throw new Error("Notification is undefined");

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
