const usersCtrl = {},
    UserModel = require("../models/user");

usersCtrl.getAllUsers = async(req, res) => {
    const user = await UserModel.find();
    res.json(user);
};

usersCtrl.getUser = async(req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
};

usersCtrl.postUser = async(req, res) => {
    const { username } = req.body;
    const newUser = new UserModel( {username} );
    await newUser.save( (err, suc) => {
        if(err) res.status(500).send({msg: `Error al guardar ${err}`});

        res.status(200).send({sucess: "User saved!"})
    });
};

usersCtrl.putUser = async(req, res) => {
    const { username } = req.body;
    await UserModel.findOneAndUpdate({_id: req.params.id}, {
        username
    });

    res.send( {status: "Updated User!"} );
    
};

usersCtrl.deleteUser = async(req, res) => {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json( {status: "User Deleted"} );
};

module.exports = usersCtrl;