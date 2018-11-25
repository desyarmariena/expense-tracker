const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send(`From routes home`);
});

module.exports = routes