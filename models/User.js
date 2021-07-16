const mongoose = require('mongoose');

//Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true, //user가 실수로 스페이스바를 쳤을 때 이를 없애주는 것.
        // ex) tmd wh7275@naver.com -> tmdwh7275@naver.com
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number,
        default: 0
    }, // 어떤 user가 관리자가 될 수도 일반user가 될 수도 있기에 이를 관리하고자
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    } // token 사용 유효기간
})
