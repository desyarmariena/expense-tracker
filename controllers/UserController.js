const Model = require('../models');
const User = Model.User;

class UserController {
    static addNewUser(req, res) {

        try {
            if(req.body.password.length < 6 || req.body.password.length > 30) throw `Password must be between 6 and 30 characters long`;
    
            let newMember = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: User.decryptPassword(req.body.password)            
            }
            User.create(newMember)
            .then(data => {                
                res.redirect('/member/register?info=success');                
            })
            .catch(err => {
                // res.send(err);
                switch (err.errors[0].message) {
                    case 'Error: Email has been used': err = `Email has been used. Please use another email`; break;
                    case 'Validation isEmail on email failed':
                    case 'Email format is incorrect': err = `Email format is incorrect. Please input valid email`
                    default: break;
                }                                
                res.redirect(`/member/register?info=${err}`);                
            })        

        } catch (err) {
            // catch password length validation error
            res.redirect(`/member/register?info=${err}`);
        }

    }
    
}

module.exports = UserController;