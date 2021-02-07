const express = require('express');
const guestbookRouter = require('./routes/guestbook');
const db = require('./models');
const app = express();

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

app.use('guestbook', guestbookRouter);

app.listen(3065, () => {
    console.log('서버 실행 중');
});