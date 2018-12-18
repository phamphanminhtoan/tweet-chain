var userModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({
			publicKey : req.body.publicKey,
			name : req.body.name,
			post : req.body.post,
			picture : req.body.picture,
			following : req.body.following,
			payment : req.body.payment

        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.publicKey = req.body.publicKey ? req.body.publicKey : user.publicKey;
			user.name = req.body.name ? req.body.name : user.name;
			user.post = req.body.post ? req.body.post : user.post;
			user.picture = req.body.picture ? req.body.picture : user.picture;
			user.following = req.body.following ? req.body.following : user.following;
			user.payment = req.body.payment ? req.body.payment : user.payment;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    updateFromBlock: async function(input) {
        const { publicKey, name, post, picture, following, payment } = input;
        if(publicKey){
            await userModel.findOne({publicKey: publicKey}, async function(err, user){
                if(err)
                return;
                if(!user)
                {
                    let userCurrent = new userModel({
                        publicKey : publicKey,
                        name : name,
                        post : post,
                        picture : picture,
                        following : following,
                        payment : payment
                    });
                    await userCurrent.save(function (err, user) {
                        if (err) {
                            return false;
                        }
                        return true;
                    });
                }else{
                    await userModel.findOne({publicKey: publicKey}, async function (err, user) {
                        if (err) {
                        return false;
                        }
                        if (!user) {
                            return false;
                        }
                        user.publicKey = publicKey ? publicKey : user.publicKey;
                        user.name = name ? name : user.name;
                        user.post = post ? post : user.post;
                        user.picture = picture ? picture : user.picture;
                        user.following = following ? following : user.following;
                        user.payment = payment ? payment : user.payment;
                        
                        await user.save(function (err, user) {
                            if (err) {
                                return false;
                            }
                            return true;
                        });
                    });
                }
            });
        }
    },
    getUserByPublicKey:  function (publicKey) {
        userModel.findOne({publicKey: publicKey},function (err, user) {
            if (err) 
                return false;
            if(!user)
                return false
                console.log('dang trong nay ne ma');
            return user;
        });
    }

};
