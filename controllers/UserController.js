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
            console.log(data, `===========`)
            res.redirect('/member/register?info=success');
            // res.send(newMember);
        })
        .catch(err => {
            switch (err.errors[0].message) {
                case 'Validation len on password failed': err = `Password must be 6 chars minimum and max 30 chars`; break;
                case 'Error: Email has been used': err = `Email has been used. Please use another email`
                default: break;
            }            
            res.redirect(`/member/register?info=${err}`);            
        })        
    }
    
}

module.exports = UserController;