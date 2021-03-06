exports.isAdminLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('관리자 로그인을 한 상태에서 접근 가능합니다.');
    }
};

exports.isNotAdminLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('관리자 로그인을 하지 않은 상태에서 접근 가능합니다.');
    }
};

