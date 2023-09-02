const hostname = "localhost";
const port = 3000;

const express = require('express');
const app = express();
const path = require('path');
const mainRoot = path.dirname(require.main.filename);

const UserRouter = require('./routes/user');
const AdminRouter = require('./routes/admin');
const ErrorController = require('./controllers/error');
const ConsoleController = require('./controllers/console');
const sequelize_database = require('./data/database');
const Product = require('./models/product');
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

const BodyParser = require('body-parser');
app.use(BodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(mainRoot, 'public')));
app.use(ConsoleController.LOG_Request);

app.use('/', UserRouter);
app.use('/admin', AdminRouter);
app.use(ConsoleController.LOG_Not_Found);
app.use(ErrorController.SEND_ERROR);
app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    })
});

Product.belongsTo(User, {constraints : true, onDelete: "CASCADE"});
User.hasMany(Product);

sequelize_database.sync().then(result => {
    return User.findByPk(1);
}).then(user => {
    if(!user)
    {
        return User.create({
            username : "Javid Sadigli",
            email : "cavidoffical@gmail.com",
            password : "17032005Cc."
        });
    }
    return user;
}).then(user => {
    app.listen(port, hostname, () => {
        console.log(`\n\nServer succesfully started at ${hostname}:${port}\n`);
    });
}).catch((err) => {
    console.log(err);
});



