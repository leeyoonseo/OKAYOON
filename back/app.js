const http = require('http');
const guestbookRouter = require('./routes/guestbook');

app.use('guestbook', guestbookRouter);

http.listen(3065, () => {
    console.log('서버 실행 중');
});