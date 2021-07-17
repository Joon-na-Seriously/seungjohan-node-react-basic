const mongoose = require('mongoose');

//bcrypt download and 가져온다
const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require('jsonwebtoken');


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

// moongose method,, user model에 save하기 전에 무엇을 한다는 의미
userSchema.pre('save', function( next ){
    var user = this; // var user는 java문법처럼 const userSchema를 가리킴

    //pw가 변경되었을 때만 암호화작업을 하기 위해 조건문 설정
    if(user.isModified('password')) {
        //PW 암호화 작업
        // copy the code from site for 암호화 작업
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)// Function -> callBack function

            // myPlaintextPassword (=user.password) 는 user가 넣어준 pw => Userschema에서 가져오면 된다.
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash

                //index.js 에 있는 user.save()로 보내버리는 것이다.
                next()
            })
        })
    } else {
        next()
    }
})

// comparePassword Method 만들기
userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword 1234567, 암호화된 비밀번호 xxxxxxxxxxxxxx 라고 한다면
    //두 개의 pw가 같은지 확인해야한다.
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

// generateToken Method 만들기
userSchema.methods.generateToken = function(cb) {

    var user = this;

    //jsonwebtoken을 이용해서 token 생성하기
    //token을 기억하기 위해 이렇게 저장하는 것이다.
    //이 token을 이용해 나중에 user를 찾는다.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })

}

//Schema를 Model로 감싸준다
const User = mongoose.model('User', userSchema)

module.exports = { User }