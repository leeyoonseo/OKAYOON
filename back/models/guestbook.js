module.exports = (sequelize, DataTypes) => {
    const Guestbook = sequelize.define('Guestbook', { // MySQL에는 guestbooks 생성
        // Id는 mySQL에서 자동으로 만듬
        nickname: {},
        avatar: {},
        password: {},
        content: {}, // 게시글에는 이모티콘이 있을 수도 있음

        // img도
    }, {
        // 두번쨰 객체는 모델에 대한 세팅
        charset: 'utf8mb4', // mb4가 추가되어야 이모티콘 저장 가능 
        collate: 'utf8_general_ci', // 2개 작성해야 이래야 한글가능, 안그러면 에러남
    });

    // 이건 나중에 이게 기본 꼴임
    Guestbook.associate = (db) => {};

    return Guestbook;
};