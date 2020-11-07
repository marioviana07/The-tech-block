const express = require('express');
const session = require("express-session");
const sequelize = require('./config/connection');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));
const hbs = exphbs.create({
    helpers: {
        format_date: (date) => {
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        },
    },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require("./controllers/"));


app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}!`);
    console.log('http://localhost:' + PORT);
    sequelize.sync({ force: false })
});