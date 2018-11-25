const routes = require('express').Router();
const UserController = require('../controllers/UserController');

routes.get('/register', (req, res) => {
    res.render('./pages/register.ejs', {info: req.query.info || null});
});

routes.post('/register', UserController.addNewUser);

routes.get('/login', (req, res) => {
    res.render('./pages/login.ejs');
});

module.exports = routes;