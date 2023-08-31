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

sequelize_database.sync().then(result => {
    app.listen(port, hostname, () => {
        console.log(`\n\nServer succesfully started at ${hostname}:${port}\n`);
    });
}).catch((err) => {
    console.log(err);
});



