//This is Template for Controller
exports.getListNotification = async (req, res) => {
    const params = req.body ? req.body : req.query;
    try {
      //TODO
      const Notif = Parse.Object.extend("Notification");
      const queryNotif = new Parse.Query(Notif);
      queryNotif.equalTo('publicKey', req.params.publicKey);
      queryNotif.descending("createTime");
      queryNotif.first().then((result)=>{
          res.send(result.toJSON());
      }).catch(err =>{
          throw new Error(err);
      })
    } catch (error) {
        console.log(error);
      res.status(500).send(error);
    }
};