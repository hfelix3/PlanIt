const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require ('./config/connection');
const exphbs = require('express-handlebars');
const seedDatabase = require('./seeds/seed');
const session = require('express-session');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  // Add express-session and store as Express.js middleware
  app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(routes);

sequelize.sync({ force: true}).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
    
    // seed the database upon server start
    seedDatabase();

});