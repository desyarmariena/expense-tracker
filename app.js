const express = require('express');
const app = express();
const port = 3000;

const homeRoutes = require('./routes');
const memberRoutes = require('./routes/member');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/views'));

// routes
app.use('/', homeRoutes);
app.use('/member', memberRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})