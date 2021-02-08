const express = require('express');
const cors = require('cors');

const AdminRouter = require('./routes/admin');
const GuestRouter = require('./routes/guestbook');
const db = require('./models');

const app = express();

db.sequelize.sync()
.then(() => {
    console.log('db 연결 성공');
})
.catch(console.error);

app.use(cors({
    origin: '*',
    credentials: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', AdminRouter);
app.use('/guestbook', GuestRouter);

app.listen(3065, () => {
    console.log('서버실행중');
});