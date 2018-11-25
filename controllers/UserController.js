const Model = require('../models');
const User = Model.User;

class UserController {
    static addNewUser(req, res) {
        let newMember = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: User.decryptPassword(req.body.password)            
        }
        User.create(newMember)
        .then(data => {
            res.redirect('/member/register?info=success');
            // res.send(newMember);
        })
        .catch(err => {
            res.send({msg: `Error creating new member`, err:err});
        })        
    }
    
}

module.exports = UserController;