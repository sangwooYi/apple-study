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
// 참고, MongoDB는 Auto Increment 기능을 직접 구현해야함
app.get('/todolist', (req, res) => {
  db.collection('post').find().toArray(function(err, data){
    console.log(data)
    res.render('todolist.ejs', { posts : data })
  })
})

// :id 이렇게 pathVariable 전달이 가능함
app.get('/detail/:id', (req, res) => {
  const id = Number(req.params.id);
  db.collection('post').findOne({_id: id}, (err, data) => {
    // 요청한 쿼리문에 맞는 데이터가 없으면 에러발생 안하고 null을 반환한다. err 어따쓰는데??
    if (data == null) {
      res.status(404).send("Not Found");
    } else {
      res.render('detail.ejs', {data: data});
    }

  })
})


// TODO 추가
app.post('/add', (req, res) => {
  console.log(req.body); 
  // const data = req.body
  // .findOne(찾으려는 쿼리문, (err, res)=>{})
  const result = res;
  db.collection('counter').findOne({name: 'todo'}, (err, res) => {
    let totalPost = res.totalPost;
    // console.log(`totalPost: ${totalPost}`);
    // 몽고 DB 업데이트 하는방법 (그냥 SQL문을 공부하자..)
    // 참고 $inc, $set, $rename등 존재 필요하면 찾아서 쓰자 
    db.collection('counter').updateOne({name: 'todo'}, {$inc: {totalPost: 1}}, (err, res) => {
      if (err) {
        return console.log(err)
      }
      const data = { _id: totalPost+1, title: req.body.title, date: req.body.date }
      insertOneDataToDB(data);
      // 리다이렉트 보내는 방법!
      result.redirect(`/write`)
    })
  })
  // req.body.title, req.body.date 이런식으로 object 타입 꺼내쓰듯이 꺼내 쓰면 된다
})

app.delete('/delete', (req, res) => {
  // JSON 은 문자열 형태이므로, 숫자로 변환해주어야함
  const boardId = Number(req.body._id);
  const result = res
  // deleteOne(데이터 찾는 쿼리문, (err, res)=>{}) 삭제 방법
  db.collection('post').deleteOne({_id: boardId}, (err, res) => {
    console.log("삭제 완료");
    result.status(200).send({message: '성공'});
  })
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