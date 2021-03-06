const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
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

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet());
    app.use(cors({
        origin: ['https://okayoon.com', 'https://www.okayoon.com'],
        credentials: true,
    }));

} else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true,
    }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    proxy: true,
    cookie: {
        httpOnly: true,
        secure: true,
        domain: process.env.NODE_ENV === 'production' && '.okayoon.com'
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello express');
});

app.use('/admin', AdminRouter);
app.use('/guestbook', GuestRouter);
app.use('/simsimi', SimsimiRouter);
app.use('/game', GameRouter);

app.listen(3065, () => {
    console.log('서버실행중');
});