//This is Template for Controller
exports.getListTrans = async (req, res) => {
    const params = req.body ? req.body : req.query;
    try {
      //TODO
      let promise = [];
      const Trans = Parse.Object.extend("Transaction");
      const User = Parse.Object.extend("Users");

      const queryTransSender = new Parse.Query(Trans);
      const queryTransreceiver = new Parse.Query(Trans);
      const queryUser = new Parse.Query(User);

      const userPointer = new User();

      queryUser.equalTo("publicKey", req.params.publicKey);

      await queryUser
      .first()
      .then(async user => {
        if (!user) throw new Error("User is undefined");

        userPointer.id = user.id;

        //Query by sender
        queryTransSender.equalTo('sender', userPointer);
        queryTransSender.descending('createtime');
        queryTransSender.include('sender');
        queryTransSender.include('receiver');
        promise.push(queryTransSender.find());
        //Query by receiver
        queryTransreceiver.equalTo('receiver', userPointer);
        queryTransreceiver.descending('createtime');
        queryTransreceiver.include('sender');
        queryTransreceiver.include('receiver');
        promise.push(queryTransreceiver.find());

        Promise.all(promise).then(result=>{

            if(!result[0] || !result[1])
            throw new Error('User is undefined');

            let finalResult = result[0].concat(result[1]);
            res.send(finalResult);

        }).catch(err=>{
            throw new Error(err);
        });

    }).catch(err=>{
            throw new Error(err);
        });

    } catch (error) {
        console.log(error);
      res.status(500).send(error);
    }
};