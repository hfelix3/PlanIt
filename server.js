const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require ('./config/connection');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(routes);

sequelize.sync().then(() => {

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });

});