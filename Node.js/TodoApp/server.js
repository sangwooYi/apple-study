// 참고, 이 플젝은 MongoDB 무료 호스트 사이트인 아틀라스에서 호스팅받아 진행
// 서버 구축하는 기본 문법 express 라이브러리 이용
const express = require('express');  // express
const bodyParser = require('body-parser') // body-parse (request.body 파싱용)
const MongoClient = require('mongodb').MongoClient; // 몽고 DB
// 몽고 DB 데이터베이스
let db;
const myUrl = 'mongodb+srv://okqwaszx123:dkfhs2594!@cluster0.iqpz9n5.mongodb.net/?retryWrites=true&w=majority'

// 필요 메서드 작성
// DB에 데이터 개별 저장
const insertOneDataToDB = (data) => {
  MongoClient.connect(myUrl, (err, client) => {
    if (err) {
      return console.log(err);
    }
    db = client.db('todoapp');
    db.collection('post').insertOne(data, (req, res) => {
      console.log('데이터 저장 완료')
    })
  })
}

// 전체 todo 리스트 가져오기 (return 어케하냐..)
// const getAllTodoList = () => {
//   // post(내가 작성한 콜렉션 이름) 컬렉션에서 모든 데이터를 가져오기
//   db.collection('post').find().toArray((req, res) => {
//     console.log(res);
//     return res;
//   });
// }


// express
const app = express();
// app.use() 이 server 앱은 ~ 를 쓰겠다라는 의미
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// ejs 라이브러리 세팅
app.set('view engine', 'ejs');
const port = 8080;
// 해당 port에 서버가 열리면 뒤의 callback 함수를 실행해주는 역할
app.listen(port, () => {
  console.log(`hello~ this port open port: ${port}!`)
});

// get 요청에 대한 응답
app.get('/pet', (req, res) => {
  res.send(`${req.body} 안녕!`);
})

app.get('/beauty', (req, res) => {
  res.send("뷰티 페이지" + req);
})


app.get('/', (req, res) => {
  // 해당 경로의 파일을 보내준다.
  // console.log(req);
  console.log(__dirname)  // 이러면 서버의 로그가 남음
  res.sendFile(__dirname + '/index.html');
})

// GET 메서드로  /wrtie url 로 요청이 들어오면 /write.html 파일을 보내준다.
app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html')
})

// 전체 TODO 리스트 보여주기
app.get('/todolist', (req, res) => {
  db.collection('post').find().toArray(function(err, data){
    console.log(data)
    res.render('todolist.ejs', { posts : data })
  })
})


// TODO 추가
app.post('/add', (req, res) => {
  console.log(req.body); 
  const data = req.body
  // req.body.title, req.body.date 이런식으로 object 타입 꺼내쓰듯이 꺼내 쓰면 된다
  insertOneDataToDB(data);
  res.send("성공");
})


MongoClient.connect(myUrl, function(err, client){
  if (err) {
    return console.log(err);
  }
  // db(내가 만든 DB 이름);
  db = client.db('todoapp');
  // post 란 콜렉션 (내가 아틀라스에서 설정한 콜렉션 이름)에 데이터 하나를 넣겠다
  // db.collenction(콜렉션 이름).insertOne(저장할 데이터(JSON 형식), (req, res) => {}) 이 구조로!
  // _id 값을 명시해주면 해당 값으로 id 생성, 아니면 알아서 자동 생성 해줌 (PK 값)
  // db.collection('post').insertOne({name: '이상우', age: 31, _id: 100}, (req, res) => {
  //   console.log("성공!");
  // });
  // app.listen('포트번호', 콜백함수)
  // 특정 포트로 연결이 되었으면 콜백함수를 실행해주는 것
  app.listen('8050', function(){
    console.log('listening on 8050')
  });
})