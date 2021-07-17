const express = require('express')
const app = express()
const port = 5000

//body-parser 가져온다
const bodyParser = require('body-parser');
//User model 을 가져온다
const { User } = require("./models/User");

const config = require('./config/key');

const cookieParser = require('cookie-parser');

const { auth } = require('./middleware/auth');

//body-parser에 대한 option
//application/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! Hola Encantado 안녕하세요')
})

//Route for signup
app.post('/api/users/register', (req, res) => {

  //회원가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다.

  //인스턴스를 생성하고 위의 옵션에서 받은 정보들을 데이터베이스에 넣기 위해
  const user = new User(req.body) //req.body안에 넣는다

  //mongodb에서 오는 Method, 위에서 받아준 userModel 정보들을 저장해줌. + callback function
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err}) // error가 있으면 client에게 error가 있다고 전달해줘야 with json 형식으로, 에러메시지도 함께

    //status(200) 은 성공했다는 의미
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {

  //요청된 이메일을 DB에서 있는지 찾는다.
  User.findOne({email: req.body.email}, (err, userInfo) => {
    //usermodel안에 이 이메일을 가진 user가 없다면 userInfo가 없음
    if(!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    //요청된 이메일이 DB에 있다면 PW가 맞는 PW인지 확인.
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      //PW까지 맞다면 Token 생성하기.
      userInfo.generateToken((err, userInfo) => {
        if(err) return res.status(400).send(err); //status(400)는 에러가 있다는 의미

        //token을 저장한다. 어디에?? 쿠키, 로컬스터리지 등 괜찮은 곳에 저장. 여러가지 방법이 있지만 여기서는 쿠키에 저장해보자.
        //쿠키에 저장하려면 라이브러리를 깔아야한다.
        res.cookie("x_auth", userInfo.token)
            .status(200)
            .json({ loginSuccess: true, userId: userInfo._id})
      })
    })
  })
})

// Auth Application
//Middleware( ,auth, ) request를 받은 다음 callback function을 실행하기 전에 거치는 것.
app.get('/api/users/auth', auth, (req, res) => {

  //여기까지 middleware를 통과해왔다는 얘기는 Authentication이 True 라는 말.
  res.status(200).json({
    //client에게 user 정보를 제공해준다. 선택적으로
    _id: req.user._id, // auth.js에서 user정보를 저장했기 때문
    isAdmin: req.user.role === 0 ? false : true, // role 1 admin, role 2 특정부서어드민 등 설정해주는 값에 따라 코드를 취하면 된다.
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

