const { User } = require('../models/User');

let auth = (req, res, next) => {

    // 인증 처리를 하는 곳

    //client cookie에서 token을 가져온다. with cookie-parser
    let token = req.cookies.x_auth;

    //token을 복호화한 후 User를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err; //단순 error가 났을 때 err가 있다고 전달
        if(!user) return res.json({ isAuth: false, error: true}) //user정보가 없다면 isAuth를 false로 하고 에러전달

        // token이 동일하다면
        req.token = token; //token, user 정보를 사용하기 위해 저장한다.
        req.user = user;
        next(); // next를 통해 middleware에서 계속 갈 수 있게 function이 실행될 수 있게 하는 역할
    })

    //User가 있으면 인증 Okay

    //User가 없으면 인증 No
}


module.exports = { auth };