const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const AdminRouter = require('./routes/admin');
const GuestRouter = require('./routes/guestbook');
const SimsimiRouter = require('./routes/simsimi');
const GameRouter = require('./routes/game');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();

db.sequelize.sync()
.then(() => {
    console.log('db 연결 성공');
})
.catch(console.error);
passportConfig();

app.use(cors({
    origin: '*',
    credentials: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/admin', AdminRouter);
app.use('/guestbook', GuestRouter);
app.use('/simsimi', SimsimiRouter);
app.use('/game', GameRouter);

app.listen(3065, () => {
    console.log('서버실행중');
});