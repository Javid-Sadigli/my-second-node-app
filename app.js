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
const Card = require('./models/card');
const CardItem = require('./models/card-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.set('view engine', 'ejs');
app.set('views', 'views');

const BodyParser = require('body-parser');
app.use(BodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(mainRoot, 'public')));
app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    })
});
app.use(ConsoleController.LOG_Request);

app.use('/', UserRouter);
app.use('/admin', AdminRouter);
app.use(ConsoleController.LOG_Not_Found);
app.use(ErrorController.SEND_ERROR);

Product.belongsTo(User, {constraints : true, onDelete: "CASCADE"});
User.hasMany(Product);
User.hasOne(Card);
Card.belongsTo(User, {constraints : true, onDelete: "CASCADE"});
Card.belongsToMany(Product, {through : CardItem});
Product.belongsToMany(Card, {through : CardItem});
Order.belongsTo(User, {constraints : true, onDelete: "CASCADE"});
User.hasMany(Order);
Order.belongsToMany(Product, {through : OrderItem});
Product.belongsToMany(Order, {through : OrderItem});

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
    return user.getCard();
}).then(card => {
    if(card == null)
    {
        return Card.create({
            userId : 1
        });
    }
    return card;
}).then(card => {
    app.listen(port, hostname, () => {
        console.log(`\n\nServer succesfully started at ${hostname}:${port}\n`);
    });
}).catch((err) => {
    console.log(err);
});



