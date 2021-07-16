const express = require('express')
const app = express()
const port = 5000

//body-parser 가져온다
const bodyParser = require('body-parser');
//User model을 가져온다
const { User } = require("./models/User");

//body-parser에 대한 option
//application/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//applicatio/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://seungjo:likelion1234@boilerplate.copia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }
).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! Hola Encantado 안녕하세요')
})

//Route for signup
app.post('/register', (req, res) => {

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

